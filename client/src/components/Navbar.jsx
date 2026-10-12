import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useLanguage } from '../context/LanguageContext';
import {
  Phone,
  Mail,
  Globe,
  Menu,
  X,
  GraduationCap,
  Sparkles,
  Lock,
  ChevronDown,
  FileText,
  Award,
  BookOpen
} from 'lucide-react';

export const Navbar = () => {
  const { lang, toggleLanguage, t } = useLanguage();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 40);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile menu on route change
  useEffect(() => {
    setMobileMenuOpen(false);
  }, [location.pathname]);

  const navLinks = [
    { name: t('navHome'), path: '/' },
    { name: t('navAbout'), path: '/about' },
    { name: t('navAcademics'), path: '/academics' },
    { name: t('navAdmissions'), path: '/admissions' },
    { name: t('navFaculty'), path: '/faculty' },
    { name: t('navFacilities'), path: '/facilities' },
    { name: t('navGallery'), path: '/gallery' },
    { name: t('navNotices'), path: '/notices' },
    { name: t('navEvents'), path: '/events' },
    { name: t('navResults'), path: '/results' },
    { name: t('navDownloads'), path: '/downloads' },
    { name: t('navContact'), path: '/contact' },
  ];

  const isActive = (path) => {
    if (path === '/') return location.pathname === '/';
    return location.pathname.startsWith(path);
  };

  return (
    <header className="sticky top-0 z-50 w-full shadow-md transition-all duration-200">
      {/* Top Bar */}
      <div className="bg-gradient-to-r from-slate-900 via-navy-900 to-slate-900 text-slate-200 text-xs py-2 px-4 border-b border-saffron-600/30">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-2">
          {/* Left: Contact Info & Affiliation */}
          <div className="flex flex-wrap items-center gap-4 sm:gap-6">
            <div className="flex items-center gap-1.5 text-slate-300">
              <Phone className="w-3.5 h-3.5 text-saffron-400" />
              <span>+91 94XXXXXXXX (Add School Phone)</span>
            </div>
            <div className="hidden md:flex items-center gap-1.5 text-slate-300">
              <Mail className="w-3.5 h-3.5 text-saffron-400" />
              <span>info@vsssvm.edu.in</span>
            </div>
            <div className="hidden lg:flex items-center gap-1.5 text-amber-300 font-medium bg-amber-950/60 px-2.5 py-0.5 rounded border border-amber-500/30">
              <GraduationCap className="w-3.5 h-3.5" />
              <span>UP Board College Code: [Editable in Admin]</span>
            </div>
          </div>

          {/* Right: Language Switcher, Motto & Admin Link */}
          <div className="flex items-center gap-3 sm:gap-4 ml-auto">
            <span className="hidden sm:inline font-hindi text-amber-200 text-xs tracking-wide">
              "सा विद्या या विमुक्तये"
            </span>

            {/* Language Switch Button */}
            <button
              onClick={toggleLanguage}
              className="flex items-center gap-1.5 bg-saffron-600 hover:bg-saffron-500 text-white font-medium px-2.5 py-1 rounded text-xs transition shadow-sm active:scale-95"
              title="Toggle Hindi / English"
            >
              <Globe className="w-3.5 h-3.5" />
              <span>{lang === 'en' ? 'हिन्दी में देखें' : 'View in English'}</span>
            </button>

            {/* Admin Login Link */}
            <Link
              to="/admin/login"
              className="flex items-center gap-1 text-slate-400 hover:text-white transition px-2 py-0.5 rounded hover:bg-slate-800"
              title="Admin Control Panel"
            >
              <Lock className="w-3 h-3 text-saffron-400" />
              <span className="hidden sm:inline">{t('navAdminLogin')}</span>
            </Link>
          </div>
        </div>
      </div>

      {/* Main Branding & Navigation Header */}
      <div className={`bg-white transition-all duration-300 ${scrolled ? 'py-2 shadow-lg' : 'py-3'}`}>
        <div className="max-w-7xl mx-auto px-4 flex items-center justify-between gap-4">
          {/* Logo & School Name */}
          <Link to="/" className="flex items-center gap-3 group">
            <div className="relative w-12 h-12 sm:w-14 sm:h-14 flex-shrink-0">
              <img
                src="/logo.svg"
                alt="VSS Saraswati Vidya Mandir Crest"
                className="w-full h-full object-contain filter drop-shadow-sm group-hover:scale-105 transition duration-300"
              />
            </div>
            <div>
              <div className="font-hindi font-bold text-sm sm:text-base md:text-lg text-saffron-700 leading-tight">
                {lang === 'hi' ? 'वि.सं.स्मा. सरस्वती विद्या मन्दिर इण्टर कॉलेज' : 'VSS Saraswati Vidya Mandir Inter College'}
              </div>
              <div className="text-xs sm:text-sm font-semibold text-slate-800 tracking-wide uppercase">
                {lang === 'hi' ? 'अरखा, रायबरेली, उत्तर प्रदेश' : 'Arkha, Raebareli, Uttar Pradesh'}
              </div>
              <div className="hidden sm:block text-[10px] text-slate-500 font-medium">
                {t('tagline')} • {t('affiliation')}
              </div>
            </div>
          </Link>

          {/* Prominent Action Button for Desktop */}
          <div className="hidden xl:flex items-center gap-3">
            <Link
              to="/admissions"
              className="inline-flex items-center gap-2 bg-gradient-to-r from-saffron-600 via-amber-600 to-saffron-700 hover:from-saffron-700 hover:to-amber-800 text-white font-bold px-4 py-2.5 rounded-lg shadow-md hover:shadow-lg transition duration-200 transform hover:-translate-y-0.5 text-sm uppercase tracking-wider"
            >
              <Sparkles className="w-4 h-4 text-amber-200 animate-pulse" />
              <span>{t('btnAdmissionEnquiry')}</span>
            </Link>
          </div>

          {/* Mobile Menu Hamburger Button */}
          <div className="flex items-center gap-2 xl:hidden">
            <Link
              to="/admissions"
              className="bg-saffron-600 text-white font-semibold text-xs px-3 py-1.5 rounded-md hover:bg-saffron-700"
            >
              {t('btnAdmissionEnquiry')}
            </Link>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-lg text-slate-700 hover:text-saffron-700 hover:bg-slate-100 focus:outline-none"
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Navigation Bar (Desktop Sticky Strip) */}
      <nav className="hidden xl:block bg-gradient-to-r from-navy-950 via-slate-900 to-navy-950 text-white border-t border-saffron-600/30">
        <div className="max-w-7xl mx-auto px-4 flex items-center justify-between">
          <ul className="flex items-center flex-wrap gap-1 py-1">
            {navLinks.map((link) => (
              <li key={link.path}>
                <Link
                  to={link.path}
                  className={`px-3 py-2 rounded text-xs uppercase tracking-wider font-semibold transition duration-150 inline-block ${
                    isActive(link.path)
                      ? 'bg-saffron-600 text-white shadow-inner font-bold'
                      : 'text-slate-200 hover:text-white hover:bg-slate-800/80'
                  }`}
                >
                  {link.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </nav>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="xl:hidden bg-slate-900 text-white border-t border-saffron-600/30 px-4 pt-3 pb-6 shadow-2xl animate-fadeIn">
          <div className="grid grid-cols-2 gap-2 mb-4">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={`px-3 py-2 rounded text-xs font-semibold ${
                  isActive(link.path)
                    ? 'bg-saffron-600 text-white font-bold'
                    : 'text-slate-300 hover:bg-slate-800'
                }`}
              >
                {link.name}
              </Link>
            ))}
          </div>

          <div className="pt-3 border-t border-slate-800 flex flex-col gap-2">
            <Link
              to="/admissions"
              className="w-full text-center bg-gradient-to-r from-saffron-600 to-amber-600 text-white font-bold py-2.5 rounded-lg text-sm"
            >
              {t('btnAdmissionEnquiry')}
            </Link>
            <div className="flex items-center justify-between text-xs text-slate-400 pt-2 px-1">
              <span>{t('affiliation')}</span>
              <button
                onClick={toggleLanguage}
                className="text-amber-400 font-semibold underline"
              >
                {lang === 'en' ? 'हिन्दी में देखें' : 'View in English'}
              </button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};
