import React, { useState, useEffect } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { api } from '../services/api';
import {
  MapPin,
  Phone,
  Mail,
  Clock,
  Send,
  CheckCircle,
  AlertCircle,
  MessageSquare,
  Globe
} from 'lucide-react';

export const ContactPage = () => {
  const { lang, t } = useLanguage();
  const [settings, setSettings] = useState(null);

  const [formData, setFormData] = useState({
    name: '',
    mobile: '',
    email: '',
    subject: '',
    message: ''
  });

  const [loading, setLoading] = useState(false);
  const [successMsg, setSuccessMsg] = useState('');
  const [errorMsg, setErrorMsg] = useState('');

  useEffect(() => {
    const fetchSettings = async () => {
      try {
        const res = await api.getSettings();
        if (res.success) setSettings(res.data);
      } catch (err) {
        console.warn('Failed to fetch contact settings:', err.message);
      }
    };
    fetchSettings();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    setErrorMsg('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.name.trim() || !formData.mobile.trim() || !formData.message.trim()) {
      setErrorMsg('Please fill mandatory fields (Name, Mobile, Message).');
      return;
    }

    setLoading(true);
    setErrorMsg('');
    try {
      const res = await api.submitContact(formData);
      if (res.success) {
        setSuccessMsg('Your message has been successfully dispatched to the school administration. We will get in touch shortly!');
        setFormData({
          name: '',
          mobile: '',
          email: '',
          subject: '',
          message: ''
        });
      } else {
        setErrorMsg(res.message || 'Failed to send message. Please retry.');
      }
    } catch (err) {
      setErrorMsg('Connection error. Please try calling the school office directly.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-slate-50 min-h-screen py-10 px-4">
      <div className="max-w-7xl mx-auto space-y-12">
        {/* Banner */}
        <div className="bg-gradient-to-r from-slate-900 via-navy-950 to-slate-900 text-white rounded-2xl p-8 sm:p-12 shadow-md relative overflow-hidden">
          <div className="max-w-3xl space-y-3 relative z-10">
            <span className="text-amber-400 font-bold text-xs uppercase tracking-wider">
              {lang === 'hi' ? 'संपर्क एवं कार्यालय' : 'Reach Out to Us'}
            </span>
            <h1 className="text-2xl sm:text-4xl font-extrabold leading-tight">
              {lang === 'hi'
                ? 'कार्यालय संपर्क एवं पूछताछ'
                : 'Contact School & Location'}
            </h1>
            <p className="text-slate-300 text-xs sm:text-sm">
              We welcome prospective parents, students, and visitors to our campus in Arkha, Raebareli.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Column: Contact Cards & Address */}
          <div className="lg:col-span-5 space-y-6">
            <div className="bg-white p-6 sm:p-8 rounded-2xl shadow-sm border border-slate-200 space-y-6">
              <h3 className="font-bold text-slate-900 text-lg border-b border-slate-100 pb-3">
                {t('contactInformation')}
              </h3>

              {/* Address */}
              <div className="flex items-start gap-3 text-xs">
                <div className="w-9 h-9 rounded-lg bg-amber-50 text-saffron-700 flex items-center justify-center flex-shrink-0">
                  <MapPin className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-bold text-slate-800 uppercase text-[11px]">{t('addressTitle')}</h4>
                  <p className="text-slate-600 mt-0.5 leading-relaxed">
                    {settings?.address || 'Arkha, Salon - Raebareli Road, Raebareli, Uttar Pradesh - 229404'}
                  </p>
                </div>
              </div>

              {/* Phone */}
              <div className="flex items-start gap-3 text-xs">
                <div className="w-9 h-9 rounded-lg bg-blue-50 text-blue-700 flex items-center justify-center flex-shrink-0">
                  <Phone className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-bold text-slate-800 uppercase text-[11px]">{t('phoneTitle')}</h4>
                  <p className="text-slate-600 mt-0.5 font-medium">
                    {settings?.phone || '+91 94XXXXXXXX (Add School Phone Number)'}
                  </p>
                  {settings?.altPhone && (
                    <p className="text-slate-500">{settings.altPhone}</p>
                  )}
                </div>
              </div>

              {/* Email */}
              <div className="flex items-start gap-3 text-xs">
                <div className="w-9 h-9 rounded-lg bg-emerald-50 text-emerald-700 flex items-center justify-center flex-shrink-0">
                  <Mail className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-bold text-slate-800 uppercase text-[11px]">{t('emailTitle')}</h4>
                  <p className="text-slate-600 mt-0.5">
                    {settings?.email || 'info@vsssvm.edu.in'}
                  </p>
                  {settings?.altEmail && (
                    <p className="text-slate-500">{settings.altEmail}</p>
                  )}
                </div>
              </div>

              {/* Timings */}
              <div className="flex items-start gap-3 text-xs">
                <div className="w-9 h-9 rounded-lg bg-purple-50 text-purple-700 flex items-center justify-center flex-shrink-0">
                  <Clock className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-bold text-slate-800 uppercase text-[11px]">{t('officeHoursTitle')}</h4>
                  <p className="text-slate-600 mt-0.5 leading-relaxed">
                    {settings?.timings || 'Summer: 7:30 AM - 1:30 PM | Winter: 8:30 AM - 2:30 PM'}
                  </p>
                  <p className="text-[11px] text-slate-400 mt-0.5">Closed on Sundays & Gazetted Holidays</p>
                </div>
              </div>

              {/* Social Channels */}
              <div className="pt-4 border-t border-slate-100">
                <h4 className="font-bold text-slate-800 text-xs mb-3">Connect on Social Channels:</h4>
                <div className="flex items-center gap-3">
                  <a
                    href={settings?.facebookUrl || "https://facebook.com"}
                    target="_blank"
                    rel="noreferrer"
                    className="w-9 h-9 rounded-lg bg-blue-600 text-white flex items-center justify-center font-bold text-xs hover:opacity-90 transition shadow-sm"
                  >
                    f
                  </a>
                  <a
                    href={settings?.youtubeUrl || "https://youtube.com"}
                    target="_blank"
                    rel="noreferrer"
                    className="w-9 h-9 rounded-lg bg-red-600 text-white flex items-center justify-center font-bold text-xs hover:opacity-90 transition shadow-sm"
                  >
                    ▶
                  </a>
                  <a
                    href={settings?.twitterUrl || "https://twitter.com"}
                    target="_blank"
                    rel="noreferrer"
                    className="w-9 h-9 rounded-lg bg-slate-900 text-white flex items-center justify-center font-bold text-xs hover:opacity-90 transition shadow-sm"
                  >
                    𝕏
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Contact Message Form */}
          <div className="lg:col-span-7 bg-white p-6 sm:p-8 rounded-2xl shadow-sm border border-slate-200">
            <div className="space-y-1 mb-6">
              <h3 className="font-bold text-slate-900 text-lg">
                {t('sendUsMessage')}
              </h3>
              <p className="text-xs text-slate-500">
                Have a query regarding admissions, syllabus, or bus routes? Write to our office.
              </p>
            </div>

            {successMsg && (
              <div className="mb-6 p-4 bg-emerald-50 border border-emerald-300 rounded-xl text-emerald-800 text-xs flex items-center gap-2">
                <CheckCircle className="w-5 h-5 flex-shrink-0 text-emerald-600" />
                <span>{successMsg}</span>
              </div>
            )}

            {errorMsg && (
              <div className="mb-6 p-4 bg-red-50 border border-red-300 rounded-xl text-red-700 text-xs flex items-center gap-2">
                <AlertCircle className="w-4 h-4 flex-shrink-0 text-red-600" />
                <span>{errorMsg}</span>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase mb-1">
                    Your Name <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    placeholder="e.g. Shri Harishankar"
                    className="w-full px-3.5 py-2.5 rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-amber-500 text-xs"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase mb-1">
                    Mobile Number <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="tel"
                    name="mobile"
                    value={formData.mobile}
                    onChange={handleChange}
                    required
                    placeholder="+91 9XXXXXXXXX"
                    className="w-full px-3.5 py-2.5 rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-amber-500 text-xs"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase mb-1">
                    Email Address
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="yourname@example.com"
                    className="w-full px-3.5 py-2.5 rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-amber-500 text-xs"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase mb-1">
                    Subject / Topic
                  </label>
                  <input
                    type="text"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    placeholder="e.g. Bus Route Inquiry"
                    className="w-full px-3.5 py-2.5 rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-amber-500 text-xs"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase mb-1">
                  Message <span className="text-red-500">*</span>
                </label>
                <textarea
                  name="message"
                  rows="4"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  placeholder="Type your message here..."
                  className="w-full px-3.5 py-2.5 rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-amber-500 text-xs"
                ></textarea>
              </div>

              <div>
                <button
                  type="submit"
                  disabled={loading}
                  className="inline-flex items-center gap-2 bg-saffron-600 hover:bg-saffron-700 text-white font-bold px-6 py-3 rounded-lg shadow-md text-xs uppercase tracking-wider transition disabled:opacity-50"
                >
                  <Send className="w-4 h-4" />
                  <span>{loading ? 'Sending...' : 'Send Message'}</span>
                </button>
              </div>
            </form>
          </div>
        </div>

        {/* Google Maps Location Section (Requirement #7) */}
        <section className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200 space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="font-bold text-slate-900 text-base">Campus Location Map</h3>
              <p className="text-xs text-slate-500">Arkha, Salon - Raebareli Highway, Raebareli, UP</p>
            </div>
            <a
              href="https://maps.google.com/?q=Arkha+Raebareli+Uttar+Pradesh"
              target="_blank"
              rel="noreferrer"
              className="text-xs font-bold text-saffron-700 hover:underline"
            >
              Open in Google Maps App →
            </a>
          </div>

          <div className="w-full h-80 rounded-xl overflow-hidden border border-slate-200 shadow-inner">
            <iframe
              title="VSS SVM Arkha Location"
              src={settings?.googleMapsEmbedUrl || "https://maps.google.com/maps?q=Arkha%2C+Raebareli%2C+Uttar+Pradesh&t=&z=14&ie=UTF8&iwloc=&output=embed"}
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen=""
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            ></iframe>
          </div>
        </section>
      </div>
    </div>
  );
};
