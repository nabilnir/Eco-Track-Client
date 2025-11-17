import React, { useState, useEffect } from 'react';
import { FaUsers, FaChartLine, FaBolt, FaRecycle, FaLeaf, FaWater } from 'react-icons/fa';

const LiveStatistics = () => {
  const [stats, setStats] = useState({
    totalParticipants: 0,
    totalChallenges: 0,
    co2Saved: 0,
    plasticReduced: 0,
    waterSaved: 0,
    treesPlanted: 0
  });
  const [loading, setLoading] = useState(true);
  const [animatedStats, setAnimatedStats] = useState({
    totalParticipants: 0,
    totalChallenges: 0,
    co2Saved: 0,
    plasticReduced: 0,
    waterSaved: 0,
    treesPlanted: 0
  });

  
  const API_BASE = import.meta.env.VITE_API_URL || '';

  useEffect(() => {
    fetchStatistics();

    
    const interval = setInterval(fetchStatistics, 30000);
    return () => clearInterval(interval);
  }, []);

  const fetchStatistics = async () => {
    if (!API_BASE) {
      console.warn('VITE_API_URL not set. Skipping stats fetch.');
      setLoading(false);
      return;
    }

    try {
      const response = await fetch(`${API_BASE}/api/statistics`);
      if (!response.ok) {
        throw new Error(`Status ${response.status}`);
      }
      const data = await response.json();

      setStats({
        totalParticipants: data.totalParticipants || 0,
        totalChallenges: data.totalChallenges || 0,
        co2Saved: data.co2Saved || 0,
        plasticReduced: data.plasticReduced || 0,
        waterSaved: data.waterSaved || 0,
        treesPlanted: data.treesPlanted || 0
      });

      setLoading(false);
    } catch (error) {
      console.error('Failed to fetch statistics:', error);
      setLoading(false);
    }
  };

  // Animate numbers 
  useEffect(() => {
    if (loading) return;

    const duration = 3000;
    const steps = 80;
    const interval = duration / steps;

    const timers = Object.keys(stats).map((key) => {
      const target = stats[key];
      const increment = target / steps || 0;
      let current = 0;
      let step = 0;

      return setInterval(() => {
        step++;
        current += increment;

        if (step >= steps) {
          setAnimatedStats(prev => ({ ...prev, [key]: target }));
          clearInterval(timers[Object.keys(stats).indexOf(key)]);
        } else {
          setAnimatedStats(prev => ({ ...prev, [key]: Math.floor(current) }));
        }
      }, interval);
    });

    return () => timers.forEach(timer => clearInterval(timer));
  }, [loading, stats]);

  const statisticsData = [
    {
      icon: FaUsers,
      value: animatedStats.totalParticipants,
      label: 'Active Participants',
      suffix: '+',
      color: 'from-blue-500 to-blue-600',
      iconColor: 'text-blue-500'
    },
    {
      icon: FaChartLine,
      value: animatedStats.totalChallenges,
      label: 'Active Challenges',
      suffix: '+',
      color: 'from-purple-500 to-purple-600',
      iconColor: 'text-purple-500'
    },
    {
      icon: FaBolt,
      value: animatedStats.co2Saved,
      label: 'CO₂ Saved',
      suffix: ' kg',
      color: 'from-yellow-500 to-yellow-600',
      iconColor: 'text-yellow-500'
    },
    {
      icon: FaRecycle,
      value: animatedStats.plasticReduced,
      label: 'Plastic Reduced',
      suffix: ' kg',
      color: 'from-green-500 to-green-600',
      iconColor: 'text-green-500'
    },
    {
      icon: FaWater,
      value: animatedStats.waterSaved,
      label: 'Water Saved',
      suffix: ' L',
      color: 'from-cyan-500 to-cyan-600',
      iconColor: 'text-cyan-500'
    },
    {
      icon: FaLeaf,
      value: animatedStats.treesPlanted,
      label: 'Trees Planted',
      suffix: '+',
      color: 'from-emerald-500 to-emerald-600',
      iconColor: 'text-emerald-500'
    }
  ];

  if (loading) {
    return (
      <section className="py-16 bg-gradient-to-r from-emerald-500 to-emerald-600">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl md:text-4xl font-bold text-center text-white mb-12">
            Our Community Impact
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
            {[1, 2, 3, 4, 5, 6].map(i => (
              <div key={i} className="bg-white/10 backdrop-blur-sm rounded-xl p-6 animate-pulse">
                <div className="h-12 w-12 bg-white/20 rounded-full mx-auto mb-4"></div>
                <div className="h-8 bg-white/20 rounded mb-2"></div>
                <div className="h-4 bg-white/20 rounded"></div>
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-16 bg-gradient-to-r from-emerald-500 to-emerald-600 relative overflow-hidden">
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
        }}></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Our Community Impact
          </h2>
          <p className="text-emerald-100 text-lg">
            Real-time data from our growing community
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
          {statisticsData.map((stat, index) => {
            const Icon = stat.icon;
            return (
              <div 
                key={index}
                className="bg-white/10 backdrop-blur-sm rounded-xl p-6 text-center hover:bg-white/20 transition-all duration-300 hover:scale-105 transform"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="inline-flex items-center justify-center w-16 h-16 bg-white rounded-full mb-4 shadow-lg">
                  <Icon className={`text-3xl ${stat.iconColor}`} />
                </div>
                <div className="text-white">
                  <p className="text-3xl md:text-4xl font-bold mb-2">
                    {stat.value.toLocaleString()}{stat.suffix}
                  </p>
                  <p className="text-emerald-100 text-sm font-medium">
                    {stat.label}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

        <div className="mt-12 text-center">
          <p className="text-white/90 text-lg">
             Join our growing community of environmental champions
          </p>
          <p className="text-emerald-100 text-sm mt-2">
            Updated live • Last synced: {new Date().toLocaleTimeString()}
          </p>
        </div>
      </div>
    </section>
  );
};

export default LiveStatistics;