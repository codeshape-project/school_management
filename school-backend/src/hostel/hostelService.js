import { pool, query } from '../config/db.js';

/* ---------------- small helpers ---------------- */

const bad = (message, status = 400) => Object.assign(new Error(message), { status });
const toInt = (v) => Number.parseInt(v, 10);
const clean = (v) => {
  const s = String(v ?? '').trim();
  return s === '' ? null : s;
};
const money = (v, fallback = 0) => {
  if (v === undefined || v === null || String(v).trim() === '') return fallback;
  const n = Number(String(v).replace(/,/g, '').trim());
  return Number.isFinite(n) ? Math.round(n * 100) / 100 : NaN;
};
const isDate = (v) => /^\d{4}-\d{2}-\d{2}$/.test(String(v || ''));
const statusFilter = (s, allowed = ['active', 'inactive']) =>
  s === 'all' ? '' : allowed.includes(s) ? s : allowed[0];
const like = (q) => String(q || '').trim();

const TYPES = ['boys', 'girls', 'mixed'];
export const PAY_MODES = ['Cash', 'Cheque', 'Online', 'UPI', 'Card', 'DD'];

// turns unique-constraint errors into friendly messages
function friendly(e, map = {}) {
  if (e && e.code === '23505') {
    const hit = Object.keys(map).find((k) => String(e.constraint || e.detail || '').includes(k));
    return bad(hit ? map[hit] : 'This record already exists.', 409);
  }
  return e;
}

/* =========================================================
   HOSTELS
========================================================= */

export async function listHostels({ q = '', status = 'active' } = {}) {
  const r = await query(
    `SELECT h.*,
            COALESCE(rm.rooms, 0)::int    AS room_count,
            COALESCE(rm.capacity, 0)::int AS capacity,
            COALESCE(oc.occupied, 0)::int AS occupied,
            (COALESCE(rm.capacity, 0) - COALESCE(oc.occupied, 0))::int AS vacant
       FROM hostels h
       LEFT JOIN (SELECT hostel_id, COUNT(*) AS rooms, SUM(capacity) AS capacity
                    FROM hostel_rooms WHERE status = 'active' GROUP BY hostel_id) rm ON rm.hostel_id = h.id
       LEFT JOIN (SELECT hostel_id, COUNT(*) AS occupied
                    FROM hostel_allotments WHERE status = 'active' GROUP BY hostel_id) oc ON oc.hostel_id = h.id
      WHERE ($1 = '' OR h.status = $1)
        AND ($2 = '' OR h.hostel_no ILIKE '%' || $2 || '%'
                     OR h.name ILIKE '%' || $2 || '%'
                     OR h.warden_name ILIKE '%' || $2 || '%')
      ORDER BY h.hostel_no`,
    [statusFilter(status), like(q)]
  );
  return r.rows;
}

export async function saveHostel(d, userId, id = null) {
  const name = String(d.name || '').trim();
  if (!name) throw bad('Hostel name is required.');
  const type = TYPES.includes(d.hostelType) ? d.hostelType : 'boys';
  const status = d.status === 'inactive' ? 'inactive' : 'active';

  try {
    if (id) {
      if (status === 'inactive') {
        const occ = await query(
          `SELECT COUNT(*)::int AS n FROM hostel_allotments WHERE hostel_id=$1 AND status='active'`, [id]
        );
        if (occ.rows[0].n > 0) {
          throw bad('Cannot make this hostel inactive while students are still allotted to it.', 409);
        }
      }
      const r = await query(
        `UPDATE hostels
            SET name=$2, hostel_type=$3, warden_name=$4, warden_phone=$5, address=$6,
                status=$7, updated_at=NOW()
          WHERE id=$1 RETURNING *`,
        [id, name, type, clean(d.wardenName), clean(d.wardenPhone), clean(d.address), status]
      );
      if (!r.rowCount) throw bad('Hostel not found.', 404);
      return r.rows[0];
    }

    const n = await query(`SELECT hostel_next_no('hostel','HS') AS no`);
    const r = await query(
      `INSERT INTO hostels (hostel_no,name,hostel_type,warden_name,warden_phone,address,status,created_by)
       VALUES ($1,$2,$3,$4,$5,$6,$7,$8) RETURNING *`,
      [n.rows[0].no, name, type, clean(d.wardenName), clean(d.wardenPhone), clean(d.address), status, userId]
    );
    return r.rows[0];
  } catch (e) {
    throw friendly(e, { name: 'A hostel with this name already exists.' });
  }
}

