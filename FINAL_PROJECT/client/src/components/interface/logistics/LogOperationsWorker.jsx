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
    const [rows, setRows] = useState([{ ...EMPTY_FORM, saved: false }]);
    const [error, setError] = useState('');
    const [success, setSuccess] = useState(null);
    const navigate = useNavigate();

    if (!user?.auth_receive) {
        return <p role="alert">You are not authorized to log receiving/dispatch operations.</p>;
    }

    function handleRowChange(index, e) {
        const { name, value } = e.target;
        setRows((prev) => prev.map((row, i) => (i === index ? { ...row, [name]: value } : row)));
    }

    // Next only stages the row locally (locks its inputs) and opens a new
    // one — nothing is sent to the backend until "Log Operation" submits
    // everything that's been entered at once. Every row shares the
    // operation type chosen on the first row, so it isn't re-picked here.
    function handleNextRow(index) {
        const row = rows[index];
        if (!row.code || !row.quantity) {
            setError('Fill in the goods code and quantity before adding the next operation.');
            return;
        }
        setError('');
        setRows((prev) => [
            ...prev.map((r, i) => (i === index ? { ...r, saved: true } : r)),
            { ...EMPTY_FORM, saved: false, operation_code: prev[0].operation_code },
        ]);
    }

    function handleRemoveRow(index) {
        setRows((prev) => {
            const next = prev.filter((_, i) => i !== index);
            return next.length === 0 ? [{ ...EMPTY_FORM, saved: false }] : next;
        });
    }

    async function handleSubmit(e) {
        e.preventDefault();
        setError('');
        setSuccess(null);

        const entries = rows.filter((row) => row.code !== '' && row.quantity !== '');
        if (entries.length === 0) {
            setError('Enter at least one operation before logging.');
            return;
        }

        try {
            const results = await Promise.all(
                entries.map((row) =>
                    api.post('/manager/logistics/new', {
                        code: Number(row.code),
                        quantity: Number(row.quantity),
                        operation_code: Number(row.operation_code),
                    })
                )
            );
            setSuccess(results.map((res) => res.data.operation));
            setRows([{ ...EMPTY_FORM, saved: false }]);
        } catch (err) {
            setError(err.response?.data?.error ?? 'Failed to log operation');
        }
    }

    return (
        <section>
            <h2>New Logistics Operation</h2>
            <form onSubmit={handleSubmit} className="entity-form entity-form--logistics">
                {rows.map((row, index) => (
                    <div className="operation-row" key={index}>
                        <label>
                            Goods Code
                            <input
                                name="code"
                                type="number"
                                value={row.code}
                                onChange={(e) => handleRowChange(index, e)}
                                disabled={row.saved}
                                required
                            />
                        </label>
                        <label>
                            Quantity
                            <input
                                name="quantity"
                                type="number"
                                step="0.001"
                                value={row.quantity}
                                onChange={(e) => handleRowChange(index, e)}
                                disabled={row.saved}
                                required
                            />
                        </label>
                        <label>
                            Operation
                            <select
                                name="operation_code"
                                value={row.operation_code}
                                onChange={(e) => handleRowChange(index, e)}
                                disabled={row.saved || index > 0}
                            >
                                {OPERATION_CODES.map((o) => (
                                    <option key={o.code} value={o.code}>
                                        {o.code} — {o.name}
                                    </option>
                                ))}
                            </select>
                        </label>
                        <div className="operation-row-actions">
                            {!row.saved && (
                                <button type="button" onClick={() => handleNextRow(index)}>
                                    Next
                                </button>
                            )}
                            <button type="button" className="btn-secondary" onClick={() => handleRemoveRow(index)}>
                                Remove
                            </button>
                        </div>
                    </div>
                ))}
                {error && (
                    <p role="alert" className="form-error">
                        {error}
                    </p>
                )}
                {success && (
                    <p className="form-success">
                        Logged {success.length} operation{success.length === 1 ? '' : 's'}: {success.map((o) => `#${o.operation_id}`).join(', ')}.
                    </p>
                )}
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
