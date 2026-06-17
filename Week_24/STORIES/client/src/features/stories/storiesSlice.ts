import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import api from '../../api/axios';

export interface CollaboratorInfo {
    user_id: string;
    username: string;
    avatar: string;
}

export interface Story {
    story_id: number;
    version: number;
    header: string;
    story: string;
    author_id: number;
    author_username: string;
    version_author_id: number;
    collaborators: string[];
    collaborator_data: CollaboratorInfo[];
    collab_request_status: 'pending' | 'accepted' | 'declined' | null;
    likes: number;
    dislikes: number;
    created_at: string;           // latest version timestamp
    original_created_at: string;  // version 1 timestamp
    user_reaction: 'like' | 'dislike' | null;
}

export const fetchFeedStories = createAsyncThunk('stories/fetchFeed', async (filter: 'mine' | 'all' | 'social') => {
    const res = await api.get(`/stories/feed?filter=${filter}`);
    return res.data as Story[];
});

export const fetchUserStories = createAsyncThunk('stories/fetchUser', async (userId: number) => {
    const res = await api.get(`/stories/user/${userId}`);
    return res.data as Story[];
});

export const createStory = createAsyncThunk('stories/create', async (data: {
    header: string; story: string; collaboratorUsernames?: string[];
}) => {
    const res = await api.post('/stories', data);
    return res.data as Story;
});

export const editStory = createAsyncThunk('stories/edit', async (data: {
    storyId: number; header: string; story: string;
}) => {
    const res = await api.put(`/stories/${data.storyId}`, { header: data.header, story: data.story });
    return res.data as Story;
});

export const deleteStoryVersion = createAsyncThunk('stories/deleteVersion', async (data: {
    storyId: number; version: number;
}) => {
    const res = await api.delete<Story | { message: string }>(`/stories/${data.storyId}/latest`);
    const previous: Story | null = 'story_id' in res.data ? res.data : null;
    return { storyId: data.storyId, previous };
});

export const deleteStory = createAsyncThunk('stories/delete', async (storyId: number) => {
    await api.delete(`/stories/${storyId}`);
    return storyId;
});

export const likeStory = createAsyncThunk('stories/like', async (storyId: number) => {
    const res = await api.post(`/stories/${storyId}/like`);
    return res.data as Story;
});

export const dislikeStory = createAsyncThunk('stories/dislike', async (storyId: number) => {
    const res = await api.post(`/stories/${storyId}/dislike`);
    return res.data as Story;
});

export const reportStory = createAsyncThunk('stories/report', async (data: {
    storyId: number; reason: string;
}) => {
    const res = await api.post(`/stories/${data.storyId}/report`, { reason: data.reason });
    return res.data;
});

interface StoriesState {
    items: Story[];
    loading: boolean;
    error: string | null;
    filter: 'mine' | 'all' | 'social';
}

const initialState: StoriesState = {
    items: [],
    loading: false,
    error: null,
    filter: 'social',
};

function applyReactionUpdate(items: Story[], payload: Story) {
    const s = items.find(
        (s) => s.story_id === payload.story_id && s.version === payload.version
    );
    if (s) {
        s.likes = payload.likes;
        s.dislikes = payload.dislikes;
        s.user_reaction = payload.user_reaction;
    }
}

const storiesSlice = createSlice({
    name: 'stories',
    initialState,
    reducers: {
        setFilter(state, action) {
            state.filter = action.payload;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchFeedStories.fulfilled, (state, { payload }) => {
                state.items = payload;
            })
            .addCase(fetchUserStories.fulfilled, (state, { payload }) => {
                state.items = payload;
            })
            .addCase(createStory.fulfilled, (state, { payload }) => {
                state.items.unshift(payload);
            })
            .addCase(editStory.fulfilled, (state, { payload }) => {
                const idx = state.items.findIndex(
                    (s) => s.story_id === payload.story_id && s.version === payload.version - 1
                );
                if (idx !== -1) state.items[idx] = payload;
                else state.items.unshift(payload);
            })
            .addCase(deleteStoryVersion.fulfilled, (state, { payload }) => {
                const { storyId, previous } = payload;
                if (previous === null) {
                    state.items = state.items.filter((s) => s.story_id !== storyId);
                    return;
                }
                // Roll back to the previous version, preserving computed fields
                // (collaborator_data, author_username, original_created_at, user_reaction)
                // that the plain DELETE endpoint doesn't re-compute.
                const idx = state.items.findIndex((s) => s.story_id === storyId);
                if (idx !== -1) {
                    state.items[idx] = {
                        ...state.items[idx],
                        version: previous.version,
                        header: previous.header,
                        story: previous.story,
                        version_author_id: previous.version_author_id,
                        created_at: previous.created_at,
                        likes: previous.likes,
                        dislikes: previous.dislikes,
                    };
                }
            })
            .addCase(deleteStory.fulfilled, (state, { payload }) => {
                state.items = state.items.filter((s) => s.story_id !== payload);
            })
            .addCase(likeStory.fulfilled, (state, { payload }) => {
                applyReactionUpdate(state.items, payload);
            })
            .addCase(dislikeStory.fulfilled, (state, { payload }) => {
                applyReactionUpdate(state.items, payload);
            })
            .addMatcher(
                (action) => action.type.startsWith('stories/') && action.type.endsWith('/pending'),
                (state) => { state.loading = true; state.error = null; }
            )
            .addMatcher(
                (action) => action.type.startsWith('stories/') && action.type.endsWith('/rejected'),
                // eslint-disable-next-line @typescript-eslint/no-explicit-any
                (state, action: any) => { state.loading = false; state.error = action.error.message; }
            )
            .addMatcher(
                (action) => action.type.startsWith('stories/') && action.type.endsWith('/fulfilled'),
                (state) => { state.loading = false; }
            );
    },
});

export const { setFilter } = storiesSlice.actions;
export default storiesSlice.reducer;
