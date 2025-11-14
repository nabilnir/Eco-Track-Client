import React, { useEffect } from 'react';
import { Navigate, Outlet, useLocation } from 'react-router';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import useAuth from '../Hooks/useAuth';

const ProtectedRoutes = () => {
  const { user, loading } = useAuth();
  const location = useLocation();

  useEffect(() => {
    if (!loading && !user && location.pathname !== '/login') {
      toast.info('Please sign in to access that page', { toastId: 'auth-required' });
    }
  }, [loading, user, location.pathname]);

  if (loading) {
    
    return null;
  }

  if (!user) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return (
    <>
      <ToastContainer position="top-center" autoClose={3000} hideProgressBar={false} />
      <Outlet />
    </>
  );
};

export default ProtectedRoutes;