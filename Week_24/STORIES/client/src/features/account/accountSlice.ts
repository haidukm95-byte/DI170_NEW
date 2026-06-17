import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import api from '../../api/axios';

export const updateUsername = createAsyncThunk('account/updateUsername', async (username: string) => {
    const res = await api.patch('/users/me', { username });
    return res.data;
});

export const updateAvatar = createAsyncThunk('account/updateAvatar', async (avatar: string) => {
    const res = await api.patch('/users/me', { avatar });
    return res.data;
});

export const updatePassword = createAsyncThunk('account/updatePassword', async (data: {
    currentPassword: string; newPassword: string;
}) => {
    const res = await api.patch('/users/me/password', data);
    return res.data;
});

export const setPrivacy = createAsyncThunk('account/setPrivacy', async (isPrivate: boolean) => {
    const res = await api.patch('/users/me', { is_private: isPrivate });
    return res.data;
});

export const deactivateAccount = createAsyncThunk('account/deactivate', async () => {
    const res = await api.patch('/users/me', { is_active: false });
    return res.data;
});

interface AccountState {
    loading: boolean;
    error: string | null;
    success: string | null;
}

const initialState: AccountState = {
    loading: false,
    error: null,
    success: null,
};

const accountSlice = createSlice({
    name: 'account',
    initialState,
    reducers: {
        clearAccountStatus(state) {
            state.error = null;
            state.success = null;
        },
    },
    extraReducers: (builder) => {
        builder
            .addMatcher(
                (action) => action.type.startsWith('account/') && action.type.endsWith('/pending'),
                (state) => { state.loading = true; state.error = null; state.success = null; }
            )
            .addMatcher(
                (action) => action.type.startsWith('account/') && action.type.endsWith('/rejected'),
                (state, action: any) => { state.loading = false; state.error = action.error.message; }
            )
            .addMatcher(
                (action) => action.type.startsWith('account/') && action.type.endsWith('/fulfilled'),
                (state) => { state.loading = false; state.success = 'Updated successfully'; }
            );
    },
});

export const { clearAccountStatus } = accountSlice.actions;
export default accountSlice.reducer;
