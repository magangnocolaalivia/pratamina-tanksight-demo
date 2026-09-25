import React, { useState } from 'react';
import { UserRole } from '../types';
import { MOCK_USERS } from '../data/mockData';
import { ParodyLogo } from '../components/ParodyLogo';
import { Shield, Lock, User, ArrowRight, CheckCircle2, AlertCircle, Building, Fuel, Sparkles } from 'lucide-react';

interface LoginPageProps {
  onLogin: (user: UserRole) => void;
  onOpenProposal?: () => void;
}

export const LoginPage: React.FC<LoginPageProps> = ({ onLogin, onOpenProposal }) => {
  const [username, setUsername] = useState('supervisor');
  const [password, setPassword] = useState('pertamina2026');
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    const user = MOCK_USERS[username.trim().toLowerCase()];
    if (user && (password === 'pertamina2026' || password === 'demo')) {
      onLogin(user);
    } else {
      setError('Kredensial tidak valid. Silakan gunakan akun percontohan (supervisor, admin_terminal, manager_spbu) dengan kata sandi: pertamina2026 atau demo.');
    }
  };

  const handleQuickFill = (roleKey: string) => {
    setUsername(roleKey);
    setPassword('pertamina2026');
    setError(null);
  };

  return (
    <div className="min-h-screen w-full bg-[#070A10] flex items-center justify-center p-4 selection:bg-[#ED1C24] selection:text-white">
      {/* Background Subtle Gradient Grid */}
      <div className="absolute inset-0 bg-[radial-gradient(#1E293B_1px,transparent_1px)] [background-size:24px_24px] opacity-40 pointer-events-none" />

      <div className="relative w-full max-w-md z-10">
        {/* Brand Header with Parody Logo */}
        <div className="text-center mb-6">
          <div className="flex justify-center mb-3">
            <ParodyLogo brandName="PRATAMINA PATRA NIAGA" size="lg" theme="dark" />
          </div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#121824] border border-slate-800 text-[11px] text-slate-300 font-mono mt-1">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            <span>TankSight AIoT Automatic Tank Gauging</span>
          </div>
        </div>

        {/* Login Card */}
        <div className="bg-[#0E1524] border border-slate-800 rounded-2xl p-7 shadow-2xl space-y-6">
          <form onSubmit={handleSubmit} className="space-y-4">
            {error && (
              <div className="p-3 bg-red-950/70 border border-red-900 rounded-xl text-xs text-red-200 flex items-start gap-2.5">
                <AlertCircle className="w-4 h-4 text-red-400 shrink-0 mt-0.5" />
                <span>{error}</span>
              </div>
            )}

            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-slate-300">
                Nama Pengguna / NIP
              </label>
              <div className="relative">
                <User className="w-4 h-4 text-slate-500 absolute left-3.5 top-3" />
                <input
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  placeholder="supervisor / admin_terminal / manager_spbu"
                  required
                  className="w-full bg-[#080C14] border border-slate-800 rounded-xl pl-10 pr-4 py-2.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-[#ED1C24] transition-colors"
                />
              </div>
            </div>

            <div className="space-y-1.5">
              <div className="flex justify-between items-center">
                <label className="text-xs font-semibold text-slate-300">
                  Kata Sandi
                </label>
                <span className="text-[11px] text-slate-500 font-mono">Default: pertamina2026</span>
              </div>
              <div className="relative">
                <Lock className="w-4 h-4 text-slate-500 absolute left-3.5 top-3" />
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••••••"
                  required
                  className="w-full bg-[#080C14] border border-slate-800 rounded-xl pl-10 pr-4 py-2.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-[#ED1C24] transition-colors"
                />
              </div>
            </div>

            <button
              type="submit"
              className="w-full py-2.5 px-4 bg-[#ED1C24] hover:bg-red-700 text-white rounded-xl text-xs font-bold transition-all shadow-lg shadow-red-900/30 flex items-center justify-center gap-2 mt-2"
            >
              <span>Masuk Command Center</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </form>

          {/* Quick-Fill Role Profiles */}
          <div className="pt-4 border-t border-slate-800/80 space-y-2.5">
            <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block">
              Pilih Akses Pengguna Demo:
            </span>
            <div className="grid grid-cols-1 gap-2">
              <button
                type="button"
                onClick={() => handleQuickFill('supervisor')}
                className={`p-2.5 rounded-xl border text-left text-xs transition-colors flex items-center justify-between ${
                  username === 'supervisor' ? 'bg-slate-800/90 border-[#ED1C24]' : 'bg-[#080C14] border-slate-800 hover:border-slate-700'
                }`}
              >
                <div>
                  <span className="font-bold text-white block">Supervisor Losses Pusat</span>
                  <span className="text-[11px] text-slate-400">Head Office Pertamina Patra Niaga</span>
                </div>
                <span className="font-mono text-[10px] text-emerald-400 font-bold px-2 py-0.5 rounded bg-emerald-950/60 border border-emerald-800">
                  supervisor
                </span>
              </button>

              <button
                type="button"
                onClick={() => handleQuickFill('admin_terminal')}
                className={`p-2.5 rounded-xl border text-left text-xs transition-colors flex items-center justify-between ${
                  username === 'admin_terminal' ? 'bg-slate-800/90 border-[#ED1C24]' : 'bg-[#080C14] border-slate-800 hover:border-slate-700'
                }`}
              >
                <div>
                  <span className="font-bold text-white block">Admin Fuel Terminal</span>
                  <span className="text-[11px] text-slate-400">Integrated Terminal Plumpang</span>
                </div>
                <span className="font-mono text-[10px] text-sky-400 font-bold px-2 py-0.5 rounded bg-sky-950/60 border border-sky-800">
                  admin_terminal
                </span>
              </button>

              <button
                type="button"
                onClick={() => handleQuickFill('manager_spbu')}
                className={`p-2.5 rounded-xl border text-left text-xs transition-colors flex items-center justify-between ${
                  username === 'manager_spbu' ? 'bg-slate-800/90 border-[#ED1C24]' : 'bg-[#080C14] border-slate-800 hover:border-slate-700'
                }`}
              >
                <div>
                  <span className="font-bold text-white block">Manager SPBU Pasti Pas</span>
                  <span className="text-[11px] text-slate-400">SPBU COCO 31.124.01 Cilandak</span>
                </div>
                <span className="font-mono text-[10px] text-amber-400 font-bold px-2 py-0.5 rounded bg-amber-950/60 border border-amber-800">
                  manager_spbu
                </span>
              </button>
            </div>
          </div>

          {/* Proposal Landing Page Direct Link */}
          {onOpenProposal && (
            <div className="pt-3 border-t border-slate-800/80">
              <button
                type="button"
                onClick={onOpenProposal}
                className="w-full py-2.5 px-3 rounded-xl bg-gradient-to-r from-red-950/60 to-emerald-950/60 border border-slate-700 hover:border-[#ED1C24] text-xs font-bold text-white transition-all flex items-center justify-center gap-2"
              >
                <Sparkles className="w-4 h-4 text-[#ED1C24]" />
                <span>Lihat Proposal Demo & Mockup Logo Plesetan</span>
              </button>
            </div>
          )}
        </div>

        {/* Security Compliance Footnote */}
        <div className="mt-6 text-center text-[11px] text-slate-500 space-y-1">
          <p>Enkripsi Telemetri TLS 1.3 · Standar Kalibrasi Metrologi Legal ASTM D1250 / API MPMS</p>
          <p>© 2026 PT PRATAMINA PATRA NIAGA (Parody Version for Proposal Demo).</p>
        </div>
      </div>
    </div>
  );
};
