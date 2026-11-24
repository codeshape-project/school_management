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
const num = (v, fallback = 0) => {
  if (v === undefined || v === null || String(v).trim() === '') return fallback;
  const n = Number(String(v).replace(/,/g, '').trim());
  return Number.isFinite(n) ? Math.round(n * 100) / 100 : NaN;
};
const isDate = (v) => /^\d{4}-\d{2}-\d{2}$/.test(String(v || ''));
const round2 = (n) => Math.round(n * 100) / 100;

export const MONTHS = [
  'January', 'February', 'March', 'April', 'May', 'June',
  'July', 'August', 'September', 'October', 'November', 'December',
];
export const PAY_MODES = ['Cash', 'Bank Transfer', 'Cheque', 'UPI', 'Online'];

const daysIn = (month, year) => new Date(year, month, 0).getDate();
const pad = (n) => String(n).padStart(2, '0');

// academic session in the same style the rest of the app uses: "2026 - 27" (April to March)
const sessionOf = (year, month) =>
  month >= 4
    ? `${year} - ${pad((year + 1) % 100)}`
    : `${year - 1} - ${pad(year % 100)}`;

const todayParts = () => {
  const ist = new Date(Date.now() + 5.5 * 60 * 60 * 1000); // current date in India
  return { y: ist.getUTCFullYear(), m: ist.getUTCMonth() + 1, d: ist.getUTCDate() };
};
const todayISO = () => {
  const t = todayParts();
  return `${t.y}-${pad(t.m)}-${pad(t.d)}`;
};

function periodOf(monthValue, yearValue) {
  const month = toInt(monthValue);
  const year = toInt(yearValue);
  if (!Number.isInteger(month) || month < 1 || month > 12) throw bad('Select a valid month.');
  if (!Number.isInteger(year) || year < 2000 || year > 2100) throw bad('Enter a valid year.');
  const t = todayParts();
  if (year > t.y || (year === t.y && month > t.m)) {
    throw bad('This month has not started yet. Choose the current or an earlier month.');
  }
  return { month, year, monthName: MONTHS[month - 1] };
}

function amount(d, key, label) {
  const v = num(d[key]);
  if (!Number.isFinite(v) || v < 0) throw bad(`Enter a valid ${label}.`);
  return v;
}

function friendly(e, message) {
  if (e && e.code === '23505') return bad(message, 409);
  return e;
}

// removes empty values so the saved form data stays tidy
const compact = (obj) =>
  Object.fromEntries(
    Object.entries(obj).filter(([, v]) => v !== null && v !== undefined && v !== '')
  );

/* =========================================================
   STAFF
========================================================= */

const TEXT_FIELDS = [
  'staffType', 'fatherName', 'gender', 'maritalStatus', 'bloodGroup', 'category',
  'qualification', 'experience', 'alternateMobile', 'address', 'city', 'state', 'pincode',
  'aadhaarNo', 'panNo', 'pfNo', 'bankName', 'accountNo', 'ifscCode', 'remarks',
];

