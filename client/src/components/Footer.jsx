import React from 'react';
import { Link } from 'react-router-dom';
import { useLanguage } from '../context/LanguageContext';
import {
  MapPin,
  Phone,
  Mail,
  Clock,
  ExternalLink,
  ChevronRight,
  ShieldCheck,
  Award,
  BookOpen,
  Calendar,
  FileText
} from 'lucide-react';

export const Footer = () => {
  const { lang, t } = useLanguage();

  return (
    <footer className="bg-slate-950 text-slate-300 border-t-4 border-saffron-600">
      {/* Top Value Banner */}
      <div className="bg-gradient-to-r from-saffron-700 via-amber-600 to-saffron-800 text-white py-4 px-4 shadow-inner">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4 text-center md:text-left">
          <div className="flex items-center gap-3">
            <span className="p-2 bg-white/20 rounded-full">
              <Award className="w-5 h-5 text-amber-200" />
            </span>
            <div>
              <h4 className="font-hindi font-bold text-base md:text-lg">
                "सा विद्या या विमुक्तये" — {t('tagline')}
              </h4>
              <p className="text-xs text-amber-100">
                {lang === 'hi'
                  ? 'भारतीय संस्कृति, अनुशासन एवं आधुनिक शिक्षा का उत्कृष्ट संगम।'
                  : 'Nurturing holistic development, character, and academic brilliance.'}
              </p>
            </div>
          </div>
          <Link
            to="/admissions"
            className="bg-white text-saffron-800 hover:bg-amber-100 font-bold px-5 py-2 rounded-lg text-xs uppercase tracking-wider transition shadow-md whitespace-nowrap"
          >
            {t('applyForAdmission')} 2026-27
          </Link>
        </div>
      </div>

      {/* Main Footer Links */}
      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Col 1: About School */}
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <img src="/logo.svg" alt="VSS SVM Logo" className="w-12 h-12 object-contain" />
              <div>
                <h3 className="font-bold text-white text-sm leading-snug">
                  VSS Saraswati Vidya Mandir Inter College
                </h3>
                <p className="text-xs text-saffron-400 font-hindi">
                  वि.सं.स्मा. सरस्वती विद्या मन्दिर इण्टर कॉलेज
                </p>
              </div>
            </div>
            <p className="text-xs text-slate-400 leading-relaxed">
              {lang === 'hi'
                ? 'अरखा, रायबरेली स्थित एक प्रतिष्ठित शिक्षण संस्थान जहाँ छात्र-छात्राओं को उत्तम संस्कार, राष्ट्रप्रेम एवं उत्कृष्ट शैक्षणिक मार्गदर्शन प्रदान किया जाता है।'
                : 'A distinguished educational institution located in Arkha, Raebareli, dedicated to imparting high moral values, patriotic ethos, and academic excellence under the UP Board.'}
            </p>
            <div className="pt-2 text-xs text-slate-400">
              <span className="font-semibold text-slate-200">College Code:</span> [Editable in Admin]
            </div>
            {/* Social Links */}
            <div className="flex items-center gap-3 pt-2">
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noreferrer"
                className="w-8 h-8 rounded-full bg-slate-800 hover:bg-blue-600 flex items-center justify-center text-white transition text-xs font-bold"
                title="Facebook"
              >
                f
              </a>
              <a
                href="https://youtube.com"
                target="_blank"
                rel="noreferrer"
                className="w-8 h-8 rounded-full bg-slate-800 hover:bg-red-600 flex items-center justify-center text-white transition text-xs font-bold"
                title="YouTube"
              >
                ▶
              </a>
              <a
                href="https://twitter.com"
                target="_blank"
                rel="noreferrer"
                className="w-8 h-8 rounded-full bg-slate-800 hover:bg-sky-500 flex items-center justify-center text-white transition text-xs font-bold"
                title="Twitter / X"
              >
                𝕏
              </a>
            </div>
          </div>

          {/* Col 2: Quick Links */}
          <div>
            <h4 className="text-sm font-bold text-white uppercase tracking-wider mb-4 border-b border-slate-800 pb-2 flex items-center gap-2">
              <ChevronRight className="w-4 h-4 text-saffron-500" />
              <span>{t('quickLinks')}</span>
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <Link to="/" className="hover:text-saffron-400 transition flex items-center gap-1.5">
                  <span className="text-saffron-500">›</span> {t('navHome')}
                </Link>
              </li>
              <li>
                <Link to="/about" className="hover:text-saffron-400 transition flex items-center gap-1.5">
                  <span className="text-saffron-500">›</span> {t('navAbout')}
                </Link>
              </li>
              <li>
                <Link to="/academics" className="hover:text-saffron-400 transition flex items-center gap-1.5">
                  <span className="text-saffron-500">›</span> {t('navAcademics')}
                </Link>
              </li>
              <li>
                <Link to="/admissions" className="hover:text-saffron-400 transition flex items-center gap-1.5">
                  <span className="text-saffron-500">›</span> {t('navAdmissions')}
                </Link>
              </li>
              <li>
                <Link to="/faculty" className="hover:text-saffron-400 transition flex items-center gap-1.5">
                  <span className="text-saffron-500">›</span> {t('navFaculty')}
                </Link>
              </li>
              <li>
                <Link to="/facilities" className="hover:text-saffron-400 transition flex items-center gap-1.5">
                  <span className="text-saffron-500">›</span> {t('navFacilities')}
                </Link>
              </li>
              <li>
                <Link to="/gallery" className="hover:text-saffron-400 transition flex items-center gap-1.5">
                  <span className="text-saffron-500">›</span> {t('navGallery')}
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 3: Student & Parent Corner */}
          <div>
            <h4 className="text-sm font-bold text-white uppercase tracking-wider mb-4 border-b border-slate-800 pb-2 flex items-center gap-2">
              <ChevronRight className="w-4 h-4 text-saffron-500" />
              <span>Student / Parent Corner</span>
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <Link to="/notices" className="hover:text-saffron-400 transition flex items-center gap-1.5">
                  <span className="text-saffron-500">›</span> {t('navNotices')}
                </Link>
              </li>
              <li>
                <Link to="/events" className="hover:text-saffron-400 transition flex items-center gap-1.5">
                  <span className="text-saffron-500">›</span> {t('navEvents')}
                </Link>
              </li>
              <li>
                <Link to="/results" className="hover:text-amber-400 font-semibold transition flex items-center gap-1.5 text-amber-300">
                  <span className="text-amber-400">★</span> {t('checkResult')}
                </Link>
              </li>
              <li>
                <Link to="/downloads" className="hover:text-saffron-400 transition flex items-center gap-1.5">
                  <span className="text-saffron-500">›</span> {t('navDownloads')}
                </Link>
              </li>
              <li>
                <Link to="/admissions" className="hover:text-saffron-400 transition flex items-center gap-1.5">
                  <span className="text-saffron-500">›</span> Admission Enquiry Form
                </Link>
              </li>
              <li>
                <a
                  href="https://upmsp.edu.in"
                  target="_blank"
                  rel="noreferrer"
                  className="hover:text-saffron-400 transition flex items-center gap-1.5 text-slate-400"
                >
                  <ExternalLink className="w-3 h-3 text-slate-500" /> UP Board Official Portal (UPMSP)
                </a>
              </li>
            </ul>
          </div>

          {/* Col 4: School Contact Information */}
          <div className="space-y-3">
            <h4 className="text-sm font-bold text-white uppercase tracking-wider mb-4 border-b border-slate-800 pb-2 flex items-center gap-2">
              <ChevronRight className="w-4 h-4 text-saffron-500" />
              <span>{t('contactInformation')}</span>
            </h4>

            <div className="flex items-start gap-2.5 text-xs">
              <MapPin className="w-4 h-4 text-saffron-500 flex-shrink-0 mt-0.5" />
              <span>Arkha, Salon - Raebareli Road, Raebareli, Uttar Pradesh - 229404</span>
            </div>

            <div className="flex items-center gap-2.5 text-xs">
              <Phone className="w-4 h-4 text-saffron-500 flex-shrink-0" />
              <span>+91 94XXXXXXXX (Add School Phone Number)</span>
            </div>

            <div className="flex items-center gap-2.5 text-xs">
              <Mail className="w-4 h-4 text-saffron-500 flex-shrink-0" />
              <span>info@vsssvm.edu.in</span>
            </div>

            <div className="flex items-start gap-2.5 text-xs text-slate-400">
              <Clock className="w-4 h-4 text-saffron-500 flex-shrink-0 mt-0.5" />
              <span>Summer: 7:30 AM - 1:30 PM<br />Winter: 8:30 AM - 2:30 PM</span>
            </div>

            <div className="pt-2">
              <Link
                to="/contact"
                className="inline-block bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs px-3 py-1.5 rounded transition"
              >
                View Location Map & Enquiry →
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Copyright Strip */}
      <div className="bg-slate-900 border-t border-slate-800 py-4 px-4 text-xs text-slate-500">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-2 text-center sm:text-left">
          <div>
            © {new Date().getFullYear()} VSS Saraswati Vidya Mandir Inter College, Arkha, Raebareli. All Rights Reserved.
          </div>
          <div className="flex items-center gap-4 text-slate-400 text-xs">
            <span>Affiliation: UPMSP Prayagraj</span>
            <span>•</span>
            <Link to="/admin/login" className="hover:text-amber-400 transition">
              Staff / Admin Portal
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};
