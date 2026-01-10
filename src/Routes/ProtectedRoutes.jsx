import React, { useEffect } from 'react';
import { Navigate, Outlet, useLocation } from 'react-router';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import useAuth from '../Hooks/useAuth';

const ProtectedRoutes = ({ allowedRoles, children }) => {
  const { user, loading } = useAuth();
  const location = useLocation();

  useEffect(() => {
    if (!loading && !user && location.pathname !== '/login') {
      toast.info('Please sign in to access that page', { toastId: 'auth-required' });
    }

    if (!loading && user && allowedRoles && !allowedRoles.includes(user.role)) {
      toast.error(`Access denied. You need ${allowedRoles.join(' or ')} permissions.`, { toastId: 'role-denied' });
    }
  }, [loading, user, location.pathname, allowedRoles]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-emerald-500" />
      </div>
    );
  }

  if (!user) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  if (allowedRoles && !allowedRoles.includes(user.role)) {
    // Redirect based on role if they are in the wrong place
    // Or just redirect to home
    return <Navigate to="/" replace />;
  }

  return (
    <>
      <ToastContainer position="top-center" autoClose={3000} hideProgressBar={false} />
      {children ? children : <Outlet />}
    </>
  );
};

export default ProtectedRoutes;