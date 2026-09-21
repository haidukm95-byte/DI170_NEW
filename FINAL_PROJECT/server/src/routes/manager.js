import express from 'express';
import * as ManagerController from '../controllers/managerController.js';
import { requireAuth, requirePermission } from '../middleware/auth.js';

const router = express.Router();

router.use(requireAuth);

router.put('/me/edit', ManagerController.editMyProfile); //checked

router.get('/employees' ,requirePermission('auth_edit_personnel'), ManagerController.viewEmployees); //checked
router.post('/employees/add', requirePermission('auth_edit_personnel'), ManagerController.addEmployee); //checked
router.put('/employees/:id/edit', requirePermission('auth_edit_personnel'), ManagerController.editProfile); //checked
router.patch('/employees/:id/occupation', requirePermission('auth_edit_personnel'), ManagerController.changeOccupation); //checked
router.patch('/employees/:id/dismiss', requirePermission('auth_edit_personnel'), ManagerController.dismissEmployee); //checked
router.patch('/employees/:id/return', requirePermission('auth_edit_personnel'), ManagerController.returnEmployee); //checked

router.get('/goods', ManagerController.viewGoods); //checked
router.post('/goods/new', requirePermission('auth_edit_goods_registry'), ManagerController.addGoods); //checked
router.put('/goods/:code/edit', requirePermission('auth_edit_goods_registry'), ManagerController.updateGoods); //checked

router.post('/logistics/new', requirePermission('auth_receive'), ManagerController.logOperation); //checked
router.get('/logistics', ManagerController.getLogistics); // checked
router.put('/logistics/:operation_id/report', ManagerController.report); //checked

router.get('/inventory/foods', ManagerController.getFoodsInventory); //checked
router.get('/inventory/general', ManagerController.getGeneralInventory); //checked



export default router;
