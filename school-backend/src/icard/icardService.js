import { pool, query } from '../config/db.js';

/* =========================================================
   HELPERS
========================================================= */

const bad = (message, status = 400) => Object.assign(new Error(message), { status });
const toInt = (v) => Number.parseInt(v, 10);
const clean = (v) => {
  const s = String(v ?? '').trim();
  return s === '' ? null : s;
};
const text = (v) => String(v ?? '').trim();
const first = (...values) => {
  for (const v of values) {
    const s = text(v);
    if (s) return s;
  }
  return '';
};
const isDate = (v) => /^\d{4}-\d{2}-\d{2}$/.test(String(v || ''));
const TYPES = ['student', 'staff'];

const typeOf = (v) => {
  const t = String(v || 'student').toLowerCase();
  if (!TYPES.includes(t)) throw bad('Card type must be student or staff.');
  return t;
};

/* =========================================================
   CARD BUILDERS
   One "card" object holds everything printed on an I-Card.
   The same shape is used for a live student, a live staff
   member and a saved record, so the front-end draws them all
   with the same template.
========================================================= */

// only the admission-form keys the card needs (keeps the response small)
const STUDENT_SELECT = `
  s.id, s.record_no, s.session, s.class_name, s.section, s.name, s.phone,
  s.admission_no, s.status, s.photo_path,
  jsonb_build_object(
    'name',               s.form_data->>'name',
    'fatherName',         s.form_data->>'fatherName',
    'motherName',         s.form_data->>'motherName',
    'dateOfBirth',        s.form_data->>'dateOfBirth',
    'permanentAddress',   s.form_data->>'permanentAddress',
    'presentAddress',     s.form_data->>'presentAddress',
    'permanentCity',      s.form_data->>'permanentCity',
    'presentCity',        s.form_data->>'presentCity',
    'permanentContactNo', s.form_data->>'permanentContactNo',
    'presentContactNo',   s.form_data->>'presentContactNo',
    'contactNo',          s.form_data->>'contactNo',
    'classRollNo',        s.form_data->>'classRollNo',
    'admissionNo',        s.form_data->>'admissionNo',
    'bloodGroup',         s.form_data->>'bloodGroup',
    'photoUrl',           s.form_data->>'photoUrl'
  ) AS fd
`;

function addressOf(address, city) {
  const a = text(address);
  const c = text(city);
  if (!a) return c;
  if (!c || a.toLowerCase().includes(c.toLowerCase())) return a;
  return `${a}, ${c}`;
}

export function studentCard(row) {
  const fd = row.fd || row.form_data || {};
  return {
    type: 'student',
    name: first(row.name, fd.name),
    fatherName: first(fd.fatherName),
    motherName: first(fd.motherName),
    dob: first(fd.dateOfBirth),
    mobile: first(row.phone, fd.presentContactNo, fd.permanentContactNo, fd.contactNo),
    address: addressOf(first(fd.permanentAddress, fd.presentAddress), first(fd.permanentCity, fd.presentCity)),
    className: first(row.class_name),
    section: first(row.section),
    session: first(row.session),
    rollNo: first(fd.classRollNo),
    admissionNo: first(row.admission_no, fd.admissionNo),
    bloodGroup: first(fd.bloodGroup),
    photoUrl: first(row.photo_path, fd.photoUrl),
  };
}

// saved record -> what the API returns
function recordOut(r) {
  return {
    id: r.id,
    recordNo: r.record_no,
    type: r.card_type,
    studentId: r.student_id,
    staffId: r.staff_id,
    updatedAt: r.updated_at,
    card: { ...(r.form_data || {}), photoUrl: r.photo_url || '' },
  };
}

/* =========================================================
   FILTERS (dropdown values)
   source "students" -> from the admission data
   source "records"  -> from I-Cards that are already saved
========================================================= */

