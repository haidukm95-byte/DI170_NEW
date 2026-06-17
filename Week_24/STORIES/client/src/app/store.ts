import { configureStore } from '@reduxjs/toolkit';
import authReducer from '../features/auth/authSlice';
import storiesReducer from '../features/stories/storiesSlice';
import accountReducer from '../features/account/accountSlice';
import feedReducer from '../features/feed/feedSlice';
import friendsReducer from '../features/friends/friendsSlice';
import searchReducer from '../features/search/searchSlice';
import collabReducer from '../features/collab/collabSlice';
import adminReducer from '../features/admin/adminSlice';

export const store = configureStore({
    reducer: {
        auth: authReducer,
        stories: storiesReducer,
        account: accountReducer,
        feed: feedReducer,
        friends: friendsReducer,
        search: searchReducer,
        collab: collabReducer,
        admin: adminReducer,
    },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
