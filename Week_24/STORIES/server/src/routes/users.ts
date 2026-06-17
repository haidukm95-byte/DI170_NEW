import express from 'express';
import bcrypt from 'bcryptjs';
import { AuthRequest, verifyJWT } from '../middleware/verifyJWT.js';
import { pool } from '../db/pool.js';

const router = express.Router();

// Returns an enriched profile: friends/coauthors as objects instead of raw id arrays
async function enrichedProfile(userId: number) {
    const result = await pool.query(
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
                    FROM (
                        SELECT DISTINCT u2.user_id, u2.username, u2.avatar, u2.is_active
                        FROM stories s2
                        JOIN users u2 ON u2.user_id::text = ANY(s2.collaborators)
                        WHERE s2.author_id = u.user_id AND u2.user_id != u.user_id
                        UNION
                        SELECT DISTINCT ua.user_id, ua.username, ua.avatar, ua.is_active
                        FROM stories s3
                        JOIN users ua ON ua.user_id = s3.author_id
                        WHERE u.user_id::text = ANY(s3.collaborators) AND ua.user_id != u.user_id
                    ) cu),
                    '[]'::json
                ) AS coauthors
         FROM users u WHERE u.user_id = $1`,
        [userId]
    );
    return result.rows[0] ?? null;
}

// ── /me routes — must be registered before /:id ───────────────────────────

// GET /me — current user's full profile
router.get('/me', verifyJWT, async (req: AuthRequest, res) => {
    const profile = await enrichedProfile(req.user!.user_id);
    if (!profile) { res.status(404).json({ error: 'User not found' }); return; }
    res.json(profile);
});

// GET /me/friend-requests — incoming pending friend requests
router.get('/me/friend-requests', verifyJWT, async (req: AuthRequest, res) => {
    const userId = req.user!.user_id;
    const result = await pool.query(
        `SELECT fr.id, fr.sender_id, fr.created_at,
                u.username, u.avatar, u.is_active
         FROM friend_requests fr
         JOIN users u ON u.user_id = fr.sender_id
         WHERE fr.receiver_id = $1 AND fr.status = 'pending'
         ORDER BY fr.created_at DESC`,
        [userId]
    );
    res.json(result.rows);
});

// PATCH /me — update username, avatar, is_private, or is_active
router.patch('/me', verifyJWT, async (req: AuthRequest, res) => {
    const userId = req.user!.user_id;
    const { username, avatar, is_private, is_active } = req.body;

    const updates: string[] = [];
    const values: unknown[] = [];
    let idx = 1;

    if (username !== undefined)   { updates.push(`username = $${idx++}`);   values.push(username); }
    if (avatar !== undefined)     { updates.push(`avatar = $${idx++}`);     values.push(avatar); }
    if (is_private !== undefined) { updates.push(`is_private = $${idx++}`); values.push(is_private); }
    if (is_active !== undefined)  { updates.push(`is_active = $${idx++}`);  values.push(is_active); }

    if (!updates.length) { res.status(400).json({ error: 'Nothing to update' }); return; }

    values.push(userId);
    const result = await pool.query(
        `UPDATE users SET ${updates.join(', ')} WHERE user_id = $${idx}
         RETURNING user_id, username, avatar, is_private, is_active`,
        values
    );
    res.json(result.rows[0]);
});

// PATCH /me/password — change password (requires current password)
router.patch('/me/password', verifyJWT, async (req: AuthRequest, res) => {
    const userId = req.user!.user_id;
    const { currentPassword, newPassword } = req.body;

    const userResult = await pool.query('SELECT password FROM users WHERE user_id = $1', [userId]);
    const user = userResult.rows[0];
    if (!user || !(await bcrypt.compare(currentPassword, user.password))) {
        res.status(401).json({ error: 'Current password is incorrect' });
        return;
    }

    const hashed = await bcrypt.hash(newPassword, 12);
    await pool.query('UPDATE users SET password = $1 WHERE user_id = $2', [hashed, userId]);
    res.json({ message: 'Password updated' });
});

// PUT /me/friend-requests/:senderId/accept
router.put('/me/friend-requests/:senderId/accept', verifyJWT, async (req: AuthRequest, res) => {
    const userId = req.user!.user_id;
    const senderId = Number(req.params.senderId);

    await pool.query(
        `UPDATE friend_requests SET status = 'accepted'
         WHERE sender_id = $1 AND receiver_id = $2 AND status = 'pending'`,
        [senderId, userId]
    );
    // Add each user to the other's friends list (guard against duplicates)
    await pool.query(
        `UPDATE users SET friends = array_append(friends, $1::text)
         WHERE user_id = $2 AND NOT ($1::text = ANY(friends))`,
        [senderId, userId]
    );
    await pool.query(
        `UPDATE users SET friends = array_append(friends, $1::text)
         WHERE user_id = $2 AND NOT ($1::text = ANY(friends))`,
        [userId, senderId]
    );
    res.json({ message: 'Friend request accepted' });
});

// PUT /me/friend-requests/:senderId/decline
router.put('/me/friend-requests/:senderId/decline', verifyJWT, async (req: AuthRequest, res) => {
    const userId = req.user!.user_id;
    const senderId = Number(req.params.senderId);

    await pool.query(
        `UPDATE friend_requests SET status = 'declined'
         WHERE sender_id = $1 AND receiver_id = $2 AND status = 'pending'`,
        [senderId, userId]
    );
    res.json({ message: 'Friend request declined' });
});

// GET /me/collab-requests — incoming pending collaboration requests for my stories
router.get('/me/collab-requests', verifyJWT, async (req: AuthRequest, res) => {
    const userId = req.user!.user_id;
    const result = await pool.query(
        `SELECT cr.id, cr.story_id, cr.requester_id, cr.created_at,
                u.username, u.avatar, u.is_active,
                (SELECT header FROM stories WHERE story_id = cr.story_id ORDER BY version DESC LIMIT 1) AS story_header
         FROM collab_requests cr
         JOIN users u ON u.user_id = cr.requester_id
         WHERE cr.author_id = $1 AND cr.status = 'pending'
         ORDER BY cr.created_at DESC`,
        [userId]
    );
    res.json(result.rows);
});

// PUT /me/collab-requests/:id/accept — add requester to story collaborators
router.put('/me/collab-requests/:id/accept', verifyJWT, async (req: AuthRequest, res) => {
    const userId = req.user!.user_id;
    const requestId = Number(req.params.id);

    const cr = await pool.query(
        `SELECT story_id, requester_id FROM collab_requests
         WHERE id = $1 AND author_id = $2 AND status = 'pending'`,
        [requestId, userId]
    );
    if (!cr.rows[0]) { res.status(404).json({ error: 'Request not found' }); return; }

    const { story_id, requester_id } = cr.rows[0];
    await pool.query(
        `UPDATE stories
         SET collaborators = array_append(collaborators, $1::text)
         WHERE story_id = $2 AND NOT ($1::text = ANY(collaborators))`,
        [requester_id, story_id]
    );
    await pool.query(
        `UPDATE collab_requests SET status = 'accepted' WHERE id = $1`,
        [requestId]
    );
    res.json({ message: 'Collaboration accepted' });
});

// PUT /me/collab-requests/:id/decline
router.put('/me/collab-requests/:id/decline', verifyJWT, async (req: AuthRequest, res) => {
    const userId = req.user!.user_id;
    const requestId = Number(req.params.id);

    await pool.query(
        `UPDATE collab_requests SET status = 'declined'
         WHERE id = $1 AND author_id = $2 AND status = 'pending'`,
        [requestId, userId]
    );
    res.json({ message: 'Collaboration declined' });
});

// GET /search?q=<query> — search public, active users by username (excludes private accounts)
router.get('/search', verifyJWT, async (req: AuthRequest, res) => {
    const q = String(req.query.q ?? '').trim();
    if (!q) { res.json([]); return; }

    const currentId = req.user!.user_id;
    const result = await pool.query(
        `SELECT user_id, username, avatar
         FROM users
         WHERE username ILIKE $1
           AND is_private = false
           AND is_active = true
           AND user_id != $2
         ORDER BY username
         LIMIT 10`,
        [`%${q}%`, currentId]
    );
    res.json(result.rows);
});

// ── Dynamic /:id routes ────────────────────────────────────────────────────

// GET /:id — another user's profile with enriched friends/coauthors + relationship status
router.get('/:id', verifyJWT, async (req: AuthRequest, res) => {
    const viewedId = Number(req.params.id);
    const currentId = req.user!.user_id;

    const result = await pool.query(
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
                    FROM (
                        SELECT DISTINCT u2.user_id, u2.username, u2.avatar, u2.is_active
                        FROM stories s2
                        JOIN users u2 ON u2.user_id::text = ANY(s2.collaborators)
                        WHERE s2.author_id = u.user_id AND u2.user_id != u.user_id
                        UNION
                        SELECT DISTINCT ua.user_id, ua.username, ua.avatar, ua.is_active
                        FROM stories s3
                        JOIN users ua ON ua.user_id = s3.author_id
                        WHERE u.user_id::text = ANY(s3.collaborators) AND ua.user_id != u.user_id
                    ) cu),
                    '[]'::json
                ) AS coauthors,
                CASE
                    WHEN $2::text = ANY(u.friends) THEN 'friends'
                    WHEN EXISTS(
                        SELECT 1 FROM friend_requests
                        WHERE sender_id = $2::int AND receiver_id = u.user_id AND status = 'pending'
                    ) THEN 'pending_sent'
                    WHEN EXISTS(
                        SELECT 1 FROM friend_requests
                        WHERE sender_id = u.user_id AND receiver_id = $2::int AND status = 'pending'
                    ) THEN 'pending_received'
                    ELSE 'none'
                END AS relationship
         FROM users u WHERE u.user_id = $1`,
        [viewedId, currentId]
    );

    if (!result.rows[0]) { res.status(404).json({ error: 'User not found' }); return; }
    res.json(result.rows[0]);
});

