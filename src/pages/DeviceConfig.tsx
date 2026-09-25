import React, { useState } from 'react';
import { TankDevice } from '../types';
import { ArrowLeft, Save, RefreshCw, Sliders, CheckCircle2, ShieldAlert, Layers } from 'lucide-react';

interface DeviceConfigProps {
  tank: TankDevice;
  onBack: () => void;
}

export const DeviceConfig: React.FC<DeviceConfigProps> = ({ tank, onBack }) => {
  const [tankName, setTankName] = useState(tank.name);
  const [sampleInterval, setSampleInterval] = useState('5');
  const [waterThreshold, setWaterThreshold] = useState('25');
  const [highTempThreshold, setHighTempThreshold] = useState('35');
  const [csldEnabled, setCsldEnabled] = useState(true);
  const [savedSuccess, setSavedSuccess] = useState(false);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    setSavedSuccess(true);
    setTimeout(() => setSavedSuccess(false), 4000);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-[#121824] rounded-2xl border border-slate-800 p-5 flex items-center justify-between shadow-xl">
        <div className="flex items-center gap-3">
          <button
            onClick={onBack}
            className="p-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
          </button>
          <div>
            <h2 className="text-xl font-extrabold text-white tracking-tight">
              Konfigurasi Parameter ATG - {tank.tankNumber}
            </h2>
            <p className="text-xs text-slate-400">
              Pengaturan probe magnetostriktif, ambang batas alarm penyusutan, dan kalibrasi metrologi legal.
            </p>
          </div>
        </div>
      </div>

      {savedSuccess && (
        <div className="p-4 bg-emerald-950/70 border border-emerald-800 rounded-xl text-xs text-emerald-300 flex items-center gap-2">
          <CheckCircle2 className="w-4 h-4 text-emerald-400" />
          <span>Konfigurasi parameter ATG dan batas ambang alarm berhasil diperbarui dan disinkronkan ke gateway probe.</span>
        </div>
      )}

      {/* Form */}
      <form onSubmit={handleSave} className="space-y-6">
        {/* Section 1: General Settings */}
        <div className="bg-[#121824] rounded-2xl border border-slate-800 p-6 space-y-4 shadow-xl">
          <h3 className="text-sm font-bold text-white uppercase tracking-wider">
            1. Pengaturan Identitas Tangki
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
            <div className="space-y-1">
              <label className="text-slate-300 font-semibold">Nama / Label Tangki</label>
              <input
                type="text"
                value={tankName}
                onChange={(e) => setTankName(e.target.value)}
                className="w-full bg-[#0B0F17] border border-slate-800 rounded-xl px-3.5 py-2.5 text-white focus:outline-none focus:border-[#ED1C24]"
              />
            </div>

            <div className="space-y-1">
              <label className="text-slate-300 font-semibold">Tipe Produk BBM</label>
              <input
                type="text"
                disabled
                value={tank.fuelType}
                className="w-full bg-[#070A10] border border-slate-800/60 rounded-xl px-3.5 py-2.5 text-slate-400 cursor-not-allowed"
              />
            </div>

            <div className="space-y-1">
              <label className="text-slate-300 font-semibold">Fasilitas Penempatan</label>
              <input
                type="text"
                disabled
                value={tank.facilityName}
                className="w-full bg-[#070A10] border border-slate-800/60 rounded-xl px-3.5 py-2.5 text-slate-400 cursor-not-allowed"
              />
            </div>

            <div className="space-y-1">
              <label className="text-slate-300 font-semibold">Kapasitas Nominal Desain</label>
              <input
                type="text"
                disabled
                value={`${tank.metrics.capacityLiters.toLocaleString()} Liter`}
                className="w-full bg-[#070A10] border border-slate-800/60 rounded-xl px-3.5 py-2.5 text-slate-400 cursor-not-allowed font-mono"
              />
            </div>
          </div>
        </div>

        {/* Section 2: Telemetry Sampling & Sensor Diagnostics */}
        <div className="bg-[#121824] rounded-2xl border border-slate-800 p-6 space-y-4 shadow-xl">
          <h3 className="text-sm font-bold text-white uppercase tracking-wider">
            2. Parameter Sampling & Diagnostik ATG
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
            <div className="space-y-1">
              <label className="text-slate-300 font-semibold">Interval Pengambilan Data (Detik)</label>
              <select
                value={sampleInterval}
                onChange={(e) => setSampleInterval(e.target.value)}
                className="w-full bg-[#0B0F17] border border-slate-800 rounded-xl px-3.5 py-2.5 text-white focus:outline-none focus:border-[#ED1C24]"
              >
                <option value="1">1 Detik (High Frequency Streaming)</option>
                <option value="5">5 Detik (Rekomendasi Operasional)</option>
                <option value="15">15 Detik</option>
                <option value="60">60 Detik</option>
              </select>
            </div>

            <div className="space-y-1">
              <label className="text-slate-300 font-semibold">Ambang Air Dasar (Water Cut Alert)</label>
              <div className="flex items-center gap-2">
                <input
                  type="number"
                  value={waterThreshold}
                  onChange={(e) => setWaterThreshold(e.target.value)}
                  className="w-full bg-[#0B0F17] border border-slate-800 rounded-xl px-3.5 py-2.5 text-white focus:outline-none focus:border-[#ED1C24] font-mono"
                />
                <span className="text-slate-400 font-mono">mm</span>
              </div>
            </div>

            <div className="space-y-1">
              <label className="text-slate-300 font-semibold">Batas Suhu Maksimum Ruang Uap</label>
              <div className="flex items-center gap-2">
                <input
                  type="number"
                  value={highTempThreshold}
                  onChange={(e) => setHighTempThreshold(e.target.value)}
                  className="w-full bg-[#0B0F17] border border-slate-800 rounded-xl px-3.5 py-2.5 text-white focus:outline-none focus:border-[#ED1C24] font-mono"
                />
                <span className="text-slate-400 font-mono">°C</span>
              </div>
            </div>
          </div>

          <div className="pt-3 border-t border-slate-800/80 flex items-center justify-between text-xs">
            <div>
              <span className="font-semibold text-white block">Continuous Statistical Leak Detection (CSLD)</span>
              <span className="text-slate-400 text-[11px]">
                Jalankan uji kebocoran otomatis saat tangki statis tanpa transaksi dispenser (01:00 - 04:00 WIB).
              </span>
            </div>
            <input
              type="checkbox"
              checked={csldEnabled}
              onChange={(e) => setCsldEnabled(e.target.checked)}
              className="w-4 h-4 accent-[#ED1C24] cursor-pointer"
            />
          </div>
        </div>

        {/* Section 3: Metrology Strapping Table */}
        <div className="bg-[#121824] rounded-2xl border border-slate-800 p-6 space-y-3 shadow-xl">
          <h3 className="text-sm font-bold text-white uppercase tracking-wider">
            3. Kalibrasi Tabel Ukur Tangki (Strapping Table Ditjen Metrologi)
          </h3>
          <p className="text-xs text-slate-400">
            Tabel konversi ketinggian probe (mm) ke volume aktual (Liter). Terakhir dikalibrasi: <strong>{tank.lastCalibrationDate}</strong>.
          </p>
          <div className="p-3 bg-[#0B0F17] rounded-xl border border-slate-800 text-xs font-mono text-slate-300 flex justify-between items-center">
            <span>Status Kalibrasi Metrologi: <strong className="text-emerald-400">TERVALIDASI (SKHP Berkelanjutan)</strong></span>
            <button type="button" className="px-3 py-1 bg-slate-800 hover:bg-slate-700 text-white rounded-lg">
              Unduh Tabel Strapping (.PDF)
            </button>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex justify-end gap-3">
          <button
            type="button"
            onClick={onBack}
            className="px-5 py-2.5 bg-slate-800 hover:bg-slate-700 text-white rounded-xl text-xs font-bold transition-colors"
          >
            Batal
          </button>
          <button
            type="submit"
            className="px-6 py-2.5 bg-[#ED1C24] hover:bg-red-700 text-white rounded-xl text-xs font-bold transition-all shadow-lg shadow-red-900/40 flex items-center gap-2"
          >
            <Save className="w-4 h-4" />
            <span>Simpan Perubahan</span>
          </button>
        </div>
      </form>
    </div>
  );
};
