import { useState, useEffect} from 'react';
import api from '../../../api/axiosInstance';

const EMPTY_FILTERS = { code: '', name: '', measuring_unit: '' };

export default function InventoryFoods() {

    useEffect(() => {
            document.title = 'Foods Inventory - Warehouse App';
        }, []);

    const [filters, setFilters] = useState(EMPTY_FILTERS);
    const [items, setItems] = useState([]);
    const [error, setError] = useState('');
    const [loaded, setLoaded] = useState(false);

    function handleChange(e) {
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
            const { data } = await api.get('/manager/inventory/foods', { params });
            setItems(data.items);
            setLoaded(true);
        } catch (err) {
            setError(err.response?.data?.error ?? 'Failed to load foods inventory');
        }
    }

    return (
        <section>
            <h2>Foods Inventory</h2>
            <form onSubmit={runSearch} className="lookup-form">
                <label>
                    Code
                    <input name="code" value={filters.code} onChange={handleChange} />
                </label>
                <label>
                    Name
                    <input name="name" value={filters.name} onChange={handleChange} />
                </label>
                <label>
                    Measuring Unit
                    <input name="measuring_unit" value={filters.measuring_unit} onChange={handleChange} />
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
                            <th>Code</th>
                            <th>Name</th>
                            <th>Measuring Unit</th>
                            <th>Quantity</th>
                        </tr>
                    </thead>
                    <tbody>
                        {items.map((item) => (
                            <tr key={item.code}>
                                <td>{item.code}</td>
                                <td>{item.name}</td>
                                <td>{item.measuring_unit}</td>
                                <td>{item.quantity}</td>
                            </tr>
                        ))}
                        {items.length === 0 && (
                            <tr>
                                <td colSpan={4}>No items found.</td>
                            </tr>
                        )}
                    </tbody>
                </table>
            )}
        </section>
    );
}
