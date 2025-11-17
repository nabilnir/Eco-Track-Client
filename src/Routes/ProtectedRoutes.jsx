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

  return (
    <>
      {/* ToastContainer */}
      <ToastContainer position="top-center" autoClose={3000} hideProgressBar={false} />

      {loading ? (
        <div className="min-h-screen flex items-center justify-center">
          <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-emerald-500" />
        </div>
      ) : !user ? (
        <Navigate to="/login" state={{ from: location }} replace />
      ) : (
        <Outlet />
      )}
    </>
  );
};

export default ProtectedRoutes;