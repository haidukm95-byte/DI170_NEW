import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../../../api/axiosInstance';
import { useEffect } from 'react';

const EMPTY_FORM = { code: '', name: '', is_food: 'true', measuring_unit: '' };

export default function GoodsRegistryAdd() {
    useEffect(() => {
            document.title = 'New Item - Goods Registry - Warehouse App';
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
            const { data } = await api.post('/manager/goods/new', {
                ...form,
                code: Number(form.code),
                is_food: form.is_food === 'true',
            });
            setSuccess(data.item);
            setForm(EMPTY_FORM);
        } catch (err) {
            setError(err.response?.data?.error ?? 'Failed to add item');
        }
    }

    return (
        <section>
            <h2>Add New Item</h2>
            <form onSubmit={handleSubmit} className="entity-form">
                <label>
                    Code
                    <input name="code" type="number" value={form.code} onChange={handleChange} placeholder="100000-999999" required />
                </label>
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
                {success && (
                    <p className="form-success">
                        Added {success.name} (code {success.code}).
                    </p>
                )}
                <div className="form-actions">
                    <button type="submit">Add Item</button>
                    <button type="button" className="btn-secondary" onClick={() => navigate('/goods')}>
                        Back
                    </button>
                </div>
            </form>
        </section>
    );
}
