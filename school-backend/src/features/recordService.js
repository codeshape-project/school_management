// import { query } from '../config/db.js';
// import { generateNumber } from '../utils/generateNumber.js';

// /* Search saved records by one field (used by the search box on forms) */
// /* Search saved records by one field (used by the search box on forms) */
// const SEARCH_EXPR = {
//   name: 'name',
//   studentName: 'name',
//   formNo: "(COALESCE(form_data->>'formNo', '') || ' ' || record_no)",
//   mobile: 'phone',
//   phone: 'phone',
//     enquiryNo: 'record_no',
//   contact:
//     "(COALESCE(phone, '') || ' ' || COALESCE(form_data->>'contactNo', '') || ' ' || COALESCE(form_data->>'presentContactNo', '') || ' ' || COALESCE(form_data->>'permanentContactNo', ''))",
//   admissionNo: 'admission_no',
//   fatherName: "form_data->>'fatherName'",
//   motherName: "form_data->>'motherName'",
//   enquiredBy: "form_data->>'enquiredBy'",
// };

// export async function searchRecords(type, { by, q, limit, status, className, section } = {}) {
//   const table = TABLE_MAP[type];
//   if (!table) throw Object.assign(new Error(`Unknown form type: ${type}`), { status: 400 });

//   const term = String(q || '').trim();
//   const classFilter = String(className || '').trim();
//   const sectionFilter = String(section || '').trim();

//   // nothing to search for
//   if (!term && !classFilter && !sectionFilter) return [];

//   const conditions = [];
//   const params = [];

//   if (term) {
//     params.push(`%${term}%`);
//     const expr = SEARCH_EXPR[by];
//     conditions.push(
//       expr
//         ? `${expr} ILIKE $${params.length}`
//         : `(name ILIKE $${params.length} OR phone ILIKE $${params.length} OR admission_no ILIKE $${params.length} OR form_data::text ILIKE $${params.length})`
//     );
//   }

//   // class "5" also matches "Class 5"
//   if (classFilter && classFilter.toUpperCase() !== 'ALL') {
//     params.push(classFilter);
//     conditions.push(
//       `(LOWER(class_name) = LOWER($${params.length}::text) OR LOWER(class_name) = LOWER('Class ' || $${params.length}::text))`
//     );
//   }

//   if (sectionFilter && sectionFilter.toUpperCase() !== 'ALL') {
//     params.push(sectionFilter);
//     conditions.push(`LOWER(section) = LOWER($${params.length})`);
//   }

//   // Active / Inactive / All
//   const wantedStatus = String(status || '').trim();
//   if (wantedStatus && wantedStatus.toLowerCase() !== 'all') {
//     params.push(wantedStatus);
//     conditions.push(`LOWER(status) = LOWER($${params.length})`);
//   }

//   if (!conditions.length) return [];

//   const max = Math.min(Math.max(Number(limit) || 50, 1), 200);
//   const order = term ? 'created_at DESC' : 'LOWER(name) ASC';

//   const result = await query(
//     `SELECT id, record_no, name, class_name, section, phone, admission_no, status, created_at, form_data
//        FROM ${table}
//       WHERE ${conditions.join(' AND ')}
//       ORDER BY ${order}
//       LIMIT ${max}`,
//     params
//   );
//   return result.rows;
// }

// export const TABLE_MAP = Object.freeze({
//   enquiry: 'enquiries', registration: 'registrations', admission: 'students', student: 'students',
//   studentReport: 'students', transferCertificate: 'transfer_certificates', complaint: 'complaints',
//   feeFormat: 'fee_formats', feeDues: 'fee_dues', receipt: 'fee_receipts', collection: 'fee_receipts',
//   blankReceipt: 'fee_blank_receipts', studentLedger: 'fee_payments',
//   transportAllotment: 'transport_allotments', conveyanceStudent: 'conveyance_students',
//   conveyanceAmount: 'conveyance_amounts', vehiclewiseStudent: 'transport_allotments'
// });

// const COMMON_ALIASES = {
//   session: ['session','academicSession'], className: ['className','class','admissionClass'], section: ['section'],
//   name: ['name','studentName'], phone: ['phone','mobile','contactNo','contact'], admissionNo: ['admissionNo','admissionNumber'],
//   status: ['status'], date: ['date','formDate','recDate','admissionDate','dateOfAdmission','asOnDate'],
//     paymentMode: ['paymentMode','mode','payMode','paymentType'], vehicleNo: ['vehicleNo','vehicle'], route: ['route','routeName']
// };

