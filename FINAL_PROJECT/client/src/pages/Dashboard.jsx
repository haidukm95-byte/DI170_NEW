import { useAuth } from '../context/AuthContext';
import DashboardManager from '../components/interface/main_dashboard/DashboardManager';
import DashboardReceiver from '../components/interface/main_dashboard/DashboardReceiver';
import DashboardWorker from '../components/interface/main_dashboard/DashboardWorker';

const MANAGER_OCCUPATION_CODE = 1;
const RECEIVER_OCCUPATION_CODE = 2;
const WORKER_OCCUPATION_CODE = 3;

export default function Dashboard() {
    const { user, logout } = useAuth();

    switch (user?.occupation_code) {
        case MANAGER_OCCUPATION_CODE:
            return <DashboardManager />;
        case RECEIVER_OCCUPATION_CODE:
            return <DashboardReceiver />;
        case WORKER_OCCUPATION_CODE:
            return <DashboardWorker />;
        default:
            return (
                <div>
                    <h1>Welcome, {user?.full_name}</h1>
                    <p>Occupation code: {user?.occupation_code}</p>
                    <button onClick={logout}>Log out</button>
                </div>
            );
    }
}
