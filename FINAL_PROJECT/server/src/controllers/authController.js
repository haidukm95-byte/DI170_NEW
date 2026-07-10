import crypto from 'crypto';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import * as AuthModel from '../models/authModel.js';

const ACCESS_EXPIRES = '15m';
const ACCESS_TTL_MS = 15 * 60 * 1000;
const REFRESH_EXPIRES = '7d';
const REFRESH_TTL_MS = 7 * 24 * 60 * 60 * 1000;

function accessSecret() { return process.env.JWT_SECRET; }
function refreshSecret() { return process.env.REFRESH_SECRET ?? process.env.JWT_SECRET; }

function signAccessToken(user) {
    return jwt.sign(
        {
            type: 'access',
            sub: user.personnel_id,
            occupation_code: user.occupation_code,
            auth_receive: user.auth_receive,
            auth_edit_personnel: user.auth_edit_personnel,
            auth_edit_goods_registry: user.auth_edit_goods_registry,
        },
        accessSecret(),
        { expiresIn: ACCESS_EXPIRES }
    );
}

function signRefreshToken(user, tokenId) {
    return jwt.sign({ type: 'refresh', sub: user.personnel_id, jti: tokenId }, refreshSecret(), { expiresIn: REFRESH_EXPIRES });
}

function sanitizeUser(user) {
    const { password, ...safeUser } = user;
    return safeUser;
}

const REFRESH_COOKIE_OPTIONS = {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'strict',
    maxAge: REFRESH_TTL_MS,
};

const ACCESS_COOKIE_OPTIONS = {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'strict',
    maxAge: ACCESS_TTL_MS,
};

export async function login(req, res) {
    const { gov_id, password } = req.body;
    if (!gov_id || !password) {
        return res.status(400).json({ error: 'gov_id and password are required' });
    }

    let user;
    try {
        user = await AuthModel.findByGovId(gov_id);
    } catch {
        return res.status(401).json({ error: 'Invalid credentials' });
    }
    if (!user || !user.isactive) {
        return res.status(401).json({ error: 'Invalid credentials' });
    }

    const validPassword = await bcrypt.compare(password, user.password);
    if (!validPassword) {
        return res.status(401).json({ error: 'Invalid credentials' });
    }

    const accessToken = signAccessToken(user);
    const tokenId = crypto.randomUUID();
    const refreshToken = signRefreshToken(user, tokenId);
    await AuthModel.createRefreshToken(tokenId, user.personnel_id, new Date(Date.now() + REFRESH_TTL_MS));

    res.cookie('refreshToken', refreshToken, REFRESH_COOKIE_OPTIONS);
    res.cookie('accessToken', accessToken, ACCESS_COOKIE_OPTIONS);
    return res.status(200).json({ accessToken, user: sanitizeUser(user) });
}

export async function refresh(req, res) {
    const token = req.cookies?.refreshToken;
    if (!token) {
        return res.status(401).json({ error: 'Missing refresh token' });
    }

    let payload;
    try {
        payload = jwt.verify(token, refreshSecret());
    } catch {
        return res.status(401).json({ error: 'Invalid or expired refresh token' });
    }
    if (payload.type !== 'refresh') {
        return res.status(401).json({ error: 'Invalid refresh token' });
    }

    const session = await AuthModel.findRefreshToken(payload.jti);
    if (!session || session.revoked || session.personnel_id !== payload.sub) {
        return res.status(401).json({ error: 'Invalid refresh token' });
    }

    const idleMs = Date.now() - new Date(session.created_at).getTime();
    if (idleMs > ACCESS_TTL_MS) {
        await AuthModel.revokeRefreshToken(payload.jti);
        return res.status(401).json({ error: 'Session expired due to inactivity' });
    }

    const user = await AuthModel.findByEmpId(payload.sub);
    if (!user || !user.isactive) {
        return res.status(401).json({ error: 'Invalid refresh token' });
    }

    await AuthModel.revokeRefreshToken(payload.jti);

    const accessToken = signAccessToken(user);
    const tokenId = crypto.randomUUID();
    const newRefreshToken = signRefreshToken(user, tokenId);
    await AuthModel.createRefreshToken(tokenId, user.personnel_id, new Date(Date.now() + REFRESH_TTL_MS));

    res.cookie('refreshToken', newRefreshToken, REFRESH_COOKIE_OPTIONS);
    res.cookie('accessToken', accessToken, ACCESS_COOKIE_OPTIONS);
    return res.status(200).json({ accessToken });
}

export async function logout(req, res) {
    const token = req.cookies?.refreshToken;
    if (token) {
        try {
            const payload = jwt.verify(token, refreshSecret());
            if (payload.type === 'refresh') {
                await AuthModel.revokeRefreshToken(payload.jti);
            }
        } catch {
            // Token already invalid/expired - nothing to revoke.
        }
    }

    res.clearCookie('refreshToken', REFRESH_COOKIE_OPTIONS);
    res.clearCookie('accessToken', ACCESS_COOKIE_OPTIONS);
    return res.status(204).send();
}

export async function me(req, res) {
    const authHeader = req.headers.authorization;
    const headerToken = authHeader?.startsWith('Bearer ') ? authHeader.slice(7) : null;
    const token = headerToken ?? req.cookies?.accessToken ?? null;
    if (!token) {
        return res.status(401).json({ error: 'Missing access token' });
    }

    let payload;
    try {
        payload = jwt.verify(token, accessSecret());
    } catch {
        return res.status(401).json({ error: 'Invalid or expired access token' });
    }
    if (payload.type !== 'access') {
        return res.status(401).json({ error: 'Invalid or expired access token' });
    }

    const user = await AuthModel.findByEmpId(payload.sub);
    if (!user || !user.isactive) {
        return res.status(404).json({ error: 'User not found' });
    }

    return res.status(200).json({ user: sanitizeUser(user) });
}