import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import type { AppDispatch } from '../../app/store';
import type { Story } from './storiesSlice';
import {
    likeStory,
    dislikeStory,
    editStory,
    deleteStory,
    deleteStoryVersion,
    reportStory,
} from './storiesSlice';
import { sendCollabRequest } from '../collab/collabSlice';

interface Props {
    story: Story;
    isOwner: boolean;
    currentUserId?: number;
    isCollaborator?: boolean;
}

export default function StoryCard({ story, isOwner, currentUserId, isCollaborator }: Props) {
    const dispatch = useDispatch<AppDispatch>();

    const [editing, setEditing] = useState(false);
    const [editHeader, setEditHeader] = useState(story.header ?? '');
    const [editText, setEditText] = useState(story.story ?? '');
    const [showReport, setShowReport] = useState(false);
    const [reportReason, setReportReason] = useState('');
    const [collabPending, setCollabPending] = useState(
        story.collab_request_status === 'pending'
    );

    const likeDiff = story.likes - story.dislikes;
    const likeColor = likeDiff > 0 ? 'green' : likeDiff < 0 ? 'red' : 'inherit';
    const fmt = (iso: string) => new Date(iso).toLocaleDateString(undefined, {
        year: 'numeric', month: 'short', day: 'numeric',
    });
    const publishedDate = fmt(story.original_created_at ?? story.created_at);
    const lastVersionDate = story.version > 1 ? fmt(story.created_at) : null;

    const handleEdit = async (e: React.SyntheticEvent<HTMLFormElement>) => {
        e.preventDefault();
        await dispatch(editStory({ storyId: story.story_id, header: editHeader, story: editText }));
        setEditing(false);
    };

    const handleDeleteVersion = () => {
        if (window.confirm(`Delete version ${story.version}?`)) {
            dispatch(deleteStoryVersion({ storyId: story.story_id, version: story.version }));
        }
    };

    const handleDeleteStory = () => {
        if (window.confirm('Delete this story and all its versions?')) {
            dispatch(deleteStory(story.story_id));
        }
    };

    const handleCollabRequest = async () => {
        await dispatch(sendCollabRequest(story.story_id));
        setCollabPending(true);
    };

    const handleReport = async (e: React.SyntheticEvent<HTMLFormElement>) => {
        e.preventDefault();
        await dispatch(reportStory({ storyId: story.story_id, reason: reportReason }));
        setShowReport(false);
        setReportReason('');
    };

    return (
        <div className="feed-main-story">
            {editing ? (
                <form className="feed-main-createstory" onSubmit={handleEdit}>
                    <input
                        type="text"
                        value={editHeader}
                        placeholder="Story title"
                        onChange={(e) => setEditHeader(e.target.value)}
                    />
                    <textarea
                        value={editText}
                        onChange={(e) => setEditText(e.target.value)}
                        required
                    />
                    <button type="submit">Save</button>
                    <button type="button" onClick={() => setEditing(false)}>Cancel</button>
                </form>
            ) : (
                <>
                    {story.header && <h3>{story.header}</h3>}
                    <p>{story.story}</p>
                </>
            )}

            <div className="story-credits">
                <span>By: <Link to={`/user/${story.author_id}`}>{story.author_username ?? `#${story.author_id}`}</Link></span>
                {story.collaborator_data?.length > 0 && (
                    <span>
                        {' · Collaborators: '}
                        {story.collaborator_data.map((c, i) => (
                            <span key={c.user_id}>
                                {i > 0 && ', '}
                                <Link to={`/user/${c.user_id}`}>{c.username}</Link>
                            </span>
                        ))}
                    </span>
                )}
            </div>

            <div className="story-dates">
                <span>Published: {publishedDate}</span>
                {lastVersionDate && (
                    <span> · Last edited: {lastVersionDate}</span>
                )}
            </div>

            {!isOwner && (
                <div className="story-reactions">
                    <button
                        className={`reaction-btn${story.user_reaction === 'like' ? ' active' : ''}`}
                        onClick={() => dispatch(likeStory(story.story_id))}
                        title={story.user_reaction === 'like' ? 'Unlike' : 'Like'}
                    >
                        Like
                    </button>
                    <span className="reaction-score" style={{ color: likeColor }}>{likeDiff}</span>
                    <button
                        className={`reaction-btn${story.user_reaction === 'dislike' ? ' active' : ''}`}
                        onClick={() => dispatch(dislikeStory(story.story_id))}
                        title={story.user_reaction === 'dislike' ? 'Un-dislike' : 'Dislike'}
                    >
                        Dislike
                    </button>
                </div>
            )}

            <nav className="story-nav">
                <span className="story-version">v{story.version}</span>

                <div className="collaborator-avatars">
                    {story.collaborator_data?.map((c) => (
                        <img
                            key={c.user_id}
                            src={c.avatar || '/default-avatar.png'}
                            alt={c.username}
                            title={c.username}
                        />
                    ))}
                </div>

                {isOwner && (
                    <button onClick={() => setEditing(true)}>Edit</button>
                )}
                {isCollaborator && !isOwner && (
                    <button onClick={() => setEditing(true)}>Edit as Collaborator</button>
                )}
                {isOwner && (
                    <button onClick={handleDeleteVersion}>Delete version</button>
                )}
                {isCollaborator && !isOwner && Number(story.version_author_id) === Number(currentUserId) && (
                    <button onClick={handleDeleteVersion}>Delete version</button>
                )}
                {isOwner && (
                    <button onClick={handleDeleteStory}>Delete story</button>
                )}
                {!isOwner && !isCollaborator && (
                    collabPending
                        ? <button disabled>Collaboration Requested</button>
                        : <button onClick={handleCollabRequest}>I want to collaborate</button>
                )}
                <button onClick={() => setShowReport(!showReport)}>Report</button>
            </nav>

            {showReport && (
                <form className="report-form" onSubmit={handleReport}>
                    <textarea
                        placeholder="Reason for report..."
                        value={reportReason}
                        onChange={(e) => setReportReason(e.target.value)}
                        required
                    />
                    <button type="submit">Submit Report</button>
                    <button type="button" onClick={() => setShowReport(false)}>Cancel</button>
                </form>
            )}
        </div>
    );
}
