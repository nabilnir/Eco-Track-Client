import React from 'react';
import Navbar from '../components/Home/Navbar';
import { Outlet } from 'react-router';
import Footer from '../components/Home/Footer';
import './Root.css'

const Root = () => {
    return (
        <div>
            <Navbar />
            <Outlet />
            <Footer />
        </div>
    );
};

export default Root;