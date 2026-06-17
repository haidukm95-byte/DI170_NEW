import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import type { AppDispatch, RootState } from '../../app/store';
import { logout } from '../auth/authSlice';
import { fetchUserStories } from '../stories/storiesSlice';
import { fetchUserProfile } from './feedSlice';
import { sendFriendRequest, acceptFriendRequest, declineFriendRequest, removeFriend } from '../friends/friendsSlice';
import LeftSidebar from '../../components/LeftSidebar';
import StoryCard from '../stories/StoryCard';

export default function FeedOtherProfile() {
    const dispatch = useDispatch<AppDispatch>();
    const navigate = useNavigate();
    const { id } = useParams<{ id: string }>();

    const { user } = useSelector((s: RootState) => s.auth);
    const { items: stories, loading } = useSelector((s: RootState) => s.stories);
    const { viewedProfile } = useSelector((s: RootState) => s.feed);
    const { loading: friendLoading } = useSelector((s: RootState) => s.friends);

    const viewedId = Number(id);
    const isSelf = user?.user_id === viewedId;

    useEffect(() => {
        if (id) {
            dispatch(fetchUserProfile(viewedId));
            dispatch(fetchUserStories(viewedId));
        }
    }, [dispatch, id]);

    const handleLogout = () => {
        dispatch(logout());
        navigate('/login');
    };

    const refreshProfile = () => dispatch(fetchUserProfile(viewedId));

    const handleSendRequest = async () => {
        await dispatch(sendFriendRequest(viewedId));
        refreshProfile();
    };

    const handleAccept = async () => {
        await dispatch(acceptFriendRequest(viewedId));
        refreshProfile();
    };

    const handleDecline = async () => {
        await dispatch(declineFriendRequest(viewedId));
        refreshProfile();
    };

    const handleRemoveFriend = async () => {
        await dispatch(removeFriend(viewedId));
        refreshProfile();
    };

    if (viewedProfile && !viewedProfile.is_active) {
        return (
            <div className="feed-layout">
                <div className="feed-deactivated">
                    <div className="deactivated-avatar">?</div>
                    <p>DeactivatedAccount</p>
                </div>
            </div>
        );
    }

    const relationship = viewedProfile?.relationship ?? 'none';
    const canSeeStories = !viewedProfile?.is_private || relationship === 'friends' || isSelf;

    return (
        <div className="feed-layout">
            <LeftSidebar user={viewedProfile} onLogout={handleLogout} isOwn={false} />

            <div className="feed-main">
                {!isSelf && (
                    <div className="friend-action">
                        {relationship === 'none' && (
                            <button onClick={handleSendRequest} disabled={friendLoading}>
                                Add Friend
                            </button>
                        )}
                        {relationship === 'pending_sent' && (
                            <button disabled>Request Sent</button>
                        )}
                        {relationship === 'pending_received' && (
                            <>
                                <button onClick={handleAccept} disabled={friendLoading}>
                                    Accept Request
                                </button>
                                <button onClick={handleDecline} disabled={friendLoading}>
                                    Decline
                                </button>
                            </>
                        )}
                        {relationship === 'friends' && (
                            <>
                                <button disabled>Friends ✓</button>
                                <button onClick={handleRemoveFriend} disabled={friendLoading}>
                                    Remove from friends
                                </button>
                            </>
                        )}
                    </div>
                )}

                {loading && <p>Loading stories...</p>}

                {canSeeStories ? (
                    stories.map((story) => (
                        <StoryCard
                            key={`${story.story_id}-${story.version}`}
                            story={story}
                            isOwner={Number(story.author_id) === Number(user?.user_id)}
                            currentUserId={user?.user_id}
                            isCollaborator={story.collaborators?.includes(String(user?.user_id))}
                        />
                    ))
                ) : (
                    <p>This profile is private.</p>
                )}
            </div>
        </div>
    );
}
