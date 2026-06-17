import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import type { AppDispatch, RootState } from '../../app/store';
import {
    fetchIncomingRequests,
    acceptFriendRequest,
    declineFriendRequest,
} from './friendsSlice';

export default function FriendRequests() {
    const dispatch = useDispatch<AppDispatch>();
    const { incomingRequests, loading } = useSelector((s: RootState) => s.friends);

    useEffect(() => {
        dispatch(fetchIncomingRequests());
    }, [dispatch]);

    if (incomingRequests.length === 0) return null;

    return (
        <div className="friend-requests">
            <h4>Friend Requests</h4>
            {incomingRequests.map(req => (
                <div key={req.id} className="friend-request-item">
                    <Link to={`/user/${req.sender_id}`} className="friend-request-user">
                        {req.is_active
                            ? <img src={req.avatar || '/default-avatar.png'} alt={req.username} />
                            : <span className="deactivated-avatar">?</span>}
                        <span>{req.is_active ? req.username : 'DeactivatedAccount'}</span>
                    </Link>
                    <div className="friend-request-actions">
                        <button
                            onClick={() => dispatch(acceptFriendRequest(req.sender_id))}
                            disabled={loading}
                        >
                            Accept
                        </button>
                        <button
                            onClick={() => dispatch(declineFriendRequest(req.sender_id))}
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
