import React, { useState, useEffect } from 'react';
import {
  FaUserCircle, FaEnvelope, FaCalendarAlt, FaSignOutAlt, FaLeaf,
  FaTrophy, FaCloud, FaRecycle, FaTint, FaRunning, FaCheckCircle, FaTree,
  FaEdit, FaSave, FaTimes, FaCamera
} from 'react-icons/fa';
import { Link, useLocation } from 'react-router';
import toast from 'react-hot-toast';
import useAuth from '../Hooks/useAuth';
import useTitle from '../Hooks/useTitle';

const MyProfile = () => {
  useTitle("My Profile")
  const { user, loading, logout } = useAuth();
  const location = useLocation();
  const isDashboard = location.pathname.includes('/dashboard');

  const [isEditing, setIsEditing] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [userProfile, setUserProfile] = useState(null);
  const [editForm, setEditForm] = useState({
    displayName: '',
    bio: '',
    photoURL: '',
    coverPhotoURL: ''
  });

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
      fetchUserProfile();
      fetchUserStats();
    }
  }, [user]);

  const fetchUserProfile = async () => {
    try {
      const response = await fetch(`${API_BASE}/api/users/${encodeURIComponent(user.email)}`);
      const data = await response.json();
      setUserProfile(data);
      setEditForm({
        displayName: data.displayName || user.displayName || '',
        bio: data.bio || '',
        photoURL: data.photoURL || user.photoURL || '',
        coverPhotoURL: data.coverPhotoURL || ''
      });
    } catch (error) {
      console.error('Failed to fetch user profile:', error);
    }
  };

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

  const handleImageUpload = (e, field) => {
    const file = e.target.files[0];
    if (!file) return;

    // Validate file size (max 5MB for original)
    if (file.size > 5 * 1024 * 1024) {
      toast.error('Image size should be less than 5MB');
      return;
    }

    // Validate file type
    if (!file.type.startsWith('image/')) {
      toast.error('Please upload an image file');
      return;
    }

    // Compress and convert to base64
    const reader = new FileReader();
    reader.onload = (event) => {
      const img = new Image();
      img.onload = () => {
        // Create canvas for compression
        const canvas = document.createElement('canvas');
        const ctx = canvas.getContext('2d');

        // Set max dimensions
        const maxWidth = field === 'coverPhotoURL' ? 1200 : 400;
        const maxHeight = field === 'coverPhotoURL' ? 400 : 400;

        let width = img.width;
        let height = img.height;

        // Calculate new dimensions
        if (width > height) {
          if (width > maxWidth) {
            height = (height * maxWidth) / width;
            width = maxWidth;
          }
        } else {
          if (height > maxHeight) {
            width = (width * maxHeight) / height;
            height = maxHeight;
          }
        }

        canvas.width = width;
        canvas.height = height;

        // Draw and compress
        ctx.drawImage(img, 0, 0, width, height);

        // Convert to base64 with compression
        const compressedBase64 = canvas.toDataURL('image/jpeg', 0.7);

        setEditForm(prev => ({
          ...prev,
          [field]: compressedBase64
        }));

        toast.success('Image uploaded successfully!');
      };
      img.src = event.target.result;
    };
    reader.readAsDataURL(file);
  };

  const handleSaveProfile = async () => {
    setIsSaving(true);
    try {
      const response = await fetch(`${API_BASE}/api/users/profile/${encodeURIComponent(user.email)}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(editForm)
      });

      const data = await response.json();

      if (response.ok) {
        setUserProfile(data.user);
        setIsEditing(false);
        toast.success('Profile updated successfully!');
      } else {
        toast.error(data.message || 'Failed to update profile');
      }
    } catch (error) {
      console.error('Failed to save profile:', error);
      toast.error('Failed to update profile');
    } finally {
      setIsSaving(false);
    }
  };

  const handleCancelEdit = () => {
    setEditForm({
      displayName: userProfile?.displayName || user.displayName || '',
      bio: userProfile?.bio || '',
      photoURL: userProfile?.photoURL || user.photoURL || '',
      coverPhotoURL: userProfile?.coverPhotoURL || ''
    });
    setIsEditing(false);
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

  const displayName = isEditing ? editForm.displayName : (userProfile?.displayName || user.displayName || 'EcoTracker User');
  const bio = isEditing ? editForm.bio : (userProfile?.bio || '');
  const photoURL = isEditing ? editForm.photoURL : (userProfile?.photoURL || user.photoURL);
  const coverPhotoURL = isEditing ? editForm.coverPhotoURL : (userProfile?.coverPhotoURL || '');

  return (
    <div className={`min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors duration-300 ${isDashboard ? 'py-6' : 'py-12 mt-18'}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white">My EcoTrack Profile</h1>
          {!isEditing ? (
            <button
              onClick={() => setIsEditing(true)}
              className="flex items-center gap-2 px-4 py-2 bg-emerald-500 hover:bg-emerald-600 text-white rounded-lg font-semibold transition-colors"
            >
              <FaEdit /> Edit Profile
            </button>
          ) : (
            <div className="flex gap-2">
              <button
                onClick={handleSaveProfile}
                disabled={isSaving}
                className="flex items-center gap-2 px-4 py-2 bg-emerald-500 hover:bg-emerald-600 text-white rounded-lg font-semibold transition-colors disabled:opacity-50"
              >
                <FaSave /> {isSaving ? 'Saving...' : 'Save'}
              </button>
              <button
                onClick={handleCancelEdit}
                disabled={isSaving}
                className="flex items-center gap-2 px-4 py-2 bg-gray-500 hover:bg-gray-600 text-white rounded-lg font-semibold transition-colors disabled:opacity-50"
              >
                <FaTimes /> Cancel
              </button>
            </div>
          )}
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden border border-transparent dark:border-gray-700">
          {/* Cover Photo */}
          <div className="relative h-48 bg-gradient-to-r from-emerald-400 to-cyan-500">
            {coverPhotoURL && (
              <img src={coverPhotoURL} alt="Cover" className="w-full h-full object-cover" />
            )}
            {isEditing && (
              <label className="absolute bottom-4 right-4 cursor-pointer bg-black/50 hover:bg-black/70 text-white px-4 py-2 rounded-lg flex items-center gap-2 transition-colors">
                <FaCamera /> Change Cover
                <input
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={(e) => handleImageUpload(e, 'coverPhotoURL')}
                />
              </label>
            )}
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 p-8">
            <div className="lg:col-span-1 border-b lg:border-r lg:border-b-0 border-gray-200 dark:border-gray-700 pb-6 lg:pb-0 lg:pr-8">
              <div className="flex flex-col items-center text-center">
                <div className="relative -mt-20 mb-4">
                  <div className="w-32 h-32 rounded-full overflow-hidden border-4 border-white dark:border-gray-800 shadow-lg bg-white">
                    {photoURL ? (
                      <img
                        src={photoURL}
                        alt={displayName}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <FaUserCircle className="w-full h-full text-gray-400 bg-gray-100 p-2" />
                    )}
                  </div>
                  {isEditing && (
                    <label className="absolute bottom-0 right-0 cursor-pointer bg-emerald-500 hover:bg-emerald-600 text-white p-2 rounded-full shadow-lg transition-colors">
                      <FaCamera />
                      <input
                        type="file"
                        accept="image/*"
                        className="hidden"
                        onChange={(e) => handleImageUpload(e, 'photoURL')}
                      />
                    </label>
                  )}
                </div>

                {isEditing ? (
                  <input
                    type="text"
                    value={editForm.displayName}
                    onChange={(e) => setEditForm(prev => ({ ...prev, displayName: e.target.value }))}
                    className="text-2xl font-bold text-gray-900 dark:text-white mb-2 px-3 py-1 border-2 border-emerald-500 rounded-lg bg-transparent text-center w-full"
                    placeholder="Your Name"
                  />
                ) : (
                  <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-1">{displayName}</h2>
                )}

                <p className="text-gray-600 dark:text-gray-400 flex items-center mb-4">
                  <FaEnvelope className="mr-2 text-sm" />
                  {user.email}
                </p>

                {isEditing ? (
                  <textarea
                    value={editForm.bio}
                    onChange={(e) => setEditForm(prev => ({ ...prev, bio: e.target.value }))}
                    className="w-full px-3 py-2 border-2 border-emerald-500 rounded-lg bg-transparent text-gray-700 dark:text-gray-300 mb-4 resize-none"
                    placeholder="Tell us about yourself..."
                    rows="3"
                  />
                ) : bio ? (
                  <p className="text-sm text-gray-600 dark:text-gray-400 mb-4 italic">"{bio}"</p>
                ) : null}

                <div className="text-sm text-gray-500 dark:text-gray-400 space-y-2 w-full max-w-xs">
                  <div className="flex justify-between border-t pt-2 border-gray-100 dark:border-gray-700">
                    <span className="font-medium">Member Since:</span>
                    <span className="flex items-center"><FaCalendarAlt className="mr-1 text-xs" /> {memberSince}</span>
                  </div>
                  <div className="flex justify-between border-t pt-2 border-gray-100 dark:border-gray-700">
                    <span className="font-medium">Last Login:</span>
                    <span className="flex items-center"><FaCalendarAlt className="mr-1 text-xs" /> {lastLogin}</span>
                  </div>
                </div>

                <button
                  onClick={handleLogout}
                  className="w-full max-w-xs mt-6 flex items-center justify-center text-red-500 border-2
                   border-red-500 hover:bg-red-50 dark:hover:bg-red-900/10 px-4 py-2 rounded-lg font-semibold transition-colors"
                >
                  <FaSignOutAlt className="mr-2" />
                  Logout
                </button>
              </div>
            </div>

            <div className="lg:col-span-2 space-y-8">
              <h3 className="text-xl font-bold text-gray-900 dark:text-white border-b border-gray-200 dark:border-gray-700 pb-2 mb-4">Your Environmental Impact</h3>

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

              <h3 className="text-xl font-bold text-gray-900 dark:text-white border-b border-gray-200 dark:border-gray-700 pb-2 mb-4">My Status</h3>

              {activeChallenge ? (
                <div className="bg-emerald-50 dark:bg-emerald-900/20 p-4 rounded-lg border border-emerald-200 dark:border-emerald-800/50">
                  <h4 className="text-lg font-semibold text-emerald-700 dark:text-emerald-400 mb-2">Current Active Challenge:</h4>
                  <p className="text-gray-600 dark:text-gray-400">
                    <strong>{activeChallenge.challenge.title}</strong> - Progress:
                    <span className="text-emerald-600 dark:text-emerald-400 font-bold">{activeChallenge.progress}%</span>
                  </p>
                  <Link to="/my-activities" className="text-emerald-600 font-medium
                   mt-2 inline-block hover:underline text-sm">
                    Update Progress →
                  </Link>
                </div>
              ) : (
                <div className="bg-gray-50 dark:bg-gray-700/50 p-4 rounded-lg border border-gray-200 dark:border-gray-700">
                  <p className="text-gray-600 dark:text-gray-400">No active challenges. <Link to="/challenges"
                    className="text-emerald-600 dark:text-emerald-400 hover:underline font-semibold">Join one now!</Link></p>
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
    <div className="flex flex-col items-center justify-center p-3 border border-gray-100 dark:border-gray-700 rounded-lg shadow-sm bg-white dark:bg-gray-800 transition-colors">
      <IconComp className="text-3xl mb-1 text-emerald-600 dark:text-emerald-400" />
      <span className="text-xl font-extrabold text-emerald-600 dark:text-emerald-400">{value}</span>
      <span className="text-xs text-gray-600 dark:text-gray-400 mt-1 text-center">{label}</span>
    </div>
  );
};

export default MyProfile;