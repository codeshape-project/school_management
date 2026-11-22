import { query } from '../../../config/db.js';
import { createRecord } from '../../recordService.js';

export const FEE_MONTHS = [
  'Admission', 'April', 'May', 'June', 'July', 'August', 'September',
  'October', 'November', 'December', 'January', 'February', 'March',
];

const money = (v) => Math.round((Number(v) + Number.EPSILON) * 100) / 100;

function badRequest(message) {
  return Object.assign(new Error(message), { status: 400 });
}

/* Clean + validate what the browser sent. Totals are always recalculated here. */
export function buildFormat(input = {}) {
  const session = String(input.session || '').trim();
  const className = String(input.className || '').trim();

  if (!session) throw badRequest('Please select a session.');
  if (!className) throw badRequest('Please select a class.');

  const months = [];
  for (const row of Array.isArray(input.months) ? input.months : []) {
    if (!FEE_MONTHS.includes(row?.month)) throw badRequest(`Invalid month: ${row?.month}`);
    const amount = Number(row.amount);
    if (!Number.isFinite(amount) || amount < 0) throw badRequest(`Invalid fee for ${row.month}.`);
    if (amount === 0) continue;
    if (months.some((m) => m.month === row.month)) throw badRequest(`${row.month} is added twice.`);
    months.push({ month: row.month, amount: money(amount) });
  }
  months.sort((a, b) => FEE_MONTHS.indexOf(a.month) - FEE_MONTHS.indexOf(b.month));

  const extraFees = [];
  for (const row of Array.isArray(input.extraFees) ? input.extraFees : []) {
    const title = String(row?.title || '').trim();
    const amount = Number(row?.amount);
    if (!FEE_MONTHS.includes(row?.month)) throw badRequest('Each extra fee needs a month.');
    if (!title) throw badRequest('Each extra fee needs a name.');
    if (!Number.isFinite(amount) || amount <= 0) throw badRequest(`Enter a valid amount for "${title}".`);
    extraFees.push({ month: row.month, title: title.slice(0, 120), amount: money(amount) });
  }
  extraFees.sort((a, b) => FEE_MONTHS.indexOf(a.month) - FEE_MONTHS.indexOf(b.month));

  const monthlyTotal = money(months.reduce((s, m) => s + m.amount, 0));
  const extraTotal = money(extraFees.reduce((s, e) => s + e.amount, 0));
  const totalFee = money(monthlyTotal + extraTotal);

  if (totalFee <= 0) throw badRequest('Add at least one fee amount before saving.');

  return {
    schemaVersion: 2,
    session,
    className,
    date: new Date().toISOString().slice(0, 10),
    months,
    extraFees,
    monthlyTotal,
    extraTotal,
    totalFee,
  };
}

function conflict(format) {
  return Object.assign(
    new Error(`Fee format for ${format.className} (${format.session}) already exists.`),
    { status: 409 }
  );
}

/* One format by session + class, or null */
export async function findOne(session, className) {
  const result = await query(
    `SELECT id, record_no, session, class_name, form_data, created_at
       FROM fee_formats
      WHERE session = $1
        AND class_name = $2
        AND form_data->>'schemaVersion' = '2'
      LIMIT 1`,
    [session, className]
  );
  return result.rows[0] || null;
}

/* Create a fee format. Fails with 409 if this session + class already has one. */
export async function save(data, userId) {
  const format = buildFormat(data);

  if (await findOne(format.session, format.className)) throw conflict(format);

  try {
    return await createRecord('feeFormat', format, { userId });
  } catch (err) {
    if (err.code === '23505') throw conflict(format);
    throw err;
  }
}

/* Update an existing format while keeping its session/class identity unique. */
export async function update(id, data) {
  if (!id) throw badRequest('Fee format ID is required.');
  const format = buildFormat(data);
  const existing = await query(
    `SELECT id FROM fee_formats WHERE id = $1 LIMIT 1`,
    [id]
  );
  if (!existing.rows[0]) {
    throw Object.assign(new Error('Fee format not found.'), { status: 404 });
  }

  try {
    const result = await query(
      `UPDATE fee_formats
          SET session = $2, class_name = $3, form_data = $4::jsonb
        WHERE id = $1
        RETURNING id, record_no, session, class_name, form_data, created_at`,
      [id, format.session, format.className, JSON.stringify(format)]
    );
    return result.rows[0];
  } catch (err) {
    if (err.code === '23505') throw conflict(format);
    throw err;
  }
}

/* GET /fee-format?session=..&className=..  -> that format (or null)
   GET /fee-format?session=..               -> classes that already have a format */
export async function list(filters = {}) {
  const session = String(filters.session || '').trim();
  const className = String(filters.className || '').trim();

  if (session && className) return findOne(session, className);

  if (session) {
    const result = await query(
      `SELECT class_name, record_no, form_data->>'totalFee' AS total_fee
         FROM fee_formats
        WHERE session = $1 AND form_data->>'schemaVersion' = '2'
        ORDER BY class_name`,
      [session]
    );
    return result.rows;
  }

  return [];
}
