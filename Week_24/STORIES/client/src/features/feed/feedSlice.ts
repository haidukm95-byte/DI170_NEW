import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import api from '../../api/axios';

export interface FriendInfo {
    user_id: number;
    username: string;
    avatar: string;
    is_active: boolean;
}

export type RelationshipStatus = 'none' | 'pending_sent' | 'pending_received' | 'friends';

export interface UserProfile {
    user_id: number;
    username: string;
    avatar: string;
    is_private: boolean;
    is_active: boolean;
    friends: FriendInfo[];
    coauthors: FriendInfo[];
    relationship?: RelationshipStatus;
}

export const fetchMyProfile = createAsyncThunk('feed/fetchMyProfile', async () => {
    const res = await api.get('/users/me');
    return res.data as UserProfile;
});

export const fetchUserProfile = createAsyncThunk('feed/fetchUserProfile', async (userId: number) => {
    const res = await api.get(`/users/${userId}`);
    return res.data as UserProfile;
});

interface FeedState {
    myProfile: UserProfile | null;
    viewedProfile: UserProfile | null;
    loading: boolean;
    error: string | null;
}

const initialState: FeedState = {
    myProfile: null,
    viewedProfile: null,
    loading: false,
    error: null,
};

const feedSlice = createSlice({
    name: 'feed',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchMyProfile.fulfilled, (state, { payload }) => {
                state.myProfile = payload;
            })
            .addCase(fetchUserProfile.fulfilled, (state, { payload }) => {
                state.viewedProfile = payload;
            })
            .addMatcher(
                (action) => action.type.startsWith('feed/') && action.type.endsWith('/pending'),
                (state) => { state.loading = true; state.error = null; }
            )
            .addMatcher(
                (action) => action.type.startsWith('feed/') && action.type.endsWith('/rejected'),
                (state, action: any) => { state.loading = false; state.error = action.error.message; }
            )
            .addMatcher(
                (action) => action.type.startsWith('feed/') && action.type.endsWith('/fulfilled'),
                (state) => { state.loading = false; }
            );
    },
});

export default feedSlice.reducer;
