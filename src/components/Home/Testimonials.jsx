import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiChevronLeft, FiChevronRight, FiMessageSquare, FiStar } from 'react-icons/fi';

const testimonialsData = [
  {
    id: 1,
    review: "EcoTrack has completely changed how I approach sustainability. I love seeing my impact grow!",
    userName: "Sarah Johnson",
    role: "Environmental Enthusiast",
    ratings: 5,
    user_photoURL: "https://randomuser.me/api/portraits/women/44.jpg",
  },
  {
    id: 2,
    review: "The challenges feature keeps our community engaged and motivated to make a difference.",
    userName: "Mike Chen",
    role: "Community Leader",
    ratings: 5,
    user_photoURL: "https://randomuser.me/api/portraits/men/32.jpg",
  },
  {
    id: 3,
    review: "Perfect for tracking my environmental footprint and learning new ways to be eco-friendly.",
    userName: "Emma Davis",
    role: "Student",
    ratings: 5,
    user_photoURL: "https://randomuser.me/api/portraits/women/68.jpg",
  },
  {
    id: 4,
    review: "The activity tracking is intuitive and the rewards system keeps me motivated every day!",
    userName: "James Wilson",
    role: "Sustainability Advocate",
    ratings: 4.5,
    user_photoURL: "https://randomuser.me/api/portraits/men/22.jpg",
  },
];

const Testimonials = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(0);

  // Auto scroll effect
  useEffect(() => {
    const timer = setInterval(() => {
      handleNext();
    }, 5000); // Change review every 5 seconds

    return () => clearInterval(timer);
  }, [currentIndex]);

  const handleNext = () => {
    setDirection(1);
    setCurrentIndex((prev) => (prev + 1) % testimonialsData.length);
  };

  const handlePrev = () => {
    setDirection(-1);
    setCurrentIndex((prev) => (prev - 1 + testimonialsData.length) % testimonialsData.length);
  };

  const getVisibleTestimonials = () => {
    const reviews = [];
    for (let i = -1; i <= 1; i++) {
      const index = (currentIndex + i + testimonialsData.length) % testimonialsData.length;
      reviews.push({ ...testimonialsData[index], position: i });
    }
    return reviews;
  };

  const slideVariants = {
    center: {
      x: 0,
      opacity: 1,
      scale: 1,
      zIndex: 5,
      filter: 'blur(0px)',
    },
    left: {
      x: '-60%',
      opacity: 0.3,
      scale: 0.85,
      zIndex: 1,
      filter: 'blur(2px)',
    },
    right: {
      x: '60%',
      opacity: 0.3,
      scale: 0.85,
      zIndex: 1,
      filter: 'blur(2px)',
    },
  };

  return (
    <section className="py-16 md:py-32 bg-gray-50 dark:bg-gray-900 px-6 overflow-hidden transition-colors duration-300">
      <div className="max-w-7xl mx-auto">

        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="inline-block px-4 py-1 bg-emerald-100 dark:bg-emerald-900 text-emerald-700 dark:text-emerald-300 rounded-full text-sm font-medium mb-3">
            User Testimonials
          </span>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 dark:text-white leading-tight">
            What Our Users Say
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-400 mt-4">
            Join thousands of satisfied eco-warriors making a difference
          </p>
        </div>

        {/* Testimonials Carousel */}
        <div className="relative h-[400px] flex items-center justify-center mb-8">
          <AnimatePresence initial={false} custom={direction}>
            {getVisibleTestimonials().map((review) => (
              <motion.div
                key={review.id}
                custom={direction}
                variants={slideVariants}
                initial={review.position === 0 ? 'center' : review.position === -1 ? 'left' : 'right'}
                animate={review.position === 0 ? 'center' : review.position === -1 ? 'left' : 'right'}
                transition={{
                  x: { type: 'spring', stiffness: 300, damping: 30 },
                  opacity: { duration: 0.3 },
                  scale: { duration: 0.3 },
                  filter: { duration: 0.3 },
                }}
                className="absolute w-full max-w-xl cursor-grab active:cursor-grabbing"
              >
                <div className="bg-white dark:bg-gray-800 rounded-3xl p-8 shadow-xl mx-4 border-t-4 border-emerald-500">

                  {/* Quote Icon */}
                  <FiMessageSquare className="w-12 h-12 text-emerald-500 mb-4 rotate-180" />

                  {/* Review Text */}
                  <p className="text-gray-700 dark:text-gray-300 text-base md:text-lg mb-6 leading-relaxed">
                    {review.review}
                  </p>

                  {/* Divider */}
                  <div className="border-t border-dashed border-gray-200 dark:border-gray-700 mb-6"></div>

                  {/* User Info */}
                  <div className="flex items-center gap-4">
                    <img
                      src={review.user_photoURL}
                      alt={review.userName}
                      className="w-14 h-14 rounded-full object-cover bg-gray-200 shadow-md"
                    />
                    <div>
                      <h4 className="font-bold text-gray-900 dark:text-white text-lg">
                        {review.userName}
                      </h4>
                      <p className="text-sm text-gray-500 dark:text-gray-400 mb-1">{review.role}</p>
                      <div className="flex items-center gap-1">
                        {[...Array(5)].map((_, i) => (
                          <FiStar
                            key={i}
                            className={`text-lg ${i < Math.floor(review.ratings)
                                ? 'text-yellow-500 fill-yellow-500'
                                : 'text-gray-300 dark:text-gray-600'
                              }`}
                            size={18}
                          />
                        ))}
                        <span className="text-sm text-gray-600 dark:text-gray-400 ml-2">
                          {review.ratings}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        {/* Navigation Controls */}
        <div className="flex items-center justify-center gap-4">
          {/* Previous Button */}
          <button
            onClick={handlePrev}
            className="w-12 h-12 rounded-full bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 flex items-center justify-center hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors shadow-md"
            aria-label="Previous review"
          >
            <FiChevronLeft className="w-6 h-6 text-gray-900 dark:text-white" />
          </button>

          {/* Dots Indicator */}
          <div className="flex gap-2">
            {testimonialsData.map((_, index) => (
              <button
                key={index}
                onClick={() => {
                  setDirection(index > currentIndex ? 1 : -1);
                  setCurrentIndex(index);
                }}
                className={`h-2.5 rounded-full transition-all duration-300 ${index === currentIndex
                    ? 'bg-emerald-500 w-8'
                    : 'bg-gray-300 dark:bg-gray-600 w-2.5 hover:bg-gray-400 dark:hover:bg-gray-500'
                  }`}
                aria-label={`Go to testimonial ${index + 1}`}
              />
            ))}
          </div>

          {/* Next Button */}
          <button
            onClick={handleNext}
            className="w-12 h-12 rounded-full bg-gradient-to-br from-emerald-500 to-emerald-600 flex items-center justify-center hover:shadow-lg transition-colors shadow-md"
            aria-label="Next review"
          >
            <FiChevronRight className="w-6 h-6 text-white" />
          </button>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
