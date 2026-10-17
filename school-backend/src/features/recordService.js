import { query } from '../config/db.js';
import { generateNumber } from '../utils/generateNumber.js';

export const TABLE_MAP = Object.freeze({
  enquiry: 'enquiries', registration: 'registrations', admission: 'students', student: 'students',
  studentReport: 'students', transferCertificate: 'transfer_certificates', complaint: 'complaints',
  feeFormat: 'fee_formats', feeDues: 'fee_dues', receipt: 'fee_receipts', collection: 'fee_receipts',
  blankReceipt: 'fee_blank_receipts', studentLedger: 'fee_payments',
  transportAllotment: 'transport_allotments', conveyanceStudent: 'conveyance_students',
  conveyanceAmount: 'conveyance_amounts', vehiclewiseStudent: 'transport_allotments'
});

const COMMON_ALIASES = {
  session: ['session','academicSession'], className: ['className','class','admissionClass'], section: ['section'],
  name: ['name','studentName'], phone: ['phone','mobile','contactNo','contact'], admissionNo: ['admissionNo','admissionNumber'],
  status: ['status'], date: ['date','formDate','recDate','admissionDate','dateOfAdmission','asOnDate'],
  paymentMode: ['mode','payMode','paymentType'], vehicleNo: ['vehicleNo','vehicle'], route: ['route','routeName']
};

function pick(data, aliases) {
  for (const key of aliases) if (data[key] !== undefined && data[key] !== null && data[key] !== '') return data[key];
  return null;
}

function normalizeDate(value) {
  if (!value) return null;
  const text = String(value).trim();
  if (/^\d{4}-\d{2}-\d{2}$/.test(text)) return text;
  const match = text.match(/^(\d{2})[-\/](\d{2})[-\/](\d{4})$/);
  if (match) return `${match[3]}-${match[2]}-${match[1]}`;
  return null;
}

export function normalizeRecord(data = {}) {
  return {
    session: pick(data, COMMON_ALIASES.session), className: pick(data, COMMON_ALIASES.className),
    section: pick(data, COMMON_ALIASES.section), name: pick(data, COMMON_ALIASES.name),
    phone: pick(data, COMMON_ALIASES.phone), admissionNo: pick(data, COMMON_ALIASES.admissionNo),
    status: pick(data, COMMON_ALIASES.status), eventDate: normalizeDate(pick(data, COMMON_ALIASES.date)),
    paymentMode: pick(data, COMMON_ALIASES.paymentMode), vehicleNo: pick(data, COMMON_ALIASES.vehicleNo),
    routeName: pick(data, COMMON_ALIASES.route)
  };
}

export async function createRecord(type, data, meta = {}) {
  const table = TABLE_MAP[type];
  if (!table) throw Object.assign(new Error(`Unknown form type: ${type}`), { status: 400 });
  const common = normalizeRecord(data);
  const recordNo = generateNumber(type.slice(0,4).toUpperCase());
  const result = await query(
    `INSERT INTO ${table}
      (record_no, session, class_name, section, name, phone, admission_no, status, event_date, payment_mode, vehicle_no, route_name, form_data, created_by)
     VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12,$13,$14)
     RETURNING id, record_no, created_at`,
    [recordNo, common.session, common.className, common.section, common.name, common.phone, common.admissionNo,
     common.status || 'active', common.eventDate || null, common.paymentMode, common.vehicleNo, common.routeName,
     JSON.stringify(data), meta.userId]
  );
  return result.rows[0];
}

export async function listRecords(type, filters = {}) {
  const table = TABLE_MAP[type];
  if (!table) throw Object.assign(new Error(`Unknown form type: ${type}`), { status: 400 });
  const where=[]; const params=[];
  const add=(sql,val)=>{params.push(val);where.push(sql.replace('?', `$${params.length}`));};
  if(filters.session) add('session=?', filters.session);
  if(filters.className) add('class_name=?', filters.className);
  if(filters.section) add('section=?', filters.section);
  if(filters.name) add('name ILIKE ?', `%${filters.name}%`);
  if(filters.phone) add('phone ILIKE ?', `%${filters.phone}%`);
  if(filters.admissionNo) add('admission_no=?', filters.admissionNo);
  if(filters.status) add('status=?', filters.status);
  if(filters.fromDate) add('COALESCE(event_date, created_at::date) >= ?::date', filters.fromDate);
  if(filters.toDate) add('COALESCE(event_date, created_at::date) <= ?::date', filters.toDate);
  const limit=Math.min(Math.max(Number(filters.limit)||100,1),500);
  params.push(limit); const limitPos=params.length;
  params.push(Math.max(Number(filters.offset)||0,0)); const offsetPos=params.length;
  const result=await query(`SELECT * FROM ${table} ${where.length?'WHERE '+where.join(' AND '):''} ORDER BY created_at DESC LIMIT $${limitPos} OFFSET $${offsetPos}`,params);
  return result.rows;
}
