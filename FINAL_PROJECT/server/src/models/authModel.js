import { pool } from "../db/pool.js";

export async function findByGovId(gov_id) {
    const r = await pool.query(
        `SELECT * FROM personnel WHERE gov_id = $1`,
        [gov_id]
    );
    return r.rows[0] ?? null;
}

export async function findByEmpId(personnel_id) {
    const r = await pool.query(
        `SELECT * FROM personnel WHERE personnel_id = $1`,
        [personnel_id]
    );
    return r.rows[0] ?? null;
}

export async function createRefreshToken(tokenId, personnelId, expiresAt) {
    await pool.query(
        `INSERT INTO refresh_tokens (token_id, personnel_id, expires_at) VALUES ($1, $2, $3)`,
        [tokenId, personnelId, expiresAt]
    );
}

export async function findRefreshToken(tokenId) {
    const r = await pool.query(
        `SELECT * FROM refresh_tokens WHERE token_id = $1`,
        [tokenId]
    );
    return r.rows[0] ?? null;
}

export async function revokeRefreshToken(tokenId) {
    await pool.query(
        `UPDATE refresh_tokens SET revoked = true WHERE token_id = $1`,
        [tokenId]
    );
}

