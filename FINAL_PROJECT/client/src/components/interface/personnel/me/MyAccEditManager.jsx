import { useState, useEffect } from 'react';
import api from '../../../../api/axiosInstance';
import { useAuth } from '../../../../context/AuthContext';

export default function MyAccEditManager() {
    
    useEffect(()=>{
        document.title='My Account`s Settings - Warehouse App'
    }, [])

    const { user, refreshUser } = useAuth();
    const [form, setForm] = useState({
        gov_id: user?.gov_id ?? '',
        full_name: user?.full_name ?? '',
        date_of_birth: user?.date_of_birth ?? '',
        password: '',
    });
    const [error, setError] = useState('');
    const [success, setSuccess] = useState(false);

    function handleChange(e) {
        const { name, value } = e.target;
        setForm((prev) => ({ ...prev, [name]: value }));
    }

    async function handleSubmit(e) {
        e.preventDefault();
        setError('');
        setSuccess(false);
        try {
            await api.put('/manager/me/edit', {
                ...form,
                gov_id: Number(form.gov_id),
            });
            await refreshUser();
            setForm((prev) => ({ ...prev, password: '' }));
            setSuccess(true);
        } catch (err) {
            setError(err.response?.data?.error ?? 'Failed to update profile');
        }
    }

    return (
        <section>
            <h2>My Account</h2>
            <form onSubmit={handleSubmit} className="entity-form">
                <p className="form-hint">Saving requires re-entering your password (a new one, or the current one unchanged).</p>
                <label>
                    Gov ID
                    <input name="gov_id" type="number" value={form.gov_id} onChange={handleChange} required />
                </label>
                <label>
                    Full Name
                    <input name="full_name" value={form.full_name} onChange={handleChange} required />
                </label>
                <label>
                    Date of Birth
                    <input name="date_of_birth" type="date" value={form.date_of_birth} onChange={handleChange} required />
                </label>
                <label>
                    Password
                    <input name="password" type="password" value={form.password} onChange={handleChange} required />
                </label>
                {error && (
                    <p role="alert" className="form-error">
                        {error}
                    </p>
                )}
                {success && <p className="form-success">Profile updated.</p>}
                <button type="submit">Save Changes</button>
            </form>
        </section>
    );
}
