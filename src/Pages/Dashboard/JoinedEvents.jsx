import React, { useState, useEffect } from 'react';
import { Link } from 'react-router';
import { FaMapMarkerAlt, FaUsers, FaCalendar, FaClock, FaCheckCircle } from 'react-icons/fa';
import useAuth from '../../Hooks/useAuth';
import useTitle from '../../Hooks/useTitle';
import axiosPublic from '../../api/axiosPublic';

const JoinedEvents = () => {
    useTitle('My Joined Events');
    const { user } = useAuth();
    const [events, setEvents] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (user?.email) {
            fetchJoinedEvents();
        }
    }, [user]);

    const fetchJoinedEvents = async () => {
        try {
            setLoading(true);
            const response = await axiosPublic.get(`/api/user-events/${encodeURIComponent(user.email)}`);
            setEvents(Array.isArray(response.data) ? response.data : []);
        } catch (error) {
            console.error('Failed to fetch joined events:', error);
            // Fallback or empty state
            setEvents([]);
        } finally {
            setLoading(false);
        }
    };

    if (loading) {
        return (
            <div className="p-6 flex items-center justify-center min-h-[400px]">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-emerald-500"></div>
            </div>
        );
    }

    return (
        <div className="p-6 max-w-7xl mx-auto">
            <div className="mb-8">
                <h1 className="text-3xl font-bold text-gray-900 dark:text-white">My Joined Events</h1>
                <p className="text-gray-600 dark:text-gray-400 mt-2">Events you've registered for and committed to attending.</p>
            </div>

            {events.length === 0 ? (
                <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-12 text-center border border-transparent dark:border-gray-700">
                    <div className="w-16 h-16 bg-gray-100 dark:bg-gray-700 rounded-full flex items-center justify-center mx-auto mb-4">
                        <FaCalendar className="text-gray-400 text-2xl" />
                    </div>
                    <p className="text-gray-500 dark:text-gray-400 text-lg mb-6">You haven't joined any events yet.</p>
                    <Link
                        to="/events"
                        className="bg-emerald-500 hover:bg-emerald-600 text-white px-6 py-3 rounded-lg font-semibold inline-block transition-colors"
                    >
                        Browse All Events
                    </Link>
                </div>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {events.map((registration) => {
                        const event = registration.event || registration; // Handle depending on populate structure
                        return (
                            <div
                                key={registration._id}
                                className="bg-white dark:bg-gray-800 rounded-xl shadow-md hover:shadow-lg transition-all duration-300 overflow-hidden border border-transparent dark:border-gray-700 flex flex-col"
                            >
                                <div className="p-6 flex-1">
                                    <div className="flex items-center justify-between mb-4">
                                        <div className="bg-emerald-100 dark:bg-emerald-900/30 text-emerald-600 dark:text-emerald-400 px-3 py-1 rounded-full text-xs font-bold flex items-center gap-1">
                                            <FaCheckCircle /> Joined
                                        </div>
                                        <span className="text-xs text-gray-400">
                                            Registered: {new Date(registration.joinDate || registration.registrationDate || registration.date).toLocaleDateString()}
                                        </span>
                                    </div>

                                    <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">{event.title}</h3>

                                    <div className="space-y-2 mb-6 text-sm text-gray-600 dark:text-gray-400">
                                        <div className="flex items-center gap-2">
                                            <FaCalendar className="text-emerald-500" />
                                            <span>{new Date(event.date).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}</span>
                                        </div>
                                        <div className="flex items-center gap-2">
                                            <FaClock className="text-emerald-500" />
                                            <span>{new Date(event.date).toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })}</span>
                                        </div>
                                        <div className="flex items-center gap-2">
                                            <FaMapMarkerAlt className="text-emerald-500" />
                                            <span className="truncate">{event.location}</span>
                                        </div>
                                    </div>
                                </div>

                                <div className="p-4 bg-gray-50 dark:bg-gray-900/50 border-t border-gray-100 dark:border-gray-700">
                                    <Link
                                        to={`/events/${event._id || event.id}`}
                                        className="w-full text-center block text-emerald-600 dark:text-emerald-400 font-semibold hover:text-emerald-700 dark:hover:text-emerald-300 transition-colors"
                                    >
                                        View Details
                                    </Link>
                                </div>
                            </div>
                        );
                    })}
                </div>
            )}
        </div>
    );
};

export default JoinedEvents;
