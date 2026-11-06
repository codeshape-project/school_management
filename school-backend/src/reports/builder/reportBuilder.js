// // import { query } from '../../config/db.js';
// // import { SOURCE_CONFIG, DEFAULT_SOURCES } from '../sources/sourceConfig.js';
// // import { buildFilters } from './filterBuilder.js';
// // import { normalizeColumns } from './columnBuilder.js';
// // import { buildSort } from './sortBuilder.js';
// // import { buildGroupBy } from './groupBuilder.js';
// // import { REPORT_MAX_ROWS } from '../../utils/constants.js';

// // export async function buildReport({sources=DEFAULT_SOURCES, filters={}, columns, sortBy, sortOrder, groupBy, limit=1000}={}) {
// //   const selectedSources=sources.filter(s=>SOURCE_CONFIG[s]);
// //   if(!selectedSources.length) throw Object.assign(new Error('Select at least one report source.'),{status:400});
// //   const cols=normalizeColumns(columns);
// //   const union=[]; const params=[];
// //   for(const source of selectedSources){
// //     const cfg=SOURCE_CONFIG[source];
// //     const offset=params.length;
// //     const {clauses,params:p}=buildFilters(filters,offset+1);
// //     params.push(...p);
// //     const fields=cols.map(c=>`r.${c}`).join(',');
// //     union.push(`SELECT '${source}' AS source, '${cfg.label}' AS source_label, ${fields}, r.form_data FROM ${cfg.table} r ${clauses.length?'WHERE '+clauses.join(' AND '):''}`);
// //   }
// //   const safeLimit=Math.min(Math.max(Number(limit)||1000,1),REPORT_MAX_ROWS);
// //   params.push(safeLimit);
// //   const order=buildSort(sortBy,sortOrder);
// //   const group=buildGroupBy(groupBy);
// //   const sql=`WITH report_rows AS (${union.join(' UNION ALL ')}) SELECT * FROM report_rows ${group?`ORDER BY ${group}, ${order}`:`ORDER BY ${order}`} LIMIT $${params.length}`;
// //   const result=await query(sql,params);
// //   return {rows:result.rows, columns:cols, filters, sources:selectedSources, groupBy:group};
// // }
// import { getStudentReport } from "../sources/studentSource.js";
// import { getEnquiryReport } from "../sources/enquirySource.js";
// import { getRegistrationReport } from "../sources/registrationSource.js";
// import { getAdmissionReport } from "../sources/admissionSource.js";
// import { getFeeReport } from "../sources/feeSource.js";
// import { getTransportReport } from "../sources/transportSource.js";

// const SOURCE_HANDLERS = {
//   students: getStudentReport,

//   enquiries: getEnquiryReport,

//   registrations: getRegistrationReport,

//   admissions: getAdmissionReport,
// };

// export async function buildReport(body = {}) {
//   const sources = Array.isArray(body.sources)
//     ? body.sources
//     : [];

//   if (!sources.length) {
//     throw new Error(
//       "At least one report source is required."
//     );
//   }

//   const source = sources[0];

//   const filters = body.filters || {};

//   const columns = Array.isArray(body.columns)
//     ? body.columns
//     : [];

//   const sortBy = body.sortBy || "created_at";

//   const sortOrder = body.sortOrder || "desc";

//   const limit = body.limit || 500;

//   let rows = [];

//   if (SOURCE_HANDLERS[source]) {
//     rows = await SOURCE_HANDLERS[source]({
//       filters,
//       columns,
//       sortBy,
//       sortOrder,
//       limit,
//     });
//   }

//   else if (source.startsWith("fee_")) {
//     rows = await getFeeReport({
//       source,
//       filters,
//       columns,
//       sortBy,
//       sortOrder,
//       limit,
//     });
//   }

//   else if (
//     source === "transport_allotments" ||
//     source === "conveyance_students" ||
//     source === "conveyance_amounts"
//   ) {
//     rows = await getTransportReport({
//       source,
//       filters,
//       columns,
//       sortBy,
//       sortOrder,
//       limit,
//     });
//   }

