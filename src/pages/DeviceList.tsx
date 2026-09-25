import React, { useState, useMemo } from 'react';
import { TankDevice, FacilityGroup, FuelType, TankStatus } from '../types';
import { 
  Search, 
  Filter, 
  Download, 
  Grid, 
  List, 
  MapPin, 
  Layers, 
  Database, 
  ArrowRight,
  AlertTriangle,
  CheckCircle2,
  Droplet
} from 'lucide-react';

interface DeviceListProps {
  tanks: TankDevice[];
  groups: FacilityGroup[];
  onNavigate: (path: string) => void;
}

export const DeviceList: React.FC<DeviceListProps> = ({ tanks, groups, onNavigate }) => {
  const [viewMode, setViewMode] = useState<'list' | 'card' | 'map'>('list');
  const [search, setSearch] = useState('');
  const [facilityFilter, setFacilityFilter] = useState('ALL');
  const [fuelFilter, setFuelFilter] = useState('ALL');
  const [statusFilter, setStatusFilter] = useState('ALL');

  const filteredTanks = useMemo(() => {
    return tanks.filter(t => {
      const matchSearch = t.name.toLowerCase().includes(search.toLowerCase()) ||
        t.tankNumber.toLowerCase().includes(search.toLowerCase()) ||
        t.facilityName.toLowerCase().includes(search.toLowerCase());

      const matchFacility = facilityFilter === 'ALL' || t.facilityId === facilityFilter;
      const matchFuel = fuelFilter === 'ALL' || t.fuelType === fuelFilter;
      const matchStatus = statusFilter === 'ALL' || t.status === statusFilter;

      return matchSearch && matchFacility && matchFuel && matchStatus;
    });
  }, [tanks, search, facilityFilter, fuelFilter, statusFilter]);

  const handleExportCSV = () => {
    const headers = 'ID,Nomor Tangki,Nama,Fasilitas,BBM,Status,Gross Volume (L),Net Volume 15C (L),Water (mm),Suhu (C)\n';
    const rows = filteredTanks.map(t => 
      `${t.id},"${t.tankNumber}","${t.name}","${t.facilityName}","${t.fuelType}","${t.status}",${t.metrics.grossVolumeLiters},${t.metrics.netStandardVolumeLiters},${t.metrics.waterLevelMm},${t.metrics.avgTemperatureC}`
    ).join('\n');

    const blob = new Blob([headers + rows], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `pertamina_atg_tanks_${new Date().toISOString().slice(0, 10)}.csv`;
    a.click();
  };

  return (
    <div className="space-y-6">
      {/* Header and Controls */}
      <div className="bg-[#121824] rounded-2xl border border-slate-800 p-6 space-y-4 shadow-xl">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h2 className="text-xl font-extrabold text-white tracking-tight">
              Inventaris Tangki & Telemetri ATG
            </h2>
            <p className="text-xs text-slate-400">
              Monitoring seluruh tangki timbun Terminal BBM dan tangki pendam SPBU terhubung ke sistem TankSight.
            </p>
          </div>

          <div className="flex items-center gap-3">
            {/* View Mode Toggle */}
            <div className="flex items-center p-1 bg-[#0B0F17] rounded-xl border border-slate-800">
              <button
                onClick={() => setViewMode('list')}
                className={`p-1.5 rounded-lg text-xs font-medium transition-colors ${
                  viewMode === 'list' ? 'bg-[#ED1C24] text-white shadow' : 'text-slate-400 hover:text-white'
                }`}
                title="Tampilan Tabel"
              >
                <List className="w-4 h-4" />
              </button>
              <button
                onClick={() => setViewMode('card')}
                className={`p-1.5 rounded-lg text-xs font-medium transition-colors ${
                  viewMode === 'card' ? 'bg-[#ED1C24] text-white shadow' : 'text-slate-400 hover:text-white'
                }`}
                title="Tampilan Kartu"
              >
                <Grid className="w-4 h-4" />
              </button>
              <button
                onClick={() => setViewMode('map')}
                className={`p-1.5 rounded-lg text-xs font-medium transition-colors ${
                  viewMode === 'map' ? 'bg-[#ED1C24] text-white shadow' : 'text-slate-400 hover:text-white'
                }`}
                title="Tampilan Peta"
              >
                <MapPin className="w-4 h-4" />
              </button>
            </div>

            <button
              onClick={handleExportCSV}
              className="px-3 py-2 bg-slate-800 hover:bg-slate-700 text-white rounded-xl text-xs font-bold transition-colors flex items-center gap-1.5"
            >
              <Download className="w-3.5 h-3.5 text-slate-400" />
              <span>Ekspor CSV</span>
            </button>
          </div>
        </div>

        {/* Filter Toolbar */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3 pt-2">
          {/* Search */}
          <div className="relative">
            <Search className="w-3.5 h-3.5 text-slate-500 absolute left-3 top-3" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Cari nomor tangki / lokasi..."
              className="w-full bg-[#0B0F17] border border-slate-800 rounded-xl pl-9 pr-3 py-2 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-[#ED1C24] transition-colors"
            />
          </div>

          {/* Facility Filter */}
          <select
            value={facilityFilter}
            onChange={(e) => setFacilityFilter(e.target.value)}
            className="bg-[#0B0F17] border border-slate-800 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-[#ED1C24] transition-colors"
          >
            <option value="ALL">Semua Fasilitas ({groups.length})</option>
            {groups.map(g => (
              <option key={g.id} value={g.id}>{g.name}</option>
            ))}
          </select>

          {/* Fuel Filter */}
          <select
            value={fuelFilter}
            onChange={(e) => setFuelFilter(e.target.value)}
            className="bg-[#0B0F17] border border-slate-800 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-[#ED1C24] transition-colors"
          >
            <option value="ALL">Semua Produk BBM</option>
            <option value="Pertalite">Pertalite</option>
            <option value="Pertamax">Pertamax (RON 92)</option>
            <option value="Pertamax Turbo">Pertamax Turbo (RON 98)</option>
            <option value="Biosolar B35">Biosolar B35</option>
            <option value="Dexlite">Dexlite</option>
            <option value="Pertamina Dex">Pertamina Dex</option>
          </select>

          {/* Status Filter */}
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="bg-[#0B0F17] border border-slate-800 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-[#ED1C24] transition-colors"
          >
            <option value="ALL">Semua Status ATG</option>
            <option value="normal">Normal (Stabil)</option>
            <option value="warning">Waspada (Penguapan / Discrepancy)</option>
            <option value="alert">Kritis (Kebocoran / Air Dasar)</option>
          </select>
        </div>
      </div>

      {/* View Mode 1: Table List View */}
      {viewMode === 'list' && (
        <div className="bg-[#121824] rounded-2xl border border-slate-800 overflow-hidden shadow-xl">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-[#0B0F17] border-b border-slate-800 text-slate-400 font-semibold uppercase tracking-wider text-[10px]">
                <tr>
                  <th className="py-3.5 px-4">Tangki & Nomor</th>
                  <th className="py-3.5 px-4">Fasilitas / Lokasi</th>
                  <th className="py-3.5 px-4">Produk</th>
                  <th className="py-3.5 px-4 text-right">Gross Volume (GOV)</th>
                  <th className="py-3.5 px-4 text-right">Net Volume (15°C)</th>
                  <th className="py-3.5 px-4 text-right">Air Dasar</th>
                  <th className="py-3.5 px-4 text-right">Suhu Rata-rata</th>
                  <th className="py-3.5 px-4 text-center">Status & Diagnostik</th>
                  <th className="py-3.5 px-4 text-right">Tindakan</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/80">
                {filteredTanks.map((tank) => {
                  const isAlert = tank.status === 'alert';
                  const isWarning = tank.status === 'warning';

                  return (
                    <tr 
                      key={tank.id}
                      onClick={() => onNavigate(`/devices/${tank.id}`)}
                      className="hover:bg-slate-800/50 transition-colors cursor-pointer group"
                    >
                      <td className="py-3.5 px-4">
                        <div className="font-bold text-white group-hover:text-[#ED1C24] transition-colors">
                          {tank.tankNumber}
                        </div>
                        <div className="text-[10px] text-slate-400 font-mono">
                          {tank.category === 'bulk_terminal' ? 'Tangki Timbun' : 'Tangki Pendam'}
                        </div>
                      </td>
                      <td className="py-3.5 px-4">
                        <div className="font-medium text-slate-200 truncate max-w-[180px]">
                          {tank.facilityName}
                        </div>
                        <div className="text-[10px] text-slate-400">{tank.locationCity}</div>
                      </td>
                      <td className="py-3.5 px-4 font-semibold text-slate-300">
                        {tank.fuelType}
                      </td>
                      <td className="py-3.5 px-4 text-right font-mono font-bold text-white tabular-nums">
                        {tank.metrics.grossVolumeLiters.toLocaleString()} L
                      </td>
                      <td className="py-3.5 px-4 text-right font-mono font-bold text-emerald-400 tabular-nums">
                        {tank.metrics.netStandardVolumeLiters.toLocaleString()} L
                      </td>
                      <td className="py-3.5 px-4 text-right font-mono tabular-nums">
                        <span className={tank.metrics.waterLevelMm > 25 ? 'text-red-400 font-bold' : 'text-sky-400'}>
                          {tank.metrics.waterLevelMm} mm
                        </span>
                      </td>
                      <td className="py-3.5 px-4 text-right font-mono text-amber-400 font-bold tabular-nums">
                        {tank.metrics.avgTemperatureC}°C
                      </td>
                      <td className="py-3.5 px-4 text-center">
                        <span className={`inline-block text-[10px] font-mono px-2 py-0.5 rounded font-bold ${
                          isAlert 
                            ? 'bg-red-950 text-red-400 border border-red-800' 
                            : isWarning 
                            ? 'bg-amber-950 text-amber-400 border border-amber-800' 
                            : 'bg-emerald-950 text-emerald-400 border border-emerald-800'
                        }`}>
                          {isAlert ? 'Alarm Rembesan' : isWarning ? 'Waspada Susut' : 'Normal'}
                        </span>
                      </td>
                      <td className="py-3.5 px-4 text-right">
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            onNavigate(`/devices/${tank.id}`);
                          }}
                          className="px-2.5 py-1 bg-slate-800 group-hover:bg-[#ED1C24] text-white rounded-lg text-xs font-semibold transition-colors"
                        >
                          Detail 3D →
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* View Mode 2: Card Grid View */}
      {viewMode === 'card' && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredTanks.map((tank) => {
            const fillRatio = ((tank.metrics.grossVolumeLiters / tank.metrics.capacityLiters) * 100).toFixed(0);
            const isAlert = tank.status === 'alert';
            const isWarning = tank.status === 'warning';

            return (
              <div
                key={tank.id}
                onClick={() => onNavigate(`/devices/${tank.id}`)}
                className="bg-[#121824] rounded-2xl border border-slate-800 hover:border-slate-700 p-5 space-y-4 cursor-pointer transition-all shadow-xl group"
              >
                <div className="flex items-start justify-between">
                  <div>
                    <div className="flex items-center gap-1.5 mb-1">
                      <span className="font-mono text-xs font-bold text-white px-2 py-0.5 rounded bg-[#0B0F17] border border-slate-800">
                        {tank.tankNumber}
                      </span>
                      <span className="text-xs font-semibold text-slate-300">{tank.fuelType}</span>
                    </div>
                    <h4 className="text-sm font-bold text-white group-hover:text-[#ED1C24] transition-colors truncate max-w-[200px]">
                      {tank.name}
                    </h4>
                    <span className="text-xs text-slate-400">{tank.facilityName}</span>
                  </div>

                  <span className={`text-[10px] font-mono px-2 py-0.5 rounded font-bold ${
                    isAlert ? 'bg-red-950 text-red-400 border border-red-800' : isWarning ? 'bg-amber-950 text-amber-400 border border-amber-800' : 'bg-emerald-950 text-emerald-400 border border-emerald-800'
                  }`}>
                    {isAlert ? 'Alarm Bocor' : isWarning ? 'Waspada' : 'Normal'}
                  </span>
                </div>

                {/* Level Gauge Bar */}
                <div className="space-y-1">
                  <div className="flex justify-between text-xs text-slate-400">
                    <span>Kapasitas Terisi ({fillRatio}%)</span>
                    <span className="font-mono text-white font-bold tabular-nums">
                      {tank.metrics.grossVolumeLiters.toLocaleString()} L
                    </span>
                  </div>
                  <div className="w-full h-2 bg-[#0B0F17] rounded-full overflow-hidden border border-slate-800">
                    <div 
                      className={`h-full rounded-full ${isAlert ? 'bg-red-500' : isWarning ? 'bg-amber-400' : 'bg-emerald-500'}`} 
                      style={{ width: `${fillRatio}%` }} 
                    />
                  </div>
                </div>

                <div className="grid grid-cols-3 gap-2 pt-2 border-t border-slate-800/80 text-center text-xs">
                  <div className="p-2 rounded-lg bg-[#0B0F17]">
                    <span className="text-[10px] text-slate-500 block">Air Dasar</span>
                    <span className={`font-mono font-bold ${tank.metrics.waterLevelMm > 25 ? 'text-red-400' : 'text-sky-400'}`}>
                      {tank.metrics.waterLevelMm} mm
                    </span>
                  </div>
                  <div className="p-2 rounded-lg bg-[#0B0F17]">
                    <span className="text-[10px] text-slate-500 block">Suhu Rata</span>
                    <span className="font-mono font-bold text-amber-400">
                      {tank.metrics.avgTemperatureC}°C
                    </span>
                  </div>
                  <div className="p-2 rounded-lg bg-[#0B0F17]">
                    <span className="text-[10px] text-slate-500 block">Susut 24h</span>
                    <span className={`font-mono font-bold ${tank.lossAnalysis.dailyLossPercent > 0.5 ? 'text-red-400' : 'text-emerald-400'}`}>
                      {tank.lossAnalysis.dailyLossPercent}%
                    </span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* View Mode 3: Map View */}
      {viewMode === 'map' && (
        <div className="bg-[#121824] rounded-2xl border border-slate-800 p-6 space-y-4 shadow-xl">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-base font-bold text-white tracking-tight">
                Peta Sebaran Fasilitas Tangki BBM
              </h3>
              <p className="text-xs text-slate-400">
                Visualisasi titik koordinat geospasial Terminal BBM dan SPBU.
              </p>
            </div>
            <span className="text-xs font-mono text-emerald-400 font-bold bg-emerald-950/60 px-2.5 py-1 rounded border border-emerald-800">
              6 Fasilitas Terpetakan
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {groups.map(group => (
              <div 
                key={group.id}
                onClick={() => onNavigate(`/devices/group/${group.id}`)}
                className="p-4 rounded-xl bg-[#0B0F17] border border-slate-800 hover:border-slate-700 cursor-pointer transition-all space-y-2"
              >
                <div className="flex items-start justify-between">
                  <div>
                    <span className="font-mono text-[10px] text-slate-500">{group.coordinates[0]}, {group.coordinates[1]}</span>
                    <h4 className="font-bold text-white text-sm">{group.name}</h4>
                    <span className="text-xs text-slate-400">{group.city}</span>
                  </div>
                  <MapPin className="w-5 h-5 text-[#ED1C24]" />
                </div>
                <div className="text-xs text-slate-300 pt-2 border-t border-slate-800/80 flex justify-between">
                  <span>Jumlah Tangki: <strong>{group.tankCount} unit</strong></span>
                  <span className="text-emerald-400 font-semibold">{group.onlineCount} Online</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
