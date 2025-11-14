import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router';
import toast from 'react-hot-toast';
import { FaUsers, FaCalendar, FaClock } from 'react-icons/fa';
import useAuth from '../Hooks/useAuth';
import { FaDownLeftAndUpRightToCenter } from 'react-icons/fa6';

const ChallengeDetails = () => {
  const { id } = useParams();
  const { user } = useAuth();
  const navigate = useNavigate();
  const [challenge, setChallenge] = useState(null);
  const [loading, setLoading] = useState(true);

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
      toast.error('Failed to load challenge');
    } finally {
      setLoading(false);
    }
  };

  const handleJoin = () => {
    if (!user) {
      toast.error('Please login to join challenges');
      navigate('/login', { state: { from: { pathname: `/challenges/join/${id}` } } });
      return;
    }
    navigate(`/challenges/join/${id}`);
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
    <div className="min-h-screen bg-gray-50 py-12 mt-18">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-xl shadow-lg overflow-hidden">
          <div className="relative h-96">
            <img
              src={challenge.imageUrl}
              alt={challenge.title}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
            <div className="absolute bottom-0 left-0 right-0 p-8 text-white">
              <span className="bg-emerald-500 px-4 py-1 rounded-full text-sm font-semibold">
                {challenge.category}
              </span>
              <h1 className="text-4xl font-bold mt-4">{challenge.title}</h1>
            </div>
          </div>

          <div className="p-8">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-8">
              <div className="text-center">
                <FaClock className="text-3xl text-emerald-500 mx-auto mb-2" />
                <p className="text-2xl font-bold text-gray-900">{challenge.duration}</p>
                <p className="text-sm text-gray-600">Days</p>
              </div>
              <div className="text-center">
                <FaUsers className="text-3xl text-emerald-500 mx-auto mb-2" />
                <p className="text-2xl font-bold text-gray-900">{challenge.participants}</p>
                <p className="text-sm text-gray-600">Participants</p>
              </div>
              <div className="text-center">
                <FaCalendar className="text-3xl text-emerald-500 mx-auto mb-2" />
                <p className="text-sm font-bold text-gray-900">
                  {new Date(challenge.startDate).toLocaleDateString()}
                </p>
                <p className="text-sm text-gray-600">Start Date</p>
              </div>
              <div className="text-center">
                <FaDownLeftAndUpRightToCenter className="text-3xl text-emerald-500 mx-auto mb-2" />
                <p className="text-sm font-bold text-gray-900">{challenge.impactMetric}</p>
                <p className="text-sm text-gray-600">Impact</p>
              </div>
            </div>

            <div className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Description</h2>
              <p className="text-gray-700 leading-relaxed">{challenge.description}</p>
            </div>

            <div className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Target</h2>
              <p className="text-gray-700">{challenge.target}</p>
            </div>

            <button
              onClick={handleJoin}
              className="w-full bg-emerald-500 hover:bg-emerald-600 text-white py-4 rounded-lg font-bold text-lg transition-colors"
            >
              Join This Challenge
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChallengeDetails;