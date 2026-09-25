import React, { useState } from 'react';
import { UserRole } from '../types';
import { MOCK_USERS } from '../data/mockData';
import { User, Shield, Bell, Key, Info, CheckCircle2, Building, Radio } from 'lucide-react';

interface AccountSettingsProps {
  currentUser: UserRole;
  onSwitchUser: (user: UserRole) => void;
}

export const AccountSettings: React.FC<AccountSettingsProps> = ({ currentUser, onSwitchUser }) => {
  const [activeTab, setActiveTab] = useState<'profile' | 'notifications' | 'api' | 'about'>('profile');
  const [savedSuccess, setSavedSuccess] = useState(false);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    setSavedSuccess(true);
    setTimeout(() => setSavedSuccess(false), 3000);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-[#121824] rounded-2xl border border-slate-800 p-6 shadow-xl">
        <h2 className="text-xl md:text-2xl font-extrabold text-white tracking-tight">
          Pengaturan Akun & Konfigurasi Sistem ATG
        </h2>
        <p className="text-xs text-slate-400 mt-1">
          Kelola profil operator shift, matriks notifikasi darurat HSSE, dan endpoint telemetri protokol.
        </p>

        {/* Tabs */}
        <div className="flex items-center gap-2 mt-5 border-b border-slate-800/80 pb-1 text-xs">
          <button
            onClick={() => setActiveTab('profile')}
            className={`px-3.5 py-2 rounded-lg font-bold transition-colors ${
              activeTab === 'profile' ? 'bg-[#ED1C24] text-white shadow' : 'text-slate-400 hover:text-white'
            }`}
          >
            Profil Pengguna & Peran
          </button>
          <button
            onClick={() => setActiveTab('notifications')}
            className={`px-3.5 py-2 rounded-lg font-bold transition-colors ${
              activeTab === 'notifications' ? 'bg-[#ED1C24] text-white shadow' : 'text-slate-400 hover:text-white'
            }`}
          >
            Matriks Notifikasi HSSE
          </button>
          <button
            onClick={() => setActiveTab('api')}
            className={`px-3.5 py-2 rounded-lg font-bold transition-colors ${
              activeTab === 'api' ? 'bg-[#ED1C24] text-white shadow' : 'text-slate-400 hover:text-white'
            }`}
          >
            Protokol ATG & Integrasi
          </button>
          <button
            onClick={() => setActiveTab('about')}
            className={`px-3.5 py-2 rounded-lg font-bold transition-colors ${
              activeTab === 'about' ? 'bg-[#ED1C24] text-white shadow' : 'text-slate-400 hover:text-white'
            }`}
          >
            Tentang Sistem TankSight
          </button>
        </div>
      </div>

      {savedSuccess && (
        <div className="p-4 bg-emerald-950/70 border border-emerald-800 rounded-xl text-xs text-emerald-300 flex items-center gap-2">
          <CheckCircle2 className="w-4 h-4 text-emerald-400" />
          <span>Pengaturan preferensi berhasil disimpan.</span>
        </div>
      )}

      {/* Tab Content: Profile */}
      {activeTab === 'profile' && (
        <div className="bg-[#121824] rounded-2xl border border-slate-800 p-6 space-y-6 shadow-xl">
          <h3 className="text-sm font-bold text-white uppercase tracking-wider">
            Informasi Operator Shift Aktif
          </h3>

          <div className="flex items-center gap-4 p-4 rounded-xl bg-[#0B0F17] border border-slate-800">
            <div className="w-14 h-14 rounded-2xl bg-[#ED1C24] text-white font-extrabold flex items-center justify-center text-xl shadow-lg border border-white/20">
              {currentUser.name.slice(0, 2).toUpperCase()}
            </div>
            <div>
              <h4 className="text-base font-bold text-white">{currentUser.name}</h4>
              <p className="text-xs text-emerald-400 font-semibold">{currentUser.roleLabel}</p>
              <span className="text-[11px] text-slate-400 font-mono block mt-0.5">
                NIP: {currentUser.nip} · {currentUser.email}
              </span>
            </div>
          </div>

          <form onSubmit={handleSave} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
              <div className="space-y-1">
                <label className="text-slate-300 font-semibold">Nama Lengkap</label>
                <input
                  type="text"
                  defaultValue={currentUser.name}
                  className="w-full bg-[#0B0F17] border border-slate-800 rounded-xl px-3.5 py-2.5 text-white focus:outline-none focus:border-[#ED1C24]"
                />
              </div>

              <div className="space-y-1">
                <label className="text-slate-300 font-semibold">Email Perusahaan</label>
                <input
                  type="email"
                  defaultValue={currentUser.email}
                  className="w-full bg-[#0B0F17] border border-slate-800 rounded-xl px-3.5 py-2.5 text-white focus:outline-none focus:border-[#ED1C24]"
                />
              </div>

              <div className="space-y-1">
                <label className="text-slate-300 font-semibold">Penugasan Fasilitas / Wilayah</label>
                <input
                  type="text"
                  defaultValue={currentUser.assignedFacility}
                  className="w-full bg-[#0B0F17] border border-slate-800 rounded-xl px-3.5 py-2.5 text-white focus:outline-none focus:border-[#ED1C24]"
                />
              </div>

              <div className="space-y-1">
                <label className="text-slate-300 font-semibold">Tingkat Hak Akses</label>
                <input
                  type="text"
                  disabled
                  value={currentUser.roleLabel}
                  className="w-full bg-[#070A10] border border-slate-800/60 rounded-xl px-3.5 py-2.5 text-slate-400 cursor-not-allowed"
                />
              </div>
            </div>

            <div className="pt-2 flex justify-end">
              <button
                type="submit"
                className="px-5 py-2.5 bg-[#ED1C24] hover:bg-red-700 text-white rounded-xl text-xs font-bold transition-all shadow-lg shadow-red-900/40"
              >
                Simpan Profil
              </button>
            </div>
          </form>

          {/* Quick Role Switcher for Demo testing */}
          <div className="pt-6 border-t border-slate-800/80 space-y-3">
            <h4 className="text-xs font-bold text-slate-300 uppercase tracking-wider">
              Ganti Peran Operator Demo Cepat
            </h4>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3 text-xs">
              {Object.values(MOCK_USERS).map((user) => (
                <button
                  key={user.username}
                  onClick={() => onSwitchUser(user)}
                  className={`p-3 rounded-xl border text-left transition-colors ${
                    currentUser.username === user.username
                      ? 'bg-slate-800/90 border-[#ED1C24]'
                      : 'bg-[#0B0F17] border-slate-800 hover:border-slate-700'
                  }`}
                >
                  <div className="font-bold text-white mb-0.5">{user.name}</div>
                  <div className="text-[11px] text-slate-400">{user.roleLabel}</div>
                  <span className="text-[10px] font-mono text-emerald-400 font-semibold mt-1 block">
                    user: {user.username}
                  </span>
                </button>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Tab Content: Notifications */}
      {activeTab === 'notifications' && (
        <div className="bg-[#121824] rounded-2xl border border-slate-800 p-6 space-y-4 shadow-xl">
          <h3 className="text-sm font-bold text-white uppercase tracking-wider">
            Matriks Penyaluran Notifikasi Alarm Kerugian
          </h3>
          <p className="text-xs text-slate-400">
            Penyaluran instan melalui SMS Gateway, WhatsApp HSSE, dan Email Korporat saat terjadi anomali susut stok.
          </p>

          <div className="space-y-3 pt-2 text-xs">
            <div className="p-3.5 rounded-xl bg-[#0B0F17] border border-slate-800 flex items-center justify-between">
              <div>
                <span className="font-bold text-white block">Peringatan Kritis: Deteksi Kebocoran (CSLD Fail)</span>
                <span className="text-slate-400 text-[11px]">Kirim darurat ke Tim HSSE & Maintenance Region (WhatsApp + Alarm Sirene)</span>
              </div>
              <input type="checkbox" defaultChecked className="w-4 h-4 accent-[#ED1C24] cursor-pointer" />
            </div>

            <div className="p-3.5 rounded-xl bg-[#0B0F17] border border-slate-800 flex items-center justify-between">
              <div>
                <span className="font-bold text-white block">Peringatan Kritis: Discrepancy Bongkar Muat Mobil Tangki (&gt; 50L)</span>
                <span className="text-slate-400 text-[11px]">Kirim ke Station Head SPBU & Pengawas Penerimaan BBM</span>
              </div>
              <input type="checkbox" defaultChecked className="w-4 h-4 accent-[#ED1C24] cursor-pointer" />
            </div>

            <div className="p-3.5 rounded-xl bg-[#0B0F17] border border-slate-800 flex items-center justify-between">
              <div>
                <span className="font-bold text-white block">Peringatan Waspada: Overheat Suhu Ruang Uap (&gt; 35°C)</span>
                <span className="text-slate-400 text-[11px]">Pemberitahuan aktivasi spray pendingin atap tangki timbun</span>
              </div>
              <input type="checkbox" defaultChecked className="w-4 h-4 accent-[#ED1C24] cursor-pointer" />
            </div>
          </div>
        </div>
      )}

      {/* Tab Content: API & Protocols */}
      {activeTab === 'api' && (
        <div className="bg-[#121824] rounded-2xl border border-slate-800 p-6 space-y-4 shadow-xl">
          <h3 className="text-sm font-bold text-white uppercase tracking-wider">
            Protokol Telemetri ATG & Konektivitas SCADA
          </h3>
          <div className="space-y-3 text-xs font-mono">
            <div className="p-3 rounded-xl bg-[#0B0F17] border border-slate-800">
              <span className="text-slate-400 text-[11px] block">MQTT Broker Telemetri</span>
              <span className="text-emerald-400 font-bold">tls://atg-stream.patraniaga.pertamina.com:8883</span>
            </div>
            <div className="p-3 rounded-xl bg-[#0B0F17] border border-slate-800">
              <span className="text-slate-400 text-[11px] block">Modbus RTU Master Baudrate</span>
              <span className="text-white font-bold">9600 bps · 8 Data bits · 1 Stop bit · Parity None</span>
            </div>
            <div className="p-3 rounded-xl bg-[#0B0F17] border border-slate-800">
              <span className="text-slate-400 text-[11px] block">Standar VCF Metrologi</span>
              <span className="text-sky-400 font-bold">ASTM D1250 / API MPMS Chapter 11.1 (Standard 15°C)</span>
            </div>
          </div>
        </div>
      )}

      {/* Tab Content: About */}
      {activeTab === 'about' && (
        <div className="bg-[#121824] rounded-2xl border border-slate-800 p-6 space-y-4 shadow-xl text-xs text-slate-300 leading-relaxed">
          <h3 className="text-sm font-bold text-white uppercase tracking-wider">
            Tentang Platform TankSight AIoT
          </h3>
          <p>
            TankSight adalah sistem pemantauan tangki otomatis (Automatic Tank Gauging / ATG) berbasis Internet of Things industrial-grade. Platform ini dikembangkan untuk PT Pertamina Patra Niaga guna mengatasi tantangan penyusutan (losses) BBM sepanjang rantai pasok energi dari Fuel Terminal hingga ke dispenser SPBU.
          </p>
          <div className="p-4 bg-[#0B0F17] rounded-xl border border-slate-800 space-y-1 font-mono text-[11px]">
            <div>Versi Solusi: <strong>TankSight AIoT Enterprise v4.2</strong></div>
            <div>Implementor: <strong>PT Nocola IoT Solution</strong></div>
            <div>Klien: <strong>PT Pertamina Patra Niaga (Subholding Commercial & Trading)</strong></div>
            <div>Sertifikasi Metrologi: <strong>Sesuai Rekomendasi OIML R85 & Ditjen PKTN</strong></div>
          </div>
        </div>
      )}
    </div>
  );
};
