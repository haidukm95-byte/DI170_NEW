/** 
 * FUNCTIONS:
 * 1. EMPLOYEES
 * Add a new receiver/worker
 * Change an occupation code
 * Dismiss an employee (worker or receiver)
 * Return a dismissed employee (worker or receiver)
 * 2. GOODS OPERATIONS
 * Add/update a new item to goods_registry
 * New logistic operation
 * Watch foods warehouse inventory
 * Watch general warehouse inventory
 * */

import { pool } from '../db/pool.js';
import bcrypt from 'bcryptjs';

//1. EMPLOYEES

//view employees list

export async function viewEmployeesAll() {
    const r=await pool.query(
        `SELECT personnel_id, gov_id, full_name, date_of_birth, occupation_code, isactive, working_start_date, working_end_date, auth_receive, auth_edit_personnel, auth_edit_goods_registry FROM personnel ORDER BY personnel_id ASC`
    )
    return r.rows;
}

export async function viewEmployeesByGovId(gov_id){
    const r=await pool.query(
        `SELECT personnel_id, gov_id, full_name, date_of_birth, occupation_code, isactive, working_start_date, working_end_date, auth_receive, auth_edit_personnel, auth_edit_goods_registry FROM personnel WHERE gov_id::TEXT like $1 ORDER BY personnel_id ASC`,[`%${gov_id}%`]
    )
    return r.rows;
}

export async function viewEmployeesByName(full_name){
    const r=await pool.query(
        `SELECT personnel_id, gov_id, full_name, date_of_birth, occupation_code, isactive, working_start_date, working_end_date, auth_receive, auth_edit_personnel, auth_edit_goods_registry FROM personnel WHERE full_name ILIKE $1 ORDER BY personnel_id ASC`,[`%${full_name}%`]
    )
    return r.rows;
}

export async function viewEmployeesByOccCode(occupation_code){
    const r=await pool.query(
        `SELECT personnel_id, gov_id, full_name, date_of_birth, occupation_code, isactive, working_start_date, working_end_date, auth_receive, auth_edit_personnel, auth_edit_goods_registry FROM personnel WHERE occupation_code::TEXT like $1 ORDER BY personnel_id ASC`,[`%${occupation_code}%`]
    )
    return r.rows;
}

export async function viewEmployeesByIsActive(isactive){
    const r=await pool.query(
        `SELECT personnel_id, gov_id, full_name, date_of_birth, occupation_code, isactive, working_start_date, working_end_date, auth_receive, auth_edit_personnel, auth_edit_goods_registry FROM personnel WHERE isactive=$1 ORDER BY personnel_id ASC`,[isactive]
    )
    return r.rows;
}

export async function viewEmployeesByDateOfBirth(date_of_birth) { 
    const r=await pool.query(`
        SELECT personnel_id, gov_id, full_name, date_of_birth, occupation_code, isactive, working_start_date, working_end_date, auth_receive, auth_edit_personnel, auth_edit_goods_registry FROM personnel WHERE date_of_birth::TEXT LIKE ANY($1::text[]) ORDER BY personnel_id ASC
        `, [date_of_birth.map(d => `%${d}%`)]
    )
    return r.rows
}


//add new employee
export async function addNewEmployee(govid, name, dateOfBirth, occCode, password) {
    const hashedPassword = await bcrypt.hash(password, 10);
    const r=await pool.query(
        `INSERT INTO personnel(gov_id, full_name, date_of_birth, occupation_code, password)
         VALUES ($1, $2, $3, $4, $5)
         RETURNING *`,
        [govid, name, dateOfBirth, occCode, hashedPassword]
    )
    return r.rows[0];
}

//edit my or someone`s other profile (if logged in as manager)
export async function editProfile(personnelId, govid, name, dateOfBirth, password) {
    const hashedPassword = await bcrypt.hash(password, 10);
    const r=await pool.query(`
        UPDATE personnel
        SET gov_id=$1,
        full_name=$2,
        date_of_birth=$3,
        password=$4
        WHERE personnel_id=$5
        RETURNING *`,
        [govid, name, dateOfBirth, hashedPassword, personnelId]
    )
    return r.rows[0];
}

//change occupation code
export async function changeOccCode(id, occCode) {
    const r=await pool.query(
        `UPDATE personnel SET occupation_code=$1 WHERE personnel_id=$2 RETURNING *`,
        [occCode, id]
    )
    return r.rows[0];
}

