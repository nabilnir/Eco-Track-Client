import React, { useState, useEffect } from 'react';
import { FaChartLine, FaChartBar, FaChartPie, FaDownload, FaCalendarAlt, FaUsers, FaLeaf, FaTrophy } from 'react-icons/fa';
import { LineChart, Line, BarChart, Bar, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, AreaChart, Area } from 'recharts';
import axiosPublic from '../../api/axiosPublic';

const Analytics = () => {
  const [loading, setLoading] = useState(true);
  const [timeRange, setTimeRange] = useState('30d');
  const [analyticsData, setAnalyticsData] = useState({
    userGrowth: [],
    activityStats: [],
    engagementMetrics: [],
    categoryDistribution: [],
    monthlyRevenue: []
  });

  useEffect(() => {
    fetchAnalyticsData();
  }, [timeRange]);

  const fetchAnalyticsData = async () => {
    try {
      setLoading(true);
      // In a real app, this would fetch from your backend API
      // const response = await axiosPublic.get(`/admin/analytics?range=${timeRange}`);

      // Mock data for demonstration
      const mockData = {
        userGrowth: [
          { date: '2024-01-01', users: 120, newUsers: 12, activeUsers: 89 },
          { date: '2024-01-07', users: 135, newUsers: 15, activeUsers: 95 },
          { date: '2024-01-14', users: 152, newUsers: 17, activeUsers: 112 },
          { date: '2024-01-21', users: 178, newUsers: 26, activeUsers: 134 },
          { date: '2024-01-28', users: 205, newUsers: 27, activeUsers: 156 },
          { date: '2024-02-04', users: 238, newUsers: 33, activeUsers: 189 },
          { date: '2024-02-11', users: 275, newUsers: 37, activeUsers: 215 },
          { date: '2024-02-18', users: 312, newUsers: 37, activeUsers: 245 }
        ],
        activityStats: [
          { day: 'Mon', activities: 45, challenges: 12, events: 5 },
          { day: 'Tue', activities: 52, challenges: 15, events: 8 },
          { day: 'Wed', activities: 38, challenges: 8, events: 3 },
          { day: 'Thu', activities: 65, challenges: 22, events: 12 },
          { day: 'Fri', activities: 48, challenges: 18, events: 7 },
          { day: 'Sat', activities: 72, challenges: 28, events: 15 },
          { day: 'Sun', activities: 58, challenges: 20, events: 10 }
        ],
        engagementMetrics: [
          { name: 'Page Views', value: 15420, change: 12.5 },
          { name: 'Sessions', value: 3280, change: 8.3 },
          { name: 'Avg Duration', value: 245, change: -5.2 },
          { name: 'Bounce Rate', value: 32.5, change: -3.8 }
        ],
        categoryDistribution: [
          { name: 'Sustainability', value: 35, color: '#10b981' },
          { name: 'Climate Change', value: 25, color: '#3b82f6' },
          { name: 'Renewable Energy', value: 20, color: '#f59e0b' },
          { name: 'Wildlife', value: 12, color: '#ef4444' },
          { name: 'Recycling', value: 8, color: '#8b5cf6' }
        ],
        monthlyRevenue: [
          { month: 'Jan', revenue: 4500, users: 120 },
          { month: 'Feb', revenue: 5200, users: 135 },
          { month: 'Mar', revenue: 6100, users: 152 },
          { month: 'Apr', revenue: 5800, users: 178 },
          { month: 'May', revenue: 7200, users: 205 },
          { month: 'Jun', revenue: 8500, users: 238 }
        ]
      };

      setAnalyticsData(mockData);
    } catch (error) {
      console.error('Failed to fetch analytics data:', error);
    } finally {
      setLoading(false);
    }
  };

  const exportData = () => {
    // Export functionality
    toast.success('Analytics data exported successfully!');
  };

  if (loading) {
    return (
      <div className="p-6">
        <div className="animate-pulse">
          <div className="h-8 bg-gray-300 rounded w-1/3 mb-6"></div>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="h-64 bg-gray-300 rounded"></div>
            <div className="h-64 bg-gray-300 rounded"></div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="p-6">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Analytics Dashboard</h1>
          <p className="text-gray-600 dark:text-gray-400 mt-2">Track performance metrics and user engagement</p>
        </div>
        <div className="flex items-center gap-4">
          <select
            value={timeRange}
            onChange={(e) => setTimeRange(e.target.value)}
            className="px-4 py-2 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent text-gray-900 dark:text-white"
          >
            <option value="7d">Last 7 Days</option>
            <option value="30d">Last 30 Days</option>
            <option value="90d">Last 90 Days</option>
            <option value="1y">Last Year</option>
          </select>
          <button
            onClick={exportData}
            className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors flex items-center"
          >
            <FaDownload className="mr-2" /> Export
          </button>
        </div>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        {analyticsData.engagementMetrics.map((metric, index) => (
          <div key={index} className="bg-white dark:bg-gray-800 rounded-lg shadow p-6 border border-transparent dark:border-gray-700">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600 dark:text-gray-400">{metric.name}</p>
                <p className="text-2xl font-bold text-gray-900 dark:text-white">
                  {metric.name === 'Avg Duration' ? `${metric.value}s` :
                    metric.name === 'Bounce Rate' ? `${metric.value}%` :
                      metric.value.toLocaleString()}
                </p>
                <div className={`flex items-center mt-2 text-sm ${metric.change > 0 ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400'
                  }`}>
                  <span>{metric.change > 0 ? '↑' : '↓'}</span>
                  <span className="ml-1">{Math.abs(metric.change)}%</span>
                </div>
              </div>
              <div className="p-3 rounded-full bg-blue-100">
                <FaChartLine className="text-blue-600 text-xl" />
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Charts Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        {/* User Growth Chart */}
        <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow border border-transparent dark:border-gray-700">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">User Growth</h3>
          <ResponsiveContainer width="100%" height={300}>
            <AreaChart data={analyticsData.userGrowth}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="date" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Area type="monotone" dataKey="users" stackId="1" stroke="#3b82f6" fill="#93bbfc" />
              <Area type="monotone" dataKey="activeUsers" stackId="1" stroke="#10b981" fill="#86efac" />
            </AreaChart>
          </ResponsiveContainer>
        </div>

        {/* Activity Stats */}
        <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow border border-transparent dark:border-gray-700">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Weekly Activity Breakdown</h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={analyticsData.activityStats}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="day" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="activities" fill="#10b981" />
              <Bar dataKey="challenges" fill="#f59e0b" />
              <Bar dataKey="events" fill="#3b82f6" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Category Distribution and Revenue */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        {/* Category Distribution */}
        <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow border border-transparent dark:border-gray-700">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Content Category Distribution</h3>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={analyticsData.categoryDistribution}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                outerRadius={80}
                fill="#8884d8"
                dataKey="value"
              >
                {analyticsData.categoryDistribution.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>

        {/* Revenue Chart */}
        <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow border border-transparent dark:border-gray-700">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Monthly Revenue & Users</h3>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={analyticsData.monthlyRevenue}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis yAxisId="left" />
              <YAxis yAxisId="right" orientation="right" />
              <Tooltip />
              <Legend />
              <Line yAxisId="left" type="monotone" dataKey="revenue" stroke="#10b981" strokeWidth={2} />
              <Line yAxisId="right" type="monotone" dataKey="users" stroke="#3b82f6" strokeWidth={2} />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Detailed Stats Table */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow overflow-hidden border border-transparent dark:border-gray-700">
        <div className="p-6 border-b border-gray-200 dark:border-gray-700">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Performance Summary</h3>
        </div>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
            <thead className="bg-gray-50 dark:bg-gray-900/50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  Metric
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  Current Period
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  Previous Period
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  Change
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  Trend
                </th>
              </tr>
            </thead>
            <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
              <tr>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 dark:text-white">
                  <div className="flex items-center">
                    <FaUsers className="mr-2 text-blue-500" />
                    Total Users
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-gray-300">312</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">275</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-green-600 dark:text-green-400">+13.5%</td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="w-16 bg-green-200 dark:bg-green-900/30 rounded-full h-2">
                    <div className="bg-green-600 dark:bg-green-500 h-2 rounded-full" style={{ width: '75%' }}></div>
                  </div>
                </td>
              </tr>
              <tr>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 dark:text-white">
                  <div className="flex items-center">
                    <FaLeaf className="mr-2 text-green-500" />
                    Activities
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-gray-300">1,247</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">1,089</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-green-600 dark:text-green-400">+14.5%</td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="w-16 bg-green-200 dark:bg-green-900/30 rounded-full h-2">
                    <div className="bg-green-600 dark:bg-green-500 h-2 rounded-full" style={{ width: '85%' }}></div>
                  </div>
                </td>
              </tr>
              <tr>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 dark:text-white">
                  <div className="flex items-center">
                    <FaTrophy className="mr-2 text-yellow-500" />
                    Challenges
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-gray-300">89</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">76</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-green-600 dark:text-green-400">+17.1%</td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="w-16 bg-green-200 dark:bg-green-900/30 rounded-full h-2">
                    <div className="bg-green-600 dark:bg-green-500 h-2 rounded-full" style={{ width: '90%' }}></div>
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Analytics;
