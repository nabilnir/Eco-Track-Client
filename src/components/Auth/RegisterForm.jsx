
import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router';
import toast from 'react-hot-toast';
import { FaGoogle, FaEye, FaEyeSlash } from 'react-icons/fa';
import useAuth from '../../Hooks/useAuth';

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
    }
    
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Email is invalid';
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
      // Create user with email and password
      await register(formData.email, formData.password);
      
      // Update user profile with name and photo
      await updateUserProfile(formData.name, formData.photoURL);
      
      toast.success('Registration successful! Welcome to EcoTrack!');
      navigate(from, { replace: true });
    } catch (error) {
      console.error('Registration failed:', error.message);
      
      // Handle specific Firebase errors
      if (error.code === 'auth/email-already-in-use') {
        toast.error('This email is already registered. Please login instead.');
      } else if (error.code === 'auth/weak-password') {
        toast.error('Password is too weak. Please choose a stronger password.');
      } else {
        toast.error(error.message || 'Registration failed. Please try again.');
      }
    } finally {
      setLoading(false);
    }
  };

  // Handle Google Sign In
  const handleGoogleRegister = async () => {
    setLoading(true);
    try {
      await googleSignIn();
      toast.success('Signed up with Google successfully!');
      navigate(from, { replace: true });
    } catch (error) {
      console.error('Google Sign In failed:', error.message);
      toast.error(error.message || 'Google sign up failed.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full max-w-md mx-auto p-6 sm:p-8 my-10 bg-white rounded-xl shadow-lg">
      <h2 className="text-3xl font-bold text-center text-gray-800 mb-8">
        Join EcoTrack
      </h2>
      
      <form onSubmit={handleRegister} className="space-y-4">
        {/* Name Field */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2" htmlFor="name">
            Full Name
          </label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            className="w-full p-3 rounded-lg border border-gray-300 bg-white text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-400 focus:border-transparent"
            placeholder="John Doe"
          />
          {errors.name && <p className="mt-1 text-sm text-red-600">{errors.name}</p>}
        </div>

        {/* Email Field */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2" htmlFor="email">
            Email
          </label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className="w-full p-3 rounded-lg border border-gray-300 bg-white text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-400 focus:border-transparent"
            placeholder="your@email.com"
          />
          {errors.email && <p className="mt-1 text-sm text-red-600">{errors.email}</p>}
        </div>

        {/* Photo URL Field */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2" htmlFor="photoURL">
            Photo URL
          </label>
          <input
            type="url"
            id="photoURL"
            name="photoURL"
            value={formData.photoURL}
            onChange={handleChange}
            className="w-full p-3 rounded-lg border border-gray-300 bg-white text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-400 focus:border-transparent"
            placeholder="https://example.com/photo.jpg"
          />
          {errors.photoURL && <p className="mt-1 text-sm text-red-600">{errors.photoURL}</p>}
        </div>

        {/* Password Field */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2" htmlFor="password">
            Password
          </label>
          <div className="relative">
            <input
              type={showPassword ? 'text' : 'password'}
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              className="w-full p-3 pr-12 rounded-lg border border-gray-300 bg-white text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-400 focus:border-transparent"
              placeholder="••••••••"
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700 transition duration-200"
              aria-label={showPassword ? 'Hide password' : 'Show password'}
            >
              {showPassword ? <FaEyeSlash size={20} /> : <FaEye size={20} />}
            </button>
          </div>
          {errors.password && <p className="mt-1 text-sm text-red-600">{errors.password}</p>}
          
          {/* Password Requirements */}
          <div className="mt-2 text-xs text-gray-600 space-y-1">
            <p>Password must contain:</p>
            <ul className="list-disc list-inside ml-2 space-y-0.5">
              <li className={formData.password.length >= 6 ? 'text-green-600' : ''}>
                At least 6 characters
              </li>
              <li className={/[A-Z]/.test(formData.password) ? 'text-green-600' : ''}>
                One uppercase letter
              </li>
              <li className={/[a-z]/.test(formData.password) ? 'text-green-600' : ''}>
                One lowercase letter
              </li>
              <li className={/[!@#$%^&*(),.?":{}|<>]/.test(formData.password) ? 'text-green-600' : ''}>
                One special character
              </li>
            </ul>
          </div>
        </div>

        {/* Register Button */}
        <button
          type="submit"
          className="w-full py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition duration-200 font-semibold shadow-md disabled:opacity-50 disabled:cursor-not-allowed"
          disabled={loading}
        >
          {loading ? 'Registering...' : 'Register'}
        </button>
      </form>

      {/* Separator */}
      <div className="flex items-center my-6">
        <div className="flex-grow border-t border-gray-300"></div>
        <span className="flex-shrink mx-4 text-gray-500 text-sm">OR</span>
        <div className="flex-grow border-t border-gray-300"></div>
      </div>

      {/* Google Sign Up Button */}
      <button
        onClick={handleGoogleRegister}
        className="w-full py-3 px-4 text-gray-700 border border-gray-300 rounded-lg hover:bg-gray-50 transition duration-200 font-medium flex items-center justify-center space-x-2 disabled:opacity-50 disabled:cursor-not-allowed"
        disabled={loading}
      >
        <FaGoogle className="text-xl" />
        <span>Sign Up with Google</span>
      </button>

      {/* Links */}
      <p className="text-center text-sm mt-6 text-gray-600">
        Already have an account?{' '}
        <Link to="/login" className="text-green-600 font-medium hover:text-green-700 transition duration-200">
          Login
        </Link>
      </p>
    </div>
  );
};

export default RegisterForm;