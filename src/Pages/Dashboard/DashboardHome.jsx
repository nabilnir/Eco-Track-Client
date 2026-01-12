import React, { useContext } from 'react';
import { AuthContext } from '../../Context/AuthContext';
import AdminOverview from './AdminOverview';
import DashboardOverview from './DashboardOverview';

/**
 * DashboardHome - Conditionally renders the appropriate dashboard overview
 * based on user role. Admin users see AdminOverview, regular users see DashboardOverview.
 */
const DashboardHome = () => {
    const { user } = useContext(AuthContext);

    // Determine user role - check for 'admin' string in email OR role property
    const isAdmin = user?.role === 'admin' || user?.email?.toLowerCase().includes('admin');

    // Render appropriate dashboard based on role
    if (isAdmin) {
        return <AdminOverview />;
    }

    return <DashboardOverview />;
};

export default DashboardHome;
