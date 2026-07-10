import express from 'express';
import * as ReceiverWorkerController from '../controllers/receiverWorkerController.js';
import { requireAuth } from '../middleware/auth.js';

const router = express.Router();

router.use(requireAuth);

//password edit route
router.put('/me/password', ReceiverWorkerController.editPassword); //checked
// Receive authorization (operation codes 10-14) is enforced at the database
// level by the check_receive_authorization trigger, so no extra permission
// check is needed here beyond being an authenticated employee.
router.get('/goods', ReceiverWorkerController.viewGoods); //checked

router.post('/logistics/new', ReceiverWorkerController.logOperation); //checked
router.get('/logistics', ReceiverWorkerController.getLogistics); //checked
router.put('/logistics/:operation_id/report', ReceiverWorkerController.report); 

router.get('/inventory/foods', ReceiverWorkerController.getFoodsInventory); //checked
router.get('/inventory/general', ReceiverWorkerController.getGeneralInventory); //checked

export default router;
