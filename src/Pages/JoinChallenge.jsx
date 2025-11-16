import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router';
import toast from 'react-hot-toast';
import useAuth from '../Hooks/useAuth';

const JoinChallenge = () => {
  const { id } = useParams();
  const { user } = useAuth();
  const navigate = useNavigate();
  const [challenge, setChallenge] = useState(null);
  const [loading, setLoading] = useState(true);
  const [joining, setJoining] = useState(false);

  useEffect(() => {
    fetchChallenge();
  }, [id]);

  const fetchChallenge = async () => {
    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/api/challenges/${id}`);
      const data = await response.json();
      setChallenge(data);
    } catch (error) {
      console.error('Failed to fetch challenge:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleJoin = async () => {
    setJoining(true);
    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/api/challenges/join/${id}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ userId: user.email })
      });

      if (response.ok) {
        toast.success('Successfully joined the challenge!');
        navigate('/my-activities');
      } else {
        const data = await response.json();
        toast.error(data.message || 'Failed to join challenge');
      }
    } catch (error) {
      console.error('Error joining challenge:', error);
      toast.error('Failed to join challenge');
    } finally {
      setJoining(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 py-12 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-emerald-500"></div>
      </div>
    );
  }

  if (!challenge) {
    return (
      <div className="min-h-screen bg-gray-50 py-12 flex items-center justify-center">
        <p className="text-gray-500">Challenge not found</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12 mt-15">
      <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-xl shadow-lg p-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-6">Join Challenge</h1>
          
          <div className="mb-6">
            <img
              src={challenge.imageUrl}
              alt={challenge.title}
              className="w-full h-64 object-cover rounded-lg mb-4"
            />
            <h2 className="text-2xl font-bold text-gray-900 mb-2">{challenge.title}</h2>
            <p className="text-gray-600 mb-4">{challenge.description}</p>
            
            <div className="bg-gray-50 rounded-lg p-4 space-y-2">
              <p><strong>Duration:</strong> {challenge.duration} days</p>
              <p><strong>Target:</strong> {challenge.target}</p>
              <p><strong>Impact Metric:</strong> {challenge.impactMetric}</p>
              <p><strong>Current Participants:</strong> {challenge.participants}</p>
            </div>
          </div>

          <div className="flex gap-4">
            <button
              onClick={handleJoin}
              disabled={joining}
              className="flex-1 bg-emerald-500 hover:bg-emerald-600 text-white py-3 rounded-lg font-bold transition-colors disabled:opacity-50"
            >
              {joining ? 'Joining...' : 'Confirm Join'}
            </button>
            <button
              onClick={() => navigate(-1)}
              className="px-6 bg-gray-200 hover:bg-gray-300 text-gray-700 py-3 rounded-lg font-bold transition-colors"
            >
              Cancel
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default JoinChallenge;