export async function getFilters({ source = 'students', type = 'student' } = {}) {
  const cardType = typeOf(type);
  const fromRecords = String(source) === 'records' || cardType === 'staff';

  const table = fromRecords ? 'icard_records' : 'students';
  const where = fromRecords ? `WHERE card_type = $1` : `WHERE $1::text IS NOT NULL`;
  const params = [cardType];

  const sessions = await query(
    `SELECT DISTINCT session FROM ${table} ${where} AND COALESCE(session,'') <> '' ORDER BY session DESC`,
    params
  );

  // classes in school order (Nursery, LKG ... Class 12) using the classes master
  const classes = await query(
    `SELECT t.class_name
       FROM (SELECT DISTINCT class_name FROM ${table} ${where} AND COALESCE(class_name,'') <> '') t
       LEFT JOIN classes c ON LOWER(c.name) = LOWER(t.class_name)
      ORDER BY c.display_order NULLS LAST, t.class_name`,
    params
  );

  const sections = await query(
    `SELECT DISTINCT section FROM ${table} ${where} AND COALESCE(section,'') <> '' ORDER BY section`,
    params
  );

  return {
    sessions: sessions.rows.map((r) => r.session),
    classes: classes.rows.map((r) => r.class_name),
    sections: sections.rows.map((r) => r.section),
  };
}

/* =========================================================
   STUDENTS  (live list from the admission data)
========================================================= */

export async function listStudents({ session, className, section, status = 'active', q } = {}) {
  const term = text(q);
  const cls = text(className);

  // never dump the whole school: a class or a search word is needed
  if (!cls && !term) return [];

  const wanted = text(status).toLowerCase();
  const r = await query(
    `SELECT ${STUDENT_SELECT}, ic.id AS icard_id, ic.updated_at AS icard_updated_at
       FROM students s
       LEFT JOIN classes c ON LOWER(c.name) = LOWER(s.class_name)
       LEFT JOIN icard_records ic ON ic.student_id = s.id
      WHERE ($1 = '' OR s.session = $1)
        AND ($2 = '' OR s.class_name = $2)
        AND ($3 = '' OR LOWER(s.section) = LOWER($3))
        AND ($4 = '' OR $4 = 'all' OR LOWER(s.status) = $4)
        AND ($5 = '' OR s.name ILIKE '%' || $5 || '%'
                     OR s.admission_no ILIKE '%' || $5 || '%'
                     OR s.phone ILIKE '%' || $5 || '%'
                     OR s.form_data->>'computerId' ILIKE '%' || $5 || '%'
                     OR s.form_data->>'fatherName' ILIKE '%' || $5 || '%')
      ORDER BY c.display_order NULLS LAST, s.class_name, s.section,
               NULLIF(regexp_replace(COALESCE(s.form_data->>'classRollNo',''), '\\D', '', 'g'), '')::int NULLS LAST,
               LOWER(s.name)
      LIMIT 500`,
    [text(session), cls, text(section), wanted, term]
  );

  return r.rows.map((row) => {
    const card = studentCard(row);
    return {
      id: row.id,
      recordNo: row.record_no,
      name: card.name,
      admissionNo: card.admissionNo,
      className: card.className,
      section: card.section,
      session: card.session,
      mobile: card.mobile,
      fatherName: card.fatherName,
      status: row.status,
      hasPhoto: Boolean(card.photoUrl),
      saved: row.icard_id ? { id: row.icard_id, updatedAt: row.icard_updated_at } : null,
      card,
    };
  });
}

/* =========================================================
   GENERATE + SAVE STUDENT CARDS
   The server re-reads every student itself, so the saved
   card always matches the admission data and photo.
========================================================= */

