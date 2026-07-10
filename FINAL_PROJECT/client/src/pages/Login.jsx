import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export default function Login() {
    const [govId, setGovId] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const { login } = useAuth();
    const navigate = useNavigate();

    useEffect(() => {
        document.title = 'Sign in - Warehouse App';
    }, []);

    async function handleSubmit(e) {
        e.preventDefault();
        setError('');
        try {
            await login(govId, password);
            navigate('/');
        } catch {
            setError('Invalid credentials');
        }
    }

    return (
        <form className='login' onSubmit={handleSubmit}>
            <h2 id='login-header'>WAREHOUSE INVENTORY & OPERATIONS</h2>
            <h2 id='login-sub_header'>Log in to your account...</h2>
            <label>
                Gov ID
                <input className='login-gov_id_input' value={govId} onChange={(e) => setGovId(e.target.value)} />
            </label>
            <label>
                Password
                <input className='login-password_input' type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
            </label>
            {error && <p role="alert">{error}</p>}
            <button className='login-submit' type="submit">Log in</button>
        </form>
    );
}
