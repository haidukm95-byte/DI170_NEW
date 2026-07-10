import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../../../api/axiosInstance';
import { useAuth } from '../../../context/AuthContext';

const OPERATION_CODES = [
    { code: 10, name: 'Received from the outside supplier' },
    { code: 11, name: 'Refused receiving by incompatibility' },
    { code: 12, name: 'Refused receiving by expiry' },
    { code: 13, name: 'Refused receiving by damage' },
    { code: 14, name: 'Refused receiving by hazard' },
    { code: 20, name: 'Departed' },
    { code: 21, name: 'Departure returned by incompatibility' },
    { code: 22, name: 'Departure returned by expiry' },
    { code: 23, name: 'Departure returned by damage' },
    { code: 24, name: 'Departure returned by hazard' },
    { code: 32, name: 'Utilized by expiry' },
    { code: 33, name: 'Utilized by damage' },
    { code: 34, name: 'Utilized by hazard' },
    { code: 35, name: 'Utilized by theft' },
    { code: 36, name: 'Utilized by other reason' },
];

const EMPTY_FORM = { code: '', quantity: '', operation_code: String(OPERATION_CODES[0].code) };

export default function LogOperationsWorker() {

    useEffect(() => {
            document.title = 'New Operation - Warehouse App';
        }, []); 

    const { user } = useAuth();
    const [form, setForm] = useState(EMPTY_FORM);
    const [error, setError] = useState('');
    const [success, setSuccess] = useState(null);
    const navigate = useNavigate();

    if (!user?.auth_receive) {
        return <p role="alert">You are not authorized to log receiving/dispatch operations.</p>;
    }

    function handleChange(e) {
        const { name, value } = e.target;
        setForm((prev) => ({ ...prev, [name]: value }));
    }

    async function handleSubmit(e) {
        e.preventDefault();
        setError('');
        setSuccess(null);
        try {
            const { data } = await api.post('/manager/logistics/new', {
                code: Number(form.code),
                quantity: Number(form.quantity),
                operation_code: Number(form.operation_code),
            });
            setSuccess(data.operation);
            setForm(EMPTY_FORM);
        } catch (err) {
            setError(err.response?.data?.error ?? 'Failed to log operation');
        }
    }

    return (
        <section>
            <h2>New Logistics Operation</h2>
            <form onSubmit={handleSubmit} className="entity-form">
                <label>
                    Goods Code
                    <input name="code" type="number" value={form.code} onChange={handleChange} required />
                </label>
                <label>
                    Quantity
                    <input name="quantity" type="number" step="0.001" value={form.quantity} onChange={handleChange} required />
                </label>
                <label>
                    Operation
                    <select name="operation_code" value={form.operation_code} onChange={handleChange}>
                        {OPERATION_CODES.map((o) => (
                            <option key={o.code} value={o.code}>
                                {o.code} — {o.name}
                            </option>
                        ))}
                    </select>
                </label>
                {error && (
                    <p role="alert" className="form-error">
                        {error}
                    </p>
                )}
                {success && <p className="form-success">Logged operation #{success.operation_id}.</p>}
                <div className="form-actions">
                    <button type="submit">Log Operation</button>
                    <button type="button" className="btn-secondary" onClick={() => navigate('/logistics')}>
                        Back
                    </button>
                </div>
            </form>
        </section>
    );
}
