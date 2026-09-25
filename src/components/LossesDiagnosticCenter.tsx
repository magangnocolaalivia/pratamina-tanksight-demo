import React, { useState } from 'react';
import { TankDevice } from '../types';
import { 
  AlertTriangle, 
  Flame, 
  Droplet, 
  ShieldCheck, 
  FileText, 
  Sliders, 
  Info, 
  CheckCircle2, 
  ArrowRight,
  TrendingDown,
  Activity,
  Layers,
  Sparkles
} from 'lucide-react';

interface LossesDiagnosticCenterProps {
  tank: TankDevice;
}

export const LossesDiagnosticCenter: React.FC<LossesDiagnosticCenterProps> = ({ tank }) => {
  const [simTemp, setSimTemp] = useState<number>(tank.metrics.avgTemperatureC);
  const [actionDone, setActionDone] = useState<string | null>(null);

  // Dynamic calculations based on simulated temperature vs 15°C base standard (ASTM D1250)
  // Thermal expansion coefficient of gasoline/gasoil ~ 0.001 per °C
  const deltaT = simTemp - 15;
  const vcfFactor = 1 - (deltaT * 0.00105);
  const simulatedNetVolume = Math.round(tank.metrics.grossVolumeLiters * vcfFactor);
  const simulatedThermalLoss = Math.max(0, Math.round(tank.metrics.grossVolumeLiters - simulatedNetVolume));

  const { lossAnalysis } = tank;
  const isLossExceeded = lossAnalysis.dailyLossPercent > lossAnalysis.pertaminaTolerancePercent;

  return (
    <div className="bg-[#121824] rounded-xl border border-slate-800 p-6 space-y-6">
      {/* Header with Title and Compliance Status */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-800/80 pb-5">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="w-2.5 h-2.5 rounded-full bg-[#ED1C24]" />
            <h3 className="text-base font-bold text-white tracking-tight">
              AI Loss Diagnostic & Smart Root-Cause Attribution
            </h3>
            <span className="text-xs px-2 py-0.5 rounded bg-slate-800 text-slate-300 font-mono">
              Algoritma TankSight v4.2
            </span>
          </div>
          <p className="text-xs text-slate-400">
            Pemisahan otomatis antara Penguapan Termal (ASTM D1250), Kebocoran Fisik (CSLD), dan Indikasi Fraud Bongkar Muat.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <div className="text-right">
            <span className="text-[11px] text-slate-400 block">Tingkat Susut Harian</span>
            <span className={`font-mono text-base font-bold tabular-nums ${isLossExceeded ? 'text-red-400' : 'text-emerald-400'}`}>
              {lossAnalysis.dailyLossPercent.toFixed(2)}%
            </span>
          </div>
          <div className="h-8 w-px bg-slate-800" />
          <div className="text-right">
            <span className="text-[11px] text-slate-400 block">Toleransi Pertamina</span>
            <span className="font-mono text-base font-semibold text-slate-300 tabular-nums">
              ±{lossAnalysis.pertaminaTolerancePercent.toFixed(2)}%
            </span>
          </div>
        </div>
      </div>

      {/* Primary Diagnosis Banner */}
      <div className={`p-4 rounded-xl border flex items-start gap-3.5 ${
        lossAnalysis.primaryCause === 'fraud_discrepancy'
          ? 'bg-red-950/40 border-red-900/80 text-red-200'
          : lossAnalysis.primaryCause === 'leak'
          ? 'bg-amber-950/40 border-amber-900/80 text-amber-200'
          : lossAnalysis.primaryCause === 'evaporation'
          ? 'bg-orange-950/40 border-orange-900/80 text-orange-200'
          : 'bg-emerald-950/30 border-emerald-900/70 text-emerald-200'
      }`}>
        <div className="mt-0.5 p-2 rounded-lg bg-black/40">
          {lossAnalysis.primaryCause === 'fraud_discrepancy' ? (
            <AlertTriangle className="w-5 h-5 text-red-400" />
          ) : lossAnalysis.primaryCause === 'leak' ? (
            <Droplet className="w-5 h-5 text-amber-400" />
          ) : lossAnalysis.primaryCause === 'evaporation' ? (
            <Flame className="w-5 h-5 text-orange-400" />
          ) : (
            <CheckCircle2 className="w-5 h-5 text-emerald-400" />
          )}
        </div>
        <div className="flex-1 space-y-1 text-xs">
          <div className="flex items-center justify-between">
            <span className="font-bold text-sm tracking-wide">
              {lossAnalysis.primaryCause === 'fraud_discrepancy'
                ? 'Indikasi Selisih Bongkar Muat / Fraud Pengiriman'
                : lossAnalysis.primaryCause === 'leak'
                ? 'Peringatan Kebocoran Fasilitas Tangki (CSLD Triggered)'
                : lossAnalysis.primaryCause === 'evaporation'
                ? 'Penguapan Termal & Radiasi Panas Headspace'
                : 'Operasi Nominal - Dalam Toleransi Standar'}
            </span>
            <span className="font-mono font-semibold px-2 py-0.5 rounded bg-black/50 text-[11px]">
              Skor Risiko: {lossAnalysis.riskScore}/100
            </span>
          </div>
          <p className="text-slate-300 leading-relaxed">
            {lossAnalysis.aiDiagnosis}
          </p>
          <div className="pt-2 flex items-center justify-between">
            <span className="text-[11px] font-medium text-slate-400">
              Rekomendasi Tindakan: <strong className="text-white">{lossAnalysis.recommendedAction}</strong>
            </span>
            <button
              onClick={() => setActionDone('Protokol tindakan darurat telah diteruskan ke Pengawas Lapangan & HSSE')}
              className="px-3 py-1 bg-[#ED1C24] hover:bg-red-700 text-white rounded font-medium transition-colors"
            >
              Eksekusi Tindakan
            </button>
          </div>
        </div>
      </div>

      {actionDone && (
        <div className="p-3 bg-emerald-950/60 border border-emerald-800 rounded-lg text-xs text-emerald-300 flex items-center justify-between">
          <span>{actionDone}</span>
          <button onClick={() => setActionDone(null)} className="text-slate-400 hover:text-white">✕</button>
        </div>
      )}

      {/* 3-Pillar Losses Decomposition Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* Pillar 1: Thermal & Evaporation */}
        <div className="p-4 rounded-xl bg-[#0E1524] border border-slate-800 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-semibold text-slate-300 flex items-center gap-1.5">
                <Flame className="w-4 h-4 text-orange-400" />
                Penguapan Suhu (ASTM D1250)
              </span>
              <span className="text-[11px] font-mono text-slate-400">
                {((lossAnalysis.breakdown.thermalShrinkageLiters + lossAnalysis.breakdown.evaporationLiters) / (lossAnalysis.dailyLossLiters || 1) * 100).toFixed(0)}%
              </span>
            </div>
            <div className="text-lg font-bold font-mono text-white tabular-nums mb-1">
              {(lossAnalysis.breakdown.thermalShrinkageLiters + lossAnalysis.breakdown.evaporationLiters).toLocaleString()} Liter
            </div>
            <p className="text-[11px] text-slate-400 leading-normal">
              Koreksi temperatur standar 15°C VCF. Fluktuasi volume terjadi saat suhu siang mencapai {tank.metrics.avgTemperatureC}°C.
            </p>
          </div>
          <div className="mt-3 pt-3 border-t border-slate-800/80 flex justify-between text-[11px] text-slate-400">
            <span>Tekanan Uap PV:</span>
            <span className="font-mono text-slate-200">{tank.metrics.headspacePressureKpa} kPa</span>
          </div>
        </div>

        {/* Pillar 2: Physical Leak Detection (CSLD) */}
        <div className="p-4 rounded-xl bg-[#0E1524] border border-slate-800 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-semibold text-slate-300 flex items-center gap-1.5">
                <Droplet className="w-4 h-4 text-sky-400" />
                Uji Rembesan Fisik (CSLD)
              </span>
              <span className="text-[11px] font-mono text-slate-400">
                {(lossAnalysis.breakdown.physicalLeakLiters / (lossAnalysis.dailyLossLiters || 1) * 100).toFixed(0)}%
              </span>
            </div>
            <div className={`text-lg font-bold font-mono tabular-nums mb-1 ${
              lossAnalysis.breakdown.physicalLeakLiters > 0 ? 'text-red-400' : 'text-emerald-400'
            }`}>
              {lossAnalysis.breakdown.physicalLeakLiters.toLocaleString()} Liter
            </div>
            <p className="text-[11px] text-slate-400 leading-normal">
              Statistical Inventory Reconciliation jam istirahat. Deteksi rembesan dinding ganda atau kenaikan air dasar.
            </p>
          </div>
          <div className="mt-3 pt-3 border-t border-slate-800/80 flex justify-between text-[11px] text-slate-400">
            <span>Tinggi Air Dasar:</span>
            <span className={`font-mono ${tank.metrics.waterLevelMm > 25 ? 'text-red-400 font-bold' : 'text-slate-200'}`}>
              {tank.metrics.waterLevelMm} mm {tank.metrics.waterLevelMm > 25 ? '(Waspada)' : '(Normal)'}
            </span>
          </div>
        </div>

        {/* Pillar 3: Fraud / Delivery Discrepancy */}
        <div className="p-4 rounded-xl bg-[#0E1524] border border-slate-800 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-semibold text-slate-300 flex items-center gap-1.5">
                <AlertTriangle className="w-4 h-4 text-rose-400" />
                Selisih Bongkar / Unaccounted
              </span>
              <span className="text-[11px] font-mono text-slate-400">
                {(lossAnalysis.breakdown.unaccountedDiscrepancyLiters / (lossAnalysis.dailyLossLiters || 1) * 100).toFixed(0)}%
              </span>
            </div>
            <div className={`text-lg font-bold font-mono tabular-nums mb-1 ${
              lossAnalysis.breakdown.unaccountedDiscrepancyLiters > 50 ? 'text-red-400' : 'text-slate-200'
            }`}>
              {lossAnalysis.breakdown.unaccountedDiscrepancyLiters.toLocaleString()} Liter
            </div>
            <p className="text-[11px] text-slate-400 leading-normal">
              Selisih penerimaan DO Mobil Tangki vs dip ATG atau drift kalibrasi nozzle dispenser yang tidak wajar.
            </p>
          </div>
          <div className="mt-3 pt-3 border-t border-slate-800/80 flex justify-between text-[11px] text-slate-400">
            <span>Audit Status:</span>
            <span className="font-mono text-slate-200">
              {lossAnalysis.breakdown.unaccountedDiscrepancyLiters > 50 ? 'Flagged Audit' : 'Verifikasi Sinkron'}
            </span>
          </div>
        </div>
      </div>

      {/* Interactive ASTM D1250 Temperature Correction Simulator */}
      <div className="p-5 rounded-xl bg-[#0B0F17] border border-slate-800 space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Sliders className="w-4 h-4 text-emerald-400" />
            <h4 className="text-xs font-bold text-white uppercase tracking-wider">
              Simulasi Dinamis ASTM D1250 (Faktor Suhu Terhadap Volume)
            </h4>
          </div>
          <span className="text-xs font-mono text-slate-400">
            Suhu Standar Referensi: <strong>15.0°C</strong>
          </span>
        </div>

        <div className="space-y-2">
          <div className="flex justify-between text-xs text-slate-400">
            <span>Geser Suhu Lingkungan Tangki:</span>
            <span className="font-mono font-bold text-amber-400 tabular-nums">{simTemp.toFixed(1)}°C</span>
          </div>
          <input
            type="range"
            min="15"
            max="42"
            step="0.5"
            value={simTemp}
            onChange={(e) => setSimTemp(parseFloat(e.target.value))}
            className="w-full accent-[#ED1C24] cursor-pointer"
          />
          <div className="flex justify-between text-[10px] text-slate-500 font-mono">
            <span>15°C (Base)</span>
            <span>28°C (Malam)</span>
            <span>34°C (Siang)</span>
            <span>42°C (Panas Ekstrem Tropis)</span>
          </div>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 pt-2 text-xs">
          <div className="p-2.5 rounded bg-slate-900 border border-slate-800">
            <span className="text-[11px] text-slate-400 block">Gross Observed (GOV)</span>
            <span className="font-mono font-bold text-white tabular-nums">
              {tank.metrics.grossVolumeLiters.toLocaleString()} L
            </span>
          </div>
          <div className="p-2.5 rounded bg-slate-900 border border-slate-800">
            <span className="text-[11px] text-slate-400 block">Volume Koreksi 15°C (GSV)</span>
            <span className="font-mono font-bold text-emerald-400 tabular-nums">
              {simulatedNetVolume.toLocaleString()} L
            </span>
          </div>
          <div className="p-2.5 rounded bg-slate-900 border border-slate-800">
            <span className="text-[11px] text-slate-400 block">Faktor VCF ASTM</span>
            <span className="font-mono font-bold text-sky-400 tabular-nums">
              {vcfFactor.toFixed(5)}
            </span>
          </div>
          <div className="p-2.5 rounded bg-slate-900 border border-slate-800">
            <span className="text-[11px] text-slate-400 block">Delta Susut Termal</span>
            <span className="font-mono font-bold text-orange-400 tabular-nums">
              -{simulatedThermalLoss.toLocaleString()} L
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};