//   else if (source === "complaints") {
//     rows = await getSimpleTableReport({
//       table: "complaints",
//       filters,
//       columns,
//       sortBy,
//       sortOrder,
//       limit,
//     });
//   }

//   else if (
//     source === "transfer_certificates"
//   ) {
//     rows = await getSimpleTableReport({
//       table: "transfer_certificates",
//       filters,
//       columns,
//       sortBy,
//       sortOrder,
//       limit,
//     });
//   }

//   else {
//     throw new Error(
//       `Unsupported report source: ${source}`
//     );
//   }

//   return {
//     source,
//     filters,
//     columns,
//     total: rows.length,
//     rows,
//     generatedAt: new Date().toISOString(),
//   };
// }

// async function getSimpleTableReport({
//   table,
//   filters,
//   columns,
//   sortBy,
//   sortOrder,
//   limit,
// }) {
//   const {
//     buildColumns,
//   } = await import("./columnBuilder.js");

//   const {
//     buildFilters,
//   } = await import("./filterBuilder.js");

//   const {
//     buildSort,
//   } = await import("./sortBuilder.js");

//   const {
//     default: pool,
//   } = await import("../../config/db.js");

//   const selectedColumns =
//     buildColumns(columns);

//   const filterResult =
//     buildFilters(filters, 1);

//   const safeLimit = Math.min(
//     Math.max(Number(limit) || 500, 1),
//     5000
//   );

//   const sql = `
//     SELECT
//       ${selectedColumns}
//     FROM ${table}
//     ${filterResult.sql}
//     ${buildSort(sortBy, sortOrder)}
//     LIMIT ${safeLimit}
//   `;

//   const result = await pool.query(
//     sql,
//     filterResult.values
//   );

//   return result.rows;
// }

import { pool } from "../../config/db.js";
import { SOURCE_CONFIG } from "../sources/sourceConfig.js";
import { REPORT_MAX_ROWS } from "../../utils/constants.js";
import {
  resolveColumns,
  DEFAULT_COLUMNS,
  humanize,
} from "../fields/reportFields.js";

const IST_OFFSET_MS = 5.5 * 60 * 60 * 1000;
const ISO_DATE = /^\d{4}-\d{2}-\d{2}$/;
const TOTAL_LABEL = /amount|paid|due|balance|fee|total|fine|discount|concession|charge/i;

const SORT_EXPR = {
  created_at: "created_at",
  event_date: "COALESCE(event_date, (created_at AT TIME ZONE 'Asia/Kolkata')::date)",
  name: "LOWER(name)",
  class_name: "class_name",
  section: "section",
  record_no: "record_no",
};

const iso = (d) => d.toISOString().slice(0, 10);
const show = (isoDate) => (isoDate ? isoDate.split("-").reverse().join("-") : "");

/* ---------- period: today / week / month / custom / all ---------- */
export function resolvePeriod({ period, fromDate, toDate } = {}) {
  const now = new Date(Date.now() + IST_OFFSET_MS); // current time in IST
  const today = iso(now);

  const from = ISO_DATE.test(fromDate || "") ? fromDate : "";
  const to = ISO_DATE.test(toDate || "") ? toDate : "";
  const kind = period || (from || to ? "custom" : "all");

  if (kind === "today") {
    return { kind, label: "Today", from: today, to: today };
  }

  if (kind === "week") {
    const diffToMonday = (now.getUTCDay() + 6) % 7;
    const monday = new Date(now.getTime() - diffToMonday * 86400000);
    return { kind, label: "This Week", from: iso(monday), to: today };
  }

  if (kind === "month") {
    return { kind, label: "This Month", from: `${today.slice(0, 8)}01`, to: today };
  }

  if (kind === "custom") {
    return { kind, label: "Date Range", from, to };
  }

  return { kind: "all", label: "All Dates", from: "", to: "" };
}

