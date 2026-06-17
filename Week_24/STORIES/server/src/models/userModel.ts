import { pool } from '../db/pool.js';

const COLLAB_SUBQUERY = `
    SELECT DISTINCT u2.user_id, u2.username, u2.avatar, u2.is_active
    FROM stories s2
    JOIN users u2 ON u2.user_id::text = ANY(s2.collaborators)
    WHERE s2.author_id = u.user_id AND u2.user_id != u.user_id
    UNION
    SELECT DISTINCT ua.user_id, ua.username, ua.avatar, ua.is_active
    FROM stories s3
    JOIN users ua ON ua.user_id = s3.author_id
    WHERE u.user_id::text = ANY(s3.collaborators) AND ua.user_id != u.user_id
`;

export async function getEnrichedProfile(userId: number) {
    const r = await pool.query(
        `SELECT u.user_id, u.username, u.avatar, u.is_private, u.is_active, u.created_at,
                COALESCE(
                    (SELECT json_agg(jsonb_build_object(
                        'user_id', f.user_id, 'username', f.username,
                        'avatar', f.avatar, 'is_active', f.is_active
                    ) ORDER BY f.username)
                    FROM users f WHERE f.user_id::text = ANY(u.friends)),
                    '[]'::json
                ) AS friends,
                COALESCE(
                    (SELECT json_agg(jsonb_build_object(
                        'user_id', cu.user_id, 'username', cu.username,
                        'avatar', cu.avatar, 'is_active', cu.is_active
                    ) ORDER BY cu.username)
                    FROM (${COLLAB_SUBQUERY}) cu),
                    '[]'::json
                ) AS coauthors
         FROM users u WHERE u.user_id=$1`,
        [userId]
    );
    return r.rows[0] ?? null;
}

export async function getProfileWithRelationship(viewedId: number, currentId: number) {
    const r = await pool.query(
        `SELECT u.user_id, u.username, u.avatar, u.is_private, u.is_active, u.created_at,
                COALESCE(
                    (SELECT json_agg(jsonb_build_object(
                        'user_id', f.user_id, 'username', f.username,
                        'avatar', f.avatar, 'is_active', f.is_active
                    ) ORDER BY f.username)
                    FROM users f WHERE f.user_id::text = ANY(u.friends)),
                    '[]'::json
                ) AS friends,
                COALESCE(
                    (SELECT json_agg(jsonb_build_object(
                        'user_id', cu.user_id, 'username', cu.username,
                        'avatar', cu.avatar, 'is_active', cu.is_active
                    ) ORDER BY cu.username)
                    FROM (${COLLAB_SUBQUERY}) cu),
                    '[]'::json
                ) AS coauthors,
                CASE
                    WHEN $2::text = ANY(u.friends) THEN 'friends'
                    WHEN EXISTS(
                        SELECT 1 FROM friend_requests
                        WHERE sender_id=$2::int AND receiver_id=u.user_id AND status='pending'
                    ) THEN 'pending_sent'
                    WHEN EXISTS(
                        SELECT 1 FROM friend_requests
                        WHERE sender_id=u.user_id AND receiver_id=$2::int AND status='pending'
                    ) THEN 'pending_received'
                    ELSE 'none'
                END AS relationship
         FROM users u WHERE u.user_id=$1`,
        [viewedId, currentId]
    );
    return r.rows[0] ?? null;
}

export async function getPrivacyInfo(userId: number) {
    const r = await pool.query('SELECT is_private, friends FROM users WHERE user_id=$1', [userId]);
    return r.rows[0] ?? null;
}

export async function updateProfile(userId: number, fields: Record<string, unknown>) {
    const keys = ['username', 'avatar', 'is_private', 'is_active'];
    const updates: string[] = [];
    const values: unknown[] = [];
    let idx = 1;
    for (const key of keys) {
        if (fields[key] !== undefined) {
            updates.push(`${key}=$${idx++}`);
            values.push(fields[key]);
        }
    }
    if (!updates.length) return null;
    values.push(userId);
    const r = await pool.query(
        `UPDATE users SET ${updates.join(', ')} WHERE user_id=$${idx}
         RETURNING user_id, username, avatar, is_private, is_active`,
        values
    );
    return r.rows[0];
}

export async function getPasswordHash(userId: number): Promise<string | null> {
    const r = await pool.query('SELECT password FROM users WHERE user_id=$1', [userId]);
    return r.rows[0]?.password ?? null;
}

export async function updatePassword(userId: number, hashed: string) {
    await pool.query('UPDATE users SET password=$1 WHERE user_id=$2', [hashed, userId]);
}

export async function deactivate(userId: number) {
    await pool.query('UPDATE users SET is_active=false WHERE user_id=$1', [userId]);
}

