import { useState, useRef, useEffect } from 'react';
import api from '../../api/axios';

interface UserResult {
    user_id: number;
    username: string;
    avatar: string;
}

interface Props {
    value: string[];
    onChange: (names: string[]) => void;
}

export default function CollabSearchInput({ value, onChange }: Props) {
    const [inputValue, setInputValue] = useState('');
    const [results, setResults] = useState<UserResult[]>([]);
    const [open, setOpen] = useState(false);
    const [isTyping, setIsTyping] = useState(false);

    const debounceRef = useRef<ReturnType<typeof setTimeout> | null>(null);
    const containerRef = useRef<HTMLDivElement>(null);
    const valueRef = useRef(value);
    useEffect(() => { valueRef.current = value; }, [value]);

    function handleInput(e: React.ChangeEvent<HTMLInputElement>) {
        const val = e.target.value;
        setInputValue(val);

        if (debounceRef.current) clearTimeout(debounceRef.current);

        if (!val.trim()) {
            setResults([]);
            setOpen(false);
            setIsTyping(false);
            return;
        }

        setOpen(true);
        setIsTyping(true);
        debounceRef.current = setTimeout(async () => {
            setIsTyping(false);
            const res = await api.get<UserResult[]>(
                `/users/search?q=${encodeURIComponent(val.trim())}`
            );
            setResults(res.data.filter((r) => !valueRef.current.includes(r.username)));
        }, 300);
    }

    function handleSelect(username: string) {
        if (!value.includes(username)) {
            onChange([...value, username]);
        }
        setInputValue('');
        setResults([]);
        setOpen(false);
        setIsTyping(false);
    }

    function handleRemove(username: string) {
        onChange(value.filter((n) => n !== username));
    }

    function handleClear() {
        if (debounceRef.current) clearTimeout(debounceRef.current);
        setInputValue('');
        setResults([]);
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

    const showSpinner = isTyping;
    const showNoResults = !showSpinner && open && inputValue.trim() && results.length === 0;

    return (
        <div className="collab-search-wrapper">
            {value.length > 0 && (
                <div className="collab-chips">
                    {value.map((name) => (
                        <span key={name} className="collab-chip">
                            {name}
                            <button
                                type="button"
                                className="collab-chip-remove"
                                onClick={() => handleRemove(name)}
                                aria-label={`Remove ${name}`}
                            >
                                ×
                            </button>
                        </span>
                    ))}
                </div>
            )}

            <div className="user-search-container" ref={containerRef}>
                <div className="user-search-field">
                    <input
                        type="text"
                        placeholder={value.length ? 'Add more collaborators…' : 'Search collaborators…'}
                        value={inputValue}
                        onChange={handleInput}
                        className="user-search-input"
                        aria-label="Search collaborators"
                        aria-autocomplete="list"
                        aria-expanded={open}
                    />
                    {inputValue && (
                        <button
                            type="button"
                            className="user-search-clear"
                            onMouseDown={handleClear}
                            aria-label="Clear"
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
                                onMouseDown={() => handleSelect(r.username)}
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
        </div>
    );
}
