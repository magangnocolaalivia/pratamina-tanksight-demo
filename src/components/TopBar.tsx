import React from 'react';
import { UserRole, TankAlert } from '../types';
import { 
  Bell, 
  Moon, 
  Sun, 
  LogOut, 
  ShieldAlert, 
  UserCheck, 
  ChevronRight,
  Flame,
  Radio
} from 'lucide-react';

interface TopBarProps {
  currentUser: UserRole;
  alerts: TankAlert[];
  isDarkMode: boolean;
  onToggleDarkMode: () => void;
  onLogout: () => void;
  currentPath: string;
  onNavigate: (path: string) => void;
}

export const TopBar: React.FC<TopBarProps> = ({
  currentUser,
  alerts,
  isDarkMode,
  onToggleDarkMode,
  onLogout,
  currentPath,
  onNavigate
}) => {
  const unreadAlerts = alerts.filter(a => !a.acknowledged);

  const getBreadcrumbLabel = (path: string): string => {
    if (path === '/proposal') return 'Proposal Demo & Mockup Logo';
    if (path === '/dashboard') return 'Command Center Eksekutif';
    if (path.startsWith('/devices/group/')) return 'Monitoring Grup Fasilitas';
    if (path.startsWith('/devices/')) return 'Detail Telemetri Tangki ATG';
    if (path === '/devices') return 'Inventaris Tangki & Terminal';
    if (path === '/losses') return 'AI Loss Diagnostic & Rekonsiliasi';
    if (path === '/supply-chain') return 'Rantai Pasok & Mobil Tangki';
    if (path === '/reports') return 'Buku Mutasi & Laporan Audit';
    if (path === '/predictive') return 'Analitik Prediktif & Anomali';
    if (path === '/settings') return 'Pengaturan & Kalibrasi ATG';
    return 'Portal Sistem';
  };

  return (
    <header className="h-16 px-6 bg-[#0E1524] border-b border-slate-800 flex items-center justify-between z-30 shrink-0 sticky top-0">
      {/* Zone 1 & 2: Breadcrumbs & System Status */}
      <div className="flex items-center gap-3">
        <div className="flex items-center gap-2 text-xs text-slate-400">
          <span className="font-semibold text-slate-200">PT Pertamina Patra Niaga</span>
          <ChevronRight className="w-3.5 h-3.5 text-slate-600" />
          <span className="text-white font-medium">{getBreadcrumbLabel(currentPath)}</span>
        </div>

        <div className="hidden md:flex items-center gap-2 ml-4 pl-4 border-l border-slate-800">
          <span className="flex h-2 w-2 relative">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
          </span>
          <span className="text-[11px] font-mono text-emerald-400 font-medium">ATG Live Stream (100% Online)</span>
        </div>
      </div>

      {/* Zone 3: Actions & Operator Profile */}
      <div className="flex items-center gap-3">
        {/* Proposal & Logo Demo Link */}
        <button
          onClick={() => onNavigate('/proposal')}
          className="px-3 py-1.5 rounded-lg bg-gradient-to-r from-red-950/70 to-emerald-950/70 border border-slate-700 hover:border-[#ED1C24] text-xs font-semibold text-white transition-all flex items-center gap-1.5 shadow-sm"
          title="Buka Mockup Proposal & Logo Parodi"
        >
          <span className="w-2 h-2 rounded-full bg-[#ED1C24] animate-ping" />
          <span className="hidden sm:inline">Proposal & Logo Demo</span>
        </button>

        {/* Active Alarms Button with Unread Badge */}
        <button
          onClick={() => onNavigate('/losses')}
          className="relative p-2 rounded-lg bg-slate-800/80 text-slate-300 hover:text-white hover:bg-slate-700 transition-colors"
          title="Lihat Peringatan Kerugian Aktif"
        >
          <Bell className="w-4 h-4" />
          {unreadAlerts.length > 0 && (
            <span className="absolute -top-1 -right-1 bg-[#ED1C24] text-white text-[10px] font-bold rounded-full w-4 h-4 flex items-center justify-center animate-pulse">
              {unreadAlerts.length}
            </span>
          )}
        </button>

        {/* Command Center Mode Toggle */}
        <button
          onClick={onToggleDarkMode}
          className="p-2 rounded-lg bg-slate-800/80 text-slate-300 hover:text-white hover:bg-slate-700 transition-colors flex items-center gap-1.5 text-xs"
          title="Ganti Mode Kontras Command Center"
        >
          {isDarkMode ? <Moon className="w-4 h-4 text-emerald-400" /> : <Sun className="w-4 h-4 text-amber-400" />}
          <span className="hidden sm:inline">{isDarkMode ? 'Dark Command' : 'Light Shift'}</span>
        </button>

        <div className="h-6 w-px bg-slate-800" />

        {/* Operator Profile */}
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-lg bg-[#ED1C24] text-white font-bold flex items-center justify-center text-xs tracking-wider border border-white/20">
            {currentUser.name.slice(0, 2).toUpperCase()}
          </div>
          <div className="hidden lg:block text-left text-xs">
            <span className="font-semibold text-white block leading-tight">{currentUser.name}</span>
            <span className="text-[10px] text-slate-400 block font-mono">{currentUser.roleLabel}</span>
          </div>
        </div>

        {/* Logout Button */}
        <button
          onClick={onLogout}
          className="p-2 rounded-lg bg-slate-800/80 hover:bg-red-950/80 hover:text-red-400 text-slate-400 transition-colors"
          title="Keluar dari Portal"
        >
          <LogOut className="w-4 h-4" />
        </button>
      </div>
    </header>
  );
};
