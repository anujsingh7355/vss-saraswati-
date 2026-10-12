import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Bell, ChevronRight } from 'lucide-react';
import { api } from '../services/api';

export const BannerTicker = () => {
  const [notices, setNotices] = useState([]);

  useEffect(() => {
    const fetchTickerNotices = async () => {
      try {
        const res = await api.getNotices();
        if (res.success && res.data) {
          setNotices(res.data.slice(0, 5));
        }
      } catch (err) {
        console.warn('Ticker notice fetch error:', err.message);
      }
    };
    fetchTickerNotices();
  }, []);

  if (!notices.length) return null;

  return (
    <div className="bg-amber-500 text-slate-900 border-b border-amber-600/30 overflow-hidden text-xs font-medium py-1.5 px-4 flex items-center">
      <div className="flex items-center gap-1.5 font-bold uppercase tracking-wider bg-slate-950 text-amber-300 px-2.5 py-0.5 rounded text-[11px] flex-shrink-0 mr-3 shadow-sm">
        <Bell className="w-3.5 h-3.5 text-amber-400 animate-bounce" />
        <span>Latest Update</span>
      </div>
      <div className="overflow-hidden whitespace-nowrap relative w-full flex items-center">
        <div className="inline-flex items-center gap-8 animate-marquee">
          {notices.map((n, idx) => (
            <Link
              key={n.id || idx}
              to="/notices"
              className="inline-flex items-center gap-1.5 hover:underline text-slate-900 hover:text-black transition font-semibold"
            >
              <span className="w-1.5 h-1.5 rounded-full bg-slate-900 inline-block"></span>
              <span>{n.title}</span>
              {n.isImportant && (
                <span className="bg-red-600 text-white text-[9px] px-1.5 py-0.2 rounded font-bold uppercase">
                  Important
                </span>
              )}
            </Link>
          ))}
        </div>
      </div>
      <Link
        to="/notices"
        className="flex-shrink-0 ml-3 text-xs font-bold text-slate-950 hover:underline flex items-center gap-0.5"
      >
        <span>All</span>
        <ChevronRight className="w-3.5 h-3.5" />
      </Link>
    </div>
  );
};