// function pick(data, aliases) {
//   for (const key of aliases) if (data[key] !== undefined && data[key] !== null && data[key] !== '') return data[key];
//   return null;
// }

// function normalizeDate(value) {
//   if (!value) return null;
//   const text = String(value).trim();
//   if (/^\d{4}-\d{2}-\d{2}$/.test(text)) return text;
//   const match = text.match(/^(\d{2})[-\/](\d{2})[-\/](\d{4})$/);
//   if (match) return `${match[3]}-${match[2]}-${match[1]}`;
//   return null;
// }

// export function normalizeRecord(data = {}) {
//   return {
//     session: pick(data, COMMON_ALIASES.session), className: pick(data, COMMON_ALIASES.className),
//     section: pick(data, COMMON_ALIASES.section), name: pick(data, COMMON_ALIASES.name),
//     phone: pick(data, COMMON_ALIASES.phone), admissionNo: pick(data, COMMON_ALIASES.admissionNo),
//     status: pick(data, COMMON_ALIASES.status), eventDate: normalizeDate(pick(data, COMMON_ALIASES.date)),
//     paymentMode: pick(data, COMMON_ALIASES.paymentMode), vehicleNo: pick(data, COMMON_ALIASES.vehicleNo),
//     routeName: pick(data, COMMON_ALIASES.route)
//   };
// }

// /* Enquiry numbers are sequential: ENQ-2026-0001, ENQ-2026-0002 ... */
// async function nextEnquiryNo() {
//   const prefix = `ENQ-${new Date().getFullYear()}-`;

//   const result = await query(
//     `SELECT COALESCE(MAX(NULLIF(substring(record_no from '([0-9]+)$'), '')::bigint), 0) + 1 AS n
//        FROM enquiries
//       WHERE record_no LIKE $1`,
//     [`${prefix}%`]
//   );

//   return `${prefix}${String(result.rows[0].n).padStart(4, '0')}`;
// }

// export async function createRecord(type, data, meta = {}) {
//   const table = TABLE_MAP[type];
//   if (!table) throw Object.assign(new Error(`Unknown form type: ${type}`), { status: 400 });
//   const common = normalizeRecord(data);

//   for (let attempt = 0; attempt < 5; attempt += 1) {
//     const recordNo =
//       type === 'enquiry' ? await nextEnquiryNo() : generateNumber(type.slice(0,4).toUpperCase());

//     try {
//       const result = await query(
//         `INSERT INTO ${table}
//           (record_no, session, class_name, section, name, phone, admission_no, status, event_date, payment_mode, vehicle_no, route_name, form_data, created_by)
//          VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12,$13,$14)
//          RETURNING id, record_no, created_at`,
//         [recordNo, common.session, common.className, common.section, common.name, common.phone, common.admissionNo,
//          common.status || 'active', common.eventDate || null, common.paymentMode, common.vehicleNo, common.routeName,
//          JSON.stringify(data), meta.userId]
//       );
//       return result.rows[0];
//     } catch (err) {
//       // two enquiries saved at the same moment got the same number: try the next one
//       if (err.code === '23505' && type === 'enquiry') continue;
//       throw err;
//     }
//   }

//   throw Object.assign(new Error('Unable to generate a unique enquiry number. Please try again.'), { status: 500 });
// }

