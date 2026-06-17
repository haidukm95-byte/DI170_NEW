import { useState, useEffect, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate, useSearchParams } from 'react-router-dom';
import type { AppDispatch, RootState } from '../../app/store';
import { logout } from '../auth/authSlice';
import { fetchFeedStories, createStory, setFilter } from '../stories/storiesSlice';
import { fetchMyProfile } from './feedSlice';
import LeftSidebar from '../../components/LeftSidebar';
import StoryCard from '../stories/StoryCard';
import FriendRequests from '../friends/FriendRequests';
import CollabRequests from '../collab/CollabRequests';
import CollabSearchInput from '../stories/CollabSearchInput';

const INACTIVITY_MS = 5 * 60 * 1000;

export default function FeedMyProfile() {
    const dispatch = useDispatch<AppDispatch>();
    const navigate = useNavigate();
    const [searchParams] = useSearchParams();
    const filter = (searchParams.get('filter') as 'mine' | 'all' | 'social') ?? 'social';

    const { user } = useSelector((s: RootState) => s.auth);
    const { items: stories, loading } = useSelector((s: RootState) => s.stories);
    const { myProfile } = useSelector((s: RootState) => s.feed);

    const [storyHeader, setStoryHeader] = useState('');
    const [storyText, setStoryText] = useState('');
    const [collabUsernames, setCollabUsernames] = useState<string[]>([]);

    const inactivityTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
    const stayLoggedIn = localStorage.getItem('stayLoggedIn') === 'true';

    const resetInactivityTimer = () => {
        if (inactivityTimer.current) clearTimeout(inactivityTimer.current);
        inactivityTimer.current = setTimeout(() => {
            dispatch(logout());
            navigate('/login');
        }, INACTIVITY_MS);
    };

    useEffect(() => {
        if (!stayLoggedIn) {
            const events = ['mousedown', 'keypress', 'scroll', 'touchstart'] as const;
            events.forEach((e) => window.addEventListener(e, resetInactivityTimer));
            resetInactivityTimer();
            return () => {
                events.forEach((e) => window.removeEventListener(e, resetInactivityTimer));
                if (inactivityTimer.current) clearTimeout(inactivityTimer.current);
            };
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [stayLoggedIn]);

    useEffect(() => {
        dispatch(fetchMyProfile());
        dispatch(fetchFeedStories(filter));
        dispatch(setFilter(filter));
    }, [dispatch, filter]);

    const handleLogout = () => {
        dispatch(logout());
        navigate('/login');
    };

    const handlePublish = async (e: React.SyntheticEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (!storyText.trim()) return;
        await dispatch(createStory({ header: storyHeader, story: storyText, collaboratorUsernames: collabUsernames }));
        setStoryHeader('');
        setStoryText('');
        setCollabUsernames([]);
    };

    const sidebarUser = myProfile
        ? { ...user, friends: myProfile.friends, coauthors: myProfile.coauthors }
        : user;

    return (
        <div className="feed-layout">
            <LeftSidebar user={sidebarUser} onLogout={handleLogout} isOwn={true} />

            <div className="feed-main">
                <FriendRequests />
                <CollabRequests />

                <form className="feed-main-createstory" onSubmit={handlePublish}>
                    <input
                        type="text"
                        placeholder="Story title (optional)"
                        value={storyHeader}
                        onChange={(e) => setStoryHeader(e.target.value)}
                    />
                    <textarea
                        placeholder="Type your story here..."
                        value={storyText}
                        onChange={(e) => setStoryText(e.target.value)}
                        required
                    />
                    <CollabSearchInput value={collabUsernames} onChange={setCollabUsernames} />
                    <button type="submit" disabled={loading}>Publish</button>
                </form>

                {loading && <p>Loading stories...</p>}

                {stories.map((story) => (
                    <StoryCard
                        key={`${story.story_id}-${story.version}`}
                        story={story}
                        isOwner={Number(story.author_id) === Number(user?.user_id)}
                        currentUserId={user?.user_id}
                        isCollaborator={story.collaborators?.includes(String(user?.user_id))}
                    />
                ))}
            </div>
        </div>
    );
}