// GET /:id/stories — latest version of each story, gated by privacy
router.get('/:id/stories', verifyJWT, async (req: AuthRequest, res) => {
    const { id } = req.params;
    const requesterId = req.user!.user_id;

    const userResult = await pool.query(
        'SELECT is_private, friends FROM users WHERE user_id = $1', [id]
    );
    if (!userResult.rows[0]) { res.status(404).json({ error: 'User not found' }); return; }

    const { is_private, friends } = userResult.rows[0];
    const isSelf = Number(id) === requesterId;
    const isFriend = (friends as string[]).includes(String(requesterId));

    if (is_private && !isSelf && !isFriend) {
        res.status(403).json({ error: 'This account is private' });
        return;
    }

    const result = await pool.query(
        `SELECT DISTINCT ON (story_id) story_id, version, header, story,
                author_id, collaborators, likes, dislikes, created_at
         FROM stories WHERE author_id = $1
         ORDER BY story_id, version DESC`,
        [id]
    );
    res.json(result.rows);
});

// PUT /:id/friends — add/remove user :id from the requester's friends list
router.put('/:id/friends', verifyJWT, async (req: AuthRequest, res) => {
    const { id } = req.params;
    const requesterId = req.user!.user_id;
    const { action } = req.body;

    if (action !== 'add' && action !== 'remove') {
        res.status(400).json({ error: 'action must be "add" or "remove"' });
        return;
    }

    const arrayOp = action === 'remove'
        ? 'array_remove(friends, $1::text)'
        : 'array_append(friends, $1::text)';

    const result = await pool.query(
        `UPDATE users SET friends = ${arrayOp} WHERE user_id = $2 RETURNING friends`,
        [id, requesterId]
    );

    if (action === 'remove') {
        // Also remove requester from the other user's friends list
        await pool.query(
            `UPDATE users SET friends = array_remove(friends, $1::text) WHERE user_id = $2`,
            [requesterId, id]
        );
    }

    res.json(result.rows[0]);
});