// export async function listRecords(type, filters = {}) {
//   const table = TABLE_MAP[type];
//   if (!table) throw Object.assign(new Error(`Unknown form type: ${type}`), { status: 400 });
//   const where=[]; const params=[];
//   const add=(sql,val)=>{params.push(val);where.push(sql.replace('?', `$${params.length}`));};
//   if(filters.session) add('session=?', filters.session);
//   if(filters.className) add('class_name=?', filters.className);
//   if(filters.section) add('section=?', filters.section);
//   if(filters.name) add('name ILIKE ?', `%${filters.name}%`);
//   if(filters.phone) add('phone ILIKE ?', `%${filters.phone}%`);
//   if(filters.admissionNo) add('admission_no=?', filters.admissionNo);
//   if(filters.status) add('status=?', filters.status);
//   if(filters.fromDate) add('COALESCE(event_date, created_at::date) >= ?::date', filters.fromDate);
//   if(filters.toDate) add('COALESCE(event_date, created_at::date) <= ?::date', filters.toDate);
//   const limit=Math.min(Math.max(Number(filters.limit)||100,1),500);
//   params.push(limit); const limitPos=params.length;
//   params.push(Math.max(Number(filters.offset)||0,0)); const offsetPos=params.length;
//   const result=await query(`SELECT * FROM ${table} ${where.length?'WHERE '+where.join(' AND '):''} ORDER BY created_at DESC LIMIT $${limitPos} OFFSET $${offsetPos}`,params);
//   return result.rows;
// }

import { query } from '../config/db.js';
import { generateNumber } from '../utils/generateNumber.js';

/* =========================================================
   SEARCH RECORDS
========================================================= */

const SEARCH_EXPR = {
  name: "to_jsonb(r)->>'name'",
  studentName: "to_jsonb(r)->>'name'",

  formNo: `(
    COALESCE(to_jsonb(r)->'form_data'->>'formNo', '') || ' ' ||
    COALESCE(to_jsonb(r)->>'record_no', '')
  )`,

  admissionFormNo:
    "COALESCE(to_jsonb(r)->'form_data'->>'admissionFormNo', '')",

  computerId:
    "COALESCE(to_jsonb(r)->'form_data'->>'computerId', '')",

  mobile: "to_jsonb(r)->>'phone'",
  phone: "to_jsonb(r)->>'phone'",

  enquiryNo: "to_jsonb(r)->>'record_no'",

  contact: `(
    COALESCE(to_jsonb(r)->>'phone', '') || ' ' ||
    COALESCE(to_jsonb(r)->'form_data'->>'contactNo', '') || ' ' ||
    COALESCE(to_jsonb(r)->'form_data'->>'presentContactNo', '') || ' ' ||
    COALESCE(to_jsonb(r)->'form_data'->>'permanentContactNo', '')
  )`,

  admissionNo: "to_jsonb(r)->>'admission_no'",

  fatherName: "to_jsonb(r)->'form_data'->>'fatherName'",
  motherName: "to_jsonb(r)->'form_data'->>'motherName'",
  enquiredBy: "to_jsonb(r)->'form_data'->>'enquiredBy'",
};
/* =========================================================
   TABLE MAP
========================================================= */

export const TABLE_MAP = Object.freeze({
  enquiry: 'enquiries',
  registration: 'registrations',
  admission: 'students',
  student: 'students',
  studentReport: 'students',
  transferCertificate: 'transfer_certificates',
  complaint: 'complaints',
  feeFormat: 'fee_formats',
  feeDues: 'fee_dues',
  receipt: 'fee_receipts',
  collection: 'fee_receipts',
  blankReceipt: 'fee_blank_receipts',
  studentLedger: 'fee_payments',
  transportAllotment: 'transport_allotments',
  conveyanceStudent: 'conveyance_students',
  conveyanceAmount: 'conveyance_amounts',
  vehiclewiseStudent: 'transport_allotments',
});

/* =========================================================
   SEARCH RECORDS
========================================================= */

