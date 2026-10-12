import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { api } from '../services/api';
import {
  Lock,
  Mail,
  Key,
  ShieldCheck,
  AlertCircle,
  ArrowLeft,
  Sparkles
} from 'lucide-react';

export const AdminLoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    if (!email || !password) {
      setErrorMsg('Please enter both admin email and password.');
      return;
    }

    setLoading(true);
    setErrorMsg('');

    try {
      const res = await api.login(email, password);
      if (res.success && res.token) {
        login(res.token, res.admin);
        navigate('/admin/dashboard');
      } else {
        setErrorMsg(res.message || 'Invalid credentials.');
      }
    } catch (err) {
      setErrorMsg('Login failed. Please verify credentials or server status.');
    } finally {
      setLoading(false);
    }
  };

  const handleFillDemo = () => {
    setEmail('admin@vsssvm.edu.in');
    setPassword('admin123');
    setErrorMsg('');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-navy-950 to-slate-900 flex items-center justify-center p-4">
      <div className="max-w-md w-full bg-white rounded-2xl shadow-2xl overflow-hidden border border-slate-200 animate-fadeIn">
        {/* Header */}
        <div className="bg-gradient-to-r from-saffron-700 via-amber-600 to-saffron-800 p-6 text-white text-center relative">
          <Link
            to="/"
            className="absolute top-4 left-4 text-white/80 hover:text-white p-1.5 rounded-lg bg-black/10 hover:bg-black/20 transition text-xs flex items-center gap-1"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Site</span>
          </Link>

          <div className="w-16 h-16 mx-auto bg-white rounded-full p-2 shadow-md mb-2">
            <img src="/logo.svg" alt="VSS Logo" className="w-full h-full object-contain" />
          </div>
          <h2 className="text-lg font-bold">Admin Control Portal</h2>
          <p className="text-xs text-amber-200 font-hindi">
            वि.सं.स्मा. सरस्वती विद्या मन्दिर इण्टर कॉलेज, अरखा
          </p>
        </div>

        {/* Form Body */}
        <div className="p-6 sm:p-8 space-y-6">
          <div className="text-center space-y-1">
            <h3 className="font-bold text-slate-800 text-base">Secure Staff Access</h3>
            <p className="text-xs text-slate-500">Sign in to manage notices, admissions, results and settings.</p>
          </div>

          {errorMsg && (
            <div className="p-3 bg-red-50 border border-red-200 rounded-lg text-red-700 text-xs flex items-center gap-2">
              <AlertCircle className="w-4 h-4 flex-shrink-0" />
              <span>{errorMsg}</span>
            </div>
          )}

          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase mb-1">
                Admin Email
              </label>
              <div className="relative">
                <Mail className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  placeholder="admin@vsssvm.edu.in"
                  className="w-full pl-9 pr-3.5 py-2.5 rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-amber-500 text-xs"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase mb-1">
                Password
              </label>
              <div className="relative">
                <Key className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  placeholder="••••••••"
                  className="w-full pl-9 pr-3.5 py-2.5 rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-amber-500 text-xs"
                />
              </div>
            </div>

            <div>
              <button
                type="submit"
                disabled={loading}
                className="w-full bg-slate-900 hover:bg-saffron-700 text-white font-bold py-3 rounded-lg text-xs uppercase tracking-wider transition shadow-md disabled:opacity-50 flex items-center justify-center gap-2"
              >
                <Lock className="w-4 h-4" />
                <span>{loading ? 'Authenticating...' : 'Sign In to Dashboard'}</span>
              </button>
            </div>
          </form>

          {/* Quick Demo Helper Button */}
          <div className="pt-2 text-center">
            <button
              type="button"
              onClick={handleFillDemo}
              className="text-xs font-bold text-saffron-700 hover:text-saffron-800 underline flex items-center justify-center gap-1.5 mx-auto"
            >
              <Sparkles className="w-3.5 h-3.5 text-amber-500" />
              <span>Fill Default Demo Credentials</span>
            </button>
          </div>
        </div>

        {/* Footer info */}
        <div className="bg-slate-50 p-4 border-t border-slate-100 text-center text-[11px] text-slate-400">
          Protected with JWT & Session Security • Arkha, Raebareli
        </div>
      </div>
    </div>
  );
};
