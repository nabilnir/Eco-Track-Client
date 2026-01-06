import React, { useRef } from 'react';
import { useGSAP } from '@gsap/react';
import { gsap } from 'gsap';

const BrandCarousel = () => {
  const carouselRef = useRef(null);
  const trackRef = useRef(null);

  const brands = [
    { name: 'Green Peace', logo: '🌿', category: 'Environmental' },
    { name: 'WWF', logo: '🐼', category: 'Wildlife' },
    { name: 'UN Environment', logo: '🌍', category: 'Global' },
    { name: 'Sierra Club', logo: '🏔️', category: 'Conservation' },
    { name: 'Ocean Conservancy', logo: '🌊', category: 'Marine' },
    { name: '350.org', logo: '🌱', category: 'Climate' },
    { name: 'Greenpeace', logo: '🌿', category: 'Environmental' },
    { name: 'WWF', logo: '🐼', category: 'Wildlife' },
    { name: 'UN Environment', logo: '🌍', category: 'Global' },
    { name: 'Sierra Club', logo: '🏔️', category: 'Conservation' },
    { name: 'Ocean Conservancy', logo: '🌊', category: 'Marine' },
    { name: '350.org', logo: '🌱', category: 'Climate' },
  ];

  useGSAP(() => {
    if (!trackRef.current) return;

    const track = trackRef.current;
    const brands = track.children;
    const brandWidth = brands[0]?.offsetWidth || 200;
    const totalWidth = brandWidth * brands.length;
    
    // Set initial position
    gsap.set(track, { x: 0 });

    // Create infinite scrolling animation
    const animation = gsap.to(track, {
      x: -totalWidth / 2, // Scroll halfway (since we duplicated brands)
      duration: 30,
      ease: "none",
      repeat: -1,
      modifiers: {
        x: gsap.utils.unitize(x => parseFloat(x) % (totalWidth / 2))
      }
    });

    // Pause on hover
    const handleMouseEnter = () => animation.pause();
    const handleMouseLeave = () => animation.play();

    const carousel = carouselRef.current;
    if (carousel) {
      carousel.addEventListener('mouseenter', handleMouseEnter);
      carousel.addEventListener('mouseleave', handleMouseLeave);
    }

    // Fade in animation
    gsap.from(carouselRef.current, {
      opacity: 0,
      y: 30,
      duration: 1,
      ease: "power2.out"
    });

    // Stagger animation for brand cards
    gsap.from(brands, {
      opacity: 0,
      scale: 0.8,
      y: 20,
      duration: 0.6,
      stagger: 0.05,
      ease: "back.out(1.7)",
      delay: 0.3
    });

    return () => {
      if (carousel) {
        carousel.removeEventListener('mouseenter', handleMouseEnter);
        carousel.removeEventListener('mouseleave', handleMouseLeave);
      }
      animation.kill();
    };
  }, []);

  return (
    <div className="py-16 px-5 bg-linear-to-r from-gray-50 to-gray-100">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="heading-2 mb-4 text-gray-900">Trusted by Leading Organizations</h2>
          <p className="text-large text-gray-600">
            Partnering with world-class environmental organizations to create a sustainable future
          </p>
        </div>

        <div 
          ref={carouselRef}
          className="relative overflow-hidden"
          style={{ padding: '20px 0' }}
        >
          <div 
            ref={trackRef}
            className="flex items-center gap-8 will-change-transform"
            style={{ 
              width: 'fit-content',
              transform: 'translate3d(0, 0, 0)' // Hardware acceleration
            }}
          >
            {brands.map((brand, index) => (
              <div
                key={`${brand.name}-${index}`}
                className="shrink-0 bg-white rounded-xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 hover:-translate-y-1 cursor-pointer group"
                style={{ width: '200px', height: '120px' }}
              >
                <div className="flex flex-col items-center justify-center h-full text-center">
                  <div className="text-4xl mb-3 group-hover:scale-110 transition-transform duration-300">
                    {brand.logo}
                  </div>
                  <h3 className="font-semibold text-gray-900 text-sm mb-1 group-hover:text-green-600 transition-colors duration-300">
                    {brand.name}
                  </h3>
                  <p className="text-xs text-gray-500 group-hover:text-gray-700 transition-colors duration-300">
                    {brand.category}
                  </p>
                </div>
                
                {/* Subtle gradient overlay on hover */}
                <div className="absolute inset-0 bg-linear-to-br from-green-50 to-blue-50 opacity-0 group-hover:opacity-100 rounded-xl transition-opacity duration-300 pointer-events-none" />
              </div>
            ))}
          </div>
        </div>

        {/* Decorative elements */}
        <div className="flex justify-center mt-8 gap-2">
          <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></div>
          <div className="w-2 h-2 rounded-full bg-blue-500 animate-pulse" style={{ animationDelay: '0.2s' }}></div>
          <div className="w-2 h-2 rounded-full bg-purple-500 animate-pulse" style={{ animationDelay: '0.4s' }}></div>
        </div>
      </div>
    </div>
  );
};

export default BrandCarousel;
