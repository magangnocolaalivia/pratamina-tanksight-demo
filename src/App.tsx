import React, { useState, useEffect } from 'react';
import { UserRole, TankDevice, FacilityGroup, TankAlert } from './types';
import { MOCK_USERS, MOCK_TANKS, MOCK_FACILITY_GROUPS, MOCK_ALL_ALERTS, MOCK_SHIPMENTS } from './data/mockData';
import { TopBar } from './components/TopBar';
import { Sidebar } from './components/Sidebar';
import { LoginPage } from './pages/LoginPage';
import { MainDashboard } from './pages/MainDashboard';
import { DeviceList } from './pages/DeviceList';
import { DeviceDetail } from './pages/DeviceDetail';
import { DeviceGroupDashboard } from './pages/DeviceGroupDashboard';
import { LossesDiagnosticPage } from './pages/LossesDiagnosticPage';
import { SupplyChainPage } from './pages/SupplyChainPage';
import { DeviceConfig } from './pages/DeviceConfig';
import { ReportsPage } from './pages/ReportsPage';
import { PredictivePage } from './pages/PredictivePage';
import { AccountSettings } from './pages/AccountSettings';
import { ProposalLandingPage } from './pages/ProposalLandingPage';
import { Menu } from 'lucide-react';

export default function App() {
  const [currentUser, setCurrentUser] = useState<UserRole | null>(() => {
    try {
      const saved = localStorage.getItem('pertamina_atg_user');
      return saved ? JSON.parse(saved) : MOCK_USERS.supervisor;
    } catch {
      return MOCK_USERS.supervisor;
    }
  });

  const [currentPath, setCurrentPath] = useState<string>('/dashboard');
  const [isDarkMode, setIsDarkMode] = useState<boolean>(true); // Command Center Dark Mode by default
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);

  // Data state
  const [tanks] = useState<TankDevice[]>(MOCK_TANKS);
  const [groups] = useState<FacilityGroup[]>(MOCK_FACILITY_GROUPS);
  const [alerts] = useState<TankAlert[]>(MOCK_ALL_ALERTS);
  const [shipments] = useState(MOCK_SHIPMENTS);

  // Sync auth state to localStorage
  const handleLogin = (user: UserRole) => {
    setCurrentUser(user);
    try {
      localStorage.setItem('pertamina_atg_user', JSON.stringify(user));
    } catch {}
    setCurrentPath('/dashboard');
  };

  const handleLogout = () => {
    setCurrentUser(null);
    try {
      localStorage.removeItem('pertamina_atg_user');
    } catch {}
    setCurrentPath('/login');
  };

  const handleSwitchUser = (user: UserRole) => {
    setCurrentUser(user);
    try {
      localStorage.setItem('pertamina_atg_user', JSON.stringify(user));
    } catch {}
  };

  // If unauthenticated or on login
  if (currentPath === '/proposal' && !currentUser) {
    return (
      <div className="min-h-screen bg-[#070A10] text-slate-100 p-4 md:p-8">
        <div className="max-w-[1600px] mx-auto">
          <div className="flex justify-between items-center mb-6">
            <button
              onClick={() => setCurrentPath('/login')}
              className="px-3.5 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-xs font-semibold text-white transition-colors"
            >
              ← Kembali ke Login
            </button>
            <button
              onClick={() => {
                setCurrentUser(MOCK_USERS.supervisor);
                setCurrentPath('/dashboard');
              }}
              className="px-4 py-2 bg-[#ED1C24] hover:bg-red-700 text-white rounded-xl text-xs font-bold transition-all shadow-lg shadow-red-900/40"
            >
              Masuk Command Center (Demo Mode) →
            </button>
          </div>
          <ProposalLandingPage
            onNavigateToDashboard={() => {
              setCurrentUser(MOCK_USERS.supervisor);
              setCurrentPath('/dashboard');
            }}
          />
        </div>
      </div>
    );
  }

  if (!currentUser || currentPath === '/login') {
    return (
      <LoginPage 
        onLogin={handleLogin} 
        onOpenProposal={() => setCurrentPath('/proposal')}
      />
    );
  }

  // Dynamic Routing Handler
  const renderCurrentPage = () => {
    // 1. Single Tank Detail: /devices/:deviceId
    if (currentPath.startsWith('/devices/') && !currentPath.startsWith('/devices/group/')) {
      const parts = currentPath.split('/');
      const deviceId = parts[2];
      const isConfig = parts[3] === 'config';
      const isReports = parts[3] === 'reports';

      const targetTank = tanks.find(t => t.id === deviceId) || tanks[0];
      const targetFacility = groups.find(g => g.id === targetTank.facilityId);

      if (isConfig) {
        return (
          <DeviceConfig 
            tank={targetTank} 
            onBack={() => setCurrentPath(`/devices/${targetTank.id}`)} 
          />
        );
      }

      if (isReports) {
        return (
          <ReportsPage 
            tanks={[targetTank]} 
            groups={targetFacility ? [targetFacility] : groups} 
          />
        );
      }

      return (
        <DeviceDetail
          tank={targetTank}
          facility={targetFacility}
          onBack={() => setCurrentPath('/devices')}
          onNavigate={(p) => setCurrentPath(p)}
        />
      );
    }

    // 2. Group Facility Dashboard: /devices/group/:groupId
    if (currentPath.startsWith('/devices/group/')) {
      const groupId = currentPath.split('/')[3];
      const targetGroup = groups.find(g => g.id === groupId) || groups[0];

      return (
        <DeviceGroupDashboard
          group={targetGroup}
          tanks={tanks}
          onBack={() => setCurrentPath('/devices')}
          onNavigate={(p) => setCurrentPath(p)}
        />
      );
    }

    // 3. Core Pages
    switch (currentPath) {
      case '/proposal':
        return (
          <ProposalLandingPage
            onNavigateToDashboard={() => setCurrentPath('/dashboard')}
          />
        );
      case '/dashboard':
        return (
          <MainDashboard
            tanks={tanks}
            groups={groups}
            alerts={alerts}
            shipments={shipments}
            onNavigate={(p) => setCurrentPath(p)}
          />
        );
      case '/devices':
        return (
          <DeviceList
            tanks={tanks}
            groups={groups}
            onNavigate={(p) => setCurrentPath(p)}
          />
        );
      case '/losses':
        return (
          <LossesDiagnosticPage
            tanks={tanks}
            onNavigate={(p) => setCurrentPath(p)}
          />
        );
      case '/supply-chain':
        return (
          <SupplyChainPage
            shipments={shipments}
          />
        );
      case '/reports':
        return (
          <ReportsPage
            tanks={tanks}
            groups={groups}
          />
        );
      case '/predictive':
        return (
          <PredictivePage
            tanks={tanks}
            onNavigate={(p) => setCurrentPath(p)}
          />
        );
      case '/settings':
        return (
          <AccountSettings
            currentUser={currentUser}
            onSwitchUser={handleSwitchUser}
          />
        );
      default:
        return (
          <MainDashboard
            tanks={tanks}
            groups={groups}
            alerts={alerts}
            shipments={shipments}
            onNavigate={(p) => setCurrentPath(p)}
          />
        );
    }
  };

  return (
    <div className={`min-h-screen ${isDarkMode ? 'bg-[#070A10] text-slate-100' : 'bg-slate-50 text-slate-900'} flex`}>
      {/* Sidebar (280px Desktop) */}
      <Sidebar
        currentPath={currentPath}
        onNavigate={(p) => setCurrentPath(p)}
        groups={groups}
        tanks={tanks}
        isMobileOpen={isMobileSidebarOpen}
        onCloseMobile={() => setIsMobileSidebarOpen(false)}
      />

      {/* Main Content Area (Offset by 280px on Desktop) */}
      <div className="flex-1 md:ml-[280px] flex flex-col min-w-0">
        {/* Mobile Navigation Header Trigger */}
        <div className="md:hidden flex items-center justify-between px-4 py-3 bg-[#0B0F17] border-b border-slate-800">
          <div className="flex items-center gap-2">
            <button
              onClick={() => setIsMobileSidebarOpen(true)}
              className="p-2 rounded-lg bg-slate-800 text-slate-200"
            >
              <Menu className="w-5 h-5" />
            </button>
            <span className="font-extrabold text-sm text-white">TankSight AIoT</span>
          </div>
          <span className="text-xs font-mono text-emerald-400 font-bold">100% Online</span>
        </div>

        {/* TopBar Contract */}
        <TopBar
          currentUser={currentUser}
          alerts={alerts}
          isDarkMode={isDarkMode}
          onToggleDarkMode={() => setIsDarkMode(!isDarkMode)}
          onLogout={handleLogout}
          currentPath={currentPath}
          onNavigate={(p) => setCurrentPath(p)}
        />

        {/* Main Content Viewport */}
        <main className="flex-1 p-4 md:p-6 lg:p-8 max-w-[1680px] w-full mx-auto">
          {renderCurrentPage()}
        </main>
      </div>
    </div>
  );
}
