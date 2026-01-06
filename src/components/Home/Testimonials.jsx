import React from 'react';

const Testimonials = () => {
  return (
    <div className="py-20 px-5 bg-dark-bg">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="heading-2 mb-4 text-text-light">What Our Users Say</h2>
          <p className="text-large text-text-muted">
            Join thousands of satisfied eco-warriors making a difference
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <div className="bg-gray-800 p-6 rounded-lg">
            <div className="text-6xl mb-4 text-center">👩‍🌾</div>
            <div className="flex justify-center mb-4">
              <span className="text-yellow-400 text-xl">★★★★★</span>
            </div>
            <blockquote className="text-white/90 mb-6 italic text-center">
              "EcoTrack has completely changed how I approach sustainability. I love seeing my impact grow!"
            </blockquote>
            <div className="text-center">
              <div className="font-semibold text-white text-lg mb-1">Sarah Johnson</div>
              <div className="text-gray-400 text-sm">Environmental Enthusiast</div>
            </div>
          </div>

          <div className="bg-gray-800 p-6 rounded-lg">
            <div className="text-6xl mb-4 text-center">👨‍💼</div>
            <div className="flex justify-center mb-4">
              <span className="text-yellow-400 text-xl">★★★★★</span>
            </div>
            <blockquote className="text-white/90 mb-6 italic text-center">
              "The challenges feature keeps our community engaged and motivated to make a difference."
            </blockquote>
            <div className="text-center">
              <div className="font-semibold text-white text-lg mb-1">Mike Chen</div>
              <div className="text-gray-400 text-sm">Community Leader</div>
            </div>
          </div>

          <div className="bg-gray-800 p-6 rounded-lg">
            <div className="text-6xl mb-4 text-center">👩‍🎓</div>
            <div className="flex justify-center mb-4">
              <span className="text-yellow-400 text-xl">★★★★★</span>
            </div>
            <blockquote className="text-white/90 mb-6 italic text-center">
              "Perfect for tracking my environmental footprint and learning new ways to be eco-friendly."
            </blockquote>
            <div className="text-center">
              <div className="font-semibold text-white text-lg mb-1">Emma Davis</div>
              <div className="text-gray-400 text-sm">Student</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Testimonials;
