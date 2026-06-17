import express from 'express';
import { pool } from '../db/pool.js';
import { AuthRequest, verifyJWT } from '../middleware/verifyJWT.js';

const router = express.Router();

// GET /feed?filter=mine|all — newest-first, with original creation date and current user's reaction
router.get('/feed', verifyJWT, async (req: AuthRequest, res) => {
    const userId = req.user!.user_id;
    const { filter } = req.query;

    if (filter === 'mine') {
        const result = await pool.query(
            `SELECT * FROM (
                SELECT DISTINCT ON (s.story_id)
                       s.story_id, s.version, s.header, s.story,
                       s.author_id, s.version_author_id, s.collaborators, s.likes, s.dislikes,
                       s.created_at,
                       (SELECT MIN(s2.created_at) FROM stories s2 WHERE s2.story_id = s.story_id) AS original_created_at,
                       sr.reaction AS user_reaction,
                       (SELECT COALESCE(json_agg(jsonb_build_object(
                           'user_id', cu.user_id::text, 'username', cu.username, 'avatar', cu.avatar
                       ) ORDER BY cu.username), '[]'::json)
                        FROM users cu WHERE cu.user_id::text = ANY(s.collaborators)) AS collaborator_data,
                       (SELECT username FROM users WHERE user_id = s.author_id) AS author_username,
                       (SELECT status FROM collab_requests WHERE story_id = s.story_id AND requester_id = $1) AS collab_request_status
                FROM stories s
                LEFT JOIN story_reactions sr ON sr.story_id = s.story_id AND sr.user_id = $1
                WHERE s.author_id = $1
                ORDER BY s.story_id, s.version DESC
             ) sub
             ORDER BY sub.created_at DESC`,
            [userId]
        );
        res.json(result.rows);
    } else if (filter === 'social') {
        // My stories + friends' stories (even private) + public coauthors who are not friends
        const result = await pool.query(
            `SELECT * FROM (
                SELECT DISTINCT ON (s.story_id)
                       s.story_id, s.version, s.header, s.story,
                       s.author_id, s.version_author_id, s.collaborators, s.likes, s.dislikes,
                       s.created_at,
                       (SELECT MIN(s2.created_at) FROM stories s2 WHERE s2.story_id = s.story_id) AS original_created_at,
                       sr.reaction AS user_reaction,
                       (SELECT COALESCE(json_agg(jsonb_build_object(
                           'user_id', cu.user_id::text, 'username', cu.username, 'avatar', cu.avatar
                       ) ORDER BY cu.username), '[]'::json)
                        FROM users cu WHERE cu.user_id::text = ANY(s.collaborators)) AS collaborator_data,
                       u.username AS author_username,
                       (SELECT status FROM collab_requests WHERE story_id = s.story_id AND requester_id = $1) AS collab_request_status
                FROM stories s
                JOIN users u  ON u.user_id  = s.author_id
                JOIN users me ON me.user_id = $1
                LEFT JOIN story_reactions sr ON sr.story_id = s.story_id AND sr.user_id = $1
                WHERE
                    s.author_id = $1
                    OR (u.is_active = true AND s.author_id::text = ANY(me.friends))
                    OR (
                        u.is_active   = true
                        AND u.is_private = false
                        AND s.author_id::text = ANY(me.coauthors)
                        AND NOT (s.author_id::text = ANY(me.friends))
                    )
                ORDER BY s.story_id, s.version DESC
             ) sub
             ORDER BY sub.created_at DESC`,
            [userId]
        );
        res.json(result.rows);
    } else {
        const result = await pool.query(
            `SELECT * FROM (
                SELECT DISTINCT ON (s.story_id)
                       s.story_id, s.version, s.header, s.story,
                       s.author_id, s.version_author_id, s.collaborators, s.likes, s.dislikes,
                       s.created_at,
                       (SELECT MIN(s2.created_at) FROM stories s2 WHERE s2.story_id = s.story_id) AS original_created_at,
                       sr.reaction AS user_reaction,
                       (SELECT COALESCE(json_agg(jsonb_build_object(
                           'user_id', cu.user_id::text, 'username', cu.username, 'avatar', cu.avatar
                       ) ORDER BY cu.username), '[]'::json)
                        FROM users cu WHERE cu.user_id::text = ANY(s.collaborators)) AS collaborator_data,
                       u.username AS author_username,
                       (SELECT status FROM collab_requests WHERE story_id = s.story_id AND requester_id = $1) AS collab_request_status
                FROM stories s
                JOIN users u ON u.user_id = s.author_id
                LEFT JOIN story_reactions sr ON sr.story_id = s.story_id AND sr.user_id = $1
                WHERE u.is_private = false AND u.is_active = true
                ORDER BY s.story_id, s.version DESC
             ) sub
             ORDER BY sub.created_at DESC`,
            [userId]
        );
        res.json(result.rows);
    }
});