/* ---------- WHERE clause ---------- */
function buildWhere(filters, range, basis) {
  const params = [];
  const where = [];

  const add = (sql, value) => {
    params.push(value);
    where.push(sql.replaceAll("?", `$${params.length}`));
  };

  const val = (v) => {
    if (v === undefined || v === null) return "";
    const s = String(v).trim();
    return s.toUpperCase() === "ALL" ? "" : s;
  };

  const dateExpr =
    basis === "created"
      ? "(created_at AT TIME ZONE 'Asia/Kolkata')::date"
      : "COALESCE(event_date, (created_at AT TIME ZONE 'Asia/Kolkata')::date)";

  if (range.from) add(`${dateExpr} >= ?::date`, range.from);
  if (range.to) add(`${dateExpr} <= ?::date`, range.to);

  if (val(filters.session)) add("LOWER(session) = LOWER(?)", val(filters.session));
  if (val(filters.className)) add("LOWER(class_name) = LOWER(?)", val(filters.className));
  if (val(filters.section)) add("LOWER(section) = LOWER(?)", val(filters.section));
  if (val(filters.status)) add("LOWER(status) = LOWER(?)", val(filters.status));
  if (val(filters.paymentMode)) add("LOWER(payment_mode) = LOWER(?)", val(filters.paymentMode));
  if (val(filters.vehicleNo)) add("LOWER(vehicle_no) = LOWER(?)", val(filters.vehicleNo));
  if (val(filters.routeName)) add("route_name ILIKE ?", `%${val(filters.routeName)}%`);
  if (val(filters.admissionNo)) add("admission_no ILIKE ?", `%${val(filters.admissionNo)}%`);
  if (val(filters.name)) add("name ILIKE ?", `%${val(filters.name)}%`);
  if (val(filters.phone)) add("phone ILIKE ?", `%${val(filters.phone)}%`);

  if (val(filters.search)) {
    add(
      `(name ILIKE ? OR phone ILIKE ? OR admission_no ILIKE ? OR record_no ILIKE ?
        OR class_name ILIKE ? OR section ILIKE ? OR form_data::text ILIKE ?)`,
      `%${val(filters.search)}%`
    );
  }

  return { sql: where.length ? `WHERE ${where.join(" AND ")}` : "", params };
}

/* ---------- value helpers ---------- */
function formatValue(v) {
  if (v === null || v === undefined) return "";
  if (typeof v === "boolean") return v ? "Yes" : "No";
  if (Array.isArray(v)) return v.map(formatValue).filter(Boolean).join(", ");
  if (typeof v === "object") {
    return Object.entries(v)
      .map(([k, x]) => `${humanize(k)}: ${formatValue(x)}`)
      .join("; ");
  }
  const s = String(v).trim();
  const m = s.match(/^(\d{4})-(\d{2})-(\d{2})$/);
  return m ? `${m[3]}-${m[2]}-${m[1]}` : s;
}

function toNumber(v) {
  if (v === null || v === undefined || typeof v === "boolean") return null;
  const s = String(v).replace(/,/g, "").trim();
  return /^-?\d+(\.\d+)?$/.test(s) ? Number(s) : null;
}

