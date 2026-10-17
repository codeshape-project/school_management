import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { query } from '../config/db.js';
import { env } from '../config/env.js';
import { ROLES } from '../utils/constants.js';

export async function ensureAdmin() {
  const existing = await query('SELECT id FROM users WHERE email = $1 LIMIT 1', [env.admin.email.toLowerCase()]);
  const passwordHash = await bcrypt.hash(env.admin.password, 12);
  if (existing.rowCount) {
    await query(
      `UPDATE users SET name=$1, password_hash=$2, role=$3, is_active=true, updated_at=NOW() WHERE email=$4`,
      [env.admin.name, passwordHash, ROLES.ADMIN, env.admin.email.toLowerCase()]
    );
  } else {
    await query(
      `INSERT INTO users (name,email,password_hash,role,is_active) VALUES ($1,$2,$3,$4,true)`,
      [env.admin.name, env.admin.email.toLowerCase(), passwordHash, ROLES.ADMIN]
    );
  }
}

export async function loginAdmin(email, password) {
  const result = await query(
    `SELECT id,name,email,password_hash,role,is_active FROM users WHERE LOWER(email)=LOWER($1) AND role='admin' LIMIT 1`,
    [email]
  );
  const admin = result.rows[0];
  if (!admin || !admin.is_active) throw Object.assign(new Error('Invalid admin email or password.'), { status: 401 });
  const valid = await bcrypt.compare(password, admin.password_hash);
  if (!valid) throw Object.assign(new Error('Invalid admin email or password.'), { status: 401 });
  const token = jwt.sign({ id: admin.id, email: admin.email, role: admin.role, name: admin.name }, env.jwtSecret, { expiresIn: env.jwtExpiresIn });
  return { token, user: { id: admin.id, name: admin.name, email: admin.email, role: admin.role } };
}

export async function getCurrentAdmin(id) {
  const result = await query(`SELECT id,name,email,role,is_active,created_at FROM users WHERE id=$1 AND role='admin'`, [id]);
  return result.rows[0] || null;
}
