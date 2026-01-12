import React, { useState, useEffect } from 'react';
import { FaMapMarkerAlt, FaUsers } from 'react-icons/fa';
import Spinner from '../Spinner/Spinner';
import { Link } from 'react-router';
import AOS from 'aos';
import 'aos/dist/aos.css';

const UpComingEvents = () => {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);

  const API_BASE = import.meta.env.VITE_API_URL || '';

  useEffect(() => {
    // Initialize AOS
    AOS.init({
      duration: 800,
      once: true,
      offset: 100
    });

    const fetchEvents = async () => {
      try {
        if (!API_BASE) {
          console.warn('VITE_API_URL not set. Skipping events fetch.');
          setEvents([]);
          return;
        }

        const res = await fetch(`${API_BASE}/api/events`);
        if (!res.ok) throw new Error(`Failed to fetch events: ${res.status}`);
        const data = await res.json();
        setEvents(Array.isArray(data) ? data : []);
      } catch (err) {
        console.error('Error fetching events:', err);
        setEvents([]);
      } finally {
        setLoading(false);
      }
    };

    fetchEvents();
  }, [API_BASE]);

  if (loading) {
    return (
      <section className="py-20 bg-white dark:bg-gray-800" data-aos="fade-in">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12" data-aos="fade-up">
            <h2 className="heading-serif text-4xl font-bold text-gray-900 dark:text-white mb-4">Upcoming Events</h2>
            <p className="text-xl text-gray-600 dark:text-gray-300">Join local green initiatives</p>
          </div>
          <Spinner />
        </div>
      </section>
    );
  }

  return (
    <section className="py-20 bg-white dark:bg-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2
            className="heading-serif text-4xl font-bold text-gray-900 dark:text-white mb-4"
            data-aos="fade-down"
            data-aos-delay="100"
          >
            Upcoming Events
          </h2>
          <p
            className="text-xl text-gray-600 dark:text-gray-300"
            data-aos="fade-up"
            data-aos-delay="200"
          >
            Join local green initiatives
          </p>
        </div>

        {events.length === 0 ? (
          <div className="text-center text-gray-500 dark:text-gray-400 py-12" data-aos="fade-up">No upcoming events found.</div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {events.map((event, index) => (
              <div
                key={event._id ?? event.id}
                className="bg-white dark:bg-gray-800 rounded-xl
                 shadow-md p-6 hover:shadow-xl transition-shadow border border-gray-200 dark:border-gray-600"
                data-aos="fade-up"
                data-aos-delay={index * 100}
              >
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0 bg-emerald-500 text-white rounded-lg p-4 text-center dark:bg-emerald-600">
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
                    <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">{event.title}</h3>
                    <p className="text-gray-600 dark:text-gray-300 text-sm mb-3">{event.description}</p>
                    <div className="flex items-center gap-4 text-sm text-gray-500 dark:text-gray-400">
                      <span className="flex items-center gap-1">
                        <FaMapMarkerAlt className="text-emerald-500 dark:text-emerald-400" />
                        {event.location ?? 'TBD'}
                      </span>
                      <span className="flex items-center gap-1">
                        <FaUsers className="text-emerald-500 dark:text-emerald-400" />
                        {event.currentParticipants ?? 0}/{event.maxParticipants ?? '-'}
                      </span>
                    </div>
                  </div>
                </div>
                {event._id && (
                  <div className="mt-4 text-right">
                    <Link
                      to={`/events/${event._id}`}
                      className="inline-block text-emerald-600
                       hover:underline font-medium dark:text-emerald-400"
                    >
                      View event →
                    </Link>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}

        <div className="mt-12 text-center">
          <Link
            to="/events"
            className="inline-block bg-emerald-500 hover:bg-emerald-600
             text-white px-8 py-3 rounded-lg font-semibold 
             transition-colors shadow-lg hover:shadow-xl"
            data-aos="fade-up"
            data-aos-delay="300"
          >
            View All Events →
          </Link>
        </div>
      </div>

    </section>
  );
};

export default UpComingEvents;