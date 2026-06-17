import axios from 'axios';
import { getAccessToken, setAccessToken } from './tokenStorage';

const api = axios.create({
    baseURL: import.meta.env.VITE_API_URL || undefined,
    withCredentials: true, // needed so the httpOnly refresh cookie is sent
});

api.interceptors.request.use((config) => {
    const token = getAccessToken();
    if (token) config.headers.Authorization = `Bearer ${token}`;
    return config;
});

// Silent token refresh on 401: retry the original request with the new access token.
// Falls back to redirecting to /login if the refresh token is also expired.
let isRefreshing = false;
type CB = (token: string) => void;
let queue: CB[] = [];

function drainQueue(token: string) {
    queue.forEach(cb => cb(token));
    queue = [];
}

api.interceptors.response.use(
    (res) => res,
    async (err) => {
        const config = err.config;
        const isAuthCall = config?.url?.includes('/auth/refresh') || config?.url?.includes('/auth/login');

        if (err.response?.status === 401 && !config?._retry && !isAuthCall) {
            if (isRefreshing) {
                return new Promise<void>(resolve => {
                    queue.push((token: string) => {
                        config.headers.Authorization = `Bearer ${token}`;
                        resolve(api(config));
                    });
                });
            }

            config._retry = true;
            isRefreshing = true;

            try {
                const { data } = await api.post('/auth/refresh');
                setAccessToken(data.accessToken);
                drainQueue(data.accessToken);
                config.headers.Authorization = `Bearer ${data.accessToken}`;
                return api(config);
            } catch {
                setAccessToken(null);
                queue = [];
                window.location.href = '/login';
                return Promise.reject(err);
            } finally {
                isRefreshing = false;
            }
        }

        return Promise.reject(err);
    }
);

export default api;
