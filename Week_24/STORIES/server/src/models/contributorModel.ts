import { pool } from '../db/pool.js';

export async function getContributors(storyId: number) {
    const r = await pool.query(
        `SELECT u.user_id, u.username, u.avatar
         FROM (
             SELECT DISTINCT collaborators_uid
             FROM stories, LATERAL unnest(collaborators) AS collaborators_uid
             WHERE story_id=$1
         ) AS c
         JOIN users u ON u.user_id=c.collaborators_uid::int
         ORDER BY u.username`,
        [storyId]
    );
    return r.rows;
}

export async function addContributor(storyId: number, userId: number) {
    await pool.query(
        `UPDATE stories SET collaborators=array_append(collaborators,$1::text)
         WHERE story_id=$2 AND NOT ($1::text=ANY(collaborators))`,
        [userId, storyId]
    );
    return getContributors(storyId);
}

export async function removeContributor(storyId: number, userId: number) {
    await pool.query(
        `UPDATE stories SET collaborators=array_remove(collaborators,$1::text) WHERE story_id=$2`,
        [userId, storyId]
    );
}

export async function storyExists(storyId: number): Promise<boolean> {
    const r = await pool.query('SELECT 1 FROM stories WHERE story_id=$1 LIMIT 1', [storyId]);
    return (r.rowCount ?? 0) > 0;
}

export async function getStoryAuthorId(storyId: number): Promise<number | null> {
    const r = await pool.query('SELECT author_id FROM stories WHERE story_id=$1 LIMIT 1', [storyId]);
    return r.rows[0]?.author_id ?? null;
}