/* =========================================================
   ROOMS
========================================================= */

export async function listRooms({ q = '', status = 'active', hostelId = '' } = {}) {
  const r = await query(
    `SELECT r.*, h.name AS hostel_name, h.hostel_no,
            COALESCE(oc.occupied, 0)::int AS occupied,
            (r.capacity - COALESCE(oc.occupied, 0))::int AS vacant
       FROM hostel_rooms r
       JOIN hostels h ON h.id = r.hostel_id
       LEFT JOIN (SELECT room_id, COUNT(*) AS occupied
                    FROM hostel_allotments WHERE status = 'active' GROUP BY room_id) oc ON oc.room_id = r.id
      WHERE ($1 = '' OR r.status = $1)
        AND ($3::bigint IS NULL OR r.hostel_id = $3::bigint)
        AND ($2 = '' OR r.room_no ILIKE '%' || $2 || '%'
                     OR h.name ILIKE '%' || $2 || '%'
                     OR r.room_type ILIKE '%' || $2 || '%'
                     OR r.floor_no ILIKE '%' || $2 || '%')
      ORDER BY h.name, r.room_no`,
    [statusFilter(status), like(q), toInt(hostelId) || null]
  );
  return r.rows;
}

export async function saveRoom(d, userId, id = null) {
  const hostelId = toInt(d.hostelId);
  const roomNo = String(d.roomNo || '').trim();
  const capacity = toInt(d.capacity);
  const fee = money(d.monthlyFee);
  const status = d.status === 'inactive' ? 'inactive' : 'active';

  if (!hostelId) throw bad('Select a hostel.');
  if (!roomNo) throw bad('Room number is required.');
  if (!Number.isInteger(capacity) || capacity < 1) throw bad('Enter a valid capacity (number of beds).');
  if (!Number.isFinite(fee) || fee < 0) throw bad('Enter a valid monthly fee.');

  const h = await query(`SELECT id FROM hostels WHERE id=$1 AND status='active'`, [hostelId]);
  if (!h.rowCount) throw bad('Select an active hostel.');

  try {
    if (id) {
      const occ = await query(
        `SELECT COUNT(*)::int AS n FROM hostel_allotments WHERE room_id=$1 AND status='active'`, [id]
      );
      const occupied = occ.rows[0].n;
      if (capacity < occupied) {
        throw bad(`${occupied} student(s) are living in this room. Capacity cannot be less than that.`, 409);
      }
      if (status === 'inactive' && occupied > 0) {
        throw bad('Cannot make this room inactive while students are allotted to it.', 409);
      }
      const r = await query(
        `UPDATE hostel_rooms
            SET hostel_id=$2, room_no=$3, floor_no=$4, room_type=$5, capacity=$6,
                monthly_fee=$7, status=$8, updated_at=NOW()
          WHERE id=$1 RETURNING *`,
        [id, hostelId, roomNo, clean(d.floorNo), clean(d.roomType), capacity, fee, status]
      );
      if (!r.rowCount) throw bad('Room not found.', 404);
      return r.rows[0];
    }
    const r = await query(
      `INSERT INTO hostel_rooms (hostel_id,room_no,floor_no,room_type,capacity,monthly_fee,status,created_by)
       VALUES ($1,$2,$3,$4,$5,$6,$7,$8) RETURNING *`,
      [hostelId, roomNo, clean(d.floorNo), clean(d.roomType), capacity, fee, status, userId]
    );
    return r.rows[0];
  } catch (e) {
    throw friendly(e, { room_no: 'This room number already exists in the selected hostel.', hostel_id: 'This room number already exists in the selected hostel.' });
  }
}

/* =========================================================
   STUDENT SEARCH
========================================================= */

