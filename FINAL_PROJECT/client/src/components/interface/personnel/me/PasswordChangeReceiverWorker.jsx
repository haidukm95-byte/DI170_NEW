import { useState, useEffect } from 'react';
import api from '../../../../api/axiosInstance';
import { useAuth } from '../../../../context/AuthContext';

const ALLOWED_OCCUPATION_CODES = [2, 3];

export default function PasswordChangeReceiverWorker() {

    useEffect(()=>{
        document.title='Change Password - Warehouse App'
    }, [])

    const { user } = useAuth();
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [success, setSuccess] = useState(false);

    if (!ALLOWED_OCCUPATION_CODES.includes(user?.occupation_code)) {
        return <p role="alert">Only receivers and general workers can change their password here.</p>;
    }

    async function handleSubmit(e) {
        e.preventDefault();
        setError('');
        setSuccess(false);
        try {
            await api.put('/operations/me/password', { password });
            setPassword('');
            setSuccess(true);
        } catch (err) {
            setError(err.response?.data?.error ?? 'Failed to update password');
        }
    }

    return (
        <section>
            <h2>Change Password</h2>
            <form onSubmit={handleSubmit} className="entity-form">
                <label>
                    New Password
                    <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
                </label>
                {error && (
                    <p role="alert" className="form-error">
                        {error}
                    </p>
                )}
                {success && <p className="form-success">Password updated.</p>}
                <button type="submit">Save Password</button>
            </form>
        </section>
    );
}
