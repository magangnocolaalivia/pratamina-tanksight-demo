import React, { useState } from 'react';
import { TankDevice, FacilityGroup, TankAlert, SupplyChainShipment } from '../types';
import { ThreeTankTwin } from '../components/ThreeTankTwin';
import { 
  Building2, 
  Database, 
  Flame, 
  Droplet, 
  AlertTriangle, 
  CheckCircle2, 
  ArrowUpRight, 
  TrendingDown, 
  ShieldCheck, 
  Clock, 
  Truck, 
  Layers,
  Thermometer,
  Radio,
  ExternalLink
} from 'lucide-react';

interface MainDashboardProps {
  tanks: TankDevice[];
  groups: FacilityGroup[];
  alerts: TankAlert[];
  shipments: SupplyChainShipment[];
  onNavigate: (path: string) => void;
}

export const MainDashboard: React.FC<MainDashboardProps> = ({
  tanks,
  groups,
  alerts,
  shipments,
  onNavigate
}) => {
  const [selectedHeroTankId, setSelectedHeroTankId] = useState<string>(tanks[0]?.id || 'TNK-PLP-01');

  const heroTank = tanks.find(t => t.id === selectedHeroTankId) || tanks[0];

  // Aggregated system totals
  const totalCapacity = groups.reduce((acc, g) => acc + g.totalCapacityLiters, 0);
  const totalStock = groups.reduce((acc, g) => acc + g.currentStockLiters, 0);
  const totalTanks = groups.reduce((acc, g) => acc + g.tankCount, 0);
  const stockRatio = ((totalStock / totalCapacity) * 100).toFixed(1);

  // Losses summary
  const criticalAlerts = alerts.filter(a => a.severity === 'critical');
  const warningAlerts = alerts.filter(a => a.severity === 'warning');

  return (
    <div className="space-y-6">
      {/* Top Banner: Pertamina Executive Summary */}
      <div className="bg-[#121824] rounded-2xl border border-slate-800 p-6 flex flex-col lg:flex-row lg:items-center justify-between gap-6 shadow-xl">
        <div>
          <div className="flex items-center gap-2 mb-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-[#ED1C24] animate-pulse" />
            <span className="text-xs font-bold text-[#ED1C24] uppercase tracking-wider">
              Automatic Tank Gauging (ATG) Live Operations
            </span>
          </div>
          <h2 className="text-xl md:text-2xl font-extrabold text-white tracking-tight">
            Pusat Komando Pengendalian Losses BBM Terintegrasi
          </h2>
          <p className="text-xs text-slate-400 mt-1 max-w-2xl">
            Monitoring tangki timbun Terminal BBM dan tangki pendam SPBU secara simultan dengan AI deteksi susut suhu (ASTM D1250), rembesan fisik (CSLD), dan audit selisih bongkar muat.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-3 shrink-0">
          <button
            onClick={() => onNavigate('/losses')}
            className="px-4 py-2.5 rounded-xl bg-[#ED1C24] hover:bg-red-700 text-white text-xs font-bold transition-all shadow-lg shadow-red-900/40 flex items-center gap-2"
          >
            <Flame className="w-4 h-4" />
            <span>Audit Losses Aktif ({alerts.length})</span>
          </button>
          <button
            onClick={() => onNavigate('/supply-chain')}
            className="px-4 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-bold transition-all flex items-center gap-2"
          >
            <Truck className="w-4 h-4" />
            <span>Mobil Tangki In-Transit</span>
          </button>
        </div>
      </div>

      {/* Bento Grid Row 1: Key Metrics Bar */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Metric 1: Total Real-Time Stock */}
        <div className="p-5 rounded-2xl bg-[#121824] border border-slate-800 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between text-slate-400 text-xs mb-2">
              <span className="font-medium">Total Stok BBM Real-Time</span>
              <Database className="w-4 h-4 text-emerald-400" />
            </div>
            <div className="text-2xl font-extrabold font-mono text-white tabular-nums">
              {(totalStock / 1000).toLocaleString(undefined, { maximumFractionDigits: 0 })} <span className="text-sm font-normal text-slate-400">kL</span>
            </div>
          </div>
          <div className="mt-3 pt-3 border-t border-slate-800/80 flex items-center justify-between text-[11px] text-slate-400">
            <span>Kapasitas: {(totalCapacity / 1000).toLocaleString()} kL</span>
            <span className="font-mono text-emerald-400 font-bold">{stockRatio}% Terisi</span>
          </div>
        </div>

        {/* Metric 2: Rata-rata Losses Harian */}
        <div className="p-5 rounded-2xl bg-[#121824] border border-slate-800 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between text-slate-400 text-xs mb-2">
              <span className="font-medium">Tingkat Losses Rata-Rata</span>
              <TrendingDown className="w-4 h-4 text-amber-400" />
            </div>
            <div className="text-2xl font-extrabold font-mono text-amber-400 tabular-nums">
              0.17% <span className="text-xs font-normal text-slate-400">(Toleransi ±0.15% - 0.50%)</span>
            </div>
          </div>
          <div className="mt-3 pt-3 border-t border-slate-800/80 flex items-center justify-between text-[11px] text-slate-400">
            <span>Terminal: 0.12%</span>
            <span className="text-amber-400 font-semibold">SPBU: 0.59% (Waspada)</span>
          </div>
        </div>

        {/* Metric 3: Active Tangki & ATG Connectivity */}
        <div className="p-5 rounded-2xl bg-[#121824] border border-slate-800 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between text-slate-400 text-xs mb-2">
              <span className="font-medium">Tangki & Probe ATG</span>
              <Radio className="w-4 h-4 text-[#00A651]" />
            </div>
            <div className="text-2xl font-extrabold font-mono text-white tabular-nums">
              {totalTanks} <span className="text-sm font-normal text-slate-400">Unit</span>
            </div>
          </div>
          <div className="mt-3 pt-3 border-t border-slate-800/80 flex items-center justify-between text-[11px] text-slate-400">
            <span className="text-emerald-400 font-medium">100% Online & Terkalibrasi</span>
            <span className="font-mono text-slate-400">6 Fasilitas</span>
          </div>
        </div>

        {/* Metric 4: Peringatan Kritis Aktif */}
        <div className="p-5 rounded-2xl bg-[#121824] border border-slate-800 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between text-slate-400 text-xs mb-2">
              <span className="font-medium">Insiden & Alarm Aktif</span>
              <AlertTriangle className="w-4 h-4 text-red-400" />
            </div>
            <div className="text-2xl font-extrabold font-mono text-red-400 tabular-nums">
              {alerts.length} <span className="text-xs font-normal text-slate-400">Peringatan</span>
            </div>
          </div>
          <div className="mt-3 pt-3 border-t border-slate-800/80 flex items-center justify-between text-[11px] text-slate-400">
            <span className="text-red-400 font-semibold">{criticalAlerts.length} Kritis</span>
            <span className="text-amber-400 font-semibold">{warningAlerts.length} Waspada</span>
          </div>
        </div>
      </div>

      {/* Bento Grid Row 2: 3D Tank Digital Twin + Loss Attribution */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left 7 Columns: Interactive 3D Digital Twin Hero */}
        <div className="lg:col-span-7 bg-[#121824] rounded-2xl border border-slate-800 p-6 flex flex-col justify-between space-y-4 shadow-xl">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div>
              <div className="flex items-center gap-2 mb-1">
                <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">
                  Digital Twin 3D Real-Time
                </span>
                <span className="text-[10px] px-1.5 py-0.5 rounded bg-slate-800 text-emerald-400 font-mono">
                  Three.js WebGL
                </span>
              </div>
              <h3 className="text-base font-bold text-white tracking-tight">
                {heroTank.name}
              </h3>
              <p className="text-xs text-slate-400 font-medium">
                {heroTank.facilityName} · {heroTank.fuelType} · {heroTank.category === 'bulk_terminal' ? 'Tangki Timbun Vertikal' : 'Tangki Pendam Double-Wall'}
              </p>
            </div>

            {/* Selector to switch active tank in 3D */}
            <select
              value={selectedHeroTankId}
              onChange={(e) => setSelectedHeroTankId(e.target.value)}
              className="bg-[#0B0F17] border border-slate-800 rounded-xl px-3 py-1.5 text-xs text-white focus:outline-none focus:border-[#ED1C24] transition-colors"
            >
              {tanks.map(t => (
                <option key={t.id} value={t.id}>
                  {t.tankNumber} - {t.fuelType} ({t.facilityName.split('-')[0]})
                </option>
              ))}
            </select>
          </div>

          {/* 3D Component Mount */}
          <ThreeTankTwin tank={heroTank} height="380px" />

          {/* Live Metrology Telemetry Footer */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-2 text-xs">
            <div className="p-3 rounded-xl bg-[#0B0F17] border border-slate-800/80">
              <span className="text-[11px] text-slate-400 block">Gross Observed (GOV)</span>
              <span className="font-mono font-bold text-white text-sm tabular-nums">
                {heroTank.metrics.grossVolumeLiters.toLocaleString()} L
              </span>
            </div>
            <div className="p-3 rounded-xl bg-[#0B0F17] border border-slate-800/80">
              <span className="text-[11px] text-slate-400 block">Net Volume (15°C)</span>
              <span className="font-mono font-bold text-emerald-400 text-sm tabular-nums">
                {heroTank.metrics.netStandardVolumeLiters.toLocaleString()} L
              </span>
            </div>
            <div className="p-3 rounded-xl bg-[#0B0F17] border border-slate-800/80">
              <span className="text-[11px] text-slate-400 block">Air Dasar (Water Cut)</span>
              <span className={`font-mono font-bold text-sm tabular-nums ${
                heroTank.metrics.waterLevelMm > 25 ? 'text-red-400' : 'text-sky-400'
              }`}>
                {heroTank.metrics.waterLevelMm} mm
              </span>
            </div>
            <div className="p-3 rounded-xl bg-[#0B0F17] border border-slate-800/80">
              <span className="text-[11px] text-slate-400 block">Suhu Rata-rata</span>
              <span className="font-mono font-bold text-amber-400 text-sm tabular-nums">
                {heroTank.metrics.avgTemperatureC}°C
              </span>
            </div>
          </div>
        </div>

        {/* Right 5 Columns: Real-Time Incident Feed & Loss Attribution */}
        <div className="lg:col-span-5 space-y-4 flex flex-col">
          {/* Active Loss Alerts Card */}
          <div className="p-6 rounded-2xl bg-[#121824] border border-slate-800 space-y-4 flex-1">
            <div className="flex items-center justify-between border-b border-slate-800/80 pb-3">
              <div className="flex items-center gap-2">
                <AlertTriangle className="w-4 h-4 text-[#ED1C24]" />
                <h3 className="text-sm font-bold text-white tracking-tight">
                  Peringatan Kerugian Aktif ({alerts.length})
                </h3>
              </div>
              <button
                onClick={() => onNavigate('/losses')}
                className="text-xs text-[#ED1C24] hover:underline font-semibold flex items-center gap-1"
              >
                <span>Audit Lengkap</span>
                <ExternalLink className="w-3 h-3" />
              </button>
            </div>

            <div className="space-y-3 max-h-[360px] overflow-y-auto pr-1">
              {alerts.map((alert) => (
                <div
                  key={alert.id}
                  onClick={() => onNavigate(`/devices/${alert.tankId}`)}
                  className={`p-3.5 rounded-xl border text-xs cursor-pointer transition-all hover:border-slate-600 ${
                    alert.severity === 'critical'
                      ? 'bg-red-950/30 border-red-900/60 text-red-200'
                      : 'bg-amber-950/20 border-amber-900/50 text-amber-200'
                  }`}
                >
                  <div className="flex items-center justify-between mb-1.5">
                    <span className="font-bold text-white text-xs">{alert.title}</span>
                    <span className="text-[10px] font-mono text-slate-400">{alert.timestamp}</span>
                  </div>
                  <p className="text-[11px] text-slate-300 leading-relaxed mb-2">
                    {alert.description}
                  </p>
                  <div className="flex items-center justify-between text-[10px] pt-1.5 border-t border-slate-800/60">
                    <span className="font-semibold text-slate-400">{alert.facilityName} · {alert.tankName}</span>
                    <span className="font-mono text-white font-medium hover:underline">
                      Periksa Tangki →
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Product Breakdown Mini Card */}
          <div className="p-5 rounded-2xl bg-[#121824] border border-slate-800 space-y-3">
            <span className="text-xs font-bold text-slate-400 uppercase tracking-wider block">
              Komposisi Stok BBM Nasional
            </span>
            <div className="space-y-2 text-xs">
              <div>
                <div className="flex justify-between text-slate-300 mb-1">
                  <span>Pertalite (RON 90)</span>
                  <span className="font-mono font-bold text-emerald-400">182,500 kL</span>
                </div>
                <div className="w-full h-1.5 bg-slate-800 rounded-full overflow-hidden">
                  <div className="h-full bg-emerald-500 rounded-full" style={{ width: '45%' }} />
                </div>
              </div>
              <div>
                <div className="flex justify-between text-slate-300 mb-1">
                  <span>Pertamax (RON 92)</span>
                  <span className="font-mono font-bold text-sky-400">142,300 kL</span>
                </div>
                <div className="w-full h-1.5 bg-slate-800 rounded-full overflow-hidden">
                  <div className="h-full bg-sky-500 rounded-full" style={{ width: '35%' }} />
                </div>
              </div>
              <div>
                <div className="flex justify-between text-slate-300 mb-1">
                  <span>Biosolar (B35)</span>
                  <span className="font-mono font-bold text-amber-400">128,400 kL</span>
                </div>
                <div className="w-full h-1.5 bg-slate-800 rounded-full overflow-hidden">
                  <div className="h-full bg-amber-500 rounded-full" style={{ width: '30%' }} />
                </div>
              </div>
              <div>
                <div className="flex justify-between text-slate-300 mb-1">
                  <span>Pertamax Turbo (RON 98)</span>
                  <span className="font-mono font-bold text-[#ED1C24]">58,605 kL</span>
                </div>
                <div className="w-full h-1.5 bg-slate-800 rounded-full overflow-hidden">
                  <div className="h-full bg-[#ED1C24] rounded-full" style={{ width: '15%' }} />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bento Grid Row 3: Facilities Map & Network Topology */}
      <div className="bg-[#121824] rounded-2xl border border-slate-800 p-6 space-y-4 shadow-xl">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-800/80 pb-4">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <Building2 className="w-4 h-4 text-[#00A651]" />
              <h3 className="text-base font-bold text-white tracking-tight">
                Topologi Jaringan Fasilitas & Status Real-Time
              </h3>
            </div>
            <p className="text-xs text-slate-400">
              Terminal BBM Utama, Depo Satelit, dan SPBU Terintegrasi dalam Jaringan ATG TankSight.
            </p>
          </div>
          <button
            onClick={() => onNavigate('/devices')}
            className="text-xs font-semibold text-slate-300 hover:text-white flex items-center gap-1.5"
          >
            <span>Lihat Semua Tangki ({totalTanks})</span>
            <ArrowUpRight className="w-4 h-4 text-[#ED1C24]" />
          </button>
        </div>

        {/* Facility Grid Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {groups.map((group) => {
            const isWarning = group.status === 'warning';
            const isCritical = group.status === 'critical';

            return (
              <div
                key={group.id}
                onClick={() => onNavigate(`/devices/group/${group.id}`)}
                className="p-4 rounded-xl bg-[#0E1524] border border-slate-800 hover:border-slate-700 transition-all cursor-pointer space-y-3"
              >
                <div className="flex items-start justify-between">
                  <div>
                    <span className="text-[11px] font-mono text-slate-500 uppercase">{group.code}</span>
                    <h4 className="text-sm font-bold text-white truncate max-w-[220px]">{group.name}</h4>
                    <span className="text-xs text-slate-400">{group.city}</span>
                  </div>
                  <span className={`text-[10px] font-mono px-2 py-0.5 rounded font-bold ${
                    isCritical ? 'bg-red-950 text-red-400 border border-red-800' : isWarning ? 'bg-amber-950 text-amber-400 border border-amber-800' : 'bg-emerald-950 text-emerald-400 border border-emerald-800'
                  }`}>
                    {isCritical ? 'Kritis' : isWarning ? 'Waspada' : 'Normal'}
                  </span>
                </div>

                <div className="space-y-1.5 text-xs text-slate-300">
                  <div className="flex justify-between">
                    <span className="text-slate-400">Stok Aktif:</span>
                    <span className="font-mono font-bold text-white">
                      {(group.currentStockLiters / 1000).toLocaleString(undefined, { maximumFractionDigits: 0 })} kL
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-400">Susut Harian:</span>
                    <span className={`font-mono font-bold ${group.avgLossPercent > 0.5 ? 'text-red-400' : 'text-emerald-400'}`}>
                      {group.avgLossPercent}%
                    </span>
                  </div>
                </div>

                <div className="pt-2 border-t border-slate-800/80 flex items-center justify-between text-[11px] text-slate-400">
                  <span>{group.onlineCount}/{group.tankCount} Tangki Online</span>
                  <span className="text-[#ED1C24] font-medium hover:underline">Detail Fasilitas →</span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
