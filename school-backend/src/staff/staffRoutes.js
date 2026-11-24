import { Router } from 'express';
import { authMiddleware } from '../middleware/authMiddleware.js';
import { adminOnly } from '../middleware/roleMiddleware.js';
import { ok } from '../utils/response.js';
import * as svc from './staffService.js';

const router = Router();
router.use(authMiddleware, adminOnly);

const wrap = (fn) => async (req, res, next) => {
  try {
    await fn(req, res);
  } catch (e) {
    next(e);
  }
};

/* ---- search (used by every staff form) ---- */
router.get('/search', wrap(async (req, res) => ok(res, await svc.searchStaff(req.query))));

/* ---- attendance ---- */
router.get('/attendance/lookup', wrap(async (req, res) =>
  ok(res, await svc.getAttendance(req.query.staffId, req.query.month, req.query.year))));
router.post('/attendance', wrap(async (req, res) => {
  const row = await svc.saveAttendance(req.body, req.user.id);
  ok(res, row, row.updated ? 'Attendance updated successfully.' : 'Attendance saved successfully.', row.updated ? 200 : 201);
}));

/* ---- salary ---- */
router.get('/salary/prepare', wrap(async (req, res) =>
  ok(res, await svc.prepareSalary(req.query.staffId, req.query.month, req.query.year))));
router.post('/salary', wrap(async (req, res) => {
  const row = await svc.saveSalary(req.body, req.user.id);
  ok(res, row, row.updated ? 'Salary updated successfully.' : 'Salary saved successfully.', row.updated ? 200 : 201);
}));

/* ---- staff master ---- */
router.post('/', wrap(async (req, res) =>
  ok(res, await svc.saveStaff(req.body.data ?? req.body, req.user.id), 'Staff saved successfully.', 201)));
router.get('/:id', wrap(async (req, res) => ok(res, await svc.getStaff(req.params.id))));
router.put('/:id', wrap(async (req, res) =>
  ok(res, await svc.saveStaff(req.body.data ?? req.body, req.user.id, req.params.id), 'Staff updated successfully.')));

export default router;
