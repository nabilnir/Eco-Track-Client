import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router';
import { toast } from 'react-toastify';

const ActivityDetail = () => {
  const { id } = useParams();
  const [activity, setActivity] = useState(null);
  const [loading, setLoading] = useState(true);
  const [progress, setProgress] = useState(0);
  const [status, setStatus] = useState('');
  const [updating, setUpdating] = useState(false);

  useEffect(() => {
    fetchActivity();
    
  }, [id]);

  const fetchActivity = async () => {
    try {
      setLoading(true);
      const response = await fetch(`${import.meta.env.VITE_API_URL}/api/user-challenges/${id}`);
      if (!response.ok) throw new Error(`Failed to load (${response.status})`);
      const data = await response.json();

      
      setActivity(data || null);
      setProgress(Number(data?.progress ?? 0));
      setStatus(data?.status ?? 'Not Started');
    } catch (error) {
      console.error('Failed to fetch activity:', error);
      setActivity(null);
      toast.error('Failed to load activity.');
    } finally {
      setLoading(false);
    }
  };

  const handleUpdate = async () => {
    setUpdating(true);
    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/api/user-challenges/${id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ progress: Number(progress), status })
      });

      if (response.ok) {
        toast.success('Progress updated successfully!');
        await fetchActivity();
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

  
  if (!activity || !activity.challenge) {
    return (
      <div className="min-h-screen bg-gray-50 py-12 flex items-center justify-center">
        <div className="text-center">
          <p className="text-gray-500 mb-6">Activity not found or missing challenge data.</p>
          <Link to="/my-activities" className="text-emerald-600 hover:text-emerald-700">
            ← Back to My Activities
          </Link>
        </div>
      </div>
    );
  }

  const challenge = activity.challenge;

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <Link to="/my-activities" className="text-emerald-600 hover:text-emerald-700 mb-6 inline-block">
          ← Back to My Activities
        </Link>

        <div className="bg-white rounded-xl shadow-lg overflow-hidden">
          <div className="relative h-64">
            <img
              src={challenge.imageUrl ?? '/assets/placeholder.jpg'}
              alt={challenge.title ?? 'Challenge'}
              className="w-full h-full object-cover"
            />
          </div>

          <div className="p-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-4">{challenge.title ?? 'Untitled Challenge'}</h1>
            <p className="text-gray-600 mb-6">{challenge.description ?? ''}</p>

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
                  onChange={(e) => setProgress(Number(e.target.value))}
                  className="w-full"
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
                className="w-full bg-emerald-500 hover:bg-emerald-600 text-white py-3 rounded-lg font-bold transition-colors disabled:opacity-50"
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
                <p className="font-semibold text-gray-900">{challenge.duration ?? '—'} days</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ActivityDetail;
