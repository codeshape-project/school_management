import { pool } from "../../config/db.js";
import { buildColumns } from "../builder/columnBuilder.js";
import { buildFilters } from "../builder/filterBuilder.js";
import { buildSort } from "../builder/sortBuilder.js";

const SOURCE_TABLES = {
  transport_allotments: "transport_allotments",
  conveyance_students: "conveyance_students",
  conveyance_amounts: "conveyance_amounts",
};

export async function getTransportReport({
  source,
  filters = {},
  columns = [],
  sortBy,
  sortOrder,
  limit = 500,
}) {
  const table = SOURCE_TABLES[source];

  if (!table) {
    throw new Error(
      `Unsupported transport report source: ${source}`
    );
  }

  const selectedColumns = buildColumns(columns);

  const filterResult = buildFilters(filters, 1);

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