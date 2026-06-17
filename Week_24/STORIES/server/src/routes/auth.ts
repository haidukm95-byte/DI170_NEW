import { Router } from 'express';
import { verifyJWT } from '../middleware/verifyJWT.js';
import * as Auth from '../controllers/authController.js';

const router = Router();

router.post('/register',       Auth.register);
router.post('/login',          Auth.login);
router.post('/refresh',        Auth.refresh);
router.post('/logout',         Auth.logout);
router.get('/check',           Auth.checkAvailability);
router.get('/verify', verifyJWT, Auth.verify);

export default router;
