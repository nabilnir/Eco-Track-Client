import React, { useState } from 'react';
import { Outlet, Link, useLocation, useNavigate } from 'react-router';
import {
  FaHome,
  FaUser,
  FaChartBar,
  FaCog,
  FaSignOutAlt,
  FaBars,
  FaTimes,
  FaLeaf,
  FaTrophy,
  FaCalendarAlt,
  FaUsers,
  FaChartLine,
  FaChartPie,
  FaGlobe
} from 'react-icons/fa';
import DarkModeToggle from '../components/UI/DarkModeToggle';
import useAuth from '../Hooks/useAuth';

const DashboardLayout = () => {
  const { user, logout } = useAuth();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [collapsed, setCollapsed] = useState(false);
  const [profileDropdownOpen, setProfileDropdownOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  // Determine user role from AuthContext
  // Optional: fallback to email check if role is mission for some reason
  const isAdmin = user?.role === 'admin' || user?.email?.toLowerCase().includes('admin');
  const userRole = isAdmin ? 'admin' : 'user';

  // Menu items based on user role
  const userMenuItems = [
    {
      name: 'Dashboard',
      path: '/dashboard',
      icon: FaHome,
      label: 'Overview'
    },
    {
      name: 'My Activities',
      path: '/dashboard/activities',
      icon: FaLeaf,
      label: 'My Activities'
    },
    {
      name: 'Challenges',
      path: '/dashboard/challenges',
      icon: FaTrophy,
      label: 'Challenges'
    },
    {
      name: 'Events',
      path: '/dashboard/events',
      icon: FaCalendarAlt,
      label: 'Events'
    },
    {
      name: 'Profile',
      path: '/dashboard/profile',
      icon: FaUser,
      label: 'Profile'
    }
  ];

  const adminMenuItems = [
    {
      name: 'Dashboard',
      path: '/dashboard',
      icon: FaHome,
      label: 'Overview'
    },
    {
      name: 'User Management',
      path: '/dashboard/users',
      icon: FaUsers,
      label: 'Users'
    },
    {
      name: 'Analytics',
      path: '/dashboard/analytics',
      icon: FaChartLine,
      label: 'Analytics'
    },
    {
      name: 'Settings',
      path: '/dashboard/settings',
      icon: FaCog,
      label: 'Settings'
    }
  ];

  const menuItems = userRole === 'admin' ? adminMenuItems : userMenuItems;

  const handleLogout = async () => {
    try {
      await logout();
      navigate('/login');
    } catch (error) {
      console.error('Logout failed:', error);
    }
  };

  const isActivePath = (path) => {
    if (path === '/dashboard') {
      return location.pathname === '/dashboard';
    }
    return location.pathname.startsWith(path);
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-dark-bg flex transition-colors duration-300">
      {/* Sidebar */}
      <div className={`fixed inset-y-0 left-0 z-50 bg-white dark:bg-gray-800 shadow-lg transform transition-all duration-300 ease-in-out 
        ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'} 
        lg:translate-x-0 
        ${collapsed ? 'w-20' : 'w-64'}
        border-r border-gray-200 dark:border-gray-700
      `}>
        {/* Sidebar Header */}
        <div className={`flex items-center ${collapsed ? 'justify-center' : 'justify-between'} h-16 px-4 border-b border-gray-200 dark:border-gray-700`}>
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <div className="w-8 h-8 bg-green-600 rounded-lg flex items-center justify-center">
                <FaLeaf className="text-white" />
              </div>
            </div>
            {!collapsed && (
              <div className="ml-3 fade-in">
                <h1 className="text-xl font-bold text-gray-900 dark:text-white">EcoTrack</h1>
                <p className="text-xs text-gray-500 dark:text-gray-400 capitalize">{userRole} Dashboard</p>
              </div>
            )}
          </div>

          {/* Mobile Close Button */}
          <button
            onClick={() => setSidebarOpen(false)}
            className="lg:hidden text-gray-400 hover:text-gray-600"
          >
            <FaTimes size={20} />
          </button>

          {/* Desktop Collapse Toggle */}
          <button
            onClick={() => setCollapsed(!collapsed)}
            className={`hidden lg:block text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 ${collapsed ? 'absolute -right-3 top-6 bg-white dark:bg-gray-800 rounded-full p-1 shadow-md border border-gray-200 dark:border-gray-700' : ''}`}
          >
            {collapsed ? <FaBars size={12} /> : <FaBars size={20} />}
          </button>
        </div>

        {/* Sidebar Navigation */}
        <nav className="mt-6 px-3">
          <div className="space-y-1">
            {menuItems.map((item) => {
              const Icon = item.icon;
              const isActive = isActivePath(item.path);

              return (
                <Link
                  key={item.name}
                  to={item.path}
                  className={`group flex items-center px-3 py-2 text-sm font-medium rounded-lg transition-all duration-200 ${isActive
                    ? 'bg-green-50 dark:bg-green-900/20 text-green-700 dark:text-green-400 border-r-2 border-green-700'
                    : 'text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 hover:text-gray-900 dark:hover:text-white'
                    } ${collapsed ? 'justify-center' : ''}`}
                  title={collapsed ? item.label : ''}
                >
                  <Icon className={`h-5 w-5 ${isActive ? 'text-green-700 dark:text-green-400' : 'text-gray-400 group-hover:text-gray-500 dark:group-hover:text-gray-300'} ${collapsed ? '' : 'mr-3'}`} />
                  {!collapsed && <span className="fade-in">{item.label}</span>}
                </Link>
              );
            })}
          </div>
          <div className="mt-4 pt-4 border-t border-gray-200 dark:border-gray-700">
            <Link
              to="/"
              className={`group flex items-center px-3 py-2 text-sm font-medium rounded-lg transition-all duration-200 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 hover:text-gray-900 dark:hover:text-white ${collapsed ? 'justify-center' : ''}`}
              title={collapsed ? "Back to Home" : ""}
            >
              <FaGlobe className={`h-5 w-5 text-gray-400 group-hover:text-gray-500 dark:group-hover:text-gray-300 ${collapsed ? '' : 'mr-3'}`} />
              {!collapsed && <span className="fade-in">Back to Home</span>}
            </Link>
          </div>
        </nav>

        {/* Sidebar Footer */}
        <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800">
          <div className={`flex items-center ${collapsed ? 'justify-center' : ''}`}>
            <div className="flex-shrink-0">
              <img
                className="h-8 w-8 rounded-full"
                src={user?.photoURL || 'https://picsum.photos/seed/user/200/200.jpg'}
                alt="User avatar"
              />
            </div>
            {!collapsed && (
              <div className="ml-3 flex-1 fade-in">
                <p className="text-sm font-medium text-gray-900 dark:text-white truncate">
                  {user?.displayName || 'User'}
                </p>
                <p className="text-xs text-gray-500 dark:text-gray-400 capitalize">
                  {userRole}
                </p>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className={`flex-1 min-w-0 transition-all duration-300 ease-in-out ${collapsed ? 'lg:ml-20' : 'lg:ml-64'}`}>
        {/* Top Navbar */}
        <header className="bg-white dark:bg-gray-800 shadow-sm border-b border-gray-200 dark:border-gray-700 transition-colors duration-300">
          <div className="px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between h-16">
              {/* Mobile menu button */}
              <button
                onClick={() => setSidebarOpen(true)}
                className="lg:hidden text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 focus:outline-none"
              >
                <FaBars size={20} />
              </button>

              {/* Search Bar - hidden on mobile to save space if needed, or adjust width */}
              <div className="flex-1 max-w-lg mx-4 hidden md:block">
                <div className="relative">
                  <input
                    type="text"
                    placeholder="Search..."
                    className="w-full pl-10 pr-4 py-2 bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent text-gray-900 dark:text-white"
                  />
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <svg className="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                    </svg>
                  </div>
                </div>
              </div>

              {/* Right side items */}
              <div className="flex items-center space-x-4">
                <DarkModeToggle />


                {/* Profile Dropdown */}
                <div className="relative">
                  <button
                    onClick={() => setProfileDropdownOpen(!profileDropdownOpen)}
                    className="flex items-center space-x-3 text-sm rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 p-2"
                  >
                    <img
                      className="h-8 w-8 rounded-full"
                      src={user?.photoURL || 'https://picsum.photos/seed/user/200/200.jpg'}
                      alt="User avatar"
                    />
                    <div className="hidden md:block text-left">
                      <p className="text-sm font-medium text-gray-900 dark:text-white">
                        {user?.displayName || 'User'}
                      </p>
                      <p className="text-xs text-gray-500 dark:text-gray-400 capitalize">{userRole}</p>
                    </div>
                    <svg className="h-4 w-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </button>

                  {/* Dropdown Menu */}
                  {profileDropdownOpen && (
                    <div className="absolute right-0 mt-2 w-48 bg-white dark:bg-gray-800 rounded-lg shadow-lg py-1 z-50 border border-gray-200 dark:border-gray-700">
                      <Link
                        to="/"
                        className="block px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 border-b border-gray-100 dark:border-gray-700"
                        onClick={() => setProfileDropdownOpen(false)}
                      >
                        <FaGlobe className="inline mr-2 text-green-600" />
                        Main Home Site
                      </Link>
                      <Link
                        to="/dashboard/profile"
                        className="block px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
                        onClick={() => setProfileDropdownOpen(false)}
                      >
                        <FaUser className="inline mr-2" />
                        Profile
                      </Link>
                      <Link
                        to="/dashboard"
                        className="block px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
                        onClick={() => setProfileDropdownOpen(false)}
                      >
                        <FaHome className="inline mr-2" />
                        Dashboard Home
                      </Link>
                      <button
                        onClick={handleLogout}
                        className="block w-full text-left px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
                      >
                        <FaSignOutAlt className="inline mr-2" />
                        Logout
                      </button>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </header>

        {/* Page Content */}
        <main className="flex-1">
          <Outlet />
        </main>
      </div>

      {/* Mobile sidebar overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 z-40 bg-gray-600 bg-opacity-75 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}
    </div>
  );
};

export default DashboardLayout;
