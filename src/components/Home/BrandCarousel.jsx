import React, { useRef } from 'react';
import { useGSAP } from '@gsap/react';
import { gsap } from 'gsap';

const BrandCarousel = () => {
  const carouselRef = useRef(null);
  const trackRef = useRef(null);

  // Real eco-friendly brands and organizations
  const brands = [
    {
      name: 'WWF',
      logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/2/2f/WWF_logo.svg/200px-WWF_logo.svg.png',
      category: 'Wildlife Conservation'
    },
    {
      name: 'Greenpeace',
      logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/f/f2/Greenpeace_logo.svg/200px-Greenpeace_logo.svg.png',
      category: 'Environmental Activism'
    },
    {
      name: 'UN Environment',
      logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/e/ee/UN_emblem_blue.svg/150px-UN_emblem_blue.svg.png',
      category: 'Global Sustainability'
    },
    {
      name: 'Ocean Conservancy',
      logo: 'https://oceanconservancy.org/wp-content/uploads/2021/04/OC_logo_horizontal_2color_rgb.png',
      category: 'Marine Protection'
    },
    {
      name: '350.org',
      logo: 'https://350.org/wp-content/themes/three-fifty-timber/static/images/350-logo.svg',
      category: 'Climate Action'
    },
    {
      name: 'Sierra Club',
      logo: 'https://upload.wikimedia.org/wikipedia/en/thumb/6/6b/Sierra_Club_logo.svg/200px-Sierra_Club_logo.svg.png',
      category: 'Conservation'
    },
    {
      name: 'The Nature Conservancy',
      logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/3/33/The_Nature_Conservancy_logo.svg/200px-The_Nature_Conservancy_logo.svg.png',
      category: 'Nature Protection'
    },
    {
      name: 'Earth Day Network',
      logo: 'https://www.earthday.org/wp-content/uploads/2020/04/earth-day-logo.png',
      category: 'Environmental Education'
    },
    // Duplicate for seamless loop
    {
      name: 'WWF',
      logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/2/2f/WWF_logo.svg/200px-WWF_logo.svg.png',
      category: 'Wildlife Conservation'
    },
    {
      name: 'Greenpeace',
      logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/f/f2/Greenpeace_logo.svg/200px-Greenpeace_logo.svg.png',
      category: 'Environmental Activism'
    },
    {
      name: 'UN Environment',
      logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/e/ee/UN_emblem_blue.svg/150px-UN_emblem_blue.svg.png',
      category: 'Global Sustainability'
    },
    {
      name: 'Ocean Conservancy',
      logo: 'https://oceanconservancy.org/wp-content/uploads/2021/04/OC_logo_horizontal_2color_rgb.png',
      category: 'Marine Protection'
    },
  ];

  useGSAP(() => {
    if (!trackRef.current) return;

    const track = trackRef.current;
    const brandElements = track.children;
    const brandWidth = brandElements[0]?.offsetWidth || 220;
    const gap = 32; // 8 * 4 = 32px gap
    const totalWidth = (brandWidth + gap) * brandElements.length;

    gsap.set(track, { x: 0 });

    const animation = gsap.to(track, {
      x: -totalWidth / 2,
      duration: 40,
      ease: "none",
      repeat: -1,
      modifiers: {
        x: gsap.utils.unitize(x => parseFloat(x) % (totalWidth / 2))
      }
    });

    const handleMouseEnter = () => animation.pause();
    const handleMouseLeave = () => animation.play();

    const carousel = carouselRef.current;
    if (carousel) {
      carousel.addEventListener('mouseenter', handleMouseEnter);
      carousel.addEventListener('mouseleave', handleMouseLeave);
    }

    gsap.from(carouselRef.current, {
      opacity: 0,
      y: 40,
      duration: 1,
      ease: "power3.out"
    });

    gsap.from(brandElements, {
      opacity: 0,
      scale: 0.9,
      y: 30,
      duration: 0.8,
      stagger: 0.08,
      ease: "power3.out",
      delay: 0.2
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
    <section className="py-20 md:py-28 bg-white dark:bg-gray-900 transition-colors duration-300 overflow-hidden">
      <div className="max-w-7xl mx-auto px-6">

        {/* Section Header - Professional Typography */}
        <div className="text-center mb-16 max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-emerald-50 dark:bg-emerald-900/30 rounded-full mb-6">
            <div className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse"></div>
            <span className="text-sm font-semibold text-emerald-700 dark:text-emerald-300 tracking-wide uppercase">
              Our Partners
            </span>
          </div>

          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-6 leading-tight">
            Trusted by Leading
            <span className="block text-transparent bg-clip-text bg-gradient-to-r from-emerald-600 to-blue-600 dark:from-emerald-400 dark:to-blue-400">
              Environmental Organizations
            </span>
          </h2>

          <p className="text-lg text-gray-600 dark:text-gray-300 leading-relaxed">
            Collaborating with world-class organizations to drive meaningful environmental impact
          </p>
        </div>

        {/* Carousel Container - Clean & Spacious */}
        <div
          ref={carouselRef}
          className="relative"
        >
          {/* Gradient Overlays for Depth */}
          <div className="absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-white dark:from-gray-900 to-transparent z-10 pointer-events-none"></div>
          <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-white dark:from-gray-900 to-transparent z-10 pointer-events-none"></div>

          <div className="overflow-hidden py-8">
            <div
              ref={trackRef}
              className="flex items-center gap-8 will-change-transform"
              style={{
                width: 'fit-content',
                transform: 'translate3d(0, 0, 0)'
              }}
            >
              {brands.map((brand, index) => (
                <div
                  key={`${brand.name}-${index}`}
                  className="group shrink-0 relative"
                  style={{ width: '220px' }}
                >
                  {/* Card with Modern Design */}
                  <div className="relative bg-gradient-to-br from-gray-50 to-white dark:from-gray-800 dark:to-gray-800/50 rounded-2xl p-8 border border-gray-200/50 dark:border-gray-700/50 shadow-sm hover:shadow-xl transition-all duration-500 hover:-translate-y-2 backdrop-blur-sm">

                    {/* Logo Container - Optimized for Visibility */}
                    <div className="mb-6 h-20 flex items-center justify-center bg-white dark:bg-gray-900/50 rounded-xl p-4 shadow-inner">
                      <img
                        src={brand.logo}
                        alt={`${brand.name} logo`}
                        className="max-h-16 max-w-[160px] object-contain transition-transform duration-500 group-hover:scale-110"
                        onError={(e) => {
                          e.target.style.display = 'none';
                          e.target.nextElementSibling.style.display = 'flex';
                        }}
                      />
                      {/* Fallback */}
                      <div className="hidden items-center justify-center text-xl font-bold text-emerald-600 dark:text-emerald-400">
                        {brand.name}
                      </div>
                    </div>

                    {/* Text Content - High Contrast */}
                    <div className="text-center space-y-2">
                      <h3 className="font-bold text-gray-900 dark:text-white text-lg group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors duration-300">
                        {brand.name}
                      </h3>
                      <p className="text-sm text-gray-600 dark:text-gray-300 font-medium leading-relaxed">
                        {brand.category}
                      </p>
                    </div>

                    {/* Hover Accent Line */}
                    <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-emerald-500 to-blue-500 rounded-b-2xl transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left"></div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Trust Indicators */}
        <div className="flex items-center justify-center gap-8 mt-12 text-sm text-gray-500 dark:text-gray-400">
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 bg-emerald-500 rounded-full"></div>
            <span>8+ Global Partners</span>
          </div>
          <div className="hidden sm:block w-px h-4 bg-gray-300 dark:bg-gray-600"></div>
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
            <span>Verified Organizations</span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default BrandCarousel;
