import React, { useState, useMemo, useEffect } from 'react';
import { FacilityGroup, TankDevice } from '../types';
import { ParodyLogo } from './ParodyLogo';
import { 
  LayoutDashboard, 
  Database, 
  Flame, 
  Truck, 
  FileText, 
  BrainCircuit, 
  Settings, 
  Search, 
  Star, 
  X, 
  Building2, 
  Fuel, 
  Radio, 
  ChevronRight,
  ShieldAlert,
  Menu,
  Sparkles
} from 'lucide-react';

interface SidebarProps {
  currentPath: string;
  onNavigate: (path: string) => void;
  groups: FacilityGroup[];
  tanks: TankDevice[];
  isMobileOpen: boolean;
  onCloseMobile: () => void;
}

export const Sidebar: React.FC<SidebarProps> = ({
  currentPath,
  onNavigate,
  groups,
  tanks,
  isMobileOpen,
  onCloseMobile
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [favorites, setFavorites] = useState<string[]>(() => {
    try {
      const saved = localStorage.getItem('pertamina_atg_favorites');
      return saved ? JSON.parse(saved) : ['GRP-TBBM-01', 'GRP-SPBU-01'];
    } catch {
      return ['GRP-TBBM-01', 'GRP-SPBU-01'];
    }
  });

  const toggleFavorite = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setFavorites(prev => {
      const next = prev.includes(id) ? prev.filter(item => item !== id) : [...prev, id];
      try {
        localStorage.setItem('pertamina_atg_favorites', JSON.stringify(next));
      } catch {}
      return next;
    });
  };

  // Real-time search across Group names and Tank names within groups
  const searchResults = useMemo(() => {
    if (!searchQuery.trim()) return null;
    const query = searchQuery.toLowerCase();

    const matchedGroups = groups.filter(g => 
      g.name.toLowerCase().includes(query) || 
      g.city.toLowerCase().includes(query) ||
      g.code.toLowerCase().includes(query)
    );

    const matchedTanks = tanks.filter(t => 
      t.name.toLowerCase().includes(query) ||
      t.tankNumber.toLowerCase().includes(query) ||
      t.fuelType.toLowerCase().includes(query) ||
      t.facilityName.toLowerCase().includes(query)
    );

    return { groups: matchedGroups, tanks: matchedTanks };
  }, [searchQuery, groups, tanks]);

  const navItems = [
    { label: 'Proposal Demo & Logo', path: '/proposal', icon: Sparkles, badge: 'New' },
    { label: 'Command Center', path: '/dashboard', icon: LayoutDashboard },
    { label: 'Inventaris Tangki', path: '/devices', icon: Database },
    { label: 'Diagnostik Losses AI', path: '/losses', icon: Flame },
    { label: 'Rantai Pasok & Tangker', path: '/supply-chain', icon: Truck },
    { label: 'Laporan & Mutasi', path: '/reports', icon: FileText },
    { label: 'Prediktif Anomali', path: '/predictive', icon: BrainCircuit },
    { label: 'Pengaturan & Kalibrasi', path: '/settings', icon: Settings },
  ];

  const handleLinkClick = (path: string) => {
    onNavigate(path);
    onCloseMobile();
  };

  return (
    <>
      {/* Mobile Backdrop */}
      {isMobileOpen && (
        <div 
          onClick={onCloseMobile} 
          className="fixed inset-0 bg-black/70 backdrop-blur-sm z-40 md:hidden"
        />
      )}

      {/* Sidebar Container */}
      <aside className={`
        fixed top-0 bottom-0 left-0 z-50 w-[280px] bg-[#0B0F17] border-r border-slate-800 
        flex flex-col transition-transform duration-200 ease-in-out md:translate-x-0
        ${isMobileOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'}
      `}>
        {/* Brand Lockup with Parody Logo */}
        <div className="h-16 px-4 border-b border-slate-800 flex items-center justify-between shrink-0">
          <button 
            onClick={() => handleLinkClick('/proposal')}
            className="flex items-center gap-2 text-left group hover:opacity-95 transition-opacity"
            title="Lihat Proposal Demo & Logo Parodi"
          >
            <ParodyLogo brandName="PRATAMINA PATRA NIAGA" size="sm" theme="dark" />
          </button>

          <button onClick={onCloseMobile} className="p-1 text-slate-400 hover:text-white md:hidden">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Scrollable Navigation Body */}
        <div className="flex-1 overflow-y-auto px-3.5 py-4 space-y-6">
          {/* Main Navigation Links */}
          <nav className="space-y-1">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = currentPath === item.path || (item.path !== '/dashboard' && currentPath.startsWith(item.path));

              return (
                <button
                  key={item.path}
                  onClick={() => handleLinkClick(item.path)}
                  className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg text-xs font-medium transition-colors ${
                    isActive
                      ? 'bg-slate-800/90 text-white border-l-2 border-[#ED1C24]'
                      : 'text-slate-400 hover:text-slate-200 hover:bg-slate-900/60'
                  }`}
                >
                  <Icon className={`w-4 h-4 ${isActive ? 'text-[#ED1C24]' : 'text-slate-500'}`} />
                  <span className="truncate">{item.label}</span>
                </button>
              );
            })}
          </nav>

          {/* Real-time Search Box */}
          <div className="relative">
            <Search className="w-3.5 h-3.5 text-slate-500 absolute left-3 top-2.5" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Cari tangki / fasilitas..."
              className="w-full bg-[#121824] border border-slate-800 rounded-lg pl-8 pr-7 py-2 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-[#ED1C24] transition-colors"
            />
            {searchQuery && (
              <button 
                onClick={() => setSearchQuery('')}
                className="absolute right-2.5 top-2.5 text-slate-500 hover:text-white"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            )}
          </div>

          {/* Search Results Dropdown / Inline List */}
          {searchResults ? (
            <div className="space-y-3 pt-1">
              <div className="flex items-center justify-between text-[11px] text-slate-400 px-1">
                <span>Hasil Pencarian ({searchResults.groups.length + searchResults.tanks.length})</span>
                <button onClick={() => setSearchQuery('')} className="text-[#ED1C24] hover:underline">
                  Reset
                </button>
              </div>

              {/* Matched Groups */}
              {searchResults.groups.length > 0 && (
                <div className="space-y-1.5">
                  <span className="text-[10px] font-semibold text-slate-500 uppercase tracking-wider px-1">Fasilitas</span>
                  {searchResults.groups.map(g => (
                    <button
                      key={g.id}
                      onClick={() => handleLinkClick(`/devices/group/${g.id}`)}
                      className="w-full text-left p-2 rounded-lg bg-[#121824] border border-slate-800 hover:border-slate-700 text-xs text-slate-200 flex items-center justify-between"
                    >
                      <div className="truncate">
                        <span className="font-semibold block truncate">{g.name}</span>
                        <span className="text-[10px] text-slate-400">{g.city}</span>
                      </div>
                      <ChevronRight className="w-3.5 h-3.5 text-slate-600 shrink-0 ml-1" />
                    </button>
                  ))}
                </div>
              )}

              {/* Matched Tanks */}
              {searchResults.tanks.length > 0 && (
                <div className="space-y-1.5">
                  <span className="text-[10px] font-semibold text-slate-500 uppercase tracking-wider px-1">Tangki Penyimpanan</span>
                  {searchResults.tanks.map(t => (
                    <button
                      key={t.id}
                      onClick={() => handleLinkClick(`/devices/${t.id}`)}
                      className="w-full text-left p-2 rounded-lg bg-[#121824] border border-slate-800 hover:border-slate-700 text-xs text-slate-200 flex items-center justify-between"
                    >
                      <div className="truncate">
                        <span className="font-semibold block truncate">{t.name}</span>
                        <span className="text-[10px] text-slate-400">{t.fuelType} · {t.facilityName}</span>
                      </div>
                      <ChevronRight className="w-3.5 h-3.5 text-slate-600 shrink-0 ml-1" />
                    </button>
                  ))}
                </div>
              )}

              {searchResults.groups.length === 0 && searchResults.tanks.length === 0 && (
                <div className="p-3 text-center text-xs text-slate-500">
                  Tidak ditemukan fasilitas atau tangki dengan kata kunci "{searchQuery}".
                </div>
              )}
            </div>
          ) : (
            <>
              {/* Pinned Favorites */}
              {favorites.length > 0 && (
                <div className="space-y-2">
                  <div className="flex items-center gap-1.5 px-1 text-[11px] font-bold text-slate-400 uppercase tracking-wider">
                    <Star className="w-3.5 h-3.5 text-amber-400 fill-amber-400" />
                    <span>Favorit Dipantau</span>
                  </div>
                  <div className="space-y-2">
                    {groups
                      .filter(g => favorites.includes(g.id))
                      .map(group => {
                        const isSelected = currentPath === `/devices/group/${group.id}`;
                        const isWarning = group.status === 'warning';
                        const isCritical = group.status === 'critical';

                        return (
                          <div
                            key={group.id}
                            onClick={() => handleLinkClick(`/devices/group/${group.id}`)}
                            className={`p-3 rounded-lg border text-xs cursor-pointer transition-all ${
                              isSelected
                                ? 'bg-slate-800/90 border-[#ED1C24]'
                                : 'bg-[#121824] border-slate-800 hover:border-slate-700'
                            }`}
                          >
                            <div className="flex items-center justify-between mb-1.5">
                              <span className="font-semibold text-white truncate max-w-[170px]">{group.name}</span>
                              <button
                                onClick={(e) => toggleFavorite(group.id, e)}
                                className="text-amber-400 hover:text-slate-400"
                              >
                                <Star className="w-3.5 h-3.5 fill-amber-400" />
                              </button>
                            </div>
                            <div className="flex items-center justify-between text-[11px] text-slate-400">
                              <div className="flex items-center gap-1.5">
                                <span className={`w-2 h-2 rounded-full ${
                                  isCritical ? 'bg-red-500 animate-pulse' : isWarning ? 'bg-amber-400' : 'bg-emerald-400'
                                }`} />
                                <span className="font-mono">{group.onlineCount}/{group.tankCount} online</span>
                              </div>
                              <span className="font-mono text-slate-300">{group.avgLossPercent}% susut</span>
                            </div>
                          </div>
                        );
                      })}
                  </div>
                </div>
              )}

              {/* Device Groups / Categories (Terminal BBM & SPBU) */}
              <div className="space-y-2">
                <div className="flex items-center justify-between px-1 text-[11px] font-bold text-slate-400 uppercase tracking-wider">
                  <div className="flex items-center gap-1.5">
                    <Building2 className="w-3.5 h-3.5 text-slate-500" />
                    <span>Fasilitas & Terminal</span>
                  </div>
                  <span className="text-[10px] text-slate-500 font-mono">{groups.length} Lokasi</span>
                </div>

                <div className="space-y-2 max-h-[340px] overflow-y-auto pr-1">
                  {groups.map(group => {
                    const isSelected = currentPath === `/devices/group/${group.id}`;
                    const isFav = favorites.includes(group.id);
                    const isWarning = group.status === 'warning';
                    const isCritical = group.status === 'critical';

                    return (
                      <div
                        key={group.id}
                        onClick={() => handleLinkClick(`/devices/group/${group.id}`)}
                        className={`p-3 rounded-lg border text-xs cursor-pointer transition-all ${
                          isSelected
                            ? 'bg-slate-800/90 border-[#ED1C24]'
                            : 'bg-[#121824] border-slate-800 hover:border-slate-700'
                        }`}
                      >
                        <div className="flex items-start justify-between mb-1.5">
                          <div className="truncate pr-1">
                            <span className="font-semibold text-white block truncate">{group.name}</span>
                            <span className="text-[10px] text-slate-400">{group.city} · {group.type === 'terminal_bbm' ? 'Terminal' : 'SPBU'}</span>
                          </div>
                          <button
                            onClick={(e) => toggleFavorite(group.id, e)}
                            className={`p-0.5 ${isFav ? 'text-amber-400' : 'text-slate-600 hover:text-slate-400'}`}
                          >
                            <Star className={`w-3.5 h-3.5 ${isFav ? 'fill-amber-400' : ''}`} />
                          </button>
                        </div>

                        <div className="flex items-center justify-between text-[11px] pt-1 border-t border-slate-800/60">
                          <div className="flex items-center gap-1.5">
                            <span className={`w-2 h-2 rounded-full ${
                              isCritical ? 'bg-red-500 animate-pulse' : isWarning ? 'bg-amber-400' : 'bg-emerald-400'
                            }`} />
                            <span className="text-slate-300 font-mono">{group.onlineCount}/{group.tankCount} tangki</span>
                          </div>
                          <span className={`font-mono text-[10px] ${
                            isCritical ? 'text-red-400 font-bold' : isWarning ? 'text-amber-400 font-bold' : 'text-slate-400'
                          }`}>
                            {isCritical ? 'Alarm Bocor' : isWarning ? 'Waspada Susut' : 'Normal'}
                          </span>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </>
          )}
        </div>

        {/* Footer Info */}
        <div className="p-3.5 border-t border-slate-800 bg-[#0A0E17] text-[11px] text-slate-400 flex items-center justify-between">
          <span className="font-mono">ATG Gateway: Active</span>
          <span className="text-emerald-400 font-medium">99.98% Uptime</span>
        </div>
      </aside>
    </>
  );
};
