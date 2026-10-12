import React, { useState, useEffect } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { api } from '../services/api';
import {
  MonitorPlay,
  FlaskConical,
  Cpu,
  BookOpen,
  Trophy,
  Droplets,
  Bus,
  Sparkles,
  ShieldCheck,
  CheckCircle2
} from 'lucide-react';

export const FacilitiesPage = () => {
  const { lang, t } = useLanguage();
  const [facilities, setFacilities] = useState([]);

  useEffect(() => {
    const fetchFacilities = async () => {
      try {
        const res = await api.getFacilities();
        if (res.success) setFacilities(res.data);
      } catch (err) {
        console.warn('Error loading facilities:', err.message);
      }
    };
    fetchFacilities();
  }, []);

  const getIcon = (iconName) => {
    switch (iconName) {
      case 'MonitorPlay': return <MonitorPlay className="w-6 h-6 text-saffron-600" />;
      case 'FlaskConical': return <FlaskConical className="w-6 h-6 text-saffron-600" />;
      case 'Cpu': return <Cpu className="w-6 h-6 text-saffron-600" />;
      case 'BookOpen': return <BookOpen className="w-6 h-6 text-saffron-600" />;
      case 'Trophy': return <Trophy className="w-6 h-6 text-saffron-600" />;
      case 'Droplets': return <Droplets className="w-6 h-6 text-saffron-600" />;
      case 'Bus': return <Bus className="w-6 h-6 text-saffron-600" />;
      default: return <Sparkles className="w-6 h-6 text-saffron-600" />;
    }
  };

  return (
    <div className="bg-slate-50 min-h-screen py-10 px-4">
      <div className="max-w-7xl mx-auto space-y-12">
        {/* Banner */}
        <div className="bg-gradient-to-r from-slate-900 via-navy-950 to-slate-900 text-white rounded-2xl p-8 sm:p-12 shadow-md relative overflow-hidden">
          <div className="max-w-3xl space-y-3 relative z-10">
            <span className="text-amber-400 font-bold text-xs uppercase tracking-wider">
              {lang === 'hi' ? 'भौतिक संसाधन एवं सुविधाएं' : 'Campus Infrastructure'}
            </span>
            <h1 className="text-2xl sm:text-4xl font-extrabold leading-tight">
              {lang === 'hi'
                ? 'आधुनिक शैक्षणिक सुविधाएं एवं तकनीक'
                : 'School Facilities & Campus Amenities'}
            </h1>
            <p className="text-slate-300 text-xs sm:text-sm">
              World-Class Laboratories • Digital Classrooms • Sports Complex • Pure RO Water & Secure Transport
            </p>
          </div>
        </div>

        {/* Facilities Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8">
          {facilities.map((fac) => (
            <div
              key={fac.id}
              className="bg-white rounded-2xl overflow-hidden shadow-sm border border-slate-200 card-hover-effect flex flex-col sm:flex-row items-stretch"
            >
              {/* Photo */}
              <div className="sm:w-5/12 h-56 sm:h-auto overflow-hidden relative flex-shrink-0">
                <img
                  src={fac.image}
                  alt={fac.title}
                  className="w-full h-full object-cover"
                />
              </div>

              {/* Description */}
              <div className="p-6 flex-1 flex flex-col justify-between space-y-3">
                <div className="space-y-2">
                  <div className="w-12 h-12 rounded-xl bg-amber-50 flex items-center justify-center border border-amber-200">
                    {getIcon(fac.icon)}
                  </div>
                  <h3 className="font-bold text-slate-900 text-lg">
                    {fac.title}
                  </h3>
                  <div className="text-xs font-semibold text-amber-700 font-hindi">
                    {fac.titleHindi}
                  </div>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    {fac.description}
                  </p>
                </div>

                <div className="pt-3 border-t border-slate-100 flex items-center gap-2 text-[11px] text-emerald-700 font-semibold">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  <span>Fully Operational & Maintained</span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Safety & Hygiene Assurance */}
        <div className="bg-amber-50/70 border-2 border-amber-200 rounded-2xl p-6 sm:p-8 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 rounded-full bg-saffron-600 text-white flex items-center justify-center flex-shrink-0 shadow-md">
              <ShieldCheck className="w-8 h-8" />
            </div>
            <div>
              <h4 className="font-bold text-slate-900 text-base">
                Campus Safety, 24x7 CCTV & First-Aid Protocol
              </h4>
              <p className="text-xs text-slate-600 mt-1 max-w-xl">
                The entire campus is safeguarded with multi-angle CCTV coverage, fire safety equipment, dedicated security guards, and on-premises emergency first-aid facilities.
              </p>
            </div>
          </div>
          <div className="whitespace-nowrap">
            <span className="bg-white text-saffron-800 border border-saffron-300 font-bold text-xs px-4 py-2 rounded-lg shadow-sm">
              100% Secure Environment
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};
