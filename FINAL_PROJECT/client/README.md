# Warehouse Inventory & Operations

A role-based warehouse management system: personnel, a goods registry, live
food/general inventory, and a full audit trail of every receiving, dispatch,
and disposal operation. Built as a React SPA on top of an Express/PostgreSQL
API secured with rotating JWTs.

## Domain

The system models a physical warehouse:

- **Goods registry** — the master catalog of items the warehouse handles
  (code, name, food/general classification, unit of measure). Items can never
  be deleted (legal/audit requirement) — only deactivated once their
  inventory quantity reaches zero.
- **Inventory** — live on-hand quantity per item, split into `foods_inventory`
  and `general_inventory`. Rows are derived state: they only change as a
  side effect of logistics operations, enforced by database triggers, never
  edited directly.
- **Logistics operations** — every movement of goods is logged as an
  operation with a code, e.g. `10` *received from supplier*, `20`
  *departed*, `32`–`36` *utilized/lost by expiry, damage, hazard, theft,
  other*, plus the `11–14` / `21–24` refusal/return variants. Each operation
  can carry a free-text `report` (e.g. explaining a hazard or theft) and is
  attributed to the `personnel_id` that performed it.
- **Personnel** — employees, each with one occupation and a `gov_id` used as
  their login identifier.

All of this is enforced at two layers: the API validates and authorizes the
request, and PostgreSQL triggers independently re-derive inventory,
auto-fill denormalized fields (item name, operation name, etc.), and reject
operations that violate warehouse invariants (negative quantity, departure
exceeding stock, an unauthorized employee receiving goods) — so the
database stays correct even if a bug slipped past the API layer.

## Roles & the RBAC model

There are three occupations, each mapped to a fixed set of permission flags
in `occupation_codes`:

| Occupation        | `auth_receive` | `auth_edit_personnel` | `auth_edit_goods_registry` |
|--------------------|:--:|:--:|:--:|
| **Manager**         | ✅ | ✅ | ✅ |
| **Receiver**        | ✅ | ❌ | ❌ |
| **General worker**  | ❌ | ❌ | ❌ |

- `auth_receive` — may log receiving operations (codes `10`–`14`).
- `auth_edit_personnel` — may view/add/edit employees, change occupation,
  dismiss/reinstate.
- `auth_edit_goods_registry` — may add/edit items in the goods registry.

Every employee row in `personnel` carries a copy of these three booleans.
They aren't set by hand: a trigger (`fill_personnel_auth`) re-derives them
from `occupation_codes` on every insert or occupation change, so a manager
can never accidentally grant a permission that doesn't belong to the
assigned occupation. A second trigger independently blocks any `receive`
operation (codes `10`–`14`) whose responsible employee has
`auth_receive = false`, and a third specifically blocks occupation `3`
(general worker) from receiving — belt-and-suspenders enforcement that
holds even if the API were bypassed entirely.

Permissions are enforced three times, deliberately redundant:

1. **Client** — `ProtectedRoute` hides routes/links the signed-in user's role
   can't use. UX only.
2. **API** — `requirePermission(flag)` middleware rejects the request before
   a controller runs.
3. **Database** — triggers reject the write regardless of how it got there.

Only #2 and #3 are real security boundaries; #1 exists purely so users don't
see controls they can't use.

## Auth architecture

Authentication is a stateful-refresh / stateless-access JWT pair, delivered
as `httpOnly` cookies so the SPA never touches a raw token.

```
┌────────────┐   POST /auth/login (gov_id, password)   ┌─────────────┐
│   Client   │ ───────────────────────────────────────▶│    Server   │
│            │                                          │             │
│            │◀── Set-Cookie: accessToken (15m)         │  bcrypt.    │
│            │◀── Set-Cookie: refreshToken (7d)          │  compare()  │
└────────────┘                                          └─────────────┘
```

**Access token** — short-lived (15 min), signed with `JWT_SECRET`, carries
`{ type: 'access', sub, occupation_code, auth_receive, auth_edit_personnel,
auth_edit_goods_registry }`. `requireAuth` reads it from the
`Authorization: Bearer` header or the `accessToken` cookie, verifies it, and
rejects (401) unless `payload.type === 'access'` — a token of the wrong
type (e.g. a refresh token replayed against a protected route) is refused
even if the signature is valid.