export async function saveStaff(d, userId, id = null) {
  const name = String(d.name || '').trim();
  const department = clean(d.department);
  const designation = clean(d.designation);
  const mobile = clean(d.mobile);
  const email = clean(d.email);

  if (!name) throw bad('Staff name is required.');
  if (!department) throw bad('Select or enter the department.');
  if (!designation) throw bad('Select or enter the designation.');
  if (mobile && !/^[0-9+\-\s]{7,15}$/.test(mobile)) throw bad('Enter a valid mobile number.');
  if (email && !/^\S+@\S+\.\S+$/.test(email)) throw bad('Enter a valid email address.');
  if (d.joiningDate && !isDate(d.joiningDate)) throw bad('Enter a valid joining date.');
  if (d.dateOfBirth && !isDate(d.dateOfBirth)) throw bad('Enter a valid date of birth.');
  if (d.aadhaarNo && !/^[0-9\s]{12,14}$/.test(String(d.aadhaarNo).trim())) {
    throw bad('Aadhaar number must be 12 digits.');
  }

  const basicSalary = amount(d, 'basicSalary', 'basic salary');
  const hra = amount(d, 'hra', 'HRA');
  const da = amount(d, 'da', 'DA');
  const ta = amount(d, 'ta', 'TA');
  const otherAllowance = amount(d, 'otherAllowance', 'other allowance');
  const pf = amount(d, 'pf', 'PF');
  const esi = amount(d, 'esi', 'ESI');
  const professionalTax = amount(d, 'professionalTax', 'professional tax');
  const tds = amount(d, 'tds', 'TDS');
  const otherDeduction = amount(d, 'otherDeduction', 'other deduction');

  const grossSalary = round2(basicSalary + hra + da + ta + otherAllowance);
  const totalDeductions = round2(pf + esi + professionalTax + tds + otherDeduction);
  const netSalary = round2(grossSalary - totalDeductions);
  if (netSalary < 0) throw bad('Deductions cannot be more than the gross salary.');

  const status = String(d.status).toLowerCase() === 'inactive' ? 'inactive' : 'active';
  const joiningDate = d.joiningDate || null;
  const session = joiningDate
    ? sessionOf(toInt(joiningDate.slice(0, 4)), toInt(joiningDate.slice(5, 7)))
    : sessionOf(todayParts().y, todayParts().m);

  const form = compact({
    ...Object.fromEntries(TEXT_FIELDS.map((k) => [k, clean(d[k])])),
    name,
    email,
    department,
    designation,
    dateOfBirth: clean(d.dateOfBirth),
    joiningDate,
    basicSalary, hra, da, ta, otherAllowance,
    grossSalary,
    pf, esi, professionalTax, tds, otherDeduction,
    totalDeductions,
    netSalary,
  });

  try {
    if (id) {
      const r = await query(
        `UPDATE staff
            SET session=$2, class_name=$3, section=$4, name=$5, phone=$6, status=$7,
                event_date=$8, form_data=$9, updated_at=NOW()
          WHERE id=$1 RETURNING *`,
        [id, session, department, designation, name, mobile, status, joiningDate, JSON.stringify(form)]
      );
      if (!r.rowCount) throw bad('Staff record not found.', 404);
      return { ...r.rows[0], updated: true };
    }

    const n = await query(`SELECT staff_next_no('staff','STF') AS no`);
    const r = await query(
      `INSERT INTO staff
         (record_no, session, class_name, section, name, phone, status, event_date, form_data, created_by)
       VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10) RETURNING *`,
      [n.rows[0].no, session, department, designation, name, mobile, status, joiningDate,
       JSON.stringify(form), userId]
    );
    return { ...r.rows[0], updated: false };
  } catch (e) {
    throw friendly(e, 'This staff record already exists.');
  }
}

export async function getStaff(id) {
  const r = await query(`SELECT * FROM staff WHERE id = $1`, [toInt(id)]);
  if (!r.rowCount) throw bad('Staff record not found.', 404);
  return r.rows[0];
}

// live search used by every staff form: nothing is returned until something is typed
export async function searchStaff({ q = '', by = 'name', status = 'active' } = {}) {
  const term = String(q).trim();
  if (!term) return [];

  const column =
    by === 'contact'
      ? `(COALESCE(phone, '') || ' ' || COALESCE(form_data->>'alternateMobile', ''))`
      : by === 'staffId'
      ? `record_no`
      : `name`;
  const wanted = String(status || '').toLowerCase();

  const r = await query(
    `SELECT * FROM staff
      WHERE ${column} ILIKE '%' || $1 || '%'
        AND ($2 = '' OR $2 = 'all' OR LOWER(status) = $2)
      ORDER BY name
      LIMIT 30`,
    [term, wanted]
  );
  return r.rows;
}

/* =========================================================
   ATTENDANCE  (one record per staff per month)
========================================================= */

export async function getAttendance(staffId, monthValue, yearValue) {
  const month = toInt(monthValue);
  const year = toInt(yearValue);
  const r = await query(
    `SELECT * FROM staff_attendance WHERE staff_id=$1 AND att_year=$2 AND att_month=$3`,
    [toInt(staffId), year, month]
  );
  return r.rows[0] || null;
}

