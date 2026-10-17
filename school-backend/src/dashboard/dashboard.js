import { query } from '../config/db.js';

export async function getDashboardSummary() {
  const tables = [
    ['enquiries','Enquiries'], ['registrations','Registrations'], ['students','Students'],
    ['fee_receipts','Fee Receipts'], ['fee_dues','Fee Dues'], ['transport_allotments','Transport Allotments']
  ];
  const results = {};
  for (const [table, label] of tables) {
    const r = await query(`SELECT COUNT(*)::int AS count FROM ${table}`);
    results[label] = r.rows[0].count;
  }
  return results;
}
