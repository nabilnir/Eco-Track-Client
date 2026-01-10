import React, { useState, useEffect } from 'react';
import { Link } from 'react-router';
import { FaFilter, FaPlus, FaUsers, FaCalendar, FaTimes } from 'react-icons/fa';
import useAuth from '../Hooks/useAuth';
import bannerImg from '../assets/coastsland.jpg'
import useTitle from '../Hooks/useTitle';

const Challenges = () => {

  useTitle('Challenges');

  const [challenges, setChallenges] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filters, setFilters] = useState({
    category: [],
    startDate: '',
    endDate: '',
    minParticipants: '',
    maxParticipants: ''
  });
  // New State for Search, Sort, Pagination
  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState('newest');
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1); // Assuming API returns totalPages
  const [showFilters, setShowFilters] = useState(false);
  const { user } = useAuth();

  const categories = [
    'Waste Reduction',
    'Energy Conservation',
    'Water Conservation',
    'Sustainable Transport',
    'Green Living'
  ];

  useEffect(() => {
    fetchChallenges();
  }, [filters, currentPage, sortBy]);

  const fetchChallenges = async () => {
    setLoading(true);
    try {
      const params = new URLSearchParams();

      if (filters.category.length > 0) {
        params.append('category', filters.category.join(','));
      }
      if (filters.startDate) {
        params.append('startDate', filters.startDate);
      }
      if (filters.endDate) {
        params.append('endDate', filters.endDate);
      }
      if (filters.minParticipants) {
        params.append('minParticipants', filters.minParticipants);
      }
      if (filters.maxParticipants) {
        params.append('maxParticipants', filters.maxParticipants);
      }
      // Add Search, Sort, Pagination params
      if (searchTerm) params.append('search', searchTerm);
      params.append('sort', sortBy);
      params.append('page', currentPage);
      params.append('limit', 6);

      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/api/challenges?${params.toString()}`
      );
      const data = await response.json();
      // Handle response structure (assuming data.challenges and data.totalPages if paginated)
      // Fallback for current simple array response
      if (Array.isArray(data)) {
        setChallenges(data);
        setTotalPages(1); // Default if API doesn't support pagination object
      } else {
        setChallenges(data.challenges || []);
        setTotalPages(data.totalPages || 1);
      }
    } catch (error) {
      console.error('Failed to fetch challenges:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleCategoryChange = (category) => {
    setCurrentPage(1);
    setFilters(prev => ({
      ...prev,
      category: prev.category.includes(category)
        ? prev.category.filter(c => c !== category)
        : [...prev.category, category]
    }));
  };

  const handleFilterChange = (e) => {
    setCurrentPage(1);
    const { name, value } = e.target;
    setFilters(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const clearFilters = () => {
    setCurrentPage(1);
    setFilters({
      category: [],
      startDate: '',
      endDate: '',
      minParticipants: '',
      maxParticipants: ''
    });
  };

  const hasActiveFilters = filters.category.length > 0 ||
    filters.startDate ||
    filters.endDate ||
    filters.minParticipants ||
    filters.maxParticipants;

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors duration-300">
      {/* Banner with background image */}
      <div
        className="relative w-full h-[260px] md:h-[340px] lg:h-[420px] bg-cover bg-center shadow-md mb-12"
        style={{ backgroundImage: `url(${bannerImg})` }}
      >
        {/* Dark overlay for text readability */}
        <div className="absolute inset-0 bg-black/40" />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-full flex flex-col justify-center">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-white drop-shadow-lg">
            Sustainability Challenges
          </h1>
          <p className="mt-3 text-lg md:text-xl text-white/90 max-w-3xl drop-shadow-md">
            Discover and join challenges to make a positive impact on our planet
          </p>
        </div>
      </div>

      {/* Main content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-12">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
          <div>
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">All Challenges</h2>
            <p className="text-gray-600 dark:text-gray-400">Found {challenges.length} challenges</p>
          </div>

          <div className="flex flex-wrap gap-3 items-center w-full md:w-auto">
            {/* Search Bar */}
            <div className="relative flex-grow md:flex-grow-0">
              <input
                type="text"
                placeholder="Search challenges..."
                className="pl-4 pr-10 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-emerald-500 w-full bg-white dark:bg-gray-800 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && fetchChallenges()} // Optional: search on enter
              />
              <span className="absolute right-3 top-3 text-gray-400">🔍</span>
            </div>

            {/* Sort Dropdown */}
            <select
              value={sortBy}
              onChange={(e) => {
                setSortBy(e.target.value);
                setCurrentPage(1);
              }}
              className="border border-gray-300 dark:border-gray-600 rounded-lg px-3 py-2 focus:ring-2 focus:ring-emerald-500 bg-white dark:bg-gray-800 text-gray-900 dark:text-white font-medium"
            >
              <option value="newest">Newest First</option>
              <option value="oldest">Oldest First</option>
              <option value="participants_desc">Most Popular</option>
              <option value="duration_asc">Shortest Duration</option>
            </select>

            <button
              onClick={() => setShowFilters(!showFilters)}
              className="flex items-center gap-2 bg-white dark:bg-gray-800 border-2 border-gray-300 dark:border-gray-600 hover:border-emerald-500 dark:hover:border-emerald-500 text-gray-700 dark:text-gray-200 px-4 py-2 rounded-lg font-semibold transition-colors"
            >
              <FaFilter /> Filters
            </button>
            <Link
              to="/challenges/add"
              className="flex items-center gap-2 bg-emerald-500 hover:bg-emerald-600 text-white px-4 py-2 rounded-lg font-semibold transition-colors whitespace-nowrap"
            >
              <FaPlus /> Add Challenge
            </Link>
          </div>
        </div>

        {showFilters && (
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-6 mb-8 border border-gray-100 dark:border-gray-700">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-bold text-gray-900 dark:text-white">Filters</h3>
              {hasActiveFilters && (
                <button
                  onClick={clearFilters}
                  className="text-emerald-600 hover:text-emerald-700 font-semibold text-sm flex items-center gap-1"
                >
                  <FaTimes /> Clear All
                </button>
              )}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <div>
                <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">Category</label>
                <div className="space-y-2">
                  {categories.map(cat => (
                    <label key={cat} className="flex items-center gap-2 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={filters.category.includes(cat)}
                        onChange={() => handleCategoryChange(cat)}
                        className="w-4 h-4 text-emerald-600 rounded focus:ring-emerald-500"
                      />
                      <span className="text-sm text-gray-700 dark:text-gray-300">{cat}</span>
                    </label>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">Start Date</label>
                <input
                  type="date"
                  name="startDate"
                  value={filters.startDate}
                  onChange={handleFilterChange}
                  className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                />
                <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2 mt-4">End Date</label>
                <input
                  type="date"
                  name="endDate"
                  value={filters.endDate}
                  onChange={handleFilterChange}
                  className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">Min Participants</label>
                <input
                  type="number"
                  name="minParticipants"
                  value={filters.minParticipants}
                  onChange={handleFilterChange}
                  placeholder="e.g., 10"
                  className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400"
                />
                <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2 mt-4">Max Participants</label>
                <input
                  type="number"
                  name="maxParticipants"
                  value={filters.maxParticipants}
                  onChange={handleFilterChange}
                  placeholder="e.g., 1000"
                  className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400"
                />
              </div>
            </div>
          </div>
        )}

        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[1, 2, 3, 4, 5, 6].map(i => (
              <div key={i} className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-6 animate-pulse">
                <div className="h-48 bg-gray-300 dark:bg-gray-700 rounded-lg mb-4"></div>
                <div className="h-6 bg-gray-300 dark:bg-gray-700 rounded mb-3"></div>
                <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-3/4"></div>
              </div>
            ))}
          </div>
        ) : challenges.length === 0 ? (
          <div className="text-center py-12 bg-white dark:bg-gray-800 rounded-xl">
            <p className="text-gray-500 dark:text-gray-400 text-lg">No challenges found</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {challenges.map(challenge => (
              <Link
                key={challenge._id}
                to={`/challenges/${challenge._id}`}
                className="bg-white dark:bg-gray-800 rounded-xl shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden group border border-gray-100 dark:border-gray-700"
              >
                <div className="relative h-48 overflow-hidden">
                  <img
                    src={challenge.imageUrl}
                    alt={challenge.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                  />
                  <div className="absolute top-4 right-4 bg-emerald-500 text-white px-3 py-1 rounded-full text-sm font-semibold">
                    {challenge.category}
                  </div>
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2 group-hover:text-emerald-600 transition-colors">
                    {challenge.title}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-400 text-sm mb-4 line-clamp-2">
                    {challenge.description}
                  </p>
                  <div className="flex items-center justify-between text-sm">
                    <span className="flex items-center text-emerald-600 font-semibold">
                      <FaCalendar className="mr-1" /> {challenge.duration} days
                    </span>
                    <span className="flex items-center text-gray-500 dark:text-gray-400">
                      <FaUsers className="mr-1" /> {challenge.participants}
                    </span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}

        {/* Pagination Controls */}
        <div className="flex justify-center mt-12 gap-2">
          <button
            disabled={currentPage === 1}
            onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
            className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 disabled:opacity-50 text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-800"
          >
            Previous
          </button>
          {[...Array(totalPages)].map((_, i) => (
            <button
              key={i}
              onClick={() => setCurrentPage(i + 1)}
              className={`w-10 h-10 rounded-lg ${currentPage === i + 1 ? 'bg-emerald-500 text-white' : 'hover:bg-gray-50 dark:hover:bg-gray-700 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-800'}`}
            >
              {i + 1}
            </button>
          ))}
          <button
            disabled={currentPage === totalPages}
            onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
            className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 disabled:opacity-50 text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-800"
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
};

export default Challenges;