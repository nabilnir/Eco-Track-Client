import React, { useState, useEffect } from 'react';
import { FaArrowRight, FaChevronLeft, FaChevronRight } from 'react-icons/fa';
import AOS from 'aos';
import 'aos/dist/aos.css';

// Fallback slides data
const defaultSlides = [
  {
    _id: '1',
    title: 'Join the Eco Revolution',
    subtitle: 'Track your environmental impact and make a real difference',
    imageSrc: 'https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?q=80&w=2574&auto=format&fit=crop',
    ctaText: 'Get Started',
    ctaLink: '/register'
  },
  {
    _id: '2',
    title: 'Take on Eco Challenges',
    subtitle: 'Compete with friends and earn rewards for sustainable living',
    imageSrc: 'https://images.unsplash.com/photo-1473496169904-658ba7c44d8a?q=80&w=2670&auto=format&fit=crop',
    ctaText: 'View Challenges',
    ctaLink: '/challenges'
  },
  {
    _id: '3',
    title: 'Make Every Action Count',
    subtitle: 'Small changes lead to big environmental impact',
    imageSrc: 'https://images.unsplash.com/photo-1466611653911-95081537e5b7?q=80&w=2670&auto=format&fit=crop',
    ctaText: 'Learn More',
    ctaLink: '/about'
  }
];

const HeroBanner = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [slidesData, setSlidesData] = useState(defaultSlides);
  const [loading, setLoading] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);

  useEffect(() => {
    AOS.init({
      duration: 1000,
      once: false,
      offset: 50
    });

    // Try to fetch slides from API, but use fallback if it fails
    const fetchSlides = async () => {
      try {
        const response = await fetch(`${import.meta.env.VITE_API_URL}/api/slides`);

        if (response.ok) {
          const data = await response.json();
          if (data && Array.isArray(data) && data.length > 0) {
            setSlidesData(data);
          }
        }
      } catch (error) {
        console.log('Using default slides');
        // Keep using defaultSlides
      }
    };

    fetchSlides();
  }, []);

  useEffect(() => {
    if (slidesData.length <= 1) return;

    const interval = setInterval(() => {
      nextSlide();
    }, 5000);

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

  return (
    <div className="relative w-full h-[500px] lg:h-[70vh] overflow-hidden shadow-lg">
      {/* Slides */}
      <div className="relative w-full h-full">
        {slidesData.map((slide, index) => (
          <div
            key={slide._id}
            className={`absolute inset-0 w-full h-full bg-cover bg-center transition-all duration-700 ease-in-out ${index === currentSlide
                ? 'opacity-100 scale-100 z-10'
                : 'opacity-0 scale-110 z-0'
              }`}
            style={{ backgroundImage: `url(${slide.imageSrc || slide.imageUrl})` }}
          >
            <div className="absolute inset-0 bg-gradient-to-r from-black/60 to-black/30 flex items-center">
              <div className="max-w-7xl mx-auto px-6 lg:px-8 w-full">
                <div className="max-w-3xl">
                  <h1 className="text-white text-4xl sm:text-5xl lg:text-6xl font-extrabold leading-tight tracking-wide mb-4 drop-shadow-lg animate-fade-in-up">
                    {slide.title}
                  </h1>
                  <p className="text-white text-lg sm:text-xl mb-8 font-light drop-shadow-md animate-fade-in-up animation-delay-200">
                    {slide.subtitle || slide.description}
                  </p>
                  <a
                    href={slide.ctaLink || '/challenges'}
                    className="btn-primary btn-lg inline-flex items-center gap-2 transform hover:scale-105 shadow-lg animate-fade-in-up animation-delay-400"
                  >
                    <span>{slide.ctaText || 'View More'}</span>
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
            className="absolute left-4 top-1/2 -translate-y-1/2 z-20 bg-white/20 hover:bg-white/30 backdrop-blur-sm text-white p-3 rounded-full transition-all duration-300 hover:scale-110 disabled:opacity-50 disabled:cursor-not-allowed"
            aria-label="Previous slide"
          >
            <FaChevronLeft size={20} />
          </button>
          <button
            onClick={nextSlide}
            disabled={isAnimating}
            className="absolute right-4 top-1/2 -translate-y-1/2 z-20 bg-white/20 hover:bg-white/30 backdrop-blur-sm text-white p-3 rounded-full transition-all duration-300 hover:scale-110 disabled:opacity-50 disabled:cursor-not-allowed"
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
              className={`transition-all duration-300 rounded-full ${index === currentSlide
                  ? 'w-10 h-3 bg-emerald-500'
                  : 'w-3 h-3 bg-white/50 hover:bg-white/80'
                } disabled:cursor-not-allowed`}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default HeroBanner;