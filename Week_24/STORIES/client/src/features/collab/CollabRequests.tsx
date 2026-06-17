import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import type { AppDispatch, RootState } from '../../app/store';
import { fetchCollabRequests, acceptCollabRequest, declineCollabRequest } from './collabSlice';

export default function CollabRequests() {
    const dispatch = useDispatch<AppDispatch>();
    const { incomingRequests, loading } = useSelector((s: RootState) => s.collab);

    useEffect(() => {
        dispatch(fetchCollabRequests());
    }, [dispatch]);

    if (incomingRequests.length === 0) return null;

    return (
        <div className="friend-requests">
            <h4>Collaboration Requests</h4>
            {incomingRequests.map((req) => (
                <div key={req.id} className="friend-request-item collab-request-item">
                    <Link to={`/user/${req.requester_id}`} className="friend-request-user">
                        {req.is_active
                            ? <img src={req.avatar || '/default-avatar.png'} alt={req.username} />
                            : <span className="deactivated-avatar">?</span>}
                        <span>{req.is_active ? req.username : 'DeactivatedAccount'}</span>
                    </Link>
                    <span className="collab-request-label">
                        requests to collaborate your &ldquo;{req.story_header || 'Untitled'}&rdquo; story
                    </span>
                    <div className="friend-request-actions">
                        <button
                            onClick={() => dispatch(acceptCollabRequest(req.id))}
                            disabled={loading}
                        >
                            Accept
                        </button>
                        <button
                            onClick={() => dispatch(declineCollabRequest(req.id))}
                            disabled={loading}
                        >
                            Decline
                        </button>
                    </div>
                </div>
            ))}
        </div>
    );
}
