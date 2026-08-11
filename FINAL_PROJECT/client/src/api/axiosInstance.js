import axios from 'axios';

const api = axios.create({
    baseURL: import.meta.env.VITE_API_URL ?? 'http://localhost:5000/api',
    withCredentials: true,
});

let onSessionExpired = () => {};
export function setSessionExpiredHandler(handler) {
    onSessionExpired = handler;
}

// Refresh tokens are single-use and rotate server-side, so two refresh calls
// firing around the same moment (e.g. AuthContext's periodic silent refresh
// landing right as an in-flight request 401s) would race: the loser's token
// is already revoked by the winner's rotation, and it gets logged out even
// though the session is genuinely still active. Sharing one in-flight
// promise means every caller awaits the same network call instead of each
// consuming/rotating the token independently.
let refreshPromise = null;
export function refreshSession() {
    if (!refreshPromise) {
        refreshPromise = api.post('/auth/refresh').finally(() => {
            refreshPromise = null;
        });
    }
    return refreshPromise;
}

// Access tokens live 15 minutes; on a 401 we try one silent refresh (via the
// httpOnly refreshToken cookie) and replay the original request. If refresh
// itself 401s, the session is genuinely over — surface that instead of looping.
api.interceptors.response.use(
    (response) => response,
    async (error) => {
        const { config, response } = error;
        if (response?.status === 401 && config && !config._retried && !config.url?.endsWith('/auth/refresh')) {
            config._retried = true;
            try {
                await refreshSession();
                return api(config);
            } catch {
                onSessionExpired();
            }
        }
        return Promise.reject(error);
    }
);

export default api;
