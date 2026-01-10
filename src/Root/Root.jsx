import React from 'react';
import Navbar from '../components/Home/Navbar';
import { Outlet, useLocation } from 'react-router';
import Footer from '../components/Home/Footer';


const Root = () => {
    const location = useLocation();
    const isDashboard = location.pathname.startsWith('/dashboard');

    return (
        <div>
            {!isDashboard && <Navbar />}
            <Outlet />
            {!isDashboard && <Footer />}
        </div>
    );
};

export default Root;