import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router';
import toast from 'react-hot-toast';
import { FaGoogle, FaFacebook, FaTwitter, FaGithub, FaUser, FaLock, FaEnvelope, FaEye, FaEyeSlash } from 'react-icons/fa';
import { Sprout, AlertCircle } from 'lucide-react';
import useAuth from '../../Hooks/useAuth';
import axiosPublic from '../../api/axiosPublic';

const LoginForm = () => {
  const { login, googleSignIn } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});
  const [showPassword, setShowPassword] = useState(false);

  const from = location.state?.from?.pathname || '/dashboard';

  // Demo credentials
  const demoCredentials = {
    user: {
      email: 'user@ecotrack.com',
      password: 'User@123'
    },
    admin: {
      email: 'admin@ecotrack.com',
      password: 'Admin@123'
    }
  };

  const validate = () => {
    const newErrors = {};

    if (!email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      newErrors.email = 'Please enter a valid email address';
    }

    if (!password.trim()) {
      newErrors.password = 'Password is required';
    } else if (password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters long';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    if (!validate()) return;

    setLoading(true);
    try {
      const result = await login(email, password);
      // Sync user data to backend (just in case they missed registration sync)
      // Done in a separate try block so it doesn't break the login success if it fails
      try {
        const user = result.user;
        await axiosPublic.post('/users', {
          name: user.displayName || 'User',
          email: user.email,
          photoURL: user.photoURL,
          role: user.email?.toLowerCase().includes('admin') ? 'admin' : 'user'
        });
      } catch (syncError) {
        console.warn('Backend user sync failed:', syncError);
      }

      toast.success('Logged in successfully! Welcome back to EcoTrack');
      navigate(from, { replace: true });
    } catch (error) {
      console.error('Login failed:', error.message);

      // Handle specific Firebase errors
      if (error.code === 'auth/user-not-found') {
        toast.error('No account found with this email address');
      } else if (error.code === 'auth/wrong-password') {
        toast.error('Incorrect password. Please try again');
      } else if (error.code === 'auth/too-many-requests') {
        toast.error('Too many failed attempts. Please try again later');
      } else if (error.code === 'auth/user-disabled') {
        toast.error('This account has been disabled');
      } else {
        toast.error('Login failed. Please check your credentials and try again');
      }
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleLogin = async () => {
    setLoading(true);
    try {
      const result = await googleSignIn();
      const user = result.user;

      // Sync user data to backend
      await axiosPublic.post('/users', {
        name: user.displayName,
        email: user.email,
        photoURL: user.photoURL,
        role: 'user'
      });

      toast.success('Signed in with Google successfully!');
      navigate(from, { replace: true });
    } catch (error) {
      console.error('Google Login failed:', error.message);
      toast.error(error.message || 'Google login failed. Please try again');
    } finally {
      setLoading(false);
    }
  };

  const handleFacebookLogin = async () => {
    setLoading(true);
    try {
      // Facebook login implementation would go here
      toast.info('Facebook login coming soon!');
      // await facebookSignIn();
    } catch (error) {
      toast.error('Facebook login failed');
    } finally {
      setLoading(false);
    }
  };

  const handleTwitterLogin = async () => {
    setLoading(true);
    try {
      // Twitter login implementation would go here
      toast.info('Twitter login coming soon!');
      // await twitterSignIn();
    } catch (error) {
      toast.error('Twitter login failed');
    } finally {
      setLoading(false);
    }
  };

  const handleGithubLogin = async () => {
    setLoading(true);
    try {
      // GitHub login implementation would go here
      toast.info('GitHub login coming soon!');
      // await githubSignIn();
    } catch (error) {
      toast.error('GitHub login failed');
    } finally {
      setLoading(false);
    }
  };

  const fillDemoCredentials = (type) => {
    const credentials = demoCredentials[type];
    setEmail(credentials.email);
    setPassword(credentials.password);
    setErrors({});
    toast.info(`Demo ${type} credentials filled!`);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-green-50 to-teal-50 flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-md">
        {/* Logo/Brand */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-green-600 rounded-full mb-4">
            <Sprout className="text-white" size={32} />
          </div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Welcome to EcoTrack
          </h1>
          <p className="text-gray-600">Sign in to continue your sustainability journey</p>
        </div>

        <div className="bg-white rounded-2xl shadow-xl p-8">
          {/* Demo Credentials */}
          <div className="mb-6 p-4 bg-blue-50 border border-blue-200 rounded-lg">
            <p className="text-sm font-semibold text-blue-800 mb-2">Demo Credentials:</p>
            <div className="flex gap-2">
              <button
                onClick={() => fillDemoCredentials('user')}
                className="flex-1 px-3 py-2 bg-blue-600 text-white text-sm rounded-lg hover:bg-blue-700 transition-colors"
              >
                User Demo
              </button>
              <button
                onClick={() => fillDemoCredentials('admin')}
                className="flex-1 px-3 py-2 bg-purple-600 text-white text-sm rounded-lg hover:bg-purple-700 transition-colors"
              >
                Admin Demo
              </button>
            </div>
          </div>

          <form onSubmit={handleLogin} className="space-y-5">
            {/* Email Field */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2" htmlFor="email">
                Email Address
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <FaEnvelope className="text-gray-400" size={18} />
                </div>
                <input
                  type="email"
                  id="email"
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value);
                    setErrors(prev => ({ ...prev, email: '' }));
                  }}
                  className="w-full pl-10 pr-4 py-3 rounded-lg border-2 border-gray-200 bg-white text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all"
                  placeholder="your@email.com"
                />
              </div>
              {errors.email && <p className="mt-1 text-sm text-red-600 flex items-center gap-1">
                <AlertCircle size={14} /> {errors.email}
              </p>}
            </div>

            {/* Password Field */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2" htmlFor="password">
                Password
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <FaLock className="text-gray-400" size={18} />
                </div>
                <input
                  type={showPassword ? 'text' : 'password'}
                  id="password"
                  value={password}
                  onChange={(e) => {
                    setPassword(e.target.value);
                    setErrors(prev => ({ ...prev, password: '' }));
                  }}
                  className="w-full pl-10 pr-12 py-3 rounded-lg border-2 border-gray-200 bg-white text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all"
                  placeholder="••••••••"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-0 pr-3 flex items-center"
                >
                  <span className="text-gray-400 hover:text-gray-600 cursor-pointer">
                    {showPassword ? <FaEye size={18} /> : <FaEyeSlash size={18} />}
                  </span>
                </button>
              </div>
              {errors.password && <p className="mt-1 text-sm text-red-600 flex items-center gap-1">
                <AlertCircle size={14} /> {errors.password}
              </p>}
            </div>

            {/* Forgot Password Link */}
            <div className="text-right">
              <Link to="/forgot-password" className="text-sm text-emerald-600 hover:text-emerald-700 font-medium transition-colors">
                Forgot your password?
              </Link>
            </div>

            {/* Login Button */}
            <button
              type="submit"
              className="w-full py-3 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 transition-all duration-200 font-semibold shadow-md hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed transform hover:scale-[1.02] flex items-center justify-center gap-2"
              disabled={loading}
            >
              {loading ? (
                <>
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  Signing in...
                </>
              ) : (
                <>
                  <FaUser size={18} />
                  Sign In
                </>
              )}
            </button>
          </form>

          {/* Social Login Section */}
          <div className="mt-8">
            <div className="flex items-center my-6">
              <div className="flex-grow border-t border-gray-300"></div>
              <span className="flex-shrink mx-4 text-gray-500 text-sm font-medium">OR CONTINUE WITH</span>
              <div className="flex-grow border-t border-gray-300"></div>
            </div>

            <div className="space-y-3">
              {/* Google Login */}
              <button
                onClick={handleGoogleLogin}
                className="w-full py-3 px-4 bg-white text-gray-700 border-2 border-gray-200 rounded-lg hover:bg-gray-50 hover:border-gray-300 transition-all duration-200 font-medium flex items-center justify-center space-x-3 disabled:opacity-50 disabled:cursor-not-allowed shadow-sm hover:shadow"
                disabled={loading}
              >
                <FaGoogle className="text-xl text-red-500" />
                <span>Continue with Google</span>
              </button>

              {/* Facebook Login */}
              <button
                onClick={handleFacebookLogin}
                className="w-full py-3 px-4 bg-white text-gray-700 border-2 border-gray-200 rounded-lg hover:bg-gray-50 hover:border-gray-300 transition-all duration-200 font-medium flex items-center justify-center space-x-3 disabled:opacity-50 disabled:cursor-not-allowed shadow-sm hover:shadow"
                disabled={loading}
              >
                <FaFacebook className="text-xl text-blue-600" />
                <span>Continue with Facebook</span>
              </button>

              {/* Twitter Login */}
              <button
                onClick={handleTwitterLogin}
                className="w-full py-3 px-4 bg-white text-gray-700 border-2 border-gray-200 rounded-lg hover:bg-gray-50 hover:border-gray-300 transition-all duration-200 font-medium flex items-center justify-center space-x-3 disabled:opacity-50 disabled:cursor-not-allowed shadow-sm hover:shadow"
                disabled={loading}
              >
                <FaTwitter className="text-xl text-sky-500" />
                <span>Continue with Twitter</span>
              </button>

              {/* GitHub Login */}
              <button
                onClick={handleGithubLogin}
                className="w-full py-3 px-4 bg-white text-gray-700 border-2 border-gray-200 rounded-lg hover:bg-gray-50 hover:border-gray-300 transition-all duration-200 font-medium flex items-center justify-center space-x-3 disabled:opacity-50 disabled:cursor-not-allowed shadow-sm hover:shadow"
                disabled={loading}
              >
                <FaGithub className="text-xl text-gray-800" />
                <span>Continue with GitHub</span>
              </button>
            </div>
          </div>

          {/* Register Link */}
          <div className="text-center mt-8 pt-6 border-t border-gray-200">
            <p className="text-sm text-gray-600">
              Don't have an account?{' '}
              <Link to="/register" className="text-emerald-600 font-semibold hover:text-emerald-700 transition-colors">
                Create a free account
              </Link>
            </p>
          </div>
        </div>

        {/* Footer Info */}
        <div className="text-center mt-6 text-sm text-gray-500">
          <p>By signing in, you agree to our</p>
          <div className="flex justify-center gap-4 mt-1">
            <Link to="/terms" className="text-emerald-600 hover:text-emerald-700">Terms of Service</Link>
            <span>•</span>
            <Link to="/privacy" className="text-emerald-600 hover:text-emerald-700">Privacy Policy</Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginForm;