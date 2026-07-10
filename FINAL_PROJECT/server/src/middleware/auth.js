import jwt from 'jsonwebtoken';

function accessSecret() { return process.env.JWT_SECRET; }

export function requireAuth(req, res, next) {
    const authHeader = req.headers.authorization;
    const headerToken = authHeader?.startsWith('Bearer ') ? authHeader.slice(7) : null;
    const token = headerToken ?? req.cookies?.accessToken ?? null;
    if (!token) {
        return res.status(401).json({ error: 'Missing access token' });
    }

    try {
        const payload = jwt.verify(token, accessSecret());
        if (payload.type !== 'access') {
            return res.status(401).json({ error: 'Invalid or expired access token' });
        }
        req.user = payload;
        return next();
    } catch {
        return res.status(401).json({ error: 'Invalid or expired access token' });
    }
}

export function requirePermission(flag) {
    return function (req, res, next) {
        if (!req.user?.[flag]) {
            return res.status(403).json({ error: 'Insufficient permissions' });
        }
        return next();
    };
}
