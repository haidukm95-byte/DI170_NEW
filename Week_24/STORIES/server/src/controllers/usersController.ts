import { Response } from 'express';
import bcrypt from 'bcryptjs';
import { AuthRequest } from '../middleware/verifyJWT.js';
import * as UserModel from '../models/userModel.js';

export async function getMe(req: AuthRequest, res: Response) {
    const profile = await UserModel.getEnrichedProfile(req.user!.user_id);
    if (!profile) return res.status(404).json({ error: 'User not found' });
    res.json(profile);
}

export async function updateMe(req: AuthRequest, res: Response) {
    const updated = await UserModel.updateProfile(req.user!.user_id, req.body);
    if (!updated) return res.status(400).json({ error: 'Nothing to update' });
    res.json(updated);
}

export async function updatePassword(req: AuthRequest, res: Response) {
    const { currentPassword, newPassword } = req.body;
    const hash = await UserModel.getPasswordHash(req.user!.user_id);
    if (!hash || !(await bcrypt.compare(currentPassword, hash)))
        return res.status(401).json({ error: 'Current password is incorrect' });
    await UserModel.updatePassword(req.user!.user_id, await bcrypt.hash(newPassword, 12));
    res.json({ message: 'Password updated' });
}

export async function deactivateAccount(req: AuthRequest, res: Response) {
    if (Number(req.params.id) !== req.user!.user_id)
        return res.status(403).json({ error: 'Forbidden' });
    await UserModel.deactivate(req.user!.user_id);
    res.json({ message: 'Account deactivated' });
}

export async function searchUsers(req: AuthRequest, res: Response) {
    const q = String(req.query.q ?? '').trim();
    if (!q) return res.json([]);
    res.json(await UserModel.searchUsers(q, req.user!.user_id));
}

export async function getFriendRequests(req: AuthRequest, res: Response) {
    res.json(await UserModel.getFriendRequests(req.user!.user_id));
}

export async function acceptFriendRequest(req: AuthRequest, res: Response) {
    await UserModel.acceptFriendRequest(Number(req.params.senderId), req.user!.user_id);
    res.json({ message: 'Friend request accepted' });
}

export async function declineFriendRequest(req: AuthRequest, res: Response) {
    await UserModel.declineFriendRequest(Number(req.params.senderId), req.user!.user_id);
    res.json({ message: 'Friend request declined' });
}

export async function sendFriendRequest(req: AuthRequest, res: Response) {
    const receiverId = Number(req.params.id);
    if (req.user!.user_id === receiverId)
        return res.status(400).json({ error: 'Cannot send a friend request to yourself' });
    await UserModel.sendFriendRequest(req.user!.user_id, receiverId);
    res.json({ message: 'Friend request sent' });
}

export async function updateFriends(req: AuthRequest, res: Response) {
    const { action } = req.body;
    if (action !== 'add' && action !== 'remove')
        return res.status(400).json({ error: 'action must be "add" or "remove"' });
    if (action === 'remove') {
        await UserModel.removeFriendBidirectional(req.user!.user_id, req.params.id);
        return res.json({ message: 'Friend removed' });
    }
    const result = await UserModel.updateFriends(req.user!.user_id, req.params.id, action);
    res.json(result);
}

export async function getCollabRequests(req: AuthRequest, res: Response) {
    res.json(await UserModel.getCollabRequests(req.user!.user_id));
}

export async function acceptCollabRequest(req: AuthRequest, res: Response) {
    const ok = await UserModel.acceptCollabRequest(Number(req.params.id), req.user!.user_id);
    if (!ok) return res.status(404).json({ error: 'Request not found' });
    res.json({ message: 'Collaboration accepted' });
}

export async function declineCollabRequest(req: AuthRequest, res: Response) {
    await UserModel.declineCollabRequest(Number(req.params.id), req.user!.user_id);
    res.json({ message: 'Collaboration declined' });
}

export async function getUserProfile(req: AuthRequest, res: Response) {
    const profile = await UserModel.getProfileWithRelationship(
        Number(req.params.id), req.user!.user_id
    );
    if (!profile) return res.status(404).json({ error: 'User not found' });
    res.json(profile);
}

export async function getUserStories(req: AuthRequest, res: Response) {
    const privacy = await UserModel.getPrivacyInfo(Number(req.params.id));
    if (!privacy) return res.status(404).json({ error: 'User not found' });
    const isSelf = Number(req.params.id) === req.user!.user_id;
    const isFriend = (privacy.friends as string[]).includes(String(req.user!.user_id));
    if (privacy.is_private && !isSelf && !isFriend)
        return res.status(403).json({ error: 'This account is private' });
    res.json(await UserModel.getStoriesByUser(Number(req.params.id)));
}
