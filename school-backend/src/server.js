import app from './app.js'; import { env } from './config/env.js'; import { testDb } from './config/db.js'; import { ensureAdmin } from './auth/auth.js';
try { await testDb(); await ensureAdmin(); app.listen(env.port,()=>console.log(`School Management API running on http://localhost:${env.port}`)); }
catch(err){console.error('Server startup failed:',err.message);process.exit(1)}
