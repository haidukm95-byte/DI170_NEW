import { Response } from 'express';
import { AuthRequest } from '../middleware/verifyJWT.js';
import * as ContributorModel from '../models/contributorModel.js';

// GET /contributors/:story_id
export async function getContributors(req: AuthRequest, res: Response) {
    const storyId = Number(req.params.story_id);
    if (!(await ContributorModel.storyExists(storyId)))
        return res.status(404).json({ error: 'Story not found' });
    res.json(await ContributorModel.getContributors(storyId));
}

// POST /contributors  — body: { story_id, user_id }
export async function addContributor(req: AuthRequest, res: Response) {
    const { story_id, user_id } = req.body;
    if (!story_id || !user_id)
        return res.status(400).json({ error: 'story_id and user_id are required' });

    const authorId = await ContributorModel.getStoryAuthorId(Number(story_id));
    if (!authorId) return res.status(404).json({ error: 'Story not found' });
    if (authorId !== req.user!.user_id)
        return res.status(403).json({ error: 'Only the story author can add contributors' });

    const contributors = await ContributorModel.addContributor(Number(story_id), Number(user_id));
    res.status(201).json(contributors);
}

// DELETE /contributors/:id?story_id=123  — :id is the contributor's user_id
export async function removeContributor(req: AuthRequest, res: Response) {
    const userId = Number(req.params.id);
    const storyId = Number(req.query.story_id);
    if (!storyId) return res.status(400).json({ error: 'story_id query param is required' });

    const authorId = await ContributorModel.getStoryAuthorId(storyId);
    if (!authorId) return res.status(404).json({ error: 'Story not found' });
    if (authorId !== req.user!.user_id)
        return res.status(403).json({ error: 'Only the story author can remove contributors' });

    await ContributorModel.removeContributor(storyId, userId);
    res.json({ message: 'Contributor removed' });
}
