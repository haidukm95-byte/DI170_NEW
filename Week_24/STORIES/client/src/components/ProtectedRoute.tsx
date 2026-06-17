import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';
import type { RootState } from '../app/store';
import type { ReactElement } from 'react';

export default function ProtectedRoute({ children }: { children: ReactElement }) {
    const { token, status } = useSelector((s: RootState) => s.auth);
    if (status === 'checking') return <div className="auth-loading" />;
    return (token && status === 'authenticated') ? children : <Navigate to="/login" />;
}
