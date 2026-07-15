import * as ManagerModel from '../models/managerModel.js';

function sanitizeEmployee(employee) {
    if (!employee) return employee;
    const { password, ...safeEmployee } = employee;
    return safeEmployee;
}

function isOwnAccount(req, id) {
    return String(req.user.sub) === String(id);
}

export async function viewEmployees(req,res,next) {
    try{
        const {gov_id, full_name, date_of_birth, occupation_code, isactive} = req.query;
        let employees;
        if (gov_id) employees=await ManagerModel.viewEmployeesByGovId(gov_id);
        else if (full_name) employees=await ManagerModel.viewEmployeesByName(full_name);
        else if (date_of_birth) employees=await ManagerModel.viewEmployeesByDateOfBirth(date_of_birth.split(','));
        else if (occupation_code) employees=await ManagerModel.viewEmployeesByOccCode(occupation_code);
        else if (isactive) employees=await ManagerModel.viewEmployeesByIsActive(isactive);
        else employees=await ManagerModel.viewEmployeesAll();
        res.status(200).json({employees});

    } catch (err) {
        return next(err);
    }
}

export async function addEmployee(req, res, next) {
    try {
        const { gov_id, full_name, date_of_birth, occupation_code, password } = req.body;
        if (!gov_id || !full_name || !date_of_birth || !occupation_code || !password) {
            return res.status(400).json({ error: 'gov_id, full_name, date_of_birth, occupation_code and password are required' });
        }
        const employee = await ManagerModel.addNewEmployee(gov_id, full_name, date_of_birth, occupation_code, password);
        return res.status(201).json({ employee: sanitizeEmployee(employee) });
    } catch (err) {
        return next(err);
    }
}

export async function editProfile(req,res,next){
    try{
        const { id } = req.params;
        if (isOwnAccount(req, id)) {
            return res.status(403).json({ error: 'Use /manager/me/edit to edit your own account' });
        }
        const { gov_id, full_name, date_of_birth, password } = req.body;
        if (!gov_id || !full_name || !date_of_birth || !password) {
            return res.status(400).json({ error: 'gov_id, full_name, date_of_birth and password are required' });
        }
        const employee=await ManagerModel.editProfile(id, gov_id, full_name, date_of_birth, password);
        if (!employee) {
            return res.status(404).json({ error: 'Employee not found' });
        }
        return res.status(200).json({employee: sanitizeEmployee(employee)});
    } catch(err){
        return next(err);
    }
}

export async function editMyProfile(req, res, next) {
    try {
        const { gov_id, full_name, date_of_birth, password } = req.body;
        if (!gov_id || !full_name || !date_of_birth || !password) {
            return res.status(400).json({ error: 'gov_id, full_name, date_of_birth and password are required' });
        }
        const employee = await ManagerModel.editProfile(req.user.sub, gov_id, full_name, date_of_birth, password);
        if (!employee) {
            return res.status(404).json({ error: 'Employee not found' });
        }
        return res.status(200).json({ employee: sanitizeEmployee(employee) });
    } catch (err) {
        return next(err);
    }
}

export async function changeOccupation(req, res, next) {
    try {
        const { id } = req.params;
        if (isOwnAccount(req, id)) {
            return res.status(403).json({ error: 'Cannot change your own occupation' });
        }
        const { occupation_code } = req.body;
        if (!occupation_code) {
            return res.status(400).json({ error: 'occupation_code is required' });
        }
        const employee = await ManagerModel.changeOccCode(id, occupation_code);
        if (!employee) {
            return res.status(404).json({ error: 'Employee not found' });
        }
        return res.status(200).json({ employee: sanitizeEmployee(employee) });
    } catch (err) {
        return next(err);
    }
}

export async function dismissEmployee(req, res, next) {
    try {
        const { id } = req.params;
        if (isOwnAccount(req, id)) {
            return res.status(403).json({ error: 'Cannot dismiss your own account' });
        }
        const employee = await ManagerModel.dismissEmployee(id);
        if (!employee) {
            return res.status(404).json({ error: 'Employee not found' });
        }
        return res.status(200).json({ employee: sanitizeEmployee(employee) });
    } catch (err) {
        return next(err);
    }
}

export async function returnEmployee(req, res, next) {
    try {
        const { id } = req.params;
        if (isOwnAccount(req, id)) {
            return res.status(403).json({ error: 'Cannot return your own account' });
        }
        const { occupation_code } = req.body;
        if (!occupation_code) {
            return res.status(400).json({ error: 'occupation_code is required' });
        }
        const employee = await ManagerModel.returnEmployee(id, occupation_code);
        if (!employee) {
            return res.status(404).json({ error: 'Employee not found' });
        }
        return res.status(200).json({ employee: sanitizeEmployee(employee) });
    } catch (err) {
        return next(err);
    }
}

