// import pg from 'pg';
// import { env } from './env.js';

// const { Pool } = pg;

// export const pool = new Pool({
//   host: env.db.host,
//   port: env.db.port,
//   database: env.db.name,
//   user: env.db.user,
//   password: env.db.password,
//   max: 10,
//   idleTimeoutMillis: 30000,
//   connectionTimeoutMillis: 5000
// });

// export async function query(text, params = []) {
//   return pool.query(text, params);
// }

// export async function testDb() {
//   const result = await query('SELECT NOW() AS now');
//   return result.rows[0];
// }

import pg from 'pg';
import { env } from './env.js';

const { Pool } = pg;

export const pool = new Pool({
  connectionString: env.db.url,
  ssl: { rejectUnauthorized: false }, // Supabase requires SSL
  max: 10,
  idleTimeoutMillis: 30000,
  connectionTimeoutMillis: 10000
});

export async function query(text, params = []) {
  return pool.query(text, params);
}

export async function testDb() {
  const result = await query('SELECT NOW() AS now');
  return result.rows[0];
}