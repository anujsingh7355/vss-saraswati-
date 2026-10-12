import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useLanguage } from '../context/LanguageContext';
import {
  BookOpen,
  Calendar,
  Award,
  Layers,
  GraduationCap,
  Sparkles,
  CheckCircle2,
  FileCheck,
  Clock,
  ArrowRight
} from 'lucide-react';

export const AcademicsPage = () => {
  const { lang, t } = useLanguage();
  const [activeTab, setActiveTab] = useState('classes');

  const classesList = [
    {
      title: "Primary Wing (प्राथमिक विभाग)",
      subtitle: "Nursery / Bal Vatika to Class 5th",
      desc: "Foundational stage emphasizing activity-based learning, basic language proficiency (Hindi, English, Sanskrit), mental arithmetic, storytelling, sanskar, and sensory development in a warm, nurturing environment.",
      subjects: ["Hindi", "English", "Mathematics", "Environmental Studies (EVS)", "Sanskrit / Moral Science", "Drawing & Craft", "Physical Education"],
      color: "border-amber-500 bg-amber-50/40"
    },
    {
      title: "Junior High School (उच्च प्राथमिक विभाग)",
      subtitle: "Class 6th to Class 8th",
      desc: "Strengthening analytical thinking, scientific curiosity, grammatical accuracy, social sciences, and computer literacy with daily moral assemblies and sports participation.",
      subjects: ["Hindi", "English", "Mathematics", "General Science", "Social Science (History, Civics, Geography)", "Sanskrit", "Computer Science", "Art & Physical Education"],
      color: "border-blue-500 bg-blue-50/40"
    },
    {
      title: "High School (माध्यमिक विभाग)",
      subtitle: "Class 9th & Class 10th (UP Board)",
      desc: "Rigorous curriculum aligned with UP Madhyamik Shiksha Parishad (Prayagraj). Focused on board examination mastery, continuous assessments, and pre-board drills.",
      subjects: ["General Hindi", "English", "Mathematics", "Science (Physics, Chemistry, Biology)", "Social Science", "Sanskrit / Drawing / Computer Application"],
      color: "border-emerald-500 bg-emerald-50/40"
    },
    {
      title: "Intermediate (उच्च माध्यमिक विभाग)",
      subtitle: "Class 11th & Class 12th (UP Board)",
      desc: "Specialized streams designed for higher academic pursuits and competitive examinations (JEE, NEET, CUET, NDA, CA Foundation). Fully equipped labs and experienced PGT faculty.",
      subjects: ["Science Stream (PCM / PCB)", "Commerce Stream", "Arts / Humanities Stream", "General Hindi", "General English"],
      color: "border-purple-500 bg-purple-50/40"
    }
  ];

  const streamsList = [
    {
      streamName: "Science Stream (विज्ञान संकाय)",
      badge: "PCM / PCB",
      description: "Ideal for aspiring engineers, doctors, pharmacists, researchers, and scientific innovators. Complete with intensive laboratory experiments and board exam prep.",
      coreSubjects: [
        "Physics (Theory + Practical)",
        "Chemistry (Theory + Practical)",
        "Mathematics OR Biology (Botany + Zoology Practical)",
        "General Hindi",
        "General English",
        "Computer Science (Optional)"
      ]
    },
    {
      streamName: "Commerce Stream (वाणिज्य संकाय)",
      badge: "Accounts & Business",
      description: "Designed for students aiming for careers in banking, chartered accountancy, corporate management, economics, and entrepreneurship.",
      coreSubjects: [
        "Accountancy (बहीखाता एवं लेखाशास्त्र)",
        "Business Organization & Administration",
        "Commercial Mathematics / Economics (अर्थशास्त्र)",
        "General Hindi",
        "General English"
      ]
    },
    {
      streamName: "Arts & Humanities (कला संकाय)",
      badge: "Humanities",
      description: "Fosters deep understanding of history, public administration, languages, and literature for civil services, academics, and legal careers.",
      coreSubjects: [
        "History (इतिहास)",
        "Geography (भूगोल)",
        "Political Science (नागरिक शास्त्र)",
        "Sanskrit Literature (संस्कृत)",
        "General Hindi & English",
        "Economics / Sociology"
      ]
    }
  ];

  return (
    <div className="bg-slate-50 min-h-screen py-10 px-4">
      <div className="max-w-7xl mx-auto space-y-12">
        {/* Banner */}
        <div className="bg-gradient-to-r from-slate-900 via-navy-950 to-slate-900 text-white rounded-2xl p-8 sm:p-12 shadow-md relative overflow-hidden">
          <div className="max-w-3xl space-y-3 relative z-10">
            <span className="text-amber-400 font-bold text-xs uppercase tracking-wider">
              {lang === 'hi' ? 'शैक्षणिक कार्यक्रम' : 'Academic Programs & Curriculum'}
            </span>
            <h1 className="text-2xl sm:text-4xl font-extrabold leading-tight">
              {lang === 'hi'
                ? 'गुणवत्तापूर्ण पाठ्यक्रम एवं शिक्षण व्यवस्था'
                : 'Academics at VSS Saraswati Vidya Mandir'}
            </h1>
            <p className="text-slate-300 text-xs sm:text-sm">
              Aligned with Uttar Pradesh Madhyamik Shiksha Parishad (UP Board) Standards • Primary to Class 12
            </p>
          </div>
        </div>

        {/* Section Tabs */}
        <div className="flex border-b border-slate-200 overflow-x-auto space-x-4 bg-white p-2 rounded-xl shadow-sm">
          <button
            onClick={() => setActiveTab('classes')}
            className={`px-4 py-2.5 rounded-lg text-xs font-bold uppercase tracking-wider transition whitespace-nowrap ${
              activeTab === 'classes'
                ? 'bg-saffron-600 text-white shadow-sm'
                : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
            }`}
          >
            Available Classes
          </button>
          <button
            onClick={() => setActiveTab('streams')}
            className={`px-4 py-2.5 rounded-lg text-xs font-bold uppercase tracking-wider transition whitespace-nowrap ${
              activeTab === 'streams'
                ? 'bg-saffron-600 text-white shadow-sm'
                : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
            }`}
          >
            Senior Secondary Streams (11th & 12th)
          </button>
          <button
            onClick={() => setActiveTab('system')}
            className={`px-4 py-2.5 rounded-lg text-xs font-bold uppercase tracking-wider transition whitespace-nowrap ${
              activeTab === 'system'
                ? 'bg-saffron-600 text-white shadow-sm'
                : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
            }`}
          >
            Examination & Calendar System
          </button>
        </div>

        {/* Tab 1: Available Classes */}
        {activeTab === 'classes' && (
          <div className="space-y-6">
            <div className="text-center max-w-2xl mx-auto mb-6">
              <h2 className="text-2xl font-bold text-slate-900">
                Academic Levels from Bal Vatika to Class 12th
              </h2>
              <p className="text-slate-600 text-xs sm:text-sm mt-1">
                Each developmental stage has tailored learning modules and individual pupil mentorship.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {classesList.map((item, idx) => (
                <div
                  key={idx}
                  className={`bg-white p-6 rounded-2xl shadow-sm border-l-4 ${item.color} border border-slate-200 space-y-4`}
                >
                  <div>
                    <h3 className="font-bold text-slate-900 text-base">{item.title}</h3>
                    <div className="text-xs font-semibold text-saffron-700">{item.subtitle}</div>
                  </div>
                  <p className="text-xs text-slate-600 leading-relaxed">{item.desc}</p>
                  <div>
                    <h4 className="text-xs font-bold text-slate-800 uppercase tracking-wider mb-2">
                      Key Subjects:
                    </h4>
                    <div className="flex flex-wrap gap-1.5">
                      {item.subjects.map((sub, sIdx) => (
                        <span
                          key={sIdx}
                          className="bg-slate-100 text-slate-700 text-[11px] font-medium px-2 py-0.5 rounded-md"
                        >
                          {sub}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Tab 2: Streams */}
        {activeTab === 'streams' && (
          <div className="space-y-6">
            <div className="text-center max-w-2xl mx-auto mb-6">
              <h2 className="text-2xl font-bold text-slate-900">
                Intermediate Streams (Classes 11 & 12)
              </h2>
              <p className="text-slate-600 text-xs sm:text-sm mt-1">
                Approved by UP Board with dedicated practical laboratories and experienced lecturers.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {streamsList.map((st, idx) => (
                <div
                  key={idx}
                  className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200 flex flex-col justify-between space-y-4"
                >
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-[10px] font-bold uppercase px-2.5 py-1 rounded-full bg-amber-100 text-amber-800">
                        {st.badge}
                      </span>
                    </div>
                    <h3 className="font-bold text-slate-900 text-base">{st.streamName}</h3>
                    <p className="text-xs text-slate-600 leading-relaxed">{st.description}</p>
                    <div className="pt-2">
                      <h4 className="text-xs font-bold text-slate-800 uppercase tracking-wider mb-2">
                        Prescribed Course Work:
                      </h4>
                      <ul className="space-y-1.5 text-xs text-slate-700">
                        {st.coreSubjects.map((sub, sIdx) => (
                          <li key={sIdx} className="flex items-center gap-1.5">
                            <CheckCircle2 className="w-3.5 h-3.5 text-saffron-600 flex-shrink-0" />
                            <span>{sub}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  <div className="pt-4 border-t border-slate-100">
                    <Link
                      to="/admissions"
                      className="text-xs font-bold text-saffron-700 hover:underline flex items-center gap-1"
                    >
                      <span>Inquire for Admission</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </Link>
                  </div>
                </div>
              ))}
            </div>

            <div className="bg-amber-50 border border-amber-200 p-4 rounded-xl text-xs text-slate-700">
              * Note: Subject combinations and elective preferences are finalized during registration as per UP Board guidelines. Details are easily manageable from the Admin control portal.
            </div>
          </div>
        )}

        {/* Tab 3: Examination & Calendar System */}
        {activeTab === 'system' && (
          <div className="bg-white p-8 rounded-2xl shadow-sm border border-slate-200 space-y-6">
            <div>
              <h3 className="font-bold text-slate-900 text-lg mb-2">
                Examination & Evaluation Framework
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                The college adheres to a continuous and comprehensive evaluation system to monitor student growth throughout the academic year.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-2">
                <FileCheck className="w-6 h-6 text-saffron-600" />
                <h4 className="font-bold text-slate-900 text-sm">Monthly & Unit Tests</h4>
                <p className="text-xs text-slate-600">
                  Periodic assessments after every chapter to reinforce fundamentals and identify areas needing remedial coaching.
                </p>
              </div>

              <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-2">
                <Clock className="w-6 h-6 text-saffron-600" />
                <h4 className="font-bold text-slate-900 text-sm">Half-Yearly Examinations</h4>
                <p className="text-xs text-slate-600">
                  Conducted in October/November with structured practical exams and written assessments to evaluate term-end proficiency.
                </p>
              </div>

              <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-2">
                <GraduationCap className="w-6 h-6 text-saffron-600" />
                <h4 className="font-bold text-slate-900 text-sm">Pre-Boards & Board Finals</h4>
                <p className="text-xs text-slate-600">
                  Pre-board simulations matching the exact UPMSP pattern in January, followed by the official UP Board Annual Exams in February/March.
                </p>
              </div>
            </div>

            <div className="pt-4 border-t border-slate-100 flex flex-wrap items-center justify-between gap-4">
              <div className="text-xs text-slate-600">
                Download the complete academic calendar and examination date sheet in the downloads section.
              </div>
              <Link
                to="/downloads"
                className="bg-saffron-600 hover:bg-saffron-700 text-white font-bold px-4 py-2 rounded-lg text-xs uppercase tracking-wider transition"
              >
                Go to Downloads
              </Link>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