export async function findStudents(q = '') {
  const term = like(q);
  if (!term) return [];
  const r = await query(
    `SELECT s.id, s.record_no, s.name, s.admission_no, s.class_name, s.section, s.session,
            s.form_data->>'fatherName' AS father_name,
            s.form_data->>'category'   AS category,
            COALESCE(s.form_data->>'classRollNo', s.form_data->>'rollNo') AS roll_no,
            s.form_data->>'computerId' AS computer_id,
            EXISTS (SELECT 1 FROM hostel_allotments a
                     WHERE a.student_id = s.id AND a.status = 'active') AS allotted
       FROM students s
      WHERE s.name ILIKE '%' || $1 || '%'
         OR s.record_no ILIKE '%' || $1 || '%'
         OR s.admission_no ILIKE '%' || $1 || '%'
      ORDER BY s.name LIMIT 20`,
    [term]
  );
  return r.rows;
}

/* =========================================================
   ALLOTMENTS (with fee position)
========================================================= */

// allotment + months charged + paid + balance, calculated in one place
const ALLOT_FIN = `
  SELECT a.*, h.name AS hostel_name, h.hostel_no, r.room_no, r.room_type,
         m.months,
         (m.months * a.monthly_fee + a.security_deposit)                          AS charged,
         COALESCE(p.paid, 0)                                                      AS paid,
         COALESCE(p.discount, 0)                                                  AS discount,
         (m.months * a.monthly_fee + a.security_deposit
            - COALESCE(p.paid, 0) - COALESCE(p.discount, 0))                      AS balance,
         GREATEST(0, m.months * a.monthly_fee + a.security_deposit
            - COALESCE(p.paid, 0) - COALESCE(p.discount, 0))                      AS due
    FROM hostel_allotments a
    JOIN hostels h ON h.id = a.hostel_id
    JOIN hostel_rooms r ON r.id = a.room_id
   CROSS JOIN LATERAL (
          SELECT GREATEST(0,
                 (EXTRACT(YEAR  FROM LEAST(COALESCE(a.vacate_date, CURRENT_DATE), CURRENT_DATE))::int
                    - EXTRACT(YEAR  FROM a.join_date)::int) * 12
               +  EXTRACT(MONTH FROM LEAST(COALESCE(a.vacate_date, CURRENT_DATE), CURRENT_DATE))::int
               -  EXTRACT(MONTH FROM a.join_date)::int + 1) AS months
        ) m
    LEFT JOIN LATERAL (
          SELECT SUM(amount_paid) AS paid, SUM(cash_discount) AS discount
            FROM hostel_receipts WHERE allotment_id = a.id
        ) p ON TRUE`;

export async function listAllotments({ q = '', status = 'active', hostelId = '' } = {}) {
  const r = await query(
    `SELECT * FROM (${ALLOT_FIN}) x
      WHERE ($1 = '' OR x.status = $1)
        AND ($3::bigint IS NULL OR x.hostel_id = $3::bigint)
        AND ($2 = '' OR x.allotment_no ILIKE '%' || $2 || '%'
                     OR x.student_name ILIKE '%' || $2 || '%'
                     OR x.student_record_no ILIKE '%' || $2 || '%'
                     OR x.admission_no ILIKE '%' || $2 || '%'
                     OR x.hostel_name ILIKE '%' || $2 || '%'
                     OR x.room_no ILIKE '%' || $2 || '%')
      ORDER BY x.id DESC`,
    [statusFilter(status, ['active', 'vacated']), like(q), toInt(hostelId) || null]
  );
  return r.rows;
}

async function lockRoomWithSpace(c, roomId, hostelId, ignoreAllotmentId = null) {
  const rm = await c.query(
    `SELECT * FROM hostel_rooms WHERE id=$1 AND status='active' FOR UPDATE`, [roomId]
  );
  if (!rm.rowCount) throw bad('Select an active room.', 404);
  const room = rm.rows[0];
  if (String(room.hostel_id) !== String(hostelId)) throw bad('The selected room does not belong to this hostel.');

  const occ = await c.query(
    `SELECT COUNT(*)::int AS n FROM hostel_allotments
      WHERE room_id=$1 AND status='active' AND ($2::bigint IS NULL OR id <> $2::bigint)`,
    [roomId, ignoreAllotmentId]
  );
  if (occ.rows[0].n >= room.capacity) {
    throw bad(`Room ${room.room_no} is full (${room.capacity} of ${room.capacity} beds occupied).`, 409);
  }
  return room;
}