//dismiss employee
export async function dismissEmployee(id) {
    const r=await pool.query(
        `UPDATE personnel SET isActive=false,
        working_end_date=CURRENT_DATE,
        auth_receive=false,
        auth_edit_personnel=false,
        auth_edit_goods_registry=false
        WHERE personnel_id=$1
        RETURNING *`,
        [id]
    )
    return r.rows[0];
}

//Return a dismissed employee (worker or receiver)

export async function returnEmployee(id, occCode) {
    const r=await pool.query(
        `UPDATE personnel SET isActive=true,
        occupation_code=$1,
        working_end_date=null
        WHERE personnel_id=$2
        RETURNING *`,
        [occCode, id]
    )
    return r.rows[0];
}

//2. GOODS OPERATIONS

//view goods registry

export async function viewGoodsRegistryAll(){
    const r=await pool.query(
        `SELECT * FROM goods_registry ORDER BY code ASC`
    )
    return r.rows;
}

export async function viewGoodsRegistryByCode(code){
    const r=await pool.query(
        `SELECT * FROM goods_registry WHERE code::TEXT like $1 ORDER BY code ASC`,
        [`%${code}%`]
    )
    return r.rows;
}

export async function viewGoodsRegistryByName(name){
    const r=await pool.query(
        `SELECT * FROM goods_registry WHERE name ILIKE $1 ORDER BY code ASC`,
        [`%${name}%`]
    )
    return r.rows;
}

export async function viewGoodsRegistryByIsFood(is_food){
    const r=await pool.query(
        `SELECT * FROM goods_registry WHERE is_food=$1 ORDER BY code ASC`,
        [is_food]
    )
    return r.rows;
}

export async function viewGoodsRegistryByMeasuringUnit(measuring_unit){
    const r=await pool.query(
        `SELECT * FROM goods_registry WHERE measuring_unit ILIKE $1 ORDER BY code ASC`,
        [`%${measuring_unit}%`]
    )
    return r.rows;
}
//Add/update a new item to goods_registry

export async function addGoodsToRegistry(code, name, isFood, unit) {
    const r=await pool.query(
        `INSERT INTO goods_registry(code, name, is_food, measuring_unit)
         VALUES ($1, $2, $3, $4)
         RETURNING *`,
        [code, name, isFood, unit]
    )
    return r.rows[0]
}

export async function updateGoodsInRegistry(code, name, isFood, unit) {
    const r=await pool.query(
        `UPDATE goods_registry
         SET name=$1,
             is_food=$2,
             measuring_unit=$3
         WHERE code=$4
         RETURNING *`,
        [name, isFood, unit, code]
    )
    return r.rows[0]
}


//New logistic operation
export async function newLogisticOperation(code, quantity, operation_code, responsible_id) {
    const r=await pool.query(
        `INSERT INTO logistics (code, quantity, operation_code, responsible_id)
         VALUES ($1, $2, $3, $4)
         RETURNING *`,
        [code, quantity, operation_code, responsible_id]
    )
    return r.rows[0]
}

//Watch logistics operations
export async function watchLogisticsAll() { //checked
    const r=await pool.query(`
        SELECT * FROM logistics ORDER BY operation_id DESC
        `)
        return r.rows
}

//Watch logistics operations by one or more codes
export async function watchLogisticsByCode(codes) { //checked
    const r=await pool.query(`
        SELECT * FROM logistics WHERE code::TEXT LIKE ANY($1::text[]) ORDER BY operation_id DESC
        `, [codes.map(c => `%${c}%`)]
    )
    return r.rows
}

//Watch logistics operations by one or more names
export async function watchLogisticsByName(names) { //checked
    const r=await pool.query(`
        SELECT * FROM logistics WHERE name ILIKE ANY($1::text[]) ORDER BY operation_id DESC
        `, [names.map(n => `%${n}%`)]
    )
    return r.rows
}

//Watch logistics operations by one or more quantities
export async function watchLogisticsByQuantity(quantities) { //checked
    const r=await pool.query(`
        SELECT * FROM logistics WHERE quantity = ANY($1::numeric[]) ORDER BY operation_id DESC
        `, [quantities]
    )
    return r.rows
}

//Watch logistics operations by one or more operation codes
export async function watchLogisticsByOperationCode(operation_codes) { //checked
    const r=await pool.query(`
        SELECT * FROM logistics WHERE operation_code = ANY($1::int[]) ORDER BY operation_id DESC
        `, [operation_codes]
    )
    return r.rows
}

