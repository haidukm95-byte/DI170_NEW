import { Response, NextFunction } from 'express';
import { AuthRequest } from '../middleware/verifyJWT.js';
import * as AdminModel from '../models/adminModel.js';

export async function requireAdmin(req: AuthRequest, res: Response, next: NextFunction) {
    if (!(await AdminModel.isAdmin(req.user!.user_id)))
        return res.status(403).json({ error: 'Admin only' });
    next();
}

export async function getReports(_req: AuthRequest, res: Response) {
    res.json(await AdminModel.getAllReports());
}

export async function deleteReportedVersion(req: AuthRequest, res: Response) {
    const report = await AdminModel.getReportById(Number(req.params.id));
    if (!report) return res.status(404).json({ error: 'Report not found' });
    await AdminModel.deleteLatestStoryVersion(report.story_id);
    await AdminModel.markReportImplemented(Number(req.params.id));
    res.json({ message: 'Version deleted' });
}

export async function deleteReportedStory(req: AuthRequest, res: Response) {
    const report = await AdminModel.getReportById(Number(req.params.id));
    if (!report) return res.status(404).json({ error: 'Report not found' });
    await AdminModel.deleteStoryCompletely(report.story_id);
    await AdminModel.markAllReportsForStoryImplemented(report.story_id);
    res.json({ message: 'Story deleted', story_id: report.story_id });
}

export async function ignoreReport(_req: AuthRequest, res: Response) {
    res.json({ message: 'Report ignored' });
}
