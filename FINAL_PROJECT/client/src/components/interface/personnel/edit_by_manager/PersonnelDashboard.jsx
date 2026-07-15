import { useState, useEffect } from 'react';
import { Link, Route, Routes } from 'react-router-dom';
import api from '../../../../api/axiosInstance';
import { useAuth } from '../../../../context/AuthContext';
import AddNewEmployee from './AddNewEmployee';
import UpdateNewEmployee from './UpdateNewEmployee';

const OCCUPATION_NAMES = { 1: 'Manager', 2: 'Receiver', 3: 'General worker' };

const IS_ACTIVE_OPTIONS = [
    { value: '', label: 'All' },
    { value: 'true', label: 'Active' },
    { value: 'false', label: 'Dismissed' },
];

const EMPTY_FILTERS = { gov_id: '', full_name: '', date_of_birth: '', occupation_code: '', isactive: '' };

function PersonnelList() {

    useEffect(() => {
            document.title = 'Personnel - Warehouse App';
        }, []);

    const { user } = useAuth();
    const [filters, setFilters] = useState(EMPTY_FILTERS);
    const [employees, setEmployees] = useState([]);
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
            const { data } = await api.get('/manager/employees', { params });
            setEmployees(data.employees);
            setLoaded(true);
        } catch (err) {
            setError(err.response?.data?.error ?? 'Failed to load employees');
        }
    }

    return (
        <section>
            <h2>Personnel</h2>
            <Link to="/personnel/add" className="btn-primary">
                Add New Employee
            </Link>

            <form onSubmit={runSearch} className="lookup-form">
                <label>
                    Gov ID
                    <input name="gov_id" value={filters.gov_id} onChange={handleFilterChange} />
                </label>
                <label>
                    Full Name
                    <input name="full_name" value={filters.full_name} onChange={handleFilterChange} />
                </label>
                <label>
                    Date of Birth
                    <input name="date_of_birth" type="date" value={filters.date_of_birth} onChange={handleFilterChange} />
                </label>
                <label>
                    Occupation
                    <select name="occupation_code" value={filters.occupation_code} onChange={handleFilterChange}>
                        <option value="">All</option>
                        {Object.entries(OCCUPATION_NAMES).map(([code, name]) => (
                            <option key={code} value={code}>
                                {name}
                            </option>
                        ))}
                    </select>
                </label>
                <label>
                    Status
                    <select name="isactive" value={filters.isactive} onChange={handleFilterChange}>
                        {IS_ACTIVE_OPTIONS.map((o) => (
                            <option key={o.value} value={o.value}>
                                {o.label}
                            </option>
                        ))}
                    </select>
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
                            <th>Gov ID</th>
                            <th>Full Name</th>
                            <th>Date of Birth</th>
                            <th>Occupation</th>
                            <th>Status</th>
                            <th>Start Date</th>
                            <th>End Date</th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        {employees.map((employee) => (
                            <tr key={employee.personnel_id}>
                                <td>{employee.personnel_id}</td>
                                <td>{employee.gov_id}</td>
                                <td>{employee.full_name}</td>
                                <td>{employee.date_of_birth}</td>
                                <td>{OCCUPATION_NAMES[employee.occupation_code] ?? employee.occupation_code}</td>
                                <td>{employee.isactive ? 'Active' : 'Dismissed'}</td>
                                <td>{employee.working_start_date}</td>
                                <td>{employee.working_end_date ?? ''}</td>
                                <td>
                                    {employee.personnel_id !== user?.personnel_id && (
                                        <Link to={`/personnel/employees/${employee.personnel_id}`}>Manage</Link>
                                    )}
                                </td>
                            </tr>
                        ))}
                        {employees.length === 0 && (
                            <tr>
                                <td colSpan={9}>No employees found.</td>
                            </tr>
                        )}
                    </tbody>
                </table>
            )}
        </section>
    );
}

export default function PersonnelDashboard() {
    return (
        <Routes>
            <Route index element={<PersonnelList />} />
            <Route path="add" element={<AddNewEmployee />} />
            <Route path="employees/:id" element={<UpdateNewEmployee />} />
        </Routes>
    );
}