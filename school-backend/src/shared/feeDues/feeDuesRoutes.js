import { Router } from 'express';
import { authMiddleware } from '../../middleware/authMiddleware.js';
import { adminOnly } from '../../middleware/roleMiddleware.js';
import { ok, fail } from '../../utils/response.js';
import { save, list } from './feeDues.js';
const router=Router(); router.use(authMiddleware,adminOnly);
router.post('/',async(req,res,next)=>{try{if(!req.body)return fail(res,'Data is required.',400);return ok(res,await save(req.body.data??req.body,req.user.id),'Saved successfully.',201)}catch(e){next(e)}});
router.get('/',async(req,res,next)=>{try{return ok(res,await list(req.query))}catch(e){next(e)}});
export default router;