export async function saveAttendance(d, userId) {
  const staffId = toInt(d.staffId);
  if (!staffId) throw bad('Search and select a staff member.');
  const { month, year, monthName } = periodOf(d.month, d.year);
  const staff = await getStaff(staffId);

  const monthDays = daysIn(month, year);
  const workingDays = num(d.workingDays, monthDays);
  const presentDays = num(d.presentDays);
  const halfDays = num(d.halfDays);
  const paidLeaveDays = num(d.paidLeaveDays);

  for (const [v, label] of [
    [workingDays, 'working days'], [presentDays, 'present days'],
    [halfDays, 'half days'], [paidLeaveDays, 'paid leave days'],
  ]) {
    if (!Number.isFinite(v) || v < 0) throw bad(`Enter valid ${label}.`);
  }
  if (workingDays < 1 || workingDays > monthDays) {
    throw bad(`Working days must be between 1 and ${monthDays} for ${monthName} ${year}.`);
  }
  if (presentDays + halfDays + paidLeaveDays > workingDays) {
    throw bad('Present + half days + paid leave cannot be more than the working days.');
  }

  const paidDays = round2(presentDays + halfDays * 0.5 + paidLeaveDays);
  const absentDays = round2(workingDays - paidDays);

  const form = compact({
    staffId: staff.record_no, month, monthName, year,
    workingDays, presentDays, halfDays, paidLeaveDays, paidDays, absentDays,
    remarks: clean(d.remarks),
  });
  const session = sessionOf(year, month);
  const monthStart = `${year}-${pad(month)}-01`;

  const c = await pool.connect();
  try {
    await c.query('BEGIN');
    const ex = await c.query(
      `SELECT id FROM staff_attendance WHERE staff_id=$1 AND att_year=$2 AND att_month=$3 FOR UPDATE`,
      [staffId, year, month]
    );
    let row;
    if (ex.rowCount) {
      row = (await c.query(
        `UPDATE staff_attendance
            SET session=$2, class_name=$3, section=$4, name=$5, phone=$6, admission_no=$7,
                event_date=$8, form_data=$9, updated_at=NOW()
          WHERE id=$1 RETURNING *`,
        [ex.rows[0].id, session, staff.class_name, staff.section, staff.name, staff.phone,
         staff.record_no, monthStart, JSON.stringify(form)]
      )).rows[0];
    } else {
      const n = await c.query(`SELECT staff_next_no('attendance','SA') AS no`);
      row = (await c.query(
        `INSERT INTO staff_attendance
           (record_no, staff_id, att_month, att_year, session, class_name, section, name, phone,
            admission_no, status, event_date, form_data, created_by)
         VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,'active',$11,$12,$13) RETURNING *`,
        [n.rows[0].no, staffId, month, year, session, staff.class_name, staff.section, staff.name,
         staff.phone, staff.record_no, monthStart, JSON.stringify(form), userId]
      )).rows[0];
    }
    await c.query('COMMIT');
    return { ...row, updated: ex.rowCount > 0 };
  } catch (e) {
    await c.query('ROLLBACK');
    throw friendly(e, 'Attendance for this staff and month already exists.');
  } finally {
    c.release();
  }
}

/* =========================================================
   SALARY  (one record per staff per month)
========================================================= */

// everything the salary form needs for one staff + month
export async function prepareSalary(staffIdValue, monthValue, yearValue) {
  const staffId = toInt(staffIdValue);
  if (!staffId) throw bad('Search and select a staff member.');
  const { month, year } = periodOf(monthValue, yearValue);

  const staff = await getStaff(staffId);
  const attendance = await getAttendance(staffId, month, year);
  const ex = await query(
    `SELECT * FROM staff_salary WHERE staff_id=$1 AND salary_year=$2 AND salary_month=$3`,
    [staffId, year, month]
  );

  return { staff, attendance, existing: ex.rows[0] || null, daysInMonth: daysIn(month, year) };
}

