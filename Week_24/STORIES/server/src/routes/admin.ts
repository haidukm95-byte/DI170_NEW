import express from 'express';
import type { Response, NextFunction } from 'express';
import { pool } from '../db/pool.js';
import { AuthRequest, verifyJWT } from '../middleware/verifyJWT.js';

const router = express.Router();

async function requireAdmin(req: AuthRequest, res: Response, next: NextFunction) {
    const r = await pool.query('SELECT is_admin FROM users WHERE user_id = $1', [req.user!.user_id]);
    if (!r.rows[0]?.is_admin) { res.status(403).json({ error: 'Admin only' }); return; }
    next();
}

// GET /admin/reports — all pending reports with story info
router.get('/reports', verifyJWT, requireAdmin, async (_req: AuthRequest, res) => {
    const result = await pool.query(
        `SELECT r.id, r.story_id, r.reporter_id, r.reason, r.created_at, r.is_implemented,
                u.username AS reporter_username,
                s.version, s.header
         FROM reports r
         LEFT JOIN (
             SELECT DISTINCT ON (story_id) story_id, version, header
             FROM stories
             ORDER BY story_id, version DESC
         ) s ON s.story_id = r.story_id
         LEFT JOIN users u ON u.user_id = r.reporter_id
         ORDER BY r.created_at DESC`
    );
    res.json(result.rows);
});

// DELETE /admin/reports/:id/version — delete latest version of the reported story
router.delete('/reports/:id/version', verifyJWT, requireAdmin, async (req: AuthRequest, res) => {
    const reportId = Number(req.params.id);
    const rep = await pool.query('SELECT story_id FROM reports WHERE id = $1', [reportId]);
    if (!rep.rows[0]) { res.status(404).json({ error: 'Report not found' }); return; }

    const { story_id } = rep.rows[0];
    const latest = await pool.query(
        'SELECT MAX(version) AS v FROM stories WHERE story_id = $1', [story_id]
    );
    if (latest.rows[0]?.v) {
        await pool.query(
            'DELETE FROM stories WHERE story_id = $1 AND version = $2',
            [story_id, latest.rows[0].v]
        );
    }
    await pool.query('UPDATE reports SET is_implemented = true WHERE id = $1', [reportId]);
    res.json({ message: 'Version deleted' });
});

// DELETE /admin/reports/:id/story — delete the story completely (all versions + all its reports)
router.delete('/reports/:id/story', verifyJWT, requireAdmin, async (req: AuthRequest, res) => {
    const reportId = Number(req.params.id);
    const rep = await pool.query('SELECT story_id FROM reports WHERE id = $1', [reportId]);
    if (!rep.rows[0]) { res.status(404).json({ error: 'Report not found' }); return; }

    const { story_id } = rep.rows[0];
    await pool.query('DELETE FROM stories WHERE story_id = $1', [story_id]);
    await pool.query('UPDATE reports SET is_implemented = true WHERE story_id = $1', [story_id]);
    res.json({ message: 'Story deleted', story_id });
});

// DELETE /admin/reports/:id/ignore — dismiss from UI only, leave report and story untouched in DB
router.delete('/reports/:id/ignore', verifyJWT, requireAdmin, async (_req: AuthRequest, res) => {
    res.json({ message: 'Report ignored' });
});

export default router;