export async function searchRecords(
  type,
  { by, q, limit, status, className, section } = {}
) {
  const table = TABLE_MAP[type];

  if (!table) {
    throw Object.assign(
      new Error(`Unknown form type: ${type}`),
      { status: 400 }
    );
  }

  const term = String(q || "").trim();
  const classFilter = String(className || "").trim();
  const sectionFilter = String(section || "").trim();
  const wantedStatus = String(status || "").trim();

  if (!term && !classFilter && !sectionFilter) {
    return [];
  }

  const conditions = [];
  const params = [];

  // Search using the requested field
  if (term) {
    params.push(`%${term}%`);
    const position = `$${params.length}`;

    const expr = SEARCH_EXPR[by];

    if (expr) {
      conditions.push(`${expr} ILIKE ${position}`);
    } else {
      conditions.push(`
        (
          COALESCE(to_jsonb(r)->>'name', '') ILIKE ${position}
          OR COALESCE(to_jsonb(r)->>'phone', '') ILIKE ${position}
          OR COALESCE(to_jsonb(r)->>'record_no', '') ILIKE ${position}
          OR COALESCE(to_jsonb(r)->>'admission_no', '') ILIKE ${position}
          OR COALESCE(to_jsonb(r)->'form_data', '{}'::jsonb)::text ILIKE ${position}
        )
      `);
    }
  }

  // Class filter
  if (classFilter && classFilter.toUpperCase() !== "ALL") {
    params.push(classFilter);
    const position = `$${params.length}`;

    conditions.push(`
      (
        LOWER(COALESCE(to_jsonb(r)->>'class_name', '')) =
          LOWER(${position})
        OR
        LOWER(COALESCE(to_jsonb(r)->>'class_name', '')) =
          LOWER('Class ' || ${position})
      )
    `);
  }

  // Section filter
  if (sectionFilter && sectionFilter.toUpperCase() !== "ALL") {
    params.push(sectionFilter);

    conditions.push(`
      LOWER(COALESCE(to_jsonb(r)->>'section', '')) =
      LOWER($${params.length})
    `);
  }

  // Status filter
  if (wantedStatus && wantedStatus.toLowerCase() !== "all") {
    params.push(wantedStatus);

    conditions.push(`
      LOWER(COALESCE(to_jsonb(r)->>'status', '')) =
      LOWER($${params.length})
    `);
  }

  if (!conditions.length) {
    return [];
  }

  const max = Math.min(
    Math.max(Number(limit) || 50, 1),
    200
  );

  const order = term
    ? `COALESCE(to_jsonb(r)->>'created_at', '') DESC`
    : `LOWER(COALESCE(to_jsonb(r)->>'name', '')) ASC`;

  const result = await query(
    `
      SELECT r.*
      FROM ${table} AS r
      WHERE ${conditions.join(" AND ")}
      ORDER BY ${order}
      LIMIT ${max}
    `,
    params
  );

  return result.rows;
}

/* =========================================================
   COMMON FIELD ALIASES
========================================================= */

const COMMON_ALIASES = {
  session: ['session', 'academicSession'],
  className: ['className', 'class', 'admissionClass'],
  section: ['section'],

  name: ['name', 'studentName'],

  phone: ['phone', 'mobile', 'contactNo', 'contact'],

  admissionNo: ['admissionNo', 'admissionNumber'],

  status: ['status'],

  date: [
    'date',
    'formDate',
    'recDate',
    'admissionDate',
    'dateOfAdmission',
    'asOnDate'
  ],

  paymentMode: ['paymentMode', 'mode', 'payMode', 'paymentType'],

  vehicleNo: ['vehicleNo', 'vehicle'],

  route: ['route', 'routeName']
};

/* =========================================================
   PICK VALUE
========================================================= */

function pick(data, aliases) {
  for (const key of aliases) {
    if (
      data[key] !== undefined &&
      data[key] !== null &&
      data[key] !== ''
    ) {
      return data[key];
    }
  }

  return null;
}

/* =========================================================
   NORMALIZE DATE
========================================================= */

function normalizeDate(value) {
  if (!value) return null;

  const text = String(value).trim();

  if (/^\d{4}-\d{2}-\d{2}$/.test(text)) {
    return text;
  }

  const match = text.match(/^(\d{2})[-/](\d{2})[-/](\d{4})$/);

  if (match) {
    return `${match[3]}-${match[2]}-${match[1]}`;
  }

  return null;
}

/* =========================================================
   NORMALIZE RECORD
========================================================= */

export function normalizeRecord(data = {}) {
  return {
    session: pick(data, COMMON_ALIASES.session),
    className: pick(data, COMMON_ALIASES.className),
    section: pick(data, COMMON_ALIASES.section),

    name: pick(data, COMMON_ALIASES.name),
    phone: pick(data, COMMON_ALIASES.phone),

    admissionNo: pick(data, COMMON_ALIASES.admissionNo),

    status: pick(data, COMMON_ALIASES.status),

    eventDate: normalizeDate(
      pick(data, COMMON_ALIASES.date)
    ),

    paymentMode: pick(data, COMMON_ALIASES.paymentMode),

    vehicleNo: pick(data, COMMON_ALIASES.vehicleNo),

    routeName: pick(data, COMMON_ALIASES.route)
  };
}

