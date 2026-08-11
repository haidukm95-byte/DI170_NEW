import { test } from 'node:test';
import assert from 'node:assert/strict';
import jwt from 'jsonwebtoken';

process.env.JWT_SECRET = 'test-access-secret';
process.env.REFRESH_SECRET = 'test-refresh-secret';

// Mirrors ACCESS_TTL_MS in authController.js — the refresh endpoint revokes
// a session and rejects it once it has sat idle longer than an access
// token's lifetime, regardless of the refresh JWT's own (much longer) exp.
const ACCESS_TTL_MS = 15 * 60 * 1000;

function signRefreshToken(payload, secret = process.env.REFRESH_SECRET) {
    return jwt.sign(payload, secret);
}

function createRes() {
    return {
        statusCode: null,
        body: null,
        cookieCalls: [],
        status(code) {
            this.statusCode = code;
            return this;
        },
        json(payload) {
            this.body = payload;
            return this;
        },
        cookie(name, value, options) {
            this.cookieCalls.push({ name, value, options });
            return this;
        },
    };
}

// Each test imports authController.js under a cache-busting query string so
// it re-links against whichever authModel.js mock that test just installed —
// otherwise the first test to import the controller would pin every later
// test to its mock.
let caseId = 0;

async function withMockedAuthController(t, authModelMocks, run) {
    t.mock.module('../models/authModel.js', {
        namedExports: {
            findByGovId: async () => null,
            findByEmpId: async () => null,
            createRefreshToken: async () => {},
            findRefreshToken: async () => null,
            revokeRefreshToken: async () => {},
            ...authModelMocks,
        },
    });
    caseId += 1;
    const { refresh } = await import(`../controllers/authController.js?case=${caseId}`);
    return run(refresh);
}

test('refresh rejects when there is no refresh token cookie', async (t) => {
    await withMockedAuthController(t, {}, async (refresh) => {
        const req = { cookies: {} };
        const res = createRes();

        await refresh(req, res);

        assert.equal(res.statusCode, 401);
        assert.equal(res.body.error, 'Missing refresh token');
    });
});

test('refresh rejects a malformed refresh token', async (t) => {
    await withMockedAuthController(t, {}, async (refresh) => {
        const req = { cookies: { refreshToken: 'not-a-jwt' } };
        const res = createRes();

        await refresh(req, res);

        assert.equal(res.statusCode, 401);
        assert.equal(res.body.error, 'Invalid or expired refresh token');
    });
});

test('refresh rejects a genuinely JWT-expired refresh token', async (t) => {
    await withMockedAuthController(t, {}, async (refresh) => {
        const token = jwt.sign({ type: 'refresh', sub: 1, jti: 'x' }, process.env.REFRESH_SECRET, { expiresIn: -1 });
        const req = { cookies: { refreshToken: token } };
        const res = createRes();

        await refresh(req, res);

        assert.equal(res.statusCode, 401);
        assert.equal(res.body.error, 'Invalid or expired refresh token');
    });
});

test('refresh rejects an access-type token presented at the refresh endpoint', async (t) => {
    await withMockedAuthController(t, {}, async (refresh) => {
        const token = signRefreshToken({ type: 'access', sub: 1, jti: 'x' });
        const req = { cookies: { refreshToken: token } };
        const res = createRes();

        await refresh(req, res);

        assert.equal(res.statusCode, 401);
        assert.equal(res.body.error, 'Invalid refresh token');
    });
});

test('refresh rejects when the session is not found in the database', async (t) => {
    await withMockedAuthController(t, { findRefreshToken: async () => null }, async (refresh) => {
        const token = signRefreshToken({ type: 'refresh', sub: 1, jti: 'missing-session' });
        const req = { cookies: { refreshToken: token } };
        const res = createRes();

        await refresh(req, res);

        assert.equal(res.statusCode, 401);
        assert.equal(res.body.error, 'Invalid refresh token');
    });
});