// GET /user/:userId — user's stories with current requester's reactions
router.get('/user/:userId', verifyJWT, async (req: AuthRequest, res) => {
    const { userId } = req.params;
    const requesterId = req.user!.user_id;

    const userResult = await pool.query(
        'SELECT is_private, friends FROM users WHERE user_id = $1', [userId]
    );
    if (!userResult.rows[0]) { res.status(404).json({ error: 'User not found' }); return; }

    const { is_private, friends } = userResult.rows[0];
    const isSelf = Number(userId) === requesterId;
    const isFriend = (friends as string[]).includes(String(requesterId));

    if (is_private && !isSelf && !isFriend) {
        res.status(403).json({ error: 'This account is private' });
        return;
    }

    const result = await pool.query(
        `SELECT * FROM (
            SELECT DISTINCT ON (s.story_id)
                   s.story_id, s.version, s.header, s.story,
                   s.author_id, s.version_author_id, s.collaborators, s.likes, s.dislikes,
                   s.created_at,
                   (SELECT MIN(s2.created_at) FROM stories s2 WHERE s2.story_id = s.story_id) AS original_created_at,
                   sr.reaction AS user_reaction,
                   (SELECT COALESCE(json_agg(jsonb_build_object(
                       'user_id', cu.user_id::text, 'username', cu.username, 'avatar', cu.avatar
                   ) ORDER BY cu.username), '[]'::json)
                    FROM users cu WHERE cu.user_id::text = ANY(s.collaborators)) AS collaborator_data,
                   (SELECT username FROM users WHERE user_id = s.author_id) AS author_username,
                   (SELECT status FROM collab_requests WHERE story_id = s.story_id AND requester_id = $2) AS collab_request_status
            FROM stories s
            LEFT JOIN story_reactions sr ON sr.story_id = s.story_id AND sr.user_id = $2
            WHERE s.author_id = $1
            ORDER BY s.story_id, s.version DESC
         ) sub
         ORDER BY sub.created_at DESC`,
        [userId, requesterId]
    );
    res.json(result.rows);
});

// POST /:id/collab-request — send a collaboration request to the story's author
router.post('/:id/collab-request', verifyJWT, async (req: AuthRequest, res) => {
    const requesterId = req.user!.user_id;
    const storyId = Number(req.params.id);

    const story = await pool.query(
        'SELECT author_id FROM stories WHERE story_id = $1 LIMIT 1', [storyId]
    );
    if (!story.rows[0]) { res.status(404).json({ error: 'Story not found' }); return; }

    const authorId = story.rows[0].author_id;
    if (authorId === requesterId) {
        res.status(400).json({ error: 'Cannot request to collaborate on your own story' });
        return;
    }

    await pool.query(
        `INSERT INTO collab_requests (story_id, requester_id, author_id)
         VALUES ($1, $2, $3)
         ON CONFLICT (story_id, requester_id) DO UPDATE SET status = 'pending', created_at = NOW()`,
        [storyId, requesterId, authorId]
    );
    res.json({ message: 'Collaboration request sent' });
});

