export function todayISO() {
  return new Date().toISOString().slice(0, 10);
}

export function normalizeDate(value) {
  if (!value) return null;
  const d = new Date(value);
  return Number.isNaN(d.getTime()) ? null : d.toISOString();
}