//Watch logistics operations by one or more operation names
export async function watchLogisticsByOperationName(operation_names) { //checked
    const r=await pool.query(`
        SELECT * FROM logistics WHERE operation_name ILIKE ANY($1::text[]) ORDER BY operation_id DESC
        `, [operation_names.map(n => `%${n}%`)]
    )
    return r.rows
}

//Watch logistics operations by food or general criteria
export async function watchLogisticsByIsFood(is_food) { //checked
    const r=await pool.query(`
        SELECT * FROM logistics WHERE is_food=$1 ORDER BY operation_id DESC
        `, [is_food]
    )
    return r.rows
}

//Watch logistics operations by one or more measuring units
export async function watchLogisticsByMeasuringUnit(measuring_units) { //checked
    const r=await pool.query(`
        SELECT * FROM logistics WHERE measuring_unit ILIKE ANY($1::text[]) ORDER BY operation_id DESC
        `, [measuring_units.map(u => `%${u}%`)]
    )
    return r.rows
}

//Watch logistics operations by one or more responsible personnel IDs
export async function watchLogisticsByResponsibleId(responsible_ids) { //checked
    const r=await pool.query(`
        SELECT * FROM logistics WHERE responsible_id = ANY($1::int[]) ORDER BY operation_id DESC
        `, [responsible_ids]
    )
    return r.rows
}

//Watch logistics operations by one or more dates
export async function watchLogisticsByDate(dates) { //checked
    const r=await pool.query(`
        SELECT * FROM logistics WHERE date_and_time::TEXT LIKE ANY($1::text[]) ORDER BY operation_id DESC
        `, [dates.map(d => `%${d}%`)]
    )
    return r.rows
}

//Watch logistics operations by one or more times
export async function watchLogisticsByTime(times) { //checked
    const r=await pool.query(`
        SELECT * FROM logistics WHERE date_and_time::TEXT LIKE ANY($1::text[]) ORDER BY operation_id DESC
        `, [times.map(t => `%${t}%`)]
    )
    return r.rows
}

//Watch logistics operations by one or more reports
export async function watchLogisticsByReport(reports) {
    const r=await pool.query(`
        SELECT * FROM logistics WHERE report ILIKE ANY($1::text[]) ORDER BY operation_id DESC
        `, [reports.map(rp => `%${rp}%`)]
    )
    return r.rows
}

//Watch foods warehouse inventory
export async function watchFoodsInventoryAll() {
    const r=await pool.query(`
        SELECT * FROM foods_inventory ORDER BY code ASC
        `)
    return r.rows
}

export async function watchFoodsInventoryByCode(code) {
    const r=await pool.query(
        `SELECT * FROM foods_inventory WHERE code::TEXT LIKE $1 ORDER BY code ASC`,
        [`%${code}%`]
    )
    return r.rows
}

export async function watchFoodsInventoryByName(name) {
    const r=await pool.query(
        `SELECT * FROM foods_inventory WHERE name ILIKE $1 ORDER BY code ASC`,
        [`%${name}%`]
    )
    return r.rows
}

export async function watchFoodsInventoryByMeasuringUnit(measuring_unit){
    const r=await pool.query(
        `SELECT * FROM foods_inventory WHERE measuring_unit ILIKE $1 ORDER BY code ASC`,
        [`%${measuring_unit}%`]
    )
    return r.rows
}
 //* Watch general warehouse inventory

export async function watchGeneralInventoryAll() {
    const r=await pool.query(`
        SELECT * FROM general_inventory ORDER BY code ASC
        `)
    return r.rows
}


export async function watchGeneralInventoryByCode(code) {
    const r=await pool.query(
        `SELECT * FROM general_inventory WHERE code::TEXT LIKE $1 ORDER BY code ASC`,
        [`%${code}%`]
    )
    return r.rows
}

export async function watchGeneralInventoryByName(name) {
    const r=await pool.query(
        `SELECT * FROM general_inventory WHERE name ILIKE $1 ORDER BY code ASC`,
        [`%${name}%`]
    )
    return r.rows
};

export async function watchGeneralInventoryByMeasuringUnit(measuring_unit){
    const r=await pool.query(
        `SELECT * FROM general_inventory WHERE measuring_unit ILIKE $1 ORDER BY code ASC`,
        [`%${measuring_unit}%`]
    )
    return r.rows
}

//Add report 
export async function addReport(operation_id, report){
    const r=await pool.query(`
        UPDATE logistics SET report=$1 WHERE operation_id=$2
        RETURNING *`, [report, operation_id])
        return r.rows[0]

}