test('refresh rejects a revoked session', async (t) => {
    const session = { token_id: 'revoked-id', personnel_id: 1, revoked: true, created_at: new Date() };
    await withMockedAuthController(t, { findRefreshToken: async () => session }, async (refresh) => {
        const token = signRefreshToken({ type: 'refresh', sub: 1, jti: 'revoked-id' });
        const req = { cookies: { refreshToken: token } };
        const res = createRes();

        await refresh(req, res);

        assert.equal(res.statusCode, 401);
        assert.equal(res.body.error, 'Invalid refresh token');
    });
});

test('refresh rejects when the session belongs to a different user than the token subject', async (t) => {
    const session = { token_id: 'mismatched-id', personnel_id: 999, revoked: false, created_at: new Date() };
    await withMockedAuthController(t, { findRefreshToken: async () => session }, async (refresh) => {
        const token = signRefreshToken({ type: 'refresh', sub: 1, jti: 'mismatched-id' });
        const req = { cookies: { refreshToken: token } };
        const res = createRes();

        await refresh(req, res);

        assert.equal(res.statusCode, 401);
        assert.equal(res.body.error, 'Invalid refresh token');
    });
});

test('refresh revokes and rejects a session idle past the inactivity window', async (t) => {
    const staleCreatedAt = new Date(Date.now() - (ACCESS_TTL_MS + 60 * 1000));
    const session = { token_id: 'idle-id', personnel_id: 1, revoked: false, created_at: staleCreatedAt };
    const revokeCalls = [];
    await withMockedAuthController(
        t,
        {
            findRefreshToken: async () => session,
            revokeRefreshToken: async (tokenId) => { revokeCalls.push(tokenId); },
        },
        async (refresh) => {
            const token = signRefreshToken({ type: 'refresh', sub: 1, jti: 'idle-id' });
            const req = { cookies: { refreshToken: token } };
            const res = createRes();

            await refresh(req, res);

            assert.equal(res.statusCode, 401);
            assert.equal(res.body.error, 'Session expired due to inactivity');
            assert.deepEqual(revokeCalls, ['idle-id']);
        }
    );
});

test('refresh rejects when the referenced user no longer exists or is inactive', async (t) => {
    const session = { token_id: 'orphan-id', personnel_id: 1, revoked: false, created_at: new Date() };
    await withMockedAuthController(
        t,
        {
            findRefreshToken: async () => session,
            findByEmpId: async () => ({ personnel_id: 1, isactive: false }),
        },
        async (refresh) => {
            const token = signRefreshToken({ type: 'refresh', sub: 1, jti: 'orphan-id' });
            const req = { cookies: { refreshToken: token } };
            const res = createRes();

            await refresh(req, res);

            assert.equal(res.statusCode, 401);
            assert.equal(res.body.error, 'Invalid refresh token');
        }
    );
});

test('refresh rotates the session and issues new tokens on a valid refresh', async (t) => {
    const session = { token_id: 'good-id', personnel_id: 1, revoked: false, created_at: new Date() };
    const user = {
        personnel_id: 1,
        isactive: true,
        occupation_code: 2,
        auth_receive: true,
        auth_edit_personnel: false,
        auth_edit_goods_registry: false,
    };
    const revokeCalls = [];
    const createCalls = [];
    await withMockedAuthController(
        t,
        {
            findRefreshToken: async () => session,
            findByEmpId: async () => user,
            revokeRefreshToken: async (tokenId) => { revokeCalls.push(tokenId); },
            createRefreshToken: async (tokenId, personnelId) => { createCalls.push({ tokenId, personnelId }); },
        },
        async (refresh) => {
            const token = signRefreshToken({ type: 'refresh', sub: 1, jti: 'good-id' });
            const req = { cookies: { refreshToken: token } };
            const res = createRes();

            await refresh(req, res);

            assert.equal(res.statusCode, 200);
            assert.equal(typeof res.body.accessToken, 'string');
            assert.deepEqual(revokeCalls, ['good-id']);
            assert.equal(createCalls.length, 1);
            assert.equal(createCalls[0].personnelId, 1);

            const cookieNames = res.cookieCalls.map((c) => c.name).sort();
            assert.deepEqual(cookieNames, ['accessToken', 'refreshToken']);
        }
    );
});
