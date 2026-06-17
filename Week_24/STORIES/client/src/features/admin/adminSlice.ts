import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import api from '../../api/axios';

export interface Report {
    id: number;
    story_id: number;
    reporter_id: number;
    reporter_username: string;
    reason: string;
    created_at: string;
    is_implemented: boolean;
    version: number | null;
    header: string | null;
}

export const fetchReports = createAsyncThunk('admin/fetchReports', async () => {
    const res = await api.get('/admin/reports');
    return res.data as Report[];
});

export const adminDeleteVersion = createAsyncThunk('admin/deleteVersion', async (reportId: number) => {
    await api.delete(`/admin/reports/${reportId}/version`);
    return reportId;
});

export const adminDeleteStory = createAsyncThunk('admin/deleteStory', async (arg: { reportId: number; storyId: number }) => {
    const res = await api.delete(`/admin/reports/${arg.reportId}/story`);
    return res.data.story_id as number;
});

export const adminIgnoreReport = createAsyncThunk('admin/ignoreReport', async (reportId: number) => {
    await api.delete(`/admin/reports/${reportId}/ignore`);
    return reportId;
});

const adminSlice = createSlice({
    name: 'admin',
    initialState: {
        reports: [] as Report[],
        loading: false,
        error: null as string | null,
    },
    reducers: {
        removeReport(state, { payload }: { payload: number }) {
            state.reports = state.reports.filter((r) => r.id !== payload);
        },
        removeReportsByStory(state, { payload }: { payload: number }) {
            state.reports = state.reports.filter((r) => r.story_id !== payload);
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchReports.fulfilled, (state, { payload }) => {
                state.reports = payload;
            })
            .addMatcher(
                (action) => action.type.startsWith('admin/') && action.type.endsWith('/pending'),
                (state) => { state.loading = true; state.error = null; }
            )
            .addMatcher(
                (action) => action.type.startsWith('admin/') && action.type.endsWith('/rejected'),
                // eslint-disable-next-line @typescript-eslint/no-explicit-any
                (state, action: any) => { state.loading = false; state.error = action.error.message; }
            )
            .addMatcher(
                (action) => action.type.startsWith('admin/') && action.type.endsWith('/fulfilled'),
                (state) => { state.loading = false; }
            );
    },
});

export const { removeReport, removeReportsByStory } = adminSlice.actions;
export default adminSlice.reducer;