export async function createAllotment(d, userId) {
  const studentId = toInt(d.studentId);
  const hostelId = toInt(d.hostelId);
  const roomId = toInt(d.roomId);
  const joinDate = d.joinDate;
  const security = money(d.securityDeposit);

  if (!studentId) throw bad('Search and select a student.');
  if (!hostelId) throw bad('Select a hostel.');
  if (!roomId) throw bad('Select a room.');
  if (!isDate(joinDate)) throw bad('Enter a valid joining date.');
  if (!Number.isFinite(security) || security < 0) throw bad('Enter a valid security deposit.');

  const c = await pool.connect();
  try {
    await c.query('BEGIN');

    const room = await lockRoomWithSpace(c, roomId, hostelId);
    const fee = money(d.monthlyFee, Number(room.monthly_fee));
    if (!Number.isFinite(fee) || fee < 0) throw bad('Enter a valid monthly fee.');

    const s = await c.query(
      `SELECT id, record_no, name, admission_no, class_name, section, session,
              form_data->>'fatherName' AS father_name,
              form_data->>'category'   AS category,
              COALESCE(form_data->>'classRollNo', form_data->>'rollNo') AS roll_no,
              form_data->>'computerId' AS computer_id
         FROM students WHERE id=$1`,
      [studentId]
    );
    if (!s.rowCount) throw bad('Student not found.', 404);
    const st = s.rows[0];

    const already = await c.query(
      `SELECT allotment_no FROM hostel_allotments WHERE student_id=$1 AND status='active'`, [studentId]
    );
    if (already.rowCount) {
      throw bad(`${st.name} already has an active hostel allotment (${already.rows[0].allotment_no}).`, 409);
    }

    const bed = clean(d.bedNo);
    if (bed) {
      const taken = await c.query(
        `SELECT 1 FROM hostel_allotments WHERE room_id=$1 AND status='active' AND LOWER(bed_no)=LOWER($2)`,
        [roomId, bed]
      );
      if (taken.rowCount) throw bad(`Bed ${bed} in room ${room.room_no} is already occupied.`, 409);
    }

    const n = await c.query(`SELECT hostel_next_no('allotment','HA') AS no`);
    const r = await c.query(
      `INSERT INTO hostel_allotments
         (allotment_no, student_id, student_name, student_record_no, admission_no, class_name, section,
          session, father_name, category, roll_no, computer_id, hostel_id, room_id, bed_no, join_date,
          monthly_fee, security_deposit, remarks, created_by)
       VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12,$13,$14,$15,$16,$17,$18,$19,$20)
       RETURNING *`,
      [n.rows[0].no, st.id, st.name, st.record_no, st.admission_no, st.class_name, st.section,
       st.session, st.father_name, st.category, st.roll_no, st.computer_id, hostelId, roomId, bed,
       joinDate, fee, security, clean(d.remarks), userId]
    );
    await c.query('COMMIT');
    return r.rows[0];
  } catch (e) {
    await c.query('ROLLBACK');
    throw friendly(e, { uq_hostel_active_student: 'This student already has an active hostel allotment.', uq_hostel_active_bed: 'This bed is already occupied.' });
  } finally {
    c.release();
  }
}

