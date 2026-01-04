import React, { useState, useEffect } from 'react';
import { Link } from 'react-router';
import { FaUsers, FaArrowRight, FaCalendar } from 'react-icons/fa';
import AOS from 'aos';
import AnimatedWrapper from '../UI/AnimatedWrapper';
import 'aos/dist/aos.css';

const ActiveChallenges = () => {
  const [challenges, setChallenges] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Initialize AOS
    AOS.init({
      duration: 800,
      once: true,
      offset: 100
    });
    
    fetchHomeData();
  }, []);

  const fetchHomeData = async () => {
    try {
      const API_BASE = import.meta.env.VITE_API_URL || '';
      const res = await fetch(`${API_BASE}/api/challenges`);
      if (!res.ok) throw new Error(`Failed to load (${res.status})`);
      const data = await res.json();
      setChallenges(data || []);
    } catch (error) {
      console.error('Failed to fetch home data:', error);
      setChallenges([]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="py-20 bg-white dark:bg-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 
            className="text-4xl font-bold text-gray-900 dark:text-white mb-4"
            data-aos="fade-down"
            data-aos-delay="100"
          >
            Active Challenges
          </h2>
          <p 
            className="text-xl text-gray-600 dark:text-gray-300"
            data-aos="fade-up"
            data-aos-delay="200"
          >
            Join our community in making a difference
          </p>
        </div>

        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <div key={i} className="bg-white dark:bg-gray-700 rounded-xl shadow-md p-6 animate-pulse" data-aos="fade-up" data-aos-delay="300">
                <div className="h-48 bg-gray-300 dark:bg-gray-600 rounded-lg mb-4" />
                <div className="h-6 bg-gray-300 dark:bg-gray-600 rounded mb-3" />
                <div className="h-4 bg-gray-200 dark:bg-gray-600 rounded w-3/4" />
              </div>
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {challenges.map((challenge, index) => (
              <Link
                key={challenge._id}
                to={`/challenges/${challenge._id}`}
                className="bg-white dark:bg-gray-700 rounded-xl shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden group"
                data-aos="fade-up"
                data-aos-delay={index * 100}
              >
                <div className="relative h-48 overflow-hidden">
                  <img
                    src={challenge.imageUrl || '/assets/placeholder.jpg'}
                    alt={challenge.title || 'Challenge'}
                    className="w-full h-full object-cover transition-transform duration-300"
                  />
                  {challenge.category && (
                    <div className="absolute top-4 right-4 bg-emerald-500 text-white px-3 py-1 rounded-full text-sm font-semibold">
                      {challenge.category}
                    </div>
                  )}
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2 group-hover:text-emerald-600 transition-colors">
                    {challenge.title}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-300 text-sm mb-4 line-clamp-2">{challenge.description}</p>
                  <div className="flex items-center justify-between text-sm">
                    <span className="flex items-center text-emerald-600 font-semibold">
                      <FaCalendar className="mr-1" /> {challenge.duration ?? '-'} days
                    </span>
                    <span className="flex items-center text-gray-500 dark:text-gray-400">
                      <FaUsers className="mr-1" /> {challenge.participants ?? 0} joined
                    </span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}

        <div className="text-center mt-12">
          <Link
            to="/challenges"
            className="inline-flex items-center gap-2 bg-emerald-500
             hover:bg-emerald-600 text-white px-8 py-3 rounded-lg
              font-semibold transition-colors shadow-lg hover:shadow-xl"
          >
            View All Challenges <FaArrowRight />
          </Link>
        </div>
      </div>
    </section>
  );
};

export default ActiveChallenges;