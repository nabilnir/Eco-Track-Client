import React, { useState, useEffect } from 'react';
import { FaUserCircle, FaEnvelope, FaCalendarAlt, FaSignOutAlt, FaLeaf,
         FaTrophy, FaCloud, FaRecycle, FaTint, FaRunning, FaCheckCircle, FaTree } from 'react-icons/fa';
import { Link } from 'react-router';
import toast from 'react-hot-toast';
import useAuth from '../Hooks/useAuth';
import useTitle from '../Hooks/useTitle';

const MyProfile = () => {
  useTitle("My Profile")
  const { user, loading, logout } = useAuth();
  const [userStats, setUserStats] = useState({
    totalChallenges: 0,
    inProgressChallenges: 0,
    completedChallenges: 0,
    co2Saved: 0,
    plasticReduced: 0,
    waterSaved: 0,
    treesPlanted: 0
  });
  const [activeChallenge, setActiveChallenge] = useState(null);
  const [statsLoading, setStatsLoading] = useState(true);

  const API_BASE = import.meta.env.VITE_API_URL || '';

  useEffect(() => {
    if (user) {
      fetchUserStats();
    }
    
  }, [user]);

  const fetchUserStats = async () => {
    try {
      const response = await fetch(`${API_BASE}/api/user-challenges/${encodeURIComponent(user.email)}`);
      const userChallenges = await response.json();

      const totalChallenges = userChallenges.length;
      const inProgress = userChallenges.filter(uc => uc.status === 'Ongoing').length;
      const completed = userChallenges.filter(uc => uc.status === 'Finished').length;

      let co2 = 0;
      let plastic = 0;
      let water = 0;
      let trees = 0;

      userChallenges.forEach(uc => {
        if (uc.status === 'Finished' && uc.challenge) {
          const category = uc.challenge.category;
          const progress = (uc.progress ?? 0) / 100;

          if (category === 'Energy Conservation' || category === 'Sustainable Transport') {
            co2 += 2.5 * progress;
          } else if (category === 'Waste Reduction') {
            plastic += 1.8 * progress;
          } else if (category === 'Water Conservation') {
            water += 5 * progress;
          } else if (category === 'Green Living') {
            trees += 1 * progress;
          }
        }
      });

      setUserStats({
        totalChallenges,
        inProgressChallenges: inProgress,
        completedChallenges: completed,
        co2Saved: Math.floor(co2),
        plasticReduced: Math.floor(plastic),
        waterSaved: Math.floor(water),
        treesPlanted: Math.floor(trees)
      });

      const ongoing = userChallenges.find(uc => uc.status === 'Ongoing');
      setActiveChallenge(ongoing || null);

    } catch (error) {
      console.error('Failed to fetch user stats:', error);
    } finally {
      setStatsLoading(false);
    }
  };

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
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <FaLeaf className="text-5xl text-emerald-500 animate-spin mx-auto" />
          <p className="text-gray-600 mt-4">Loading profile data...</p>
        </div>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <p className="text-xl text-red-500 mb-4">You must be logged in to view this page.</p>
          <Link to="/login" className="bg-emerald-500 hover:bg-emerald-600 text-white px-6 py-3 rounded-lg font-semibold">
            Go to Login
          </Link>
        </div>
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
    <div className="min-h-screen bg-gray-50 py-12 mt-18">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-4xl font-bold text-center text-gray-900 mb-8">My EcoTrack Profile</h1>

        <div className="bg-white rounded-xl shadow-lg overflow-hidden">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 p-8">
            
            <div className="lg:col-span-1 border-b lg:border-r lg:border-b-0 border-gray-200 pb-6 lg:pb-0 lg:pr-8">
              <div className="flex flex-col items-center text-center">
                <div className="w-32 h-32 rounded-full overflow-hidden mb-4 border-4 border-emerald-500 shadow-lg">
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
                
                <h2 className="text-2xl font-bold text-gray-900 mb-1">{user.displayName || 'EcoTracker User'}</h2>
                
                <p className="text-gray-600 flex items-center mb-4">
                  <FaEnvelope className="mr-2 text-sm" />
                  {user.email}
                </p>
                
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

                <button
                  onClick={handleLogout}
                  className="w-full max-w-xs mt-6 flex items-center justify-center text-red-500 border-2
                   border-red-500 hover:bg-red-50 px-4 py-2 rounded-lg font-semibold transition-colors"
                >
                  <FaSignOutAlt className="mr-2" />
                  Logout
                </button>
              </div>
            </div>

            <div className="lg:col-span-2 space-y-8">
              <h3 className="text-xl font-bold text-gray-900 border-b pb-2 mb-4">Your Environmental Impact</h3>
              
              {statsLoading ? (
                <div className="text-center py-8">
                  <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-emerald-500 mx-auto"></div>
                </div>
              ) : (
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                  <MetricBox value={userStats.totalChallenges} label="Challenges Joined" Icon={FaTrophy} />
                  <MetricBox value={`${userStats.co2Saved} kg`} label="CO₂ Saved" Icon={FaCloud} />
                  <MetricBox value={`${userStats.plasticReduced} kg`} label="Plastic Reduced" Icon={FaRecycle} />
                  <MetricBox value={`${userStats.waterSaved} L`} label="Water Saved" Icon={FaTint} />
                  <MetricBox value={userStats.inProgressChallenges} label="In Progress" Icon={FaRunning} />
                  <MetricBox value={userStats.completedChallenges} label="Completed" Icon={FaCheckCircle} />
                  <MetricBox value={userStats.treesPlanted} label="Trees Planted" Icon={FaTree} />
                </div>
              )}

              <h3 className="text-xl font-bold text-gray-900 border-b pb-2 mb-4">My Status</h3>

              {activeChallenge ? (
                <div className="bg-emerald-50 p-4 rounded-lg border border-emerald-200">
                  <h4 className="text-lg font-semibold text-emerald-700 mb-2">Current Active Challenge:</h4>
                  <p className="text-gray-600">
                    <strong>{activeChallenge.challenge.title}</strong> - Progress: 
                    <span className="text-emerald-600 font-bold">{activeChallenge.progress}%</span>
                  </p>
                  <Link to="/my-activities" className="text-emerald-600 font-medium
                   mt-2 inline-block hover:underline text-sm">
                    Update Progress →
                  </Link>
                </div>
              ) : (
                <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
                  <p className="text-gray-600">No active challenges. <Link to="/challenges" 
                  className="text-emerald-600 hover:underline font-semibold">Join one now!</Link></p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const MetricBox = ({ value, label, Icon }) => {
  const IconComp = Icon || FaLeaf;
  return (
    <div className="flex flex-col items-center justify-center p-3 border border-gray-100 rounded-lg shadow-sm bg-white">
      <IconComp className="text-3xl mb-1 text-emerald-600" />
      <span className="text-xl font-extrabold text-emerald-600">{value}</span>
      <span className="text-xs text-gray-600 mt-1 text-center">{label}</span>
    </div>
  );
};

export default MyProfile;