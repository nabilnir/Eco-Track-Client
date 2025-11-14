import React from 'react';
import { FaBolt, FaLeaf, FaRecycle, FaUsers } from 'react-icons/fa';

const WhyGoGreen = () => {
    return (
        <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Why Go Green?</h2>
            <p className="text-xl text-gray-600">The benefits of sustainable living</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="text-center p-6 bg-emerald-50 rounded-xl hover:shadow-lg transition-shadow">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-emerald-500 rounded-full mb-4">
                <FaLeaf className="text-3xl text-white" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Protect Environment</h3>
              <p className="text-gray-600">Reduce your carbon footprint and preserve nature for future generations</p>
            </div>

            <div className="text-center p-6 bg-blue-50 rounded-xl hover:shadow-lg transition-shadow">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-500 rounded-full mb-4">
                <FaBolt className="text-3xl text-white" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Save Money</h3>
              <p className="text-gray-600">Lower energy bills and reduce waste through sustainable practices</p>
            </div>

            <div className="text-center p-6 bg-purple-50 rounded-xl hover:shadow-lg transition-shadow">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-purple-500 rounded-full mb-4">
                <FaUsers className="text-3xl text-white" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Build Community</h3>
              <p className="text-gray-600">Connect with like-minded individuals working towards common goals</p>
            </div>

            <div className="text-center p-6 bg-yellow-50 rounded-xl hover:shadow-lg transition-shadow">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-yellow-500 rounded-full mb-4">
                <FaRecycle className="text-3xl text-white" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Healthier Lifestyle</h3>
              <p className="text-gray-600">Improve your health with eco-friendly choices and natural living</p>
            </div>
          </div>
        </div>
      </section>
    );
};

export default WhyGoGreen;