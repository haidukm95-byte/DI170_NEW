import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import api from '../../../../api/axiosInstance';

const OCCUPATIONS = [
    { code: 1, name: 'Manager' },
    { code: 2, name: 'Receiver' },
    { code: 3, name: 'General worker' },
];

export default function UpdateNewEmployee() {

    useEffect(() => {
            document.title = 'Update Employee - Warehouse App';
        }, []);

    const { id } = useParams();
    const navigate = useNavigate();

    const [profileForm, setProfileForm] = useState({ gov_id: '', full_name: '', date_of_birth: '', password: '' });
    const [occupationCode, setOccupationCode] = useState('2');
    const [returnOccupationCode, setReturnOccupationCode] = useState('2');
    const [message, setMessage] = useState('');
    const [error, setError] = useState('');

    function handleProfileChange(e) {
        const { name, value } = e.target;
        setProfileForm((prev) => ({ ...prev, [name]: value }));
    }

    async function runAction(action) {
        setError('');
        setMessage('');
        try {
            const employee = await action();
            setMessage(`Updated employee ${employee.full_name} (ID ${employee.personnel_id}).`);
        } catch (err) {
            setError(err.response?.data?.error ?? 'Action failed');
        }
    }

    function handleEditProfile(e) {
        e.preventDefault();
        return runAction(async () => {
            const { data } = await api.put(`/manager/employees/${id}/edit`, {
                ...profileForm,
                gov_id: Number(profileForm.gov_id),
            });
            return data.employee;
        });
    }

    function handleChangeOccupation(e) {
        e.preventDefault();
        return runAction(async () => {
            const { data } = await api.patch(`/manager/employees/${id}/occupation`, {
                occupation_code: Number(occupationCode),
            });
            return data.employee;
        });
    }

    function handleDismiss() {
        if (!window.confirm('Dismiss this employee?')) return undefined;
        return runAction(async () => {
            const { data } = await api.patch(`/manager/employees/${id}/dismiss`);
            return data.employee;
        });
    }

    function handleReturn(e) {
        e.preventDefault();
        return runAction(async () => {
            const { data } = await api.patch(`/manager/employees/${id}/return`, {
                occupation_code: Number(returnOccupationCode),
            });
            return data.employee;
        });
    }

    return (
        <section>
            <h2>Manage Employee #{id}</h2>
            {message && <p className="form-success">{message}</p>}
            {error && (
                <p role="alert" className="form-error">
                    {error}
                </p>
            )}

            <form onSubmit={handleEditProfile} className="entity-form">
                <h3>Edit Profile</h3>
                <p className="form-hint">All fields overwrite the employee&apos;s current profile.</p>
                <label>
                    Gov ID
                    <input name="gov_id" type="number" value={profileForm.gov_id} onChange={handleProfileChange} required />
                </label>
                <label>
                    Full Name
                    <input name="full_name" value={profileForm.full_name} onChange={handleProfileChange} required />
                </label>
                <label>
                    Date of Birth
                    <input name="date_of_birth" type="date" value={profileForm.date_of_birth} onChange={handleProfileChange} required />
                </label>
                <label>
                    New Password
                    <input name="password" type="password" value={profileForm.password} onChange={handleProfileChange} required />
                </label>
                <button type="submit">Save Profile</button>
            </form>

            <form onSubmit={handleChangeOccupation} className="entity-form">
                <h3>Change Occupation</h3>
                <label>
                    Occupation
                    <select value={occupationCode} onChange={(e) => setOccupationCode(e.target.value)}>
                        {OCCUPATIONS.map((o) => (
                            <option key={o.code} value={o.code}>
                                {o.name}
                            </option>
                        ))}
                    </select>
                </label>
                <button type="submit">Change Occupation</button>
            </form>

            <div className="entity-form">
                <h3>Dismiss</h3>
                <button type="button" className="btn-danger" onClick={handleDismiss}>
                    Dismiss Employee
                </button>
            </div>

            <form onSubmit={handleReturn} className="entity-form">
                <h3>Return Dismissed Employee</h3>
                <label>
                    Occupation on Return
                    <select value={returnOccupationCode} onChange={(e) => setReturnOccupationCode(e.target.value)}>
                        {OCCUPATIONS.map((o) => (
                            <option key={o.code} value={o.code}>
                                {o.name}
                            </option>
                        ))}
                    </select>
                </label>
                <button type="submit">Return Employee</button>
            </form>

            <button type="button" className="btn-secondary" onClick={() => navigate('/personnel')}>
                Back
            </button>
        </section>
    );
}
