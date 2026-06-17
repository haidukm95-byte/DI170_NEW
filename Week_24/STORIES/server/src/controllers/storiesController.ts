import { Response } from 'express';
import { AuthRequest } from '../middleware/verifyJWT.js';
import * as StoryModel from '../models/storyModel.js';
import * as UserModel from '../models/userModel.js';

export async function getFeed(req: AuthRequest, res: Response) {
    const userId = req.user!.user_id;
    const { filter } = req.query;
    if (filter === 'mine') return res.json(await StoryModel.getFeedMine(userId));
    if (filter === 'social') return res.json(await StoryModel.getFeedSocial(userId));
    res.json(await StoryModel.getFeedAll(userId));
}

export async function getStoriesByUser(req: AuthRequest, res: Response) {
    const authorId = Number(req.params.userId);
    const requesterId = req.user!.user_id;
    const privacy = await UserModel.getPrivacyInfo(authorId);
    if (!privacy) return res.status(404).json({ error: 'User not found' });
    const isSelf = authorId === requesterId;
    const isFriend = (privacy.friends as string[]).includes(String(requesterId));
    if (privacy.is_private && !isSelf && !isFriend)
        return res.status(403).json({ error: 'This account is private' });
    res.json(await StoryModel.getStoriesByAuthor(authorId, requesterId));
}

export async function createStory(req: AuthRequest, res: Response) {
    const { header, story, collaboratorUsernames } = req.body;
    const ids = Array.isArray(collaboratorUsernames) && collaboratorUsernames.length
        ? await StoryModel.resolveCollaboratorIds(collaboratorUsernames)
        : [];
    res.json(await StoryModel.createStory(header, story, req.user!.user_id, ids));
}

export async function editStory(req: AuthRequest, res: Response) {
    const storyId = Number(req.params.story_id);
    const requesterId = req.user!.user_id;
    const perm = await StoryModel.getPermissions(storyId);
    if (!perm) return res.status(404).json({ error: 'Story not found' });
    if (perm.author_id !== requesterId && !(perm.collaborators as string[]).includes(String(requesterId)))
        return res.status(403).json({ error: 'Not authorized to edit this story' });
    res.json(await StoryModel.addVersion(storyId, perm.v + 1, req.body.header, req.body.story, requesterId, perm.v));
}

export async function deleteLatestVersion(req: AuthRequest, res: Response) {
    const storyId = Number(req.params.story_id);
    const userId = req.user!.user_id;
    const latest = await StoryModel.getLatestVersion(storyId);
    if (!latest) return res.status(404).json({ error: 'Story not found' });
    if (latest.author_id !== userId && latest.version_author_id !== userId)
        return res.status(403).json({ error: 'Not authorized to delete this version' });
    const prev = await StoryModel.deleteVersion(storyId, latest.version);
    res.json(prev ?? { message: 'Story fully deleted' });
}

export async function deleteStory(req: AuthRequest, res: Response) {
    const storyId = Number(req.params.story_id);
    if (!(await StoryModel.storyExists(storyId)))
        return res.status(404).json({ error: 'Story not found' });
    await StoryModel.deleteAllVersions(storyId);
    res.json({ message: 'Story deleted completely' });
}

export async function reactToStory(req: AuthRequest, res: Response, type: 'like' | 'dislike') {
    const storyId = Number(req.params.id);
    const userId = req.user!.user_id;
    const prev = await StoryModel.getReaction(userId, storyId);
    const opposite = type === 'like' ? 'dislike' : 'like';

    let likesDelta = 0, dislikesDelta = 0;
    let newReaction: string | null;

    if (prev === type) {
        type === 'like' ? likesDelta-- : dislikesDelta--;
        newReaction = null;
        await StoryModel.deleteReaction(userId, storyId);
    } else {
        type === 'like' ? likesDelta++ : dislikesDelta++;
        if (prev === opposite) opposite === 'like' ? likesDelta-- : dislikesDelta--;
        newReaction = type;
        await StoryModel.upsertReaction(userId, storyId, type);
    }

    const updated = await StoryModel.updateReactionCounts(storyId, likesDelta, dislikesDelta);
    if (!updated) return res.status(404).json({ error: 'Story not found' });
    res.json({ ...updated, user_reaction: newReaction });
}

export async function likeStory(req: AuthRequest, res: Response) {
    return reactToStory(req, res, 'like');
}

export async function dislikeStory(req: AuthRequest, res: Response) {
    return reactToStory(req, res, 'dislike');
}

export async function sendCollabRequest(req: AuthRequest, res: Response) {
    const storyId = Number(req.params.id);
    const requesterId = req.user!.user_id;
    const authorId = await StoryModel.getStoryAuthor(storyId);
    if (!authorId) return res.status(404).json({ error: 'Story not found' });
    if (authorId === requesterId)
        return res.status(400).json({ error: 'Cannot request to collaborate on your own story' });
    await StoryModel.insertCollabRequest(storyId, requesterId, authorId);
    res.json({ message: 'Collaboration request sent' });
}

export async function reportStory(req: AuthRequest, res: Response) {
    await StoryModel.insertReport(Number(req.params.id), req.user!.user_id, req.body.reason);
    res.json({ message: 'Report submitted' });
}
