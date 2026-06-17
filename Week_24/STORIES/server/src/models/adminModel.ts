import { pool } from '../db/pool.js';

export async function isAdmin(userId: number): Promise<boolean> {
    const r = await pool.query('SELECT is_admin FROM users WHERE user_id=$1', [userId]);
    return r.rows[0]?.is_admin === true;
}

export async function getAllReports() {
    const r = await pool.query(
        `SELECT r.id, r.story_id, r.reporter_id, r.reason, r.created_at, r.is_implemented,
                u.username AS reporter_username,
                s.version, s.header
         FROM reports r
         LEFT JOIN (
             SELECT DISTINCT ON (story_id) story_id, version, header
             FROM stories ORDER BY story_id, version DESC
         ) s ON s.story_id=r.story_id
         LEFT JOIN users u ON u.user_id=r.reporter_id
         ORDER BY r.created_at DESC`
    );
    return r.rows;
}

export async function getReportById(reportId: number) {
    const r = await pool.query('SELECT story_id FROM reports WHERE id=$1', [reportId]);
    return r.rows[0] ?? null;
}

export async function deleteLatestStoryVersion(storyId: number) {
    const latest = await pool.query('SELECT MAX(version) AS v FROM stories WHERE story_id=$1', [storyId]);
    if (latest.rows[0]?.v) {
        await pool.query('DELETE FROM stories WHERE story_id=$1 AND version=$2', [storyId, latest.rows[0].v]);
    }
}

export async function deleteStoryCompletely(storyId: number) {
    await pool.query('DELETE FROM stories WHERE story_id=$1', [storyId]);
}

export async function markReportImplemented(reportId: number) {
    await pool.query('UPDATE reports SET is_implemented=true WHERE id=$1', [reportId]);
}

export async function markAllReportsForStoryImplemented(storyId: number) {
    await pool.query('UPDATE reports SET is_implemented=true WHERE story_id=$1', [storyId]);
}
