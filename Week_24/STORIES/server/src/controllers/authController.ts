import { Request, Response } from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import * as AuthModel from '../models/authModel.js';
import type { AuthRequest } from '../middleware/verifyJWT.js';

function accessSecret() { return process.env.JWT_SECRET!; }
function refreshSecret() { return process.env.REFRESH_SECRET ?? process.env.JWT_SECRET!; }

function signAccess(user_id: number, email: string) {
    return jwt.sign({ user_id, email }, accessSecret(), { expiresIn: '15m' });
}

function signRefresh(user_id: number) {
    return jwt.sign({ user_id }, refreshSecret(), { expiresIn: '7d' });
}

function setRefreshCookie(res: Response, token: string) {
    res.cookie('refreshToken', token, {
        httpOnly: true,
        sameSite: 'strict',
        secure: process.env.NODE_ENV === 'production',
        maxAge: 7 * 24 * 60 * 60 * 1000,
    });
}

export async function register(req: Request, res: Response) {
    const { username, email, password } = req.body;
    const hashed = await bcrypt.hash(password, 12);
    const user = await AuthModel.createUser(username, email, hashed);
    const accessToken = signAccess(user.user_id, user.email);
    setRefreshCookie(res, signRefresh(user.user_id));
    res.json({ user: { user_id: user.user_id, username: user.username, is_admin: false }, accessToken });
}

export async function login(req: Request, res: Response) {
    const { identifier, password } = req.body;
    const user = await AuthModel.findByIdentifier(identifier);
    if (!user || !(await bcrypt.compare(password, user.password)))
        return res.status(401).json({ error: 'Invalid credentials' });

    const accessToken = signAccess(user.user_id, user.email);
    setRefreshCookie(res, signRefresh(user.user_id));
    res.json({
        user: { user_id: user.user_id, username: user.username, avatar: user.avatar, is_admin: user.is_admin ?? false },
        accessToken,
    });
}

export async function refresh(req: Request, res: Response) {
    const token = req.cookies?.refreshToken;
    if (!token) return res.status(401).json({ error: 'No refresh token' });
    try {
        const payload = jwt.verify(token, refreshSecret()) as { user_id: number };
        const user = await AuthModel.findById(payload.user_id);
        if (!user) return res.status(401).json({ error: 'User not found' });

        const accessToken = signAccess(user.user_id, user.email ?? '');
        setRefreshCookie(res, signRefresh(user.user_id)); // rotate
        res.json({ user: { ...user, is_admin: user.is_admin ?? false }, accessToken });
    } catch {
        res.clearCookie('refreshToken');
        res.status(403).json({ error: 'Invalid or expired refresh token' });
    }
}

export async function logout(_req: Request, res: Response) {
    res.clearCookie('refreshToken');
    res.json({ message: 'Logged out' });
}

export async function checkAvailability(req: Request, res: Response) {
    const { field, value } = req.query;
    if (!['username', 'email'].includes(field as string)) return res.status(400).end();
    const taken = await AuthModel.isFieldTaken(field as string, value as string);
    res.json({ available: !taken });
}

export async function verify(req: AuthRequest, res: Response) {
    const user = await AuthModel.findById(req.user!.user_id);
    if (!user) return res.status(404).json({ error: 'User not found' });
    res.json({ user: { ...user, is_admin: user.is_admin ?? false } });
}
