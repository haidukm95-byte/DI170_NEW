import * as ReceiverWorkerModel from '../models/recevierWorkerModel.js';

function sanitizeEmployee(employee) {
    if (!employee) return employee;
    const { password, ...safeEmployee } = employee;
    return safeEmployee;
}

export async function editPassword(req,res,next) {
    try{
        const { password } = req.body;
        if (!password){
            return res.status(400).json({error: 'password is required'})
        }
        const employee=await ReceiverWorkerModel.editPassword(req.user.sub, password);
        if (!employee) {
            return res.status(404).json({ error: 'Employee not found' });
        }
        return res.status(200).json({employee: sanitizeEmployee(employee)})
    } catch(err){
        return next(err)
    }
}

export async function viewGoods(req,res,next) {
    try{
        const {code,name,is_food, measuring_unit} = req.query;
        let items;
        if (code) items=await ReceiverWorkerModel.viewGoodsRegistryByCode(code.split(','));
        else if (name) items=await ReceiverWorkerModel.viewGoodsRegistryByName(name.split(','));
        else if (is_food) items=await ReceiverWorkerModel.viewGoodsRegistryByIsFood(is_food);
        else if (measuring_unit) items=await ReceiverWorkerModel.viewGoodsRegistryByMeasuringUnit(measuring_unit.split(','));
        else items=await ReceiverWorkerModel.viewGoodsRegistryAll();
        return res.status(200).json({items})
    } catch (err) {
        return next(err);
    }
}

export async function logOperation(req, res, next) {
    try {
        const { code, quantity, operation_code } = req.body;
        if (code === undefined || quantity === undefined || !operation_code) {
            return res.status(400).json({ error: 'code, quantity and operation_code are required' });
        }
        const operation = await ReceiverWorkerModel.newLogisticOperation(code, quantity, operation_code, req.user.sub);
        return res.status(201).json({ operation });
    } catch (err) {
        return next(err);
    }
}

export async function getLogistics(req, res, next) {
    try{
        const {code, name, quantity, operation_code, operation_name, is_food, measuring_unit, report, responsible_id, date, time} = req.query;
        let items;
        if (code) items = await ReceiverWorkerModel.watchLogisticsByCode(code.split(','));
        else if (name) items = await ReceiverWorkerModel.watchLogisticsByName(name.split(','));
        else if (quantity) items = await ReceiverWorkerModel.watchLogisticsByQuantity(quantity.split(',').map(Number));
        else if (operation_code) items = await ReceiverWorkerModel.watchLogisticsByOperationCode(operation_code.split(',').map(Number));
        else if (operation_name) items = await ReceiverWorkerModel.watchLogisticsByOperationName(operation_name.split(','));
        else if (is_food) items = await ReceiverWorkerModel.watchLogisticsByIsFood(is_food === 'true');
        else if (measuring_unit) items = await ReceiverWorkerModel.watchLogisticsByMeasuringUnit(measuring_unit.split(','));
        else if (report) items = await ReceiverWorkerModel.watchLogisticsByReport(report.split(','));
        else if (responsible_id) items = await ReceiverWorkerModel.watchLogisticsByResponsibleId(responsible_id.split(',').map(Number));
        else if (date) items = await ReceiverWorkerModel.watchLogisticsByDate(date.split(','));
        else if (time) items = await ReceiverWorkerModel.watchLogisticsByTime(time.split(','));
        else items = await ReceiverWorkerModel.watchLogisticsAll();
        return res.status(200).json({ items });
    } catch (err) {
        return next(err)
    }
}

export async function getFoodsInventory(req, res, next) {
    try {
        const { code, name, measuring_unit } = req.query;
        let items;
        if (code) items = await ReceiverWorkerModel.watchFoodsInventoryByCode(code);
        else if (name) items = await ReceiverWorkerModel.watchFoodsInventoryByName(name);
        else if (measuring_unit) items = await ReceiverWorkerModel.watchFoodsInventoryByMeasuringUnit(measuring_unit);
        else items = await ReceiverWorkerModel.watchFoodsInventoryAll();
        return res.status(200).json({ items });
    } catch (err) {
        return next(err);
    }
}

export async function getGeneralInventory(req, res, next) {
    try {
        const { code, name, measuring_unit } = req.query;
        let items;
        if (code) items = await ReceiverWorkerModel.watchGeneralInventoryByCode(code);
        else if (name) items = await ReceiverWorkerModel.watchGeneralInventoryByName(name);
        else if (measuring_unit) items = await ReceiverWorkerModel.watchGeneralInventoryByMeasuringUnit(measuring_unit);
        else items = await ReceiverWorkerModel.watchGeneralInventoryAll();
        return res.status(200).json({ items });
    } catch (err) {
        return next(err);
    }
}

export async function report(req,res,next){
    try{
        const { operation_id } = req.params;
        const { report } = req.body;
        if(!operation_id || !report){
            return res.status(400).json({error: 'operation_id and report are required'});
        }
        let item=await ReceiverWorkerModel.addReport(operation_id, report);
        if (!item) {
            return res.status(404).json({error: 'Item not found'});
        }
        return res.status(200).json({item});
    } catch(err){
        return next(err);
    }
}