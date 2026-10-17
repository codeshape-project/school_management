// import { query } from '../../config/db.js';
// import { SOURCE_CONFIG, DEFAULT_SOURCES } from '../sources/sourceConfig.js';
// import { buildFilters } from './filterBuilder.js';
// import { normalizeColumns } from './columnBuilder.js';
// import { buildSort } from './sortBuilder.js';
// import { buildGroupBy } from './groupBuilder.js';
// import { REPORT_MAX_ROWS } from '../../utils/constants.js';

// export async function buildReport({sources=DEFAULT_SOURCES, filters={}, columns, sortBy, sortOrder, groupBy, limit=1000}={}) {
//   const selectedSources=sources.filter(s=>SOURCE_CONFIG[s]);
//   if(!selectedSources.length) throw Object.assign(new Error('Select at least one report source.'),{status:400});
//   const cols=normalizeColumns(columns);
//   const union=[]; const params=[];
//   for(const source of selectedSources){
//     const cfg=SOURCE_CONFIG[source];
//     const offset=params.length;
//     const {clauses,params:p}=buildFilters(filters,offset+1);
//     params.push(...p);
//     const fields=cols.map(c=>`r.${c}`).join(',');
//     union.push(`SELECT '${source}' AS source, '${cfg.label}' AS source_label, ${fields}, r.form_data FROM ${cfg.table} r ${clauses.length?'WHERE '+clauses.join(' AND '):''}`);
//   }
//   const safeLimit=Math.min(Math.max(Number(limit)||1000,1),REPORT_MAX_ROWS);
//   params.push(safeLimit);
//   const order=buildSort(sortBy,sortOrder);
//   const group=buildGroupBy(groupBy);
//   const sql=`WITH report_rows AS (${union.join(' UNION ALL ')}) SELECT * FROM report_rows ${group?`ORDER BY ${group}, ${order}`:`ORDER BY ${order}`} LIMIT $${params.length}`;
//   const result=await query(sql,params);
//   return {rows:result.rows, columns:cols, filters, sources:selectedSources, groupBy:group};
// }
import { getStudentReport } from "../sources/studentSource.js";
import { getEnquiryReport } from "../sources/enquirySource.js";
import { getRegistrationReport } from "../sources/registrationSource.js";
import { getAdmissionReport } from "../sources/admissionSource.js";
import { getFeeReport } from "../sources/feeSource.js";
import { getTransportReport } from "../sources/transportSource.js";

const SOURCE_HANDLERS = {
  students: getStudentReport,

  enquiries: getEnquiryReport,

  registrations: getRegistrationReport,

  admissions: getAdmissionReport,
};

export async function buildReport(body = {}) {
  const sources = Array.isArray(body.sources)
    ? body.sources
    : [];

  if (!sources.length) {
    throw new Error(
      "At least one report source is required."
    );
  }

  const source = sources[0];

  const filters = body.filters || {};

  const columns = Array.isArray(body.columns)
    ? body.columns
    : [];

  const sortBy = body.sortBy || "created_at";

  const sortOrder = body.sortOrder || "desc";

  const limit = body.limit || 500;

  let rows = [];

  if (SOURCE_HANDLERS[source]) {
    rows = await SOURCE_HANDLERS[source]({
      filters,
      columns,
      sortBy,
      sortOrder,
      limit,
    });
  }

  else if (source.startsWith("fee_")) {
    rows = await getFeeReport({
      source,
      filters,
      columns,
      sortBy,
      sortOrder,
      limit,
    });
  }

  else if (
    source === "transport_allotments" ||
    source === "conveyance_students" ||
    source === "conveyance_amounts"
  ) {
    rows = await getTransportReport({
      source,
      filters,
      columns,
      sortBy,
      sortOrder,
      limit,
    });
  }

  else if (source === "complaints") {
    rows = await getSimpleTableReport({
      table: "complaints",
      filters,
      columns,
      sortBy,
      sortOrder,
      limit,
    });
  }

  else if (
    source === "transfer_certificates"
  ) {
    rows = await getSimpleTableReport({
      table: "transfer_certificates",
      filters,
      columns,
      sortBy,
      sortOrder,
      limit,
    });
  }

  else {
    throw new Error(
      `Unsupported report source: ${source}`
    );
  }

  return {
    source,
    filters,
    columns,
    total: rows.length,
    rows,
    generatedAt: new Date().toISOString(),
  };
}

async function getSimpleTableReport({
  table,
  filters,
  columns,
  sortBy,
  sortOrder,
  limit,
}) {
  const {
    buildColumns,
  } = await import("./columnBuilder.js");

  const {
    buildFilters,
  } = await import("./filterBuilder.js");

  const {
    buildSort,
  } = await import("./sortBuilder.js");

  const {
    default: pool,
  } = await import("../../config/db.js");

  const selectedColumns =
    buildColumns(columns);

  const filterResult =
    buildFilters(filters, 1);

  const safeLimit = Math.min(
    Math.max(Number(limit) || 500, 1),
    5000
  );

  const sql = `
    SELECT
      ${selectedColumns}
    FROM ${table}
    ${filterResult.sql}
    ${buildSort(sortBy, sortOrder)}
    LIMIT ${safeLimit}
  `;

  const result = await pool.query(
    sql,
    filterResult.values
  );

  return result.rows;
}