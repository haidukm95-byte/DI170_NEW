import {Router} from 'express';
import * as userController from '../controllers/userController.js';
import { authenticate } from '../middleware/auth.js';


const router=Router();

router.post('/register', userController.registerUser);
router.post('/login', userController.loginUser);
router.post('/logout', userController.logoutUser);
router.get('/allusers', authenticate, userController.showAllUsers);

export default router;


