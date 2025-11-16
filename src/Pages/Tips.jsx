import React, { useState, useEffect } from 'react';
import { FaThumbsUp } from 'react-icons/fa';
import heroImg from '../assets/colleagues.jpg'; 

const Tips = () => {
  const [tips, setTips] = useState([]);
  const [loading, setLoading] = useState(true);

  const API_BASE = import.meta.env.VITE_API_URL || '';

  useEffect(() => {
    fetchTips();
    
  }, []);

  const fetchTips = async () => {
    try {
      const response = await fetch(`${API_BASE}/api/tips`);
      const data = await response.json();
      setTips(Array.isArray(data) ? data : []);
    } catch (error) {
      console.error('Failed to fetch tips:', error);
      setTips([]);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-8">Eco Tips</h1>
          <div className="space-y-6">
            {[1, 2, 3, 4, 5].map(i => (
              <div key={i} className="bg-white rounded-xl shadow-md p-6 animate-pulse">
                <div className="h-6 bg-gray-300 rounded mb-3 w-1/3"></div>
                <div className="h-4 bg-gray-200 rounded mb-2"></div>
                <div className="h-4 bg-gray-200 rounded w-5/6"></div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-0">
      {/* Hero banner */}
      <header className="w-full overflow-hidden">
        <div
          className="relative w-full h-[260px] md:h-[320px] lg:h-[380px] bg-cover bg-center"
          style={{ backgroundImage: `url(${heroImg})` }}
        >
          <div className="absolute inset-0 bg-black/40" />
          <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-full flex flex-col justify-center">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-white drop-shadow-lg">
              Eco Tips from Our Community
            </h1>
            <p className="mt-3 text-lg md:text-xl text-white/90 max-w-3xl">
              Learn sustainable living practices and small changes that make a big impact
            </p>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {tips.length === 0 ? (
          <div className="text-center py-12 bg-white rounded-xl">
            <p className="text-gray-500 text-lg">No tips found</p>
          </div>
        ) : (
          <div className="space-y-6">
            {tips.map(tip => (
              <div key={tip._id} className="bg-white rounded-xl shadow-md p-6 hover:shadow-xl transition-shadow">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-3">
                      <span className="bg-emerald-100 text-emerald-700 px-3 py-1 rounded-full text-sm font-semibold">
                        {tip.category ?? 'General'}
                      </span>
                      <span className="text-gray-500 text-sm">by {tip.authorName ?? 'Community'}</span>
                    </div>
                    <h3 className="text-xl font-bold text-gray-900 mb-2">{tip.title}</h3>
                    <p className="text-gray-600">{tip.content}</p>
                  </div>
                  <div className="flex items-center gap-2 ml-4 text-emerald-600">
                    <FaThumbsUp />
                    <span className="font-semibold">{tip.upvotes ?? 0}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Tips;