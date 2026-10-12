import React, { useState, useEffect } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { api } from '../services/api';
import {
  Calendar,
  Clock,
  MapPin,
  Tag,
  Sparkles,
  ArrowRight
} from 'lucide-react';

export const EventsPage = () => {
  const { lang, t } = useLanguage();
  const [events, setEvents] = useState([]);
  const [activeTab, setActiveTab] = useState('All');

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const res = await api.getEvents();
        if (res.success) setEvents(res.data);
      } catch (err) {
        console.warn('Error loading events:', err.message);
      }
    };
    fetchEvents();
  }, []);

  const filteredEvents = activeTab === 'All'
    ? events
    : events.filter(e => e.status.toLowerCase() === activeTab.toLowerCase());

  return (
    <div className="bg-slate-50 min-h-screen py-10 px-4">
      <div className="max-w-7xl mx-auto space-y-10">
        {/* Banner */}
        <div className="bg-gradient-to-r from-slate-900 via-navy-950 to-slate-900 text-white rounded-2xl p-8 sm:p-12 shadow-md relative overflow-hidden">
          <div className="max-w-3xl space-y-3 relative z-10">
            <span className="text-amber-400 font-bold text-xs uppercase tracking-wider">
              {lang === 'hi' ? 'विद्यालय के कार्यक्रम' : 'School Gatherings & Festivals'}
            </span>
            <h1 className="text-2xl sm:text-4xl font-extrabold leading-tight">
              {lang === 'hi'
                ? 'उत्सव, प्रतियोगिताएं एवं वार्षिकोत्सव'
                : 'School Events & Celebrations'}
            </h1>
            <p className="text-slate-300 text-xs sm:text-sm">
              Annual Function • National Days • Saraswati Puja • Science Exhibitions • Sports Competitions
            </p>
          </div>
        </div>

        {/* Status Filter Tabs */}
        <div className="flex items-center gap-2 border-b border-slate-200 pb-2">
          {['All', 'Upcoming', 'Completed'].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-4 py-2 rounded-xl text-xs font-semibold transition ${
                activeTab === tab
                  ? 'bg-saffron-600 text-white shadow-md'
                  : 'bg-white text-slate-600 hover:bg-slate-100 border border-slate-200'
              }`}
            >
              {tab} Events
            </button>
          ))}
        </div>

        {/* Events Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredEvents.map((evt) => (
            <div
              key={evt.id}
              className="bg-white rounded-2xl overflow-hidden shadow-sm border border-slate-200 card-hover-effect flex flex-col justify-between"
            >
              <div>
                <div className="h-48 overflow-hidden relative group">
                  <img
                    src={evt.image}
                    alt={evt.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition duration-500"
                  />
                  <div className="absolute top-3 left-3 bg-slate-900/80 backdrop-blur-md text-amber-300 text-xs font-bold px-2.5 py-1 rounded-md">
                    {evt.category}
                  </div>
                  <div className={`absolute top-3 right-3 text-[10px] font-bold px-2.5 py-1 rounded-md uppercase tracking-wider ${
                    evt.status === 'Upcoming' ? 'bg-emerald-600 text-white' : 'bg-slate-700 text-slate-200'
                  }`}>
                    {evt.status}
                  </div>
                </div>

                <div className="p-6 space-y-4">
                  <h3 className="font-bold text-slate-900 text-base leading-snug">
                    {evt.title}
                  </h3>

                  <div className="space-y-2 text-xs text-slate-600 pt-1 border-t border-slate-100">
                    <div className="flex items-center gap-2 text-saffron-700 font-semibold">
                      <Calendar className="w-4 h-4 flex-shrink-0" />
                      <span>{evt.date}</span>
                    </div>

                    <div className="flex items-center gap-2">
                      <Clock className="w-4 h-4 text-slate-400 flex-shrink-0" />
                      <span>{evt.time}</span>
                    </div>

                    <div className="flex items-center gap-2">
                      <MapPin className="w-4 h-4 text-slate-400 flex-shrink-0" />
                      <span>{evt.location}</span>
                    </div>
                  </div>

                  <p className="text-xs text-slate-600 leading-relaxed pt-2">
                    {evt.description}
                  </p>
                </div>
              </div>

              <div className="p-4 bg-slate-50 border-t border-slate-100 text-center">
                <span className="text-xs font-semibold text-slate-500">
                  Open for all Students, Parents & Well-Wishers
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
