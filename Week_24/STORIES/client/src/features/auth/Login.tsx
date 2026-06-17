import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, Link } from 'react-router-dom';
import { login } from './authSlice';
import type { AppDispatch, RootState } from '../../app/store';

export default function Login() {
    const dispatch = useDispatch<AppDispatch>();
    const navigate = useNavigate();
    const { loading, error } = useSelector((s: RootState) => s.auth);
    const [form, setForm] = useState({ identifier: '', password: '', stayLoggedIn: false });

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const result = await dispatch(login(form));
        if (login.fulfilled.match(result)) navigate('/feed');
    };

    return (
        <div className="auth-page">
        <form onSubmit={handleSubmit}>
            <input type="text" placeholder="Username or email"
                onChange={e => setForm({ ...form, identifier: e.target.value })} />
            <input type="password" placeholder="Enter your password"
                onChange={e => setForm({ ...form, password: e.target.value })} />
            <label>
                <input type="checkbox"
                    onChange={e => setForm({ ...form, stayLoggedIn: e.target.checked })} />
                Stay logged in
            </label>
            <button type="submit" disabled={loading}>Log in</button>
            {error && <p className="error">{error}</p>}
            <p>Don't have an account? <Link to="/register">Register</Link></p>
        </form>
        </div>
    );
}