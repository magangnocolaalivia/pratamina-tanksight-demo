import React, { useState } from 'react';
import { TankDevice, FacilityGroup } from '../types';
import { FileText, Download, Calendar, Filter, CheckCircle2, AlertTriangle, Printer } from 'lucide-react';

interface ReportsPageProps {
  tanks: TankDevice[];
  groups: FacilityGroup[];
}

export const ReportsPage: React.FC<ReportsPageProps> = ({ tanks, groups }) => {
  const [selectedFacility, setSelectedFacility] = useState('ALL');
  const [dateRange, setDateRange] = useState('Bulan Ini (September 2026)');

  const filteredTanks = selectedFacility === 'ALL'
    ? tanks
    : tanks.filter(t => t.facilityId === selectedFacility);

  const handleDownloadReport = () => {
    alert('Laporan Rekonsiliasi Losses BBM resmi Pertamina Patra Niaga (Format BAP Metrologi) sedang diunduh.');
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-[#121824] rounded-2xl border border-slate-800 p-6 flex flex-col md:flex-row md:items-center justify-between gap-4 shadow-xl">
        <div>
          <div className="flex items-center gap-2 mb-1.5">
            <FileText className="w-5 h-5 text-[#ED1C24]" />
            <h2 className="text-xl md:text-2xl font-extrabold text-white tracking-tight">
              Buku Mutasi BBM & Laporan Rekonsiliasi Losses
            </h2>
          </div>
          <p className="text-xs text-slate-400 max-w-3xl">
            Laporan kepatuhan metrologi legal harian, rekonsiliasi volume terima vs salur, dan pencatatan susut penguapan suhu standar ASTM D1250 / API MPMS.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={handleDownloadReport}
            className="px-4 py-2.5 bg-[#ED1C24] hover:bg-red-700 text-white rounded-xl text-xs font-bold transition-all shadow-lg shadow-red-900/40 flex items-center gap-2"
          >
            <Download className="w-4 h-4" />
            <span>Unduh Laporan Audit (.PDF)</span>
          </button>
        </div>
      </div>

      {/* Filter Bar */}
      <div className="bg-[#121824] rounded-2xl border border-slate-800 p-4 flex flex-wrap items-center gap-4 text-xs">
        <div className="flex items-center gap-2 text-slate-300 font-semibold">
          <Filter className="w-4 h-4 text-slate-500" />
          <span>Filter Laporan:</span>
        </div>

        <select
          value={selectedFacility}
          onChange={(e) => setSelectedFacility(e.target.value)}
          className="bg-[#0B0F17] border border-slate-800 rounded-xl px-3.5 py-2 text-white focus:outline-none focus:border-[#ED1C24]"
        >
          <option value="ALL">Semua Fasilitas Terdaftar ({groups.length})</option>
          {groups.map(g => (
            <option key={g.id} value={g.id}>{g.name}</option>
          ))}
        </select>

        <select
          value={dateRange}
          onChange={(e) => setDateRange(e.target.value)}
          className="bg-[#0B0F17] border border-slate-800 rounded-xl px-3.5 py-2 text-white focus:outline-none focus:border-[#ED1C24]"
        >
          <option value="Hari Ini">Hari Ini (24 Jam Terakhir)</option>
          <option value="Minggu Ini">Minggu Ini</option>
          <option value="Bulan Ini (September 2026)">Bulan Ini (September 2026)</option>
          <option value="Triwulan III 2026">Triwulan III 2026</option>
        </select>
      </div>

      {/* Report Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="p-5 rounded-2xl bg-[#121824] border border-slate-800">
          <span className="text-xs text-slate-400 block mb-1">Total Data Point Dihimpun</span>
          <div className="text-2xl font-extrabold font-mono text-white tabular-nums">432,000</div>
          <span className="text-[11px] text-emerald-400 font-mono mt-1 block">Tingkat Integritas 99.98%</span>
        </div>

        <div className="p-5 rounded-2xl bg-[#121824] border border-slate-800">
          <span className="text-xs text-slate-400 block mb-1">Rata-rata Losses Kumulatif</span>
          <div className="text-2xl font-extrabold font-mono text-amber-400 tabular-nums">0.17%</div>
          <span className="text-[11px] text-slate-400 font-mono mt-1 block">Toleransi Patra Niaga Terpenuhi</span>
        </div>

        <div className="p-5 rounded-2xl bg-[#121824] border border-slate-800">
          <span className="text-xs text-slate-400 block mb-1">Total Susut Suhu Termal</span>
          <div className="text-2xl font-extrabold font-mono text-white tabular-nums">48,200 L</div>
          <span className="text-[11px] text-orange-400 font-mono mt-1 block">Terkoreksi ASTM D1250 VCF</span>
        </div>

        <div className="p-5 rounded-2xl bg-[#121824] border border-slate-800">
          <span className="text-xs text-slate-400 block mb-1">Berita Acara Selisih (BAP)</span>
          <div className="text-2xl font-extrabold font-mono text-red-400 tabular-nums">1 Dokumen</div>
          <span className="text-[11px] text-red-400 font-mono mt-1 block">Tiba Kurang Mobil Tangki B 9281</span>
        </div>
      </div>

      {/* Official Reconciliation Table */}
      <div className="bg-[#121824] rounded-2xl border border-slate-800 p-6 space-y-4 shadow-xl">
        <div className="flex items-center justify-between border-b border-slate-800/80 pb-3">
          <div>
            <h3 className="text-base font-bold text-white tracking-tight">
              Tabel Rekonsiliasi Harian Tangki (Buku Ukur Tangki Metrologi)
            </h3>
            <p className="text-xs text-slate-400">
              Perbandingan Gross Observed Volume (GOV) terhadap Net Standard Volume (GSV 15°C).
            </p>
          </div>
          <span className="text-xs font-mono text-slate-400">Periode: September 2026</span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-[#0B0F17] text-slate-400 font-semibold uppercase tracking-wider text-[10px]">
              <tr>
                <th className="py-3 px-4">Tangki</th>
                <th className="py-3 px-4">Fasilitas</th>
                <th className="py-3 px-4">Produk</th>
                <th className="py-3 px-4 text-right">GOV (L)</th>
                <th className="py-3 px-4 text-right">GSV 15°C (L)</th>
                <th className="py-3 px-4 text-right">Delta Suhu (L)</th>
                <th className="py-3 px-4 text-right">Susut 24h (%)</th>
                <th className="py-3 px-4 text-center">Status Audit</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/80">
              {filteredTanks.map((t) => {
                const thermalDelta = t.metrics.grossVolumeLiters - t.metrics.netStandardVolumeLiters;
                const isExceeded = t.lossAnalysis.dailyLossPercent > t.lossAnalysis.pertaminaTolerancePercent;

                return (
                  <tr key={t.id} className="hover:bg-slate-800/40 transition-colors">
                    <td className="py-3 px-4 font-bold text-white">{t.tankNumber}</td>
                    <td className="py-3 px-4 text-slate-300">{t.facilityName}</td>
                    <td className="py-3 px-4 font-semibold text-slate-300">{t.fuelType}</td>
                    <td className="py-3 px-4 text-right font-mono text-white tabular-nums">
                      {t.metrics.grossVolumeLiters.toLocaleString()}
                    </td>
                    <td className="py-3 px-4 text-right font-mono text-emerald-400 font-bold tabular-nums">
                      {t.metrics.netStandardVolumeLiters.toLocaleString()}
                    </td>
                    <td className="py-3 px-4 text-right font-mono text-orange-400 tabular-nums">
                      -{thermalDelta.toLocaleString()} L
                    </td>
                    <td className="py-3 px-4 text-right font-mono tabular-nums">
                      <span className={isExceeded ? 'text-red-400 font-bold' : 'text-emerald-400'}>
                        {t.lossAnalysis.dailyLossPercent}%
                      </span>
                    </td>
                    <td className="py-3 px-4 text-center">
                      <span className={`text-[10px] font-mono px-2 py-0.5 rounded font-bold ${
                        isExceeded ? 'bg-red-950 text-red-400 border border-red-800' : 'bg-emerald-950 text-emerald-400 border border-emerald-800'
                      }`}>
                        {isExceeded ? 'Audit Diperlukan' : 'Terverifikasi'}
                      </span>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
