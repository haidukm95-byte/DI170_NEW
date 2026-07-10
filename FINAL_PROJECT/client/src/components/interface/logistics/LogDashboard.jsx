import { useState, useEffect } from 'react';
import { Link, Route, Routes } from 'react-router-dom';
import api from '../../../api/axiosInstance';
import LogOperationsManagerReceiver from './LogOperationsManagerReceiver';

const IS_FOOD_OPTIONS = [
    { value: '', label: 'All' },
    { value: 'true', label: 'Food' },
    { value: 'false', label: 'General' },
];

const EMPTY_FILTERS = { code: '', name: '', operation_code: '', is_food: '', responsible_id: '', date: '' };

function LogisticsList() {

    useEffect(() => {
            document.title = 'Logistics - Warehouse App';
        }, []);
    const [filters, setFilters] = useState(EMPTY_FILTERS);
    const [items, setItems] = useState([]);
    const [reportDrafts, setReportDrafts] = useState({});
    const [error, setError] = useState('');
    const [loaded, setLoaded] = useState(false);

    function handleFilterChange(e) {
        const { name, value } = e.target;
        setFilters((prev) => ({ ...prev, [name]: value }));
    }

    async function runSearch(e) {
        if (e) e.preventDefault();
        setError('');
        try {
            const params = {};
            Object.entries(filters).forEach(([key, value]) => {
                if (value) params[key] = value;
            });
            const { data } = await api.get('/manager/logistics', { params });
            setItems(data.items);
            setReportDrafts(Object.fromEntries(data.items.map((i) => [i.operation_id, i.report ?? ''])));
            setLoaded(true);
        } catch (err) {
            setError(err.response?.data?.error ?? 'Failed to load logistics');
        }
    }

    async function handleSaveReport(operationId) {
        setError('');
        try {
            const { data } = await api.put(`/manager/logistics/${operationId}/report`, {
                report: reportDrafts[operationId] ?? '',
            });
            setItems((prev) => prev.map((i) => (i.operation_id === operationId ? data.item : i)));
        } catch (err) {
            setError(err.response?.data?.error ?? 'Failed to save report');
        }
    }

    return (
        <section>
            <h2>Logistics</h2>
            <Link to="/logistics/new" className="btn-primary">
                New Operation
            </Link>

            <form onSubmit={runSearch} className="lookup-form">
                <label>
                    Code
                    <input name="code" value={filters.code} onChange={handleFilterChange} />
                </label>
                <label>
                    Name
                    <input name="name" value={filters.name} onChange={handleFilterChange} />
                </label>
                <label>
                    Operation Code
                    <input name="operation_code" value={filters.operation_code} onChange={handleFilterChange} placeholder="e.g. 10" />
                </label>
                <label>
                    Type
                    <select name="is_food" value={filters.is_food} onChange={handleFilterChange}>
                        {IS_FOOD_OPTIONS.map((o) => (
                            <option key={o.value} value={o.value}>
                                {o.label}
                            </option>
                        ))}
                    </select>
                </label>
                <label>
                    Responsible ID
                    <input name="responsible_id" value={filters.responsible_id} onChange={handleFilterChange} />
                </label>
                <label>
                    Date
                    <input name="date" type="date" value={filters.date} onChange={handleFilterChange} />
                </label>
                <button type="submit">Search</button>
            </form>

            {error && (
                <p role="alert" className="form-error">
                    {error}
                </p>
            )}

            {loaded && (
                <table className="data-table">
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Code</th>
                            <th>Name</th>
                            <th>Qty</th>
                            <th>Operation</th>
                            <th>Responsible</th>
                            <th>Date</th>
                            <th>Report</th>
                        </tr>
                    </thead>
                    <tbody>
                        {items.map((item) => (
                            <tr key={item.operation_id}>
                                <td>{item.operation_id}</td>
                                <td>{item.code}</td>
                                <td>{item.name}</td>
                                <td>{item.quantity}</td>
                                <td>{item.operation_name}</td>
                                <td>{item.responsible_id}</td>
                                <td>{item.date_and_time}</td>
                                <td>
                                    <div className="inline-report">
                                        <input
                                            value={reportDrafts[item.operation_id] ?? ''}
                                            onChange={(e) =>
                                                setReportDrafts((prev) => ({ ...prev, [item.operation_id]: e.target.value }))
                                            }
                                        />
                                        <button type="button" onClick={() => handleSaveReport(item.operation_id)}>
                                            Save
                                        </button>
                                    </div>
                                </td>
                            </tr>
                        ))}
                        {items.length === 0 && (
                            <tr>
                                <td colSpan={8}>No operations found.</td>
                            </tr>
                        )}
                    </tbody>
                </table>
            )}
        </section>
    );
}

export default function LogDashboard() {
    return (
        <Routes>
            <Route index element={<LogisticsList />} />
            <Route path="new" element={<LogOperationsManagerReceiver />} />
        </Routes>
    );
}
