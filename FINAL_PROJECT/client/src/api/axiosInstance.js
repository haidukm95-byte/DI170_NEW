import axios from 'axios';

const api = axios.create({
    baseURL: import.meta.env.VITE_API_URL ?? 'http://localhost:5000/api',
    withCredentials: true,
});

let onSessionExpired = () => {};
export function setSessionExpiredHandler(handler) {
    onSessionExpired = handler;
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
                await api.post('/auth/refresh');
                return api(config);
            } catch {
                onSessionExpired();
            }
        }
        return Promise.reject(error);
    }
);

export default api;