// PUT /:id/coauthors — add/remove user :id from the requester's coauthors list
router.put('/:id/coauthors', verifyJWT, async (req: AuthRequest, res) => {
    const { id } = req.params;
    const requesterId = req.user!.user_id;
    const { action } = req.body;

    if (action !== 'add' && action !== 'remove') {
        res.status(400).json({ error: 'action must be "add" or "remove"' });
        return;
    }

    const arrayOp = action === 'remove'
        ? 'array_remove(coauthors, $1::text)'
        : 'array_append(coauthors, $1::text)';

    const result = await pool.query(
        `UPDATE users SET coauthors = ${arrayOp} WHERE user_id = $2 RETURNING coauthors`,
        [id, requesterId]
    );
    res.json(result.rows[0]);
});

// POST /:id/friend-request — send a friend request to user :id
router.post('/:id/friend-request', verifyJWT, async (req: AuthRequest, res) => {
    const senderId = req.user!.user_id;
    const receiverId = Number(req.params.id);

    if (senderId === receiverId) {
        res.status(400).json({ error: 'Cannot send a friend request to yourself' });
        return;
    }

    await pool.query(
        `INSERT INTO friend_requests (sender_id, receiver_id, status)
         VALUES ($1, $2, 'pending')
         ON CONFLICT (sender_id, receiver_id) DO UPDATE SET status = 'pending', created_at = NOW()`,
        [senderId, receiverId]
    );
    res.json({ message: 'Friend request sent' });
});

// DELETE /:id — deactivate own account (sets is_active = false)
router.delete('/:id', verifyJWT, async (req: AuthRequest, res) => {
    const { id } = req.params;
    if (Number(id) !== req.user!.user_id) {
        res.status(403).json({ error: 'Forbidden' });
        return;
    }
    await pool.query('UPDATE users SET is_active = false WHERE user_id = $1', [id]);
    res.json({ message: 'Account deactivated' });
});

export default router;
