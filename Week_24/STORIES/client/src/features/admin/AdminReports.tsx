import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import type { AppDispatch, RootState } from '../../app/store';
import { logout } from '../auth/authSlice';
import { fetchMyProfile } from '../feed/feedSlice';
import {
    fetchReports,
    adminDeleteVersion,
    adminDeleteStory,
    adminIgnoreReport,
    removeReport,
    removeReportsByStory,
} from './adminSlice';
import type { Report } from './adminSlice';
import LeftSidebar from '../../components/LeftSidebar';

function ReportCard({ report }: { report: Report }) {
    const dispatch = useDispatch<AppDispatch>();
    const [message, setMessage] = useState<string | null>(null);

    const handleAction = (
        thunk: Promise<unknown>,
        msg: string,
        cleanup: () => void
    ) => {
        thunk.then(() => {
            setMessage(msg);
            setTimeout(cleanup, 3000);
        });
    };

    const fmt = (iso: string) =>
        new Date(iso).toLocaleString(undefined, {
            year: 'numeric', month: 'short', day: 'numeric',
            hour: '2-digit', minute: '2-digit',
        });

    if (message) {
        return (
            <div className="report-card report-card--dismissed">
                <p className="report-action-message">{message}</p>
            </div>
        );
    }

    return (
        <div className={`report-card${report.is_implemented ? ' report-card--implemented' : ''}`}>
            <div className="report-card-header">
                <span>Story #{report.story_id}</span>
                {report.version != null && <span> · v{report.version}</span>}
                {report.header && <span> · &ldquo;{report.header}&rdquo;</span>}
                {report.is_implemented && <span className="report-implemented-badge"> ✓ Handled</span>}
            </div>
            <div className="report-card-body">
                <p><strong>Reporter:</strong> {report.reporter_username ?? `#${report.reporter_id}`}</p>
                <p><strong>Reason:</strong> {report.reason}</p>
                <p className="report-date">{fmt(report.created_at)}</p>
            </div>
            {!report.is_implemented && (
                <div className="report-card-actions">
                    <button
                        className="report-btn report-btn--danger"
                        onClick={() => handleAction(
                            dispatch(adminDeleteVersion(report.id)),
                            'The reported version has been deleted!',
                            () => dispatch(removeReport(report.id))
                        )}
                    >
                        Delete version
                    </button>
                    <button
                        className="report-btn report-btn--danger"
                        onClick={() => handleAction(
                            dispatch(adminDeleteStory({ reportId: report.id, storyId: report.story_id })),
                            'The reported story has been deleted!',
                            () => dispatch(removeReportsByStory(report.story_id))
                        )}
                    >
                        Delete story
                    </button>
                    <button
                        className="report-btn"
                        onClick={() => handleAction(
                            dispatch(adminIgnoreReport(report.id)),
                            'No changes implemented',
                            () => dispatch(removeReport(report.id))
                        )}
                    >
                        Ignore
                    </button>
                </div>
            )}
        </div>
    );
}

export default function AdminReports() {
    const dispatch = useDispatch<AppDispatch>();
    const navigate = useNavigate();

    const { user } = useSelector((s: RootState) => s.auth);
    const { myProfile } = useSelector((s: RootState) => s.feed);
    const { reports, loading } = useSelector((s: RootState) => s.admin);

    useEffect(() => {
        dispatch(fetchMyProfile());
        dispatch(fetchReports());
    }, [dispatch]);

    const handleLogout = () => {
        dispatch(logout());
        navigate('/login');
    };

    const sidebarUser = myProfile
        ? { ...user, friends: myProfile.friends, coauthors: myProfile.coauthors }
        : user;

    return (
        <div className="feed-layout">
            <LeftSidebar user={sidebarUser} onLogout={handleLogout} isOwn={true} />

            <div className="feed-main">
                <h2 className="admin-reports-title">Reports</h2>

                {loading && <p>Loading reports…</p>}

                {!loading && reports.length === 0 && (
                    <p className="admin-reports-empty">No pending reports.</p>
                )}

                {reports.map((report) => (
                    <ReportCard key={report.id} report={report} />
                ))}
            </div>
        </div>
    );
}
