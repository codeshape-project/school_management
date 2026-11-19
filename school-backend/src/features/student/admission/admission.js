import { query } from '../../../config/db.js';
import { generateNumber } from '../../../utils/generateNumber.js';
import { listRecords, searchRecords, normalizeRecord } from '../../recordService.js';

const clean = (value) => String(value ?? '').trim();

const SELECT_COLUMNS = `id, record_no, session, class_name, section, name, phone,
  admission_no, status, form_data, photo_path, created_at, updated_at`;

async function nextAdmissionFormNo() {
  const prefix = `ADM-${new Date().getFullYear()}-`;

  const result = await query(
    `SELECT COALESCE(
              MAX(NULLIF(substring(form_data->>'admissionFormNo' from '([0-9]+)$'), '')::bigint),
              0
            ) + 1 AS n
       FROM students
      WHERE form_data->>'admissionFormNo' LIKE $1`,
    [`${prefix}%`]
  );

  return `${prefix}${String(result.rows[0].n).padStart(4, '0')}`;
}

export async function getByFormNo(formNo) {
  const term = clean(formNo);
  if (!term) return null;

  const result = await query(
    `SELECT ${SELECT_COLUMNS}
       FROM students
      WHERE LOWER(TRIM(form_data->>'admissionFormNo')) = LOWER($1)
         OR LOWER(record_no) = LOWER($1)
      ORDER BY (LOWER(TRIM(form_data->>'admissionFormNo')) = LOWER($1)) DESC,
               created_at DESC
      LIMIT 1`,
    [term]
  );

  return result.rows[0] || null;
}

export async function save(data = {}, userId) {
  const payload = { ...data };

  payload.admissionFormNo =
    clean(payload.admissionFormNo) || (await nextAdmissionFormNo());

  const common = normalizeRecord({
    ...payload,
    phone: payload.phone || payload.presentContactNo || payload.permanentContactNo,
  });

  const existing = await getByFormNo(payload.admissionFormNo);

  /* UPDATE */
  if (existing) {
    const merged = { ...(existing.form_data || {}), ...payload };

    const result = await query(
      `UPDATE students
          SET session = $1, class_name = $2, section = $3, name = $4,
              phone = $5, admission_no = $6, event_date = $7,
              form_data = $8, updated_at = NOW()
        WHERE id = $9
        RETURNING ${SELECT_COLUMNS}`,
      [
        common.session, common.className, common.section, common.name,
        common.phone, common.admissionNo, common.eventDate || null,
        JSON.stringify(merged), existing.id,
      ]
    );

    return { ...result.rows[0], updated: true };
  }

  /* INSERT */
  const result = await query(
    `INSERT INTO students
       (record_no, session, class_name, section, name, phone, admission_no,
        status, event_date, form_data, created_by)
     VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11)
     RETURNING ${SELECT_COLUMNS}`,
    [
      generateNumber('ADMI'), common.session, common.className, common.section,
      common.name, common.phone, common.admissionNo, common.status || 'active',
      common.eventDate || null, JSON.stringify(payload), userId,
    ]
  );

  return { ...result.rows[0], updated: false };
}

export async function list(filters) {
  return listRecords('admission', filters);
}

export async function search(filters) {
  return searchRecords('admission', filters);
}