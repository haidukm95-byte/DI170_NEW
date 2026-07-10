import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import api from '../../../api/axiosInstance';

export default function GoodsRegistryEdit() {

    useEffect(() => {
            document.title = 'Edit Item - Goods Registry - Warehouse App';
        }, []);

    const { code } = useParams();
    const navigate = useNavigate();

    const [form, setForm] = useState({ name: '', is_food: 'true', measuring_unit: '' });
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [success, setSuccess] = useState(false);

    useEffect(() => {
        let cancelled = false;
        api.get('/manager/goods', { params: { code } })
            .then(({ data }) => {
                if (cancelled) return;
                const item = data.items.find((i) => String(i.code) === String(code));
                if (item) {
                    setForm({ name: item.name, is_food: String(item.is_food), measuring_unit: item.measuring_unit });
                } else {
                    setError('Item not found');
                }
            })
            .catch((err) => {
                if (!cancelled) setError(err.response?.data?.error ?? 'Failed to load item');
            })
            .finally(() => {
                if (!cancelled) setLoading(false);
            });
        return () => {
            cancelled = true;
        };
    }, [code]);

    function handleChange(e) {
        const { name, value } = e.target;
        setForm((prev) => ({ ...prev, [name]: value }));
    }

    async function handleSubmit(e) {
        e.preventDefault();
        setError('');
        setSuccess(false);
        try {
            await api.put(`/manager/goods/${code}/edit`, {
                ...form,
                is_food: form.is_food === 'true',
            });
            setSuccess(true);
        } catch (err) {
            setError(err.response?.data?.error ?? 'Failed to update item');
        }
    }

    if (loading) return <p>Loading...</p>;

    return (
        <section>
            <h2>Edit Item {code}</h2>
            <form onSubmit={handleSubmit} className="entity-form">
                <label>
                    Name
                    <input name="name" value={form.name} onChange={handleChange} required />
                </label>
                <label>
                    Type
                    <select name="is_food" value={form.is_food} onChange={handleChange}>
                        <option value="true">Food</option>
                        <option value="false">General</option>
                    </select>
                </label>
                <label>
                    Measuring Unit
                    <input name="measuring_unit" value={form.measuring_unit} onChange={handleChange} required />
                </label>
                {error && (
                    <p role="alert" className="form-error">
                        {error}
                    </p>
                )}
                {success && <p className="form-success">Item updated.</p>}
                <div className="form-actions">
                    <button type="submit">Save Changes</button>
                    <button type="button" className="btn-secondary" onClick={() => navigate('/goods')}>
                        Back
                    </button>
                </div>
            </form>
        </section>
    );
}