**Refresh token** — long-lived (7 days), signed with `REFRESH_SECRET`
(falling back to `JWT_SECRET`), carries `{ type: 'refresh', sub, jti }`.
Unlike the access token, it's also **stateful**: every issued refresh token
has a matching row in `refresh_tokens` keyed by `jti`. `POST /auth/refresh`
checks all of the following before minting a new pair, rejecting with 401
if any fail:

- the JWT itself is valid, unexpired, and `type === 'refresh'`
- a matching session row exists and isn't `revoked`
- the session's `personnel_id` matches the token's `sub` (defense against a
  forged `jti` reused across accounts)
- the session hasn't sat idle longer than an access token's lifetime (15
  min) — an app-level inactivity cutoff independent of the refresh token's
  own 7-day expiry
- the employee the token belongs to still exists and is active

**Rotation**: every successful refresh revokes the old session row and
issues a brand-new `jti`/refresh token — refresh tokens are single-use.
Logout revokes the current session outright. This means a stolen refresh
token has a narrow, self-closing window: it can be used once, and reuse
after rotation (or after 15 minutes of inactivity) is a hard rejection, not
just a re-issue.

On the client, `AuthContext` treats all of this as invisible plumbing:

- On mount, it calls `GET /auth/me` to establish session state from
  whatever cookies already exist.
- An axios response interceptor catches any `401`, attempts exactly one
  silent `POST /auth/refresh`, and replays the original request — the app
  never manually manages token expiry.
- While the tab is open and the user has been active in the last 12
  minutes, a background timer proactively refreshes every 10 minutes so an
  engaged user is never interrupted by an expired access token; a genuinely
  idle tab lets the session expire naturally instead of renewing forever.
- If a refresh ever fails, the interceptor calls back into `AuthContext` to
  clear state and redirect to `/login`.

## Getting started

### Prerequisites

- Node.js 24+ (the server test suite uses `node --experimental-test-module-mocks`)
- A PostgreSQL database

### Setup

```bash
# Server
cd FINAL_PROJECT/server
npm install
cp .env.example .env   # fill in the values below
npm run db:migrate     # applies Create_tables.sql (idempotent, safe to re-run)
npm run dev             # http://localhost:5000

# Client, in a second terminal
cd FINAL_PROJECT/client
npm install
cp .env.example .env.local
npm run dev             # http://localhost:5173
```

There's no seed script — create the first Manager account directly in
`personnel` (password must be a bcrypt hash) so you have a way to log in and
add the rest of the team through the UI.

### Environment variables

**`server/.env`**

| Variable | Required | Description |
|---|---|---|
| `DATABASE_URL` | ✅ | PostgreSQL connection string. |
| `JWT_SECRET` | ✅ | Signs/verifies access tokens; also the fallback refresh secret. |
| `REFRESH_SECRET` | Optional | Separate secret for refresh tokens. Falls back to `JWT_SECRET` if unset — set it explicitly in production so a leaked access secret can't be used to forge refresh tokens. |
| `CLIENT_ORIGIN` | ✅ | Origin allowed by CORS (must match the client's URL exactly for cookies to be sent). |
| `PORT` | Optional | Defaults to `5000`. |
| `NODE_ENV` | Optional | Set to `production` to switch cookies to `secure: true; sameSite: 'none'` for a cross-subdomain client/server deployment. |

**`client/.env.local`**

| Variable | Required | Description |
|---|---|---|
| `VITE_API_URL` | Optional | Base URL of the API. Defaults to `http://localhost:5000/api`. |

## Tech stack

- **Client**: React 19, React Router 7, Axios, Vite
- **Server**: Express 5, `jsonwebtoken`, `bcryptjs`, `cookie-parser`, `pg`
- **Database**: PostgreSQL, with trigger-enforced business rules

## Testing

```bash
cd FINAL_PROJECT/server
npm test
```

Runs the auth and permission suite on Node's built-in test runner (no test
framework dependency) — `src/middleware/auth.test.js` and
`src/controllers/authController.test.js`. Coverage focuses on the highest-risk
logic: rejecting tokens of the wrong type, revoked/expired/idle refresh
sessions, and `requirePermission` allowing or denying by flag. The
`authController` tests use Node's experimental `mock.module` to stand in for
the database layer, so they run without a live PostgreSQL instance.
