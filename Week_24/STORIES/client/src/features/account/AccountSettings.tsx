import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import type { AppDispatch, RootState } from '../../app/store';
import { logout } from '../auth/authSlice';
import {
    updateUsername,
    updateAvatar,
    updatePassword,
    setPrivacy,
    deactivateAccount,
    clearAccountStatus,
} from './accountSlice';
import LeftSidebar from '../../components/LeftSidebar';

export default function AccountSettings() {
    const dispatch = useDispatch<AppDispatch>();
    const navigate = useNavigate();

    const { user } = useSelector((s: RootState) => s.auth);
    const { loading, error, success } = useSelector((s: RootState) => s.account);

    const [username, setUsername] = useState('');
    const [avatarDataUrl, setAvatarDataUrl] = useState<string | null>(null);
    const [avatarPreview, setAvatarPreview] = useState<string | null>(null);
    const [currentPassword, setCurrentPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');

    const handleLogout = () => {
        dispatch(logout());
        navigate('/login');
    };

    const handleUpdateUsername = (e: React.SyntheticEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (!username.trim()) return;
        dispatch(clearAccountStatus());
        dispatch(updateUsername(username));
        setUsername('');
    };

    const handleAvatarFile = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;
        if (file.size > 2 * 1024 * 1024) {
            alert('Image must be under 2 MB');
            e.target.value = '';
            return;
        }
        const reader = new FileReader();
        reader.onload = () => {
            const dataUrl = reader.result as string;
            setAvatarDataUrl(dataUrl);
            setAvatarPreview(dataUrl);
        };
        reader.readAsDataURL(file);
    };

    const handleUpdateAvatar = (e: React.SyntheticEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (!avatarDataUrl) return;
        dispatch(clearAccountStatus());
        dispatch(updateAvatar(avatarDataUrl));
        setAvatarDataUrl(null);
        setAvatarPreview(null);
    };

    const handleUpdatePassword = (e: React.SyntheticEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (!currentPassword || !newPassword) return;
        dispatch(clearAccountStatus());
        dispatch(updatePassword({ currentPassword, newPassword }));
        setCurrentPassword('');
        setNewPassword('');
    };

    const handleSetPrivacy = (e: React.ChangeEvent<HTMLInputElement>) => {
        dispatch(clearAccountStatus());
        dispatch(setPrivacy(e.target.checked));
    };

    const handleDeactivate = async () => {
        if (!window.confirm('Deactivate your account? You will be logged out.')) return;
        const result = await dispatch(deactivateAccount());
        if (deactivateAccount.fulfilled.match(result)) {
            dispatch(logout());
            navigate('/login');
        }
    };

    return (
        <div className="feed-layout">
            <LeftSidebar user={user} onLogout={handleLogout} isOwn={true} />

            <div className="acc-settings-main">
                <h2>Account Settings</h2>

                {error && <p className="msg error">{error}</p>}
                {success && <p className="msg success">{success}</p>}

                <section className="settings-section">
                    <h3>Change Username</h3>
                    <form onSubmit={handleUpdateUsername}>
                        <input
                            type="text"
                            placeholder="New username"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                        />
                        <button type="submit" disabled={loading}>Update</button>
                    </form>
                </section>

                <section className="settings-section">
                    <h3>Change Avatar</h3>
                    <form onSubmit={handleUpdateAvatar}>
                        <label className="avatar-file-label">
                            Choose image
                            <input
                                type="file"
                                accept="image/*"
                                onChange={handleAvatarFile}
                                className="avatar-file-input"
                            />
                        </label>
                        {avatarPreview && (
                            <img src={avatarPreview} alt="Preview" className="avatar-preview" />
                        )}
                        <button type="submit" disabled={loading || !avatarDataUrl}>Update</button>
                    </form>
                </section>

                <section className="settings-section">
                    <h3>Change Password</h3>
                    <form onSubmit={handleUpdatePassword}>
                        <input
                            type="password"
                            placeholder="Current password"
                            value={currentPassword}
                            onChange={(e) => setCurrentPassword(e.target.value)}
                        />
                        <input
                            type="password"
                            placeholder="New password"
                            value={newPassword}
                            onChange={(e) => setNewPassword(e.target.value)}
                        />
                        <button type="submit" disabled={loading}>Update</button>
                    </form>
                </section>

                <section className="settings-section">
                    <h3>Profile Visibility</h3>
                    <label>
                        <input
                            type="checkbox"
                            checked={user?.is_private ?? false}
                            onChange={handleSetPrivacy}
                            disabled={loading}
                        />
                        {' '}Make profile private
                    </label>
                </section>

                <section className="settings-section">
                    <h3>Deactivate Account</h3>
                    <p>Your profile and stories will be hidden. You will be logged out.</p>
                    <button
                        className="btn-danger"
                        onClick={handleDeactivate}
                        disabled={loading}
                    >
                        Deactivate Account
                    </button>
                </section>
            </div>
        </div>
    );
}
