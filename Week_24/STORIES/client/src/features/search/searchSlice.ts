import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import api from '../../api/axios';

export interface UserSearchResult {
    user_id: number;
    username: string;
    avatar: string;
}

interface SearchState {
    results: UserSearchResult[];
    loading: boolean;
}

const initialState: SearchState = {
    results: [],
    loading: false,
};

export const searchUsers = createAsyncThunk(
    'search/searchUsers',
    async (q: string) => {
        const { data } = await api.get<UserSearchResult[]>(`/users/search?q=${encodeURIComponent(q)}`);
        return data;
    }
);

const searchSlice = createSlice({
    name: 'search',
    initialState,
    reducers: {
        clearResults(state) {
            state.results = [];
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(searchUsers.pending,   (state) => { state.loading = true; })
            .addCase(searchUsers.fulfilled, (state, action) => {
                state.loading = false;
                state.results = action.payload;
            })
            .addCase(searchUsers.rejected,  (state) => { state.loading = false; });
    },
});

export const { clearResults } = searchSlice.actions;
export default searchSlice.reducer;
