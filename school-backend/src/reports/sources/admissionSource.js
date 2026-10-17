import {pool} from "../../config/db.js";
import { buildColumns } from "../builder/columnBuilder.js";
import { buildFilters } from "../builder/filterBuilder.js";
import { buildSort } from "../builder/sortBuilder.js";

export async function getAdmissionReport({
  filters = {},
  columns = [],
  sortBy,
  sortOrder,
  limit = 500,
}) {
  const selectedColumns = buildColumns(columns);

  const filterResult = buildFilters(filters, 1);

  const safeLimit = Math.min(
    Math.max(Number(limit) || 500, 1),
    5000
  );

  const sql = `
    SELECT
      ${selectedColumns}
    FROM students
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