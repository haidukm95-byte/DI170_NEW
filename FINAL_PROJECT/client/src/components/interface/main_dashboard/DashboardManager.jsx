import { NavLink, Navigate, Route, Routes } from 'react-router-dom';
import { useAuth } from '../../../context/AuthContext';
import { useEffect } from 'react';
import PersonnelDashboard from '../personnel/edit_by_manager/PersonnelDashboard';
import MyAccEditManager from '../personnel/me/MyAccEditManager';
import GoodsRegistryDashboard from '../goods_registry/GoodsRegistryDashboard';
import LogDashboard from '../logistics/LogDashboard';
import InventoryFoods from '../inventory/InventoryFoods';
import InventoryGeneral from '../inventory/InventoryGeneral';
import '../interface.css';

export default function DashboardManager() {
    const { user, logout } = useAuth();

    useEffect(() => {
            document.title = 'Dashboard - Warehouse App';
        }, []);

    return (
        <div className="dashboard">
            <header className="dashboard-header">
                <div>
                    <h1>Manager Dashboard</h1>
                    <p className='welcome'>Welcome, {user?.full_name}</p>
                </div>
                <button type="button" className="btn-secondary" onClick={logout}>
                    Log out
                </button>
            </header>

            <nav className="dashboard-nav">
                <NavLink to="/logistics">Logistics</NavLink>
                <NavLink to="/goods">Goods Registry</NavLink>
                <NavLink to="/inventory/foods">Foods Inventory</NavLink>
                <NavLink to="/inventory/general">General Inventory</NavLink>
                <NavLink to="/personnel">Personnel</NavLink>
                <NavLink to="/account">My Account</NavLink>
            </nav>

            <main className="dashboard-content">
                <Routes>
                    <Route index element={<Navigate to="/logistics" replace />} />
                    <Route path="logistics/*" element={<LogDashboard />} />
                    <Route path="goods/*" element={<GoodsRegistryDashboard />} />
                    <Route path="inventory/foods" element={<InventoryFoods />} />
                    <Route path="inventory/general" element={<InventoryGeneral />} />
                    <Route path="personnel/*" element={<PersonnelDashboard />} />
                    <Route path="account" element={<MyAccEditManager />} />
                </Routes>
            </main>
        </div>
    );
}
