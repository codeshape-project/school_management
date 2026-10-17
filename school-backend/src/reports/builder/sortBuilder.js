const ALLOWED_SORT_COLUMNS = new Set([
  "record_no",
  "name",
  "phone",
  "admission_no",
  "session",
  "class_name",
  "section",
  "status",
  "event_date",
  "created_at",
  "amount",
]);

export function buildSort(sortBy, sortOrder) {
  const column = ALLOWED_SORT_COLUMNS.has(sortBy)
    ? sortBy
    : "created_at";

  const order =
    String(sortOrder).toLowerCase() === "asc"
      ? "ASC"
      : "DESC";

  return `ORDER BY ${column} ${order}`;
}