export async function generateStudentCards(ids, userId) {
  const list = [...new Set((Array.isArray(ids) ? ids : []).map(toInt).filter(Number.isInteger))];
  if (!list.length) throw bad('Select at least one student.');
  if (list.length > 500) throw bad('Please generate at most 500 I-Cards at a time.');

  const found = await query(
    `SELECT ${STUDENT_SELECT} FROM students s WHERE s.id = ANY($1::bigint[])`,
    [list]
  );
  if (!found.rowCount) throw bad('The selected students were not found.', 404);

  const c = await pool.connect();
  const saved = [];
  try {
    await c.query('BEGIN');

    for (const row of found.rows) {
      const card = studentCard(row);
      const { photoUrl, ...printed } = card;
      const values = [
        row.session, row.class_name, row.section, card.name, card.mobile || null,
        card.admissionNo || null, row.status || 'active', photoUrl || null, JSON.stringify(printed),
      ];

      const ex = await c.query(`SELECT id FROM icard_records WHERE student_id = $1 FOR UPDATE`, [row.id]);

      if (ex.rowCount) {
        const u = await c.query(
          `UPDATE icard_records
              SET session=$2, class_name=$3, section=$4, name=$5, phone=$6, admission_no=$7,
                  status=$8, photo_url=$9, form_data=$10, updated_at=NOW()
            WHERE id=$1 RETURNING *`,
          [ex.rows[0].id, ...values]
        );
        saved.push(recordOut(u.rows[0]));
      } else {
        const n = await c.query(`SELECT icard_next_no('student','ICS') AS no`);
        const i = await c.query(
          `INSERT INTO icard_records
             (record_no, card_type, student_id, session, class_name, section, name, phone,
              admission_no, status, photo_url, form_data, created_by)
           VALUES ($1,'student',$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12) RETURNING *`,
          [n.rows[0].no, row.id, ...values, userId]
        );
        saved.push(recordOut(i.rows[0]));
      }
    }

    await c.query('COMMIT');
    return saved;
  } catch (e) {
    await c.query('ROLLBACK');
    throw e;
  } finally {
    c.release();
  }
}

/* =========================================================
   STAFF CARD  (photo is uploaded in the I-Card form)
========================================================= */

export async function getStaffCard(staffId) {
  const r = await query(`SELECT * FROM icard_records WHERE staff_id = $1`, [toInt(staffId)]);
  return r.rows[0] ? recordOut(r.rows[0]) : null;
}

export async function saveStaffCard(staffIdValue, d = {}, file, userId) {
  const staffId = toInt(staffIdValue);
  if (!Number.isInteger(staffId)) throw bad('Search and select a staff member.');

  const s = await query(`SELECT * FROM staff WHERE id = $1`, [staffId]);
  if (!s.rowCount) throw bad('Staff record not found.', 404);
  const staff = s.rows[0];
  const fd = staff.form_data || {};

  const ex = await query(`SELECT * FROM icard_records WHERE staff_id = $1`, [staffId]);
  const existing = ex.rows[0] || null;

  // value typed in the form wins, otherwise what is stored in the staff master
  const pick = (key, fallback) => (d[key] !== undefined ? text(d[key]) : text(fallback));

  const name = pick('name', staff.name);
  const designation = pick('designation', staff.section);
  const department = pick('department', staff.class_name);
  const mobile = pick('mobile', staff.phone);
  const dob = pick('dob', fd.dateOfBirth);

  if (!name) throw bad('Staff name is required.');
  if (!designation) throw bad('Designation is required.');
  if (mobile && !/^[0-9+\-\s]{7,15}$/.test(mobile)) throw bad('Enter a valid mobile number.');
  if (dob && !isDate(dob)) throw bad('Enter a valid date of birth.');

  const photoUrl = file?.path || existing?.photo_url || '';
  if (!photoUrl) throw bad('Upload the staff photo to create the I-Card.');

  const printed = {
    type: 'staff',
    name,
    designation,
    department,
    idNo: staff.record_no,
    fatherName: pick('fatherName', fd.fatherName),
    dob,
    mobile,
    address: pick('address', addressOf(fd.address, fd.city)),
    bloodGroup: pick('bloodGroup', fd.bloodGroup),
    session: text(staff.session),
  };

  const values = [
    staff.session, department || null, designation || null, name, mobile || null,
    staff.record_no, staff.status || 'active', photoUrl, JSON.stringify(printed),
  ];

  let row;
  if (existing) {
    row = (await query(
      `UPDATE icard_records
          SET session=$2, class_name=$3, section=$4, name=$5, phone=$6, admission_no=$7,
              status=$8, photo_url=$9, form_data=$10, updated_at=NOW()
        WHERE id=$1 RETURNING *`,
      [existing.id, ...values]
    )).rows[0];
  } else {
    const n = await query(`SELECT icard_next_no('staff','ICT') AS no`);
    row = (await query(
      `INSERT INTO icard_records
         (record_no, card_type, staff_id, session, class_name, section, name, phone,
          admission_no, status, photo_url, form_data, created_by)
       VALUES ($1,'staff',$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12) RETURNING *`,
      [n.rows[0].no, staffId, ...values, userId]
    )).rows[0];
  }

  return { ...recordOut(row), updated: Boolean(existing) };
}

