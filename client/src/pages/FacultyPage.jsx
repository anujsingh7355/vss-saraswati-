import React, { useState, useEffect } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { api } from '../services/api';
import {
  GraduationCap,
  Award,
  BookOpen,
  Briefcase,
  Users,
  Search,
  Filter
} from 'lucide-react';

export const FacultyPage = () => {
  const { lang, t } = useLanguage();
  const [facultyList, setFacultyList] = useState([]);
  const [selectedDept, setSelectedDept] = useState('All');
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    const fetchFaculty = async () => {
      try {
        const res = await api.getFaculty();
        if (res.success) setFacultyList(res.data);
      } catch (err) {
        console.warn('Error fetching faculty:', err.message);
      }
    };
    fetchFaculty();
  }, []);

  const departments = ['All', 'Administration', 'Senior Secondary (Inter)', 'High School', 'Computer & IT'];

  const filteredFaculty = facultyList.filter(f => {
    const matchesDept = selectedDept === 'All' || f.department === selectedDept;
    const matchesSearch = f.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          f.subject.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          f.designation.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesDept && matchesSearch;
  });

  return (
    <div className="bg-slate-50 min-h-screen py-10 px-4">
      <div className="max-w-7xl mx-auto space-y-12">
        {/* Banner */}
        <div className="bg-gradient-to-r from-slate-900 via-navy-950 to-slate-900 text-white rounded-2xl p-8 sm:p-12 shadow-md relative overflow-hidden">
          <div className="max-w-3xl space-y-3 relative z-10">
            <span className="text-amber-400 font-bold text-xs uppercase tracking-wider">
              {lang === 'hi' ? 'आचार्य वृन्द' : 'Our Mentors & Educators'}
            </span>
            <h1 className="text-2xl sm:text-4xl font-extrabold leading-tight">
              {lang === 'hi'
                ? 'समर्पित एवं अनुभवी शिक्षक मण्डल'
                : 'Faculty & Teachers Directory'}
            </h1>
            <p className="text-slate-300 text-xs sm:text-sm">
              Highly Qualified PGT & TGT Lecturers • Subject Matter Experts • Dedicated to Student Mentorship
            </p>
          </div>
        </div>

        {/* Filter & Search Bar */}
        <div className="bg-white p-4 rounded-xl shadow-sm border border-slate-200 flex flex-col md:flex-row items-center justify-between gap-4">
          {/* Department Filter Pills */}
          <div className="flex items-center gap-2 overflow-x-auto w-full md:w-auto pb-1 md:pb-0">
            <Filter className="w-4 h-4 text-slate-400 flex-shrink-0" />
            {departments.map((dept) => (
              <button
                key={dept}
                onClick={() => setSelectedDept(dept)}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition ${
                  selectedDept === dept
                    ? 'bg-saffron-600 text-white shadow-sm'
                    : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                }`}
              >
                {dept}
              </button>
            ))}
          </div>

          {/* Search Box */}
          <div className="relative w-full md:w-64">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search teacher or subject..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-9 pr-3 py-2 text-xs rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-amber-500 bg-slate-50"
            />
          </div>
        </div>

        {/* Faculty Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {filteredFaculty.map((member) => (
            <div
              key={member.id}
              className="bg-white rounded-2xl overflow-hidden shadow-sm border border-slate-200 card-hover-effect flex flex-col justify-between"
            >
              <div>
                <div className="h-56 overflow-hidden bg-slate-100 relative group">
                  <img
                    src={member.photo}
                    alt={member.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition duration-500"
                  />
                  <div className="absolute top-2 right-2 bg-slate-900/80 backdrop-blur-sm text-amber-300 text-[10px] font-bold px-2 py-0.5 rounded">
                    {member.experience} Exp.
                  </div>
                </div>

                <div className="p-5 space-y-3">
                  <div>
                    <h3 className="font-bold text-slate-900 text-base leading-snug">
                      {member.name}
                    </h3>
                    <p className="text-xs text-saffron-700 font-semibold mt-0.5">
                      {member.designation}
                    </p>
                  </div>

                  <div className="space-y-1.5 pt-2 border-t border-slate-100 text-xs text-slate-600">
                    <div className="flex items-center gap-2">
                      <BookOpen className="w-3.5 h-3.5 text-amber-600 flex-shrink-0" />
                      <span className="font-medium">{member.subject}</span>
                    </div>

                    <div className="flex items-center gap-2">
                      <GraduationCap className="w-3.5 h-3.5 text-amber-600 flex-shrink-0" />
                      <span>{member.qualification}</span>
                    </div>

                    <div className="flex items-center gap-2">
                      <Briefcase className="w-3.5 h-3.5 text-amber-600 flex-shrink-0" />
                      <span className="text-[11px] text-slate-500">{member.department}</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="p-4 bg-slate-50/70 border-t border-slate-100 text-center">
                <span className="text-[11px] font-semibold text-slate-500 uppercase tracking-wider">
                  VSS SVM Arkha
                </span>
              </div>
            </div>
          ))}
        </div>

        {/* Note on Faculty Management */}
        <div className="text-center text-xs text-slate-500 bg-amber-50/60 p-4 rounded-xl border border-amber-200">
          Faculty profiles, qualifications, and staff allocations are maintained and updated directly by the school administration via the Admin Control Panel.
        </div>
      </div>
    </div>
  );
};
