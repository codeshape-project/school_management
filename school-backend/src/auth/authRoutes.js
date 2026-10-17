import { Router } from 'express';
import { authMiddleware } from '../middleware/authMiddleware.js';
import { fail, ok } from '../utils/response.js';
import { getCurrentAdmin, loginAdmin } from './auth.js';

const router = Router();

router.post('/login', async (req, res, next) => {
  try {
    const { email, password } = req.body || {};
    if (!email || !password) return fail(res, 'Email and password are required.', 400);
    const data = await loginAdmin(String(email).trim(), String(password));
    return ok(res, data, 'Admin login successful.');
  } catch (err) { next(err); }
});

router.get('/me', authMiddleware, async (req, res, next) => {
  try {
    const user = await getCurrentAdmin(req.user.id);
    if (!user) return fail(res, 'Admin account not found.', 401);
    return ok(res, { user }, 'Authenticated admin.');
  } catch (err) { next(err); }
});

router.post('/logout', authMiddleware, (_req, res) => ok(res, null, 'Logged out.'));

export default router;
