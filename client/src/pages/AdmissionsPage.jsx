import React, { useState } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { api } from '../services/api';
import {
  FileText,
  Calendar,
  CheckCircle,
  HelpCircle,
  Sparkles,
  Send,
  AlertCircle,
  Download,
  ShieldCheck,
  User,
  Phone,
  Mail,
  MapPin,
  Clock
} from 'lucide-react';

export const AdmissionsPage = () => {
  const { lang, t } = useLanguage();

  const [formData, setFormData] = useState({
    studentName: '',
    fatherName: '',
    motherName: '',
    dob: '',
    selectedClass: 'Class 9th',
    mobile: '',
    email: '',
    address: '',
    previousSchool: '',
    message: ''
  });

  const [loading, setLoading] = useState(false);
  const [successData, setSuccessData] = useState(null);
  const [errorMsg, setErrorMsg] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    setErrorMsg('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.studentName.trim() || !formData.fatherName.trim() || !formData.mobile.trim()) {
      setErrorMsg('Please fill all mandatory fields (Student Name, Father Name, Mobile Number).');
      return;
    }

    setLoading(true);
    setErrorMsg('');
    try {
      const res = await api.submitEnquiry(formData);
      if (res.success) {
        setSuccessData({
          enquiryId: res.enquiryId || `ENQ-${Date.now().toString().slice(-6)}`,
          ...formData
        });
        // reset form
        setFormData({
          studentName: '',
          fatherName: '',
          motherName: '',
          dob: '',
          selectedClass: 'Class 9th',
          mobile: '',
          email: '',
          address: '',
          previousSchool: '',
          message: ''
        });
      } else {
        setErrorMsg(res.message || 'Submission failed. Please check inputs and retry.');
      }
    } catch (err) {
      setErrorMsg('Connection error. Please try again or reach out by phone.');
    } finally {
      setLoading(false);
    }
  };

  const steps = [
    {
      step: "01",
      title: "Online Enquiry or Registration",
      desc: "Fill the admission enquiry form below or collect the official registration prospectus from the school office in Arkha."
    },
    {
      step: "02",
      title: "Document Verification & Interaction",
      desc: "Submit academic transcripts of the prior class, TC, birth certificate, and attend a brief friendly counseling interaction with the student and parents."
    },
    {
      step: "03",
      title: "Provisional Admission & Fee Confirmation",
      desc: "Upon verification, pay the admission fee and collect the student identity card, booklist, and uniform guidelines."
    }
  ];

  const requiredDocuments = [
    "Original Transfer Certificate (T.C.) countersigned by competent educational authority (for Class 2nd upwards)",
    "Photocopy of Municipal / Panchayat Birth Certificate (for Nursery to 1st)",
    "Report Card / Marksheet of previous passed examination",
    "Photocopy of Student and Parent Aadhar Cards",
    "Recent passport-size colored photographs of the student (4 copies)",
    "Caste Certificate (if applying under SC/ST/OBC category for state scholarships)"
  ];

  return (
    <div className="bg-slate-50 min-h-screen py-10 px-4">
      <div className="max-w-7xl mx-auto space-y-12">
        {/* Banner */}
        <div className="bg-gradient-to-r from-slate-900 via-navy-950 to-slate-900 text-white rounded-2xl p-8 sm:p-12 shadow-md relative overflow-hidden">
          <div className="max-w-3xl space-y-3 relative z-10">
            <span className="text-amber-400 font-bold text-xs uppercase tracking-wider">
              {lang === 'hi' ? 'सत्र 2026-27 प्रवेश प्रक्रिया' : 'Admissions 2026-2027'}
            </span>
            <h1 className="text-2xl sm:text-4xl font-extrabold leading-tight">
              {lang === 'hi'
                ? 'प्रवेश प्रक्रिया एवं ऑनलाइन पूछताछ'
                : 'Admission Procedure & Online Registration'}
            </h1>
            <p className="text-slate-300 text-xs sm:text-sm">
              Nursery / Bal Vatika to Class 11th (Science, Commerce, Arts) • Merit & Transparency Assured
            </p>
          </div>
        </div>

        {/* 3 Step Admission Procedure */}
        <section className="bg-white p-8 rounded-2xl shadow-sm border border-slate-200">
          <div className="text-center max-w-2xl mx-auto mb-8">
            <span className="text-saffron-700 font-bold text-xs uppercase tracking-wider">
              Easy Steps
            </span>
            <h2 className="text-2xl font-bold text-slate-900 mt-1">
              Admission Procedure
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {steps.map((st, idx) => (
              <div
                key={idx}
                className="p-6 rounded-xl bg-slate-50 border border-slate-200 relative space-y-3"
              >
                <div className="text-3xl font-black text-amber-500/40">
                  {st.step}
                </div>
                <h3 className="font-bold text-slate-900 text-base">{st.title}</h3>
                <p className="text-xs text-slate-600 leading-relaxed">{st.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Required Documents & Important Dates */}
        <section className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Required Documents Checklist */}
          <div className="lg:col-span-7 bg-white p-6 sm:p-8 rounded-2xl shadow-sm border border-slate-200 space-y-4">
            <div className="flex items-center gap-2 text-saffron-700 font-bold text-xs uppercase tracking-wider">
              <FileText className="w-4 h-4" />
              <span>Mandatory Checklist</span>
            </div>
            <h3 className="text-xl font-bold text-slate-900">
              Required Documents for Admission
            </h3>
            <ul className="space-y-3 pt-2">
              {requiredDocuments.map((doc, idx) => (
                <li key={idx} className="flex items-start gap-2.5 text-xs text-slate-700">
                  <CheckCircle className="w-4 h-4 text-emerald-600 flex-shrink-0 mt-0.5" />
                  <span>{doc}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Important Dates & Fees Information */}
          <div className="lg:col-span-5 bg-white p-6 sm:p-8 rounded-2xl shadow-sm border border-slate-200 space-y-4 flex flex-col justify-between">
            <div className="space-y-4">
              <div className="flex items-center gap-2 text-saffron-700 font-bold text-xs uppercase tracking-wider">
                <Calendar className="w-4 h-4" />
                <span>Session Timelines</span>
              </div>
              <h3 className="text-xl font-bold text-slate-900">
                Important Dates & Fee Structure
              </h3>

              <div className="space-y-3 text-xs">
                <div className="flex items-center justify-between p-3 rounded-lg bg-amber-50/60 border border-amber-200">
                  <span className="font-semibold text-slate-800">Registration Begins</span>
                  <span className="font-bold text-saffron-700">Open for 2026-27</span>
                </div>
                <div className="flex items-center justify-between p-3 rounded-lg bg-slate-50 border border-slate-200">
                  <span className="font-semibold text-slate-800">Interaction & Counseling</span>
                  <span className="font-medium text-slate-700">Ongoing Weekly</span>
                </div>
                <div className="flex items-center justify-between p-3 rounded-lg bg-slate-50 border border-slate-200">
                  <span className="font-semibold text-slate-800">Commencement of Session</span>
                  <span className="font-medium text-slate-700">As per UPMSP Norms</span>
                </div>
              </div>

              <div className="p-3 bg-slate-50 rounded-lg border border-slate-200 text-xs text-slate-600">
                <strong>Fee Policy:</strong> The fee structure adheres strictly to the regulations of the Uttar Pradesh Secondary Education Department. Affordable fees with concessions for meritorious students.
              </div>
            </div>

            <div className="pt-4 border-t border-slate-100">
              <a
                href="/downloads"
                className="text-xs font-bold text-saffron-700 hover:underline flex items-center gap-1"
              >
                <span>Download Printable Admission Form PDF</span>
                <span>→</span>
              </a>
            </div>
          </div>
        </section>

        {/* Interactive Admission Enquiry Form (Requirement #6) */}
        <section id="enquiry-form" className="bg-white p-6 sm:p-10 rounded-2xl shadow-md border-2 border-amber-500/40">
          <div className="text-center max-w-2xl mx-auto mb-8 space-y-2">
            <span className="inline-flex items-center gap-1.5 bg-amber-100 text-saffron-800 text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Online Registration Portal</span>
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900">
              {lang === 'hi' ? 'प्रवेश पूछताछ फॉर्म (Admission Enquiry Form)' : 'Admission Enquiry Form'}
            </h2>
            <p className="text-xs sm:text-sm text-slate-600">
              Submit your child's details to schedule a campus visit and provisional admission counseling.
            </p>
          </div>

          {/* Success Receipt Popup */}
          {successData && (
            <div className="mb-8 p-6 bg-emerald-50 border-2 border-emerald-500 rounded-xl text-slate-800 space-y-3 animate-fadeIn">
              <div className="flex items-center gap-3">
                <CheckCircle className="w-8 h-8 text-emerald-600 flex-shrink-0" />
                <div>
                  <h4 className="font-bold text-emerald-900 text-base">
                    Admission Enquiry Submitted Successfully!
                  </h4>
                  <p className="text-xs text-emerald-700">
                    Application Reference ID: <strong className="font-mono">{successData.enquiryId}</strong>
                  </p>
                </div>
              </div>
              <p className="text-xs text-slate-600">
                Thank you, <strong>{successData.fatherName}</strong>. We have registered the enquiry for <strong>{successData.studentName}</strong> ({successData.selectedClass}). Our admissions desk will call you at <strong>{successData.mobile}</strong> shortly with instructions.
              </p>
              <button
                onClick={() => setSuccessData(null)}
                className="text-xs font-bold text-emerald-700 underline"
              >
                Submit another enquiry
              </button>
            </div>
          )}

          {errorMsg && (
            <div className="mb-6 p-4 bg-red-50 border border-red-300 rounded-lg text-red-700 text-xs flex items-center gap-2">
              <AlertCircle className="w-4 h-4 flex-shrink-0" />
              <span>{errorMsg}</span>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {/* Student Name */}
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase mb-1.5">
                  {t('studentName')} <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  name="studentName"
                  value={formData.studentName}
                  onChange={handleChange}
                  required
                  placeholder="e.g. Aman Verma"
                  className="w-full px-3.5 py-2.5 rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-amber-500 text-xs"
                />
              </div>

              {/* Father's Name */}
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase mb-1.5">
                  {t('fatherName')} <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  name="fatherName"
                  value={formData.fatherName}
                  onChange={handleChange}
                  required
                  placeholder="e.g. Shri Ramesh Verma"
                  className="w-full px-3.5 py-2.5 rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-amber-500 text-xs"
                />
              </div>

              {/* Mother's Name */}
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase mb-1.5">
                  {t('motherName')}
                </label>
                <input
                  type="text"
                  name="motherName"
                  value={formData.motherName}
                  onChange={handleChange}
                  placeholder="e.g. Smt. Sunita Verma"
                  className="w-full px-3.5 py-2.5 rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-amber-500 text-xs"
                />
              </div>

              {/* Date of Birth */}
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase mb-1.5">
                  {t('dob')}
                </label>
                <input
                  type="date"
                  name="dob"
                  value={formData.dob}
                  onChange={handleChange}
                  className="w-full px-3.5 py-2.5 rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-amber-500 text-xs"
                />
              </div>

              {/* Class */}
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase mb-1.5">
                  {t('classApplyingFor')} <span className="text-red-500">*</span>
                </label>
                <select
                  name="selectedClass"
                  value={formData.selectedClass}
                  onChange={handleChange}
                  className="w-full px-3.5 py-2.5 rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-amber-500 text-xs bg-white"
                >
                  <option value="Bal Vatika / Nursery">Bal Vatika / Nursery</option>
                  <option value="LKG / UKG">LKG / UKG</option>
                  <option value="Class 1st">Class 1st</option>
                  <option value="Class 2nd">Class 2nd</option>
                  <option value="Class 3rd">Class 3rd</option>
                  <option value="Class 4th">Class 4th</option>
                  <option value="Class 5th">Class 5th</option>
                  <option value="Class 6th">Class 6th</option>
                  <option value="Class 7th">Class 7th</option>
                  <option value="Class 8th">Class 8th</option>
                  <option value="Class 9th">Class 9th</option>
                  <option value="Class 10th">Class 10th</option>
                  <option value="Class 11th (Science - PCM)">Class 11th (Science - PCM)</option>
                  <option value="Class 11th (Science - PCB)">Class 11th (Science - PCB)</option>
                  <option value="Class 11th (Commerce)">Class 11th (Commerce)</option>
                  <option value="Class 11th (Arts)">Class 11th (Arts)</option>
                  <option value="Class 12th">Class 12th</option>
                </select>
              </div>

              {/* Mobile Number */}
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase mb-1.5">
                  {t('mobileNumber')} <span className="text-red-500">*</span>
                </label>
                <input
                  type="tel"
                  name="mobile"
                  value={formData.mobile}
                  onChange={handleChange}
                  required
                  placeholder="+91 9450XXXXXX"
                  className="w-full px-3.5 py-2.5 rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-amber-500 text-xs"
                />
              </div>

              {/* Email */}
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase mb-1.5">
                  {t('emailAddress')}
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="parent@example.com"
                  className="w-full px-3.5 py-2.5 rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-amber-500 text-xs"
                />
              </div>

              {/* Previous School */}
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase mb-1.5">
                  {t('previousSchool')}
                </label>
                <input
                  type="text"
                  name="previousSchool"
                  value={formData.previousSchool}
                  onChange={handleChange}
                  placeholder="Name of last school attended"
                  className="w-full px-3.5 py-2.5 rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-amber-500 text-xs"
                />
              </div>

              {/* Address */}
              <div className="md:col-span-2 lg:col-span-1">
                <label className="block text-xs font-bold text-slate-700 uppercase mb-1.5">
                  {t('residentialAddress')}
                </label>
                <input
                  type="text"
                  name="address"
                  value={formData.address}
                  onChange={handleChange}
                  placeholder="Village / Post, Arkha / Salon, Raebareli"
                  className="w-full px-3.5 py-2.5 rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-amber-500 text-xs"
                />
              </div>
            </div>

            {/* Message / Remarks */}
            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase mb-1.5">
                {t('additionalMessage')}
              </label>
              <textarea
                name="message"
                rows="3"
                value={formData.message}
                onChange={handleChange}
                placeholder="Mention any specific queries regarding subjects, transportation route, or hostel facilities..."
                className="w-full px-3.5 py-2.5 rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-amber-500 text-xs"
              ></textarea>
            </div>

            {/* Submit Button */}
            <div className="text-center pt-2">
              <button
                type="submit"
                disabled={loading}
                className="inline-flex items-center justify-center gap-2 bg-gradient-to-r from-saffron-600 via-amber-600 to-saffron-700 hover:from-saffron-700 hover:to-amber-800 text-white font-bold px-8 py-3.5 rounded-lg shadow-lg hover:shadow-xl transition transform hover:-translate-y-0.5 text-xs uppercase tracking-wider disabled:opacity-50"
              >
                {loading ? (
                  <span>Submitting Enquiry...</span>
                ) : (
                  <>
                    <Send className="w-4 h-4" />
                    <span>{t('submitEnquiry')}</span>
                  </>
                )}
              </button>
            </div>
          </form>
        </section>
      </div>
    </div>
  );
};