export async function searchUsers(query: string, excludeId: number) {
    const r = await pool.query(
        `SELECT user_id, username, avatar FROM users
         WHERE username ILIKE $1 AND is_private=false AND is_active=true AND user_id!=$2
         ORDER BY username LIMIT 10`,
        [`%${query}%`, excludeId]
    );
    return r.rows;
}

export async function getFriendRequests(receiverId: number) {
    const r = await pool.query(
        `SELECT fr.id, fr.sender_id, fr.created_at, u.username, u.avatar, u.is_active
         FROM friend_requests fr
         JOIN users u ON u.user_id=fr.sender_id
         WHERE fr.receiver_id=$1 AND fr.status='pending'
         ORDER BY fr.created_at DESC`,
        [receiverId]
    );
    return r.rows;
}

export async function acceptFriendRequest(senderId: number, receiverId: number) {
    await pool.query(
        `UPDATE friend_requests SET status='accepted'
         WHERE sender_id=$1 AND receiver_id=$2 AND status='pending'`,
        [senderId, receiverId]
    );
    await pool.query(
        `UPDATE users SET friends=array_append(friends,$1::text)
         WHERE user_id=$2 AND NOT ($1::text=ANY(friends))`,
        [senderId, receiverId]
    );
    await pool.query(
        `UPDATE users SET friends=array_append(friends,$1::text)
         WHERE user_id=$2 AND NOT ($1::text=ANY(friends))`,
        [receiverId, senderId]
    );
}

export async function declineFriendRequest(senderId: number, receiverId: number) {
    await pool.query(
        `UPDATE friend_requests SET status='declined'
         WHERE sender_id=$1 AND receiver_id=$2 AND status='pending'`,
        [senderId, receiverId]
    );
}

export async function sendFriendRequest(senderId: number, receiverId: number) {
    await pool.query(
        `INSERT INTO friend_requests(sender_id, receiver_id, status) VALUES($1,$2,'pending')
         ON CONFLICT(sender_id, receiver_id) DO UPDATE SET status='pending', created_at=NOW()`,
        [senderId, receiverId]
    );
}

export async function updateFriends(userId: number, targetId: string, action: 'add' | 'remove') {
    const op = action === 'remove'
        ? 'array_remove(friends,$1::text)'
        : 'array_append(friends,$1::text)';
    const r = await pool.query(
        `UPDATE users SET friends=${op} WHERE user_id=$2 RETURNING friends`,
        [targetId, userId]
    );
    return r.rows[0];
}

export async function removeFriendBidirectional(userId: number, targetId: string) {
    await pool.query(
        `UPDATE users SET friends=array_remove(friends,$1::text) WHERE user_id=$2`,
        [userId, targetId]
    );
    await pool.query(
        `UPDATE users SET friends=array_remove(friends,$1::text) WHERE user_id=$2`,
        [targetId, userId]
    );
}

export async function getCollabRequests(authorId: number) {
    const r = await pool.query(
        `SELECT cr.id, cr.story_id, cr.requester_id, cr.created_at,
                u.username, u.avatar, u.is_active,
                (SELECT header FROM stories WHERE story_id=cr.story_id ORDER BY version DESC LIMIT 1) AS story_header
         FROM collab_requests cr
         JOIN users u ON u.user_id=cr.requester_id
         WHERE cr.author_id=$1 AND cr.status='pending'
         ORDER BY cr.created_at DESC`,
        [authorId]
    );
    return r.rows;
}

export async function acceptCollabRequest(requestId: number, authorId: number) {
    const r = await pool.query(
        `SELECT story_id, requester_id FROM collab_requests
         WHERE id=$1 AND author_id=$2 AND status='pending'`,
        [requestId, authorId]
    );
    if (!r.rows[0]) return false;
    const { story_id, requester_id } = r.rows[0];
    await pool.query(
        `UPDATE stories SET collaborators=array_append(collaborators,$1::text)
         WHERE story_id=$2 AND NOT ($1::text=ANY(collaborators))`,
        [requester_id, story_id]
    );
    await pool.query(`UPDATE collab_requests SET status='accepted' WHERE id=$1`, [requestId]);
    return true;
}

export async function declineCollabRequest(requestId: number, authorId: number) {
    await pool.query(
        `UPDATE collab_requests SET status='declined'
         WHERE id=$1 AND author_id=$2 AND status='pending'`,
        [requestId, authorId]
    );
}

export async function getStoriesByUser(authorId: number) {
    const r = await pool.query(
        `SELECT DISTINCT ON (story_id) story_id, version, header, story,
                author_id, collaborators, likes, dislikes, created_at
         FROM stories WHERE author_id=$1
         ORDER BY story_id, version DESC`,
        [authorId]
    );
    return r.rows;
}
