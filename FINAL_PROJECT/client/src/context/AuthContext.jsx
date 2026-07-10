import { createContext, useCallback, useContext, useEffect, useRef, useState } from 'react';
import api, { setSessionExpiredHandler } from '../api/axiosInstance';

const AuthContext = createContext(null);

const ACTIVITY_EVENTS = ['mousemove', 'keydown', 'click', 'scroll'];
const SILENT_REFRESH_INTERVAL_MS = 10 * 60 * 1000;
// Must be under the server's 15-minute inactivity cutoff (see refresh() in
// authController.js) so a genuinely idle tab stops renewing before the
// server would reject the renewal anyway.
const ACTIVITY_WINDOW_MS = 12 * 60 * 1000;

export function AuthProvider({ children }) {
    const [user, setUser] = useState(null);
    const [status, setStatus] = useState('loading'); // 'loading' | 'authenticated' | 'unauthenticated'
    const lastActivityRef = useRef(Date.now());

    const logout = useCallback(async () => {
        try {
            await api.post('/auth/logout');
        } catch {
            // already invalid/expired server-side — nothing left to revoke
        }
        setUser(null);
        setStatus('unauthenticated');
    }, []);

    const login = useCallback(async (gov_id, password) => {
        const { data } = await api.post('/auth/login', { gov_id, password });
        setUser(data.user);
        setStatus('authenticated');
        return data.user;
    }, []);

    // Re-fetches the current user, e.g. after the manager edits their own
    // profile, so the displayed name/gov_id stays in sync without a reload.
    const refreshUser = useCallback(async () => {
        const { data } = await api.get('/auth/me');
        setUser(data.user);
        return data.user;
    }, []);

    // Let the axios interceptor force a logout when a silent refresh fails.
    useEffect(() => {
        setSessionExpiredHandler(() => {
            setUser(null);
            setStatus('unauthenticated');
        });
    }, []);

    // On mount: are we still logged in from a previous visit? The access
    // token cookie (or a still-valid refresh token, via the interceptor)
    // answers this without the app ever touching the raw JWT.
    useEffect(() => {
        let cancelled = false;
        api.get('/auth/me')
            .then(({ data }) => {
                if (!cancelled) {
                    setUser(data.user);
                    setStatus('authenticated');
                }
            })
            .catch(() => {
                if (!cancelled) setStatus('unauthenticated');
            });
        return () => {
            cancelled = true;
        };
    }, []);

    useEffect(() => {
        const markActive = () => {
            lastActivityRef.current = Date.now();
        };
        ACTIVITY_EVENTS.forEach((evt) => window.addEventListener(evt, markActive));
        return () => ACTIVITY_EVENTS.forEach((evt) => window.removeEventListener(evt, markActive));
    }, []);

    // While logged in, periodically renew the session — but only if the
    // user has actually been active recently. A tab left open but untouched
    // stops renewing and lets the access token (and then the server's own
    // inactivity check) expire the session naturally.
    useEffect(() => {
        if (status !== 'authenticated') return undefined;
        const id = setInterval(() => {
            const idleFor = Date.now() - lastActivityRef.current;
            if (idleFor < ACTIVITY_WINDOW_MS) {
                api.post('/auth/refresh').catch(() => {
                    setUser(null);
                    setStatus('unauthenticated');
                });
            }
        }, SILENT_REFRESH_INTERVAL_MS);
        return () => clearInterval(id);
    }, [status]);

    return <AuthContext.Provider value={{ user, status, login, logout, refreshUser }}>{children}</AuthContext.Provider>;
}

export function useAuth() {
    const ctx = useContext(AuthContext);
    if (!ctx) throw new Error('useAuth must be used within an AuthProvider');
    return ctx;
}
