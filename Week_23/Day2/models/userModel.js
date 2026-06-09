import {pool} from '../config/db.js';
import { hash as argonHash, verify as argonVerify} from '@node-rs/argon2';

export async function createUser(email,password) {
    const hashed=await argonHash(password);
    const {rows} = await pool.query(
        `INSERT INTO users (email, password)
        VALUES ($1, $2)
        RETURNING id, email`,
        [email.toLowerCase(), hashed]
    );
    return rows[0];
}

export async function getUserByEmail(email) {
    const {rows}=await pool.query(
        `SELECT id, email, password FROM users WHERE email=$1`,[email.toLowerCase()]
    );
    return rows[0];
}

export async function verifyPassword(plainPassword, storedPassword){
    return argonVerify(storedPassword, plainPassword)
};

export async function listUsers() {
    const {rows} = await pool.query(
        `SELECT id, email, created_at FROM users ORDER BY id`
    )
    return rows[0];
}