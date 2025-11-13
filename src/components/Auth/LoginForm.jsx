// src/components/LoginForm.jsx
import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router';
import toast from 'react-hot-toast';
import { FaGoogle } from 'react-icons/fa';
import useAuth from '../../Hooks/useAuth';

const LoginForm = () => {
  const { login, googleSignIn } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});

  const from = location.state?.from?.pathname || '/';

  const validate = () => {
    const newErrors = {};
    if (!email) newErrors.email = 'Email is required.';
    if (!password) newErrors.password = 'Password is required.';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    if (!validate()) return;

    setLoading(true);
    try {
      await login(email, password);
      toast.success('Logged in successfully!'); 
      navigate(from, { replace: true });
    } catch (error) {
      console.error('Login failed:', error.message);
      toast.error(error.message || 'Login failed. Please check your credentials.');
    } finally {
      setLoading(false); 
    }
  };

  const handleGoogleLogin = async () => {
    setLoading(true);
    try {
      await googleSignIn();
      toast.success('Signed in with Google successfully!');
      navigate(from, { replace: true });
    } catch (error) {
      console.error('Google Login failed:', error.message);
      toast.error(error.message || 'Google login failed.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full max-w-md mx-auto p-6 sm:p-8 my-10 bg-white rounded-xl shadow-lg">
      <h2 className="text-3xl font-bold text-center text-gray-800 mb-8">
        Login to EcoTrack
      </h2>
      
      <form onSubmit={handleLogin} className="space-y-4">
        {/* Email Field */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2" htmlFor="email">
            Email
          </label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
              setErrors(prev => ({ ...prev, email: '' }));
            }}
            className="w-full p-3 rounded-lg border border-gray-300 bg-white text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-400 focus:border-transparent"
            placeholder="your@email.com"
          />
          {errors.email && <p className="mt-1 text-sm text-red-600">{errors.email}</p>}
        </div>

        {/* Password Field */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2" htmlFor="password">
            Password
          </label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
              setErrors(prev => ({ ...prev, password: '' }));
            }}
            className="w-full p-3 rounded-lg border border-gray-300 bg-white text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-400 focus:border-transparent"
            placeholder="••••••••"
          />
          {errors.password && <p className="mt-1 text-sm text-red-600">{errors.password}</p>}
        </div>

        {/* Login Button */}
        <button
          type="submit"
          className="w-full py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition duration-200 font-semibold shadow-md disabled:opacity-50 disabled:cursor-not-allowed"
          disabled={loading}
        >
          {loading ? 'Logging in...' : 'Login'}
        </button>
      </form>

      {/* Separator */}
      <div className="flex items-center my-6">
        <div className="flex-grow border-t border-gray-300"></div>
        <span className="flex-shrink mx-4 text-gray-500 text-sm">OR</span>
        <div className="flex-grow border-t border-gray-300"></div>
      </div>

      {/* Google Login Button */}
      <button
        onClick={handleGoogleLogin}
        className="w-full py-3 px-4 text-gray-700 border border-gray-300 rounded-lg hover:bg-gray-50 transition duration-200 font-medium flex items-center justify-center space-x-2 disabled:opacity-50 disabled:cursor-not-allowed"
        disabled={loading}
      >
        <FaGoogle className="text-xl" />
        <span>Login with Google</span>
      </button>

      {/* Links */}
      <p className="text-center text-sm mt-6 text-gray-600">
        Don't have an account?{' '}
        <Link to="/register" className="text-green-600 font-medium hover:text-green-700 transition duration-200">
          Register
        </Link>
      </p>
      <p className="text-center text-sm mt-2">
        <Link to="/forgot-password" className="text-gray-600 hover:text-green-600 transition duration-200">
          Forgot Password?
        </Link>
      </p>
    </div>
  );
};

export default LoginForm;