import { pool } from '../db/pool.js';

const COLLAB_JSON = `(SELECT COALESCE(json_agg(jsonb_build_object(
    'user_id', cu.user_id::text, 'username', cu.username, 'avatar', cu.avatar
) ORDER BY cu.username), '[]'::json)
FROM users cu WHERE cu.user_id::text = ANY(s.collaborators))`;

const FEED_COLUMNS = `s.story_id, s.version, s.header, s.story,
    s.author_id, s.version_author_id, s.collaborators, s.likes, s.dislikes,
    s.created_at,
    (SELECT MIN(s2.created_at) FROM stories s2 WHERE s2.story_id=s.story_id) AS original_created_at,
    sr.reaction AS user_reaction,
    ${COLLAB_JSON} AS collaborator_data`;

export async function getFeedMine(userId: number) {
    const r = await pool.query(
        `SELECT * FROM (
            SELECT DISTINCT ON (s.story_id)
                   ${FEED_COLUMNS},
                   (SELECT username FROM users WHERE user_id=s.author_id) AS author_username,
                   (SELECT status FROM collab_requests WHERE story_id=s.story_id AND requester_id=$1) AS collab_request_status
            FROM stories s
            LEFT JOIN story_reactions sr ON sr.story_id=s.story_id AND sr.user_id=$1
            WHERE s.author_id=$1
            ORDER BY s.story_id, s.version DESC
         ) sub ORDER BY sub.created_at DESC`,
        [userId]
    );
    return r.rows;
}

export async function getFeedSocial(userId: number) {
    const r = await pool.query(
        `SELECT * FROM (
            SELECT DISTINCT ON (s.story_id)
                   ${FEED_COLUMNS},
                   u.username AS author_username,
                   (SELECT status FROM collab_requests WHERE story_id=s.story_id AND requester_id=$1) AS collab_request_status
            FROM stories s
            JOIN users u  ON u.user_id=s.author_id
            JOIN users me ON me.user_id=$1
            LEFT JOIN story_reactions sr ON sr.story_id=s.story_id AND sr.user_id=$1
            WHERE s.author_id=$1
               OR (u.is_active=true AND s.author_id::text=ANY(me.friends))
               OR (u.is_active=true AND u.is_private=false
                   AND s.author_id::text=ANY(me.coauthors)
                   AND NOT (s.author_id::text=ANY(me.friends)))
            ORDER BY s.story_id, s.version DESC
         ) sub ORDER BY sub.created_at DESC`,
        [userId]
    );
    return r.rows;
}

export async function getFeedAll(userId: number) {
    const r = await pool.query(
        `SELECT * FROM (
            SELECT DISTINCT ON (s.story_id)
                   ${FEED_COLUMNS},
                   u.username AS author_username,
                   (SELECT status FROM collab_requests WHERE story_id=s.story_id AND requester_id=$1) AS collab_request_status
            FROM stories s
            JOIN users u ON u.user_id=s.author_id
            LEFT JOIN story_reactions sr ON sr.story_id=s.story_id AND sr.user_id=$1
            WHERE u.is_private=false AND u.is_active=true
            ORDER BY s.story_id, s.version DESC
         ) sub ORDER BY sub.created_at DESC`,
        [userId]
    );
    return r.rows;
}

export async function getStoriesByAuthor(authorId: number, requesterId: number) {
    const r = await pool.query(
        `SELECT * FROM (
            SELECT DISTINCT ON (s.story_id)
                   ${FEED_COLUMNS},
                   (SELECT username FROM users WHERE user_id=s.author_id) AS author_username,
                   (SELECT status FROM collab_requests WHERE story_id=s.story_id AND requester_id=$2) AS collab_request_status
            FROM stories s
            LEFT JOIN story_reactions sr ON sr.story_id=s.story_id AND sr.user_id=$2
            WHERE s.author_id=$1
            ORDER BY s.story_id, s.version DESC
         ) sub ORDER BY sub.created_at DESC`,
        [authorId, requesterId]
    );
    return r.rows;
}

export async function createStory(header: string, story: string, authorId: number, collaboratorIds: string[]) {
    const story_id = (await pool.query('SELECT nextval($1)', ['story_id_seq'])).rows[0].nextval;
    const r = await pool.query(
        `INSERT INTO stories(story_id, version, header, story, author_id, collaborators, version_author_id)
         VALUES($1,1,$2,$3,$4,$5,$4) RETURNING *`,
        [story_id, header, story, authorId, collaboratorIds]
    );
    return r.rows[0];
}

