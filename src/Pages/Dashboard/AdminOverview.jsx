import React, { useState, useEffect, useContext } from 'react';
import { AuthContext } from '../../Context/AuthContext';
import { Link } from 'react-router';
import {
    FaLeaf,
    FaTrophy,
    FaCalendarAlt,
    FaUsers,
    FaChartLine,
    FaArrowUp,
    FaArrowDown,
    FaArrowRight,
    FaCog,
    FaEye
} from 'react-icons/fa';
import {
    BarChart, Bar, PieChart, Pie, Cell,
    XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer
} from 'recharts';
import axiosPublic from '../../api/axiosPublic';

const AdminOverview = () => {
    const { user } = useContext(AuthContext);
    const [loading, setLoading] = useState(true);
    const [stats, setStats] = useState(null);
    const [latestData, setLatestData] = useState(null);

    useEffect(() => {
        fetchAdminData();
    }, []);

    const fetchAdminData = async () => {
        try {
            setLoading(true);
            const [statsRes, latestRes] = await Promise.all([
                axiosPublic.get('/api/admin/stats'),
                axiosPublic.get('/api/admin/latest')
            ]);
            setStats(statsRes.data.data);
            setLatestData(latestRes.data.data);
        } catch (error) {
            console.error('Failed to fetch admin data:', error);
        } finally {
            setLoading(false);
        }
    };

    const COLORS = ['#10b981', '#3b82f6', '#f59e0b', '#ef4444', '#8b5cf6', '#06b6d4'];

    // Prepare category data for pie chart
    const categoryData = stats?.challenges?.categories?.map((cat, index) => ({
        name: cat._id || 'Other',
        value: cat.count,
        color: COLORS[index % COLORS.length]
    })) || [];

    if (loading) {
        return (
            <div className="p-6">
                <div className="animate-pulse">
                    <div className="h-8 bg-gray-300 dark:bg-gray-700 rounded w-1/3 mb-6"></div>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                        {[...Array(4)].map((_, i) => (
                            <div key={i} className="h-32 bg-gray-300 dark:bg-gray-700 rounded-lg"></div>
                        ))}
                    </div>
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                        <div className="h-64 bg-gray-300 dark:bg-gray-700 rounded-lg"></div>
                        <div className="h-64 bg-gray-300 dark:bg-gray-700 rounded-lg"></div>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="p-6">
            {/* Header */}
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
                <div>
                    <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
                        Admin Dashboard
                    </h1>
                    <p className="text-gray-600 dark:text-gray-400 mt-2">
                        Welcome back! Here's an overview of your platform.
                    </p>
                </div>
                <div className="text-sm text-gray-500 dark:text-gray-400">
                    Last updated: {new Date().toLocaleTimeString()}
                </div>
            </div>

            {/* Stats Cards - Primary Row */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
                {/* Total Challenges - Gradient */}
                <div className="bg-gradient-to-br from-emerald-500 to-emerald-700 rounded-xl p-6 text-white shadow-lg hover:shadow-xl transition-all">
                    <div className="flex items-center justify-between mb-4">
                        <div className="w-12 h-12 bg-white/20 rounded-lg flex items-center justify-center">
                            <FaTrophy className="text-2xl" />
                        </div>
                        <span className="text-white/80 text-sm font-medium">Total</span>
                    </div>
                    <h3 className="text-3xl font-bold mb-1">{stats?.challenges?.total || 0}</h3>
                    <p className="text-white/80 text-sm">Total Challenges</p>
                </div>

                {/* Active Challenges */}
                <div className="bg-white dark:bg-gray-800 rounded-xl p-6 border-2 border-emerald-500/20 shadow-sm hover:shadow-md transition-all">
                    <div className="flex items-center justify-between mb-4">
                        <div className="w-12 h-12 bg-emerald-100 dark:bg-emerald-900/30 rounded-lg flex items-center justify-center">
                            <FaLeaf className="text-2xl text-emerald-600 dark:text-emerald-400" />
                        </div>
                        <span className="text-emerald-600 dark:text-emerald-400 text-sm font-medium">Active</span>
                    </div>
                    <h3 className="text-3xl font-bold text-gray-900 dark:text-white mb-1">{stats?.challenges?.active || 0}</h3>
                    <p className="text-gray-600 dark:text-gray-400 text-sm">Active Challenges</p>
                </div>

                {/* Total Users */}
                <div className="bg-white dark:bg-gray-800 rounded-xl p-6 border-2 border-blue-500/20 shadow-sm hover:shadow-md transition-all">
                    <div className="flex items-center justify-between mb-4">
                        <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900/30 rounded-lg flex items-center justify-center">
                            <FaUsers className="text-2xl text-blue-600 dark:text-blue-400" />
                        </div>
                        {stats?.users?.growth > 0 && (
                            <div className="flex items-center text-green-600 dark:text-green-400 text-sm">
                                <FaArrowUp className="mr-1" />
                                <span>{stats?.users?.growth}%</span>
                            </div>
                        )}
                    </div>
                    <h3 className="text-3xl font-bold text-gray-900 dark:text-white mb-1">{stats?.users?.total || 0}</h3>
                    <p className="text-gray-600 dark:text-gray-400 text-sm">Total Users</p>
                </div>

                {/* Total Events - Gradient */}
                <div className="bg-gradient-to-br from-purple-500 to-purple-700 rounded-xl p-6 text-white shadow-lg hover:shadow-xl transition-all">
                    <div className="flex items-center justify-between mb-4">
                        <div className="w-12 h-12 bg-white/20 rounded-lg flex items-center justify-center">
                            <FaCalendarAlt className="text-2xl" />
                        </div>
                        <FaChartLine className="text-white/80" />
                    </div>
                    <h3 className="text-3xl font-bold mb-1">{stats?.events?.total || 0}</h3>
                    <p className="text-white/80 text-sm">Total Events</p>
                </div>
            </div>

            {/* Stats Cards - Secondary Row */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
                {/* Active Users */}
                <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm border border-gray-100 dark:border-gray-700 hover:shadow-md transition-all">
                    <div className="flex items-center justify-between mb-4">
                        <div className="w-10 h-10 bg-green-100 dark:bg-green-900/30 rounded-lg flex items-center justify-center">
                            <FaUsers className="text-green-600 dark:text-green-400" />
                        </div>
                    </div>
                    <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-1">{stats?.users?.active || 0}</h3>
                    <p className="text-gray-600 dark:text-gray-400 text-sm">Active Users</p>
                </div>

                {/* Admins */}
                <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm border border-gray-100 dark:border-gray-700 hover:shadow-md transition-all">
                    <div className="flex items-center justify-between mb-4">
                        <div className="w-10 h-10 bg-purple-100 dark:bg-purple-900/30 rounded-lg flex items-center justify-center">
                            <FaCog className="text-purple-600 dark:text-purple-400" />
                        </div>
                    </div>
                    <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-1">{stats?.users?.admins || 0}</h3>
                    <p className="text-gray-600 dark:text-gray-400 text-sm">Admin Users</p>
                </div>

                {/* Total Participations */}
                <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm border border-gray-100 dark:border-gray-700 hover:shadow-md transition-all">
                    <div className="flex items-center justify-between mb-4">
                        <div className="w-10 h-10 bg-amber-100 dark:bg-amber-900/30 rounded-lg flex items-center justify-center">
                            <FaTrophy className="text-amber-600 dark:text-amber-400" />
                        </div>
                        {stats?.participation?.growth > 0 && (
                            <div className="flex items-center text-green-600 dark:text-green-400 text-xs">
                                <FaArrowUp className="mr-1" />
                                <span>{stats?.participation?.growth}%</span>
                            </div>
                        )}
                    </div>
                    <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-1">{stats?.participation?.total || 0}</h3>
                    <p className="text-gray-600 dark:text-gray-400 text-sm">Total Participations</p>
                </div>

                {/* Upcoming Events */}
                <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm border border-gray-100 dark:border-gray-700 hover:shadow-md transition-all">
                    <div className="flex items-center justify-between mb-4">
                        <div className="w-10 h-10 bg-cyan-100 dark:bg-cyan-900/30 rounded-lg flex items-center justify-center">
                            <FaCalendarAlt className="text-cyan-600 dark:text-cyan-400" />
                        </div>
                    </div>
                    <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-1">{stats?.events?.upcoming || 0}</h3>
                    <p className="text-gray-600 dark:text-gray-400 text-sm">Upcoming Events</p>
                </div>
            </div>

            {/* Charts Section */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
                {/* Category Distribution Pie Chart */}
                <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm border border-gray-100 dark:border-gray-700">
                    <div className="flex items-center justify-between mb-6">
                        <h3 className="text-lg font-bold text-gray-900 dark:text-white">Challenge Categories</h3>
                        <Link
                            to="/dashboard/challenges"
                            className="text-sm text-emerald-600 dark:text-emerald-400 font-medium hover:underline flex items-center gap-1"
                        >
                            View All <FaArrowRight size={12} />
                        </Link>
                    </div>
                    {categoryData.length > 0 ? (
                        <ResponsiveContainer width="100%" height={300}>
                            <PieChart>
                                <Pie
                                    data={categoryData}
                                    cx="50%"
                                    cy="50%"
                                    labelLine={false}
                                    label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                                    outerRadius={100}
                                    fill="#8884d8"
                                    dataKey="value"
                                >
                                    {categoryData.map((entry, index) => (
                                        <Cell key={`cell-${index}`} fill={entry.color} />
                                    ))}
                                </Pie>
                                <Tooltip />
                            </PieChart>
                        </ResponsiveContainer>
                    ) : (
                        <div className="flex items-center justify-center h-64 text-gray-500 dark:text-gray-400">
                            <p>No category data available</p>
                        </div>
                    )}
                </div>

                {/* Environmental Impact */}
                <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm border border-gray-100 dark:border-gray-700">
                    <div className="flex items-center justify-between mb-6">
                        <h3 className="text-lg font-bold text-gray-900 dark:text-white">Environmental Impact</h3>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                        <div className="bg-green-50 dark:bg-green-900/20 rounded-lg p-4 text-center">
                            <p className="text-3xl font-bold text-green-600 dark:text-green-400">{stats?.impact?.co2Saved || 0}</p>
                            <p className="text-sm text-gray-600 dark:text-gray-400">kg CO₂ Saved</p>
                        </div>
                        <div className="bg-blue-50 dark:bg-blue-900/20 rounded-lg p-4 text-center">
                            <p className="text-3xl font-bold text-blue-600 dark:text-blue-400">{stats?.impact?.waterSaved || 0}</p>
                            <p className="text-sm text-gray-600 dark:text-gray-400">L Water Saved</p>
                        </div>
                        <div className="bg-amber-50 dark:bg-amber-900/20 rounded-lg p-4 text-center">
                            <p className="text-3xl font-bold text-amber-600 dark:text-amber-400">{stats?.impact?.plasticReduced || 0}</p>
                            <p className="text-sm text-gray-600 dark:text-gray-400">kg Plastic Reduced</p>
                        </div>
                        <div className="bg-emerald-50 dark:bg-emerald-900/20 rounded-lg p-4 text-center">
                            <p className="text-3xl font-bold text-emerald-600 dark:text-emerald-400">{stats?.impact?.treesPlanted || 0}</p>
                            <p className="text-sm text-gray-600 dark:text-gray-400">Trees Planted</p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Latest Data Section */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Latest Challenges */}
                <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm border border-gray-100 dark:border-gray-700">
                    <div className="flex items-center justify-between mb-6">
                        <h3 className="text-lg font-bold text-gray-900 dark:text-white">Latest Challenges</h3>
                        <Link
                            to="/challenges"
                            className="text-sm text-emerald-600 dark:text-emerald-400 font-medium hover:underline flex items-center gap-1"
                        >
                            View All <FaArrowRight size={12} />
                        </Link>
                    </div>
                    <div className="space-y-3">
                        {latestData?.latestChallenges?.length > 0 ? (
                            latestData.latestChallenges.map((challenge) => (
                                <Link
                                    key={challenge._id}
                                    to={`/challenges/${challenge._id}`}
                                    className="block p-3 bg-gray-50 dark:bg-gray-700/50 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors group"
                                >
                                    <div className="flex items-start justify-between gap-2">
                                        <div className="flex-1 min-w-0">
                                            <h4 className="font-semibold text-sm text-gray-900 dark:text-white truncate group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors">
                                                {challenge.title}
                                            </h4>
                                            <p className="text-xs text-gray-600 dark:text-gray-400 mt-1">{challenge.category}</p>
                                        </div>
                                        <span className="px-2 py-1 bg-emerald-100 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-400 rounded text-xs font-semibold flex-shrink-0">
                                            {challenge.participants || 0} joined
                                        </span>
                                    </div>
                                </Link>
                            ))
                        ) : (
                            <p className="text-gray-500 dark:text-gray-400 text-center py-4">No challenges yet</p>
                        )}
                    </div>
                </div>

                {/* Latest Events */}
                <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm border border-gray-100 dark:border-gray-700">
                    <div className="flex items-center justify-between mb-6">
                        <h3 className="text-lg font-bold text-gray-900 dark:text-white">Latest Events</h3>
                        <Link
                            to="/events"
                            className="text-sm text-emerald-600 dark:text-emerald-400 font-medium hover:underline flex items-center gap-1"
                        >
                            View All <FaArrowRight size={12} />
                        </Link>
                    </div>
                    <div className="space-y-3">
                        {latestData?.latestEvents?.length > 0 ? (
                            latestData.latestEvents.map((event) => (
                                <Link
                                    key={event._id}
                                    to={`/events/${event._id}`}
                                    className="block p-3 bg-gray-50 dark:bg-gray-700/50 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors group"
                                >
                                    <div className="flex items-start justify-between gap-2">
                                        <div className="flex-1 min-w-0">
                                            <h4 className="font-semibold text-sm text-gray-900 dark:text-white truncate group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors">
                                                {event.title}
                                            </h4>
                                            <p className="text-xs text-gray-600 dark:text-gray-400 mt-1">
                                                {new Date(event.date).toLocaleDateString()}
                                            </p>
                                        </div>
                                        <span className="px-2 py-1 bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-400 rounded text-xs font-semibold flex-shrink-0">
                                            {event.attendees || 0} attending
                                        </span>
                                    </div>
                                </Link>
                            ))
                        ) : (
                            <p className="text-gray-500 dark:text-gray-400 text-center py-4">No events yet</p>
                        )}
                    </div>
                </div>

                {/* Latest Users */}
                <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm border border-gray-100 dark:border-gray-700">
                    <div className="flex items-center justify-between mb-6">
                        <h3 className="text-lg font-bold text-gray-900 dark:text-white">Latest Users</h3>
                        <Link
                            to="/dashboard/users"
                            className="text-sm text-emerald-600 dark:text-emerald-400 font-medium hover:underline flex items-center gap-1"
                        >
                            View All <FaArrowRight size={12} />
                        </Link>
                    </div>
                    <div className="space-y-3">
                        {latestData?.latestUsers?.length > 0 ? (
                            latestData.latestUsers.map((latestUser) => (
                                <div
                                    key={latestUser._id}
                                    className="flex items-center gap-3 p-3 bg-gray-50 dark:bg-gray-700/50 rounded-lg"
                                >
                                    <img
                                        src={latestUser.photoURL || `https://picsum.photos/seed/${latestUser.email}/200/200.jpg`}
                                        alt={latestUser.displayName}
                                        className="w-10 h-10 rounded-full object-cover border-2 border-white dark:border-gray-600"
                                    />
                                    <div className="flex-1 min-w-0">
                                        <p className="font-semibold text-sm text-gray-900 dark:text-white truncate">
                                            {latestUser.displayName || 'User'}
                                        </p>
                                        <p className="text-xs text-gray-600 dark:text-gray-400 truncate">
                                            {latestUser.email}
                                        </p>
                                    </div>
                                    {latestUser.role === 'admin' && (
                                        <span className="px-2 py-1 bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-400 rounded text-xs font-bold flex-shrink-0">
                                            Admin
                                        </span>
                                    )}
                                </div>
                            ))
                        ) : (
                            <p className="text-gray-500 dark:text-gray-400 text-center py-4">No users yet</p>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AdminOverview;
