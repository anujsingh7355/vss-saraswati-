import React from 'react';
import { Printer, CheckCircle, Award, ShieldCheck, ArrowLeft } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

export const MarksheetCard = ({ result, onReset }) => {
  const { lang } = useLanguage();

  if (!result) return null;

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="max-w-3xl mx-auto my-6 animate-fadeIn">
      {/* Action Buttons bar (hidden on print) */}
      <div className="flex items-center justify-between mb-4 no-print">
        {onReset && (
          <button
            onClick={onReset}
            className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-600 hover:text-slate-900 bg-white border border-slate-300 px-3 py-1.5 rounded-lg shadow-sm hover:bg-slate-50 transition"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Search Another Roll Number</span>
          </button>
        )}
        <button
          onClick={handlePrint}
          className="inline-flex items-center gap-2 bg-saffron-600 hover:bg-saffron-700 text-white font-bold px-4 py-2 rounded-lg shadow transition text-xs uppercase tracking-wider"
        >
          <Printer className="w-4 h-4" />
          <span>Print Official Marksheet</span>
        </button>
      </div>

      {/* Official Marksheet Document (Print Target) */}
      <div
        id="printable-marksheet"
        className="bg-white border-4 border-amber-600 rounded-xl p-6 sm:p-8 shadow-xl relative overflow-hidden"
      >
        {/* Watermark in background */}
        <div className="absolute inset-0 flex items-center justify-center opacity-[0.04] pointer-events-none">
          <img src="/logo.svg" alt="Watermark" className="w-96 h-96 object-contain" />
        </div>

        {/* Header with Crest and Institution Name */}
        <div className="border-b-2 border-amber-500/50 pb-5 mb-6 text-center">
          <div className="flex items-center justify-center gap-4 mb-2">
            <img src="/logo.svg" alt="School Crest" className="w-16 h-16 object-contain" />
            <div>
              <h2 className="font-hindi font-bold text-xl sm:text-2xl text-saffron-800 leading-tight">
                वि.सं.स्मा. सरस्वती विद्या मन्दिर इण्टर कॉलेज
              </h2>
              <h3 className="font-bold text-base sm:text-lg text-slate-800 uppercase tracking-wide">
                VSS Saraswati Vidya Mandir Inter College
              </h3>
              <p className="text-xs text-slate-600 font-medium">
                Arkha, Salon - Raebareli Road, Raebareli (U.P.) - 229404
              </p>
              <p className="text-[11px] text-amber-800 font-semibold italic">
                Affiliated to UP Board (Madhyamik Shiksha Parishad, Prayagraj)
              </p>
            </div>
          </div>
          <div className="inline-block bg-slate-900 text-amber-300 font-bold px-6 py-1 rounded-full text-xs uppercase tracking-widest mt-2">
            {result.examName || 'Annual Examination Statement of Marks'}
          </div>
        </div>

        {/* Student Particulars */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-2 gap-x-6 text-xs mb-6 bg-amber-50/60 p-4 rounded-lg border border-amber-200">
          <div>
            <span className="text-slate-500 font-medium">Candidate Name:</span>{' '}
            <strong className="text-slate-900 uppercase font-bold text-sm ml-1">{result.studentName}</strong>
          </div>
          <div>
            <span className="text-slate-500 font-medium">Roll Number:</span>{' '}
            <strong className="text-saffron-700 font-bold text-sm ml-1">{result.rollNumber}</strong>
          </div>
          <div>
            <span className="text-slate-500 font-medium">Father's Name:</span>{' '}
            <span className="text-slate-800 font-semibold ml-1">{result.fatherName || 'N/A'}</span>
          </div>
          <div>
            <span className="text-slate-500 font-medium">Class / Stream:</span>{' '}
            <span className="text-slate-800 font-semibold ml-1">{result.classLevel}</span>
          </div>
          <div>
            <span className="text-slate-500 font-medium">Mother's Name:</span>{' '}
            <span className="text-slate-800 font-semibold ml-1">{result.motherName || 'N/A'}</span>
          </div>
          <div>
            <span className="text-slate-500 font-medium">Date of Birth:</span>{' '}
            <span className="text-slate-800 font-semibold ml-1">{result.dob || 'N/A'}</span>
          </div>
        </div>

        {/* Subject-Wise Score Table */}
        <div className="overflow-x-auto mb-6">
          <table className="w-full text-xs text-left border border-slate-300">
            <thead className="bg-slate-800 text-white uppercase text-[11px]">
              <tr>
                <th className="py-2.5 px-3 border border-slate-300">Code</th>
                <th className="py-2.5 px-3 border border-slate-300">Subject Name</th>
                <th className="py-2.5 px-3 text-center border border-slate-300">Max Marks</th>
                <th className="py-2.5 px-3 text-center border border-slate-300">Marks Obtained</th>
                <th className="py-2.5 px-3 text-center border border-slate-300">Grade</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200">
              {result.subjects && result.subjects.length > 0 ? (
                result.subjects.map((sub, i) => (
                  <tr key={i} className="hover:bg-amber-50/40">
                    <td className="py-2 px-3 border border-slate-300 font-mono text-slate-600">{sub.code || `0${i+1}`}</td>
                    <td className="py-2 px-3 border border-slate-300 font-medium text-slate-800">{sub.name}</td>
                    <td className="py-2 px-3 border border-slate-300 text-center text-slate-600">{sub.maxMarks || 100}</td>
                    <td className="py-2 px-3 border border-slate-300 text-center font-bold text-slate-900">{sub.marksObtained}</td>
                    <td className="py-2 px-3 border border-slate-300 text-center font-semibold text-saffron-700">{sub.grade || 'A'}</td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="5" className="py-3 text-center text-slate-500">Subject marks records verified.</td>
                </tr>
              )}
            </tbody>
            {/* Table Footer Summary */}
            <tfoot className="bg-slate-100 font-bold text-slate-900">
              <tr>
                <td colSpan="2" className="py-2.5 px-3 border border-slate-300 text-right uppercase text-xs">
                  Grand Total
                </td>
                <td className="py-2.5 px-3 border border-slate-300 text-center">
                  {result.maxTotal || 500}
                </td>
                <td className="py-2.5 px-3 border border-slate-300 text-center text-sm text-saffron-700">
                  {result.totalMarks}
                </td>
                <td className="py-2.5 px-3 border border-slate-300 text-center text-sm">
                  {result.percentage}%
                </td>
              </tr>
            </tfoot>
          </table>
        </div>

        {/* Result Status Banner */}
        <div className="bg-gradient-to-r from-emerald-50 via-green-50 to-emerald-50 border border-green-300 p-4 rounded-lg flex flex-wrap items-center justify-between gap-4 mb-8">
          <div className="flex items-center gap-3">
            <CheckCircle className="w-8 h-8 text-green-600 flex-shrink-0" />
            <div>
              <div className="text-xs text-slate-600 font-medium uppercase">Final Result</div>
              <div className="text-base font-extrabold text-green-800 tracking-wide">
                {result.status}: {result.division}
              </div>
            </div>
          </div>
          <div className="text-right">
            <div className="text-xs text-slate-500 font-medium">Aggregated Percentage</div>
            <div className="text-xl font-black text-slate-900">{result.percentage}%</div>
          </div>
        </div>

        {/* Signatures & Seal */}
        <div className="flex items-end justify-between pt-10 border-t border-dashed border-slate-300 text-xs text-slate-600">
          <div className="text-center">
            <div className="w-24 h-24 border-2 border-dashed border-slate-300 rounded-full flex items-center justify-center text-[10px] text-slate-400 mx-auto mb-1">
              [ School Seal ]
            </div>
            <p className="font-semibold text-slate-700">College Office Seal</p>
          </div>

          <div className="text-center">
            <div className="h-10"></div>
            <div className="w-36 border-b border-slate-800 mx-auto mb-1"></div>
            <p className="font-semibold text-slate-700">Exam Controller</p>
          </div>

          <div className="text-center">
            <div className="h-10 flex items-center justify-center">
              <span className="font-serif italic text-sm text-slate-600 font-bold">Principal Office</span>
            </div>
            <div className="w-36 border-b border-slate-800 mx-auto mb-1"></div>
            <p className="font-semibold text-slate-700">Principal Signature</p>
          </div>
        </div>

        <div className="mt-8 pt-3 border-t border-slate-200 text-center text-[10px] text-slate-400">
          * This is an authentic digital statement of marks published by VSS Saraswati Vidya Mandir Inter College, Arkha.
        </div>
      </div>
    </div>
  );
};
