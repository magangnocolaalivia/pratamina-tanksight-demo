import React from 'react';
import { TankDevice } from '../types';
import { BrainCircuit, AlertTriangle, ShieldCheck, CheckCircle2, TrendingUp, Sparkles, Wrench } from 'lucide-react';

interface PredictivePageProps {
  tanks: TankDevice[];
  onNavigate: (path: string) => void;
}

export const PredictivePage: React.FC<PredictivePageProps> = ({ tanks, onNavigate }) => {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-[#121824] rounded-2xl border border-slate-800 p-6 flex flex-col md:flex-row md:items-center justify-between gap-4 shadow-xl">
        <div>
          <div className="flex items-center gap-2 mb-1.5">
            <BrainCircuit className="w-5 h-5 text-[#ED1C24]" />
            <h2 className="text-xl md:text-2xl font-extrabold text-white tracking-tight">
              Analitik Prediktif & Deteksi Dini Anomali AI
            </h2>
          </div>
          <p className="text-xs text-slate-400 max-w-3xl">
            Model Machine Learning prediktif untuk mendeteksi degradasi katup uap (breather valve), risiko kebocoran micro-seepage, pergeseran kalibrasi nozzle dispenser, dan pola anomali susut stok sebelum menjadi kerugian masif.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <span className="text-xs font-mono text-emerald-400 font-bold bg-emerald-950/60 px-3 py-1.5 rounded-xl border border-emerald-800 flex items-center gap-1.5">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Akurasi Model: 94.2%</span>
          </span>
        </div>
      </div>

      {/* Metrics Row */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="p-5 rounded-2xl bg-[#121824] border border-slate-800">
          <span className="text-xs text-slate-400 block mb-1">Tangki Dalam Pengawasan Risiko</span>
          <div className="text-2xl font-extrabold font-mono text-red-400 tabular-nums">2 Tangki</div>
          <span className="text-[11px] text-slate-400 font-mono mt-1 block">T-101 (Plumpang) & TP-03 (Dago)</span>
        </div>

        <div className="p-5 rounded-2xl bg-[#121824] border border-slate-800">
          <span className="text-xs text-slate-400 block mb-1">Anomali Terdeteksi (30 Hari)</span>
          <div className="text-2xl font-extrabold font-mono text-amber-400 tabular-nums">5 Insiden</div>
          <span className="text-[11px] text-slate-400 font-mono mt-1 block">4 Terselesaikan · 1 Investigasi</span>
        </div>

        <div className="p-5 rounded-2xl bg-[#121824] border border-slate-800">
          <span className="text-xs text-slate-400 block mb-1">Estimasi Penghematan Losses</span>
          <div className="text-2xl font-extrabold font-mono text-emerald-400 tabular-nums">Rp 184 Juta</div>
          <span className="text-[11px] text-slate-400 font-mono mt-1 block">Dari pencegahan over-evaporation</span>
        </div>

        <div className="p-5 rounded-2xl bg-[#121824] border border-slate-800">
          <span className="text-xs text-slate-400 block mb-1">Versi Model ML</span>
          <div className="text-2xl font-extrabold font-mono text-white tabular-nums">v4.2-ATG</div>
          <span className="text-[11px] text-slate-400 font-mono mt-1 block">Update Terakhir: 2 jam lalu</span>
        </div>
      </div>

      {/* Risk Assessment Matrix */}
      <div className="bg-[#121824] rounded-2xl border border-slate-800 p-6 space-y-4 shadow-xl">
        <div className="flex items-center justify-between border-b border-slate-800/80 pb-3">
          <div>
            <h3 className="text-base font-bold text-white tracking-tight">
              Matriks Penilaian Risiko Prediktif Tangki (30 Hari ke Depan)
            </h3>
            <p className="text-xs text-slate-400">
              Perkiraan probabilitas kegagalan komponen, laju rembesan, dan deviasi uap.
            </p>
          </div>
        </div>

        <div className="space-y-3">
          {tanks.map((t) => {
            const risk = t.lossAnalysis.riskScore;
            const isHigh = risk >= 70;
            const isMed = risk >= 40 && risk < 70;

            return (
              <div
                key={t.id}
                className="p-4 rounded-xl bg-[#0E1524] border border-slate-800 flex flex-col md:flex-row md:items-center justify-between gap-4 text-xs"
              >
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-white text-sm">{t.tankNumber} - {t.name}</span>
                    <span className={`text-[10px] font-mono px-2 py-0.5 rounded font-bold ${
                      isHigh ? 'bg-red-950 text-red-400 border border-red-800' : isMed ? 'bg-amber-950 text-amber-400 border border-amber-800' : 'bg-emerald-950 text-emerald-400 border border-emerald-800'
                    }`}>
                      Skor Risiko: {risk}/100
                    </span>
                  </div>
                  <p className="text-slate-300 max-w-2xl leading-relaxed">
                    Prediksi: <strong className="text-white">{t.lossAnalysis.aiDiagnosis}</strong>
                  </p>
                </div>

                <div className="flex items-center gap-3 shrink-0">
                  <button
                    onClick={() => onNavigate(`/devices/${t.id}`)}
                    className="px-3 py-1.5 bg-slate-800 hover:bg-[#ED1C24] text-white rounded-lg text-xs font-semibold transition-colors flex items-center gap-1.5"
                  >
                    <Wrench className="w-3.5 h-3.5" />
                    <span>Rencana Perawatan</span>
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
