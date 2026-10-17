import { ensureAdmin } from '../src/auth/auth.js'; import { testDb, pool } from '../src/config/db.js';
try{await testDb(); await ensureAdmin(); console.log('Admin user created/updated from .env.'); await pool.end();}catch(e){console.error(e);await pool.end();process.exit(1)}
