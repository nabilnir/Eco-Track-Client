import React, { useState, useEffect } from 'react';
import { FaUser, FaEnvelope, FaPhone, FaMapMarkerAlt, FaCalendarAlt, FaEdit, FaSave, FaTimes, FaCamera, FaLeaf, FaTrophy, FaChartLine } from 'react-icons/fa';
import useAuth from '../../Hooks/useAuth';
import toast from 'react-hot-toast';

const Profile = () => {
  const { user, updateUserProfile } = useAuth();
  const [isEditing, setIsEditing] = useState(false);
  const [loading, setLoading] = useState(false);
  const [profileData, setProfileData] = useState({
    displayName: '',
    email: '',
    phone: '',
    location: '',
    bio: '',
    joinDate: '',
    totalActivities: 0,
    totalChallenges: 0,
    totalPoints: 0,
    level: 'Beginner',
    achievements: []
  });

  useEffect(() => {
    if (user) {
      setProfileData({
        displayName: user.displayName || '',
        email: user.email || '',
        phone: user.phoneNumber || '',
        location: '',
        bio: '',
        joinDate: user.metadata?.creationTime ? new Date(user.metadata.creationTime).toLocaleDateString() : 'Unknown',
        totalActivities: 0,
        totalChallenges: 0,
        totalPoints: 0,
        level: 'Beginner',
        achievements: []
      });
      
      // Fetch user statistics
      fetchUserStats();
    }
  }, [user]);

  const fetchUserStats = async () => {
    try {
      // In a real app, this would fetch from your backend
      const mockStats = {
        totalActivities: 42,
        totalChallenges: 8,
        totalPoints: 1250,
        level: 'Eco Warrior',
        achievements: [
          { id: 1, name: 'First Activity', description: 'Completed your first eco-activity', icon: '🌱', earned: true },
          { id: 2, name: 'Tree Hugger', description: 'Planted 10 trees', icon: '🌳', earned: true },
          { id: 3, name: 'Water Saver', description: 'Saved 1000 gallons of water', icon: '💧', earned: true },
          { id: 4, name: 'Energy Expert', description: 'Reduced energy usage by 50%', icon: '⚡', earned: false },
          { id: 5, name: 'Zero Waste Hero', description: '30 days zero waste', icon: '♻️', earned: false },
          { id: 6, name: 'Climate Champion', description: 'Completed 100 activities', icon: '🏆', earned: false }
        ]
      };
      
      setProfileData(prev => ({ ...prev, ...mockStats }));
    } catch (error) {
      console.error('Failed to fetch user stats:', error);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setProfileData(prev => ({ ...prev, [name]: value }));
  };

  const handleSave = async () => {
    setLoading(true);
    try {
      await updateUserProfile(profileData.displayName, user.photoURL);
      setIsEditing(false);
      toast.success('Profile updated successfully!');
    } catch (error) {
      console.error('Failed to update profile:', error);
      toast.error('Failed to update profile');
    } finally {
      setLoading(false);
    }
  };

  const handleCancel = () => {
    setProfileData({
      displayName: user.displayName || '',
      email: user.email || '',
      phone: user.phoneNumber || '',
      location: '',
      bio: '',
      joinDate: user.metadata?.creationTime ? new Date(user.metadata.creationTime).toLocaleDateString() : 'Unknown',
      totalActivities: profileData.totalActivities,
      totalChallenges: profileData.totalChallenges,
      totalPoints: profileData.totalPoints,
      level: profileData.level,
      achievements: profileData.achievements
    });
    setIsEditing(false);
  };

  const getLevelColor = (level) => {
    switch (level) {
      case 'Beginner': return 'bg-green-100 text-green-800';
      case 'Eco Warrior': return 'bg-blue-100 text-blue-800';
      case 'Sustainability Master': return 'bg-purple-100 text-purple-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      {/* Profile Header */}
      <div className="bg-white rounded-lg shadow-lg overflow-hidden">
        <div className="bg-gradient-to-r from-green-500 to-emerald-600 h-32"></div>
        <div className="px-6 pb-6">
          <div className="flex items-end -mt-16 mb-4">
            <div className="relative">
              <img
                src={user?.photoURL || 'https://picsum.photos/seed/user/200/200.jpg'}
                alt="Profile"
                className="w-32 h-32 rounded-full border-4 border-white shadow-lg"
              />
              {isEditing && (
                <button className="absolute bottom-0 right-0 bg-green-600 text-white p-2 rounded-full hover:bg-green-700 transition-colors">
                  <FaCamera size={14} />
                </button>
              )}
            </div>
            <div className="ml-6 flex-1">
              <div className="flex items-center justify-between">
                <div>
                  {isEditing ? (
                    <input
                      type="text"
                      name="displayName"
                      value={profileData.displayName}
                      onChange={handleInputChange}
                      className="text-2xl font-bold text-gray-900 border-b-2 border-green-500 focus:outline-none"
                    />
                  ) : (
                    <h1 className="text-2xl font-bold text-gray-900">{profileData.displayName}</h1>
                  )}
                  <p className="text-gray-600">{profileData.email}</p>
                  <div className="flex items-center mt-2 space-x-4">
                    <span className={`px-3 py-1 rounded-full text-sm font-medium ${getLevelColor(profileData.level)}`}>
                      {profileData.level}
                    </span>
                    <span className="text-sm text-gray-500">
                      <FaCalendarAlt className="inline mr-1" />
                      Joined {profileData.joinDate}
                    </span>
                  </div>
                </div>
                <div className="flex space-x-2">
                  {isEditing ? (
                    <>
                      <button
                        onClick={handleSave}
                        disabled={loading}
                        className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors disabled:opacity-50"
                      >
                        {loading ? 'Saving...' : <><FaSave className="inline mr-1" /> Save</>}
                      </button>
                      <button
                        onClick={handleCancel}
                        className="px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors"
                      >
                        <FaTimes className="inline mr-1" /> Cancel
                      </button>
                    </>
                  ) : (
                    <button
                      onClick={() => setIsEditing(true)}
                      className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
                    >
                      <FaEdit className="inline mr-1" /> Edit Profile
                    </button>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Bio Section */}
          <div className="mb-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-2">About</h3>
            {isEditing ? (
              <textarea
                name="bio"
                value={profileData.bio}
                onChange={handleInputChange}
                rows={3}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                placeholder="Tell us about yourself and your eco-journey..."
              />
            ) : (
              <p className="text-gray-600">
                {profileData.bio || 'No bio added yet. Tell us about your eco-journey!'}
              </p>
            )}
          </div>

          {/* Contact Information */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Contact Information</h3>
              <div className="space-y-3">
                <div className="flex items-center">
                  <FaEnvelope className="text-gray-400 mr-3" />
                  <span className="text-gray-600">{profileData.email}</span>
                </div>
                {isEditing ? (
                  <div className="flex items-center">
                    <FaPhone className="text-gray-400 mr-3" />
                    <input
                      type="tel"
                      name="phone"
                      value={profileData.phone}
                      onChange={handleInputChange}
                      className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                      placeholder="Phone number"
                    />
                  </div>
                ) : (
                  profileData.phone && (
                    <div className="flex items-center">
                      <FaPhone className="text-gray-400 mr-3" />
                      <span className="text-gray-600">{profileData.phone}</span>
                    </div>
                  )
                )}
                {isEditing ? (
                  <div className="flex items-center">
                    <FaMapMarkerAlt className="text-gray-400 mr-3" />
                    <input
                      type="text"
                      name="location"
                      value={profileData.location}
                      onChange={handleInputChange}
                      className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                      placeholder="Location"
                    />
                  </div>
                ) : (
                  profileData.location && (
                    <div className="flex items-center">
                      <FaMapMarkerAlt className="text-gray-400 mr-3" />
                      <span className="text-gray-600">{profileData.location}</span>
                    </div>
                  )
                )}
              </div>
            </div>

            {/* Statistics */}
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Eco Statistics</h3>
              <div className="space-y-3">
                <div className="flex items-center justify-between p-3 bg-green-50 rounded-lg">
                  <div className="flex items-center">
                    <FaLeaf className="text-green-600 mr-3" />
                    <span className="text-gray-700">Total Activities</span>
                  </div>
                  <span className="text-2xl font-bold text-green-600">{profileData.totalActivities}</span>
                </div>
                <div className="flex items-center justify-between p-3 bg-yellow-50 rounded-lg">
                  <div className="flex items-center">
                    <FaTrophy className="text-yellow-600 mr-3" />
                    <span className="text-gray-700">Challenges Completed</span>
                  </div>
                  <span className="text-2xl font-bold text-yellow-600">{profileData.totalChallenges}</span>
                </div>
                <div className="flex items-center justify-between p-3 bg-blue-50 rounded-lg">
                  <div className="flex items-center">
                    <FaChartLine className="text-blue-600 mr-3" />
                    <span className="text-gray-700">Eco Points</span>
                  </div>
                  <span className="text-2xl font-bold text-blue-600">{profileData.totalPoints}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Achievements */}
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Achievements</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {profileData.achievements.map((achievement) => (
                <div
                  key={achievement.id}
                  className={`p-4 rounded-lg border-2 ${
                    achievement.earned
                      ? 'border-green-200 bg-green-50'
                      : 'border-gray-200 bg-gray-50 opacity-60'
                  }`}
                >
                  <div className="flex items-center mb-2">
                    <span className="text-2xl mr-3">{achievement.icon}</span>
                    <h4 className="font-semibold text-gray-900">{achievement.name}</h4>
                  </div>
                  <p className="text-sm text-gray-600">{achievement.description}</p>
                  {achievement.earned && (
                    <div className="mt-2 text-xs text-green-600 font-medium">✓ Earned</div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
