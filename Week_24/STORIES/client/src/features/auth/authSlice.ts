import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import api from '../../api/axios';

export const login = createAsyncThunk('auth/login', async (credentials: {
    identifier: string; password: string; stayLoggedIn: boolean;
}) => {
    const res = await api.post('/auth/login', credentials);
    return { ...res.data, stayLoggedIn: credentials.stayLoggedIn };
});

export const register = createAsyncThunk('auth/register', async (data: {
    username: string; email: string; password: string;
}) => {
    const res = await api.post('/auth/register', data);
    return res.data;
});

export const verifyToken = createAsyncThunk('auth/verifyToken', async (_, { rejectWithValue }) => {
    try {
        const res = await api.get('/auth/verify');
        return res.data;
    } catch (err: any) {
        return rejectWithValue(err.response?.data || 'Token invalid');
    }
});

const storedToken = localStorage.getItem('token');
const storedUser = (() => {
    try {
        const raw = localStorage.getItem('user');
        return raw ? JSON.parse(raw) : null;
    } catch {
        return null;
    }
})();

type AuthStatus = 'checking' | 'authenticated' | 'unauthenticated';

const authSlice = createSlice({
    name: 'auth',
    initialState: {
        user: storedUser as any,
        token: storedToken as string | null,
        status: (storedToken ? 'checking' : 'unauthenticated') as AuthStatus,
        loading: false,
        error: null as string | null,
    },
    reducers: {
        logout(state) {
            state.user = null;
            state.token = null;
            state.status = 'unauthenticated';
            localStorage.removeItem('token');
            localStorage.removeItem('user');
            localStorage.removeItem('stayLoggedIn');
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(verifyToken.fulfilled, (state, { payload }) => {
                state.user = payload.user;
                state.status = 'authenticated';
                localStorage.setItem('user', JSON.stringify(payload.user));
            })
            .addCase(verifyToken.rejected, (state) => {
                state.user = null;
                state.token = null;
                state.status = 'unauthenticated';
                localStorage.removeItem('token');
                localStorage.removeItem('user');
                localStorage.removeItem('stayLoggedIn');
            })
            .addCase(login.fulfilled, (state, { payload }) => {
                state.user = payload.user;
                state.token = payload.token;
                state.status = 'authenticated';
                localStorage.setItem('token', payload.token);
                localStorage.setItem('user', JSON.stringify(payload.user));
                localStorage.setItem('stayLoggedIn', payload.stayLoggedIn ? 'true' : 'false');
            })
            .addCase(register.fulfilled, (state, { payload }) => {
                state.user = payload.user;
                state.token = payload.token;
                state.status = 'authenticated';
                localStorage.setItem('token', payload.token);
                localStorage.setItem('user', JSON.stringify(payload.user));
            })
            .addMatcher(
                (action) => action.type.endsWith('/pending') && !action.type.includes('verifyToken'),
                (state) => { state.loading = true; state.error = null; }
            )
            .addMatcher(
                (action) => action.type.endsWith('/rejected') && !action.type.includes('verifyToken'),
                // eslint-disable-next-line @typescript-eslint/no-explicit-any
                (state, action: any) => {
                    state.loading = false;
                    state.error = action.error.message;
                }
            )
            .addMatcher(
                (action) => action.type.endsWith('/fulfilled') && !action.type.includes('verifyToken'),
                (state) => { state.loading = false; }
            );
    },
});

export const { logout } = authSlice.actions;
export default authSlice.reducer;
