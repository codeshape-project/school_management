export function getPagination(page = 1, limit = 50) {
  const safePage = Math.max(Number(page) || 1, 1);
  const safeLimit = Math.min(Math.max(Number(limit) || 50, 1), 500);
  return { page: safePage, limit: safeLimit, offset: (safePage - 1) * safeLimit };
}
