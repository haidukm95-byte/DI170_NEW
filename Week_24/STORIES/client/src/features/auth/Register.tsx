import { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate, Link } from 'react-router-dom';
import { register } from './authSlice';
import api from '../../api/axios';
import type { AppDispatch } from '../../app/store';

function useAvailability(field: 'username' | 'email', value: string) {
    const [available, setAvailable] = useState<boolean | null>(null);
    useEffect(() => {
        if (!value) return;
        const timer = setTimeout(async () => {
            const res = await api.get(`/auth/check?field=${field}&value=${value}`);
            setAvailable(res.data.available);
        }, 400);  // debounce
        return () => clearTimeout(timer);
    }, [value]);
    return available;
}

export default function Register() {
    const dispatch = useDispatch<AppDispatch>();
    const navigate = useNavigate();
    const [form, setForm] = useState({ username: '', email: '', password: '' });

    const usernameAvailable = useAvailability('username', form.username);
    const emailAvailable = useAvailability('email', form.email);

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const result = await dispatch(register(form));
        if (register.fulfilled.match(result)) navigate('/feed');
    };

    return (
        <div className="auth-page">
            <form onSubmit={handleSubmit}>
                <input type="text" placeholder="Create your username"
                    onChange={e => setForm({ ...form, username: e.target.value })} />
                {form.username && <span>{usernameAvailable === null ? '...' : usernameAvailable ? 'Available' : 'Not available'}</span>}

                <input type="email" placeholder="Enter your email"
                    onChange={e => setForm({ ...form, email: e.target.value })} />
                {form.email && <span>{emailAvailable === null ? '...' : emailAvailable ? 'Available' : 'Not available'}</span>}

                <input type="password" placeholder="Create your password"
                    onChange={e => setForm({ ...form, password: e.target.value })} />

                <button type="submit" disabled={!usernameAvailable || !emailAvailable}>Register</button>
                <p>Have already an account? <Link to="/login">Log in</Link></p>
            </form>
        </div>
    );
}