/* ---------- SQL builder (exported so it can be tested) ---------- */
export function buildSql(body = {}) {
  const source = Array.isArray(body.sources) ? body.sources[0] : body.source;
  const cfg = SOURCE_CONFIG[source];

  if (!cfg) {
    throw Object.assign(new Error(`Unsupported report type: ${source || "(none)"}`), {
      status: 400,
    });
  }

  const filters = body.filters || {};
  const requested = Array.isArray(body.columns) ? body.columns : [];
  let columns = resolveColumns(requested);
  if (!columns.length) columns = resolveColumns(DEFAULT_COLUMNS);

  const range = resolvePeriod({
    period: body.period,
    fromDate: body.fromDate ?? filters.fromDate,
    toDate: body.toDate ?? filters.toDate,
  });

  const basis = body.dateBasis === "created" ? "created" : "event";
  const where = buildWhere(filters, range, basis);

  // select list: filter params come first, so column params continue numbering
  const selectParams = [];
  const selects = columns.map((c, i) => {
    if (c.kind === "base") return `${c.expr} AS c${i}`;
    selectParams.push(c.field);
    return `form_data -> ($${where.params.length + selectParams.length}::text) AS c${i}`;
  });

  const sortKey = SORT_EXPR[body.sortBy] ? body.sortBy : "created_at";
  const defaultDir = sortKey === "name" || sortKey === "class_name" || sortKey === "section" ? "ASC" : "DESC";
  const dir = body.sortOrder
    ? String(body.sortOrder).toLowerCase() === "asc" ? "ASC" : "DESC"
    : defaultDir;
  const classNo = "COALESCE(NULLIF(substring(class_name from '[0-9]{1,4}'), '')::int, 0)";
  const orderBy =
    sortKey === "class_name"
      ? `ORDER BY ${classNo} ${dir}, class_name ${dir}, section ASC NULLS LAST, LOWER(name) ASC`
      : `ORDER BY ${SORT_EXPR[sortKey]} ${dir} NULLS LAST, id DESC`;

  const limit = Math.min(Math.max(Number(body.limit) || 1000, 1), REPORT_MAX_ROWS);

  return {
    cfg,
    source,
    filters,
    columns,
    range,
    basis,
    limit,
    rowsSql: `SELECT ${selects.join(", ")} FROM ${cfg.table} ${where.sql} ${orderBy} LIMIT ${limit}`,
    rowsParams: [...where.params, ...selectParams],
    countSql: `SELECT COUNT(*)::int AS n FROM ${cfg.table} ${where.sql}`,
    countParams: where.params,
  };
}

function describeFilters(q) {
  const f = q.filters;
  const items = [];
  const push = (label, v) => {
    const s = v === undefined || v === null ? "" : String(v).trim();
    if (s && s.toUpperCase() !== "ALL") items.push(`${label}: ${s}`);
  };

  if (q.range.kind === "all") items.push("Period: All Dates");
  else if (q.range.from === q.range.to) items.push(`Period: ${q.range.label} (${show(q.range.from)})`);
  else {
    items.push(
      `Period: ${q.range.label} (${show(q.range.from) || "start"} to ${show(q.range.to) || "today"})`
    );
  }

  push("Session", f.session);
  push("Class", f.className);
  push("Section", f.section);
  push("Status", f.status);
  push("Payment Mode", f.paymentMode);
  push("Search", f.search);
  push("Name", f.name);
  return items;
}

/* ---------- main ---------- */
export async function buildReport(body = {}) {
  const q = buildSql(body);

  const [rowsResult, countResult] = await Promise.all([
    pool.query(q.rowsSql, q.rowsParams),
    pool.query(q.countSql, q.countParams),
  ]);

  const totalMatching = countResult.rows[0]?.n ?? rowsResult.rows.length;

  const totals = {};
  const rows = rowsResult.rows.map((raw) => {
    const row = {};
    q.columns.forEach((c, i) => {
      const value = raw[`c${i}`];
      row[c.key] = formatValue(value);

      if (c.kind === "form" && TOTAL_LABEL.test(c.label)) {
        const n = toNumber(value);
        if (n !== null) totals[c.key] = (totals[c.key] || 0) + n;
      }
    });
    return row;
  });

  return {
    source: q.source,
    sourceLabel: q.cfg.label,
    columns: q.columns.map(({ key, label }) => ({ key, label })),
    rows,
    total: totalMatching,
    returned: rows.length,
    truncated: totalMatching > rows.length,
    totals,
    period: q.range,
    filterSummary: describeFilters(q),
    filters: q.filters,
    generatedAt: new Date().toISOString(),
  };
}