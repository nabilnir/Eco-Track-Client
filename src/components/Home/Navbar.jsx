import React, { useState, useEffect, useRef } from 'react';
import { Link, NavLink, useNavigate } from 'react-router';
import toast from 'react-hot-toast';
import { FaLeaf, FaBars, FaTimes, FaUserCircle } from 'react-icons/fa';
import useAuth from '../../Hooks/useAuth';
import logo from '/logo.png'



const Navbar = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [profileDropdown, setProfileDropdown] = useState(false);

  
  const menuRef = useRef(null);

 
  useEffect(() => {
    const handler = (e) => {
      if (menuRef.current && !menuRef.current.contains(e.target)) {
        setProfileDropdown(false);
      }
    };
    document.addEventListener('mousedown', handler);
    return () => {
      document.removeEventListener('mousedown', handler);
    };
  }, []);

  const handleLogout = async () => {
    try {
      await logout();
      toast.success('Logged out successfully');
      navigate('/');
      setProfileDropdown(false); 
      setMobileMenuOpen(false); 
    } catch (error) {
      toast.error('Failed to log out', error);
    }
  };

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  const closeMenus = () => {
    setMobileMenuOpen(false);
    setProfileDropdown(false);
  };

  return (
    <nav className="fixed top-0 left-0 right-0 bg-white shadow-md z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2 text-2xl font-bold text-green-600 hover:text-green-700">
            <img src={logo} className='w-12 h-12'  alt="" />
            <span>EcoTrack</span>
          </Link>

          {/* Main Navigation Menu  */}
          <div className="hidden md:flex md:items-center md:space-x-8">
            <NavLink
              to="/"
              className={({ isActive }) =>
                `text-gray-700 hover:text-green-600 transition duration-300 font-medium relative py-1 ${
                  isActive ? 'text-green-600' : ''
                }`
              }
            >
              Home
            </NavLink>
            <NavLink
              to="/challenges"
              className={({ isActive }) =>
                `text-gray-700 hover:text-green-600 transition duration-300 font-medium relative py-1 ${
                  isActive ? 'text-green-600' : ''
                }`
              }
            >
              Challenges
            </NavLink>
            <NavLink
              to="/events"
              className={({ isActive }) =>
                `text-gray-700 hover:text-green-600 transition duration-300 font-medium relative py-1 ${
                  isActive ? 'text-green-600' : ''
                }`
              }
            >
              Events
            </NavLink>
            <NavLink
              to="Tips"
              className={({ isActive }) =>
                `text-gray-700 hover:text-green-600 transition duration-300 font-medium relative py-1 ${
                  isActive ? 'text-green-600' : ''
                }`
              }
            >
              Tips
            </NavLink>
            {user && (
              <NavLink
                to="/my-activities"
                className={({ isActive }) =>
                  `text-gray-700 hover:text-green-600 transition duration-300 font-medium relative py-1 ${
                    isActive ? 'text-green-600' : ''
                  }`
                }
              >
                My Activities
              </NavLink>
              
              
            )}
            {
              user &&(
                <NavLink
                to="/myprofile"
                className={({ isActive }) =>
                  `text-gray-700 hover:text-green-600 transition duration-300 font-medium relative py-1 ${
                    isActive ? 'text-green-600' : ''
                  }`
                }
              >
                My Profile
              </NavLink>
              )
            }
            
          </div>
          
          {/* Right Section  */}
          <div className="flex items-center space-x-4" ref={menuRef}>
            {user ? (
              // User Menu
              <div className="relative hidden md:block">
                <button
                  className="flex items-center space-x-2 p-2 rounded-lg hover:bg-gray-100 transition duration-200"
                  onClick={() => setProfileDropdown(!profileDropdown)}
                >
                  {user.photoURL ? (
                    <img src={user.photoURL} alt={user.displayName} className="w-8 h-8 rounded-full object-cover" />
                  ) : (
                    <FaUserCircle size={32} className="text-gray-500" />
                  )}
                  <span className="font-semibold text-gray-800 hidden lg:block">{user.displayName || 'User'}</span>
                </button>

                {/* Dropdown Menu */}
                {profileDropdown && (
                  <div className="absolute right-0 mt-3 w-56 bg-white rounded-xl shadow-2xl overflow-hidden animate-fade-in z-50">
                    <div className="p-4 border-b border-gray-100">
                      <p className="font-semibold text-gray-800 truncate">{user.displayName || 'User'}</p>
                      <p className="text-sm text-gray-500 truncate">{user.email}</p>
                    </div>
                    <Link
                      to="/my-activities"
                      className="block px-4 py-3 text-gray-700 hover:bg-gray-50 transition duration-150"
                      onClick={() => setProfileDropdown(false)}
                    >
                      My Activities
                    </Link>
                    <Link
                      to="/myprofile"
                      className="block px-4 py-3 text-gray-700 hover:bg-gray-50 transition duration-150"
                      onClick={() => setProfileDropdown(false)}
                    >
                      My Profile
                    </Link>
                    <button
                      className="block w-full text-left px-4 py-3 text-gray-700 hover:bg-gray-50 transition duration-150"
                      onClick={handleLogout}
                    >
                      Logout
                    </button>
                  </div>
                )}
              </div>
            ) : (
              // Auth Buttons
              <div className="hidden md:flex space-x-3">
                <Link
                  to="/login"
                  className="px-4 py-2 text-green-600 border border-green-600 rounded-lg hover:bg-green-50 transition duration-200 font-medium"
                >
                  Login
                </Link>
                <Link
                  to="/register"
                  className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition duration-200 font-medium shadow-md"
                >
                  Register
                </Link>
              </div>
            )}

            {/* Mobile Menu Button */}
            <button
              className="md:hidden text-gray-600 hover:text-green-600 p-2"
              onClick={toggleMobileMenu}
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
            </button>
          </div>
        </div>
      </div>
      
      {/* Mobile Menu Dropdown */}
      {mobileMenuOpen && (
        <div className="md:hidden">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 flex flex-col items-start bg-white shadow-lg absolute w-full z-40">
            <NavLink
              to="/"
              className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:bg-gray-100 hover:text-green-600 w-full text-left"
              onClick={closeMenus}
            >
              Home
            </NavLink>
            <NavLink
              to="/challenges"
              className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:bg-gray-100 hover:text-green-600 w-full text-left"
              onClick={closeMenus}
            >
              Challenges
            </NavLink>
            <NavLink
              to="/tips"
              className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:bg-gray-100 hover:text-green-600 w-full text-left"
              onClick={closeMenus}
            >
              Tips
            </NavLink>
            <NavLink
              to="/events"
              className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:bg-gray-100 hover:text-green-600 w-full text-left"
              onClick={closeMenus}
            >
              Events
            </NavLink>
            {user && (
              <>
                <NavLink
                  to="/my-activities"
                  className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:bg-gray-100 hover:text-green-600 w-full text-left"
                  onClick={closeMenus}
                >
                  My Activities
                </NavLink>
                <NavLink
                  to="/myprofile"
                  className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:bg-gray-100 hover:text-green-600 w-full text-left"
                  onClick={closeMenus}
                >
                  My Profile
                </NavLink>
                
                {/* User Info and Logout */}
                <div className="w-full pt-2 mt-2 border-t border-gray-100">
                    <p className="px-3 text-sm font-semibold text-gray-800 truncate">{user.displayName || 'User'}</p>
                    <p className="px-3 pb-2 text-xs text-gray-500 truncate">{user.email}</p>
                    <button
                        className="block w-full text-left px-3 py-2 rounded-md text-base font-medium text-red-600 hover:bg-red-50"
                        onClick={handleLogout}
                    >
                        Logout
                    </button>
                </div>
              </>
            )}
            
            {!user && (
              <div className="w-full pt-2 mt-2 border-t border-gray-100 flex flex-col space-y-2">
                <Link
                  to="/login"
                  className="text-center px-4 py-2 text-green-600 border border-green-600 rounded-lg hover:bg-green-50 transition duration-200 font-medium"
                  onClick={closeMenus}
                >
                  Login
                </Link>
                <Link
                  to="/register"
                  className="text-center px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition duration-200 font-medium shadow-md"
                  onClick={closeMenus}
                >
                  Register
                </Link>
              </div>
            )}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;