// CREATE NEW STORY
router.post('/', verifyJWT, async (req: AuthRequest, res) => {
    const { header, story, collaboratorUsernames } = req.body;

    let collaboratorIds: string[] = [];
    if (Array.isArray(collaboratorUsernames) && collaboratorUsernames.length > 0) {
        const resolved = await pool.query(
            `SELECT user_id::text FROM users WHERE username = ANY($1::text[])`,
            [collaboratorUsernames]
        );
        collaboratorIds = resolved.rows.map((r: { user_id: string }) => r.user_id);
    }

    const story_id = (await pool.query('SELECT nextval($1)', ['story_id_seq'])).rows[0].nextval;
    const result = await pool.query(
        `INSERT INTO stories (story_id, version, header, story, author_id, collaborators, version_author_id)
         VALUES ($1, 1, $2, $3, $4, $5, $4) RETURNING *`,
        [story_id, header, story, req.user!.user_id, collaboratorIds]
    );
    res.json(result.rows[0]);
});

// LIKE — toggles like on/off; switching from dislike removes that dislike first
router.post('/:id/like', verifyJWT, async (req: AuthRequest, res) => {
    const storyId = Number(req.params.id);
    const userId = req.user!.user_id;

    const existing = await pool.query(
        'SELECT reaction FROM story_reactions WHERE user_id = $1 AND story_id = $2',
        [userId, storyId]
    );
    const prev: string | null = existing.rows[0]?.reaction ?? null;

    let likesDelta = 0, dislikesDelta = 0;
    let newReaction: string | null;

    if (prev === 'like') {
        likesDelta = -1;
        newReaction = null;
        await pool.query(
            'DELETE FROM story_reactions WHERE user_id = $1 AND story_id = $2',
            [userId, storyId]
        );
    } else {
        likesDelta = 1;
        if (prev === 'dislike') dislikesDelta = -1;
        newReaction = 'like';
        await pool.query(
            `INSERT INTO story_reactions (user_id, story_id, reaction) VALUES ($1, $2, 'like')
             ON CONFLICT (user_id, story_id) DO UPDATE SET reaction = 'like'`,
            [userId, storyId]
        );
    }

    const result = await pool.query(
        `UPDATE stories
         SET likes    = GREATEST(0, likes + $2),
             dislikes = GREATEST(0, dislikes + $3)
         WHERE story_id = $1
           AND version = (SELECT MAX(version) FROM stories WHERE story_id = $1)
         RETURNING *`,
        [storyId, likesDelta, dislikesDelta]
    );
    if (!result.rows[0]) { res.status(404).json({ error: 'Story not found' }); return; }
    res.json({ ...result.rows[0], user_reaction: newReaction });
});

// DISLIKE — toggles dislike on/off; switching from like removes that like first
router.post('/:id/dislike', verifyJWT, async (req: AuthRequest, res) => {
    const storyId = Number(req.params.id);
    const userId = req.user!.user_id;

    const existing = await pool.query(
        'SELECT reaction FROM story_reactions WHERE user_id = $1 AND story_id = $2',
        [userId, storyId]
    );
    const prev: string | null = existing.rows[0]?.reaction ?? null;

    let likesDelta = 0, dislikesDelta = 0;
    let newReaction: string | null;

    if (prev === 'dislike') {
        dislikesDelta = -1;
        newReaction = null;
        await pool.query(
            'DELETE FROM story_reactions WHERE user_id = $1 AND story_id = $2',
            [userId, storyId]
        );
    } else {
        dislikesDelta = 1;
        if (prev === 'like') likesDelta = -1;
        newReaction = 'dislike';
        await pool.query(
            `INSERT INTO story_reactions (user_id, story_id, reaction) VALUES ($1, $2, 'dislike')
             ON CONFLICT (user_id, story_id) DO UPDATE SET reaction = 'dislike'`,
            [userId, storyId]
        );
    }

    const result = await pool.query(
        `UPDATE stories
         SET likes    = GREATEST(0, likes + $2),
             dislikes = GREATEST(0, dislikes + $3)
         WHERE story_id = $1
           AND version = (SELECT MAX(version) FROM stories WHERE story_id = $1)
         RETURNING *`,
        [storyId, likesDelta, dislikesDelta]
    );
    if (!result.rows[0]) { res.status(404).json({ error: 'Story not found' }); return; }
    res.json({ ...result.rows[0], user_reaction: newReaction });
});

