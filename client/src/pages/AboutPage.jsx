import React, { useState, useEffect } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { api } from '../services/api';
import {
  BookOpen,
  Target,
  Compass,
  Award,
  Heart,
  ShieldCheck,
  CheckCircle,
  Quote,
  Sparkles,
  Users
} from 'lucide-react';

export const AboutPage = () => {
  const { lang, t } = useLanguage();
  const [settings, setSettings] = useState(null);

  useEffect(() => {
    const fetchSettings = async () => {
      try {
        const res = await api.getSettings();
        if (res.success) setSettings(res.data);
      } catch (err) {
        console.warn('Failed to fetch settings:', err.message);
      }
    };
    fetchSettings();
  }, []);

  return (
    <div className="bg-slate-50 min-h-screen py-10 px-4">
      <div className="max-w-7xl mx-auto space-y-12">
        {/* Page Banner Header */}
        <div className="bg-gradient-to-r from-slate-900 via-navy-950 to-slate-900 text-white rounded-2xl p-8 sm:p-12 shadow-md relative overflow-hidden">
          <div className="max-w-3xl relative z-10 space-y-3">
            <span className="text-amber-400 font-bold text-xs uppercase tracking-wider">
              {lang === 'hi' ? 'हमारे विषय में' : 'About Our College'}
            </span>
            <h1 className="text-2xl sm:text-4xl font-extrabold leading-tight">
              {lang === 'hi'
                ? 'वि.सं.स्मा. सरस्वती विद्या मन्दिर इण्टर कॉलेज, अरखा'
                : 'VSS Saraswati Vidya Mandir Inter College, Arkha'}
            </h1>
            <p className="text-slate-300 text-xs sm:text-sm">
              Raebareli, Uttar Pradesh • Affiliated to UP Madhyamik Shiksha Parishad (UP Board), Prayagraj
            </p>
          </div>
          <div className="absolute right-0 bottom-0 opacity-10 pointer-events-none p-6">
            <img src="/logo.svg" alt="Crest" className="w-64 h-64" />
          </div>
        </div>

        {/* School Introduction & History */}
        <section className="bg-white p-6 sm:p-10 rounded-2xl shadow-sm border border-slate-200 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          <div className="lg:col-span-7 space-y-4">
            <div className="inline-flex items-center gap-2 text-saffron-700 font-bold text-xs uppercase tracking-wider">
              <Compass className="w-4 h-4" />
              <span>Foundation & Heritage</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold text-slate-900">
              {lang === 'hi' ? 'विद्यालय का इतिहास एवं परिचय' : 'Our Glorious History & Introduction'}
            </h2>
            <p className="text-slate-600 text-xs sm:text-sm leading-relaxed">
              VSS Saraswati Vidya Mandir Inter College was established in Arkha, Raebareli, with the sacred objective of delivering high-quality education rooted in Bharatiya sanskar to rural and semi-urban learners. Inspired by the Vidya Bharati philosophy, the institution has blossomed into one of the most trusted and respected senior secondary colleges in the district.
            </p>
            <p className="text-slate-600 text-xs sm:text-sm leading-relaxed">
              Over the years, the institution has continually upgraded its pedagogical frameworks, setting up interactive digital classrooms, comprehensive Physics, Chemistry, and Biology laboratories, and a dedicated computer center—all while keeping students steeped in moral rectitude, patriotism, and social responsibility.
            </p>
          </div>
          <div className="lg:col-span-5">
            <div className="rounded-xl overflow-hidden shadow-lg border-2 border-amber-500/30">
              <img
                src="https://images.unsplash.com/photo-1544717302-de2939b7ef71?auto=format&fit=crop&q=80&w=800"
                alt="School Campus Arkha"
                className="w-full h-72 object-cover"
              />
            </div>
          </div>
        </section>

        {/* Vision & Mission */}
        <section className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Vision */}
          <div className="bg-white p-8 rounded-2xl shadow-sm border-t-4 border-saffron-600 space-y-4">
            <div className="w-12 h-12 rounded-xl bg-saffron-100 text-saffron-800 flex items-center justify-center font-bold">
              <Target className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-bold text-slate-900">
              {lang === 'hi' ? 'हमारा दृष्टिकोण (Our Vision)' : 'Our Vision'}
            </h3>
            <p className="text-slate-600 text-xs sm:text-sm leading-relaxed">
              To cultivate an educational sanctuary where students realize their highest intellectual potential, possess unwavering moral rectitude, develop scientific temper, and remain passionately committed to the welfare and cultural prestige of the nation.
            </p>
          </div>

          {/* Mission */}
          <div className="bg-white p-8 rounded-2xl shadow-sm border-t-4 border-navy-700 space-y-4">
            <div className="w-12 h-12 rounded-xl bg-blue-100 text-navy-800 flex items-center justify-center font-bold">
              <Compass className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-bold text-slate-900">
              {lang === 'hi' ? 'हमारा ध्येय (Our Mission)' : 'Our Mission'}
            </h3>
            <p className="text-slate-600 text-xs sm:text-sm leading-relaxed">
              To provide comprehensive, accessible, and value-based education from Bal Vatika to Class 12 (Science, Commerce, Arts), fostering holistic development—physical, mental, intellectual, moral, and spiritual—under the guidance of dedicated mentors.
            </p>
          </div>
        </section>

        {/* Institutional Objectives */}
        <section className="bg-white p-8 sm:p-10 rounded-2xl shadow-sm border border-slate-200">
          <div className="text-center max-w-2xl mx-auto mb-8">
            <span className="text-saffron-700 font-bold text-xs uppercase tracking-wider">
              Guiding Principles
            </span>
            <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 mt-1">
              {lang === 'hi' ? 'संस्थान के मुख्य उद्देश्य' : 'Institutional Objectives'}
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="p-4 rounded-xl bg-amber-50/50 border border-amber-200/80 space-y-2">
              <CheckCircle className="w-5 h-5 text-saffron-700" />
              <h4 className="font-bold text-slate-900 text-sm">Academic Mastery</h4>
              <p className="text-xs text-slate-600">
                Consistently achieving exemplary results in UP Board High School and Intermediate examinations through disciplined study and regular assessments.
              </p>
            </div>

            <div className="p-4 rounded-xl bg-blue-50/50 border border-blue-200/80 space-y-2">
              <CheckCircle className="w-5 h-5 text-blue-700" />
              <h4 className="font-bold text-slate-900 text-sm">Character & Sanskar</h4>
              <p className="text-xs text-slate-600">
                Inculcating truthfulness, discipline, respect for elders, humility, and unwavering loyalty to societal harmony and national progress.
              </p>
            </div>

            <div className="p-4 rounded-xl bg-emerald-50/50 border border-emerald-200/80 space-y-2">
              <CheckCircle className="w-5 h-5 text-emerald-700" />
              <h4 className="font-bold text-slate-900 text-sm">Scientific Temper</h4>
              <p className="text-xs text-slate-600">
                Stimulating critical inquiry, hands-on experimentation, coding proficiency, and environmental awareness through modern labs.
              </p>
            </div>

            <div className="p-4 rounded-xl bg-purple-50/50 border border-purple-200/80 space-y-2">
              <CheckCircle className="w-5 h-5 text-purple-700" />
              <h4 className="font-bold text-slate-900 text-sm">Physical Health & Yoga</h4>
              <p className="text-xs text-slate-600">
                Daily Pranayama, Yogic asanas, athletics, martial sports, and physical training to build strong, resilient bodies.
              </p>
            </div>

            <div className="p-4 rounded-xl bg-rose-50/50 border border-rose-200/80 space-y-2">
              <CheckCircle className="w-5 h-5 text-rose-700" />
              <h4 className="font-bold text-slate-900 text-sm">Cultural & Arts Expression</h4>
              <p className="text-xs text-slate-600">
                Celebration of Indian festivals, Sanskrit chanting, music, drama, public speaking, and patriotic exhibitions.
              </p>
            </div>

            <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-2">
              <CheckCircle className="w-5 h-5 text-slate-700" />
              <h4 className="font-bold text-slate-900 text-sm">Inclusive Rural Empowerment</h4>
              <p className="text-xs text-slate-600">
                Ensuring quality education remains affordable and accessible for every deserving girl child and boy across Arkha and surrounding regions.
              </p>
            </div>
          </div>
        </section>

        {/* Educational Philosophy (Panchamukhi Shiksha) */}
        <section className="bg-gradient-to-br from-amber-500/10 via-amber-500/5 to-white p-8 sm:p-10 rounded-2xl shadow-sm border border-amber-300">
          <div className="max-w-3xl mx-auto text-center space-y-4">
            <span className="text-saffron-800 font-bold text-xs uppercase tracking-wider font-hindi">
              पंचमुखी शिक्षा दर्शन
            </span>
            <h2 className="text-2xl sm:text-3xl font-bold text-slate-900">
              Our Educational Philosophy: Panchamukhi Shiksha
            </h2>
            <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">
              We adhere to the holistic educational paradigm comprising five essential dimensions of human personality development:
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-5 gap-4 mt-8 text-center">
            <div className="bg-white p-4 rounded-xl shadow-sm border border-amber-200">
              <div className="text-saffron-700 font-bold text-sm mb-1">शारीरिक</div>
              <div className="font-semibold text-slate-800 text-xs">Sharirik (Physical)</div>
              <p className="text-[11px] text-slate-500 mt-1">Health, fitness, yoga, sports & stamina.</p>
            </div>

            <div className="bg-white p-4 rounded-xl shadow-sm border border-amber-200">
              <div className="text-saffron-700 font-bold text-sm mb-1">मानसिक</div>
              <div className="font-semibold text-slate-800 text-xs">Manasik (Mental)</div>
              <p className="text-[11px] text-slate-500 mt-1">Emotional balance, focus, perseverance & calm.</p>
            </div>

            <div className="bg-white p-4 rounded-xl shadow-sm border border-amber-200">
              <div className="text-saffron-700 font-bold text-sm mb-1">बौद्धिक</div>
              <div className="font-semibold text-slate-800 text-xs">Bauddhik (Intellectual)</div>
              <p className="text-[11px] text-slate-500 mt-1">Scientific inquiry, analysis, language & logic.</p>
            </div>

            <div className="bg-white p-4 rounded-xl shadow-sm border border-amber-200">
              <div className="text-saffron-700 font-bold text-sm mb-1">नैतिक</div>
              <div className="font-semibold text-slate-800 text-xs">Naitik (Moral)</div>
              <p className="text-[11px] text-slate-500 mt-1">Righteous conduct, truth, honesty & integrity.</p>
            </div>

            <div className="bg-white p-4 rounded-xl shadow-sm border border-amber-200">
              <div className="text-saffron-700 font-bold text-sm mb-1">आध्यात्मिक</div>
              <div className="font-semibold text-slate-800 text-xs">Adhyatmik (Spiritual)</div>
              <p className="text-[11px] text-slate-500 mt-1">Self-awareness, universal brotherhood & peace.</p>
            </div>
          </div>
        </section>

        {/* Detailed Principal's Message */}
        <section className="bg-white p-8 sm:p-10 rounded-2xl shadow-sm border border-slate-200 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          <div className="lg:col-span-4 text-center">
            <div className="w-36 h-36 mx-auto rounded-full overflow-hidden border-4 border-saffron-600 shadow-md mb-4">
              <img
                src={settings?.principalPhoto || "https://images.unsplash.com/photo-1544717305-2782549b5136?auto=format&fit=crop&q=80&w=400"}
                alt="Principal"
                className="w-full h-full object-cover"
              />
            </div>
            <h3 className="font-bold text-slate-900 text-base">
              {settings?.principalName || 'Dr. [Principal Name - Editable in Admin]'}
            </h3>
            <p className="text-xs text-saffron-700 font-semibold">
              Principal (प्रधानाचार्य)
            </p>
            <p className="text-[11px] text-slate-500">
              VSS Saraswati Vidya Mandir Inter College, Arkha
            </p>
          </div>

          <div className="lg:col-span-8 space-y-4">
            <div className="inline-flex items-center gap-2 text-saffron-700 font-bold text-xs uppercase tracking-wider">
              <Quote className="w-4 h-4" />
              <span>{t('principalDesk')}</span>
            </div>
            <h2 className="text-xl sm:text-2xl font-bold text-slate-900">
              "Education that Enlightens the Soul & Sharpens the Mind"
            </h2>
            <div className="text-slate-600 text-xs sm:text-sm space-y-3 leading-relaxed">
              <p>
                {settings?.principalMessage || "Dear Parents, Students, and Well-Wishers, It brings me immense joy to welcome you to VSS Saraswati Vidya Mandir Inter College, Arkha. In an era of rapid technological transformation, educational institutions must ensure that modernization does not come at the expense of moral values and cultural consciousness."}
              </p>
              <p className="italic text-slate-700 bg-amber-50/60 p-3 rounded-lg border-l-4 border-amber-600 font-hindi">
                {settings?.principalMessageHindi || "हमारा प्रयास है कि प्रत्येक बालक एवं बालिका अपने अंदर निहित अद्वितीय प्रतिभा को पहचानें, आत्मविश्वासी बनें और राष्ट्रहित में अग्रसर रहें।"}
              </p>
              <p>
                With experienced acharyas, individual attention, and comprehensive academic support, we invite you to be part of our vibrant learning family.
              </p>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};
