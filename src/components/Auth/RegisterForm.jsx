import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router';
import toast from 'react-hot-toast';
import { FaGoogle, FaFacebook, FaTwitter, FaGithub, FaEye, FaEyeSlash, FaUser, FaEnvelope, FaLock, FaImage } from 'react-icons/fa';
import useAuth from '../../Hooks/useAuth';
import axiosPublic from '../../api/axiosPublic';
import { Sprout, AlertCircle } from 'lucide-react';

const RegisterForm = () => {
  const { register, googleSignIn, updateUserProfile } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    photoURL: '',
    password: '',
  });
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});

  const from = location.state?.from?.pathname || '/';

  // Password validation function
  const validatePassword = (password) => {
    const errors = [];
    if (password.length < 6) {
      errors.push('Password must be at least 6 characters long');
    }
    if (!/[A-Z]/.test(password)) {
      errors.push('Password must contain at least one uppercase letter');
    }
    if (!/[a-z]/.test(password)) {
      errors.push('Password must contain at least one lowercase letter');
    }
    if (!/[!@#$%^&*(),.?":{}|<>]/.test(password)) {
      errors.push('Password must contain at least one special character');
    }
    return errors;
  };

  // Form validation
  const validate = () => {
    const newErrors = {};

    if (!formData.name.trim()) {
      newErrors.name = 'Name is required';
    } else if (formData.name.trim().length < 2) {
      newErrors.name = 'Name must be at least 2 characters long';
    }

    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address';
    }

    if (!formData.photoURL.trim()) {
      newErrors.photoURL = 'Photo URL is required';
    } else if (!/^https?:\/\/.+\.(jpg|jpeg|png|gif|webp)$/i.test(formData.photoURL)) {
      newErrors.photoURL = 'Please enter a valid image URL';
    }

    const passwordErrors = validatePassword(formData.password);
    if (passwordErrors.length > 0) {
      newErrors.password = passwordErrors[0];
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));

    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }

    if (name === 'password') {
      const passwordErrors = validatePassword(value);
      if (passwordErrors.length > 0) {
        setErrors(prev => ({ ...prev, password: passwordErrors[0] }));
      } else {
        setErrors(prev => ({ ...prev, password: '' }));
      }
    }
  };

  // Handle registration
  const handleRegister = async (e) => {
    e.preventDefault();
    if (!validate()) return;

    setLoading(true);
    try {
      await register(formData.email, formData.password);
      await updateUserProfile(formData.name, formData.photoURL);

      // Save user to backend
      await axiosPublic.post('/users', {
        name: formData.name,
        email: formData.email,
        photoURL: formData.photoURL,
        role: 'user'
      });

      toast.success('Registration successful! Welcome to EcoTrack!');
      navigate(from, { replace: true });
    } catch (error) {
      console.error('Registration failed:', error.message);

      // Handle specific Firebase errors
      if (error.code === 'auth/email-already-in-use') {
        toast.error('This email is already registered. Please login instead.');
      } else if (error.code === 'auth/weak-password') {
        toast.error('Password is too weak. Please choose a stronger password.');
      } else if (error.code === 'auth/invalid-email') {
        toast.error('Invalid email address. Please check and try again.');
      } else if (error.code === 'auth/too-many-requests') {
        toast.error('Too many registration attempts. Please try again later.');
      } else {
        toast.error(error.message || 'Registration failed. Please try again.');
      }
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleRegister = async () => {
    setLoading(true);
    try {
      const result = await googleSignIn();
      const user = result.user;

      // Save user to backend
      await axiosPublic.post('/users', {
        name: user.displayName,
        email: user.email,
        photoURL: user.photoURL,
        role: 'user'
      });

      toast.success('Signed up with Google successfully!');
      navigate(from, { replace: true });
    } catch (error) {
      console.error('Google Sign In failed:', error.message);
      toast.error(error.message || 'Google sign up failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleFacebookRegister = async () => {
    setLoading(true);
    try {
      // Facebook registration implementation would go here
      toast.info('Facebook registration coming soon!');
      // await facebookSignIn();
    } catch (error) {
      toast.error('Facebook registration failed');
    } finally {
      setLoading(false);
    }
  };

  const handleTwitterRegister = async () => {
    setLoading(true);
    try {
      // Twitter registration implementation would go here
      toast.info('Twitter registration coming soon!');
      // await twitterSignIn();
    } catch (error) {
      toast.error('Twitter registration failed');
    } finally {
      setLoading(false);
    }
  };

  const handleGithubRegister = async () => {
    setLoading(true);
    try {
      // GitHub registration implementation would go here
      toast.info('GitHub registration coming soon!');
      // await githubSignIn();
    } catch (error) {
      toast.error('GitHub registration failed');
    } finally {
      setLoading(false);
    }
  };

  const fillDemoData = () => {
    setFormData({
      name: 'Demo User',
      email: 'user@ecotrack.com',
      photoURL: 'https://picsum.photos/seed/user/200/200.jpg',
      password: 'user123'
    });
    setErrors({});
    toast.info('Demo data filled! Password: user123');
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
            Join EcoTrack
          </h1>
          <p className="text-gray-600">Create your account and start your sustainability journey</p>
        </div>

        <div className="bg-white rounded-2xl shadow-xl p-8">
          {/* Demo Data Button */}
          <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-lg">
            <p className="text-sm font-semibold text-green-800 mb-2">Quick Demo:</p>
            <button
              onClick={fillDemoData}
              className="w-full px-3 py-2 bg-green-600 text-white text-sm rounded-lg hover:bg-green-700 transition-colors"
            >
              Fill Demo Data
            </button>
          </div>

          <form onSubmit={handleRegister} className="space-y-5">
            {/* Name Field */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2" htmlFor="name">
                Full Name
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <FaUser className="text-gray-400" size={18} />
                </div>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className="w-full pl-10 pr-4 py-3 rounded-lg border-2 border-gray-200 bg-white text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all"
                  placeholder="John Doe"
                />
              </div>
              {errors.name && <p className="mt-1 text-sm text-red-600 flex items-center gap-1">
                <AlertCircle size={14} /> {errors.name}
              </p>}
            </div>

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
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full pl-10 pr-4 py-3 rounded-lg border-2 border-gray-200 bg-white text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all"
                  placeholder="your@email.com"
                />
              </div>
              {errors.email && <p className="mt-1 text-sm text-red-600 flex items-center gap-1">
                <AlertCircle size={14} /> {errors.email}
              </p>}
            </div>

            {/* Photo URL Field */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2" htmlFor="photoURL">
                Profile Picture URL
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <FaImage className="text-gray-400" size={18} />
                </div>
                <input
                  type="url"
                  id="photoURL"
                  name="photoURL"
                  value={formData.photoURL}
                  onChange={handleChange}
                  className="w-full pl-10 pr-4 py-3 rounded-lg border-2 border-gray-200 bg-white text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all"
                  placeholder="https://example.com/photo.jpg"
                />
              </div>
              {errors.photoURL && <p className="mt-1 text-sm text-red-600 flex items-center gap-1">
                <AlertCircle size={14} /> {errors.photoURL}
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
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
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

              {/* Password Requirements */}
              <div className="mt-2 text-xs text-gray-600 space-y-1">
                <p>Password must contain:</p>
                <ul className="list-disc list-inside ml-2 space-y-0.5">
                  <li className={formData.password.length >= 6 ? 'text-green-600 font-medium' : ''}>
                    ✓ At least 6 characters
                  </li>
                  <li className={/[A-Z]/.test(formData.password) ? 'text-green-600 font-medium' : ''}>
                    ✓ One uppercase letter
                  </li>
                  <li className={/[a-z]/.test(formData.password) ? 'text-green-600 font-medium' : ''}>
                    ✓ One lowercase letter
                  </li>
                  <li className={/[!@#$%^&*(),.?":{}|<>]/.test(formData.password) ? 'text-green-600 font-medium' : ''}>
                    ✓ One special character
                  </li>
                </ul>
              </div>
            </div>

            {/* Register Button */}
            <button
              type="submit"
              className="w-full py-3 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 transition-all duration-200 font-semibold shadow-md hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed transform hover:scale-[1.02] flex items-center justify-center gap-2"
              disabled={loading}
            >
              {loading ? (
                <>
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  Creating Account...
                </>
              ) : (
                <>
                  <FaUser size={18} />
                  Create Account
                </>
              )}
            </button>
          </form>

          {/* Social Registration Section */}
          <div className="mt-8">
            <div className="flex items-center my-6">
              <div className="flex-grow border-t border-gray-300"></div>
              <span className="flex-shrink mx-4 text-gray-500 text-sm font-medium">OR SIGN UP WITH</span>
              <div className="flex-grow border-t border-gray-300"></div>
            </div>

            <div className="space-y-3">
              {/* Google Sign Up */}
              <button
                onClick={handleGoogleRegister}
                className="w-full py-3 px-4 bg-white text-gray-700 border-2 border-gray-200 rounded-lg hover:bg-gray-50 hover:border-gray-300 transition-all duration-200 font-medium flex items-center justify-center space-x-3 disabled:opacity-50 disabled:cursor-not-allowed shadow-sm hover:shadow"
                disabled={loading}
              >
                <FaGoogle className="text-xl text-red-500" />
                <span>Sign up with Google</span>
              </button>

              {/* Facebook Sign Up */}
              <button
                onClick={handleFacebookRegister}
                className="w-full py-3 px-4 bg-white text-gray-700 border-2 border-gray-200 rounded-lg hover:bg-gray-50 hover:border-gray-300 transition-all duration-200 font-medium flex items-center justify-center space-x-3 disabled:opacity-50 disabled:cursor-not-allowed shadow-sm hover:shadow"
                disabled={loading}
              >
                <FaFacebook className="text-xl text-blue-600" />
                <span>Sign up with Facebook</span>
              </button>

              {/* Twitter Sign Up */}
              <button
                onClick={handleTwitterRegister}
                className="w-full py-3 px-4 bg-white text-gray-700 border-2 border-gray-200 rounded-lg hover:bg-gray-50 hover:border-gray-300 transition-all duration-200 font-medium flex items-center justify-center space-x-3 disabled:opacity-50 disabled:cursor-not-allowed shadow-sm hover:shadow"
                disabled={loading}
              >
                <FaTwitter className="text-xl text-sky-500" />
                <span>Sign up with Twitter</span>
              </button>

              {/* GitHub Sign Up */}
              <button
                onClick={handleGithubRegister}
                className="w-full py-3 px-4 bg-white text-gray-700 border-2 border-gray-200 rounded-lg hover:bg-gray-50 hover:border-gray-300 transition-all duration-200 font-medium flex items-center justify-center space-x-3 disabled:opacity-50 disabled:cursor-not-allowed shadow-sm hover:shadow"
                disabled={loading}
              >
                <FaGithub className="text-xl text-gray-800" />
                <span>Sign up with GitHub</span>
              </button>
            </div>
          </div>

          {/* Login Link */}
          <div className="text-center mt-8 pt-6 border-t border-gray-200">
            <p className="text-sm text-gray-600">
              Already have an account?{' '}
              <Link to="/login" className="text-emerald-600 font-semibold hover:text-emerald-700 transition-colors">
                Sign in
              </Link>
            </p>
          </div>
        </div>

        {/* Footer Info */}
        <div className="text-center mt-6 text-sm text-gray-500">
          <p>By creating an account, you agree to our</p>
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

export default RegisterForm;