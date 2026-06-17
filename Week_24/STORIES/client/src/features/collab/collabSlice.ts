import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import api from '../../api/axios';

export interface CollabRequest {
    id: number;
    story_id: number;
    requester_id: number;
    username: string;
    avatar: string;
    is_active: boolean;
    story_header: string | null;
    created_at: string;
}

export const fetchCollabRequests = createAsyncThunk('collab/fetchIncoming', async () => {
    const res = await api.get('/users/me/collab-requests');
    return res.data as CollabRequest[];
});

export const sendCollabRequest = createAsyncThunk('collab/send', async (storyId: number) => {
    await api.post(`/stories/${storyId}/collab-request`);
    return storyId;
});

export const acceptCollabRequest = createAsyncThunk('collab/accept', async (requestId: number) => {
    await api.put(`/users/me/collab-requests/${requestId}/accept`);
    return requestId;
});

export const declineCollabRequest = createAsyncThunk('collab/decline', async (requestId: number) => {
    await api.put(`/users/me/collab-requests/${requestId}/decline`);
    return requestId;
});

const collabSlice = createSlice({
    name: 'collab',
    initialState: {
        incomingRequests: [] as CollabRequest[],
        loading: false,
        error: null as string | null,
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchCollabRequests.fulfilled, (state, { payload }) => {
                state.incomingRequests = payload;
            })
            .addCase(acceptCollabRequest.fulfilled, (state, { payload }) => {
                state.incomingRequests = state.incomingRequests.filter((r) => r.id !== payload);
            })
            .addCase(declineCollabRequest.fulfilled, (state, { payload }) => {
                state.incomingRequests = state.incomingRequests.filter((r) => r.id !== payload);
            })
            .addMatcher(
                (action) => action.type.startsWith('collab/') && action.type.endsWith('/pending'),
                (state) => { state.loading = true; state.error = null; }
            )
            .addMatcher(
                (action) => action.type.startsWith('collab/') && action.type.endsWith('/rejected'),
                // eslint-disable-next-line @typescript-eslint/no-explicit-any
                (state, action: any) => { state.loading = false; state.error = action.error.message; }
            )
            .addMatcher(
                (action) => action.type.startsWith('collab/') && action.type.endsWith('/fulfilled'),
                (state) => { state.loading = false; }
            );
    },
});

export default collabSlice.reducer;
