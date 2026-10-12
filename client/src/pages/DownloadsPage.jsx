import React, { useState, useEffect } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { api } from '../services/api';
import {
  Download,
  FileText,
  Calendar,
  Filter,
  Search,
  CheckCircle,
  FileDown
} from 'lucide-react';

export const DownloadsPage = () => {
  const { lang, t } = useLanguage();
  const [downloads, setDownloads] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    const fetchDownloads = async () => {
      try {
        const res = await api.getDownloads();
        if (res.success) setDownloads(res.data);
      } catch (err) {
        console.warn('Error fetching downloads:', err.message);
      }
    };
    fetchDownloads();
  }, []);

  const categories = ['All', 'Admission', 'Syllabus', 'Academic Calendar', 'Examination', 'General'];

  const filteredDownloads = downloads.filter(d => {
    const matchCat = selectedCategory === 'All' || d.category === selectedCategory;
    const matchSearch = d.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                        (d.description && d.description.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchCat && matchSearch;
  });

  return (
    <div className="bg-slate-50 min-h-screen py-10 px-4">
      <div className="max-w-7xl mx-auto space-y-10">
        {/* Banner */}
        <div className="bg-gradient-to-r from-slate-900 via-navy-950 to-slate-900 text-white rounded-2xl p-8 sm:p-12 shadow-md relative overflow-hidden">
          <div className="max-w-3xl space-y-3 relative z-10">
            <span className="text-amber-400 font-bold text-xs uppercase tracking-wider">
              {lang === 'hi' ? 'महत्वपूर्ण डाउनलोड्स' : 'Resources & Circulars'}
            </span>
            <h1 className="text-2xl sm:text-4xl font-extrabold leading-tight">
              {lang === 'hi'
                ? 'प्रवेश फॉर्म, पाठ्यक्रम एवं समय-सारणी डाउनलोड'
                : 'School Downloads & Official Documents'}
            </h1>
            <p className="text-slate-300 text-xs sm:text-sm">
              Admission Registration Forms • UP Board Syllabus 2026 • Academic Calendar & Exam Schedules
            </p>
          </div>
        </div>

        {/* Filters & Search */}
        <div className="bg-white p-4 rounded-xl shadow-sm border border-slate-200 flex flex-col md:flex-row items-center justify-between gap-4">
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

          <div className="relative w-full md:w-64">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search documents..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-3 py-2 text-xs rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-amber-500 bg-slate-50"
            />
          </div>
        </div>

        {/* Documents Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredDownloads.map((doc) => (
            <div
              key={doc.id}
              className="bg-white rounded-2xl p-6 shadow-sm border border-slate-200 card-hover-effect flex flex-col justify-between space-y-4"
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-bold uppercase px-2.5 py-0.5 rounded-md bg-amber-100 text-amber-800">
                    {doc.category}
                  </span>
                  <span className="text-[11px] text-slate-400 font-mono">
                    {doc.fileSize}
                  </span>
                </div>

                <h3 className="font-bold text-slate-900 text-sm leading-snug">
                  {doc.title}
                </h3>

                <p className="text-xs text-slate-600 leading-relaxed">
                  {doc.description}
                </p>

                <div className="text-[11px] text-slate-400 flex items-center gap-1">
                  <Calendar className="w-3 h-3" />
                  <span>Uploaded: {doc.uploadDate}</span>
                </div>
              </div>

              <div className="pt-4 border-t border-slate-100">
                <a
                  href={doc.url || '#'}
                  target="_blank"
                  rel="noreferrer"
                  onClick={(e) => {
                    if (!doc.url) {
                      e.preventDefault();
                      alert('Document will be made available shortly.');
                    }
                  }}
                  className="w-full inline-flex items-center justify-center gap-2 bg-slate-900 hover:bg-saffron-700 text-white font-semibold py-2.5 px-4 rounded-xl text-xs uppercase tracking-wider transition shadow-sm"
                >
                  <Download className="w-3.5 h-3.5 text-amber-300" />
                  <span>Download Document</span>
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
