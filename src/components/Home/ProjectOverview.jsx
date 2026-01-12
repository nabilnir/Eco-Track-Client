import React from 'react';
import { Link } from 'react-router';

const ProjectOverview = () => {
    const sections = [
        {
            title: "Sustainable Transport",
            slug: "sustainable-transport",
            description: "Drive the Change. Embrace electric vehicles and public transit to drastically reduce your carbon footprint. Every mile counts toward a cleaner sky. Our platform helps you track and optimize your daily commute for maximum environmental impact.",
            image: "/assets/transport.png",
            reverse: false
        },
        {
            title: "Renewable Energy",
            slug: "renewable-energy",
            description: "Powering the Future. Switch to solar and wind energy to protect our planet. Sustainable energy is not just a choice; it's our responsibility. We provide tools to monitor your energy transition and celebrate your shift to clean power sources.",
            image: "/assets/energy.png",
            reverse: true
        },
        {
            title: "Waste Reduction",
            slug: "waste-reduction",
            description: "Zero Waste Living. Small changes in your daily routine can lead to a massive reduction in landfill waste. Start your journey with eco-friendly alternatives today. Join thousands of eco-warriors in our community committed to a cleaner, waste-free world.",
            image: "/assets/waste.png",
            reverse: false
        }
    ];

    return (
        <section className="py-20 bg-white dark:bg-gray-900 transition-colors duration-300">
            <div className="max-w-7xl mx-auto px-5">
                <div className="text-center mb-16">
                    <h2 className="heading-serif text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">
                        Our Journey & Impact
                    </h2>
                    <div className="w-24 h-1.5 bg-green-500 mx-auto rounded-full mb-6"></div>
                    <p className="text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
                        At EcoTrack, we believe every action counts. Explore the core areas where we help our community make a real difference for our planet.
                    </p>
                </div>

                <div className="space-y-24">
                    {sections.map((section, index) => (
                        <div
                            key={index}
                            className={`flex flex-col ${section.reverse ? 'md:flex-row-reverse' : 'md:flex-row'} items-center gap-12`}
                        >
                            {/* Image Column */}
                            <div className="w-full md:w-1/2 group">
                                <div className="relative overflow-hidden rounded-2xl shadow-2xl transition-transform duration-500 group-hover:scale-[1.02]">
                                    <img
                                        src={section.image}
                                        alt={section.title}
                                        className="w-full h-[400px] object-cover"
                                    />
                                    <div className="absolute inset-0 bg-green-600/10 group-hover:bg-transparent transition-colors duration-300"></div>
                                </div>
                            </div>

                            {/* Text Column */}
                            <div className="w-full md:w-1/2 space-y-6">
                                <h3 className="heading-serif text-3xl font-bold text-gray-900 dark:text-white">
                                    {section.title}
                                </h3>
                                <p className="text-lg text-gray-600 dark:text-gray-400 leading-relaxed italic border-l-4 border-green-500 pl-6 py-2">
                                    {section.description}
                                </p>
                                <div className="pt-4">
                                    <Link
                                        to={`/topics/${section.slug}`}
                                        className="inline-block px-8 py-3 bg-green-600 hover:bg-green-700 text-white font-semibold rounded-full shadow-lg transition-all duration-300 hover:shadow-green-500/25 transform hover:-translate-y-1"
                                    >
                                        Learn More
                                    </Link>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default ProjectOverview;
