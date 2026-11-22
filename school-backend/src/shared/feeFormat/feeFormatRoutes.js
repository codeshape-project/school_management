import { Router } from 'express';
import { authMiddleware } from '../../middleware/authMiddleware.js';
import { adminOnly } from '../../middleware/roleMiddleware.js';
import { ok, fail } from '../../utils/response.js';
import { save, update, list } from './feeFormat.js';

const router = Router();
router.use(authMiddleware, adminOnly);

// Create a fee format (once per session + class)
router.post('/', async (req, res, next) => {
  try {
    if (!req.body || typeof req.body !== 'object') return fail(res, 'Data is required.', 400);
    return ok(res, await save(req.body.data ?? req.body, req.user.id), 'Fee format saved.', 201);
  } catch (e) { next(e); }
});

// Update an existing fee format after the administrator chooses Edit.
router.put('/:id', async (req, res, next) => {
  try {
    if (!req.body || typeof req.body !== 'object') return fail(res, 'Data is required.', 400);
    return ok(res, await update(req.params.id, req.body.data ?? req.body), 'Fee format updated.');
  } catch (e) { next(e); }
});

// View: ?session=&className=  (one format)  or  ?session=  (classes that have one)
router.get('/', async (req, res, next) => {
  try { return ok(res, await list(req.query)); } catch (e) { next(e); }
});

export default router;