export async function updateAllotment(id, d) {
  const hostelId = toInt(d.hostelId);
  const roomId = toInt(d.roomId);
  const fee = money(d.monthlyFee);
  const security = money(d.securityDeposit);

  if (!hostelId || !roomId) throw bad('Select a hostel and a room.');
  if (!isDate(d.joinDate)) throw bad('Enter a valid joining date.');
  if (!Number.isFinite(fee) || fee < 0) throw bad('Enter a valid monthly fee.');
  if (!Number.isFinite(security) || security < 0) throw bad('Enter a valid security deposit.');

  const c = await pool.connect();
  try {
    await c.query('BEGIN');
    const cur = await c.query(`SELECT * FROM hostel_allotments WHERE id=$1 FOR UPDATE`, [id]);
    if (!cur.rowCount) throw bad('Allotment not found.', 404);
    if (cur.rows[0].status !== 'active') throw bad('A vacated allotment cannot be modified.', 409);

    const room = await lockRoomWithSpace(c, roomId, hostelId, id);
    const bed = clean(d.bedNo);
    if (bed) {
      const taken = await c.query(
        `SELECT 1 FROM hostel_allotments
          WHERE room_id=$1 AND status='active' AND LOWER(bed_no)=LOWER($2) AND id <> $3`,
        [roomId, bed, id]
      );
      if (taken.rowCount) throw bad(`Bed ${bed} in room ${room.room_no} is already occupied.`, 409);
    }

    const r = await c.query(
      `UPDATE hostel_allotments
          SET hostel_id=$2, room_id=$3, bed_no=$4, join_date=$5, monthly_fee=$6,
              security_deposit=$7, remarks=$8, updated_at=NOW()
        WHERE id=$1 RETURNING *`,
      [id, hostelId, roomId, bed, d.joinDate, fee, security, clean(d.remarks)]
    );
    await c.query('COMMIT');
    return r.rows[0];
  } catch (e) {
    await c.query('ROLLBACK');
    throw friendly(e, { uq_hostel_active_bed: 'This bed is already occupied.' });
  } finally {
    c.release();
  }
}

export async function vacateAllotment(id, d) {
  const c = await pool.connect();
  try {
    await c.query('BEGIN');
    const cur = await c.query(`SELECT * FROM hostel_allotments WHERE id=$1 FOR UPDATE`, [id]);
    if (!cur.rowCount) throw bad('Allotment not found.', 404);
    const row = cur.rows[0];
    if (row.status !== 'active') throw bad('This student has already vacated the hostel.', 409);

    if (!isDate(d.vacateDate)) throw bad('Enter a valid vacate date.');
    const chk = await c.query(
      `SELECT ($1::date >= $2::date) AS after_join, ($1::date <= CURRENT_DATE) AS not_future`,
      [d.vacateDate, row.join_date]
    );
    if (!chk.rows[0].after_join) throw bad('Vacate date cannot be before the joining date.');
    if (!chk.rows[0].not_future) throw bad('Vacate date cannot be in the future.');

    const r = await c.query(
      `UPDATE hostel_allotments
          SET status='vacated', vacate_date=$2, vacate_remarks=$3, updated_at=NOW()
        WHERE id=$1 RETURNING *`,
      [id, d.vacateDate, clean(d.remarks)]
    );
    await c.query('COMMIT');
    return r.rows[0];
  } catch (e) {
    await c.query('ROLLBACK');
    throw e;
  } finally {
    c.release();
  }
}

/* =========================================================
   FEES
========================================================= */

const RECEIPT_SELECT = `
  SELECT r.*, a.allotment_no, a.student_name, a.student_record_no, a.admission_no, a.class_name,
         a.section, a.session, a.father_name, a.category, a.roll_no, a.computer_id, a.bed_no
    FROM hostel_receipts r
    JOIN hostel_allotments a ON a.id = r.allotment_id`;

export async function getFeeSummary(allotmentId) {
  const a = await query(`SELECT * FROM (${ALLOT_FIN}) x WHERE x.id = $1`, [toInt(allotmentId)]);
  if (!a.rowCount) throw bad('Allotment not found.', 404);
  const rc = await query(`${RECEIPT_SELECT} WHERE r.allotment_id = $1 ORDER BY r.id DESC`, [toInt(allotmentId)]);
  return { allotment: a.rows[0], receipts: rc.rows };
}

