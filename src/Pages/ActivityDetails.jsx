import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router';
import toast from 'react-hot-toast';
import useAuth from '../Hooks/useAuth';

const ActivityDetail = () => {
  const { id } = useParams();
  const { user } = useAuth();
  const navigate = useNavigate();
  const [activity, setActivity] = useState(null);
  const [loading, setLoading] = useState(true);
  const [progress, setProgress] = useState(0);
  const [status, setStatus] = useState('');
  const [updating, setUpdating] = useState(false);
  const [error, setError] = useState(false);

  const API_BASE = import.meta.env.VITE_API_URL || '';

  useEffect(() => {
    if (user && user.email) {
      fetchActivity();
    }
  }, [id, user]);

  const fetchActivity = async () => {
    try {
      const response = await fetch(`${API_BASE}/api/user-challenges/${encodeURIComponent(user.email)}`);
      
      if (!response.ok) {
        setError(true);
        toast.error('Failed to load activities');
        setTimeout(() => {
          navigate('/my-activities', { replace: true });
        }, 2000);
        return;
      }

      const data = await response.json();
      const foundActivity = data.find(item => item._id === id);
      
      if (foundActivity) {
        setActivity(foundActivity);
        setProgress(foundActivity.progress || 0);
        setStatus(foundActivity.status || 'Not Started');
      } else {
        setError(true);
        toast.error('Activity not found');
        setTimeout(() => {
          navigate('/my-activities', { replace: true });
        }, 2000);
      }
    } catch (error) {
      console.error('Failed to fetch activity:', error);
      setError(true);
      toast.error('Failed to load activity');
      setTimeout(() => {
        navigate('/my-activities', { replace: true });
      }, 2000);
    } finally {
      setLoading(false);
    }
  };

  const handleUpdate = async () => {
    setUpdating(true);
    try {
      const response = await fetch(`${API_BASE}/api/user-challenges/${id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ progress: parseInt(progress), status })
      });

      if (response.ok) {
        toast.success('Progress updated successfully!');
        fetchActivity();
      } else {
        toast.error('Failed to update progress');
      }
    } catch (error) {
      console.error('Error updating progress:', error);
      toast.error('Failed to update progress');
    } finally {
      setUpdating(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 py-12 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-emerald-500"></div>
      </div>
    );
  }

  if (error || !activity) {
    return (
      <div className="min-h-screen bg-gray-50 py-12 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Activity not found</h2>
          <p className="text-gray-600 mb-4">Redirecting to My Activities...</p>
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-emerald-500 mx-auto"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12 mt-18">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <Link to="/my-activities" className="text-emerald-600 hover:text-emerald-700 mb-6 inline-block">
          ← Back to My Activities
        </Link>

        <div className="bg-white rounded-xl shadow-lg overflow-hidden">
          <div className="relative h-64">
            <img
              src={activity.challenge?.imageUrl || 'https://via.placeholder.com/800x400?text=Challenge'}
              alt={activity.challenge?.title || 'Challenge'}
              className="w-full h-full object-cover"
              onError={(e) => {
                e.target.src = 'https://via.placeholder.com/800x400?text=Challenge+Image';
              }}
            />
          </div>

          <div className="p-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-4">{activity.challenge?.title || 'Challenge'}</h1>
            <p className="text-gray-600 mb-6">{activity.challenge?.description || 'No description available'}</p>

            <div className="bg-gray-50 rounded-lg p-6 mb-6">
              <h2 className="text-xl font-bold text-gray-900 mb-4">Update Progress</h2>
              
              <div className="mb-4">
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Progress: {progress}%
                </label>
                <input
                  type="range"
                  min="0"
                  max="100"
                  value={progress}
                  onChange={(e) => setProgress(e.target.value)}
                  className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
                />
                <div className="w-full bg-gray-200 rounded-full h-3 mt-2">
                  <div
                    className="bg-emerald-500 h-3 rounded-full transition-all duration-300"
                    style={{ width: `${progress}%` }}
                  ></div>
                </div>
              </div>

              <div className="mb-4">
                <label className="block text-sm font-semibold text-gray-700 mb-2">Status</label>
                <select
                  value={status}
                  onChange={(e) => setStatus(e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                >
                  <option value="Not Started">Not Started</option>
                  <option value="Ongoing">Ongoing</option>
                  <option value="Finished">Finished</option>
                </select>
              </div>

              <button
                onClick={handleUpdate}
                disabled={updating}
                className="w-full bg-emerald-500 hover:bg-emerald-600 text-white py-3 rounded-lg font-bold transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {updating ? 'Updating...' : 'Update Progress'}
              </button>
            </div>

            <div className="grid grid-cols-2 gap-4 text-sm">
              <div className="bg-gray-50 rounded-lg p-4">
                <p className="text-gray-600">Joined Date</p>
                <p className="font-semibold text-gray-900">
                  {activity.joinDate ? new Date(activity.joinDate).toLocaleDateString() : '—'}
                </p>
              </div>
              <div className="bg-gray-50 rounded-lg p-4">
                <p className="text-gray-600">Duration</p>
                <p className="font-semibold text-gray-900">{activity.challenge?.duration || '—'} days</p>
              </div>
              <div className="bg-gray-50 rounded-lg p-4">
                <p className="text-gray-600">Target</p>
                <p className="font-semibold text-gray-900">{activity.challenge?.target || '—'}</p>
              </div>
              <div className="bg-gray-50 rounded-lg p-4">
                <p className="text-gray-600">Impact Metric</p>
                <p className="font-semibold text-gray-900">{activity.challenge?.impactMetric || '—'}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ActivityDetail;