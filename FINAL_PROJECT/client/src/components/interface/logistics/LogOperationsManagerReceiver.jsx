import { useMemo, useState, useEffect} from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../../../api/axiosInstance';
import { useAuth } from '../../../context/AuthContext';

// Codes 10-14 are receiving operations, gated by auth_receive at the
// database level (check_receive_authorization trigger). Everything else
// (departures, utilization) is open to any authenticated employee.
const OPERATION_CODES = [
    { code: 10, name: 'Received from the outside supplier', requiresReceive: true },
    { code: 11, name: 'Refused receiving by incompatibility', requiresReceive: true },
    { code: 12, name: 'Refused receiving by expiry', requiresReceive: true },
    { code: 13, name: 'Refused receiving by damage', requiresReceive: true },
    { code: 14, name: 'Refused receiving by hazard', requiresReceive: true },
    { code: 20, name: 'Departed', requiresReceive: false },
    { code: 21, name: 'Departure returned by incompatibility', requiresReceive: false },
    { code: 22, name: 'Departure returned by expiry', requiresReceive: false },
    { code: 23, name: 'Departure returned by damage', requiresReceive: false },
    { code: 24, name: 'Departure returned by hazard', requiresReceive: false },
    { code: 32, name: 'Utilized by expiry', requiresReceive: false },
    { code: 33, name: 'Utilized by damage', requiresReceive: false },
    { code: 34, name: 'Utilized by hazard', requiresReceive: false },
    { code: 35, name: 'Utilized by theft', requiresReceive: false },
    { code: 36, name: 'Utilized by other reason', requiresReceive: false },
];

export default function LogOperationsManagerReceiver() {

    useEffect(() => {
            document.title = 'New Operation - Logistics - Warehouse App';
        }, []);

    const { user } = useAuth();
    const availableCodes = useMemo(
        () => OPERATION_CODES.filter((o) => !o.requiresReceive || user?.auth_receive),
        [user?.auth_receive]
    );
    const [form, setForm] = useState({ code: '', quantity: '', operation_code: String(availableCodes[0].code) });
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
            const { data } = await api.post('/operations/logistics/new', {
                code: Number(form.code),
                quantity: Number(form.quantity),
                operation_code: Number(form.operation_code),
            });
            setSuccess(data.operation);
            setForm({ code: '', quantity: '', operation_code: String(availableCodes[0].code) });
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
                        {availableCodes.map((o) => (
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
