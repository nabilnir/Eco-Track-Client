import React, { useState, useEffect } from 'react';
import { Link } from 'react-router';
import { FaThumbsUp } from 'react-icons/fa';
import Spinner from '../Spinner/Spinner';

const RecentTips= () => {
  const [tips, setTips] = useState([]);
  const [loading, setLoading] = useState(true);

  const API_BASE = import.meta.env.VITE_API_URL || '';

  useEffect(() => {
    const fetchHomeData = async () => {
      try {
        if (!API_BASE) {
          console.warn('VITE_API_URL not set. Skipping tips fetch.');
          setTips([]);
          return;
        }

        const res = await fetch(`${API_BASE}/api/tips`);
        if (!res.ok) throw new Error(`Failed to fetch tips (${res.status})`);
        const tipsData = await res.json();
        setTips(Array.isArray(tipsData) ? tipsData : []);
      } catch (error) {
        console.error('Failed to fetch home data:', error);
        setTips([]);
      } finally {
        setLoading(false);
      }
    };

    fetchHomeData();
  }, [API_BASE]);

  if (loading) {
    return (
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Spinner />
        </div>
      </section>
    );
  }

  return (
    <section className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">Eco Tips from Our Community</h2>
          <p className="text-xl text-gray-600">Learn sustainable living practices</p>
        </div>

        <div className="space-y-6">
          {tips.length === 0 ? (
            <div className="text-center text-gray-500">No tips available.</div>
          ) : (
            tips.map((tip) => (
              <div key={tip._id ?? tip.id} className="bg-white rounded-xl shadow-md p-6 hover:shadow-xl transition-shadow">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-3">
                      <span className="bg-emerald-100 text-emerald-700 px-3 py-1 rounded-full text-sm font-semibold">
                        {tip.category ?? 'General'}
                      </span>
                      <span className="text-gray-500 text-sm">by {tip.authorName ?? 'Community'}</span>
                    </div>
                    <h3 className="text-xl font-bold text-gray-900 mb-2">{tip.title ?? 'Untitled Tip'}</h3>
                    <p className="text-gray-600">{tip.content ?? ''}</p>
                  </div>
                  <div className="flex items-center gap-2 ml-4 text-emerald-600">
                    <FaThumbsUp />
                    <span className="font-semibold">{tip.upvotes ?? 0}</span>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        <div className="mt-8 text-center">
          <Link to="/tips" className="inline-block bg-emerald-500
           hover:bg-emerald-600 text-white px-8 py-3 rounded-lg 
           font-semibold transition-colors shadow-lg hover:shadow-xl">
            View All Tips →
          </Link>
        </div>
      </div>
    </section>
  );
}

export default RecentTips;