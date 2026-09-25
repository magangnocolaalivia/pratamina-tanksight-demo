import React, { useState } from 'react';
import { TankDevice, FacilityGroup } from '../types';
import { ThreeTankTwin } from '../components/ThreeTankTwin';
import { LossesDiagnosticCenter } from '../components/LossesDiagnosticCenter';
import { 
  ArrowLeft, 
  Settings, 
  FileText, 
  Activity, 
  Building2, 
  Wifi, 
  ShieldCheck, 
  Thermometer, 
  Droplet, 
  Clock, 
  AlertTriangle, 
  CheckCircle2,
  Calendar,
  Layers,
  Sparkles,
  Download
} from 'lucide-react';

interface DeviceDetailProps {
  tank: TankDevice;
  facility?: FacilityGroup;
  onBack: () => void;
  onNavigate: (path: string) => void;
}

export const DeviceDetail: React.FC<DeviceDetailProps> = ({
  tank,
  facility,
  onBack,
  onNavigate
}) => {
  const [testResult, setTestResult] = useState<string | null>(null);
  const [eventFilter, setEventFilter] = useState<'ALL' | 'ALERT' | 'STATUS' | 'DELIVERY'>('ALL');

  const handleTestConnection = () => {
    setTestResult('Pengujian telemetri ATG TankSight berhasil: Latensi 24ms, Sinyal 98%, Kalibrasi OK.');
    setTimeout(() => setTestResult(null), 5000);
  };

  const filteredEvents = eventFilter === 'ALL'
    ? tank.recentEvents
    : tank.recentEvents.filter(e => e.type === eventFilter);

  const fillPercent = ((tank.metrics.grossVolumeLiters / tank.metrics.capacityLiters) * 100).toFixed(1);

  return (
    <div className="space-y-6">
      {/* Top Header Bar */}
      <div className="bg-[#121824] rounded-2xl border border-slate-800 p-5 flex flex-col md:flex-row md:items-center justify-between gap-4 shadow-xl">
        <div className="flex items-center gap-3">
          <button
            onClick={onBack}
            className="p-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white transition-colors"
            title="Kembali ke Daftar Tangki"
          >
            <ArrowLeft className="w-4 h-4" />
          </button>
          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-xl font-extrabold text-white tracking-tight">
                {tank.name}
              </h2>
              <span className="font-mono text-xs px-2.5 py-0.5 rounded bg-[#0B0F17] text-white border border-slate-800 font-bold">
                {tank.tankNumber}
              </span>
            </div>
            <p className="text-xs text-slate-400">
              {tank.facilityName} · {tank.fuelType} · {tank.category === 'bulk_terminal' ? 'Tangki Timbun Vertikal' : 'Tangki Pendam SPBU'}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={() => onNavigate(`/devices/${tank.id}/config`)}
            className="px-3.5 py-2 bg-slate-800 hover:bg-slate-700 text-white rounded-xl text-xs font-bold transition-colors flex items-center gap-1.5"
          >
            <Settings className="w-3.5 h-3.5 text-slate-400" />
            <span>Konfigurasi & Kalibrasi</span>
          </button>

          <button
            onClick={() => onNavigate(`/devices/${tank.id}/reports`)}
            className="px-3.5 py-2 bg-[#ED1C24] hover:bg-red-700 text-white rounded-xl text-xs font-bold transition-colors flex items-center gap-1.5 shadow-lg shadow-red-900/30"
          >
            <FileText className="w-3.5 h-3.5" />
            <span>Laporan Tangki</span>
          </button>
        </div>
      </div>

      {testResult && (
        <div className="p-3.5 bg-emerald-950/70 border border-emerald-800 rounded-xl text-xs text-emerald-300 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
            <span>{testResult}</span>
          </div>
          <button onClick={() => setTestResult(null)} className="text-slate-400 hover:text-white">✕</button>
        </div>
      )}

      {/* 3-Column Split View Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Column: Device Meta & Connectivity (3 Cols) */}
        <div className="lg:col-span-3 space-y-4">
          <div className="bg-[#121824] rounded-2xl border border-slate-800 p-5 space-y-4 shadow-xl">
            <span className="text-xs font-bold text-slate-400 uppercase tracking-wider block">
              Metadata Tangki & Sensor
            </span>

            <div className="space-y-3 text-xs">
              <div>
                <span className="text-slate-400 block text-[11px]">ID Perangkat ATG</span>
                <span className="font-mono text-white font-bold">{tank.id}</span>
              </div>

              <div>
                <span className="text-slate-400 block text-[11px]">Model Probe ATG</span>
                <span className="text-white font-medium">{tank.atgProbeModel}</span>
                <span className="text-[10px] text-slate-500 font-mono block">S/N: {tank.probeSerialNumber}</span>
              </div>

              <div>
                <span className="text-slate-400 block text-[11px]">Protokol Telemetri</span>
                <span className="font-mono text-emerald-400 font-medium">MQTT over TLS / Modbus RTU</span>
              </div>

              <div>
                <span className="text-slate-400 block text-[11px]">Status Kualitas Sinyal</span>
                <div className="flex items-center gap-2 mt-1">
                  <div className="flex gap-1">
                    <span className="w-1.5 h-3 bg-emerald-500 rounded-sm" />
                    <span className="w-1.5 h-3 bg-emerald-500 rounded-sm" />
                    <span className="w-1.5 h-3 bg-emerald-500 rounded-sm" />
                    <span className="w-1.5 h-3 bg-emerald-500 rounded-sm" />
                  </div>
                  <span className="font-mono text-slate-300 text-[11px]">98% (Sangat Baik)</span>
                </div>
              </div>

              <div className="pt-2 border-t border-slate-800/80">
                <span className="text-slate-400 block text-[11px]">Uptime Operasional</span>
                <span className="font-mono text-white font-bold text-sm">{tank.uptimePercent}%</span>
              </div>

              <div>
                <span className="text-slate-400 block text-[11px]">Kalibrasi Metrologi Legal</span>
                <span className="text-slate-300 font-mono text-[11px]">{tank.lastCalibrationDate} (Sah Ditjen PKTN)</span>
              </div>
            </div>

            {/* Quick Action Buttons */}
            <div className="pt-3 border-t border-slate-800/80 space-y-2">
              <button
                onClick={handleTestConnection}
                className="w-full py-2 px-3 bg-slate-800 hover:bg-slate-700 text-white rounded-xl text-xs font-semibold transition-colors flex items-center justify-center gap-1.5"
              >
                <Activity className="w-3.5 h-3.5 text-emerald-400" />
                <span>Uji Koneksi Telemetri</span>
              </button>

              <button
                onClick={() => onNavigate(`/devices/group/${tank.facilityId}`)}
                className="w-full py-2 px-3 bg-[#0B0F17] hover:bg-slate-800 text-slate-300 hover:text-white rounded-xl text-xs font-semibold transition-colors flex items-center justify-center gap-1.5 border border-slate-800"
              >
                <Building2 className="w-3.5 h-3.5 text-[#ED1C24]" />
                <span>Dashboard Fasilitas</span>
              </button>
            </div>
          </div>
        </div>

        {/* Center Column: 3D Visualization Hero (6 Cols) */}
        <div className="lg:col-span-6 space-y-4">
          <div className="bg-[#121824] rounded-2xl border border-slate-800 p-5 space-y-3 shadow-xl">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-base font-bold text-white tracking-tight">
                  Visualisasi 3D Interaktif & Potongan Dinding
                </h3>
                <p className="text-xs text-slate-400">
                  Gunakan kursor mouse untuk memutar, zoom, dan melihat potongan lapisan fluida serta termistor.
                </p>
              </div>
              <span className="text-xs font-mono text-emerald-400 font-bold px-2 py-0.5 rounded bg-emerald-950/60 border border-emerald-800">
                {fillPercent}% Terisi
              </span>
            </div>

            <ThreeTankTwin tank={tank} height="430px" />
          </div>
        </div>

        {/* Right Column: Real-Time Gauge Metrics (3 Cols) */}
        <div className="lg:col-span-3 space-y-3">
          <div className="bg-[#121824] rounded-2xl border border-slate-800 p-5 space-y-3 shadow-xl">
            <span className="text-xs font-bold text-slate-400 uppercase tracking-wider block">
              Indikator Metrologi ATG
            </span>

            {/* Metric 1: GOV */}
            <div className="p-3 rounded-xl bg-[#0B0F17] border border-slate-800">
              <span className="text-[11px] text-slate-400 block">Gross Observed (GOV)</span>
              <span className="font-mono text-lg font-bold text-white tabular-nums">
                {tank.metrics.grossVolumeLiters.toLocaleString()} <span className="text-xs text-slate-400">L</span>
              </span>
            </div>

            {/* Metric 2: GSV 15C */}
            <div className="p-3 rounded-xl bg-[#0B0F17] border border-slate-800">
              <span className="text-[11px] text-slate-400 block">Net Volume Standar 15°C (GSV)</span>
              <span className="font-mono text-lg font-bold text-emerald-400 tabular-nums">
                {tank.metrics.netStandardVolumeLiters.toLocaleString()} <span className="text-xs text-slate-400">L</span>
              </span>
            </div>

            {/* Metric 3: Level & Ullage */}
            <div className="p-3 rounded-xl bg-[#0B0F17] border border-slate-800 space-y-1">
              <div className="flex justify-between text-xs">
                <span className="text-slate-400">Tinggi Cairan:</span>
                <span className="font-mono font-bold text-white">{tank.metrics.productLevelMm.toLocaleString()} mm</span>
              </div>
              <div className="flex justify-between text-xs">
                <span className="text-slate-400">Ullage (Ruang Kosong):</span>
                <span className="font-mono text-slate-300">{tank.metrics.ullageLiters.toLocaleString()} L</span>
              </div>
            </div>

            {/* Metric 4: Water Bottom */}
            <div className={`p-3 rounded-xl border ${
              tank.metrics.waterLevelMm > 25 ? 'bg-red-950/40 border-red-800' : 'bg-[#0B0F17] border-slate-800'
            }`}>
              <div className="flex justify-between items-center text-xs">
                <span className="text-slate-400">Air Dasar (Water Cut):</span>
                <span className={`font-mono font-bold ${tank.metrics.waterLevelMm > 25 ? 'text-red-400' : 'text-sky-400'}`}>
                  {tank.metrics.waterLevelMm} mm
                </span>
              </div>
              <span className="text-[10px] text-slate-500 block mt-1">Batas Aman Pertamina: &lt; 25 mm</span>
            </div>

            {/* Metric 5: Temperature & Thermistors */}
            <div className="p-3 rounded-xl bg-[#0B0F17] border border-slate-800 space-y-2">
              <div className="flex justify-between items-center text-xs">
                <span className="text-slate-400">Suhu Rata-rata:</span>
                <span className="font-mono font-bold text-amber-400">{tank.metrics.avgTemperatureC}°C</span>
              </div>

              {/* 4-point Thermistor ladder */}
              <div className="space-y-1 pt-1 text-[11px] font-mono border-t border-slate-800/80">
                {tank.metrics.thermistors.map((t, idx) => (
                  <div key={idx} className="flex justify-between text-slate-400">
                    <span>Termistor {t.position}:</span>
                    <span className={t.temp > 35 ? 'text-red-400 font-bold' : 'text-slate-200'}>
                      {t.temp}°C
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Loss Diagnostic Center Component */}
      <LossesDiagnosticCenter tank={tank} />

      {/* 24-Hour Trend Chart (SVG) */}
      <div className="bg-[#121824] rounded-2xl border border-slate-800 p-6 space-y-4 shadow-xl">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-800/80 pb-4">
          <div>
            <h3 className="text-base font-bold text-white tracking-tight">
              Tren Historis 24 Jam (Volume, Suhu, Tekanan Uap Headspace)
            </h3>
            <p className="text-xs text-slate-400">
              Analisis fluktuasi level cairan seiring siklus suhu harian dan pelepasan uap breather valve.
            </p>
          </div>
          <div className="flex items-center gap-4 text-xs font-mono">
            <span className="flex items-center gap-1.5 text-emerald-400">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-400" />
              Volume (L)
            </span>
            <span className="flex items-center gap-1.5 text-amber-400">
              <span className="w-2.5 h-2.5 rounded-full bg-amber-400" />
              Suhu (°C)
            </span>
            <span className="flex items-center gap-1.5 text-sky-400">
              <span className="w-2.5 h-2.5 rounded-full bg-sky-400" />
              Tekanan (kPa)
            </span>
          </div>
        </div>

        {/* SVG Multi-Axis Chart */}
        <div className="h-64 w-full flex items-end pt-4 pb-2">
          <svg className="w-full h-full overflow-visible" viewBox="0 0 800 200">
            {/* Horizontal Gridlines */}
            <line x1="0" y1="40" x2="800" y2="40" stroke="#1E293B" strokeDasharray="3 3" />
            <line x1="0" y1="90" x2="800" y2="90" stroke="#1E293B" strokeDasharray="3 3" />
            <line x1="0" y1="140" x2="800" y2="140" stroke="#1E293B" strokeDasharray="3 3" />

            {/* Volume Path (Green) */}
            <path
              d="M 0 60 Q 150 55 300 75 T 600 90 T 800 95"
              fill="none"
              stroke="#10B981"
              strokeWidth="2.5"
            />

            {/* Temp Path (Amber) */}
            <path
              d="M 0 160 Q 200 150 400 60 T 600 70 T 800 140"
              fill="none"
              stroke="#F59E0B"
              strokeWidth="2"
            />

            {/* Pressure Path (Sky) */}
            <path
              d="M 0 140 Q 250 135 450 80 T 650 90 T 800 130"
              fill="none"
              stroke="#38BDF8"
              strokeWidth="1.5"
              strokeDasharray="4 2"
            />
          </svg>
        </div>

        <div className="flex justify-between text-[11px] text-slate-500 font-mono border-t border-slate-800/80 pt-2">
          {tank.trends24h.timestamps.map((t, idx) => (
            <span key={idx}>{t}</span>
          ))}
        </div>
      </div>

      {/* Chronological Event Log */}
      <div className="bg-[#121824] rounded-2xl border border-slate-800 p-6 space-y-4 shadow-xl">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-800/80 pb-4">
          <div className="flex items-center gap-2">
            <Clock className="w-4 h-4 text-[#ED1C24]" />
            <h3 className="text-base font-bold text-white tracking-tight">
              Log Kejadian & Telemetri Tangki
            </h3>
          </div>

          <div className="flex items-center gap-1.5 p-1 bg-[#0B0F17] rounded-xl border border-slate-800 text-xs">
            {(['ALL', 'ALERT', 'STATUS', 'DELIVERY'] as const).map(type => (
              <button
                key={type}
                onClick={() => setEventFilter(type)}
                className={`px-2.5 py-1 rounded-lg font-medium transition-colors ${
                  eventFilter === type ? 'bg-[#ED1C24] text-white shadow' : 'text-slate-400 hover:text-white'
                }`}
              >
                {type === 'ALL' ? 'Semua' : type}
              </button>
            ))}
          </div>
        </div>

        <div className="space-y-2">
          {filteredEvents.map(evt => (
            <div
              key={evt.id}
              className="p-3 rounded-xl bg-[#0E1524] border border-slate-800 flex items-start justify-between text-xs gap-3"
            >
              <div className="flex items-start gap-2.5">
                <span className={`w-2 h-2 rounded-full mt-1.5 ${
                  evt.severity === 'critical' ? 'bg-red-400' : evt.severity === 'warning' ? 'bg-amber-400' : 'bg-emerald-400'
                }`} />
                <div>
                  <span className="font-semibold text-white">{evt.message}</span>
                  <div className="text-[10px] text-slate-500 font-mono mt-0.5">
                    Tipe: {evt.type} · Severity: {evt.severity.toUpperCase()}
                  </div>
                </div>
              </div>
              <span className="font-mono text-slate-400 shrink-0 text-[11px]">{evt.timestamp}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
