import React, { useState, useEffect } from 'react';
import { Link } from 'react-router';
import { FaMapMarkerAlt, FaUsers, FaCalendar } from 'react-icons/fa';
import bannerImg from '../assets/events.jpg';

const Events = () => {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);

  const API_BASE = import.meta.env.VITE_API_URL || '';

  useEffect(() => {
    fetchEvents();
  }, []);

  const fetchEvents = async () => {
    try {
      const response = await fetch(`${API_BASE}/api/events`);
      const data = await response.json();
      setEvents(Array.isArray(data) ? data : []);
    } catch (error) {
      console.error('Failed to fetch events:', error);
      setEvents([]);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-8">All Events</h1>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {[1, 2, 3, 4].map(i => (
              <div key={i} className="bg-white rounded-xl shadow-md p-6 animate-pulse">
                <div className="flex gap-4">
                  <div className="h-20 w-20 bg-gray-300 rounded-lg"></div>
                  <div className="flex-1">
                    <div className="h-6 bg-gray-300 rounded mb-3"></div>
                    <div className="h-4 bg-gray-200 rounded w-3/4"></div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-0">
      {/* Hero banner with background image */}
      <header className="w-full overflow-hidden">
        <div
          className="relative w-full h-[260px] md:h-[340px] lg:h-[420px] bg-cover bg-center"
          style={{ backgroundImage: `url(${bannerImg})` }}
        >
          <div className="absolute inset-0 bg-black/40" />
          <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-full flex flex-col justify-center">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-white drop-shadow-lg">
              All Events
            </h1>
            <p className="mt-3 text-lg md:text-xl text-white/90 max-w-3xl">
              Join local green initiatives and make a difference in your community
            </p>
          </div>
        </div>
      </header>

      {/* Main content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {events.length === 0 ? (
          <div className="text-center py-12 bg-white rounded-xl">
            <p className="text-gray-500 text-lg">No events found</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {events.map((event) => (
              <Link
                key={event._id}
                to={`/events/${event._id}`}
                className="bg-gradient-to-br from-emerald-50 to-white rounded-xl shadow-md p-6 hover:shadow-xl transition-all duration-300 border border-emerald-100 group"
              >
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0 bg-emerald-500 text-white rounded-lg p-4 text-center shadow-lg group-hover:scale-110 transition-transform duration-300">
                    <div className="text-2xl font-bold">
                      {event.date ? new Date(event.date).getDate() : '-'}
                    </div>
                    <div className="text-sm">
                      {event.date
                        ? new Date(event.date).toLocaleDateString('en-US', { month: 'short' })
                        : ''}
                    </div>
                  </div>
                  <div className="flex-1">
                    <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-emerald-600 transition-colors">
                      {event.title}
                    </h3>
                    <p className="text-gray-600 text-sm mb-3 line-clamp-2">
                      {event.description}
                    </p>
                    <div className="flex items-center gap-4 text-sm text-gray-500">
                      <span className="flex items-center gap-1">
                        <FaMapMarkerAlt className="text-emerald-500" />
                        {event.location || 'TBD'}
                      </span>
                      <span className="flex items-center gap-1">
                        <FaUsers className="text-emerald-500" />
                        {event.attendees || 0} attending
                      </span>
                    </div>
                    <div className="mt-3 text-sm text-gray-500 flex items-center gap-1">
                      <FaCalendar className="text-emerald-500" />
                      {event.date
                        ? new Date(event.date).toLocaleDateString('en-US', {
                            weekday: 'long',
                            year: 'numeric',
                            month: 'long',
                            day: 'numeric',
                          })
                        : 'Date TBD'}
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Events;