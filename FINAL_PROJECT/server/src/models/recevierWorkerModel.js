/** 
 * FUNCTIONS:
 * PROFILE:
 * edit my profile`s password
 * GOODS OPERATIONS
 * New logistic operation
 * Watch foods warehouse inventory
 * Watch general warehouse inventory
 * */

import { pool } from '../db/pool.js';
import bcrypt from 'bcryptjs';

//PROFILE
//edit my profile`s password

//edit my own password
export async function editPassword(personnelId, password) {
    const hashedPassword = await bcrypt.hash(password, 10);
    const r=await pool.query(`
        UPDATE personnel
        SET password=$1
        WHERE personnel_id=$2
        RETURNING *`,
        [hashedPassword, personnelId]
    )
    return r.rows[0];
}

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

//GOODS OPERATIONS
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
export async function watchLogisticsAll() {
    const r=await pool.query(`
        SELECT * FROM logistics ORDER BY operation_id DESC
        `)
        return r.rows
}

//Watch logistics operations by one or more codes
export async function watchLogisticsByCode(codes) {
    const r=await pool.query(`
        SELECT * FROM logistics WHERE code::TEXT LIKE ANY($1::text[]) ORDER BY operation_id DESC
        `, [codes.map(c => `%${c}%`)]
    )
    return r.rows
}

//Watch logistics operations by one or more names
export async function watchLogisticsByName(names) {
    const r=await pool.query(`
        SELECT * FROM logistics WHERE name ILIKE ANY($1::text[]) ORDER BY operation_id DESC
        `, [names.map(n => `%${n}%`)]
    )
    return r.rows
}

//Watch logistics operations by one or more quantities
export async function watchLogisticsByQuantity(quantities) {
    const r=await pool.query(`
        SELECT * FROM logistics WHERE quantity = ANY($1::numeric[]) ORDER BY operation_id DESC
        `, [quantities]
    )
    return r.rows
}

//Watch logistics operations by one or more operation codes
export async function watchLogisticsByOperationCode(operation_codes) {
    const r=await pool.query(`
        SELECT * FROM logistics WHERE operation_code = ANY($1::int[]) ORDER BY operation_id DESC
        `, [operation_codes]
    )
    return r.rows
}

//Watch logistics operations by one or more operation names
export async function watchLogisticsByOperationName(operation_names) {
    const r=await pool.query(`
        SELECT * FROM logistics WHERE operation_name ILIKE ANY($1::text[]) ORDER BY operation_id DESC
        `, [operation_names.map(n => `%${n}%`)]
    )
    return r.rows
}

//Watch logistics operations by food or general criteria
export async function watchLogisticsByIsFood(is_food) {
    const r=await pool.query(`
        SELECT * FROM logistics WHERE is_food=$1 ORDER BY operation_id DESC
        `, [is_food]
    )
    return r.rows
}

//Watch logistics operations by one or more measuring units
export async function watchLogisticsByMeasuringUnit(measuring_units) {
    const r=await pool.query(`
        SELECT * FROM logistics WHERE measuring_unit ILIKE ANY($1::text[]) ORDER BY operation_id DESC
        `, [measuring_units.map(u => `%${u}%`)]
    )
    return r.rows
}

//Watch logistics operations by one or more responsible personnel IDs
export async function watchLogisticsByResponsibleId(responsible_ids) {
    const r=await pool.query(`
        SELECT * FROM logistics WHERE responsible_id = ANY($1::int[]) ORDER BY operation_id DESC
        `, [responsible_ids]
    )
    return r.rows
}

//Watch logistics operations by one or more dates
export async function watchLogisticsByDate(dates) {
    const r=await pool.query(`
        SELECT * FROM logistics WHERE date_and_time::TEXT LIKE ANY($1::text[]) ORDER BY operation_id DESC
        `, [dates.map(d => `%${d}%`)]
    )
    return r.rows
}

//Watch logistics operations by one or more times
export async function watchLogisticsByTime(times) {
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
        SELECT * FROM foods_inventory
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
}

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