import React, { useState, useEffect } from 'react';
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
import axios from 'axios';

const DashboardOverview = () => {
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState({
    totalUsers: 0,
    totalActivities: 0,
    totalChallenges: 0,
    totalEvents: 0,
    userGrowth: 0,
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
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    try {
      setLoading(true);
      
      // Fetch statistics
      const statsResponse = await axios.get('http://localhost:5000/api/dashboard/stats');
      setStats(statsResponse.data);

      // Fetch chart data
      const chartResponse = await axios.get('http://localhost:5000/api/dashboard/charts');
      setChartData(chartResponse.data);

      // Fetch recent activities
      const activitiesResponse = await axios.get('http://localhost:5000/api/activities?limit=5');
      setRecentActivities(activitiesResponse.data.activities || []);

      // Fetch upcoming events
      const eventsResponse = await axios.get('http://localhost:5000/api/events?limit=5');
      setUpcomingEvents(eventsResponse.data.events || []);

    } catch (error) {
      console.error('Failed to fetch dashboard data:', error);
      
      // Fallback data for demonstration
      const fallbackStats = {
        totalUsers: 1250,
        totalActivities: 3420,
        totalChallenges: 45,
        totalEvents: 12,
        userGrowth: 15.3,
        activityGrowth: 23.7
      };
      setStats(fallbackStats);

      const fallbackChartData = {
        monthlyData: [
          { month: 'Jan', users: 120, activities: 280 },
          { month: 'Feb', users: 150, activities: 320 },
          { month: 'Mar', users: 180, activities: 380 },
          { month: 'Apr', users: 220, activities: 450 },
          { month: 'May', users: 280, activities: 520 },
          { month: 'Jun', users: 350, activities: 680 }
        ],
        categoryData: [
          { name: 'Energy', value: 35, color: '#10b981' },
          { name: 'Water', value: 25, color: '#3b82f6' },
          { name: 'Waste', value: 20, color: '#f59e0b' },
          { name: 'Transport', value: 20, color: '#ef4444' }
        ],
        activityData: [
          { day: 'Mon', count: 45 },
          { day: 'Tue', count: 52 },
          { day: 'Wed', count: 38 },
          { day: 'Thu', count: 65 },
          { day: 'Fri', count: 48 },
          { day: 'Sat', count: 72 },
          { day: 'Sun', count: 58 }
        ]
      };
      setChartData(fallbackChartData);

      const fallbackActivities = [
        { _id: '1', title: 'Planted 10 trees', type: 'Tree Planting', date: '2024-01-15', user: 'John Doe' },
        { _id: '2', title: 'Reduced plastic usage', type: 'Waste Reduction', date: '2024-01-14', user: 'Jane Smith' },
        { _id: '3', title: 'Bike to work challenge', type: 'Transport', date: '2024-01-13', user: 'Mike Johnson' },
        { _id: '4', title: 'Water conservation', type: 'Water Saving', date: '2024-01-12', user: 'Sarah Wilson' },
        { _id: '5', title: 'Solar panel installation', type: 'Energy', date: '2024-01-11', user: 'Tom Brown' }
      ];
      setRecentActivities(fallbackActivities);

      const fallbackEvents = [
        { _id: '1', title: 'Community Clean-up Day', date: '2024-01-20', participants: 45 },
        { _id: '2', title: 'Sustainability Workshop', date: '2024-01-25', participants: 30 },
        { _id: '3', title: 'Tree Planting Drive', date: '2024-01-28', participants: 60 },
        { _id: '4', title: 'Recycling Awareness Campaign', date: '2024-02-01', participants: 25 },
        { _id: '5', title: 'Green Energy Seminar', date: '2024-02-05', participants: 40 }
      ];
      setUpcomingEvents(fallbackEvents);

    } finally {
      setLoading(false);
    }
  };

  const StatCard = ({ title, value, icon: Icon, change, changeType, color }) => (
    <div className="bg-white rounded-lg shadow p-6 hover:shadow-lg transition-shadow">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm font-medium text-gray-600">{title}</p>
          <p className="text-2xl font-bold text-gray-900">{value.toLocaleString()}</p>
          {change && (
            <div className={`flex items-center mt-2 text-sm ${
              changeType === 'increase' ? 'text-green-600' : 'text-red-600'
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
        <h1 className="text-3xl font-bold text-gray-900">Dashboard Overview</h1>
        <p className="text-gray-600 mt-2">Welcome back! Here's what's happening with your eco-activities today.</p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <StatCard
          title="Total Users"
          value={stats.totalUsers}
          icon={FaUsers}
          change={stats.userGrowth}
          changeType="increase"
          color="bg-blue-500"
        />
        <StatCard
          title="Total Activities"
          value={stats.totalActivities}
          icon={FaLeaf}
          change={stats.activityGrowth}
          changeType="increase"
          color="bg-green-500"
        />
        <StatCard
          title="Active Challenges"
          value={stats.totalChallenges}
          icon={FaTrophy}
          color="bg-yellow-500"
        />
        <StatCard
          title="Upcoming Events"
          value={stats.totalEvents}
          icon={FaCalendarAlt}
          color="bg-purple-500"
        />
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        {/* Line Chart - User Growth */}
        <div className="bg-white p-6 rounded-lg shadow">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">User & Activity Growth</h3>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={chartData.monthlyData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Line type="monotone" dataKey="users" stroke="#3b82f6" strokeWidth={2} />
              <Line type="monotone" dataKey="activities" stroke="#10b981" strokeWidth={2} />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* Pie Chart - Activity Categories */}
        <div className="bg-white p-6 rounded-lg shadow">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Activity Categories</h3>
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
        </div>
      </div>

      {/* Bar Chart - Weekly Activities */}
      <div className="bg-white p-6 rounded-lg shadow mb-8">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Weekly Activity Trend</h3>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={chartData.activityData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="day" />
            <YAxis />
            <Tooltip />
            <Bar dataKey="count" fill="#10b981" />
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* Data Tables */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Activities Table */}
        <div className="bg-white rounded-lg shadow">
          <div className="p-6 border-b border-gray-200">
            <h3 className="text-lg font-semibold text-gray-900">Recent Activities</h3>
          </div>
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Activity
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    User
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Date
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {recentActivities.map((activity) => (
                  <tr key={activity._id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div>
                        <div className="text-sm font-medium text-gray-900">{activity.title}</div>
                        <div className="text-sm text-gray-500">{activity.type}</div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {activity.user}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {new Date(activity.date).toLocaleDateString()}
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
                ))}
              </tbody>
            </table>
          </div>
          <div className="p-4 border-t border-gray-200">
            <Link
              to="/dashboard/activities"
              className="text-sm font-medium text-green-600 hover:text-green-900"
            >
              View all activities →
            </Link>
          </div>
        </div>

        {/* Upcoming Events Table */}
        <div className="bg-white rounded-lg shadow">
          <div className="p-6 border-b border-gray-200">
            <h3 className="text-lg font-semibold text-gray-900">Upcoming Events</h3>
          </div>
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Event
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Date
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Participants
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {upcomingEvents.map((event) => (
                  <tr key={event._id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                      {event.title}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {new Date(event.date).toLocaleDateString()}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                        {event.participants} participants
                      </span>
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
                ))}
              </tbody>
            </table>
          </div>
          <div className="p-4 border-t border-gray-200">
            <Link
              to="/dashboard/events"
              className="text-sm font-medium text-green-600 hover:text-green-900"
            >
              View all events →
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardOverview;
