import { useState } from 'react';
import { Link, Route, Routes } from 'react-router-dom';
import api from '../../../api/axiosInstance';
import { useAuth } from '../../../context/AuthContext';
import GoodsRegistryAdd from './GoodsRegistryAdd';
import GoodsRegistryEdit from './GoodsRegistryEdit';
import { useEffect } from 'react';

const IS_FOOD_OPTIONS = [
    { value: '', label: 'All' },
    { value: 'true', label: 'Food' },
    { value: 'false', label: 'General' },
];

function GoodsRegistryList() {

useEffect(() => {
            document.title = 'Goods Registry - Warehouse App';
        }, []);

    const { user } = useAuth();
    const [filters, setFilters] = useState({ code: '', name: '', is_food: '', measuring_unit: '' });
    const [items, setItems] = useState([]);
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
            if (filters.code) params.code = filters.code;
            if (filters.name) params.name = filters.name;
            if (filters.is_food) params.is_food = filters.is_food;
            if (filters.measuring_unit) params.measuring_unit = filters.measuring_unit;
            const { data } = await api.get('/manager/goods', { params });
            setItems(data.items);
            setLoaded(true);
        } catch (err) {
            setError(err.response?.data?.error ?? 'Failed to load goods registry');
        }
    }

    return (
        <section>
            <h2>Goods Registry</h2>
            {user?.auth_edit_goods_registry && (
                <Link to="/goods/add" className="btn-primary">
                    Add New Item
                </Link>
            )}

            <form onSubmit={runSearch} className="lookup-form">
                <label>
                    Code
                    <input name="code" value={filters.code} onChange={handleFilterChange} placeholder="e.g. 100123" />
                </label>
                <label>
                    Name
                    <input name="name" value={filters.name} onChange={handleFilterChange} />
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
                    Measuring Unit
                    <input name="measuring_unit" value={filters.measuring_unit} onChange={handleFilterChange} />
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
                            <th>Type</th>
                            <th>Measuring Unit</th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        {items.map((item) => (
                            <tr key={item.code}>
                                <td>{item.code}</td>
                                <td>{item.name}</td>
                                <td>{item.is_food ? 'Food' : 'General'}</td>
                                <td>{item.measuring_unit}</td>
                                <td>{user?.auth_edit_goods_registry && <Link to={`/goods/edit/${item.code}`}>Edit</Link>}</td>
                            </tr>
                        ))}
                        {items.length === 0 && (
                            <tr>
                                <td colSpan={5}>No items found.</td>
                            </tr>
                        )}
                    </tbody>
                </table>
            )}
        </section>
    );
}

export default function GoodsRegistryDashboard() {
    return (
        <Routes>
            <Route index element={<GoodsRegistryList />} />
            <Route path="add" element={<GoodsRegistryAdd />} />
            <Route path="edit/:code" element={<GoodsRegistryEdit />} />
        </Routes>
    );
}
