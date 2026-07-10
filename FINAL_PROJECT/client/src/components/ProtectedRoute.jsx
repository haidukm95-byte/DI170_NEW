import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

// permission is optional: pass one of the boolean flags returned on the user
// object (auth_receive, auth_edit_personnel, auth_edit_goods_registry) to
// also gate a route by role. This is UX only — the server enforces the same
// flags independently via requirePermission, so hiding a link here never
// substitutes for a real authorization check.
export default function ProtectedRoute({ children, permission }) {
    const { user, status } = useAuth();

    if (status === 'loading') return <p>Loading...</p>;
    if (status === 'unauthenticated') return <Navigate to="/login" replace />;
    if (permission && !user?.[permission]) return <Navigate to="/" replace />;

    return children;
}
