import React, { useState } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { api } from '../services/api';
import { MarksheetCard } from '../components/MarksheetCard';
import {
  Award,
  Search,
  Calendar,
  AlertCircle,
  HelpCircle,
  Sparkles,
  CheckCircle,
  BookOpen
} from 'lucide-react';

export const ResultsPage = () => {
  const { lang, t } = useLanguage();
  const [rollNumber, setRollNumber] = useState('');
  const [dob, setDob] = useState('');
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);
  const [errorMsg, setErrorMsg] = useState('');

  const handleSearch = async (e) => {
    if (e) e.preventDefault();
    if (!rollNumber.trim()) {
      setErrorMsg('Please enter a valid Roll Number.');
      return;
    }

    setLoading(true);
    setErrorMsg('');
    setResult(null);

    try {
      const res = await api.searchResult(rollNumber.trim(), dob.trim());
      if (res.success && res.data) {
        setResult(res.data);
      } else {
        setErrorMsg(res.message || 'No result record found for the provided Roll Number / Date of Birth.');
      }
    } catch (err) {
      setErrorMsg('Unable to retrieve result record. Please check your credentials or contact the examination section.');
    } finally {
      setLoading(false);
    }
  };

  const setSampleQuery = (sampleRoll, sampleDob) => {
    setRollNumber(sampleRoll);
    setDob(sampleDob);
    setErrorMsg('');
  };

  return (
    <div className="bg-slate-50 min-h-screen py-10 px-4">
      <div className="max-w-7xl mx-auto space-y-10">
        {/* Banner */}
        <div className="bg-gradient-to-r from-slate-900 via-navy-950 to-slate-900 text-white rounded-2xl p-8 sm:p-12 shadow-md relative overflow-hidden">
          <div className="max-w-3xl space-y-3 relative z-10">
            <span className="text-amber-400 font-bold text-xs uppercase tracking-wider">
              {lang === 'hi' ? 'परीक्षा परिणाम पोर्टल' : 'Official Evaluation Portal'}
            </span>
            <h1 className="text-2xl sm:text-4xl font-extrabold leading-tight">
              {lang === 'hi'
                ? 'ऑनलाइन छात्र परीक्षा परिणाम'
                : 'Student Examination Results Portal'}
            </h1>
            <p className="text-slate-300 text-xs sm:text-sm">
              Verify High School & Intermediate Examination Marksheets Online • VSS SVM Arkha
            </p>
          </div>
        </div>

        {/* Search Box Card if no result is displayed */}
        {!result && (
          <div className="max-w-2xl mx-auto bg-white p-8 sm:p-10 rounded-2xl shadow-md border-2 border-amber-500/30 space-y-6">
            <div className="text-center space-y-2">
              <div className="w-14 h-14 mx-auto rounded-full bg-saffron-100 text-saffron-800 flex items-center justify-center">
                <Award className="w-7 h-7" />
              </div>
              <h2 className="text-xl sm:text-2xl font-bold text-slate-900">
                Enter Candidate Credentials
              </h2>
              <p className="text-xs text-slate-500">
                Please enter the Board / College Roll Number and registered Date of Birth.
              </p>
            </div>

            {errorMsg && (
              <div className="p-4 bg-red-50 border border-red-300 rounded-xl text-red-700 text-xs flex items-start gap-2.5">
                <AlertCircle className="w-4 h-4 flex-shrink-0 mt-0.5" />
                <div>
                  <strong className="block font-semibold">Record Lookup Notice:</strong>
                  <span>{errorMsg}</span>
                </div>
              </div>
            )}

            <form onSubmit={handleSearch} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase mb-1.5">
                  Roll Number <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  placeholder="e.g. 2026101"
                  value={rollNumber}
                  onChange={(e) => setRollNumber(e.target.value)}
                  required
                  className="w-full px-4 py-3 rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-amber-500 font-mono text-sm uppercase"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase mb-1.5">
                  Date of Birth (YYYY-MM-DD)
                </label>
                <input
                  type="date"
                  value={dob}
                  onChange={(e) => setDob(e.target.value)}
                  className="w-full px-4 py-3 rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-amber-500 text-xs"
                />
              </div>

              <div className="pt-2">
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full bg-gradient-to-r from-saffron-600 via-amber-600 to-saffron-700 hover:from-saffron-700 hover:to-amber-800 text-white font-bold py-3.5 rounded-lg shadow-lg hover:shadow-xl transition transform hover:-translate-y-0.5 text-xs uppercase tracking-wider flex items-center justify-center gap-2 disabled:opacity-50"
                >
                  {loading ? (
                    <span>Searching Results...</span>
                  ) : (
                    <>
                      <Search className="w-4 h-4" />
                      <span>{t('searchResult')}</span>
                    </>
                  )}
                </button>
              </div>
            </form>

            {/* Quick Demo Helper Chips */}
            <div className="pt-4 border-t border-slate-100">
              <div className="text-xs font-semibold text-slate-500 mb-2 flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5 text-amber-500" />
                <span>Try Demo Candidate Roll Numbers:</span>
              </div>
              <div className="flex flex-wrap gap-2 text-xs">
                <button
                  type="button"
                  onClick={() => setSampleQuery('2026101', '2008-05-15')}
                  className="px-2.5 py-1 bg-slate-100 hover:bg-amber-100 text-slate-700 rounded-md border border-slate-200 transition font-mono"
                >
                  2026101 (Class 10 - Aman)
                </button>
                <button
                  type="button"
                  onClick={() => setSampleQuery('2026102', '2008-08-22')}
                  className="px-2.5 py-1 bg-slate-100 hover:bg-amber-100 text-slate-700 rounded-md border border-slate-200 transition font-mono"
                >
                  2026102 (Class 10 - Priya)
                </button>
                <button
                  type="button"
                  onClick={() => setSampleQuery('2026121', '2006-03-10')}
                  className="px-2.5 py-1 bg-slate-100 hover:bg-amber-100 text-slate-700 rounded-md border border-slate-200 transition font-mono"
                >
                  2026121 (Class 12 - Rahul)
                </button>
                <button
                  type="button"
                  onClick={() => setSampleQuery('2026122', '2006-11-04')}
                  className="px-2.5 py-1 bg-slate-100 hover:bg-amber-100 text-slate-700 rounded-md border border-slate-200 transition font-mono"
                >
                  2026122 (Class 12 - Anjali)
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Display Marksheet Card when result is loaded */}
        {result && (
          <MarksheetCard
            result={result}
            onReset={() => {
              setResult(null);
              setRollNumber('');
              setDob('');
            }}
          />
        )}
      </div>
    </div>
  );
};
