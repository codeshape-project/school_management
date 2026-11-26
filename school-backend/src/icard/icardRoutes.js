import { Router } from 'express';
import { authMiddleware } from '../middleware/authMiddleware.js';
import { adminOnly } from '../middleware/roleMiddleware.js';
import { ok, fail } from '../utils/response.js';
import { uploadICardImage } from './icardUpload.js';
import * as svc from './icardService.js';

const router = Router();
router.use(authMiddleware, adminOnly);

const wrap = (fn) => async (req, res, next) => {
  try {
    await fn(req, res);
  } catch (e) {
    next(e);
  }
};

/* ---- dropdown values (session / class / section) ---- */
router.get('/filters', wrap(async (req, res) => ok(res, await svc.getFilters(req.query))));

/* ---- students: live list + generate/save cards ---- */
router.get('/students', wrap(async (req, res) => ok(res, await svc.listStudents(req.query))));
router.post('/students/generate', wrap(async (req, res) => {
  const rows = await svc.generateStudentCards(req.body?.ids, req.user.id);
  ok(res, rows, `${rows.length} I-Card${rows.length === 1 ? '' : 's'} saved successfully.`);
}));

/* ---- staff: one card per staff member, photo is uploaded here ---- */
router.get('/staff/:staffId/card', wrap(async (req, res) =>
  ok(res, await svc.getStaffCard(req.params.staffId))));
router.post('/staff/:staffId/card', uploadICardImage.single('photo'), wrap(async (req, res) => {
  const row = await svc.saveStaffCard(req.params.staffId, req.body, req.file, req.user.id);
  ok(res, row, row.updated ? 'Staff I-Card updated successfully.' : 'Staff I-Card saved successfully.', row.updated ? 200 : 201);
}));

/* ---- saved cards (Print section) ---- */
router.get('/records', wrap(async (req, res) => ok(res, await svc.listRecords(req.query))));
router.delete('/records/:id', wrap(async (req, res) =>
  ok(res, await svc.deleteRecord(req.params.id), 'Saved I-Card removed.')));

/* ---- templates ---- */
router.get('/templates', wrap(async (_req, res) => ok(res, await svc.getTemplates())));
router.put('/templates/:type', wrap(async (req, res) =>
  ok(res, await svc.saveTemplate(req.params.type, req.body, req.user.id), 'Template saved successfully.')));

/* ---- logo / signature upload (used by the Templates form) ---- */
router.post('/upload', uploadICardImage.single('image'), wrap(async (req, res) => {
  if (!req.file) return fail(res, 'Select an image to upload.', 400);
  ok(res, { url: req.file.path }, 'Image uploaded successfully.', 201);
}));

export default router;
