import React from 'react';
import { useNavigate, Link } from 'react-router';
import error from '/error.png'

const Error = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
      <div className="text-center">
        
        <h2 className="text-3xl font-bold text-gray-900 mb-4">Page Not Found</h2>
        <img src={error} alt=""  className='justify-center mx-auto sm:w-10/12 lg:w-[60%]'/>
        <p className="text-gray-600 mb-8">
          The page you're looking for doesn't exist or has been moved.
        </p>
        <div className="flex gap-4 justify-center">
          <button
            onClick={() => navigate(-1)}
            className="bg-gray-200 hover:bg-gray-300 text-gray-700 px-6 py-3 rounded-lg font-semibold transition-colors"
          >
            Go Back
          </button>
          <Link
            to="/"
            className="bg-emerald-500 hover:bg-emerald-600 text-white px-6 py-3 rounded-lg font-semibold transition-colors"
          >
            Go Home
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Error;