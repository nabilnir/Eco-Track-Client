import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router';
import { FaMapMarkerAlt, FaUsers, FaCalendar, FaClock } from 'react-icons/fa';
import toast from 'react-hot-toast';
import useAuth from '../Hooks/useAuth';
import useTitle from '../Hooks/useTitle';

const EventDetails = () => {
  const { id } = useParams();
  const { user } = useAuth();
  const [event, setEvent] = useState(null);
  const [loading, setLoading] = useState(true);
  const [registering, setRegistering] = useState(false);

  
  useTitle(event ? event.title : 'Event Details');

  const API_BASE = import.meta.env.VITE_API_URL || '';

  useEffect(() => {
    fetchEvent();
  }, [id]);

  const fetchEvent = async () => {
    try {
      const response = await fetch(`${API_BASE}/api/events/${id}`);
      if (!response.ok) {
        throw new Error('Event not found');
      }
      const data = await response.json();
      setEvent(data);
    } catch (error) {
      console.error('Failed to fetch event:', error);
      toast.error('Failed to load event');
    } finally {
      setLoading(false);
    }
  };

  const handleRegister = async () => {
    if (!user) {
      toast.error('Please login to register for events');
      return;
    }

    setRegistering(true);
    try {
      const response = await fetch(`${API_BASE}/api/events/join/${id}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ userId: user.email })
      });

      if (response.ok) {
        toast.success('Registered for event successfully!');
        fetchEvent(); // Refresh event data to update attendees count
      } else {
        const errorData = await response.json();
        toast.error(errorData.message || 'Failed to register for event');
      }
    } catch (error) {
      console.error('Registration error:', error);
      toast.error('Failed to register');
    } finally {
      setRegistering(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 py-12 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-emerald-500"></div>
      </div>
    );
  }

  if (!event) {
    return (
      <div className="min-h-screen bg-gray-50 py-12 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Event Not Found</h2>
          <Link to="/" className="text-emerald-600 hover:underline">Go back to home</Link>
        </div>
      </div>
    );
  }
  
  return (
    <div className="min-h-screen bg-gray-50 py-12 mt-15">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <Link to="/events" className="text-emerald-600 hover:text-emerald-700 mb-6 inline-block">
          ← Back to Events
        </Link>

        <div className="bg-white rounded-xl shadow-lg overflow-hidden">
          <div className="bg-gradient-to-r from-emerald-500 to-emerald-600 p-8 text-white">
            <div className="flex items-start gap-6">
              <div className="flex-shrink-0 bg-white text-emerald-600 rounded-lg p-4 text-center shadow-lg">
                <div className="text-3xl font-bold">
                  {event.date ? new Date(event.date).getDate() : '-'}
                </div>
                <div className="text-sm font-semibold">
                  {event.date ? new Date(event.date).toLocaleDateString('en-US', { month: 'short' }) : ''}
                </div>
              </div>
              <div className="flex-1">
                <h1 className="text-3xl font-bold mb-2">{event.title}</h1>
                <p className="text-emerald-100 text-lg">{event.shortDesc || event.description}</p>
              </div>
            </div>
          </div>

          <div className="p-8">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
              <div className="flex items-center gap-3 p-4 bg-gray-50 rounded-lg">
                <FaCalendar className="text-2xl text-emerald-500" />
                <div>
                  <p className="text-sm text-gray-600">Date</p>
                  <p className="font-semibold text-gray-900">
                    {event.date
                      ? new Date(event.date).toLocaleDateString('en-US', { 
                          weekday: 'long', 
                          year: 'numeric', 
                          month: 'long', 
                          day: 'numeric' 
                        })
                      : '-'}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-3 p-4 bg-gray-50 rounded-lg">
                <FaClock className="text-2xl text-emerald-500" />
                <div>
                  <p className="text-sm text-gray-600">Time</p>
                  <p className="font-semibold text-gray-900">
                    {event.date
                      ? new Date(event.date).toLocaleTimeString('en-US', { 
                          hour: '2-digit', 
                          minute: '2-digit' 
                        })
                      : '-'}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-3 p-4 bg-gray-50 rounded-lg">
                <FaMapMarkerAlt className="text-2xl text-emerald-500" />
                <div>
                  <p className="text-sm text-gray-600">Location</p>
                  <p className="font-semibold text-gray-900">{event.location || 'TBD'}</p>
                </div>
              </div>
            </div>

            <div className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">About This Event</h2>
              <p className="text-gray-700 leading-relaxed">{event.description}</p>
            </div>

            <div className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Event Details</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="p-4 border border-gray-200 rounded-lg">
                  <p className="text-sm text-gray-600 mb-1">Organizer</p>
                  <p className="font-semibold text-gray-900">{event.organizer}</p>
                </div>
                <div className="p-4 border border-gray-200 rounded-lg">
                  <p className="text-sm text-gray-600 mb-1">Attendees</p>
                  <div className="flex items-center gap-2">
                    <FaUsers className="text-emerald-500" />
                    <p className="font-semibold text-gray-900">
                      {event.attendees || 0} attending
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <button 
              onClick={handleRegister} 
              className="w-full bg-emerald-500 hover:bg-emerald-600 text-white py-4 rounded-lg font-bold text-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              disabled={registering}
            >
              {registering ? 'Registering...' : 'Register for Event'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EventDetails;