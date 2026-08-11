import { test, mock } from 'node:test';
import assert from 'node:assert/strict';
import jwt from 'jsonwebtoken';

process.env.JWT_SECRET = 'test-access-secret';

const { requireAuth, requirePermission } = await import('./auth.js');

function createRes() {
    return {
        statusCode: null,
        body: null,
        status(code) {
            this.statusCode = code;
            return this;
        },
        json(payload) {
            this.body = payload;
            return this;
        },
    };
}

function signToken(payload, secret = process.env.JWT_SECRET) {
    return jwt.sign(payload, secret);
}

test('requireAuth rejects a request with no token at all', () => {
    const req = { headers: {}, cookies: {} };
    const res = createRes();
    const next = mock.fn();

    requireAuth(req, res, next);

    assert.equal(res.statusCode, 401);
    assert.equal(res.body.error, 'Missing access token');
    assert.equal(next.mock.callCount(), 0);
});

test('requireAuth rejects a refresh-type token presented as an access token', () => {
    const token = signToken({ type: 'refresh', sub: 1, jti: 'some-id' });
    const req = { headers: { authorization: `Bearer ${token}` }, cookies: {} };
    const res = createRes();
    const next = mock.fn();

    requireAuth(req, res, next);

    assert.equal(res.statusCode, 401);
    assert.equal(res.body.error, 'Invalid or expired access token');
    assert.equal(next.mock.callCount(), 0);
});

test('requireAuth rejects a token signed with the wrong secret', () => {
    const token = signToken({ type: 'access', sub: 1 }, 'wrong-secret');
    const req = { headers: { authorization: `Bearer ${token}` }, cookies: {} };
    const res = createRes();
    const next = mock.fn();

    requireAuth(req, res, next);

    assert.equal(res.statusCode, 401);
    assert.equal(next.mock.callCount(), 0);
});

test('requireAuth rejects a malformed token', () => {
    const req = { headers: { authorization: 'Bearer not-a-jwt' }, cookies: {} };
    const res = createRes();
    const next = mock.fn();

    requireAuth(req, res, next);

    assert.equal(res.statusCode, 401);
    assert.equal(next.mock.callCount(), 0);
});

test('requireAuth accepts a valid access token from the Authorization header and attaches req.user', () => {
    const token = signToken({ type: 'access', sub: 7, auth_receive: true });
    const req = { headers: { authorization: `Bearer ${token}` }, cookies: {} };
    const res = createRes();
    const next = mock.fn();

    requireAuth(req, res, next);

    assert.equal(next.mock.callCount(), 1);
    assert.equal(res.statusCode, null);
    assert.equal(req.user.sub, 7);
    assert.equal(req.user.auth_receive, true);
});

test('requireAuth falls back to the accessToken cookie when there is no Authorization header', () => {
    const token = signToken({ type: 'access', sub: 3 });
    const req = { headers: {}, cookies: { accessToken: token } };
    const res = createRes();
    const next = mock.fn();

    requireAuth(req, res, next);

    assert.equal(next.mock.callCount(), 1);
    assert.equal(req.user.sub, 3);
});

test('requirePermission calls next when the user has the required flag set', () => {
    const middleware = requirePermission('auth_receive');
    const req = { user: { auth_receive: true } };
    const res = createRes();
    const next = mock.fn();

    middleware(req, res, next);

    assert.equal(next.mock.callCount(), 1);
    assert.equal(res.statusCode, null);
});

test('requirePermission denies with 403 when the flag is false', () => {
    const middleware = requirePermission('auth_edit_personnel');
    const req = { user: { auth_edit_personnel: false } };
    const res = createRes();
    const next = mock.fn();

    middleware(req, res, next);

    assert.equal(res.statusCode, 403);
    assert.equal(res.body.error, 'Insufficient permissions');
    assert.equal(next.mock.callCount(), 0);
});

test('requirePermission denies with 403 when the flag is missing from req.user', () => {
    const middleware = requirePermission('auth_edit_goods_registry');
    const req = { user: {} };
    const res = createRes();
    const next = mock.fn();

    middleware(req, res, next);

    assert.equal(res.statusCode, 403);
    assert.equal(next.mock.callCount(), 0);
});