export async function resolveCollaboratorIds(usernames: string[]): Promise<string[]> {
    if (!usernames.length) return [];
    const r = await pool.query(
        `SELECT user_id::text FROM users WHERE username=ANY($1::text[])`, [usernames]
    );
    return r.rows.map((row: { user_id: string }) => row.user_id);
}

export async function getPermissions(storyId: number) {
    const r = await pool.query(
        `SELECT author_id, collaborators, MAX(version) AS v
         FROM stories WHERE story_id=$1
         GROUP BY author_id, collaborators`,
        [storyId]
    );
    return r.rows[0] ?? null;
}

export async function addVersion(storyId: number, newVersion: number, header: string, story: string, versionAuthorId: number, prevVersion: number) {
    const r = await pool.query(
        `INSERT INTO stories(story_id, version, header, story, author_id, collaborators, version_author_id)
         SELECT story_id,$1,$2,$3,author_id,collaborators,$6
         FROM stories WHERE story_id=$4 AND version=$5 RETURNING *`,
        [newVersion, header, story, storyId, prevVersion, versionAuthorId]
    );
    return r.rows[0];
}

export async function getLatestVersion(storyId: number) {
    const r = await pool.query(
        `SELECT version, author_id, version_author_id
         FROM stories WHERE story_id=$1 ORDER BY version DESC LIMIT 1`,
        [storyId]
    );
    return r.rows[0] ?? null;
}

export async function deleteVersion(storyId: number, version: number) {
    await pool.query('DELETE FROM stories WHERE story_id=$1 AND version=$2', [storyId, version]);
    const prev = await pool.query(
        'SELECT * FROM stories WHERE story_id=$1 ORDER BY version DESC LIMIT 1', [storyId]
    );
    return prev.rows[0] ?? null;
}

export async function deleteAllVersions(storyId: number) {
    await pool.query('DELETE FROM stories WHERE story_id=$1', [storyId]);
}

export async function storyExists(storyId: number): Promise<boolean> {
    const r = await pool.query('SELECT 1 FROM stories WHERE story_id=$1 LIMIT 1', [storyId]);
    return (r.rowCount ?? 0) > 0;
}

export async function getReaction(userId: number, storyId: number): Promise<string | null> {
    const r = await pool.query(
        'SELECT reaction FROM story_reactions WHERE user_id=$1 AND story_id=$2',
        [userId, storyId]
    );
    return r.rows[0]?.reaction ?? null;
}

export async function upsertReaction(userId: number, storyId: number, reaction: 'like' | 'dislike') {
    await pool.query(
        `INSERT INTO story_reactions(user_id, story_id, reaction) VALUES($1,$2,$3)
         ON CONFLICT(user_id,story_id) DO UPDATE SET reaction=$3`,
        [userId, storyId, reaction]
    );
}

export async function deleteReaction(userId: number, storyId: number) {
    await pool.query(
        'DELETE FROM story_reactions WHERE user_id=$1 AND story_id=$2', [userId, storyId]
    );
}

export async function updateReactionCounts(storyId: number, likesDelta: number, dislikesDelta: number) {
    const r = await pool.query(
        `UPDATE stories
         SET likes=GREATEST(0,likes+$2), dislikes=GREATEST(0,dislikes+$3)
         WHERE story_id=$1 AND version=(SELECT MAX(version) FROM stories WHERE story_id=$1)
         RETURNING *`,
        [storyId, likesDelta, dislikesDelta]
    );
    return r.rows[0] ?? null;
}

export async function getStoryAuthor(storyId: number): Promise<number | null> {
    const r = await pool.query('SELECT author_id FROM stories WHERE story_id=$1 LIMIT 1', [storyId]);
    return r.rows[0]?.author_id ?? null;
}

export async function insertCollabRequest(storyId: number, requesterId: number, authorId: number) {
    await pool.query(
        `INSERT INTO collab_requests(story_id, requester_id, author_id) VALUES($1,$2,$3)
         ON CONFLICT(story_id, requester_id) DO UPDATE SET status='pending', created_at=NOW()`,
        [storyId, requesterId, authorId]
    );
}

export async function insertReport(storyId: number, reporterId: number, reason: string) {
    await pool.query(
        'INSERT INTO reports(story_id, reporter_id, reason) VALUES($1,$2,$3)',
        [storyId, reporterId, reason]
    );
}
