import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import api from '../../api/axios';

export interface FriendRequest {
    id: number;
    sender_id: number;
    username: string;
    avatar: string;
    is_active: boolean;
    created_at: string;
}

export const sendFriendRequest = createAsyncThunk(
    'friends/sendRequest',
    async (userId: number) => {
        const res = await api.post(`/users/${userId}/friend-request`);
        return res.data;
    }
);

export const fetchIncomingRequests = createAsyncThunk(
    'friends/fetchIncoming',
    async () => {
        const res = await api.get('/users/me/friend-requests');
        return res.data as FriendRequest[];
    }
);

export const acceptFriendRequest = createAsyncThunk(
    'friends/accept',
    async (senderId: number) => {
        await api.put(`/users/me/friend-requests/${senderId}/accept`);
        return senderId;
    }
);

export const removeFriend = createAsyncThunk(
    'friends/remove',
    async (userId: number) => {
        await api.put(`/users/${userId}/friends`, { action: 'remove' });
        return userId;
    }
);

export const declineFriendRequest = createAsyncThunk(
    'friends/decline',
    async (senderId: number) => {
        await api.put(`/users/me/friend-requests/${senderId}/decline`);
        return senderId;
    }
);

const friendsSlice = createSlice({
    name: 'friends',
    initialState: {
        incomingRequests: [] as FriendRequest[],
        loading: false,
        error: null as string | null,
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchIncomingRequests.fulfilled, (state, { payload }) => {
                state.incomingRequests = payload;
            })
            .addCase(acceptFriendRequest.fulfilled, (state, { payload }) => {
                state.incomingRequests = state.incomingRequests.filter(r => r.sender_id !== payload);
            })
            .addCase(declineFriendRequest.fulfilled, (state, { payload }) => {
                state.incomingRequests = state.incomingRequests.filter(r => r.sender_id !== payload);
            })
            .addMatcher(
                (action) => action.type.startsWith('friends/') && action.type.endsWith('/pending'),
                (state) => { state.loading = true; state.error = null; }
            )
            .addMatcher(
                (action) => action.type.startsWith('friends/') && action.type.endsWith('/rejected'),
                // eslint-disable-next-line @typescript-eslint/no-explicit-any
                (state, action: any) => { state.loading = false; state.error = action.error.message; }
            )
            .addMatcher(
                (action) => action.type.startsWith('friends/') && action.type.endsWith('/fulfilled'),
                (state) => { state.loading = false; }
            );
    },
});

export default friendsSlice.reducer;
