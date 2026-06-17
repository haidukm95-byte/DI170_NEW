import { pool } from '../db/pool.js';

export async function findByIdentifier(identifier: string) {
    const r = await pool.query(
        'SELECT * FROM users WHERE email=$1 OR username=$1', [identifier]
    );
    return r.rows[0] ?? null;
}

export async function findById(userId: number) {
    const r = await pool.query(
        'SELECT user_id, username, email, avatar, is_admin FROM users WHERE user_id=$1',
        [userId]
    );
    return r.rows[0] ?? null;
}

export async function createUser(username: string, email: string, hashedPassword: string) {
    const r = await pool.query(
        `INSERT INTO users(username, email, password)
         VALUES($1,$2,$3) RETURNING user_id, username, email`,
        [username, email, hashedPassword]
    );
    return r.rows[0];
}

export async function isFieldTaken(field: string, value: string): Promise<boolean> {
    const r = await pool.query(`SELECT 1 FROM users WHERE ${field}=$1`, [value]);
    return (r.rowCount ?? 0) > 0;
}
