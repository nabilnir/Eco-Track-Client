import React, { useEffect, useState } from "react";
import { Link } from "react-router";
import useAuth from "../Hooks/useAuth";
import heroImg from "../assets/men-women.pg.jpg"; 

const MyActivities = () => {
  const { user } = useAuth();
  const [userChallenges, setUserChallenges] = useState([]);
  const [loading, setLoading] = useState(true);

  
  const getStatusColor = (status) => {
    const s = (status || '').toLowerCase();
    if (s === 'ongoing' || s === 'in progress') return 'bg-blue-500';
    if (s === 'finished' || s === 'completed') return 'bg-emerald-500';
    return 'bg-gray-400';
  };

  useEffect(() => {
    if (!user) {
      setUserChallenges([]);
      setLoading(false);
      return;
    }
    fetchUserChallenges();
   
  }, [user]);

  const fetchUserChallenges = async () => {
    try {
      setLoading(true);
      if (!user || !user.email) {
        setUserChallenges([]);
        return;
      }

      const email = encodeURIComponent(user.email);
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/api/user-challenges/${email}`
      );

      if (!response.ok) {
        throw new Error(`Failed to fetch (${response.status})`);
      }

      const data = await response.json();
      setUserChallenges(Array.isArray(data) ? data : []);
    } catch (error) {
      console.error("Failed to fetch user challenges:", error);
      setUserChallenges([]);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 py-12 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-emerald-500" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-0 mt-18">
     
      <header className="w-full overflow-hidden">
        <div
          className="relative w-full h-[260px] md:h-[340px] lg:h-[420px] bg-cover bg-center"
          style={{ backgroundImage: `url(${heroImg})` }}
        >
          <div className="absolute inset-0 bg-black/40" />
          <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-full flex flex-col justify-center">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-white drop-shadow-lg">
              My Activities
            </h1>
            <p className="mt-3 text-lg md:text-xl text-white/90 max-w-3xl">
              Track your joined challenges and monitor progress
            </p>
          </div>
        </div>
      </header>

      {/* Page content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">Your Active Challenges</h2>
          <p className="text-lg text-gray-600 mb-4">Track your Sustainable Challenges Easily!</p>
          <p className="text-sm text-emerald-600 font-semibold">
            Total {userChallenges.length} challenge{userChallenges.length !== 1 ? 's' : ''} found
          </p>
        </div>

        {userChallenges.length === 0 ? (
          <div className="bg-white rounded-xl shadow-md p-12 text-center">
            <p className="text-gray-500 text-lg mb-6">You haven't joined any challenges yet</p>
            <Link
              to="/challenges"
              className="bg-emerald-500 hover:bg-emerald-600 text-white px-6 py-3 rounded-lg font-semibold inline-block"
            >
              Browse Challenges
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {userChallenges.map((uc) => (
              <Link
                key={uc._id}
                to={`/my-activities/${uc._id}`}
                className="bg-white rounded-xl shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden"
              >
                <div className="relative h-48">
                  <img
                    src={uc.challenge?.imageUrl || "/assets/placeholder.jpg"}
                    alt={uc.challenge?.title || "Challenge"}
                    className="w-full h-full object-cover"
                  />
                  
                  <div
                    className={`absolute top-4 right-4 text-white px-3 py-1 rounded-full text-sm font-semibold ${getStatusColor(uc.status)}`}
                  >
                    {uc.status ?? 'Not Started'}
                  </div>
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-bold text-gray-900 mb-2">{uc.challenge?.title}</h3>
                  <div className="mb-4">
                    <div className="flex justify-between text-sm text-gray-600 mb-1">
                      <span>Progress</span>
                      <span>{uc.progress ?? 0}%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div
                        className="bg-emerald-500 h-2 rounded-full transition-all duration-300"
                        style={{ width: `${uc.progress ?? 0}%` }}
                      />
                    </div>
                  </div>
                  <p className="text-sm text-gray-500">
                    Joined: {uc.joinDate ? new Date(uc.joinDate).toLocaleDateString() : "—"}
                  </p>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default MyActivities;