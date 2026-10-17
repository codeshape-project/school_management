import { query } from '../../config/db.js'; 
export const listSessions=async()=> (await query('SELECT * FROM academic_sessions ORDER BY start_date DESC')).rows;