/* =========================================================
   SAVED CARDS (Print section)
========================================================= */

export async function listRecords({ type = 'student', session, className, section, q } = {}) {
  const cardType = typeOf(type);
  const term = text(q);

  const r = await query(
    `SELECT r.*
       FROM icard_records r
       LEFT JOIN classes c ON r.card_type = 'student' AND LOWER(c.name) = LOWER(r.class_name)
      WHERE r.card_type = $1
        AND ($2 = '' OR r.session = $2)
        AND ($3 = '' OR r.class_name = $3)
        AND ($4 = '' OR LOWER(r.section) = LOWER($4))
        AND ($5 = '' OR r.name ILIKE '%' || $5 || '%'
                     OR r.admission_no ILIKE '%' || $5 || '%'
                     OR r.phone ILIKE '%' || $5 || '%'
                     OR r.record_no ILIKE '%' || $5 || '%')
      ORDER BY c.display_order NULLS LAST, r.class_name, r.section,
               NULLIF(regexp_replace(COALESCE(r.form_data->>'rollNo',''), '\\D', '', 'g'), '')::int NULLS LAST,
               LOWER(r.name)
      LIMIT 1000`,
    [cardType, text(session), text(className), text(section), term]
  );

  return r.rows.map(recordOut);
}

export async function deleteRecord(id) {
  const r = await query(`DELETE FROM icard_records WHERE id = $1 RETURNING id`, [toInt(id)]);
  if (!r.rowCount) throw bad('Saved I-Card not found.', 404);
  return { id: r.rows[0].id };
}

/* =========================================================
   TEMPLATES
========================================================= */

const THEMES = ['maroon', 'navy', 'green', 'purple', 'orange'];
const FIELD_KEYS = {
  student: ['father', 'mother', 'dob', 'mobile', 'address', 'rollNo', 'admNo', 'blood'],
  staff: ['idNo', 'department', 'father', 'dob', 'mobile', 'address', 'blood'],
};

const str = (v, max) => text(v).slice(0, max);
const safeUrl = (v) => {
  const u = str(v, 500);
  return u === '' || u.startsWith('/') || /^https:\/\//i.test(u) ? u : '';
};

function sanitizeTemplate(type, d = {}) {
  const fields = {};
  for (const key of FIELD_KEYS[type]) fields[key] = Boolean(d.fields?.[key]);

  return {
    schoolName: str(d.schoolName, 60),
    subtitle: str(d.subtitle, 80),
    sessionLabel: str(d.sessionLabel, 20),
    phone: str(d.phone, 30),
    theme: THEMES.includes(d.theme) ? d.theme : 'maroon',
    logoUrl: safeUrl(d.logoUrl),
    signatureUrl: safeUrl(d.signatureUrl),
    signatureLabel: str(d.signatureLabel, 30),
    showSection: Boolean(d.showSection),
    fields,
  };
}

// { student: config | null, staff: config | null }  - null means "use the default design"
export async function getTemplates() {
  const r = await query(`SELECT card_type, config FROM icard_templates`);
  const out = { student: null, staff: null };
  for (const row of r.rows) out[row.card_type] = row.config;
  return out;
}

export async function saveTemplate(typeValue, d, userId) {
  const type = typeOf(typeValue);
  const config = sanitizeTemplate(type, d?.config ?? d);
  if (!config.schoolName) throw bad('School name is required.');

  const r = await query(
    `INSERT INTO icard_templates (card_type, config, updated_by)
     VALUES ($1, $2, $3)
     ON CONFLICT (card_type)
     DO UPDATE SET config = EXCLUDED.config, updated_by = EXCLUDED.updated_by, updated_at = NOW()
     RETURNING card_type, config`,
    [type, JSON.stringify(config), userId]
  );
  return r.rows[0];
}
