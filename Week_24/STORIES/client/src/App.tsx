import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import './App.css';
import Login from './features/auth/Login';
import Register from './features/auth/Register';
import FeedMyProfile from './features/feed/FeedMyProfile';
import FeedOtherProfile from './features/feed/FeedOtherProfile';
import AccountSettings from './features/account/AccountSettings';
import ProtectedRoute from './components/ProtectedRoute';
import AdminRoute from './components/AdminRoute';
import AdminReports from './features/admin/AdminReports';
import { verifyToken } from './features/auth/authSlice';
import type { RootState, AppDispatch } from './app/store';

function AuthInitializer() {
    const dispatch = useDispatch<AppDispatch>();
    useEffect(() => {
        if (localStorage.getItem('token')) dispatch(verifyToken());
    }, []);
    return null;
}

function RootRedirect() {
    const { status } = useSelector((s: RootState) => s.auth);
    if (status === 'checking') return <div className="auth-loading" />;
    return <Navigate to={status === 'authenticated' ? '/feed' : '/login'} replace />;
}

export default function App() {
    return (
        <BrowserRouter>
            <AuthInitializer />
            <Routes>
                <Route path="/" element={<RootRedirect />} />
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route path="/feed" element={<ProtectedRoute><FeedMyProfile /></ProtectedRoute>} />
                <Route path="/user/:id" element={<ProtectedRoute><FeedOtherProfile /></ProtectedRoute>} />
                <Route path="/settings" element={<ProtectedRoute><AccountSettings /></ProtectedRoute>} />
                <Route path="/reports" element={<AdminRoute><AdminReports /></AdminRoute>} />
            </Routes>
        </BrowserRouter>
    );
}
