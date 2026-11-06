// import { studentFields } from "./studentFields.js";
// import { enquiryFields } from "./enquiryFields.js";
// import { registrationFields } from "./registrationFields.js";
// import { admissionFields } from "./admissionFields.js";
// import { feeFields } from "./feeFields.js";
// import { transportFields } from "./transportFields.js";

// const COMMON_FIELDS = [
//   {
//     value: "record_no",
//     label: "Record No",
//   },
//   {
//     value: "name",
//     label: "Student Name",
//   },
//   {
//     value: "phone",
//     label: "Phone",
//   },
//   {
//     value: "admission_no",
//     label: "Admission No",
//   },
//   {
//     value: "session",
//     label: "Session",
//   },
//   {
//     value: "class_name",
//     label: "Class",
//   },
//   {
//     value: "section",
//     label: "Section",
//   },
//   {
//     value: "status",
//     label: "Status",
//   },
//   {
//     value: "event_date",
//     label: "Date",
//   },
//   {
//     value: "created_at",
//     label: "Created At",
//   },
// ];

// const SOURCE_FIELDS = {
//   students: studentFields,
//   enquiries: enquiryFields,
//   registrations: registrationFields,
//   admissions: admissionFields,
//   complaints: COMMON_FIELDS,
//   transfer_certificates: COMMON_FIELDS,

//   fee_formats: feeFields,
//   fee_dues: feeFields,
//   fee_receipts: feeFields,
//   fee_payments: feeFields,
//   fee_blank_receipts: feeFields,

//   transport_allotments: transportFields,
//   conveyance_students: transportFields,
//   conveyance_amounts: transportFields,
// };

// export function getFieldCatalog() {
//   return {
//     common: COMMON_FIELDS,
//     form_data: [
//       ...new Map(
//         Object.values(SOURCE_FIELDS)
//           .flat()
//           .map((field) => [field.value, field])
//       ).values(),
//     ],
//     sources: Object.entries(SOURCE_FIELDS).map(
//       ([value, fields]) => ({
//         value,
//         fields,
//       })
//     ),
//   };
// }

// export function getFieldsForSource(source) {
//   return SOURCE_FIELDS[source] || COMMON_FIELDS;
// }

import { pool } from "../../config/db.js";
import { SOURCE_CONFIG } from "../sources/sourceConfig.js";

/* Real DB columns that every table has */
export const BASE_COLUMNS = [
  { key: "record_no", label: "Record No", expr: "record_no" },
  { key: "name", label: "Name", expr: "name" },
  { key: "class_name", label: "Class", expr: "class_name" },
  { key: "section", label: "Section", expr: "section" },
  { key: "session", label: "Session", expr: "session" },
  { key: "phone", label: "Phone", expr: "phone" },
  { key: "admission_no", label: "Admission No", expr: "admission_no" },
  { key: "status", label: "Status", expr: "status" },
  { key: "event_date", label: "Date", expr: "to_char(event_date, 'DD-MM-YYYY')" },
  { key: "payment_mode", label: "Payment Mode", expr: "payment_mode" },
  { key: "vehicle_no", label: "Vehicle No", expr: "vehicle_no" },
  { key: "route_name", label: "Route", expr: "route_name" },
  {
    key: "created_at",
    label: "Created At",
    expr: "to_char(created_at AT TIME ZONE 'Asia/Kolkata', 'DD-MM-YYYY HH12:MI AM')",
  },
];

export const BASE_MAP = new Map(BASE_COLUMNS.map((c) => [c.key, c]));

export const DEFAULT_COLUMNS = [
  "record_no",
  "name",
  "class_name",
  "section",
  "phone",
  "event_date",
  "created_at",
];

export function humanize(key = "") {
  const text = String(key)
    .replace(/([a-z0-9])([A-Z])/g, "$1 $2")
    .replace(/[_\-]+/g, " ")
    .trim();
  return text.charAt(0).toUpperCase() + text.slice(1);
}

/* Turn requested column keys into safe column definitions.
   "name"        -> real DB column
   "f:address"   -> value stored inside form_data JSON */
export function resolveColumns(requested = []) {
  const out = [];
  const seen = new Set();

  for (const raw of requested) {
    const key = String(raw);
    if (seen.has(key)) continue;

    if (BASE_MAP.has(key)) {
      out.push({ ...BASE_MAP.get(key), kind: "base" });
      seen.add(key);
    } else if (key.startsWith("f:")) {
      const field = key.slice(2);
      if (/^[\w .\-/()]{1,80}$/.test(field)) {
        out.push({ key, label: humanize(field), kind: "form", field });
        seen.add(key);
      }
    }
  }

  return out;
}

/* All columns available for a report type, including the keys
   that really exist in the saved form data of that table. */
export async function getFieldCatalog(source) {
  const cfg = SOURCE_CONFIG[source];
  if (!cfg) {
    throw Object.assign(new Error(`Unknown report type: ${source}`), { status: 400 });
  }

  const base = BASE_COLUMNS.map(({ key, label }) => ({ key, label, kind: "base" }));
  const baseKeys = new Set(BASE_COLUMNS.map((c) => c.key));

  const result = await pool.query(
    `SELECT DISTINCT k AS key
       FROM (
         SELECT jsonb_object_keys(form_data) AS k
           FROM ${cfg.table}
          WHERE jsonb_typeof(form_data) = 'object'
          LIMIT 5000
       ) t
      ORDER BY k
      LIMIT 300`
  );

  const form = result.rows
    .map((r) => r.key)
    .filter((k) => !baseKeys.has(k) && !/^search/i.test(k) && /^[\w .\-/()]{1,80}$/.test(k))
    .map((k) => ({ key: `f:${k}`, label: humanize(k), kind: "form" }));

  return { base, form };
}

/* Values for the dropdown filters */
export async function getFilterOptions(source) {
  const cfg = SOURCE_CONFIG[source];
  if (!cfg) {
    throw Object.assign(new Error(`Unknown report type: ${source}`), { status: 400 });
  }

  const distinct = async (column) => {
    const r = await pool.query(
      `SELECT DISTINCT ${column} AS v FROM ${cfg.table}
        WHERE ${column} IS NOT NULL AND ${column} <> '' ORDER BY 1 LIMIT 300`
    );
    return r.rows.map((x) => x.v);
  };

  const safe = async (sql) => {
    try {
      return (await pool.query(sql)).rows.map((x) => x.v);
    } catch {
      return [];
    }
  };

  const [sessions, classes, sections, statuses, paymentModes, masterClasses, masterSections] =
    await Promise.all([
      distinct("session"),
      distinct("class_name"),
      distinct("section"),
      distinct("status"),
      distinct("payment_mode"),
      safe("SELECT name AS v FROM classes WHERE is_active = TRUE ORDER BY display_order, name"),
      safe("SELECT DISTINCT name AS v FROM sections WHERE is_active = TRUE ORDER BY name"),
    ]);

  const merge = (master, used) => [...new Set([...master, ...used])];

  return {
    sessions,
    classes: merge(masterClasses, classes),
    sections: merge(masterSections, sections),
    statuses,
    paymentModes,
  };
}