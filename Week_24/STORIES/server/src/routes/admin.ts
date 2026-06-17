import { Router } from 'express';
import { verifyJWT } from '../middleware/verifyJWT.js';
import * as Admin from '../controllers/adminController.js';

const router = Router();

router.get('/reports',                   verifyJWT, Admin.requireAdmin, Admin.getReports);
router.delete('/reports/:id/version',    verifyJWT, Admin.requireAdmin, Admin.deleteReportedVersion);
router.delete('/reports/:id/story',      verifyJWT, Admin.requireAdmin, Admin.deleteReportedStory);
router.delete('/reports/:id/ignore',     verifyJWT, Admin.requireAdmin, Admin.ignoreReport);

export default router;
