import { useRef, useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import type { AppDispatch, RootState } from '../app/store';
import { searchUsers, clearResults } from '../features/search/searchSlice';

interface FriendInfo {
    user_id: number;
    username: string;
    avatar: string;
    is_active: boolean;
}

interface Props {
    user: any;
    onLogout: () => void;
    isOwn: boolean;
}

export default function LeftSidebar({ user, onLogout, isOwn }: Props) {
    const dispatch = useDispatch<AppDispatch>();
    const navigate = useNavigate();
    const { pathname } = useLocation();
    const isOnFeed = pathname === '/feed';
    const { results, loading } = useSelector((s: RootState) => s.search);

    const [inputValue, setInputValue] = useState('');
    const [open, setOpen] = useState(false);
    const [isTyping, setIsTyping] = useState(false);
    const debounceRef = useRef<ReturnType<typeof setTimeout> | null>(null);
    const containerRef = useRef<HTMLDivElement>(null);

    function handleInput(e: React.ChangeEvent<HTMLInputElement>) {
        const val = e.target.value;
        setInputValue(val);

        if (debounceRef.current) clearTimeout(debounceRef.current);

        if (!val.trim()) {
            dispatch(clearResults());
            setOpen(false);
            setIsTyping(false);
            return;
        }

        setOpen(true);
        setIsTyping(true);
        debounceRef.current = setTimeout(() => {
            setIsTyping(false);
            dispatch(searchUsers(val.trim()));
        }, 300);
    }

    function handleSelect(userId: number) {
        dispatch(clearResults());
        setInputValue('');
        setOpen(false);
        navigate(`/user/${userId}`);
    }

    function handleClear() {
        if (debounceRef.current) clearTimeout(debounceRef.current);
        dispatch(clearResults());
        setInputValue('');
        setOpen(false);
        setIsTyping(false);
    }

    useEffect(() => {
        function onClickOutside(e: MouseEvent) {
            if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
                setOpen(false);
            }
        }
        document.addEventListener('mousedown', onClickOutside);
        return () => document.removeEventListener('mousedown', onClickOutside);
    }, []);

    useEffect(() => {
        function onEsc(e: KeyboardEvent) {
            if (e.key === 'Escape') handleClear();
        }
        document.addEventListener('keydown', onEsc);
        return () => document.removeEventListener('keydown', onEsc);
    }, []);

    const showSpinner = isTyping || loading;
    const showNoResults = !showSpinner && open && inputValue.trim() && results.length === 0;

    return (
        <div className="feed-myprofile">
            <div className="user-search-container" ref={containerRef}>
                <div className="user-search-field">
                    <input
                        type="text"
                        placeholder="Search users..."
                        value={inputValue}
                        onChange={handleInput}
                        className="user-search-input"
                        aria-label="Search users"
                        aria-autocomplete="list"
                        aria-expanded={open}
                    />
                    {inputValue && (
                        <button
                            className="user-search-clear"
                            onMouseDown={handleClear}
                            aria-label="Clear search"
                        >
                            ×
                        </button>
                    )}
                </div>

                {open && (
                    <div className="user-search-dropdown" role="listbox">
                        {showSpinner && (
                            <p className="user-search-status">Searching…</p>
                        )}
                        {showNoResults && (
                            <p className="user-search-status">No users found</p>
                        )}
                        {!showSpinner && results.map((r) => (
                            <div
                                key={r.user_id}
                                className="user-search-result"
                                role="option"
                                onMouseDown={() => handleSelect(r.user_id)}
                            >
                                <img
                                    src={r.avatar || '/default-avatar.png'}
                                    alt={r.username}
                                    className="user-search-avatar"
                                />
                                <span className="user-search-name">{r.username}</span>
                            </div>
                        ))}
                    </div>
                )}
            </div>

            <div className="feed-myprofile-myinfo">
                <p className="feed-myprofile-myinfo-paragraph">{user?.username}</p>
                <img src={user?.avatar || '/default-avatar.png'} alt="avatar" />
                {!isOnFeed && (
                    <p className="feed-myprofile-myinfo-paragraph">
                        <Link to="/feed">← Back to Feed</Link>
                    </p>
                )}
                {isOwn && (
                    <>
                        <p className="feed-myprofile-myinfo-paragraph">
                            <Link to="/feed">My Feed</Link>
                        </p>
                        <p className="feed-myprofile-myinfo-paragraph">
                            <Link to="/feed?filter=mine">My stories</Link>
                        </p>
                        <p className="feed-myprofile-myinfo-paragraph">
                            <Link to="/settings">Account settings</Link>
                        </p>
                        {user?.is_admin && (
                            <p className="feed-myprofile-myinfo-paragraph">
                                <Link to="/reports">Reports</Link>
                            </p>
                        )}
                        <p className="feed-myprofile-myinfo-paragraph">
                            <button onClick={onLogout}>Logout</button>
                        </p>
                    </>
                )}
            </div>

            <div className="feed-myprofile-friends">
                <h4>Friends</h4>
                {user?.friends?.map((f: FriendInfo) => (
                    <Link key={f.user_id} to={`/user/${f.user_id}`} title={f.username}>
                        {f.is_active === false
                            ? <span className="deactivated-avatar">?</span>
                            : <img src={f.avatar || '/default-avatar.png'} alt={f.username} />}
                    </Link>
                ))}
            </div>

            <div className="feed-myprofile-coauthors">
                <h4>Co-authors</h4>
                {user?.coauthors?.map((c: FriendInfo) => (
                    <Link key={c.user_id} to={`/user/${c.user_id}`} title={c.username}>
                        {c.is_active === false
                            ? <span className="deactivated-avatar">?</span>
                            : <img src={c.avatar || '/default-avatar.png'} alt={c.username} />}
                    </Link>
                ))}
            </div>
        </div>
    );
}