/* =========================================================
   GENERATE ENQUIRY NUMBER
========================================================= */

async function nextEnquiryNo() {
  const prefix = `ENQ-${new Date().getFullYear()}-`;

  const result = await query(
    `SELECT
       COALESCE(
         MAX(
           NULLIF(
             substring(record_no from '([0-9]+)$'),
             ''
           )::bigint
         ),
         0
       ) + 1 AS n
     FROM enquiries
     WHERE record_no LIKE $1`,
    [`${prefix}%`]
  );

  return `${prefix}${String(result.rows[0].n).padStart(4, '0')}`;
}

/* =========================================================
   CREATE RECORD
========================================================= */

export async function createRecord(type, data, meta = {}) {
  const table = TABLE_MAP[type];

  if (!table) {
    throw Object.assign(
      new Error(`Unknown form type: ${type}`),
      { status: 400 }
    );
  }

  const common = normalizeRecord(data);

  for (let attempt = 0; attempt < 5; attempt += 1) {

    const recordNo =
      type === 'enquiry'
        ? await nextEnquiryNo()
        : generateNumber(
            type === 'registration'
              ? 'REG'
              : type.slice(0, 4).toUpperCase()
          );

    /* Generate registration identifiers on server */

    if (type === 'registration') {
      data = {
        ...data,
        formNo: data.formNo || recordNo,
        computerId: data.computerId || generateNumber('CMP')
      };
    }

    try {
      const result = await query(
        `INSERT INTO ${table}
          (
            record_no,
            session,
            class_name,
            section,
            name,
            phone,
            admission_no,
            status,
            event_date,
            payment_mode,
            vehicle_no,
            route_name,
            form_data,
            created_by
          )
         VALUES
          ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12,$13,$14)
         RETURNING id, record_no, form_data, created_at`,
        [
          recordNo,
          common.session,
          common.className,
          common.section,
          common.name,
          common.phone,
          common.admissionNo,
          common.status || 'active',
          common.eventDate || null,
          common.paymentMode,
          common.vehicleNo,
          common.routeName,
          JSON.stringify(data),
          meta.userId
        ]
      );

      return result.rows[0];

    } catch (err) {

      if (err.code === '23505' && type === 'enquiry') {
        continue;
      }

      throw err;
    }
  }

  throw Object.assign(
    new Error(
      'Unable to generate a unique enquiry number. Please try again.'
    ),
    { status: 500 }
  );
}

/* =========================================================
   LIST RECORDS
========================================================= */

export async function listRecords(type, filters = {}) {
  const table = TABLE_MAP[type];

  if (!table) {
    throw Object.assign(
      new Error(`Unknown form type: ${type}`),
      { status: 400 }
    );
  }

  const where = [];
  const params = [];

  const add = (sql, val) => {
    params.push(val);
    where.push(sql.replace('?', `$${params.length}`));
  };

  if (filters.session) {
    add('session = ?', filters.session);
  }

  if (filters.className) {
    add('class_name = ?', filters.className);
  }

  if (filters.section) {
    add('section = ?', filters.section);
  }

  if (filters.name) {
    add('name ILIKE ?', `%${filters.name}%`);
  }

  if (filters.phone) {
    add('phone ILIKE ?', `%${filters.phone}%`);
  }

  if (filters.admissionNo) {
    add('admission_no = ?', filters.admissionNo);
  }

  if (filters.status) {
    add('status = ?', filters.status);
  }

  if (filters.fromDate) {
    add(
      'COALESCE(event_date, created_at::date) >= ?::date',
      filters.fromDate
    );
  }

  if (filters.toDate) {
    add(
      'COALESCE(event_date, created_at::date) <= ?::date',
      filters.toDate
    );
  }

  const limit = Math.min(
    Math.max(Number(filters.limit) || 100, 1),
    500
  );

  params.push(limit);
  const limitPos = params.length;

  params.push(
    Math.max(Number(filters.offset) || 0, 0)
  );

  const offsetPos = params.length;

  const result = await query(
    `SELECT *
     FROM ${table}
     ${where.length ? 'WHERE ' + where.join(' AND ') : ''}
     ORDER BY created_at DESC
     LIMIT $${limitPos}
     OFFSET $${offsetPos}`,
    params
  );

  return result.rows;
}