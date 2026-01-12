import React from 'react';
import { useParams, Link } from 'react-router';
import { FaArrowLeft, FaLeaf, FaLightbulb, FaRecycle } from 'react-icons/fa';

const TopicDetail = () => {
    const { slug } = useParams();

    const topicsData = {
        'sustainable-transport': {
            title: 'Sustainable Transport',
            icon: FaLeaf,
            image: '/assets/transport.png',
            description: 'Drive the Change. Embrace electric vehicles and public transit to drastically reduce your carbon footprint. Every mile counts toward a cleaner sky.',
            longDescription: 'Transportation is one of the largest contributors to greenhouse gas emissions globally. By choosing sustainable transport options, you can significantly reduce your environmental impact while often saving money and improving your health.',
            benefits: [
                'Reduce carbon emissions by up to 50% compared to traditional vehicles',
                'Save money on fuel and maintenance costs',
                'Improve air quality in your community',
                'Reduce traffic congestion',
                'Promote healthier lifestyle through walking and cycling'
            ],
            tips: [
                'Use public transportation whenever possible',
                'Consider carpooling with colleagues or neighbors',
                'Switch to an electric or hybrid vehicle',
                'Bike or walk for short distances',
                'Plan your trips to minimize driving',
                'Maintain your vehicle for optimal fuel efficiency'
            ],
            impact: {
                co2Saved: '2.5 tons/year',
                moneySaved: '$1,200/year',
                participants: '15,000+'
            }
        },
        'renewable-energy': {
            title: 'Renewable Energy',
            icon: FaLightbulb,
            image: '/assets/energy.png',
            description: 'Powering the Future. Switch to solar and wind energy to protect our planet. Sustainable energy is not just a choice; it\'s our responsibility.',
            longDescription: 'Renewable energy sources like solar, wind, and hydroelectric power offer clean alternatives to fossil fuels. Making the switch to renewable energy is one of the most impactful actions you can take for the environment.',
            benefits: [
                'Eliminate carbon emissions from your energy use',
                'Reduce dependence on fossil fuels',
                'Lower long-term energy costs',
                'Increase property value with solar installations',
                'Support local green jobs and economy'
            ],
            tips: [
                'Install solar panels on your roof',
                'Switch to a green energy provider',
                'Use energy-efficient appliances',
                'Implement smart home technology to optimize energy use',
                'Consider community solar programs',
                'Invest in battery storage for solar energy'
            ],
            impact: {
                co2Saved: '4.0 tons/year',
                moneySaved: '$800/year',
                participants: '12,500+'
            }
        },
        'waste-reduction': {
            title: 'Waste Reduction',
            icon: FaRecycle,
            image: '/assets/waste.png',
            description: 'Zero Waste Living. Small changes in your daily routine can lead to a massive reduction in landfill waste. Start your journey with eco-friendly alternatives today.',
            longDescription: 'The average person generates over 4 pounds of waste per day. By adopting waste reduction strategies, you can dramatically decrease your environmental footprint and contribute to a circular economy.',
            benefits: [
                'Reduce landfill waste by up to 80%',
                'Save money by buying less and reusing more',
                'Minimize plastic pollution in oceans',
                'Support sustainable businesses',
                'Create a healthier living environment'
            ],
            tips: [
                'Practice the 5 R\'s: Refuse, Reduce, Reuse, Repurpose, Recycle',
                'Use reusable bags, bottles, and containers',
                'Compost organic waste',
                'Buy products with minimal packaging',
                'Repair items instead of replacing them',
                'Donate or sell items you no longer need'
            ],
            impact: {
                co2Saved: '1.8 tons/year',
                moneySaved: '$600/year',
                participants: '18,000+'
            }
        }
    };

    const topic = topicsData[slug];

    if (!topic) {
        return (
            <div className="min-h-screen bg-white dark:bg-gray-900 flex items-center justify-center">
                <div className="text-center">
                    <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">Topic Not Found</h1>
                    <Link to="/" className="text-emerald-600 dark:text-emerald-400 hover:underline">
                        Return to Home
                    </Link>
                </div>
            </div>
        );
    }

    const Icon = topic.icon;

    return (
        <div className="min-h-screen bg-white dark:bg-gray-900">
            {/* Back Button */}
            <div className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
                    <Link
                        to="/"
                        className="inline-flex items-center gap-2 text-emerald-600 dark:text-emerald-400 hover:text-emerald-700 dark:hover:text-emerald-300 transition-colors"
                    >
                        <FaArrowLeft />
                        <span>Back to Home</span>
                    </Link>
                </div>
            </div>

            {/* Hero Section */}
            <div className="relative h-96 overflow-hidden">
                <img
                    src={topic.image}
                    alt={topic.title}
                    className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-r from-emerald-900/80 to-emerald-600/60 flex items-center">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
                        <div className="flex items-center gap-4 mb-4">
                            <div className="bg-white dark:bg-gray-800 p-4 rounded-full">
                                <Icon className="text-4xl text-emerald-600 dark:text-emerald-400" />
                            </div>
                            <h1 className="text-5xl font-bold text-white">{topic.title}</h1>
                        </div>
                        <p className="text-xl text-white max-w-3xl">{topic.description}</p>
                    </div>
                </div>
            </div>

            {/* Content Section */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
                {/* Overview */}
                <div className="mb-16">
                    <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-6">Overview</h2>
                    <p className="text-lg text-gray-600 dark:text-gray-300 leading-relaxed">
                        {topic.longDescription}
                    </p>
                </div>

                {/* Impact Stats */}
                <div className="mb-16 bg-emerald-50 dark:bg-emerald-900/20 rounded-2xl p-8">
                    <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-8 text-center">
                        Our Community Impact
                    </h2>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        <div className="text-center">
                            <div className="text-4xl font-bold text-emerald-600 dark:text-emerald-400 mb-2">
                                {topic.impact.co2Saved}
                            </div>
                            <div className="text-gray-600 dark:text-gray-400">Average CO₂ Saved</div>
                        </div>
                        <div className="text-center">
                            <div className="text-4xl font-bold text-emerald-600 dark:text-emerald-400 mb-2">
                                {topic.impact.moneySaved}
                            </div>
                            <div className="text-gray-600 dark:text-gray-400">Average Money Saved</div>
                        </div>
                        <div className="text-center">
                            <div className="text-4xl font-bold text-emerald-600 dark:text-emerald-400 mb-2">
                                {topic.impact.participants}
                            </div>
                            <div className="text-gray-600 dark:text-gray-400">Active Participants</div>
                        </div>
                    </div>
                </div>

                {/* Benefits & Tips Grid */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">
                    {/* Benefits */}
                    <div>
                        <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-6">Key Benefits</h2>
                        <ul className="space-y-4">
                            {topic.benefits.map((benefit, index) => (
                                <li key={index} className="flex items-start gap-3">
                                    <div className="flex-shrink-0 w-6 h-6 bg-emerald-500 rounded-full flex items-center justify-center mt-1">
                                        <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                        </svg>
                                    </div>
                                    <span className="text-gray-600 dark:text-gray-300">{benefit}</span>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Tips */}
                    <div>
                        <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-6">Practical Tips</h2>
                        <ul className="space-y-4">
                            {topic.tips.map((tip, index) => (
                                <li key={index} className="flex items-start gap-3">
                                    <div className="flex-shrink-0 w-6 h-6 bg-emerald-100 dark:bg-emerald-900/30 rounded-full flex items-center justify-center mt-1">
                                        <span className="text-emerald-600 dark:text-emerald-400 font-bold text-sm">{index + 1}</span>
                                    </div>
                                    <span className="text-gray-600 dark:text-gray-300">{tip}</span>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>

                {/* Call to Action */}
                <div className="bg-gradient-to-r from-emerald-600 to-emerald-500 rounded-2xl p-12 text-center">
                    <h2 className="text-3xl font-bold text-white mb-4">Ready to Make a Difference?</h2>
                    <p className="text-xl text-emerald-50 mb-8 max-w-2xl mx-auto">
                        Join thousands of eco-warriors taking action on {topic.title.toLowerCase()}. Start tracking your impact today!
                    </p>
                    <div className="flex flex-wrap gap-4 justify-center">
                        <Link
                            to="/challenges"
                            className="px-8 py-3 bg-white text-emerald-600 font-semibold rounded-lg hover:bg-emerald-50 transition-colors shadow-lg"
                        >
                            Browse Challenges
                        </Link>
                        <Link
                            to="/register"
                            className="px-8 py-3 bg-emerald-700 text-white font-semibold rounded-lg hover:bg-emerald-800 transition-colors shadow-lg"
                        >
                            Get Started
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default TopicDetail;
