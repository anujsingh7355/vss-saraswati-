import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { api } from '../services/api';
import {
  Users,
  Bell,
  Calendar,
  Image as ImageIcon,
  Award,
  FileText,
  MessageSquare,
  Settings,
  LogOut,
  Plus,
  Trash2,
  CheckCircle,
  AlertCircle,
  Home,
  Check,
  X,
  ExternalLink,
  Edit2
} from 'lucide-react';

export const AdminDashboardPage = () => {
  const { admin, logout, isAuthenticated, loading: authLoading } = useAuth();
  const navigate = useNavigate();

  const [activeTab, setActiveTab] = useState('overview');
  const [stats, setStats] = useState(null);
  const [enquiries, setEnquiries] = useState([]);
  const [notices, setNotices] = useState([]);
  const [events, setEvents] = useState([]);
  const [faculty, setFaculty] = useState([]);
  const [results, setResults] = useState([]);
  const [gallery, setGallery] = useState([]);
  const [downloads, setDownloads] = useState([]);
  const [contacts, setContacts] = useState([]);
  const [settings, setSettings] = useState(null);

  const [feedback, setFeedback] = useState({ type: '', text: '' });
  const [isActionLoading, setIsActionLoading] = useState(false);

  // Forms states
  const [noticeForm, setNoticeForm] = useState({ title: '', titleHindi: '', category: 'Admissions', description: '', isImportant: false, pdfUrl: '', date: new Date().toISOString().split('T')[0] });
  const [eventForm, setEventForm] = useState({ title: '', titleHindi: '', date: '', time: '10:00 AM', location: 'School Auditorium, Arkha', category: 'Cultural', description: '', image: '', status: 'Upcoming' });
  const [facultyForm, setFacultyForm] = useState({ name: '', designation: '', department: 'Senior Secondary (Inter)', subject: '', qualification: '', experience: '', photo: '' });
  const [resultForm, setResultForm] = useState({ rollNumber: '', studentName: '', fatherName: '', dob: '', classLevel: 'Class 10th', totalMarks: 450, maxTotal: 500, percentage: 90, status: 'PASSED', division: 'First Division' });
  const [galleryForm, setGalleryForm] = useState({ title: '', album: 'School Campus', image: '' });
  const [downloadForm, setDownloadForm] = useState({ title: '', category: 'Syllabus', url: '', description: '', fileSize: '1.2 MB' });

  useEffect(() => {
    if (!authLoading && !isAuthenticated) {
      navigate('/admin/login');
    }
  }, [isAuthenticated, authLoading, navigate]);

  const loadAllData = async () => {
    try {
      const [sRes, enqRes, nRes, eRes, fRes, rRes, gRes, dRes, cRes, setRes] = await Promise.all([
        api.getStats(),
        api.getEnquiries(),
        api.getNotices(),
        api.getEvents(),
        api.getFaculty(),
        api.getResults(),
        api.getGallery(),
        api.getDownloads(),
        api.getContacts(),
        api.getSettings()
      ]);
      if (sRes.success) setStats(sRes.data);
      if (enqRes.success) setEnquiries(enqRes.data);
      if (nRes.success) setNotices(nRes.data);
      if (eRes.success) setEvents(eRes.data);
      if (fRes.success) setFaculty(fRes.data);
      if (rRes.success) setResults(rRes.data);
      if (gRes.success) setGallery(gRes.data);
      if (dRes.success) setDownloads(dRes.data);
      if (cRes.success) setContacts(cRes.data);
      if (setRes.success) setSettings(setRes.data);
    } catch (err) {
      console.warn('Dashboard data fetch error:', err.message);
    }
  };

  useEffect(() => {
    if (isAuthenticated) {
      loadAllData();
    }
  }, [isAuthenticated]);

  const showFeedback = (type, text) => {
    setFeedback({ type, text });
    setTimeout(() => setFeedback({ type: '', text: '' }), 4000);
  };

  // --- Actions ---
  const handleCreateNotice = async (e) => {
    e.preventDefault();
    setIsActionLoading(true);
    try {
      const res = await api.createNotice(noticeForm);
      if (res.success) {
        showFeedback('success', 'Notice created and published on website!');
        setNoticeForm({ title: '', titleHindi: '', category: 'Admissions', description: '', isImportant: false, pdfUrl: '', date: new Date().toISOString().split('T')[0] });
        loadAllData();
      }
    } catch (err) {
      showFeedback('error', 'Failed to publish notice.');
    } finally {
      setIsActionLoading(false);
    }
  };

  const handleDeleteNotice = async (id) => {
    if (!window.confirm('Are you sure you want to delete this notice?')) return;
    try {
      const res = await api.deleteNotice(id);
      if (res.success) {
        showFeedback('success', 'Notice removed.');
        loadAllData();
      }
    } catch (err) {
      showFeedback('error', 'Error deleting notice.');
    }
  };

  const handleCreateEvent = async (e) => {
    e.preventDefault();
    setIsActionLoading(true);
    try {
      const res = await api.createEvent(eventForm);
      if (res.success) {
        showFeedback('success', 'Event added successfully!');
        setEventForm({ title: '', titleHindi: '', date: '', time: '10:00 AM', location: 'School Auditorium, Arkha', category: 'Cultural', description: '', image: '', status: 'Upcoming' });
        loadAllData();
      }
    } catch (err) {
      showFeedback('error', 'Failed to create event.');
    } finally {
      setIsActionLoading(false);
    }
  };

  const handleDeleteEvent = async (id) => {
    if (!window.confirm('Delete this event?')) return;
    try {
      const res = await api.deleteEvent(id);
      if (res.success) {
        showFeedback('success', 'Event deleted.');
        loadAllData();
      }
    } catch (err) {
      showFeedback('error', 'Error deleting event.');
    }
  };

  const handleCreateFaculty = async (e) => {
    e.preventDefault();
    setIsActionLoading(true);
    try {
      const res = await api.createFaculty(facultyForm);
      if (res.success) {
        showFeedback('success', 'Teacher added to faculty directory!');
        setFacultyForm({ name: '', designation: '', department: 'Senior Secondary (Inter)', subject: '', qualification: '', experience: '', photo: '' });
        loadAllData();
      }
    } catch (err) {
      showFeedback('error', 'Failed to add faculty member.');
    } finally {
      setIsActionLoading(false);
    }
  };

  const handleDeleteFaculty = async (id) => {
    if (!window.confirm('Remove this teacher profile?')) return;
    try {
      const res = await api.deleteFaculty(id);
      if (res.success) {
        showFeedback('success', 'Faculty profile removed.');
        loadAllData();
      }
    } catch (err) {
      showFeedback('error', 'Error removing faculty.');
    }
  };

  const handleCreateResult = async (e) => {
    e.preventDefault();
    setIsActionLoading(true);
    try {
      const res = await api.createResult(resultForm);
      if (res.success) {
        showFeedback('success', `Result for Roll #${resultForm.rollNumber} published!`);
        setResultForm({ rollNumber: '', studentName: '', fatherName: '', dob: '', classLevel: 'Class 10th', totalMarks: 450, maxTotal: 500, percentage: 90, status: 'PASSED', division: 'First Division' });
        loadAllData();
      }
    } catch (err) {
      showFeedback('error', 'Failed to save student result.');
    } finally {
      setIsActionLoading(false);
    }
  };

  const handleDeleteResult = async (id) => {
    if (!window.confirm('Delete this student result record?')) return;
    try {
      const res = await api.deleteResult(id);
      if (res.success) {
        showFeedback('success', 'Student result record deleted.');
        loadAllData();
      }
    } catch (err) {
      showFeedback('error', 'Error deleting result.');
    }
  };

  const handleCreateGallery = async (e) => {
    e.preventDefault();
    setIsActionLoading(true);
    try {
      const res = await api.createGalleryItem(galleryForm);
      if (res.success) {
        showFeedback('success', 'Photo added to album!');
        setGalleryForm({ title: '', album: 'School Campus', image: '' });
        loadAllData();
      }
    } catch (err) {
      showFeedback('error', 'Failed to add photo.');
    } finally {
      setIsActionLoading(false);
    }
  };

  const handleDeleteGallery = async (id) => {
    if (!window.confirm('Delete this gallery photo?')) return;
    try {
      const res = await api.deleteGalleryItem(id);
      if (res.success) {
        showFeedback('success', 'Photo deleted from gallery.');
        loadAllData();
      }
    } catch (err) {
      showFeedback('error', 'Error deleting photo.');
    }
  };

  const handleCreateDownload = async (e) => {
    e.preventDefault();
    setIsActionLoading(true);
    try {
      const res = await api.createDownload(downloadForm);
      if (res.success) {
        showFeedback('success', 'Document added to downloads list!');
        setDownloadForm({ title: '', category: 'Syllabus', url: '', description: '', fileSize: '1.2 MB' });
        loadAllData();
      }
    } catch (err) {
      showFeedback('error', 'Failed to add download item.');
    } finally {
      setIsActionLoading(false);
    }
  };

  const handleDeleteDownload = async (id) => {
    if (!window.confirm('Delete this download document?')) return;
    try {
      const res = await api.deleteDownload(id);
      if (res.success) {
        showFeedback('success', 'Document removed.');
        loadAllData();
      }
    } catch (err) {
      showFeedback('error', 'Error deleting document.');
    }
  };

  const handleUpdateEnquiryStatus = async (id, status) => {
    try {
      const res = await api.updateEnquiryStatus(id, status);
      if (res.success) {
        showFeedback('success', `Enquiry marked as ${status}`);
        loadAllData();
      }
    } catch (err) {
      showFeedback('error', 'Failed to update enquiry status.');
    }
  };

  const handleDeleteEnquiry = async (id) => {
    if (!window.confirm('Delete this enquiry record?')) return;
    try {
      const res = await api.deleteEnquiry(id);
      if (res.success) {
        showFeedback('success', 'Enquiry deleted.');
        loadAllData();
      }
    } catch (err) {
      showFeedback('error', 'Failed to delete enquiry.');
    }
  };

  const handleSaveSettings = async (e) => {
    e.preventDefault();
    setIsActionLoading(true);
    try {
      const res = await api.updateSettings(settings);
      if (res.success) {
        showFeedback('success', 'School settings updated successfully!');
      }
    } catch (err) {
      showFeedback('error', 'Failed to save settings.');
    } finally {
      setIsActionLoading(false);
    }
  };

  if (authLoading || !isAuthenticated) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-900 text-white text-xs">
        Authenticating administrator session...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-100 flex flex-col">
      {/* Admin Top Navigation */}
      <header className="bg-slate-900 text-white px-4 py-3 border-b border-saffron-600/40 flex items-center justify-between sticky top-0 z-40">
        <div className="flex items-center gap-3">
          <img src="/logo.svg" alt="Logo" className="w-9 h-9 object-contain" />
          <div>
            <h1 className="font-bold text-xs sm:text-sm text-amber-300 leading-tight">
              VSS SVM Inter College, Arkha
            </h1>
            <p className="text-[10px] text-slate-400">Admin Management Portal</p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <Link
            to="/"
            target="_blank"
            className="hidden sm:flex items-center gap-1 text-slate-300 hover:text-white text-xs px-2.5 py-1 rounded bg-slate-800 hover:bg-slate-700 transition"
          >
            <ExternalLink className="w-3.5 h-3.5" />
            <span>View Public Website</span>
          </Link>
          <button
            onClick={logout}
            className="flex items-center gap-1.5 bg-red-600/90 hover:bg-red-600 text-white px-3 py-1.5 rounded-lg text-xs font-semibold transition"
          >
            <LogOut className="w-3.5 h-3.5" />
            <span>Sign Out</span>
          </button>
        </div>
      </header>

      {/* Main Container */}
      <div className="max-w-7xl mx-auto w-full px-4 py-6 flex-1 flex flex-col md:flex-row gap-6">
        {/* Sidebar Tabs */}
        <aside className="w-full md:w-60 flex-shrink-0 space-y-1 bg-white p-3 rounded-2xl shadow-sm border border-slate-200 h-fit">
          <button
            onClick={() => setActiveTab('overview')}
            className={`w-full flex items-center gap-2.5 px-3 py-2.5 rounded-xl text-xs font-bold transition text-left ${
              activeTab === 'overview' ? 'bg-saffron-600 text-white shadow-sm' : 'text-slate-600 hover:bg-slate-100'
            }`}
          >
            <Home className="w-4 h-4" />
            <span>Overview Stats</span>
          </button>

          <button
            onClick={() => setActiveTab('enquiries')}
            className={`w-full flex items-center justify-between px-3 py-2.5 rounded-xl text-xs font-bold transition text-left ${
              activeTab === 'enquiries' ? 'bg-saffron-600 text-white shadow-sm' : 'text-slate-600 hover:bg-slate-100'
            }`}
          >
            <div className="flex items-center gap-2.5">
              <Users className="w-4 h-4" />
              <span>Admissions</span>
            </div>
            {enquiries.filter(e => e.status === 'Pending').length > 0 && (
              <span className="bg-red-500 text-white text-[10px] px-1.5 py-0.2 rounded-full font-bold">
                {enquiries.filter(e => e.status === 'Pending').length}
              </span>
            )}
          </button>

          <button
            onClick={() => setActiveTab('notices')}
            className={`w-full flex items-center gap-2.5 px-3 py-2.5 rounded-xl text-xs font-bold transition text-left ${
              activeTab === 'notices' ? 'bg-saffron-600 text-white shadow-sm' : 'text-slate-600 hover:bg-slate-100'
            }`}
          >
            <Bell className="w-4 h-4" />
            <span>Notices</span>
          </button>

          <button
            onClick={() => setActiveTab('events')}
            className={`w-full flex items-center gap-2.5 px-3 py-2.5 rounded-xl text-xs font-bold transition text-left ${
              activeTab === 'events' ? 'bg-saffron-600 text-white shadow-sm' : 'text-slate-600 hover:bg-slate-100'
            }`}
          >
            <Calendar className="w-4 h-4" />
            <span>Events</span>
          </button>

          <button
            onClick={() => setActiveTab('faculty')}
            className={`w-full flex items-center gap-2.5 px-3 py-2.5 rounded-xl text-xs font-bold transition text-left ${
              activeTab === 'faculty' ? 'bg-saffron-600 text-white shadow-sm' : 'text-slate-600 hover:bg-slate-100'
            }`}
          >
            <Users className="w-4 h-4" />
            <span>Faculty</span>
          </button>

          <button
            onClick={() => setActiveTab('results')}
            className={`w-full flex items-center gap-2.5 px-3 py-2.5 rounded-xl text-xs font-bold transition text-left ${
              activeTab === 'results' ? 'bg-saffron-600 text-white shadow-sm' : 'text-slate-600 hover:bg-slate-100'
            }`}
          >
            <Award className="w-4 h-4" />
            <span>Results</span>
          </button>

          <button
            onClick={() => setActiveTab('gallery')}
            className={`w-full flex items-center gap-2.5 px-3 py-2.5 rounded-xl text-xs font-bold transition text-left ${
              activeTab === 'gallery' ? 'bg-saffron-600 text-white shadow-sm' : 'text-slate-600 hover:bg-slate-100'
            }`}
          >
            <ImageIcon className="w-4 h-4" />
            <span>Gallery</span>
          </button>

          <button
            onClick={() => setActiveTab('downloads')}
            className={`w-full flex items-center gap-2.5 px-3 py-2.5 rounded-xl text-xs font-bold transition text-left ${
              activeTab === 'downloads' ? 'bg-saffron-600 text-white shadow-sm' : 'text-slate-600 hover:bg-slate-100'
            }`}
          >
            <FileText className="w-4 h-4" />
            <span>Downloads</span>
          </button>

          <button
            onClick={() => setActiveTab('contacts')}
            className={`w-full flex items-center gap-2.5 px-3 py-2.5 rounded-xl text-xs font-bold transition text-left ${
              activeTab === 'contacts' ? 'bg-saffron-600 text-white shadow-sm' : 'text-slate-600 hover:bg-slate-100'
            }`}
          >
            <MessageSquare className="w-4 h-4" />
            <span>Contact Queries</span>
          </button>

          <button
            onClick={() => setActiveTab('settings')}
            className={`w-full flex items-center gap-2.5 px-3 py-2.5 rounded-xl text-xs font-bold transition text-left ${
              activeTab === 'settings' ? 'bg-saffron-600 text-white shadow-sm' : 'text-slate-600 hover:bg-slate-100'
            }`}
          >
            <Settings className="w-4 h-4" />
            <span>School Settings</span>
          </button>
        </aside>

        {/* Tab Content Body */}
        <main className="flex-1 space-y-6">
          {/* Notification Alert */}
          {feedback.text && (
            <div className={`p-4 rounded-xl text-xs font-semibold flex items-center gap-2 animate-fadeIn ${
              feedback.type === 'success' ? 'bg-emerald-50 text-emerald-800 border border-emerald-300' : 'bg-red-50 text-red-800 border border-red-300'
            }`}>
              {feedback.type === 'success' ? <CheckCircle className="w-4 h-4" /> : <AlertCircle className="w-4 h-4" />}
              <span>{feedback.text}</span>
            </div>
          )}

          {/* OVERVIEW STATS (Requirement #16) */}
          {activeTab === 'overview' && (
            <div className="space-y-6">
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                <div className="bg-white p-5 rounded-2xl shadow-sm border border-slate-200">
                  <span className="text-xs text-slate-500 font-medium">Total Admission Enquiries</span>
                  <div className="text-2xl font-extrabold text-slate-900 mt-1">{stats?.totalEnquiries || enquiries.length}</div>
                  <span className="text-[10px] text-amber-700 font-semibold">{stats?.pendingEnquiries || 0} Pending</span>
                </div>

                <div className="bg-white p-5 rounded-2xl shadow-sm border border-slate-200">
                  <span className="text-xs text-slate-500 font-medium">Published Notices</span>
                  <div className="text-2xl font-extrabold text-slate-900 mt-1">{stats?.totalNotices || notices.length}</div>
                  <span className="text-[10px] text-emerald-700 font-semibold">Active on Portal</span>
                </div>

                <div className="bg-white p-5 rounded-2xl shadow-sm border border-slate-200">
                  <span className="text-xs text-slate-500 font-medium">Total Events</span>
                  <div className="text-2xl font-extrabold text-slate-900 mt-1">{stats?.totalEvents || events.length}</div>
                  <span className="text-[10px] text-blue-700 font-semibold">Scheduled</span>
                </div>

                <div className="bg-white p-5 rounded-2xl shadow-sm border border-slate-200">
                  <span className="text-xs text-slate-500 font-medium">Student Results</span>
                  <div className="text-2xl font-extrabold text-slate-900 mt-1">{stats?.totalResults || results.length}</div>
                  <span className="text-[10px] text-purple-700 font-semibold">Board Records</span>
                </div>
              </div>

              {/* Recent Enquiries Preview */}
              <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="font-bold text-slate-900 text-sm">Recent Admission Enquiries</h3>
                  <button onClick={() => setActiveTab('enquiries')} className="text-xs font-semibold text-saffron-700 hover:underline">
                    View All →
                  </button>
                </div>

                <div className="overflow-x-auto">
                  <table className="w-full text-xs text-left">
                    <thead className="bg-slate-50 text-slate-600 uppercase text-[10px]">
                      <tr>
                        <th className="py-2.5 px-3">Student Name</th>
                        <th className="py-2.5 px-3">Class</th>
                        <th className="py-2.5 px-3">Mobile</th>
                        <th className="py-2.5 px-3">Date</th>
                        <th className="py-2.5 px-3">Status</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100">
                      {enquiries.slice(0, 5).map(e => (
                        <tr key={e.id} className="hover:bg-slate-50">
                          <td className="py-2.5 px-3 font-semibold text-slate-900">{e.studentName}</td>
                          <td className="py-2.5 px-3 text-slate-600">{e.selectedClass}</td>
                          <td className="py-2.5 px-3 text-slate-600 font-mono">{e.mobile}</td>
                          <td className="py-2.5 px-3 text-slate-400">{e.createdAt?.split('T')[0] || 'Recent'}</td>
                          <td className="py-2.5 px-3">
                            <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                              e.status === 'Pending' ? 'bg-amber-100 text-amber-800' : 'bg-emerald-100 text-emerald-800'
                            }`}>
                              {e.status}
                            </span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}

          {/* ADMISSION ENQUIRIES TAB */}
          {activeTab === 'enquiries' && (
            <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200 space-y-4">
              <div className="flex items-center justify-between border-b border-slate-100 pb-4">
                <div>
                  <h3 className="font-bold text-slate-900 text-base">Admission Enquiries & Applications</h3>
                  <p className="text-xs text-slate-500">Manage prospective candidate inquiries received from website.</p>
                </div>
                <span className="text-xs font-bold text-saffron-800 bg-amber-50 px-3 py-1 rounded-full border border-amber-200">
                  Total: {enquiries.length}
                </span>
              </div>

              <div className="space-y-4">
                {enquiries.map((enq) => (
                  <div key={enq.id} className="p-4 rounded-xl border border-slate-200 bg-slate-50/50 space-y-2">
                    <div className="flex flex-wrap items-center justify-between gap-2">
                      <div>
                        <span className="font-bold text-slate-900 text-sm">{enq.studentName}</span>
                        <span className="text-xs text-slate-500 ml-2">Class: <strong>{enq.selectedClass}</strong></span>
                      </div>
                      <div className="flex items-center gap-2">
                        <select
                          value={enq.status}
                          onChange={(e) => handleUpdateEnquiryStatus(enq.id, e.target.value)}
                          className="text-xs px-2 py-1 rounded border border-slate-300 bg-white font-medium"
                        >
                          <option value="Pending">Pending</option>
                          <option value="Contacted">Contacted</option>
                          <option value="Admitted">Admitted</option>
                        </select>
                        <button
                          onClick={() => handleDeleteEnquiry(enq.id)}
                          className="p-1 text-slate-400 hover:text-red-600 rounded transition"
                          title="Delete"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 text-xs text-slate-600">
                      <div>Father: <strong>{enq.fatherName}</strong></div>
                      <div>Mobile: <strong className="font-mono text-saffron-700">{enq.mobile}</strong></div>
                      <div>DOB: <strong>{enq.dob || 'N/A'}</strong></div>
                      {enq.email && <div>Email: {enq.email}</div>}
                      {enq.address && <div>Address: {enq.address}</div>}
                      {enq.previousSchool && <div>Prev. School: {enq.previousSchool}</div>}
                    </div>

                    {enq.message && (
                      <p className="text-xs text-slate-600 bg-white p-2.5 rounded border border-slate-200 italic">
                        "{enq.message}"
                      </p>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* NOTICES TAB */}
          {activeTab === 'notices' && (
            <div className="space-y-6">
              {/* Add Notice Form */}
              <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200 space-y-4">
                <h3 className="font-bold text-slate-900 text-base flex items-center gap-2">
                  <Plus className="w-4 h-4 text-saffron-600" />
                  <span>Publish New Notice</span>
                </h3>
                <form onSubmit={handleCreateNotice} className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold text-slate-700 uppercase mb-1">Title (English) *</label>
                      <input
                        type="text"
                        required
                        value={noticeForm.title}
                        onChange={(e) => setNoticeForm({ ...noticeForm, title: e.target.value })}
                        placeholder="e.g. Science Exhibition Registration Open"
                        className="w-full px-3 py-2 rounded-lg border border-slate-300 text-xs"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-slate-700 uppercase mb-1">Title (Hindi)</label>
                      <input
                        type="text"
                        value={noticeForm.titleHindi}
                        onChange={(e) => setNoticeForm({ ...noticeForm, titleHindi: e.target.value })}
                        placeholder="e.g. विज्ञान प्रदर्शनी पंजीकरण सूचना"
                        className="w-full px-3 py-2 rounded-lg border border-slate-300 text-xs font-hindi"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    <div>
                      <label className="block text-xs font-bold text-slate-700 uppercase mb-1">Category</label>
                      <select
                        value={noticeForm.category}
                        onChange={(e) => setNoticeForm({ ...noticeForm, category: e.target.value })}
                        className="w-full px-3 py-2 rounded-lg border border-slate-300 text-xs bg-white"
                      >
                        <option value="Admissions">Admissions</option>
                        <option value="Examinations">Examinations</option>
                        <option value="Academic">Academic</option>
                        <option value="Sports">Sports</option>
                        <option value="General">General</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-slate-700 uppercase mb-1">Notice Date</label>
                      <input
                        type="date"
                        value={noticeForm.date}
                        onChange={(e) => setNoticeForm({ ...noticeForm, date: e.target.value })}
                        className="w-full px-3 py-2 rounded-lg border border-slate-300 text-xs"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-slate-700 uppercase mb-1">PDF File URL</label>
                      <input
                        type="text"
                        value={noticeForm.pdfUrl}
                        onChange={(e) => setNoticeForm({ ...noticeForm, pdfUrl: e.target.value })}
                        placeholder="/documents/circular.pdf"
                        className="w-full px-3 py-2 rounded-lg border border-slate-300 text-xs"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 uppercase mb-1">Notice Details</label>
                    <textarea
                      rows="2"
                      value={noticeForm.description}
                      onChange={(e) => setNoticeForm({ ...noticeForm, description: e.target.value })}
                      placeholder="Detailed content of the notice circular..."
                      className="w-full px-3 py-2 rounded-lg border border-slate-300 text-xs"
                    ></textarea>
                  </div>

                  <div className="flex items-center justify-between pt-2">
                    <label className="flex items-center gap-2 text-xs font-semibold text-slate-700 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={noticeForm.isImportant}
                        onChange={(e) => setNoticeForm({ ...noticeForm, isImportant: e.target.checked })}
                      />
                      <span>Mark as Important (Pulsing badge)</span>
                    </label>

                    <button
                      type="submit"
                      disabled={isActionLoading}
                      className="bg-saffron-600 hover:bg-saffron-700 text-white font-bold px-5 py-2.5 rounded-lg text-xs uppercase tracking-wider transition"
                    >
                      Publish Notice
                    </button>
                  </div>
                </form>
              </div>

              {/* Notices List */}
              <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200 space-y-3">
                <h4 className="font-bold text-slate-900 text-sm mb-3">Published Notices ({notices.length})</h4>
                {notices.map(n => (
                  <div key={n.id} className="p-3 rounded-xl border border-slate-200 flex items-center justify-between gap-4">
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-amber-100 text-amber-800">{n.category}</span>
                        {n.isImportant && <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-red-100 text-red-700">Important</span>}
                        <span className="text-[11px] text-slate-400">{n.date}</span>
                      </div>
                      <h5 className="font-bold text-slate-900 text-xs mt-1">{n.title}</h5>
                    </div>
                    <button
                      onClick={() => handleDeleteNotice(n.id)}
                      className="p-1.5 text-slate-400 hover:text-red-600 rounded"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* EVENTS TAB */}
          {activeTab === 'events' && (
            <div className="space-y-6">
              <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200 space-y-4">
                <h3 className="font-bold text-slate-900 text-base flex items-center gap-2">
                  <Plus className="w-4 h-4 text-saffron-600" />
                  <span>Add School Event</span>
                </h3>
                <form onSubmit={handleCreateEvent} className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold text-slate-700 uppercase mb-1">Event Name *</label>
                      <input
                        type="text"
                        required
                        value={eventForm.title}
                        onChange={(e) => setEventForm({ ...eventForm, title: e.target.value })}
                        placeholder="e.g. Annual Khel Mahotsav"
                        className="w-full px-3 py-2 rounded-lg border border-slate-300 text-xs"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-slate-700 uppercase mb-1">Date *</label>
                      <input
                        type="date"
                        required
                        value={eventForm.date}
                        onChange={(e) => setEventForm({ ...eventForm, date: e.target.value })}
                        className="w-full px-3 py-2 rounded-lg border border-slate-300 text-xs"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    <div>
                      <label className="block text-xs font-bold text-slate-700 uppercase mb-1">Time</label>
                      <input
                        type="text"
                        value={eventForm.time}
                        onChange={(e) => setEventForm({ ...eventForm, time: e.target.value })}
                        placeholder="10:00 AM"
                        className="w-full px-3 py-2 rounded-lg border border-slate-300 text-xs"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-slate-700 uppercase mb-1">Location</label>
                      <input
                        type="text"
                        value={eventForm.location}
                        onChange={(e) => setEventForm({ ...eventForm, location: e.target.value })}
                        placeholder="School Prangan, Arkha"
                        className="w-full px-3 py-2 rounded-lg border border-slate-300 text-xs"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-slate-700 uppercase mb-1">Category</label>
                      <select
                        value={eventForm.category}
                        onChange={(e) => setEventForm({ ...eventForm, category: e.target.value })}
                        className="w-full px-3 py-2 rounded-lg border border-slate-300 text-xs bg-white"
                      >
                        <option value="Cultural">Cultural</option>
                        <option value="Sports">Sports</option>
                        <option value="Academics">Academics</option>
                        <option value="National">National</option>
                      </select>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold text-slate-700 uppercase mb-1">Image URL</label>
                      <input
                        type="text"
                        value={eventForm.image}
                        onChange={(e) => setEventForm({ ...eventForm, image: e.target.value })}
                        placeholder="https://images.unsplash.com/..."
                        className="w-full px-3 py-2 rounded-lg border border-slate-300 text-xs"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-slate-700 uppercase mb-1">Status</label>
                      <select
                        value={eventForm.status}
                        onChange={(e) => setEventForm({ ...eventForm, status: e.target.value })}
                        className="w-full px-3 py-2 rounded-lg border border-slate-300 text-xs bg-white"
                      >
                        <option value="Upcoming">Upcoming</option>
                        <option value="Completed">Completed</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 uppercase mb-1">Description</label>
                    <textarea
                      rows="2"
                      value={eventForm.description}
                      onChange={(e) => setEventForm({ ...eventForm, description: e.target.value })}
                      placeholder="Details of the event..."
                      className="w-full px-3 py-2 rounded-lg border border-slate-300 text-xs"
                    ></textarea>
                  </div>

                  <div className="text-right">
                    <button
                      type="submit"
                      disabled={isActionLoading}
                      className="bg-saffron-600 hover:bg-saffron-700 text-white font-bold px-5 py-2.5 rounded-lg text-xs uppercase tracking-wider transition"
                    >
                      Save Event
                    </button>
                  </div>
                </form>
              </div>

              {/* Events List */}
              <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200 space-y-3">
                <h4 className="font-bold text-slate-900 text-sm mb-3">Managed Events ({events.length})</h4>
                {events.map(ev => (
                  <div key={ev.id} className="p-3 rounded-xl border border-slate-200 flex items-center justify-between gap-4">
                    <div>
                      <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-amber-100 text-amber-800">{ev.category}</span>
                      <h5 className="font-bold text-slate-900 text-xs mt-1">{ev.title}</h5>
                      <span className="text-[11px] text-slate-400">{ev.date} • {ev.location}</span>
                    </div>
                    <button onClick={() => handleDeleteEvent(ev.id)} className="p-1.5 text-slate-400 hover:text-red-600">
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* FACULTY TAB */}
          {activeTab === 'faculty' && (
            <div className="space-y-6">
              <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200 space-y-4">
                <h3 className="font-bold text-slate-900 text-base flex items-center gap-2">
                  <Plus className="w-4 h-4 text-saffron-600" />
                  <span>Add Faculty / Teacher Member</span>
                </h3>
                <form onSubmit={handleCreateFaculty} className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold text-slate-700 uppercase mb-1">Full Name *</label>
                      <input
                        type="text"
                        required
                        value={facultyForm.name}
                        onChange={(e) => setFacultyForm({ ...facultyForm, name: e.target.value })}
                        placeholder="e.g. Shri R. K. Mishra"
                        className="w-full px-3 py-2 rounded-lg border border-slate-300 text-xs"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-slate-700 uppercase mb-1">Designation *</label>
                      <input
                        type="text"
                        required
                        value={facultyForm.designation}
                        onChange={(e) => setFacultyForm({ ...facultyForm, designation: e.target.value })}
                        placeholder="e.g. PGT Physics (प्रवक्ता)"
                        className="w-full px-3 py-2 rounded-lg border border-slate-300 text-xs"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    <div>
                      <label className="block text-xs font-bold text-slate-700 uppercase mb-1">Department</label>
                      <select
                        value={facultyForm.department}
                        onChange={(e) => setFacultyForm({ ...facultyForm, department: e.target.value })}
                        className="w-full px-3 py-2 rounded-lg border border-slate-300 text-xs bg-white"
                      >
                        <option value="Administration">Administration</option>
                        <option value="Senior Secondary (Inter)">Senior Secondary (Inter)</option>
                        <option value="High School">High School</option>
                        <option value="Computer & IT">Computer & IT</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-slate-700 uppercase mb-1">Subject</label>
                      <input
                        type="text"
                        value={facultyForm.subject}
                        onChange={(e) => setFacultyForm({ ...facultyForm, subject: e.target.value })}
                        placeholder="Physics"
                        className="w-full px-3 py-2 rounded-lg border border-slate-300 text-xs"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-slate-700 uppercase mb-1">Experience</label>
                      <input
                        type="text"
                        value={facultyForm.experience}
                        onChange={(e) => setFacultyForm({ ...facultyForm, experience: e.target.value })}
                        placeholder="12 Years"
                        className="w-full px-3 py-2 rounded-lg border border-slate-300 text-xs"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold text-slate-700 uppercase mb-1">Qualification</label>
                      <input
                        type="text"
                        value={facultyForm.qualification}
                        onChange={(e) => setFacultyForm({ ...facultyForm, qualification: e.target.value })}
                        placeholder="M.Sc. (Physics), B.Ed."
                        className="w-full px-3 py-2 rounded-lg border border-slate-300 text-xs"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-slate-700 uppercase mb-1">Photo URL</label>
                      <input
                        type="text"
                        value={facultyForm.photo}
                        onChange={(e) => setFacultyForm({ ...facultyForm, photo: e.target.value })}
                        placeholder="https://..."
                        className="w-full px-3 py-2 rounded-lg border border-slate-300 text-xs"
                      />
                    </div>
                  </div>

                  <div className="text-right">
                    <button
                      type="submit"
                      disabled={isActionLoading}
                      className="bg-saffron-600 hover:bg-saffron-700 text-white font-bold px-5 py-2.5 rounded-lg text-xs uppercase tracking-wider transition"
                    >
                      Save Teacher Profile
                    </button>
                  </div>
                </form>
              </div>

              {/* Faculty List */}
              <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200 space-y-3">
                <h4 className="font-bold text-slate-900 text-sm mb-3">Staff Directory ({faculty.length})</h4>
                {faculty.map(f => (
                  <div key={f.id} className="p-3 rounded-xl border border-slate-200 flex items-center justify-between gap-4">
                    <div>
                      <h5 className="font-bold text-slate-900 text-xs">{f.name}</h5>
                      <span className="text-[11px] text-slate-600">{f.designation} • {f.subject}</span>
                    </div>
                    <button onClick={() => handleDeleteFaculty(f.id)} className="p-1.5 text-slate-400 hover:text-red-600">
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* RESULTS TAB */}
          {activeTab === 'results' && (
            <div className="space-y-6">
              <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200 space-y-4">
                <h3 className="font-bold text-slate-900 text-base flex items-center gap-2">
                  <Plus className="w-4 h-4 text-saffron-600" />
                  <span>Upload / Add Student Board Result</span>
                </h3>
                <form onSubmit={handleCreateResult} className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    <div>
                      <label className="block text-xs font-bold text-slate-700 uppercase mb-1">Roll Number *</label>
                      <input
                        type="text"
                        required
                        value={resultForm.rollNumber}
                        onChange={(e) => setResultForm({ ...resultForm, rollNumber: e.target.value })}
                        placeholder="2026105"
                        className="w-full px-3 py-2 rounded-lg border border-slate-300 text-xs font-mono"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-slate-700 uppercase mb-1">Student Name *</label>
                      <input
                        type="text"
                        required
                        value={resultForm.studentName}
                        onChange={(e) => setResultForm({ ...resultForm, studentName: e.target.value })}
                        placeholder="Suresh Kumar"
                        className="w-full px-3 py-2 rounded-lg border border-slate-300 text-xs"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-slate-700 uppercase mb-1">Father's Name</label>
                      <input
                        type="text"
                        value={resultForm.fatherName}
                        onChange={(e) => setResultForm({ ...resultForm, fatherName: e.target.value })}
                        placeholder="Shri Ram Kumar"
                        className="w-full px-3 py-2 rounded-lg border border-slate-300 text-xs"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
                    <div>
                      <label className="block text-xs font-bold text-slate-700 uppercase mb-1">Date of Birth</label>
                      <input
                        type="date"
                        value={resultForm.dob}
                        onChange={(e) => setResultForm({ ...resultForm, dob: e.target.value })}
                        className="w-full px-3 py-2 rounded-lg border border-slate-300 text-xs"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-slate-700 uppercase mb-1">Class / Stream</label>
                      <input
                        type="text"
                        value={resultForm.classLevel}
                        onChange={(e) => setResultForm({ ...resultForm, classLevel: e.target.value })}
                        placeholder="Class 10th"
                        className="w-full px-3 py-2 rounded-lg border border-slate-300 text-xs"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-slate-700 uppercase mb-1">Total Marks</label>
                      <input
                        type="number"
                        value={resultForm.totalMarks}
                        onChange={(e) => setResultForm({ ...resultForm, totalMarks: e.target.value })}
                        placeholder="480"
                        className="w-full px-3 py-2 rounded-lg border border-slate-300 text-xs"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-slate-700 uppercase mb-1">Percentage (%)</label>
                      <input
                        type="number"
                        step="0.01"
                        value={resultForm.percentage}
                        onChange={(e) => setResultForm({ ...resultForm, percentage: e.target.value })}
                        placeholder="92.5"
                        className="w-full px-3 py-2 rounded-lg border border-slate-300 text-xs"
                      />
                    </div>
                  </div>

                  <div className="text-right">
                    <button
                      type="submit"
                      disabled={isActionLoading}
                      className="bg-saffron-600 hover:bg-saffron-700 text-white font-bold px-5 py-2.5 rounded-lg text-xs uppercase tracking-wider transition"
                    >
                      Record Student Result
                    </button>
                  </div>
                </form>
              </div>

              {/* Results List */}
              <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200 space-y-3">
                <h4 className="font-bold text-slate-900 text-sm mb-3">Published Results Database ({results.length})</h4>
                {results.map(r => (
                  <div key={r.id} className="p-3 rounded-xl border border-slate-200 flex items-center justify-between gap-4">
                    <div>
                      <span className="font-mono font-bold text-saffron-700 text-xs">Roll: {r.rollNumber}</span>
                      <h5 className="font-bold text-slate-900 text-xs">{r.studentName} — {r.percentage}% ({r.status})</h5>
                      <span className="text-[11px] text-slate-500">{r.classLevel} • DOB: {r.dob}</span>
                    </div>
                    <button onClick={() => handleDeleteResult(r.id)} className="p-1.5 text-slate-400 hover:text-red-600">
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* GALLERY TAB */}
          {activeTab === 'gallery' && (
            <div className="space-y-6">
              <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200 space-y-4">
                <h3 className="font-bold text-slate-900 text-base flex items-center gap-2">
                  <Plus className="w-4 h-4 text-saffron-600" />
                  <span>Add Photo to Gallery</span>
                </h3>
                <form onSubmit={handleCreateGallery} className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold text-slate-700 uppercase mb-1">Photo Title *</label>
                      <input
                        type="text"
                        required
                        value={galleryForm.title}
                        onChange={(e) => setGalleryForm({ ...galleryForm, title: e.target.value })}
                        placeholder="e.g. Science Model Display"
                        className="w-full px-3 py-2 rounded-lg border border-slate-300 text-xs"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-slate-700 uppercase mb-1">Album</label>
                      <select
                        value={galleryForm.album}
                        onChange={(e) => setGalleryForm({ ...galleryForm, album: e.target.value })}
                        className="w-full px-3 py-2 rounded-lg border border-slate-300 text-xs bg-white"
                      >
                        <option value="School Campus">School Campus</option>
                        <option value="Classroom Activities">Classroom Activities</option>
                        <option value="Sports">Sports</option>
                        <option value="Cultural Activities">Cultural Activities</option>
                        <option value="Annual Function">Annual Function</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 uppercase mb-1">Image URL *</label>
                    <input
                      type="text"
                      required
                      value={galleryForm.image}
                      onChange={(e) => setGalleryForm({ ...galleryForm, image: e.target.value })}
                      placeholder="https://images.unsplash.com/..."
                      className="w-full px-3 py-2 rounded-lg border border-slate-300 text-xs"
                    />
                  </div>

                  <div className="text-right">
                    <button
                      type="submit"
                      disabled={isActionLoading}
                      className="bg-saffron-600 hover:bg-saffron-700 text-white font-bold px-5 py-2.5 rounded-lg text-xs uppercase tracking-wider transition"
                    >
                      Add Photo
                    </button>
                  </div>
                </form>
              </div>

              {/* Gallery Photos List */}
              <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200">
                <h4 className="font-bold text-slate-900 text-sm mb-4">Gallery Items ({gallery.length})</h4>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                  {gallery.map(g => (
                    <div key={g.id} className="relative rounded-xl overflow-hidden border border-slate-200 group">
                      <img src={g.image} alt={g.title} className="w-full h-32 object-cover" />
                      <div className="p-2 bg-white text-xs">
                        <div className="font-semibold truncate">{g.title}</div>
                        <div className="text-[10px] text-amber-700">{g.album}</div>
                      </div>
                      <button
                        onClick={() => handleDeleteGallery(g.id)}
                        className="absolute top-2 right-2 bg-red-600 text-white p-1 rounded-full opacity-80 hover:opacity-100 transition shadow"
                        title="Delete"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* DOWNLOADS TAB */}
          {activeTab === 'downloads' && (
            <div className="space-y-6">
              <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200 space-y-4">
                <h3 className="font-bold text-slate-900 text-base flex items-center gap-2">
                  <Plus className="w-4 h-4 text-saffron-600" />
                  <span>Add Downloadable Document</span>
                </h3>
                <form onSubmit={handleCreateDownload} className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold text-slate-700 uppercase mb-1">Document Title *</label>
                      <input
                        type="text"
                        required
                        value={downloadForm.title}
                        onChange={(e) => setDownloadForm({ ...downloadForm, title: e.target.value })}
                        placeholder="e.g. Model Test Paper Class 10th"
                        className="w-full px-3 py-2 rounded-lg border border-slate-300 text-xs"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-slate-700 uppercase mb-1">Category</label>
                      <select
                        value={downloadForm.category}
                        onChange={(e) => setDownloadForm({ ...downloadForm, category: e.target.value })}
                        className="w-full px-3 py-2 rounded-lg border border-slate-300 text-xs bg-white"
                      >
                        <option value="Admission">Admission</option>
                        <option value="Syllabus">Syllabus</option>
                        <option value="Academic Calendar">Academic Calendar</option>
                        <option value="Examination">Examination</option>
                        <option value="General">General</option>
                      </select>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold text-slate-700 uppercase mb-1">File URL *</label>
                      <input
                        type="text"
                        required
                        value={downloadForm.url}
                        onChange={(e) => setDownloadForm({ ...downloadForm, url: e.target.value })}
                        placeholder="/downloads/test-paper.pdf"
                        className="w-full px-3 py-2 rounded-lg border border-slate-300 text-xs"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-slate-700 uppercase mb-1">File Size</label>
                      <input
                        type="text"
                        value={downloadForm.fileSize}
                        onChange={(e) => setDownloadForm({ ...downloadForm, fileSize: e.target.value })}
                        placeholder="1.5 MB"
                        className="w-full px-3 py-2 rounded-lg border border-slate-300 text-xs"
                      />
                    </div>
                  </div>

                  <div className="text-right">
                    <button
                      type="submit"
                      disabled={isActionLoading}
                      className="bg-saffron-600 hover:bg-saffron-700 text-white font-bold px-5 py-2.5 rounded-lg text-xs uppercase tracking-wider transition"
                    >
                      Save Document
                    </button>
                  </div>
                </form>
              </div>

              {/* Downloads List */}
              <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200 space-y-3">
                <h4 className="font-bold text-slate-900 text-sm mb-3">Downloadable Documents ({downloads.length})</h4>
                {downloads.map(d => (
                  <div key={d.id} className="p-3 rounded-xl border border-slate-200 flex items-center justify-between gap-4">
                    <div>
                      <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-amber-100 text-amber-800">{d.category}</span>
                      <h5 className="font-bold text-slate-900 text-xs mt-1">{d.title}</h5>
                      <span className="text-[11px] text-slate-400">{d.fileSize} • {d.url}</span>
                    </div>
                    <button onClick={() => handleDeleteDownload(d.id)} className="p-1.5 text-slate-400 hover:text-red-600">
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* CONTACT QUERIES TAB */}
          {activeTab === 'contacts' && (
            <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200 space-y-4">
              <h3 className="font-bold text-slate-900 text-base border-b border-slate-100 pb-3">
                Inquiries Received from Contact Us Page ({contacts.length})
              </h3>
              <div className="space-y-3">
                {contacts.map(c => (
                  <div key={c.id} className="p-4 rounded-xl border border-slate-200 bg-slate-50 space-y-2">
                    <div className="flex items-center justify-between">
                      <h4 className="font-bold text-slate-900 text-xs">{c.name} — <span className="font-mono text-saffron-700">{c.mobile}</span></h4>
                      <span className="text-[11px] text-slate-400">{c.createdAt?.split('T')[0] || 'Recent'}</span>
                    </div>
                    {c.subject && <div className="text-xs font-semibold text-slate-700">Topic: {c.subject}</div>}
                    <p className="text-xs text-slate-600 bg-white p-2.5 rounded border border-slate-200">
                      "{c.message}"
                    </p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* SCHOOL SETTINGS TAB (Requirement #21 editable data) */}
          {activeTab === 'settings' && settings && (
            <div className="bg-white p-6 sm:p-8 rounded-2xl shadow-sm border border-slate-200 space-y-6">
              <div className="border-b border-slate-100 pb-4">
                <h3 className="font-bold text-slate-900 text-lg">
                  School Information & System Settings
                </h3>
                <p className="text-xs text-slate-500">
                  Update Principal credentials, phone numbers, addresses, timings, and affiliation code. (Changes take effect live across all pages).
                </p>
              </div>

              <form onSubmit={handleSaveSettings} className="space-y-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {/* Principal Name */}
                  <div>
                    <label className="block text-xs font-bold text-slate-700 uppercase mb-1">
                      Principal Name
                    </label>
                    <input
                      type="text"
                      value={settings.principalName || ''}
                      onChange={(e) => setSettings({ ...settings, principalName: e.target.value })}
                      className="w-full px-3 py-2 rounded-lg border border-slate-300 text-xs"
                    />
                  </div>

                  {/* College Code / Affiliation */}
                  <div>
                    <label className="block text-xs font-bold text-slate-700 uppercase mb-1">
                      UP Board College Code
                    </label>
                    <input
                      type="text"
                      value={settings.collegeCode || ''}
                      onChange={(e) => setSettings({ ...settings, collegeCode: e.target.value })}
                      className="w-full px-3 py-2 rounded-lg border border-slate-300 text-xs"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {/* Phone */}
                  <div>
                    <label className="block text-xs font-bold text-slate-700 uppercase mb-1">
                      School Primary Phone / Mobile
                    </label>
                    <input
                      type="text"
                      value={settings.phone || ''}
                      onChange={(e) => setSettings({ ...settings, phone: e.target.value })}
                      placeholder="Add School Phone Number"
                      className="w-full px-3 py-2 rounded-lg border border-slate-300 text-xs"
                    />
                  </div>

                  {/* Email */}
                  <div>
                    <label className="block text-xs font-bold text-slate-700 uppercase mb-1">
                      School Official Email
                    </label>
                    <input
                      type="email"
                      value={settings.email || ''}
                      onChange={(e) => setSettings({ ...settings, email: e.target.value })}
                      className="w-full px-3 py-2 rounded-lg border border-slate-300 text-xs"
                    />
                  </div>
                </div>

                {/* Campus Address */}
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase mb-1">
                    Campus Address
                  </label>
                  <input
                    type="text"
                    value={settings.address || ''}
                    onChange={(e) => setSettings({ ...settings, address: e.target.value })}
                    className="w-full px-3 py-2 rounded-lg border border-slate-300 text-xs"
                  />
                </div>

                {/* Timings */}
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase mb-1">
                    School Timings (Summer & Winter)
                  </label>
                  <input
                    type="text"
                    value={settings.timings || ''}
                    onChange={(e) => setSettings({ ...settings, timings: e.target.value })}
                    className="w-full px-3 py-2 rounded-lg border border-slate-300 text-xs"
                  />
                </div>

                {/* Principal Message in English */}
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase mb-1">
                    Principal's Desk Message (English)
                  </label>
                  <textarea
                    rows="3"
                    value={settings.principalMessage || ''}
                    onChange={(e) => setSettings({ ...settings, principalMessage: e.target.value })}
                    className="w-full px-3 py-2 rounded-lg border border-slate-300 text-xs"
                  ></textarea>
                </div>

                {/* Principal Message in Hindi */}
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase mb-1">
                    Principal's Desk Message (Hindi)
                  </label>
                  <textarea
                    rows="3"
                    value={settings.principalMessageHindi || ''}
                    onChange={(e) => setSettings({ ...settings, principalMessageHindi: e.target.value })}
                    className="w-full px-3 py-2 rounded-lg border border-slate-300 text-xs font-hindi"
                  ></textarea>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 uppercase mb-1">Facebook URL</label>
                    <input
                      type="text"
                      value={settings.facebookUrl || ''}
                      onChange={(e) => setSettings({ ...settings, facebookUrl: e.target.value })}
                      className="w-full px-3 py-2 rounded-lg border border-slate-300 text-xs"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-slate-700 uppercase mb-1">YouTube Channel</label>
                    <input
                      type="text"
                      value={settings.youtubeUrl || ''}
                      onChange={(e) => setSettings({ ...settings, youtubeUrl: e.target.value })}
                      className="w-full px-3 py-2 rounded-lg border border-slate-300 text-xs"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-slate-700 uppercase mb-1">Twitter / X URL</label>
                    <input
                      type="text"
                      value={settings.twitterUrl || ''}
                      onChange={(e) => setSettings({ ...settings, twitterUrl: e.target.value })}
                      className="w-full px-3 py-2 rounded-lg border border-slate-300 text-xs"
                    />
                  </div>
                </div>

                <div className="pt-4 border-t border-slate-100 flex items-center justify-end">
                  <button
                    type="submit"
                    disabled={isActionLoading}
                    className="bg-slate-900 hover:bg-saffron-700 text-white font-bold px-8 py-3 rounded-lg text-xs uppercase tracking-wider transition shadow-md"
                  >
                    Save All Settings
                  </button>
                </div>
              </form>
            </div>
          )}
        </main>
      </div>
    </div>
  );
};
