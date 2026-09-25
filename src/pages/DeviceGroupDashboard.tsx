import React, { useState } from 'react';
import { FacilityGroup, TankDevice } from '../types';
import { 
  Building2, 
  Database, 
  MapPin, 
  Phone, 
  User, 
  Radio, 
  ArrowLeft, 
  Download, 
  AlertTriangle,
  CheckCircle2,
  TrendingDown,
  Layers,
  Thermometer
} from 'lucide-react';

interface DeviceGroupDashboardProps {
  group: FacilityGroup;
  tanks: TankDevice[];
  onBack: () => void;
  onNavigate: (path: string) => void;
}

export const DeviceGroupDashboard: React.FC<DeviceGroupDashboardProps> = ({
  group,
  tanks,
  onBack,
  onNavigate
}) => {
  const groupTanks = tanks.filter(t => t.facilityId === group.id);

  // Aggregated calculations
  const totalStock = groupTanks.reduce((acc, t) => acc + t.metrics.grossVolumeLiters, 0);
  const totalCapacity = groupTanks.reduce((acc, t) => acc + t.metrics.capacityLiters, 0);
  const avgTemp = groupTanks.length 
    ? (groupTanks.reduce((acc, t) => acc + t.metrics.avgTemperatureC, 0) / groupTanks.length).toFixed(1)
    : '0';

  const fillPercent = totalCapacity > 0 ? ((totalStock / totalCapacity) * 100).toFixed(1) : '0';

  return (
    <div className="space-y-6">
      {/* Group Header */}
      <div className="bg-[#121824] rounded-2xl border border-slate-800 p-6 flex flex-col md:flex-row md:items-center justify-between gap-6 shadow-xl">
        <div className="flex items-start gap-4">
          <button
            onClick={onBack}
            className="p-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white transition-colors mt-0.5"
            title="Kembali"
          >
            <ArrowLeft className="w-4 h-4" />
          </button>
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="font-mono text-xs px-2.5 py-0.5 rounded bg-[#0B0F17] text-[#ED1C24] border border-slate-800 font-bold">
                {group.code}
              </span>
              <span className="text-xs text-slate-400">{group.type === 'terminal_bbm' ? 'Integrated Fuel Terminal' : 'SPBU Pasti Pas'}</span>
            </div>
            <h2 className="text-xl font-extrabold text-white tracking-tight">{group.name}</h2>
            <div className="flex flex-wrap items-center gap-3 text-xs text-slate-400 mt-1">
              <span className="flex items-center gap-1">
                <MapPin className="w-3.5 h-3.5 text-slate-500" />
                {group.address}
              </span>
              <span>·</span>
              <span className="flex items-center gap-1">
                <User className="w-3.5 h-3.5 text-slate-500" />
                Manajer: {group.managerName}
              </span>
              <span>·</span>
              <span className="flex items-center gap-1">
                <Phone className="w-3.5 h-3.5 text-slate-500" />
                {group.phone}
              </span>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-3 shrink-0">
          <button
            onClick={() => onNavigate('/reports')}
            className="px-4 py-2 bg-[#ED1C24] hover:bg-red-700 text-white rounded-xl text-xs font-bold transition-colors flex items-center gap-1.5 shadow-lg shadow-red-900/30"
          >
            <Download className="w-3.5 h-3.5" />
            <span>Ekspor Mutasi Fasilitas</span>
          </button>
        </div>
      </div>

      {/* Aggregated KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="p-5 rounded-2xl bg-[#121824] border border-slate-800">
          <span className="text-xs text-slate-400 block mb-1">Stok Aktif Fasilitas</span>
          <div className="text-2xl font-extrabold font-mono text-white tabular-nums">
            {(totalStock / 1000).toLocaleString(undefined, { maximumFractionDigits: 0 })} <span className="text-xs text-slate-400">kL</span>
          </div>
          <span className="text-[11px] text-emerald-400 font-mono mt-1 block">{fillPercent}% dari Kapasitas Terpasang</span>
        </div>

        <div className="p-5 rounded-2xl bg-[#121824] border border-slate-800">
          <span className="text-xs text-slate-400 block mb-1">Susut Rata-rata 24h</span>
          <div className={`text-2xl font-extrabold font-mono tabular-nums ${
            group.avgLossPercent > 0.5 ? 'text-red-400' : 'text-emerald-400'
          }`}>
            {group.avgLossPercent}%
          </div>
          <span className="text-[11px] text-slate-400 font-mono mt-1 block">
            Toleransi: ±{group.type === 'terminal_bbm' ? '0.15%' : '0.50%'}
          </span>
        </div>

        <div className="p-5 rounded-2xl bg-[#121824] border border-slate-800">
          <span className="text-xs text-slate-400 block mb-1">Suhu Rata-rata Tangki</span>
          <div className="text-2xl font-extrabold font-mono text-amber-400 tabular-nums">
            {avgTemp}°C
          </div>
          <span className="text-[11px] text-slate-400 font-mono mt-1 block">Termistor Multi-Point</span>
        </div>

        <div className="p-5 rounded-2xl bg-[#121824] border border-slate-800">
          <span className="text-xs text-slate-400 block mb-1">Status ATG Online</span>
          <div className="text-2xl font-extrabold font-mono text-emerald-400 tabular-nums">
            {group.onlineCount}/{group.tankCount}
          </div>
          <span className="text-[11px] text-slate-400 font-mono mt-1 block">100% Terhubung Telemetri</span>
        </div>
      </div>

      {/* Group Tanks Table */}
      <div className="bg-[#121824] rounded-2xl border border-slate-800 p-6 space-y-4 shadow-xl">
        <div className="flex items-center justify-between border-b border-slate-800/80 pb-3">
          <div>
            <h3 className="text-base font-bold text-white tracking-tight">
              Daftar Tangki di {group.name}
            </h3>
            <p className="text-xs text-slate-400">
              Pilih tangki untuk melihat Digital Twin 3D dan rincian diagnostik losses.
            </p>
          </div>
          <span className="text-xs font-mono text-slate-400">
            {groupTanks.length} Tangki Terkonfigurasi
          </span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-[#0B0F17] text-slate-400 font-semibold uppercase tracking-wider text-[10px]">
              <tr>
                <th className="py-3 px-4">Nomor & Nama</th>
                <th className="py-3 px-4">Produk</th>
                <th className="py-3 px-4 text-right">Gross Volume</th>
                <th className="py-3 px-4 text-right">Net Volume 15°C</th>
                <th className="py-3 px-4 text-right">Air Dasar</th>
                <th className="py-3 px-4 text-right">Suhu</th>
                <th className="py-3 px-4 text-center">Status ATG</th>
                <th className="py-3 px-4 text-right">Aksi</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/80">
              {groupTanks.map((tank) => (
                <tr 
                  key={tank.id} 
                  onClick={() => onNavigate(`/devices/${tank.id}`)}
                  className="hover:bg-slate-800/50 cursor-pointer transition-colors"
                >
                  <td className="py-3 px-4 font-bold text-white">
                    {tank.tankNumber} - {tank.name}
                  </td>
                  <td className="py-3 px-4 font-semibold text-slate-300">
                    {tank.fuelType}
                  </td>
                  <td className="py-3 px-4 text-right font-mono text-white tabular-nums">
                    {tank.metrics.grossVolumeLiters.toLocaleString()} L
                  </td>
                  <td className="py-3 px-4 text-right font-mono text-emerald-400 font-bold tabular-nums">
                    {tank.metrics.netStandardVolumeLiters.toLocaleString()} L
                  </td>
                  <td className="py-3 px-4 text-right font-mono tabular-nums">
                    <span className={tank.metrics.waterLevelMm > 25 ? 'text-red-400 font-bold' : 'text-sky-400'}>
                      {tank.metrics.waterLevelMm} mm
                    </span>
                  </td>
                  <td className="py-3 px-4 text-right font-mono text-amber-400 font-bold tabular-nums">
                    {tank.metrics.avgTemperatureC}°C
                  </td>
                  <td className="py-3 px-4 text-center">
                    <span className={`text-[10px] font-mono px-2 py-0.5 rounded font-bold ${
                      tank.status === 'alert' ? 'bg-red-950 text-red-400 border border-red-800' : tank.status === 'warning' ? 'bg-amber-950 text-amber-400 border border-amber-800' : 'bg-emerald-950 text-emerald-400 border border-emerald-800'
                    }`}>
                      {tank.status === 'alert' ? 'Alarm' : tank.status === 'warning' ? 'Waspada' : 'Normal'}
                    </span>
                  </td>
                  <td className="py-3 px-4 text-right">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        onNavigate(`/devices/${tank.id}`);
                      }}
                      className="px-2.5 py-1 bg-slate-800 hover:bg-[#ED1C24] text-white rounded-lg text-xs font-semibold transition-colors"
                    >
                      Buka 3D →
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
