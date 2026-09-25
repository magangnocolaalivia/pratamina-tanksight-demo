import React, { useState } from 'react';
import { TankDevice } from '../types';
import { LossesDiagnosticCenter } from '../components/LossesDiagnosticCenter';
import { 
  Flame, 
  Droplet, 
  AlertTriangle, 
  ShieldCheck, 
  Sliders, 
  FileText, 
  CheckCircle2, 
  ArrowRight,
  TrendingDown,
  Layers,
  Sparkles
} from 'lucide-react';

interface LossesDiagnosticPageProps {
  tanks: TankDevice[];
  onNavigate: (path: string) => void;
}

export const LossesDiagnosticPage: React.FC<LossesDiagnosticPageProps> = ({ tanks, onNavigate }) => {
  const [selectedTankId, setSelectedTankId] = useState<string>(tanks[0]?.id || 'TNK-PLP-01');

  const selectedTank = tanks.find(t => t.id === selectedTankId) || tanks[0];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-[#121824] rounded-2xl border border-slate-800 p-6 flex flex-col md:flex-row md:items-center justify-between gap-4 shadow-xl">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="w-2.5 h-2.5 rounded-full bg-[#ED1C24] animate-pulse" />
            <span className="text-xs font-bold text-[#ED1C24] uppercase tracking-wider">
              AI Loss Attribution Engine (TankSight x Pertamina)
            </span>
          </div>
          <h2 className="text-xl md:text-2xl font-extrabold text-white tracking-tight">
            Pusat Diagnostik & Mitigasi Penyusutan (Losses) BBM
          </h2>
          <p className="text-xs text-slate-400 mt-1 max-w-3xl">
            Algoritma pemilahan otomatis untuk membedakan secara instan apakah penyusutan disebabkan oleh penguapan alami (faktor cuaca tropis & suhu ASTM D1250), kebocoran tangki fisik (CSLD), atau indikasi fraud saat proses bongkar muat BBM.
          </p>
        </div>

        {/* Tank Selector Dropdown */}
        <div className="flex items-center gap-3">
          <label className="text-xs font-semibold text-slate-300">Pilih Tangki:</label>
          <select
            value={selectedTankId}
            onChange={(e) => setSelectedTankId(e.target.value)}
            className="bg-[#0B0F17] border border-slate-800 rounded-xl px-4 py-2.5 text-xs text-white focus:outline-none focus:border-[#ED1C24] font-medium transition-colors"
          >
            {tanks.map(t => (
              <option key={t.id} value={t.id}>
                {t.tankNumber} - {t.fuelType} ({t.facilityName})
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Quick Summary of All 3 Classes of Losses */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="p-5 rounded-2xl bg-[#121824] border border-slate-800 space-y-2">
          <div className="flex items-center gap-2 text-orange-400 text-xs font-bold uppercase tracking-wider">
            <Flame className="w-4 h-4" />
            <span>1. Penguapan Alami (Thermal)</span>
          </div>
          <p className="text-xs text-slate-300">
            Penyusutan volumetrik akibat panas matahari dan perbedaan suhu 15°C standard base. Dihitung otomatis dengan tabel ASTM D1250 VCF.
          </p>
          <span className="text-[11px] text-slate-400 font-mono block pt-1 border-t border-slate-800/80">
            Solusi: Aktivasi water sprinkler atap tangki
          </span>
        </div>

        <div className="p-5 rounded-2xl bg-[#121824] border border-slate-800 space-y-2">
          <div className="flex items-center gap-2 text-sky-400 text-xs font-bold uppercase tracking-wider">
            <Droplet className="w-4 h-4" />
            <span>2. Kebocoran Fasilitas (CSLD)</span>
          </div>
          <p className="text-xs text-slate-300">
            Deteksi rembesan dinding tangki ganda atau kenaikan sensor air dasar (water bottom &gt; 25mm) saat pengujian statis dini hari (01:00 - 04:00 WIB).
          </p>
          <span className="text-[11px] text-slate-400 font-mono block pt-1 border-t border-slate-800/80">
            Solusi: Isolasi katup, uji tekan pipa decay test
          </span>
        </div>

        <div className="p-5 rounded-2xl bg-[#121824] border border-slate-800 space-y-2">
          <div className="flex items-center gap-2 text-red-400 text-xs font-bold uppercase tracking-wider">
            <AlertTriangle className="w-4 h-4" />
            <span>3. Indikasi Fraud / Bongkar Muat</span>
          </div>
          <p className="text-xs text-slate-300">
            Selisih signifikan antara DO/SPP Mobil Tangki vs volume aktual yang diterima tangki penerima ATG SPBU, atau pembukaan segel e-seal ilegal.
          </p>
          <span className="text-[11px] text-slate-400 font-mono block pt-1 border-t border-slate-800/80">
            Solusi: Terbitkan BAP Tiba Kurang, audit CCTV
          </span>
        </div>
      </div>

      {/* Main Diagnostic Center Component for the Selected Tank */}
      <LossesDiagnosticCenter tank={selectedTank} />

      {/* Cross-Facility Losses Comparison Matrix */}
      <div className="bg-[#121824] rounded-2xl border border-slate-800 p-6 space-y-4 shadow-xl">
        <div className="flex items-center justify-between border-b border-slate-800/80 pb-3">
          <div>
            <h3 className="text-base font-bold text-white tracking-tight">
              Matriks Audit Losses Lintas Fasilitas
            </h3>
            <p className="text-xs text-slate-400">
              Evaluasi kepatuhan batas toleransi susut standar Pertamina (Terminal BBM: 0.15% | SPBU: 0.50%).
            </p>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-[#0B0F17] text-slate-400 font-semibold uppercase tracking-wider text-[10px]">
              <tr>
                <th className="py-3 px-4">Tangki & Lokasi</th>
                <th className="py-3 px-4">Produk</th>
                <th className="py-3 px-4 text-right">Susut 24h (L)</th>
                <th className="py-3 px-4 text-right">Persentase</th>
                <th className="py-3 px-4 text-right">Toleransi</th>
                <th className="py-3 px-4">Penyebab Dominan</th>
                <th className="py-3 px-4 text-center">Status Toleransi</th>
                <th className="py-3 px-4 text-right">Audit</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/80">
              {tanks.map((t) => {
                const isExceeded = t.lossAnalysis.dailyLossPercent > t.lossAnalysis.pertaminaTolerancePercent;

                return (
                  <tr key={t.id} className="hover:bg-slate-800/40 transition-colors">
                    <td className="py-3 px-4">
                      <div className="font-bold text-white">{t.tankNumber} - {t.name}</div>
                      <div className="text-[10px] text-slate-400">{t.facilityName}</div>
                    </td>
                    <td className="py-3 px-4 font-semibold text-slate-300">{t.fuelType}</td>
                    <td className="py-3 px-4 text-right font-mono font-bold text-white tabular-nums">
                      {t.lossAnalysis.dailyLossLiters.toLocaleString()} L
                    </td>
                    <td className="py-3 px-4 text-right font-mono font-bold tabular-nums">
                      <span className={isExceeded ? 'text-red-400' : 'text-emerald-400'}>
                        {t.lossAnalysis.dailyLossPercent.toFixed(2)}%
                      </span>
                    </td>
                    <td className="py-3 px-4 text-right font-mono text-slate-400 tabular-nums">
                      ±{t.lossAnalysis.pertaminaTolerancePercent.toFixed(2)}%
                    </td>
                    <td className="py-3 px-4">
                      <span className="font-medium text-slate-200">
                        {t.lossAnalysis.primaryCause === 'fraud_discrepancy'
                          ? 'Bongkar Muat / Fraud'
                          : t.lossAnalysis.primaryCause === 'leak'
                          ? 'Rembesan CSLD'
                          : t.lossAnalysis.primaryCause === 'evaporation'
                          ? 'Penguapan Suhu'
                          : 'Normal'}
                      </span>
                    </td>
                    <td className="py-3 px-4 text-center">
                      <span className={`text-[10px] font-mono px-2 py-0.5 rounded font-bold ${
                        isExceeded ? 'bg-red-950 text-red-400 border border-red-800' : 'bg-emerald-950 text-emerald-400 border border-emerald-800'
                      }`}>
                        {isExceeded ? 'Melampaui Toleransi' : 'Dalam Toleransi'}
                      </span>
                    </td>
                    <td className="py-3 px-4 text-right">
                      <button
                        onClick={() => setSelectedTankId(t.id)}
                        className="px-2.5 py-1 bg-slate-800 hover:bg-[#ED1C24] text-white rounded-lg text-xs font-semibold transition-colors"
                      >
                        Pilih Tangki
                      </button>
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