export async function collectFee(d, userId) {
  const allotmentId = toInt(d.allotmentId);
  const paid = money(d.amountPaid);
  const discount = money(d.cashDiscount);
  const mode = PAY_MODES.includes(d.paymentMode) ? d.paymentMode : 'Cash';
  const payFor = String(d.payFor || '').trim() || 'Hostel Fee';
  const receiptDate = d.receiptDate || null;

  if (!allotmentId) throw bad('Select a hostel student first.');
  if (!Number.isFinite(paid) || paid <= 0) throw bad('Enter a valid amount to be paid.');
  if (!Number.isFinite(discount) || discount < 0) throw bad('Enter a valid discount.');
  if (receiptDate && !isDate(receiptDate)) throw bad('Enter a valid receipt date.');

  const c = await pool.connect();
  try {
    await c.query('BEGIN');
    const lock = await c.query(`SELECT id FROM hostel_allotments WHERE id=$1 FOR UPDATE`, [allotmentId]);
    if (!lock.rowCount) throw bad('Allotment not found.', 404);

    if (receiptDate) {
      const chk = await c.query(`SELECT ($1::date <= CURRENT_DATE) AS ok`, [receiptDate]);
      if (!chk.rows[0].ok) throw bad('Receipt date cannot be in the future.');
    }

    const fin = await c.query(`SELECT * FROM (${ALLOT_FIN}) x WHERE x.id = $1`, [allotmentId]);
    const a = fin.rows[0];
    const balanceAfter = Math.round((Number(a.balance) - paid - discount) * 100) / 100;

    const n = await c.query(`SELECT hostel_next_no('receipt','HR') AS no`);
    const ins = await c.query(
      `INSERT INTO hostel_receipts
         (receipt_no, allotment_id, receipt_date, pay_for, paid_months, amount_paid, cash_discount,
          payment_mode, payment_ref, remarks, hostel_name, room_no, balance_after, created_by)
       VALUES ($1,$2,COALESCE($3::date, CURRENT_DATE),$4,$5,$6,$7,$8,$9,$10,$11,$12,$13,$14)
       RETURNING id`,
      [n.rows[0].no, allotmentId, receiptDate, payFor, clean(d.paidMonths), paid, discount, mode,
       clean(d.paymentRef), clean(d.remarks), a.hostel_name, a.room_no, balanceAfter, userId]
    );
    await c.query('COMMIT');
    return getReceipt(ins.rows[0].id);
  } catch (e) {
    await c.query('ROLLBACK');
    throw e;
  } finally {
    c.release();
  }
}

export async function getReceipt(id) {
  const r = await query(`${RECEIPT_SELECT} WHERE r.id = $1`, [toInt(id)]);
  if (!r.rowCount) throw bad('Receipt not found.', 404);
  return r.rows[0];
}

export async function listReceipts({ q = '', from = '', to = '' } = {}) {
  const r = await query(
    `${RECEIPT_SELECT}
      WHERE ($1::date IS NULL OR r.receipt_date >= $1::date)
        AND ($2::date IS NULL OR r.receipt_date <= $2::date)
        AND ($3 = '' OR r.receipt_no ILIKE '%' || $3 || '%'
                     OR a.student_name ILIKE '%' || $3 || '%'
                     OR a.admission_no ILIKE '%' || $3 || '%'
                     OR a.allotment_no ILIKE '%' || $3 || '%')
      ORDER BY r.receipt_date DESC, r.id DESC
      LIMIT 2000`,
    [isDate(from) ? from : null, isDate(to) ? to : null, like(q)]
  );
  return r.rows;
}

/* =========================================================
   DUES
========================================================= */

export async function duesList({ q = '', status = 'all', hostelId = '', onlyDue = 'true' } = {}) {
  const r = await query(
    `SELECT * FROM (${ALLOT_FIN}) x
      WHERE ($1 = '' OR x.status = $1)
        AND ($3::bigint IS NULL OR x.hostel_id = $3::bigint)
        AND ($4::boolean = FALSE OR x.due > 0)
        AND ($2 = '' OR x.allotment_no ILIKE '%' || $2 || '%'
                     OR x.student_name ILIKE '%' || $2 || '%'
                     OR x.admission_no ILIKE '%' || $2 || '%'
                     OR x.hostel_name ILIKE '%' || $2 || '%')
      ORDER BY x.due DESC, x.student_name`,
    [statusFilter(status, ['active', 'vacated']), like(q), toInt(hostelId) || null, String(onlyDue) !== 'false']
  );
  return r.rows;
}

/* =========================================================
   REPORTS
========================================================= */

export async function reportData({ from = '', to = '' } = {}) {
  const [hostels, rooms, allotments, receipts, dues] = await Promise.all([
    listHostels({ status: 'all' }),
    listRooms({ status: 'all' }),
    listAllotments({ status: 'all' }),
    listReceipts({ from, to }),
    duesList({ status: 'all', onlyDue: 'true' }),
  ]);
  return { hostels, rooms, allotments, receipts, dues };
}
