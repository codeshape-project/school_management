const ALLOWED_COLUMNS = new Set([
  "record_no",
  "name",
  "phone",
  "admission_no",
  "session",
  "class_name",
  "section",
  "status",
  "event_date",
  "payment_mode",
  "vehicle_no",
  "route_name",
  "created_at",
  "amount",
]);

export function buildColumns(columns = []) {
  const safeColumns = columns.filter((column) =>
    ALLOWED_COLUMNS.has(column)
  );

  if (!safeColumns.length) {
    return `
      record_no,
      name,
      phone,
      admission_no,
      session,
      class_name,
      section,
      status,
      event_date,
      created_at
    `;
  }

  return safeColumns.join(", ");
}