import React, { useState, useEffect, useContext } from 'react';
import { AuthContext } from '../../Context/AuthContext';
import { Link } from 'react-router';
import {
  FaLeaf,
  FaTrophy,
  FaCalendarAlt,
  FaUsers,
  FaChartLine,
  FaArrowUp,
  FaArrowDown,
  FaEye,
  FaEdit,
  FaTrash
} from 'react-icons/fa';
import { BarChart, Bar, LineChart, Line, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import axiosPublic from '../../api/axiosPublic';

const DashboardOverview = () => {
  const { user } = useContext(AuthContext);
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState({
    totalActivities: 0,
    myChallengesCount: 0,
    myEventsCount: 0,
    activityGrowth: 0
  });
  const [chartData, setChartData] = useState({
    monthlyData: [],
    categoryData: [],
    activityData: []
  });
  const [recentActivities, setRecentActivities] = useState([]);
  const [upcomingEvents, setUpcomingEvents] = useState([]);

  useEffect(() => {
    if (user?.email) {
      fetchDashboardData();
    }
  }, [user]);

  const fetchDashboardData = async () => {
    try {
      setLoading(true);

      // Fetch statistics
      const statsResponse = await axiosPublic.get(`/api/dashboard/user-stats?email=${user.email}`);
      setStats({
        totalActivities: statsResponse.data.totalActivities || 0,
        myChallengesCount: statsResponse.data.myChallengesCount || 0,
        myEventsCount: statsResponse.data.myEventsCount || 0,
        activityGrowth: statsResponse.data.activityGrowth || 0
      });

      // Fetch chart data 
      const chartResponse = await axiosPublic.get(`/api/dashboard/user-charts?email=${user.email}`);
      setChartData(chartResponse.data);

      // Fetch recent activities
      const activitiesResponse = await axiosPublic.get(`/api/user-challenges/${user.email}`);
      // Slice to last 5
      setRecentActivities(activitiesResponse.data.slice(0, 5) || []);

      // Fetch upcoming events
      const eventsResponse = await axiosPublic.get('/api/events');
      setUpcomingEvents(eventsResponse.data || []);

    } catch (error) {
      console.error('Failed to fetch dashboard data:', error);

      const fallbackStats = {
        totalActivities: 0,
        myChallengesCount: 0,
        myEventsCount: 0,
        activityGrowth: 0
      };
      setStats(fallbackStats);
    } finally {
      setLoading(false);
    }
  };



  const StatCard = ({ title, value, icon: Icon, change, changeType, color }) => (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6 hover:shadow-lg transition-shadow border border-transparent dark:border-gray-700">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm font-medium text-gray-600 dark:text-gray-400">{title}</p>
          <p className="text-2xl font-bold text-gray-900 dark:text-white">{value.toLocaleString()}</p>
          {change && (
            <div className={`flex items-center mt-2 text-sm ${changeType === 'increase' ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400'
              }`}>
              {changeType === 'increase' ? <FaArrowUp className="mr-1" /> : <FaArrowDown className="mr-1" />}
              {change}% from last month
            </div>
          )}
        </div>
        <div className={`p-3 rounded-full ${color}`}>
          <Icon className="text-white text-xl" />
        </div>
      </div>
    </div>
  );

  if (loading) {
    return (
      <div className="p-6">
        <div className="animate-pulse">
          <div className="h-8 bg-gray-300 rounded w-1/3 mb-6"></div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="h-32 bg-gray-300 rounded-lg"></div>
            ))}
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="h-64 bg-gray-300 rounded-lg"></div>
            <div className="h-64 bg-gray-300 rounded-lg"></div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="p-6">
      {/* Page Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Dashboard Overview</h1>
        <p className="text-gray-600 dark:text-gray-400 mt-2">Welcome back! Here's what's happening with your eco-activities today.</p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <StatCard
          title="My Total Activities"
          value={stats.totalActivities}
          icon={FaLeaf}
          change={stats.activityGrowth}
          changeType="increase"
          color="bg-green-500"
        />
        <StatCard
          title="My Challenges"
          value={stats.myChallengesCount}
          icon={FaTrophy}
          color="bg-yellow-500"
        />
        <StatCard
          title="My Events"
          value={stats.myEventsCount}
          icon={FaCalendarAlt}
          color="bg-purple-500"
        />
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        {/* Line Chart - User Growth */}
        <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow border border-transparent dark:border-gray-700">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">User & Activity Growth</h3>
          {chartData.monthlyData && chartData.monthlyData.some(d => d.activities > 0) ? (
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={chartData.monthlyData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Line type="monotone" dataKey="activities" stroke="#10b981" strokeWidth={2} />
              </LineChart>
            </ResponsiveContainer>
          ) : (
            <div className="flex flex-col items-center justify-center text-center p-8 h-80 bg-gray-50 dark:bg-gray-700/50 rounded-lg border-2 border-dashed border-gray-300 dark:border-gray-600">
              <div className="mb-4 text-gray-400">
                <FaLeaf size={48} className="mx-auto opacity-50" />
              </div>
              <p className="text-gray-500 dark:text-gray-400 mb-6 text-lg">No activity history yet</p>
              <Link to="/challenges" className="px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors text-sm font-medium shadow-md">
                Start Your Journey
              </Link>
            </div>
          )}
        </div>

        {/* Pie Chart - Activity Categories */}
        <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow border border-transparent dark:border-gray-700">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Activity Categories</h3>
          {chartData.categoryData && chartData.categoryData.length > 0 ? (
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={chartData.categoryData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {chartData.categoryData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          ) : (
            <div className="flex flex-col items-center justify-center text-center p-8 h-80 bg-gray-50 dark:bg-gray-700/50 rounded-lg border-2 border-dashed border-gray-300 dark:border-gray-600">
              <div className="mb-4 text-gray-400">
                <FaTrophy size={48} className="mx-auto opacity-50" />
              </div>
              <p className="text-gray-500 dark:text-gray-400 mb-6 text-lg">No activities joined yet</p>
              <Link to="/challenges" className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm font-medium shadow-md">
                Browse Challenges
              </Link>
            </div>
          )}
        </div >
      </div >

      {/* Bar Chart - Weekly Activities */}
      <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow mb-8 border border-transparent dark:border-gray-700">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Weekly Activity Trend</h3>
        {
          chartData.activityData && chartData.activityData.some(d => d.count > 0) ? (
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={chartData.activityData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="day" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="count" fill="#10b981" />
              </BarChart>
            </ResponsiveContainer>
          ) : (
            <div className="flex flex-col items-center justify-center text-center p-8 h-80 bg-gray-50 dark:bg-gray-700/50 rounded-lg border-2 border-dashed border-gray-300 dark:border-gray-600">
              <div className="mb-4 text-gray-400">
                <FaCalendarAlt size={48} className="mx-auto opacity-50" />
              </div>
              <p className="text-gray-500 dark:text-gray-400 mb-6 text-lg">No weekly activity yet</p>
              <Link to="/challenges" className="px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors text-sm font-medium shadow-md">
                Start Your Journey
              </Link>
            </div>
          )
        }
      </div>

      {/* Data Tables */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Activities Table */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow border border-transparent dark:border-gray-700">
          <div className="p-6 border-b border-gray-200 dark:border-gray-700">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Recent Activities</h3>
          </div>
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
              <thead className="bg-gray-50 dark:bg-gray-900/50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                    Activity
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                    Date Joined
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
                {recentActivities.length > 0 ? recentActivities.map((activity) => (
                  <tr key={activity._id} className="hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div>
                        <div className="text-sm font-medium text-gray-900 dark:text-white">{activity.challenge?.title || 'Unknown Challenge'}</div>
                        <div className="text-sm text-gray-500 dark:text-gray-400">{activity.challenge?.category || 'General'}</div>
                      </div>
                    </td>
                    {/* User column removed as it is My Activities */}
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                      {new Date(activity.joinDate || Date.now()).toLocaleDateString()}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      <div className="flex space-x-2">
                        <button className="text-blue-600 hover:text-blue-900">
                          <FaEye />
                        </button>
                        <button className="text-green-600 hover:text-green-900">
                          <FaEdit />
                        </button>
                        <button className="text-red-600 hover:text-red-900">
                          <FaTrash />
                        </button>
                      </div>
                    </td>
                  </tr>
                )) : (
                  <tr>
                    <td colSpan="3" className="px-6 py-12 text-center text-gray-500">
                      <p className="mb-4 text-lg">No recent activities found</p>
                      <Link to="/challenges" className="inline-block px-6 py-2.5 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors text-sm font-medium shadow-sm">
                        Join a Challenge
                      </Link>
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
          <div className="p-4 border-t border-gray-200 dark:border-gray-700">
            <Link
              to="/dashboard/activities"
              className="text-sm font-medium text-green-600 dark:text-green-400 hover:text-green-900 dark:hover:text-green-300 transition-colors"
            >
              View all activities →
            </Link>
          </div>
        </div >

        {/* Upcoming Events Table */}
        < div className="bg-white dark:bg-gray-800 rounded-lg shadow border border-transparent dark:border-gray-700" >
          <div className="p-6 border-b border-gray-200 dark:border-gray-700">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Upcoming Events</h3>
          </div>
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
              <thead className="bg-gray-50 dark:bg-gray-900/50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                    Event
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                    Date
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                    Participants
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {upcomingEvents.map((event) => (
                  <tr key={event._id} className="hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 dark:text-white">
                      {event.title}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                      {new Date(event.date).toLocaleDateString()}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-400">
                        {event.participants} participants
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      <div className="flex space-x-2">
                        <button className="text-blue-600 dark:text-blue-400 hover:text-blue-900 dark:hover:text-blue-300 transition-colors">
                          <FaEye />
                        </button>
                        <button className="text-green-600 dark:text-green-400 hover:text-green-900 dark:hover:text-green-300 transition-colors">
                          <FaEdit />
                        </button>
                        <button className="text-red-600 dark:text-red-400 hover:text-red-900 dark:hover:text-red-300 transition-colors">
                          <FaTrash />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="p-4 border-t border-gray-200 dark:border-gray-700">
            <Link
              to="/dashboard/events"
              className="text-sm font-medium text-green-600 dark:text-green-400 hover:text-green-900 dark:hover:text-green-300 transition-colors"
            >
              View all events →
            </Link>
          </div>
        </div >
      </div >
    </div >
  );
};

export default DashboardOverview;