export async function saveSalary(d, userId) {
  const staffId = toInt(d.staffId);
  if (!staffId) throw bad('Search and select a staff member.');
  const { month, year, monthName } = periodOf(d.month, d.year);
  const staff = await getStaff(staffId);

  const monthDays = daysIn(month, year);
  const workingDays = num(d.workingDays, monthDays);
  const paidDays = num(d.paidDays, workingDays);
  if (!Number.isFinite(workingDays) || workingDays < 1 || workingDays > monthDays) {
    throw bad(`Working days must be between 1 and ${monthDays} for ${monthName} ${year}.`);
  }
  if (!Number.isFinite(paidDays) || paidDays < 0 || paidDays > workingDays) {
    throw bad('Paid days must be between 0 and the working days.');
  }
  const lopDays = round2(workingDays - paidDays);

  const basicSalary = amount(d, 'basicSalary', 'basic salary');
  const hra = amount(d, 'hra', 'HRA');
  const da = amount(d, 'da', 'DA');
  const ta = amount(d, 'ta', 'TA');
  const otherAllowance = amount(d, 'otherAllowance', 'other allowance');
  const grossSalary = round2(basicSalary + hra + da + ta + otherAllowance);
  if (grossSalary <= 0) throw bad('Gross salary must be more than zero.');

  const pf = amount(d, 'pf', 'PF');
  const esi = amount(d, 'esi', 'ESI');
  const professionalTax = amount(d, 'professionalTax', 'professional tax');
  const tds = amount(d, 'tds', 'TDS');
  const advance = amount(d, 'advance', 'advance recovery');
  const otherDeduction = amount(d, 'otherDeduction', 'other deduction');

  const lopGiven = d.lopDeduction !== undefined && String(d.lopDeduction).trim() !== '';
  const lopDeduction = lopGiven
    ? amount(d, 'lopDeduction', 'loss of pay deduction')
    : round2((grossSalary / workingDays) * lopDays);

  const totalDeductions = round2(pf + esi + professionalTax + tds + advance + otherDeduction + lopDeduction);
  const netSalary = round2(grossSalary - totalDeductions);
  if (netSalary < 0) throw bad('Deductions cannot be more than the gross salary.');

  const status = String(d.status).toLowerCase() === 'pending' ? 'pending' : 'paid';
  const paymentDate = clean(d.paymentDate);
  const paymentMode = clean(d.paymentMode);
  if (status === 'paid') {
    if (!paymentDate || !isDate(paymentDate)) throw bad('Select the payment date.');
    if (paymentDate > todayISO()) throw bad('Payment date cannot be in the future.');
    if (!PAY_MODES.includes(paymentMode)) throw bad('Select the payment mode.');
  }

  const sf = staff.form_data || {};
  const form = compact({
    staffId: staff.record_no, month, monthName, year,
    fatherName: sf.fatherName, joiningDate: sf.joiningDate, bankName: sf.bankName,
    accountNo: sf.accountNo, panNo: sf.panNo, pfNo: sf.pfNo,
    workingDays, paidDays, lopDays,
    basicSalary, hra, da, ta, otherAllowance, grossSalary,
    pf, esi, professionalTax, tds, advance, otherDeduction, lopDeduction,
    totalDeductions, netSalary,
    paymentDate: status === 'paid' ? paymentDate : null,
    paymentRef: clean(d.paymentRef),
    remarks: clean(d.remarks),
  });
  const session = sessionOf(year, month);
  const eventDate = status === 'paid' ? paymentDate : `${year}-${pad(month)}-01`;
  const modeColumn = status === 'paid' ? paymentMode : null;

  const c = await pool.connect();
  try {
    await c.query('BEGIN');
    const ex = await c.query(
      `SELECT id FROM staff_salary WHERE staff_id=$1 AND salary_year=$2 AND salary_month=$3 FOR UPDATE`,
      [staffId, year, month]
    );
    let row;
    if (ex.rowCount) {
      row = (await c.query(
        `UPDATE staff_salary
            SET session=$2, class_name=$3, section=$4, name=$5, phone=$6, admission_no=$7,
                status=$8, event_date=$9, payment_mode=$10, form_data=$11, updated_at=NOW()
          WHERE id=$1 RETURNING *`,
        [ex.rows[0].id, session, staff.class_name, staff.section, staff.name, staff.phone,
         staff.record_no, status, eventDate, modeColumn, JSON.stringify(form)]
      )).rows[0];
    } else {
      const n = await c.query(`SELECT staff_next_no('salary','SL') AS no`);
      row = (await c.query(
        `INSERT INTO staff_salary
           (record_no, staff_id, salary_month, salary_year, session, class_name, section, name, phone,
            admission_no, status, event_date, payment_mode, form_data, created_by)
         VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12,$13,$14,$15) RETURNING *`,
        [n.rows[0].no, staffId, month, year, session, staff.class_name, staff.section, staff.name,
         staff.phone, staff.record_no, status, eventDate, modeColumn, JSON.stringify(form), userId]
      )).rows[0];
    }
    await c.query('COMMIT');
    return { ...row, updated: ex.rowCount > 0 };
  } catch (e) {
    await c.query('ROLLBACK');
    throw friendly(e, 'Salary for this staff and month already exists.');
  } finally {
    c.release();
  }
}
