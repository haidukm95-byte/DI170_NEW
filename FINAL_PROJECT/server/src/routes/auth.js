import express from 'express';
import * as AuthController from '../controllers/authController.js';

const router = express.Router();

router.post('/login', AuthController.login); //checked for admin only
router.post('/refresh', AuthController.refresh); //checked
router.post('/logout', AuthController.logout); //checked
router.get('/me', AuthController.me);

export default router;
