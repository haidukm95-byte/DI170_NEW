# Deploying FINAL_PROJECT to Render.com

Two services, deployed separately from the same GitHub repo:

- **server** → Render **Web Service** (Node/Express API)
- **client** → Render **Static Site** (Vite/React build)

Database: already on **Neon Postgres** (external) — no Render database needed, just reuse the existing `DATABASE_URL`.

---

## 0. Review notes (read before deploying)

- **Fixed:** `server/src/controllers/authController.js` set auth cookies with `sameSite: 'strict'`. Since the client and server will live on two different `*.onrender.com` subdomains, that's a cross-site relationship — `strict` cookies are never sent on cross-site XHR/fetch, so login would appear to succeed (`Set-Cookie` comes back) but every following request (`/auth/me`, `/auth/refresh`, protected routes) would silently 401. Changed to `sameSite: 'none'` + `secure: true` when `NODE_ENV=production` (required pairing — browsers drop `sameSite:'none'` cookies that aren't `secure`). Local dev (`NODE_ENV` unset) now uses `sameSite: 'lax'`, unaffected functionally since localhost:5173/5000 are same-site.
- **Render's HTTPS is what makes this work** — `secure: true` cookies need TLS, and Render terminates HTTPS for you on both services by default, so no extra config needed there.
- **Don't set `PORT` in Render's env vars.** Render injects its own `PORT` and routes to it; the server already does `process.env.PORT || 5000`, which is correct as-is.
- **React Router needs a SPA rewrite rule** on the Static Site (see step 4) or refreshing any route other than `/` will 404.
- `server/.env` has a live Neon connection string and JWT secret in plaintext — it's gitignored and currently untracked in git, so nothing has leaked. Reusing the same values for Render's env vars is fine for this project; rotate later if this ever becomes a public/production system.
- Not blockers, just noticed in passing: `server/package.json` has an unused `middleware` npm dependency, and `client/package.json` lists server-side packages (`express`, `body-parser`, `cookie-parser`, `fs`, `path`, `response-time`) that the Vite frontend doesn't use — harmless leftovers from scaffolding, worth pruning at some point but doesn't affect deployment.

---

## 1. Push the repo to GitHub

`FINAL_PROJECT` is currently untracked in git. Render deploys from a GitHub repo, so commit and push it first (from the repo root):

```bash
git add FINAL_PROJECT
git commit -m "Add FINAL_PROJECT"
git push
```

Confirm `server/.env` and `client/.env.local` are **not** in the commit (`git show --stat HEAD` — both are gitignored, so they shouldn't appear).

---

## 2. Deploy the server (Web Service) — do this first

Render dashboard → **New +** → **Web Service** → connect the repo.

| Setting | Value |
|---|---|
| Root Directory | `FINAL_PROJECT/server` |
| Runtime | Node |
| Build Command | `npm install` |
| Start Command | `npm start` |
| Instance Type | Free (or paid, your call) |

**Environment variables:**

| Key | Value |
|---|---|
| `NODE_ENV` | `production` |
| `DATABASE_URL` | value from `server/.env` (Neon connection string, already has `sslmode=require`) |
| `JWT_SECRET` | value from `server/.env` |
| `CLIENT_ORIGIN` | placeholder for now, e.g. `https://placeholder.onrender.com` — you'll fix this in step 5 |

Deploy. Once it's live, note the service URL Render assigns, e.g. `https://final-project-server.onrender.com`. Verify it works:

```bash
curl https://final-project-server.onrender.com/health
# → {"status":"ok"}
```

---

## 3. Run the schema against Neon (if not already done)

If the Neon database doesn't have the tables yet, run `FINAL_PROJECT/create_tables.sql` against it once (e.g. via `psql "$DATABASE_URL" -f create_tables.sql` or the Neon SQL console). Skip this if the DB is already populated.

---

## 4. Deploy the client (Static Site)

Render dashboard → **New +** → **Static Site** → same repo.

| Setting | Value |
|---|---|
| Root Directory | `FINAL_PROJECT/client` |
| Build Command | `npm install && npm run build` |
| Publish Directory | `dist` |

**Environment variables:**

| Key | Value |
|---|---|
| `VITE_API_URL` | `https://final-project-server.onrender.com/api` (the server URL from step 2, with `/api`) |

**Redirects/Rewrites** (Static Site settings → Redirects/Rewrites) — required for React Router:

| Source | Destination | Action |
|---|---|---|
| `/*` | `/index.html` | Rewrite |

Deploy. Note the client's URL, e.g. `https://final-project-client.onrender.com`.

`VITE_API_URL` is baked into the JS bundle at build time (Vite behavior) — if you ever change it, you must trigger a new build, not just restart the service.

---

## 5. Close the loop: point the server's CORS at the real client URL

Back on the **server** Web Service → Environment → update:

| Key | Value |
|---|---|
| `CLIENT_ORIGIN` | `https://final-project-client.onrender.com` (exact origin, no trailing slash) |

Save — Render will redeploy the server automatically.

---

## 6. Verify end-to-end

1. Open the client URL, log in.
2. In DevTools → Application → Cookies, confirm `accessToken` / `refreshToken` are set with `Secure` + `SameSite=None` on the server's domain.
3. Reload the page — you should stay logged in (`/auth/me` succeeds).
4. Navigate to a nested route (e.g. dashboard sub-page) and hard-refresh — should load, not 404 (confirms the SPA rewrite rule is working).
5. Wait out a request after ~15 min idle if using the free tier — free Web Services spin down on inactivity and take ~30–50s to wake on the next request; this can make the first request after idle look like a hang, not a bug.

---

## Rollback notes

- Both services are separate Render deploys; a bad server deploy doesn't take down the already-built static client, and vice versa.
- If auth breaks after a deploy, check `CLIENT_ORIGIN` (server) and `VITE_API_URL` (client) first — the two most common drift points are a trailing slash mismatch or one of them still pointing at the placeholder/localhost value.
