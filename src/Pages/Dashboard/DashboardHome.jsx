import React, { useContext } from 'react';
import { AuthContext } from '../../Context/AuthContext';
import AdminOverview from './AdminOverview';
import DashboardOverview from './DashboardOverview';

const DashboardHome = () => {
    const { user, loading } = useContext(AuthContext);

    if (loading) {
        return (
            <div className="flex flex-col items-center justify-center p-20 animate-pulse">
                <div className="w-12 h-12 border-4 border-emerald-500 border-t-transparent rounded-full animate-spin"></div>
                <p className="mt-4 text-gray-500 font-medium font-['Inter']">Initializing Dashboard...</p>
            </div>
        );
    }

    // Determine user role - check for 'admin' string in email OR role property
    const isAdmin = user?.role === 'admin' || user?.email?.toLowerCase().includes('admin');

    // Render appropriate dashboard based on role
    if (isAdmin) {
        return <AdminOverview />;
    }

    return <DashboardOverview />;
};

export default DashboardHome;
