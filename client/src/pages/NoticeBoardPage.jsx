import React, { useState, useEffect } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { api } from '../services/api';
import {
  Bell,
  Search,
  Filter,
  Download,
  Calendar,
  FileText,
  AlertCircle,
  ExternalLink,
  ChevronRight
} from 'lucide-react';

export const NoticeBoardPage = () => {
  const { lang, t } = useLanguage();
  const [notices, setNotices] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [filterImportant, setFilterImportant] = useState(false);

  useEffect(() => {
    const fetchNotices = async () => {
      try {
        const res = await api.getNotices();
        if (res.success) setNotices(res.data);
      } catch (err) {
        console.warn('Error fetching notices:', err.message);
      }
    };
    fetchNotices();
  }, []);

  const categories = ['All', 'Admissions', 'Examinations', 'Academic', 'Sports', 'General'];

  const filteredNotices = notices.filter(n => {
    const matchCat = selectedCategory === 'All' || n.category === selectedCategory;
    const matchSearch = n.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                        (n.description && n.description.toLowerCase().includes(searchQuery.toLowerCase()));
    const matchImp = !filterImportant || n.isImportant;
    return matchCat && matchSearch && matchImp;
  });

  return (
    <div className="bg-slate-50 min-h-screen py-10 px-4">
      <div className="max-w-7xl mx-auto space-y-10">
        {/* Banner */}
        <div className="bg-gradient-to-r from-slate-900 via-navy-950 to-slate-900 text-white rounded-2xl p-8 sm:p-12 shadow-md relative overflow-hidden">
          <div className="max-w-3xl space-y-3 relative z-10">
            <span className="text-amber-400 font-bold text-xs uppercase tracking-wider">
              {lang === 'hi' ? 'सूचना पट्ट' : 'Official Circulars'}
            </span>
            <h1 className="text-2xl sm:text-4xl font-extrabold leading-tight">
              {lang === 'hi'
                ? 'डिजिटल सूचना पट्ट एवं आदेश'
                : 'School Digital Notice Board'}
            </h1>
            <p className="text-slate-300 text-xs sm:text-sm">
              Timely Notifications, UP Board Circulars, Examination Datesheets & Holiday Orders
            </p>
          </div>
        </div>

        {/* Filter and Search Controls */}
        <div className="bg-white p-4 sm:p-6 rounded-2xl shadow-sm border border-slate-200 space-y-4">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            {/* Category Pills */}
            <div className="flex items-center gap-2 overflow-x-auto w-full md:w-auto pb-1 md:pb-0">
              <Filter className="w-4 h-4 text-slate-400 flex-shrink-0" />
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition ${
                    selectedCategory === cat
                      ? 'bg-saffron-600 text-white shadow-sm'
                      : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>

            {/* Important Only Toggle & Search Box */}
            <div className="flex items-center gap-3 w-full md:w-auto">
              <label className="flex items-center gap-2 text-xs font-semibold text-slate-700 cursor-pointer whitespace-nowrap">
                <input
                  type="checkbox"
                  checked={filterImportant}
                  onChange={(e) => setFilterImportant(e.target.checked)}
                  className="rounded text-saffron-600 focus:ring-amber-500"
                />
                <span>Important Only</span>
              </label>

              <div className="relative flex-1 md:w-64">
                <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  placeholder="Search notices..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-9 pr-3 py-2 text-xs rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-amber-500 bg-slate-50"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Notices Listing */}
        <div className="space-y-4">
          {filteredNotices.map((notice) => (
            <div
              key={notice.id}
              className={`p-6 rounded-2xl bg-white border ${
                notice.isImportant ? 'border-amber-400 shadow-sm' : 'border-slate-200'
              } flex flex-col md:flex-row items-start md:items-center justify-between gap-4 hover:shadow-md transition`}
            >
              <div className="space-y-2 flex-1">
                <div className="flex flex-wrap items-center gap-2">
                  <span className="text-[10px] font-bold uppercase px-2.5 py-0.5 rounded-md bg-saffron-100 text-saffron-800">
                    {notice.category}
                  </span>
                  {notice.isImportant && (
                    <span className="text-[10px] font-bold uppercase px-2 py-0.5 rounded-md bg-red-100 text-red-700 flex items-center gap-1">
                      <AlertCircle className="w-3 h-3" />
                      <span>Important</span>
                    </span>
                  )}
                  <span className="text-xs text-slate-400 font-medium flex items-center gap-1">
                    <Calendar className="w-3 h-3" />
                    <span>{notice.date}</span>
                  </span>
                </div>

                <h3 className="font-bold text-slate-900 text-sm sm:text-base leading-snug">
                  {notice.title}
                </h3>
                {notice.titleHindi && notice.titleHindi !== notice.title && (
                  <p className="text-xs text-slate-500 font-hindi">
                    {notice.titleHindi}
                  </p>
                )}

                {notice.description && (
                  <p className="text-xs text-slate-600 leading-relaxed pt-1">
                    {notice.description}
                  </p>
                )}
              </div>

              {/* Action: Download PDF or View */}
              <div className="flex-shrink-0 flex items-center gap-2 w-full md:w-auto pt-2 md:pt-0 border-t md:border-t-0 border-slate-100">
                <a
                  href={notice.pdfUrl || '#'}
                  target="_blank"
                  rel="noreferrer"
                  onClick={(e) => {
                    if (!notice.pdfUrl) {
                      e.preventDefault();
                      alert('Document file will be available soon from the school office.');
                    }
                  }}
                  className="w-full md:w-auto inline-flex items-center justify-center gap-2 bg-slate-900 hover:bg-slate-800 text-white font-semibold px-4 py-2 rounded-lg text-xs uppercase tracking-wider transition shadow-sm"
                >
                  <Download className="w-3.5 h-3.5 text-amber-400" />
                  <span>Download Notice (PDF)</span>
                </a>
              </div>
            </div>
          ))}

          {filteredNotices.length === 0 && (
            <div className="text-center py-16 bg-white rounded-2xl border border-slate-200 space-y-2">
              <Bell className="w-10 h-10 text-slate-300 mx-auto" />
              <h4 className="font-bold text-slate-700 text-sm">No notices match your criteria</h4>
              <p className="text-xs text-slate-500">Try adjusting your search terms or category filter.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