export async function viewGoods(req,res,next) {
    try{
        const {code,name,is_food, measuring_unit} = req.query;
        let items;
        if (code) items=await ManagerModel.viewGoodsRegistryByCode(code.split(','));
        else if (name) items=await ManagerModel.viewGoodsRegistryByName(name.split(','));
        else if (is_food) items=await ManagerModel.viewGoodsRegistryByIsFood(is_food);
        else if (measuring_unit) items=await ManagerModel.viewGoodsRegistryByMeasuringUnit(measuring_unit.split(','));
        else items=await ManagerModel.viewGoodsRegistryAll();
        return res.status(200).json({items})
    } catch (err) {
        return next(err);
    }
}

export async function addGoods(req, res, next) {
    try {
        const { code, name, is_food, measuring_unit } = req.body;
        if (code === undefined || !name || is_food === undefined || !measuring_unit) {
            return res.status(400).json({ error: 'code, name, is_food and measuring_unit are required' });
        }
        const item = await ManagerModel.addGoodsToRegistry(code, name, is_food, measuring_unit);
        return res.status(201).json({ item });
    } catch (err) {
        return next(err);
    }
}

export async function updateGoods(req, res, next) {
    try {
        const { code } = req.params;
        const { name, is_food, measuring_unit } = req.body;
        if (!name || is_food === undefined || !measuring_unit) {
            return res.status(400).json({ error: 'name, is_food and measuring_unit are required' });
        }
        const item = await ManagerModel.updateGoodsInRegistry(code, name, is_food, measuring_unit);
        if (!item) {
            return res.status(404).json({ error: 'Item not found' });
        }
        return res.status(200).json({ item });
    } catch (err) {
        return next(err);
    }
}

export async function deleteGoods(req,res,next) {
    try {
        const {code} = req.params;
        if (!code) return res.status(400).json({error: 'code is required'});
        const item=await ManagerModel.deleteFromGoodsRegistry(code);
        if (!item) return res.status(404).json({error: "Item not found"});
        return res.status(200).json({item});
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
        const operation = await ManagerModel.newLogisticOperation(code, quantity, operation_code, req.user.sub);
        return res.status(201).json({ operation });
    } catch (err) {
        return next(err);
    }
}

export async function getLogistics(req, res, next) {
    try{
        const {code, name, quantity, operation_code, operation_name, is_food, measuring_unit, report, responsible_id, date, time} = req.query;
        let items;
        if (code) items = await ManagerModel.watchLogisticsByCode(code.split(','));
        else if (name) items = await ManagerModel.watchLogisticsByName(name.split(','));
        else if (quantity) items = await ManagerModel.watchLogisticsByQuantity(quantity.split(',').map(Number));
        else if (operation_code) items = await ManagerModel.watchLogisticsByOperationCode(operation_code.split(',').map(Number));
        else if (operation_name) items = await ManagerModel.watchLogisticsByOperationName(operation_name.split(','));
        else if (is_food) items = await ManagerModel.watchLogisticsByIsFood(is_food === 'true');
        else if (measuring_unit) items = await ManagerModel.watchLogisticsByMeasuringUnit(measuring_unit.split(','));
        else if (report) items = await ManagerModel.watchLogisticsByReport(report.split(','));
        else if (responsible_id) items = await ManagerModel.watchLogisticsByResponsibleId(responsible_id.split(',').map(Number));
        else if (date) items = await ManagerModel.watchLogisticsByDate(date.split(','));
        else if (time) items = await ManagerModel.watchLogisticsByTime(time.split(','));
        else items = await ManagerModel.watchLogisticsAll();
        return res.status(200).json({ items });
    } catch (err) {
        return next(err)
    }
}

export async function getFoodsInventory(req, res, next) {
    try {
        const { code, name, measuring_unit } = req.query;
        let items;
        if (code) items = await ManagerModel.watchFoodsInventoryByCode(code);
        else if (name) items = await ManagerModel.watchFoodsInventoryByName(name);
        else if (measuring_unit) items = await ManagerModel.watchFoodsInventoryByMeasuringUnit(measuring_unit);
        else items = await ManagerModel.watchFoodsInventoryAll();
        return res.status(200).json({ items });
    } catch (err) {
        return next(err);
    }
}

export async function getGeneralInventory(req, res, next) {
    try {
        const { code, name, measuring_unit } = req.query;
        let items;
        if (code) items = await ManagerModel.watchGeneralInventoryByCode(code);
        else if (name) items = await ManagerModel.watchGeneralInventoryByName(name);
        else if (measuring_unit) items = await ManagerModel.watchGeneralInventoryByMeasuringUnit(measuring_unit);
        else items = await ManagerModel.watchGeneralInventoryAll();
        return res.status(200).json({ items });
    } catch (err) {
        return next(err);
    }
}

export async function report(req,res,next){ //checked
    try{
        const { operation_id } = req.params;
        const { report } = req.body;
        if(!operation_id || !report){
            return res.status(400).json({error: 'operation_id and report are required'});
        }
        let item=await ManagerModel.addReport(operation_id, report);
        if (!item) {
            return res.status(404).json({error: 'Item not found'});
        }
        return res.status(200).json({item});
    } catch(err){
        return next(err);
    }
}