import { Router } from 'express';
import { verifyJWT } from '../middleware/verifyJWT.js';
import * as Contributors from '../controllers/contributorsController.js';

const router = Router();

router.get('/:story_id',  verifyJWT, Contributors.getContributors);
router.post('/',          verifyJWT, Contributors.addContributor);
router.delete('/:id',     verifyJWT, Contributors.removeContributor);

export default router;
