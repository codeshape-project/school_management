export { save, list } from '../../features/student/admission/admission.js';

import { Router } from 'express';

import { authMiddleware } from '../../middleware/authMiddleware.js';
import { adminOnly } from '../../middleware/roleMiddleware.js';
import { ok, fail } from '../../utils/response.js';
import { uploadStudentPhoto } from '../../middleware/uploadMiddleware.js';
import { query } from '../../config/db.js';

import { save, list } from './student.js';

const router = Router();

router.use(authMiddleware, adminOnly);

// Save student admission data
router.post('/', async (req, res, next) => {
  try {
    if (!req.body || typeof req.body !== 'object') {
      return fail(res, 'Student data is required.', 400);
    }

    const result = await save(
      req.body.data ?? req.body,
      req.user.id
    );

    return ok(
      res,
      result,
      'Student saved successfully.',
      201
    );
  } catch (e) {
    next(e);
  }
});

// Upload student photo to Cloudinary
router.post(
  '/:id/photo',
  uploadStudentPhoto.single('photo'),
  async (req, res, next) => {
    try {
      if (!req.file) {
        return fail(res, 'Photo is required.', 400);
      }

      const photoUrl = req.file.path;

      const result = await query(
        `UPDATE students
         SET photo_path = $1,
             updated_at = NOW()
         WHERE id = $2
         RETURNING id, photo_path`,
        [photoUrl, req.params.id]
      );

      if (!result.rowCount) {
        return fail(res, 'Student not found.', 404);
      }

      return ok(
        res,
        result.rows[0],
        'Student photo uploaded successfully.'
      );
    } catch (e) {
      next(e);
    }
  }
);

// Get students
router.get('/', async (req, res, next) => {
  try {
    return ok(res, await list(req.query));
  } catch (e) {
    next(e);
  }
});

export default router;