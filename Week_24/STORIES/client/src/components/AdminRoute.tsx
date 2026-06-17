import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';
import type { RootState } from '../app/store';
import type { ReactElement } from 'react';

export default function AdminRoute({ children }: { children: ReactElement }) {
    const { token, user, status } = useSelector((s: RootState) => s.auth);
    if (status === 'checking') return <div className="auth-loading" />;
    if (!token || status !== 'authenticated') return <Navigate to="/login" />;
    if (!user?.is_admin) return <Navigate to="/feed" />;
    return children;
}
