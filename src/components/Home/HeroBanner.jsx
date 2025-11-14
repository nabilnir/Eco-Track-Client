// src/components/HeroBanner.jsx
import React, { useState, useEffect } from 'react';
import { FaArrowRight, FaChevronLeft, FaChevronRight } from 'react-icons/fa';

const HeroBanner = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [slidesData, setSlidesData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isAnimating, setIsAnimating] = useState(false);

  useEffect(() => {
    const fetchSlides = async () => {
      try {
        const response = await fetch(`${process.env.REACT_APP_API_URL}/api/challenges?limit=3`);
        const data = await response.json();
        
        const slides = data.slice(0, 3).map(challenge => ({
          _id: challenge._id,
          title: challenge.title,
          subtitle: challenge.description,
          imageSrc: challenge.imageUrl,
          ctaText: 'View Challenge',
          ctaLink: `/challenges/${challenge._id}`
        }));
        
        setSlidesData(slides);
      } catch (error) {
        console.error('Failed to load slides:', error);
        setSlidesData([
          {
            _id: '1',
            title: 'Join the Green Revolution',
            subtitle: 'Make a real difference in your community through sustainable living challenges',
            imageSrc: 'https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?w=1200',
            ctaText: 'Get Started',
            ctaLink: '/challenges'
          },
          {
            _id: '2',
            title: 'Track Your Impact',
            subtitle: 'Monitor your environmental progress and see the difference you make',
            imageSrc: 'https://images.unsplash.com/photo-1611273426858-450d8e3c9fce?w=1200',
            ctaText: 'Start Tracking',
            ctaLink: '/challenges'
          },
          {
            _id: '3',
            title: 'Connect with Community',
            subtitle: 'Join thousands making sustainable choices every day',
            imageSrc: 'https://images.unsplash.com/photo-1524169358666-79f22534bc6e?w=1200',
            ctaText: 'Join Now',
            ctaLink: '/register'
          }
        ]);
      } finally {
        setLoading(false);
      }
    };
    fetchSlides();
  }, []);

  useEffect(() => {
    if (slidesData.length <= 1) return;

    const interval = setInterval(() => {
      nextSlide();
    }, 3000);

    return () => clearInterval(interval);
  }, [currentSlide, slidesData.length]);

  const nextSlide = () => {
    if (isAnimating || slidesData.length === 0) return;
    setIsAnimating(true);
    setCurrentSlide((prev) => (prev + 1) % slidesData.length);
    setTimeout(() => setIsAnimating(false), 600);
  };

  const prevSlide = () => {
    if (isAnimating || slidesData.length === 0) return;
    setIsAnimating(true);
    setCurrentSlide((prev) => (prev - 1 + slidesData.length) % slidesData.length);
    setTimeout(() => setIsAnimating(false), 600);
  };

  const goToSlide = (index) => {
    if (isAnimating || index === currentSlide) return;
    setIsAnimating(true);
    setCurrentSlide(index);
    setTimeout(() => setIsAnimating(false), 600);
  };

  if (loading) {
    return (
      <div className="relative w-full h-[500px] lg:h-[70vh] flex items-center justify-center bg-gray-100">
        <div className="flex flex-col items-center gap-4">
          <div className="w-12 h-12 border-4 border-emerald-500 border-t-transparent rounded-full animate-spin"></div>
          <p className="text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }

  if (!slidesData.length) {
    return <div className="text-center py-12">No slides found</div>;
  }

  return (
    <div className="relative w-full h-[500px] lg:h-[70vh] overflow-hidden shadow-lg">
      {/* Slides */}
      <div className="relative w-full h-full">
        {slidesData.map((slide, index) => (
          <div
            key={slide._id}
            className={`absolute inset-0 w-full h-full bg-cover bg-center transition-all duration-700 ease-in-out ${
              index === currentSlide 
                ? 'opacity-100 scale-100 z-10' 
                : 'opacity-0 scale-110 z-0'
            }`}
            style={{ backgroundImage: `url(${slide.imageSrc})` }}
          >
            <div className="absolute inset-0 bg-gradient-to-r from-black/50 to-black/30 flex items-center">
              <div className="max-w-7xl mx-auto px-6 lg:px-8 w-full">
                <div className="max-w-3xl">
                  <h1 className="text-white text-4xl sm:text-5xl lg:text-6xl font-extrabold leading-tight tracking-wide mb-4 drop-shadow-lg animate-fade-in-up">
                    {slide.title}
                  </h1>
                  <p className="text-white text-lg sm:text-xl mb-8 font-light drop-shadow-md animate-fade-in-up animation-delay-200">
                    {slide.subtitle}
                  </p>
                  <a 
                    href={slide.ctaLink} 
                    className="inline-flex items-center space-x-2 bg-emerald-500 hover:bg-emerald-600 text-white px-6 py-3 rounded-lg text-base font-semibold transition-all duration-300 transform hover:scale-105 shadow-lg animate-fade-in-up animation-delay-400"
                  >
                    <span>{slide.ctaText}</span>
                    <FaArrowRight />
                  </a>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Navigation Arrows */}
      {slidesData.length > 1 && (
        <>
          <button 
            onClick={prevSlide}
            disabled={isAnimating}
            className="absolute left-4 top-1/2 -translate-y-1/2 z-20 bg-white/20 hover:bg-white/30 backdrop-blur-sm text-white p-3 rounded-full transition-all duration-300 hover:scale-110 disabled:opacity-50"
            aria-label="Previous slide"
          >
            <FaChevronLeft size={20} />
          </button>
          <button 
            onClick={nextSlide}
            disabled={isAnimating}
            className="absolute right-4 top-1/2 -translate-y-1/2 z-20 bg-white/20 hover:bg-white/30 backdrop-blur-sm text-white p-3 rounded-full transition-all duration-300 hover:scale-110 disabled:opacity-50"
            aria-label="Next slide"
          >
            <FaChevronRight size={20} />
          </button>
        </>
      )}

      {/* Dots Navigation */}
      {slidesData.length > 1 && (
        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-20 flex items-center gap-3">
          {slidesData.map((_, index) => (
            <button
              key={index}
              onClick={() => goToSlide(index)}
              disabled={isAnimating}
              className={`transition-all duration-300 rounded-full ${
                index === currentSlide 
                  ? 'w-10 h-3 bg-emerald-500' 
                  : 'w-3 h-3 bg-white/50 hover:bg-white/80'
              }`}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default HeroBanner;