// REPORT — inserts a report record
router.post('/:id/report', verifyJWT, async (req: AuthRequest, res) => {
    const { id } = req.params;
    const { reason } = req.body;
    await pool.query(
        'INSERT INTO reports (story_id, reporter_id, reason) VALUES ($1, $2, $3)',
        [id, req.user!.user_id, reason]
    );
    res.json({ message: 'Report submitted' });
});

// EDIT — inserts a new version (author or listed collaborator only)
router.put('/:story_id', verifyJWT, async (req: AuthRequest, res) => {
    const { story_id } = req.params;
    const requesterId = req.user!.user_id;

    const perm = await pool.query(
        `SELECT author_id, collaborators, MAX(version) AS v
         FROM stories WHERE story_id = $1
         GROUP BY author_id, collaborators`,
        [story_id]
    );
    if (!perm.rows[0]) { res.status(404).json({ error: 'Story not found' }); return; }

    const { author_id, collaborators, v } = perm.rows[0];
    const isAuthor = author_id === requesterId;
    const isCollab = (collaborators as string[]).includes(String(requesterId));
    if (!isAuthor && !isCollab) {
        res.status(403).json({ error: 'Not authorized to edit this story' });
        return;
    }

    const newVersion = v + 1;
    const result = await pool.query(
        `INSERT INTO stories (story_id, version, header, story, author_id, collaborators, version_author_id)
         SELECT story_id, $1, $2, $3, author_id, collaborators, $6
         FROM stories WHERE story_id = $4 AND version = $5 RETURNING *`,
        [newVersion, req.body.header, req.body.story, story_id, v, requesterId]
    );
    res.json(result.rows[0]);
});

// DELETE LATEST VERSION — story author can always delete; collaborator only if they authored it
router.delete('/:story_id/latest', verifyJWT, async (req: AuthRequest, res) => {
    const { story_id } = req.params;
    const userId = req.user!.user_id;

    const latestRow = await pool.query(
        `SELECT version, author_id, version_author_id
         FROM stories WHERE story_id = $1
         ORDER BY version DESC LIMIT 1`,
        [story_id]
    );
    if (!latestRow.rows[0]) { res.status(404).json({ error: 'Story not found' }); return; }

    const { version, author_id, version_author_id } = latestRow.rows[0];
    if (author_id !== userId && version_author_id !== userId) {
        res.status(403).json({ error: 'Not authorized to delete this version' });
        return;
    }

    await pool.query('DELETE FROM stories WHERE story_id=$1 AND version=$2', [story_id, version]);
    const previous = await pool.query(
        'SELECT * FROM stories WHERE story_id=$1 ORDER BY version DESC LIMIT 1', [story_id]
    );
    res.json(previous.rows[0] ?? { message: 'Story fully deleted' });
});

// DELETE STORY COMPLETELY
router.delete('/:story_id', verifyJWT, async (req: AuthRequest, res) => {
    const { story_id } = req.params;
    const check = await pool.query('SELECT 1 FROM stories WHERE story_id=$1 LIMIT 1', [story_id]);
    if (!check.rows[0]) { res.status(404).json({ error: 'Story not found' }); return; }

    await pool.query('DELETE FROM stories WHERE story_id=$1', [story_id]);
    res.json({ message: 'Story deleted completely' });
});

export default router;
