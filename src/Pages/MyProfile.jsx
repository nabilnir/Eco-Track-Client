// src/pages/MyProfile.jsx
import React from 'react';
import { FaUserCircle, FaEnvelope, FaCalendarAlt, FaSignOutAlt, FaLeaf } from 'react-icons/fa';
import { Link } from 'react-router';
import toast from 'react-hot-toast';
import useAuth from '../Hooks/useAuth';

const MyProfile = () => {
  const { user, loading, logout } = useAuth();

  const handleLogout = () => {
    logout()
      .then(() => {
        toast.success('Logged out successfully!');
      })
      .catch((error) => {
        console.error("Logout Error:", error);
        toast.error('Logout failed.');
      });
  };

  if (loading) {
    return (
      <div className="loading-container">
        <FaLeaf className="text-5xl text-primary-color animate-spin" />
        <p className="text-text-light mt-4">Loading profile data...</p>
      </div>
    );
  }

  
  if (!user) {
    return (
        <div className="container section text-center">
            <p className="text-xl text-error">You must be logged in to view this page.</p>
            <Link to="/login" className="btn btn-primary mt-4">Go to Login</Link>
        </div>
    );
  }
  
  
  const memberSince = user.metadata?.creationTime 
    ? new Date(user.metadata.creationTime).toLocaleDateString() 
    : 'N/A';
  const lastLogin = user.metadata?.lastSignInTime
    ? new Date(user.metadata.lastSignInTime).toLocaleDateString()
    : 'N/A';

  return (
    <div className="container section min-h-screen py-10">
      <h1 className="section-title text-center mb-8">My EcoTrack Profile</h1>

      {/* Profile Card Layout */}
      <div className="card max-w-4xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-8 p-6 sm:p-10">
        
        {/*  User Details */}
        <div className="lg:col-span-1 border-b lg:border-r lg:border-b-0 border-gray-200 pb-6 lg:pb-0 lg:pr-8">
          <div className="flex flex-col items-center text-center">
            {/* Profile Image */}
            <div className="w-32 h-32 rounded-full overflow-hidden mb-4 border-4 border-green-500 shadow-lg">
              {user.photoURL ? (
                <img 
                  src={user.photoURL} 
                  alt={user.displayName || 'User Profile'} 
                  className="w-full h-full object-cover" 
                />
              ) : (
                <FaUserCircle className="w-full h-full text-gray-400 bg-gray-100 p-2" />
              )}
            </div>
            
            <h2 className="text-2xl font-bold text-text-dark mb-1">{user.displayName || 'EcoTracker User'}</h2>
            
            <p className="text-text-light flex items-center mb-4">
              <FaEnvelope className="mr-2 text-sm" />
              {user.email}
            </p>
            
            {/* Account Details */}
            <div className="text-sm text-gray-500 space-y-2 w-full max-w-xs">
                <div className="flex justify-between border-t pt-2 border-gray-100">
                    <span className="font-medium">Member Since:</span>
                    <span className="flex items-center"><FaCalendarAlt className="mr-1 text-xs" /> {memberSince}</span>
                </div>
                <div className="flex justify-between border-t pt-2 border-gray-100">
                    <span className="font-medium">Last Login:</span>
                    <span className="flex items-center"><FaCalendarAlt className="mr-1 text-xs" /> {lastLogin}</span>
                </div>
            </div>

            {/* Logout Button */}
            <button
              onClick={handleLogout}
              className="btn btn-outline w-full max-w-xs mt-6 flex items-center justify-center text-red-500 hover:bg-red-50"
            >
              <FaSignOutAlt className="mr-2" />
              Logout
            </button>
          </div>
        </div>

        {/* Impact Metrics & Challenges */}
        <div className="lg:col-span-2 space-y-8">
          <h3 className="text-xl font-bold text-text-dark border-b pb-2 mb-4">Your Environmental Impact</h3>
          
          {/* Impact Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            <MetricBox value="4" label="Challenges Joined" icon="🏆" />
            <MetricBox value="350 kg" label="CO2 Saved" icon="💨" />
            <MetricBox value="80 kg" label="Plastic Reduced" icon="♻️" />
            <MetricBox value="4" label="Chanllenge Inprogress" icon="🏅" />
            <MetricBox value="4" label="Chanllenge Completed" icon="🏅" />
          </div>

          <h3 className="text-xl font-bold text-text-dark border-b pb-2 mb-4">My Status</h3>

          {/* User Status */}
          <div className="bg-green-50 p-4 rounded-lg border border-green-200">
              <h4 className="text-lg font-semibold text-green-700 mb-2">Current Active Challenge:</h4>
              <p className="text-gray-600">
                **Plastic-Free Lunch Hero** - Progress: <span className="text-green-600 font-bold">65%</span>
              </p>
              <Link to="/my-activities" className="text-primary-color font-medium mt-2 inline-block hover:underline text-sm">
                  Update Progress &rarr;
              </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

// Helper Component for Metrics
const MetricBox = ({ value, label, icon }) => (
    <div className="flex flex-col items-center justify-center p-3 border border-gray-100 rounded-lg shadow-sm bg-white">
        <span className="text-3xl mb-1">{icon}</span>
        <span className="text-xl font-extrabold text-primary-color">{value}</span>
        <span className="text-xs text-text-light mt-1 text-center">{label}</span>
    </div>
);

export default MyProfile;