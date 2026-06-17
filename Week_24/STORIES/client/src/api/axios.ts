import axios from 'axios';

const api = axios.create({
    baseURL: import.meta.env.VITE_API_URL || 'http://localhost:5000',
    withCredentials: true,  // sends cookies
});

api.interceptors.request.use((config) => {
    const token = localStorage.getItem('token');
    if (token) config.headers.Authorization = `Bearer ${token}`;
    return config;
});

// On 401/403, clear the stale session and return to login.
// Skip for /auth/verify itself — that call's rejection is handled by the verifyToken thunk.
api.interceptors.response.use(
    (res) => res,
    (err) => {
        const isVerify = err.config?.url?.includes('/auth/verify');
        if (!isVerify && (err.response?.status === 401 || err.response?.status === 403)) {
            localStorage.removeItem('token');
            localStorage.removeItem('user');
            localStorage.removeItem('stayLoggedIn');
            window.location.href = '/login';
        }
        return Promise.reject(err);
    }
);

export default api;
