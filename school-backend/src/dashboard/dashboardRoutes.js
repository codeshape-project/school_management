import { Router } from 'express';
import { authMiddleware } from '../middleware/authMiddleware.js';
import { adminOnly } from '../middleware/roleMiddleware.js';
import { ok } from '../utils/response.js';
import { getDashboardSummary } from './dashboard.js';
const router = Router();
router.get('/summary', authMiddleware, adminOnly, async (_req,res,next)=>{ try { return ok(res, await getDashboardSummary()); } catch(e){ next(e); } });
export default router;
