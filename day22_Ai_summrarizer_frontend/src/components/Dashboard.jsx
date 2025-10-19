import React, { useEffect, useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { summarizerAPI } from '../api/services';

const Dashboard = () => {
    const { user: authUser, logout } = useAuth();
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [summaryHistory, setSummaryHistory] = useState([]);
    const [selectedSummary, setSelectedSummary] = useState(null);
    const [dailyLimit, setDailyLimit] = useState({ used: 0, total: 10 });
    const navigate = useNavigate();

    useEffect(() => {
        // Set user data from AuthContext
        setUser(authUser || null);

        let cancelled = false;
        // Try fetching summary history if endpoint exists
        (async () => {
            try {
                const data = await summarizerAPI.getSummaryHistory();
                if (cancelled) return;
                
                console.log('Dashboard data received:', data);
                
                // Expect response with summaries array and dailyLimit (remaining count)
                const summaries = data?.summaries || [];
                const remainingLimit = data?.dailyLimit ?? 10; // This is REMAINING count from backend
                
                const mapped = summaries.map((s) => ({
                    id: s._id || s.id,
                    originalText: s.originalText || s.text || '',
                    summary: s.summarizedText || s.summary || '',
                    timestamp: s.createdAt ? new Date(s.createdAt).toLocaleString() : '',
                    wordCount: (s.originalText || s.text || '').split(/\s+/).filter(Boolean).length,
                }));
                
                setSummaryHistory(mapped);
                
                // Calculate: used = total summaries, total = used + remaining
                const usedCount = mapped.length;
                const totalLimit = usedCount + remainingLimit;
                
                console.log(`Dashboard stats: ${usedCount} used, ${remainingLimit} remaining, ${totalLimit} total`);
                setDailyLimit({ used: usedCount, total: totalLimit });
                
            } catch (err) {
                console.error('Error fetching summary history:', err);
                // Graceful fallback if endpoint not implemented
                setSummaryHistory([]);
                setDailyLimit({ used: 0, total: 10 });
            } finally {
                if (!cancelled) setLoading(false);
            }
        })();

        return () => { cancelled = true; };
    }, [authUser]);

    const handleLogout = async () => {
        await logout();
        navigate('/login');
    };

    const displayName = useMemo(() => {
        if (!user) return '';
        // Prefer backend schema: user.fullname.firstname
        const first = user?.fullname?.firstname || user?.firstName || '';
        const last = user?.fullname?.lastname || user?.lastName || '';
        const combined = `${first} ${last}`.trim();
        return combined || user.email || 'User';
    }, [user]);

    const handleTextClick = (summary) => {
        setSelectedSummary(selectedSummary?.id === summary.id ? null : summary);
    };

    const handleDeleteSummary = async (id) => {
        if (!window.confirm('Are you sure you want to delete this summary?')) {
            return;
        }
        
        try {
            await summarizerAPI.deleteSummary(id);
            // Remove from local state
            setSummaryHistory(prev => {
                const updated = prev.filter(s => s.id !== id);
                // Also update the daily limit counts
                setDailyLimit(prevLimit => ({
                    ...prevLimit,
                    used: updated.length, // New used count
                    // Total stays the same (used + remaining is constant per day)
                }));
                return updated;
            });
        } catch (err) {
            console.error('Error deleting summary:', err);
            alert('Failed to delete summary. Please try again.');
        }
    };

    if (loading) {
        return (
            <div className="flex items-center justify-center min-h-screen bg-gray-100">
                <div className="text-xl text-gray-600">Loading...</div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-100">
            {/* Header */}
            <header className="bg-white shadow">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
                    <h1 className="text-2xl font-bold text-gray-900">AI Summarizer Dashboard</h1>
                    <div className="flex items-center gap-4">
                        <button
                            onClick={() => navigate('/summarizer')}
                            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition"
                        >
                            Go to Summarizer
                        </button>
                        <span className="text-gray-700 hidden sm:inline">Welcome, {displayName}</span>
                        <button
                            onClick={handleLogout}
                            className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg transition"
                        >
                            Logout
                        </button>
                    </div>
                </div>
            </header>

            {/* Main Content */}
            <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                {/* Stats Grid */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                    <div className="bg-white p-6 rounded-lg shadow">
                        <h3 className="text-gray-500 text-sm font-medium">Total Summaries</h3>
                        <p className="text-3xl font-bold text-gray-900 mt-2">{summaryHistory.length}</p>
                    </div>
                    <div className="bg-white p-6 rounded-lg shadow">
                        <h3 className="text-gray-500 text-sm font-medium">Daily Limit</h3>
                        <p className="text-3xl font-bold text-gray-900 mt-2">
                            {dailyLimit.used}/{dailyLimit.total}
                        </p>
                        <div className="mt-2 w-full bg-gray-200 rounded-full h-2">
                            <div 
                                className="bg-blue-600 h-2 rounded-full transition-all"
                                style={{ width: `${(dailyLimit.used / dailyLimit.total) * 100}%` }}
                            ></div>
                        </div>
                    </div>
                    <div className="bg-white p-6 rounded-lg shadow">
                        <h3 className="text-gray-500 text-sm font-medium">Remaining Today</h3>
                        <p className="text-3xl font-bold text-gray-900 mt-2">
                            {dailyLimit.total - dailyLimit.used}
                        </p>
                    </div>
                </div>

                {/* Summary History */}
                <div className="bg-white rounded-lg shadow">
                    <div className="px-6 py-4 border-b border-gray-200">
                        <h2 className="text-xl font-semibold text-gray-900">Summary History</h2>
                    </div>
                    <div className="p-6">
                        {summaryHistory.length === 0 ? (
                            <div className="text-center py-12">
                                <svg
                                    className="mx-auto h-12 w-12 text-gray-400"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                        d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                                    />
                                </svg>
                                <h3 className="mt-2 text-sm font-medium text-gray-900">No summaries yet</h3>
                                <p className="mt-1 text-sm text-gray-500">Start summarizing texts to see your history here</p>
                                <div className="mt-6">
                                    <button
                                        onClick={() => navigate('/summarizer')}
                                        className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2 rounded-lg transition"
                                    >
                                        Go to Summarizer →
                                    </button>
                                </div>
                            </div>
                        ) : (
                            <div className="space-y-4">
                                {summaryHistory.map((item) => (
                                    <div key={item.id} className="border border-gray-200 rounded-lg overflow-hidden">
                                        {/* Original Text Card */}
                                        <div className="p-4 bg-gray-50">
                                            <div className="flex justify-between items-start mb-2">
                                                <h3 className="font-semibold text-gray-900">Original Text</h3>
                                                <div className="flex items-center gap-4">
                                                    <span className="text-sm text-gray-500">{item.wordCount} words</span>
                                                    <span className="text-sm text-gray-500">{item.timestamp}</span>
                                                    <button
                                                        onClick={(e) => {
                                                            e.stopPropagation();
                                                            handleDeleteSummary(item.id);
                                                        }}
                                                        className="text-red-500 hover:text-red-700 text-sm font-medium"
                                                        title="Delete summary"
                                                    >
                                                        Delete
                                                    </button>
                                                </div>
                                            </div>
                                            <div
                                                onClick={() => handleTextClick(item)}
                                                className="cursor-pointer hover:bg-gray-100 p-2 rounded transition"
                                            >
                                                <p className="text-gray-700 line-clamp-2">{item.originalText}</p>
                                                <div className="mt-2 text-sm text-blue-600">
                                                    Click to {selectedSummary?.id === item.id ? 'hide' : 'view'} summary →
                                                </div>
                                            </div>
                                        </div>

                                        {/* Summary (Expandable) */}
                                        {selectedSummary?.id === item.id && (
                                            <div className="p-4 bg-blue-50 border-t border-gray-200">
                                                <h4 className="font-semibold text-gray-900 mb-2">Summary</h4>
                                                <p className="text-gray-700">{item.summary}</p>
                                            </div>
                                        )}
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                </div>
            </main>
        </div>
    );
};

export default Dashboard;