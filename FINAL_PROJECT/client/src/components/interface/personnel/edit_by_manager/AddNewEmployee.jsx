import { useState, useEffect} from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../../../../api/axiosInstance';

const OCCUPATIONS = [
    { code: 1, name: 'Manager' },
    { code: 2, name: 'Receiver' },
    { code: 3, name: 'General worker' },
];

const EMPTY_FORM = { gov_id: '', full_name: '', date_of_birth: '', occupation_code: '2', password: '' };

export default function AddNewEmployee() {

    useEffect(() => {
            document.title = 'New Employee - Warehouse App';
        }, []);

    const [form, setForm] = useState(EMPTY_FORM);
    const [error, setError] = useState('');
    const [success, setSuccess] = useState(null);
    const navigate = useNavigate();

    function handleChange(e) {
        const { name, value } = e.target;
        setForm((prev) => ({ ...prev, [name]: value }));
    }

    async function handleSubmit(e) {
        e.preventDefault();
        setError('');
        setSuccess(null);
        try {
            const { data } = await api.post('/manager/employees/add', {
                ...form,
                gov_id: Number(form.gov_id),
                occupation_code: Number(form.occupation_code),
            });
            setSuccess(data.employee);
            setForm(EMPTY_FORM);
        } catch (err) {
            setError(err.response?.data?.error ?? 'Failed to add employee');
        }
    }

    return (
        <section>
            <h2>Add New Employee</h2>
            <form onSubmit={handleSubmit} className="entity-form">
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
                    Occupation
                    <select name="occupation_code" value={form.occupation_code} onChange={handleChange}>
                        {OCCUPATIONS.map((o) => (
                            <option key={o.code} value={o.code}>
                                {o.name}
                            </option>
                        ))}
                    </select>
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
                {success && (
                    <p className="form-success">
                        Added {success.full_name} (ID {success.personnel_id}).
                    </p>
                )}
                <div className="form-actions">
                    <button type="submit">Add Employee</button>
                    <button type="button" className="btn-secondary" onClick={() => navigate('/personnel')}>
                        Back
                    </button>
                </div>
            </form>
        </section>
    );
}
