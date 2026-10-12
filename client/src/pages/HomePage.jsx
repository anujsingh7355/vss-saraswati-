import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useLanguage } from '../context/LanguageContext';
import { BannerTicker } from '../components/BannerTicker';
import { api } from '../services/api';
import {
  GraduationCap,
  Sparkles,
  BookOpen,
  Award,
  Users,
  Calendar,
  Bell,
  ArrowRight,
  ShieldCheck,
  CheckCircle2,
  ChevronRight,
  Play,
  Heart,
  Quote,
  Eye,
  FileText
} from 'lucide-react';

export const HomePage = () => {
  const { lang, t } = useLanguage();
  const [notices, setNotices] = useState([]);
  const [events, setEvents] = useState([]);
  const [facilities, setFacilities] = useState([]);
  const [gallery, setGallery] = useState([]);
  const [settings, setSettings] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [nRes, eRes, fRes, gRes, sRes] = await Promise.all([
          api.getNotices(),
          api.getEvents(),
          api.getFacilities(),
          api.getGallery(),
          api.getSettings()
        ]);
        if (nRes.success) setNotices(nRes.data.slice(0, 5));
        if (eRes.success) setEvents(eRes.data.slice(0, 3));
        if (fRes.success) setFacilities(fRes.data.slice(0, 6));
        if (gRes.success) setGallery(gRes.data.slice(0, 6));
        if (sRes.success) setSettings(sRes.data);
      } catch (err) {
        console.warn('Error loading home page content:', err.message);
      }
    };
    fetchData();
  }, []);

  return (
    <div className="bg-slate-50 min-h-screen">
      {/* Breaking News Ticker */}
      <BannerTicker />

      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-slate-950 via-navy-950 to-slate-900 text-white overflow-hidden py-16 md:py-24">
        {/* Decorative background glow & pattern */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,_var(--tw-gradient-stops))] from-saffron-500/15 via-transparent to-transparent pointer-events-none"></div>
        <div className="absolute -right-20 -bottom-20 w-96 h-96 bg-amber-500/10 rounded-full blur-3xl pointer-events-none"></div>

        <div className="max-w-7xl mx-auto px-4 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            {/* Left Column: Heading & CTAs */}
            <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
              <div className="inline-flex items-center gap-2 bg-saffron-500/20 border border-saffron-400/40 text-amber-300 px-3.5 py-1.5 rounded-full text-xs font-semibold uppercase tracking-wider backdrop-blur-sm">
                <Sparkles className="w-3.5 h-3.5 text-amber-300 animate-pulse" />
                <span>{lang === 'hi' ? 'सत्र 2026-27 प्रवेश प्रारंभ' : 'Admissions Open 2026-27'}</span>
              </div>

              <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-5xl font-extrabold tracking-tight leading-tight">
                <span className="font-hindi text-saffron-400 block mb-2">
                  {lang === 'hi' ? 'वि.सं.स्मा. सरस्वती विद्या मन्दिर इण्टर कॉलेज' : 'VSS Saraswati Vidya Mandir'}
                </span>
                <span className="text-white block text-2xl sm:text-3xl md:text-4xl">
                  {lang === 'hi' ? 'अरखा, रायबरेली, उत्तर प्रदेश' : 'Inter College, Arkha, Raebareli (UP)'}
                </span>
              </h1>

              <div className="flex items-center justify-center lg:justify-start gap-3">
                <span className="font-hindi text-amber-300 font-bold text-lg sm:text-xl">
                  "सा विद्या या विमुक्तये"
                </span>
                <span className="text-slate-400">•</span>
                <span className="text-slate-200 font-semibold tracking-wide text-sm sm:text-base">
                  Learn • Grow • Succeed
                </span>
              </div>

              <p className="text-slate-300 text-sm sm:text-base leading-relaxed max-w-2xl mx-auto lg:mx-0">
                {lang === 'hi'
                  ? 'अरखा, रायबरेली में स्थित संस्कारयुक्त, अनुशासित एवं आधुनिक शिक्षा का गौरवशाली केंद्र। नर्सरी से 12वीं तक (विज्ञान, वाणिज्य एवं कला संकाय) में सर्वांगीण विकास के लिए समर्पित।'
                  : 'A premier educational institution in Arkha, Raebareli, harmonizing traditional Bharatiya moral values with modern scientific education from Primary to Senior Secondary (Science, Commerce & Arts).'}
              </p>

              {/* 3 Main Action Buttons (Requirement #3) */}
              <div className="flex flex-wrap items-center justify-center lg:justify-start gap-4 pt-2">
                <Link
                  to="/admissions"
                  className="bg-gradient-to-r from-saffron-600 via-amber-600 to-saffron-700 hover:from-saffron-700 hover:to-amber-800 text-white font-bold px-6 py-3.5 rounded-lg shadow-lg hover:shadow-xl transition transform hover:-translate-y-0.5 text-sm uppercase tracking-wider flex items-center gap-2"
                >
                  <Sparkles className="w-4 h-4 text-amber-200" />
                  <span>{t('applyForAdmission')}</span>
                </Link>

                <Link
                  to="/contact"
                  className="bg-white/10 hover:bg-white/20 text-white border border-white/20 font-semibold px-6 py-3.5 rounded-lg transition backdrop-blur-sm text-sm uppercase tracking-wider flex items-center gap-2"
                >
                  <span>{t('contactSchool')}</span>
                </Link>

                <Link
                  to="/notices"
                  className="bg-slate-800 hover:bg-slate-700 text-amber-300 font-semibold px-5 py-3.5 rounded-lg transition border border-amber-500/30 text-sm flex items-center gap-2"
                >
                  <Bell className="w-4 h-4 text-amber-400" />
                  <span>{t('viewAllNotices')}</span>
                </Link>
              </div>

              {/* UP Board Affiliation Badge */}
              <div className="pt-2 text-xs text-slate-400 flex items-center justify-center lg:justify-start gap-2">
                <ShieldCheck className="w-4 h-4 text-amber-400" />
                <span>{t('affiliation')}</span>
              </div>
            </div>

            {/* Right Column: Hero Visual with Badge */}
            <div className="lg:col-span-5">
              <div className="relative mx-auto max-w-md lg:max-w-none">
                {/* Main Image Frame */}
                <div className="relative rounded-2xl overflow-hidden shadow-2xl border-4 border-amber-500/30 group">
                  <img
                    src="https://images.unsplash.com/photo-1562774053-701939374585?auto=format&fit=crop&q=80&w=1000"
                    alt="VSS Saraswati Vidya Mandir Campus"
                    className="w-full h-80 sm:h-96 object-cover transform group-hover:scale-105 transition duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent"></div>
                  
                  {/* Overlay Badge */}
                  <div className="absolute bottom-4 left-4 right-4 bg-slate-900/90 backdrop-blur-md p-4 rounded-xl border border-white/10 flex items-center justify-between">
                    <div>
                      <div className="text-amber-400 font-bold text-xs uppercase tracking-wider">
                        Arkha Campus • Raebareli
                      </div>
                      <div className="text-white font-semibold text-sm">
                        Inspiring Academic Excellence
                      </div>
                    </div>
                    <Link
                      to="/gallery"
                      className="bg-saffron-600 hover:bg-saffron-500 text-white p-2 rounded-lg transition text-xs font-semibold flex items-center gap-1"
                    >
                      <Eye className="w-4 h-4" />
                      <span>Tour</span>
                    </Link>
                  </div>
                </div>

                {/* Floating Achievement Badge */}
                <div className="absolute -top-4 -left-4 bg-amber-500 text-slate-950 px-4 py-2 rounded-xl shadow-xl font-bold text-xs flex items-center gap-2 border-2 border-white">
                  <Award className="w-4 h-4 text-slate-950" />
                  <span>100% UP Board Results</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Quick Action Hub for Students & Parents */}
      <section className="bg-white border-y border-slate-200 py-6 px-4 shadow-sm">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            <Link
              to="/results"
              className="p-4 rounded-xl bg-amber-50/70 hover:bg-amber-100 border border-amber-200 transition text-center group"
            >
              <div className="w-10 h-10 mx-auto rounded-full bg-saffron-600 text-white flex items-center justify-center mb-2 group-hover:scale-110 transition">
                <Award className="w-5 h-5" />
              </div>
              <h4 className="font-bold text-slate-900 text-xs sm:text-sm">Online Result Portal</h4>
              <p className="text-[11px] text-slate-600 mt-0.5">Check Scorecards Online</p>
            </Link>

            <Link
              to="/admissions"
              className="p-4 rounded-xl bg-blue-50/70 hover:bg-blue-100 border border-blue-200 transition text-center group"
            >
              <div className="w-10 h-10 mx-auto rounded-full bg-blue-600 text-white flex items-center justify-center mb-2 group-hover:scale-110 transition">
                <Sparkles className="w-5 h-5" />
              </div>
              <h4 className="font-bold text-slate-900 text-xs sm:text-sm">Admission Enquiry</h4>
              <p className="text-[11px] text-slate-600 mt-0.5">Apply for Session 2026-27</p>
            </Link>

            <Link
              to="/notices"
              className="p-4 rounded-xl bg-emerald-50/70 hover:bg-emerald-100 border border-emerald-200 transition text-center group"
            >
              <div className="w-10 h-10 mx-auto rounded-full bg-emerald-600 text-white flex items-center justify-center mb-2 group-hover:scale-110 transition">
                <Bell className="w-5 h-5" />
              </div>
              <h4 className="font-bold text-slate-900 text-xs sm:text-sm">Digital Notice Board</h4>
              <p className="text-[11px] text-slate-600 mt-0.5">Circulars & Announcements</p>
            </Link>

            <Link
              to="/downloads"
              className="p-4 rounded-xl bg-purple-50/70 hover:bg-purple-100 border border-purple-200 transition text-center group"
            >
              <div className="w-10 h-10 mx-auto rounded-full bg-purple-600 text-white flex items-center justify-center mb-2 group-hover:scale-110 transition">
                <FileText className="w-5 h-5" />
              </div>
              <h4 className="font-bold text-slate-900 text-xs sm:text-sm">School Downloads</h4>
              <p className="text-[11px] text-slate-600 mt-0.5">Syllabus & Timetables</p>
            </Link>
          </div>
        </div>
      </section>

      {/* Welcome & Principal's Message Section */}
      <section className="py-16 px-4 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-stretch">
          {/* Welcome & Introduction */}
          <div className="lg:col-span-7 bg-white p-6 sm:p-8 rounded-2xl shadow-sm border border-slate-200 flex flex-col justify-between">
            <div className="space-y-4">
              <div className="inline-flex items-center gap-1.5 text-saffron-700 font-bold text-xs uppercase tracking-wider">
                <BookOpen className="w-4 h-4" />
                <span>{lang === 'hi' ? 'विद्यालय परिचय' : 'About the Institution'}</span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 leading-snug">
                {lang === 'hi'
                  ? 'विद्या भारती के आदर्शों पर आधारित मूल्यपरक शिक्षा'
                  : 'Nurturing Character & Knowledge in Arkha, Raebareli'}
              </h2>
              <p className="text-slate-600 text-sm leading-relaxed">
                {lang === 'hi'
                  ? 'वि.सं.स्मा. सरस्वती विद्या मन्दिर इण्टर कॉलेज, अरखा, रायबरेली एक ऐसा पावन विद्या केंद्र है जो छात्रों में राष्ट्रभक्ति, अनुशासन, सदाचार एवं मानवीय संवेदनाओं का बीजारोपण करता है। यहाँ पारंपरिक वैदिक मूल्यों के साथ-साथ आधुनिक वैज्ञानिक, तकनीकी एवं वाणिज्यिक विषयों की गुणवत्तापूर्ण शिक्षा दी जाती है।'
                  : 'VSS Saraswati Vidya Mandir Inter College, Arkha, Raebareli is dedicated to cultivating moral integrity, discipline, patriotism, and scholastic brilliance. Our pedagogical approach integrates the celebrated Panchamukhi Shiksha model with modern STEM, computer science, and commerce curricula, ensuring our youth are equipped to lead in the 21st century.'}
              </p>

              {/* 4 Pillars of Vidya Mandir */}
              <div className="grid grid-cols-2 gap-3 pt-2">
                <div className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-saffron-600 flex-shrink-0 mt-0.5" />
                  <span className="text-xs font-semibold text-slate-800">
                    {lang === 'hi' ? 'संस्कारयुक्त वातावरण' : 'Value-Based Sanskar'}
                  </span>
                </div>
                <div className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-saffron-600 flex-shrink-0 mt-0.5" />
                  <span className="text-xs font-semibold text-slate-800">
                    {lang === 'hi' ? 'अनुभवी एवं समर्पित शिक्षक' : 'Dedicated Expert Faculty'}
                  </span>
                </div>
                <div className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-saffron-600 flex-shrink-0 mt-0.5" />
                  <span className="text-xs font-semibold text-slate-800">
                    {lang === 'hi' ? 'आधुनिक स्मार्ट प्रयोगशालाएं' : 'Modern Laboratories'}
                  </span>
                </div>
                <div className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-saffron-600 flex-shrink-0 mt-0.5" />
                  <span className="text-xs font-semibold text-slate-800">
                    {lang === 'hi' ? 'उत्कृष्ट बोर्ड परीक्षा परिणाम' : 'Consistent Board Toppers'}
                  </span>
                </div>
              </div>
            </div>

            <div className="pt-6 border-t border-slate-100 flex items-center justify-between">
              <Link
                to="/about"
                className="text-saffron-700 hover:text-saffron-800 font-bold text-xs uppercase tracking-wider flex items-center gap-1"
              >
                <span>{t('readMore')} About School</span>
                <ChevronRight className="w-4 h-4" />
              </Link>
            </div>
          </div>

          {/* Principal's Desk Card */}
          <div className="lg:col-span-5 bg-gradient-to-br from-amber-500/10 via-amber-500/5 to-white p-6 sm:p-8 rounded-2xl shadow-sm border border-amber-200/80 flex flex-col justify-between">
            <div>
              <div className="flex items-center gap-3 mb-4">
                <div className="w-16 h-16 rounded-full overflow-hidden border-2 border-saffron-600 shadow-md flex-shrink-0">
                  <img
                    src="https://images.unsplash.com/photo-1544717305-2782549b5136?auto=format&fit=crop&q=80&w=400"
                    alt="Principal"
                    className="w-full h-full object-cover"
                  />
                </div>
                <div>
                  <h3 className="font-bold text-slate-900 text-sm sm:text-base">
                    {settings?.principalName || 'Dr. [Principal Name - Editable in Admin]'}
                  </h3>
                  <p className="text-xs text-saffron-700 font-semibold">
                    Principal / प्रधानाचार्य
                  </p>
                  <p className="text-[11px] text-slate-500">
                    VSS Saraswati Vidya Mandir Inter College
                  </p>
                </div>
              </div>

              <div className="relative">
                <Quote className="w-8 h-8 text-amber-300/60 absolute -top-2 -left-2 -z-0" />
                <p className="text-xs text-slate-700 italic leading-relaxed relative z-10 pl-2 border-l-2 border-saffron-500 my-2">
                  {lang === 'hi'
                    ? (settings?.principalMessageHindi || 'वि.सं.स्मा. सरस्वती विद्या मन्दिर इण्टर कॉलेज, अरखा में आपका हार्दिक स्वागत है। हमारा उद्देश्य विद्यार्थियों को केवल किताबी ज्ञान देना नहीं, बल्कि उनके चरित्र का निर्माण कर राष्ट्र सेवा के लिए योग्य नागरिक बनाना है।')
                    : (settings?.principalMessage || 'Welcome to VSS Saraswati Vidya Mandir Inter College, Arkha. We strive to instill both spiritual grounding and contemporary academic mastery in every student, paving the pathway to a distinguished future.')}
                </p>
              </div>
            </div>

            <div className="pt-4 border-t border-amber-200/60 flex items-center justify-between">
              <span className="text-[11px] font-hindi font-semibold text-slate-600">
                विद्या भारती संस्कृति
              </span>
              <Link
                to="/about"
                className="text-xs font-bold text-saffron-700 hover:underline"
              >
                Full Message →
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Stats & Achievements Counter */}
      <section className="bg-gradient-to-r from-navy-950 via-slate-900 to-navy-950 text-white py-12 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
            <div className="p-4 rounded-xl bg-white/5 border border-white/10">
              <div className="text-3xl sm:text-4xl font-extrabold text-amber-400">100%</div>
              <div className="text-xs sm:text-sm font-medium text-slate-300 mt-1">UP Board Pass Rate</div>
            </div>
            <div className="p-4 rounded-xl bg-white/5 border border-white/10">
              <div className="text-3xl sm:text-4xl font-extrabold text-amber-400">25+</div>
              <div className="text-xs sm:text-sm font-medium text-slate-300 mt-1">Qualified Acharyas / Faculty</div>
            </div>
            <div className="p-4 rounded-xl bg-white/5 border border-white/10">
              <div className="text-3xl sm:text-4xl font-extrabold text-amber-400">1,500+</div>
              <div className="text-xs sm:text-sm font-medium text-slate-300 mt-1">Enrolled Students</div>
            </div>
            <div className="p-4 rounded-xl bg-white/5 border border-white/10">
              <div className="text-3xl sm:text-4xl font-extrabold text-amber-400">3 Streams</div>
              <div className="text-xs sm:text-sm font-medium text-slate-300 mt-1">Science • Commerce • Arts</div>
            </div>
          </div>
        </div>
      </section>

      {/* Dynamic Notices & Upcoming Events Side-by-Side */}
      <section className="py-16 px-4 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Important Announcements (Requirement #3) */}
          <div className="lg:col-span-7 bg-white rounded-2xl p-6 sm:p-8 shadow-sm border border-slate-200">
            <div className="flex items-center justify-between mb-6 border-b border-slate-100 pb-4">
              <div className="flex items-center gap-2">
                <Bell className="w-5 h-5 text-saffron-600" />
                <h3 className="font-bold text-slate-900 text-lg">
                  {t('importantAnnouncements')}
                </h3>
              </div>
              <Link
                to="/notices"
                className="text-xs font-bold text-saffron-700 hover:text-saffron-800 hover:underline flex items-center gap-1"
              >
                <span>{t('viewAllNotices')}</span>
                <ChevronRight className="w-4 h-4" />
              </Link>
            </div>

            <div className="space-y-4">
              {notices.map((notice) => (
                <div
                  key={notice.id}
                  className="p-4 rounded-xl bg-slate-50 hover:bg-amber-50/50 border border-slate-200/80 transition flex items-start justify-between gap-4 group"
                >
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <span className="text-[10px] font-bold uppercase px-2 py-0.5 rounded bg-saffron-100 text-saffron-800">
                        {notice.category}
                      </span>
                      {notice.isImportant && (
                        <span className="text-[10px] font-bold uppercase px-2 py-0.5 rounded bg-red-100 text-red-700 animate-pulse">
                          Important
                        </span>
                      )}
                      <span className="text-[11px] text-slate-400 font-medium">
                        {notice.date}
                      </span>
                    </div>
                    <h4 className="font-semibold text-slate-900 text-xs sm:text-sm group-hover:text-saffron-700 transition">
                      {notice.title}
                    </h4>
                    <p className="text-xs text-slate-500 line-clamp-1">
                      {notice.description}
                    </p>
                  </div>

                  <Link
                    to="/notices"
                    className="flex-shrink-0 text-slate-400 group-hover:text-saffron-600 transition"
                  >
                    <ChevronRight className="w-5 h-5" />
                  </Link>
                </div>
              ))}
            </div>
          </div>

          {/* Upcoming Events (Requirement #3) */}
          <div className="lg:col-span-5 bg-white rounded-2xl p-6 sm:p-8 shadow-sm border border-slate-200">
            <div className="flex items-center justify-between mb-6 border-b border-slate-100 pb-4">
              <div className="flex items-center gap-2">
                <Calendar className="w-5 h-5 text-saffron-600" />
                <h3 className="font-bold text-slate-900 text-lg">
                  {t('upcomingEvents')}
                </h3>
              </div>
              <Link
                to="/events"
                className="text-xs font-bold text-saffron-700 hover:text-saffron-800 hover:underline flex items-center gap-1"
              >
                <span>{t('viewAllEvents')}</span>
                <ChevronRight className="w-4 h-4" />
              </Link>
            </div>

            <div className="space-y-4">
              {events.map((evt) => (
                <div
                  key={evt.id}
                  className="flex items-start gap-3 p-3 rounded-xl border border-slate-100 hover:border-amber-200 hover:bg-amber-50/30 transition"
                >
                  <div className="w-14 h-14 rounded-xl bg-saffron-700 text-white flex flex-col items-center justify-center flex-shrink-0 font-bold shadow-sm">
                    <span className="text-[10px] uppercase tracking-wider">{evt.date?.split('-')[1] || 'OCT'}</span>
                    <span className="text-base leading-none">{evt.date?.split('-')[2] || '20'}</span>
                  </div>
                  <div>
                    <span className="text-[10px] font-semibold text-amber-700 bg-amber-100 px-2 py-0.5 rounded">
                      {evt.category}
                    </span>
                    <h4 className="font-semibold text-slate-900 text-xs sm:text-sm mt-1">
                      {evt.title}
                    </h4>
                    <p className="text-[11px] text-slate-500 mt-0.5">
                      {evt.location} • {evt.time}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Facilities Preview Showcase (Requirement #3 & #12) */}
      <section className="py-16 px-4 bg-slate-100 border-t border-slate-200">
        <div className="max-w-7xl mx-auto">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <span className="text-saffron-700 font-bold text-xs uppercase tracking-wider">
              World-Class Infrastructure
            </span>
            <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 mt-1">
              {lang === 'hi' ? 'विद्यालय की प्रमुख सुविधाएं' : 'School Infrastructure & Facilities'}
            </h2>
            <p className="text-slate-600 text-xs sm:text-sm mt-2">
              Providing an enabling, secure, and technologically advanced learning ecosystem in Arkha.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {facilities.map((fac) => (
              <div
                key={fac.id}
                className="bg-white rounded-xl overflow-hidden shadow-sm border border-slate-200 card-hover-effect flex flex-col justify-between"
              >
                <div className="h-44 overflow-hidden relative">
                  <img
                    src={fac.image}
                    alt={fac.title}
                    className="w-full h-full object-cover hover:scale-105 transition duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-900/60 to-transparent"></div>
                  <h4 className="absolute bottom-3 left-3 right-3 text-white font-bold text-sm">
                    {fac.title}
                  </h4>
                </div>
                <div className="p-4 flex-1 flex flex-col justify-between">
                  <p className="text-xs text-slate-600 line-clamp-3">
                    {fac.description}
                  </p>
                  <div className="mt-4 pt-2 border-t border-slate-100">
                    <Link
                      to="/facilities"
                      className="text-xs font-semibold text-saffron-700 hover:underline flex items-center gap-1"
                    >
                      <span>Explore details</span>
                      <ChevronRight className="w-3.5 h-3.5" />
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="text-center mt-10">
            <Link
              to="/facilities"
              className="inline-flex items-center gap-2 bg-slate-900 hover:bg-slate-800 text-white font-semibold px-6 py-3 rounded-lg text-xs uppercase tracking-wider transition"
            >
              <span>View All School Facilities</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* Photo Gallery Teaser (Requirement #3 & #10) */}
      <section className="py-16 px-4 max-w-7xl mx-auto">
        <div className="flex flex-col sm:flex-row items-center justify-between mb-8 gap-4">
          <div>
            <span className="text-saffron-700 font-bold text-xs uppercase tracking-wider">
              Life at VSS SVM
            </span>
            <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 mt-1">
              {lang === 'hi' ? 'चित्र वीथिका एवं झलकियां' : 'Campus Photo Gallery'}
            </h2>
          </div>
          <Link
            to="/gallery"
            className="text-saffron-700 hover:text-saffron-800 font-bold text-xs uppercase tracking-wider flex items-center gap-1"
          >
            <span>View Full Gallery</span>
            <ChevronRight className="w-4 h-4" />
          </Link>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {gallery.map((item) => (
            <Link
              key={item.id}
              to="/gallery"
              className="group relative h-48 sm:h-56 rounded-xl overflow-hidden shadow-sm"
            >
              <img
                src={item.image}
                alt={item.title}
                className="w-full h-full object-cover group-hover:scale-110 transition duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition duration-300 flex flex-col justify-end p-4 text-white">
                <span className="text-[10px] text-amber-300 font-semibold">{item.album}</span>
                <h4 className="font-bold text-xs sm:text-sm">{item.title}</h4>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* Admission Enquiry Banner (Requirement #2 & #6) */}
      <section className="bg-gradient-to-r from-saffron-700 via-amber-600 to-saffron-800 text-white py-14 px-4">
        <div className="max-w-5xl mx-auto text-center space-y-4">
          <div className="inline-block bg-white/20 text-white px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wider">
            Admissions 2026-2027 Open
          </div>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold">
            Secure Your Child's Future with Value-Based Education
          </h2>
          <p className="text-amber-100 text-xs sm:text-sm max-w-2xl mx-auto">
            Join VSS Saraswati Vidya Mandir Inter College, Arkha. Experienced educators, modern laboratories, and deep Bharatiya sanskar await.
          </p>
          <div className="pt-2 flex flex-wrap justify-center gap-4">
            <Link
              to="/admissions"
              className="bg-white text-saffron-800 hover:bg-amber-50 font-bold px-6 py-3 rounded-lg shadow-lg text-xs uppercase tracking-wider transition"
            >
              {t('applyForAdmission')} Now
            </Link>
            <Link
              to="/contact"
              className="bg-slate-950/40 hover:bg-slate-950/60 border border-white/30 text-white font-semibold px-6 py-3 rounded-lg text-xs uppercase tracking-wider transition"
            >
              {t('contactSchool')}
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};
