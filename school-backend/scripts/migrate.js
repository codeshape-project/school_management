import fs from 'fs'; import path from 'path'; import { fileURLToPath } from 'url'; import { query, pool } from '../src/config/db.js';
const __dirname=path.dirname(fileURLToPath(import.meta.url));
async function main(){
  const dir=path.resolve(__dirname,'../database/migrations');
  const files=[]; function walk(d){for(const item of fs.readdirSync(d,{withFileTypes:true})){const p=path.join(d,item.name);if(item.isDirectory())walk(p);else if(item.name.endsWith('.sql'))files.push(p)}} walk(dir); files.sort();
  await query(`CREATE TABLE IF NOT EXISTS schema_migrations (id SERIAL PRIMARY KEY, filename TEXT UNIQUE NOT NULL, applied_at TIMESTAMPTZ DEFAULT NOW())`);
  for(const file of files){const filename=path.relative(dir,file).replaceAll('\\','/');const exists=await query('SELECT 1 FROM schema_migrations WHERE filename=$1',[filename]);if(exists.rowCount)continue;const sql=fs.readFileSync(file,'utf8');await query('BEGIN');try{await query(sql);await query('INSERT INTO schema_migrations(filename) VALUES($1)',[filename]);await query('COMMIT');console.log('Applied',filename)}catch(e){await query('ROLLBACK');throw e}}
  const seeds=['academicSessions.sql','classes.sql','sections.sql']; for(const seed of seeds){const sql=fs.readFileSync(path.resolve(dir,'../seeds',seed),'utf8');if(sql.trim()) await query(sql)}
}
main().then(()=>pool.end()).catch(e=>{console.error(e);pool.end();process.exit(1)});
