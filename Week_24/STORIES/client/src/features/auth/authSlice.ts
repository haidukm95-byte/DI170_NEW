import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import api from '../../api/axios';
import { setAccessToken } from '../../api/tokenStorage';

export const login = createAsyncThunk('auth/login', async (credentials: {
    identifier: string; password: string;
}) => {
    const res = await api.post('/auth/login', credentials);
    return res.data;
});

export const register = createAsyncThunk('auth/register', async (data: {
    username: string; email: string; password: string;
}) => {
    const res = await api.post('/auth/register', data);
    return res.data;
});

// Called on app load — uses the httpOnly refresh token cookie to restore the session.
// Returns { user, accessToken } on success.
export const refreshSession = createAsyncThunk(
    'auth/refreshSession',
    async (_, { rejectWithValue }) => {
        try {
            const res = await api.post('/auth/refresh');
            return res.data;
        } catch (err: any) {
            return rejectWithValue(err.response?.data || 'Session expired');
        }
    }
);

type AuthStatus = 'checking' | 'authenticated' | 'unauthenticated';

const authSlice = createSlice({
    name: 'auth',
    initialState: {
        user: null as any,
        status: 'checking' as AuthStatus,
        loading: false,
        error: null as string | null,
    },
    reducers: {
        logout(state) {
            state.user = null;
            state.status = 'unauthenticated';
            setAccessToken(null);
        },
        setUser(state, action) {
            state.user = action.payload;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(refreshSession.fulfilled, (state, { payload }) => {
                state.user = payload.user;
                state.status = 'authenticated';
                setAccessToken(payload.accessToken);
            })
            .addCase(refreshSession.rejected, (state) => {
                state.user = null;
                state.status = 'unauthenticated';
                setAccessToken(null);
            })
            .addCase(login.fulfilled, (state, { payload }) => {
                state.user = payload.user;
                state.status = 'authenticated';
                setAccessToken(payload.accessToken);
            })
            .addCase(register.fulfilled, (state, { payload }) => {
                state.user = payload.user;
                state.status = 'authenticated';
                setAccessToken(payload.accessToken);
            })
            // loading/error spinners — exclude refreshSession so it's transparent
            .addMatcher(
                (action) => action.type.endsWith('/pending') && !action.type.includes('refreshSession'),
                (state) => { state.loading = true; state.error = null; }
            )
            .addMatcher(
                (action) => action.type.endsWith('/rejected') && !action.type.includes('refreshSession'),
                // eslint-disable-next-line @typescript-eslint/no-explicit-any
                (state, action: any) => {
                    state.loading = false;
                    state.error = action.error.message;
                }
            )
            .addMatcher(
                (action) => action.type.endsWith('/fulfilled') && !action.type.includes('refreshSession'),
                (state) => { state.loading = false; }
            );
    },
});

export const { logout, setUser } = authSlice.actions;
export default authSlice.reducer;
