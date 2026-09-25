import React, { useState } from 'react';
import { ParodyLogo, ParodyBrandName } from '../components/ParodyLogo';
import { 
  ShieldCheck, 
  Sparkles, 
  Copy, 
  Check, 
  Download, 
  Layers, 
  ArrowRight, 
  FileText, 
  Building2, 
  CheckCircle2, 
  AlertTriangle, 
  TrendingDown, 
  Flame, 
  Droplet, 
  Truck, 
  Radio, 
  Eye, 
  RefreshCw,
  ExternalLink,
  ChevronRight
} from 'lucide-react';

interface ProposalLandingPageProps {
  onNavigateToDashboard: () => void;
}

export const ProposalLandingPage: React.FC<ProposalLandingPageProps> = ({ onNavigateToDashboard }) => {
  const [selectedBrand, setSelectedBrand] = useState<ParodyBrandName>('PRATAMINA PATRA NIAGA');
  const [logoTheme, setLogoTheme] = useState<'dark' | 'light'>('dark');
  const [logoSize, setLogoSize] = useState<'sm' | 'md' | 'lg' | 'xl'>('xl');
  const [copied, setCopied] = useState(false);
  const [proposalSubmitted, setProposalSubmitted] = useState(false);

  const parodyOptions: ParodyBrandName[] = [
    'PRATAMINA PATRA NIAGA',
    'PERMATINA PATRA NIAGA',
    'PERTAMANI PATRA NIAGA',
    'PERTAMINI PATRA NIAGA',
    'PRATAMINA MITRA NIAGA'
  ];

  const handleCopySvg = () => {
    const svgCode = `<!-- Logo Parodi Legal untuk Proposal Demo: ${selectedBrand} -->
<svg width="240" height="96" viewBox="0 0 400 160" fill="none" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="pBlue" x1="0" y1="40" x2="80" y2="140" gradientUnits="userSpaceOnUse">
      <stop stop-color="#2557B4"/>
      <stop offset="1" stop-color="#1B428C"/>
    </linearGradient>
    <linearGradient id="pRed" x1="60" y1="0" x2="160" y2="60" gradientUnits="userSpaceOnUse">
      <stop stop-color="#F5222D"/>
      <stop offset="1" stop-color="#D3141F"/>
    </linearGradient>
    <linearGradient id="pGreen" x1="70" y1="70" x2="160" y2="130" gradientUnits="userSpaceOnUse">
      <stop stop-color="#96C926"/>
      <stop offset="1" stop-color="#7DAE1B"/>
    </linearGradient>
  </defs>
  <!-- Ikon Parodi: 3 elemen geometris dengan potongan khusus -->
  <path d="M48 20 C54 20 60 25 60 32 L36 122 C34 130 26 136 18 136 C10 136 4 130 6 122 L30 32 C32 25 40 20 48 20 Z" fill="url(#pBlue)"/>
  <path d="M74 4 C80 4 86 8 91 14 L142 56 C147 61 145 69 138 71 L92 73 C84 73 78 68 76 60 L68 20 C66 11 70 4 74 4 Z" fill="url(#pRed)"/>
  <path d="M86 85 C92 85 99 89 103 94 L138 126 C144 131 141 138 133 138 L92 138 C83 138 76 132 73 124 L68 96 C67 89 74 85 86 85 Z" fill="url(#pGreen)"/>
  <circle cx="68" cy="78" r="4.5" fill="#FFFFFF" opacity="0.9"/>
  <text x="175" y="80" fill="#FFFFFF" font-family="'Plus Jakarta Sans', Arial, sans-serif" font-weight="900" font-size="52" font-style="italic">${selectedBrand.split(' ')[0]}</text>
  <text x="175" y="118" fill="#ED1C24" font-family="'Plus Jakarta Sans', Arial, sans-serif" font-weight="700" font-size="20" letter-spacing="5">${selectedBrand.split(' ').slice(1).join(' ')}</text>
</svg>`;

    navigator.clipboard.writeText(svgCode);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  return (
    <div className="space-y-10 pb-16 selection:bg-[#ED1C24] selection:text-white">
      {/* SECTION 1: LOGO PARODY STUDIO & SPECIFICATION */}
      <div className="bg-[#121824] rounded-3xl border border-slate-800 p-6 md:p-8 space-y-6 shadow-2xl">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-800/80 pb-5">
          <div>
            <div className="flex items-center gap-2 mb-1.5">
              <span className="w-2.5 h-2.5 rounded-full bg-[#ED1C24] animate-pulse" />
              <span className="text-xs font-bold text-[#ED1C24] uppercase tracking-wider">
                Asset Branding Proposal Demo (Legally Distinct)
              </span>
            </div>
            <h1 className="text-xl md:text-3xl font-extrabold text-white tracking-tight">
              Logo Plesetan Resmi Proposal: <span className="text-[#ED1C24]">{selectedBrand}</span>
            </h1>
            <p className="text-xs md:text-sm text-slate-400 mt-1 max-w-3xl">
              Dibuat khusus untuk presentasi proposal demo landing page. Berbeda secara legal (non-infringing) dengan modifikasi nama anagram/plesetan dan geometri kurva modern, sembari tetap menjaga identitas warna khas (Merah, Hijau, Biru) dan gaya tipografi korporat.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handleCopySvg}
              className="px-3.5 py-2 bg-slate-800 hover:bg-slate-700 text-white rounded-xl text-xs font-bold transition-colors flex items-center gap-2"
            >
              {copied ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4 text-slate-400" />}
              <span>{copied ? 'Tersalin!' : 'Salin Kode SVG'}</span>
            </button>
          </div>
        </div>

        {/* Interactive Customizer Bar */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 bg-[#0B0F17] p-4 rounded-2xl border border-slate-800 text-xs">
          {/* Option 1: Pilihan Nama Plesetan */}
          <div className="space-y-1.5">
            <label className="text-slate-400 font-semibold block">Pilih Variasi Nama Plesetan:</label>
            <select
              value={selectedBrand}
              onChange={(e) => setSelectedBrand(e.target.value as ParodyBrandName)}
              className="w-full bg-[#121824] border border-slate-700 rounded-xl px-3 py-2 text-white font-medium focus:outline-none focus:border-[#ED1C24]"
            >
              {parodyOptions.map((opt) => (
                <option key={opt} value={opt}>
                  {opt}
                </option>
              ))}
            </select>
          </div>

          {/* Option 2: Ukuran Logo */}
          <div className="space-y-1.5">
            <label className="text-slate-400 font-semibold block">Ukuran Preview:</label>
            <div className="flex gap-1.5">
              {(['sm', 'md', 'lg', 'xl'] as const).map((s) => (
                <button
                  key={s}
                  onClick={() => setLogoSize(s)}
                  className={`flex-1 py-2 rounded-lg font-bold uppercase text-[11px] transition-colors ${
                    logoSize === s ? 'bg-[#ED1C24] text-white' : 'bg-[#121824] text-slate-400 hover:text-white'
                  }`}
                >
                  {s}
                </button>
              ))}
            </div>
          </div>

          {/* Option 3: Background Mockup Canvas */}
          <div className="space-y-1.5">
            <label className="text-slate-400 font-semibold block">Latar Belakang Canvas:</label>
            <div className="flex gap-2">
              <button
                onClick={() => setLogoTheme('dark')}
                className={`flex-1 py-2 rounded-lg font-semibold text-xs flex items-center justify-center gap-1.5 transition-colors ${
                  logoTheme === 'dark' ? 'bg-slate-700 text-white border border-slate-600' : 'bg-[#121824] text-slate-400 hover:text-white'
                }`}
              >
                <span className="w-2.5 h-2.5 rounded-full bg-[#0B0F17] border border-slate-500" />
                <span>Command Dark (#0B0F17)</span>
              </button>
              <button
                onClick={() => setLogoTheme('light')}
                className={`flex-1 py-2 rounded-lg font-semibold text-xs flex items-center justify-center gap-1.5 transition-colors ${
                  logoTheme === 'light' ? 'bg-white text-slate-900 border border-slate-300' : 'bg-[#121824] text-slate-400 hover:text-white'
                }`}
              >
                <span className="w-2.5 h-2.5 rounded-full bg-white border border-slate-300" />
                <span>Stationery White</span>
              </button>
            </div>
          </div>
        </div>

        {/* Live Logo Display Stage */}
        <div className={`w-full p-8 md:p-14 rounded-2xl flex items-center justify-center transition-all duration-300 border ${
          logoTheme === 'dark'
            ? 'bg-[#000000] border-slate-800'
            : 'bg-[#FFFFFF] border-slate-200'
        }`}>
          <ParodyLogo
            brandName={selectedBrand}
            theme={logoTheme}
            size={logoSize}
            variant="full"
          />
        </div>

        {/* Compliance & Design Difference Matrix */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-2">
          <div className="p-4 rounded-xl bg-[#0B0F17] border border-slate-800 space-y-1.5 text-xs">
            <span className="font-bold text-white flex items-center gap-1.5">
              <ShieldCheck className="w-4 h-4 text-emerald-400" />
              1. Modifikasi Nama (Safe Harbor)
            </span>
            <p className="text-slate-400 leading-relaxed">
              Mengubah "PERTAMINA" menjadi <strong className="text-white">"{selectedBrand.split(' ')[0]}"</strong> (anagram/parodi) sehingga tidak menggunakan nama merek dagang terdaftar secara langsung dalam materi presentasi publik.
            </p>
          </div>

          <div className="p-4 rounded-xl bg-[#0B0F17] border border-slate-800 space-y-1.5 text-xs">
            <span className="font-bold text-white flex items-center gap-1.5">
              <Layers className="w-4 h-4 text-sky-400" />
              2. Modifikasi Geometri Ikon
            </span>
            <p className="text-slate-400 leading-relaxed">
              Bentuk trapesium/jajaran genjang dimodifikasi dengan lengkungan aerodinamis baru, sudut kemiringan vertikal yang diperbarui, dan titik fokus IoT di persimpangan 3 segmen.
            </p>
          </div>

          <div className="p-4 rounded-xl bg-[#0B0F17] border border-slate-800 space-y-1.5 text-xs">
            <span className="font-bold text-white flex items-center gap-1.5">
              <Sparkles className="w-4 h-4 text-amber-400" />
              3. Harmoni Warna & Tipografi
            </span>
            <p className="text-slate-400 leading-relaxed">
              Mempertahankan komposisi warna legendaris: <span className="text-[#1B428C] font-mono font-bold">Biru Royal</span>, <span className="text-[#ED1C24] font-mono font-bold">Merah Sinyal</span>, dan <span className="text-[#8BB928] font-mono font-bold">Hijau Lime</span> dengan tipografi miring tegas.
            </p>
          </div>
        </div>
      </div>

      {/* SECTION 2: MOCKUP PROPOSAL LANDING PAGE PROFESIONAL */}
      <div className="bg-[#0E1524] rounded-3xl border border-slate-800 overflow-hidden shadow-2xl">
        {/* Proposal Document Header */}
        <div className="bg-[#0A0E17] border-b border-slate-800 px-6 py-4 flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <ParodyLogo brandName={selectedBrand} size="sm" theme="dark" />
            <div className="h-6 w-px bg-slate-800 hidden sm:block" />
            <div className="text-xs">
              <span className="text-slate-400 block text-[10px] uppercase font-mono">Dokumen Proposal Resmi</span>
              <span className="font-bold text-white">DOC/PRATAMINA/ATG-LOSS-CONTROL/2026/V1</span>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-[10px] font-mono px-2.5 py-1 rounded bg-emerald-950/70 border border-emerald-800 text-emerald-300 font-bold">
              STATUS: PROPOSAL SIAP REVIEW
            </span>
          </div>
        </div>

        {/* Hero Section of the Proposal */}
        <div className="p-8 md:p-12 space-y-8 max-w-5xl mx-auto">
          {/* Hero Branding */}
          <div className="space-y-4">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-red-950/60 border border-red-900/80 text-xs font-semibold text-red-300">
              <Flame className="w-3.5 h-3.5 text-[#ED1C24]" />
              <span>Inisiatif Efisiensi & Pengendalian Kerugian Energi Nasional</span>
            </div>

            <h2 className="text-2xl md:text-4xl font-extrabold text-white tracking-tight leading-tight">
              Proposal Implementasi Sistem Pemantauan Tangki Otomatis (Automatic Tank Gauging / ATG) & Loss Control AIoT
            </h2>

            <p className="text-sm md:text-base text-slate-300 leading-relaxed max-w-3xl">
              Disiapkan khusus untuk Direksi dan Manajemen Operasional <strong>PT {selectedBrand}</strong> guna menuntaskan susut (losses) BBM secara komprehensif dari Terminal BBM hingga ke tangki pendam SPBU menggunakan teknologi <strong>TankSight AIoT</strong>.
            </p>
          </div>

          {/* Quick Target & Scope Banner */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2">
            <div className="p-4 rounded-2xl bg-[#121824] border border-slate-800">
              <span className="text-xs text-slate-400 block">Klien Sasaran</span>
              <strong className="text-white text-sm block mt-1">PT {selectedBrand}</strong>
              <span className="text-[11px] text-slate-500">Commercial & Trading Hub</span>
            </div>

            <div className="p-4 rounded-2xl bg-[#121824] border border-slate-800">
              <span className="text-xs text-slate-400 block">Solusi Teknologi</span>
              <strong className="text-white text-sm block mt-1">TankSight ATG Platform v4.2</strong>
              <span className="text-[11px] text-emerald-400 font-mono">Toleransi Metrologi ±0.1mm</span>
            </div>

            <div className="p-4 rounded-2xl bg-[#121824] border border-slate-800">
              <span className="text-xs text-slate-400 block">Target Penurunan Losses</span>
              <strong className="text-emerald-400 text-sm block mt-1">Hingga -65% Susut Tercegah</strong>
              <span className="text-[11px] text-slate-400">Potensi Hemat Rp 18+ Milyar/Tahun</span>
            </div>
          </div>

          {/* Core Pain Points & Solutions Accordion / Bento */}
          <div className="space-y-4 pt-4">
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">
                Diagnosis Permasalahan & Solusi Tanggap
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {/* Pillar 1 */}
              <div className="p-5 rounded-2xl bg-[#121824] border border-slate-800 space-y-3 flex flex-col justify-between">
                <div>
                  <div className="w-9 h-9 rounded-xl bg-orange-950/70 border border-orange-900/80 flex items-center justify-center text-orange-400 mb-3">
                    <Flame className="w-5 h-5" />
                  </div>
                  <h4 className="text-sm font-bold text-white">1. Penguapan Alami & Fluktuasi Suhu</h4>
                  <p className="text-xs text-slate-400 leading-relaxed mt-1.5">
                    <strong>Tantangan:</strong> Suhu panas siang hari (&gt;35°C) menyebabkan ekspansi termal dan pelepasan uap breather valve yang sering disalahartikan sebagai rembesan.
                  </p>
                </div>
                <div className="pt-3 border-t border-slate-800 text-[11px] text-emerald-400 font-medium">
                  ✓ Solusi: Koreksi otomatis suhu standar 15°C (ASTM D1250 VCF) + Multi-point thermistor probe.
                </div>
              </div>

              {/* Pillar 2 */}
              <div className="p-5 rounded-2xl bg-[#121824] border border-slate-800 space-y-3 flex flex-col justify-between">
                <div>
                  <div className="w-9 h-9 rounded-xl bg-sky-950/70 border border-sky-900/80 flex items-center justify-center text-sky-400 mb-3">
                    <Droplet className="w-5 h-5" />
                  </div>
                  <h4 className="text-sm font-bold text-white">2. Kebocoran Fisik & Air Dasar</h4>
                  <p className="text-xs text-slate-400 leading-relaxed mt-1.5">
                    <strong>Tantangan:</strong> Retakan mikro dinding tangki dan infiltrasi air tanah (water incursion &gt;25mm) merusak kualitas BBM dan mencemari lingkungan.
                  </p>
                </div>
                <div className="pt-3 border-t border-slate-800 text-[11px] text-emerald-400 font-medium">
                  ✓ Solusi: Uji statis CSLD (01:00-04:00 WIB) + sensor pelampung air dasar dengan peringatan instan.
                </div>
              </div>

              {/* Pillar 3 */}
              <div className="p-5 rounded-2xl bg-[#121824] border border-slate-800 space-y-3 flex flex-col justify-between">
                <div>
                  <div className="w-9 h-9 rounded-xl bg-red-950/70 border border-red-900/80 flex items-center justify-center text-red-400 mb-3">
                    <Truck className="w-5 h-5" />
                  </div>
                  <h4 className="text-sm font-bold text-white">3. Fraud & Selisih Bongkar Muat</h4>
                  <p className="text-xs text-slate-400 leading-relaxed mt-1.5">
                    <strong>Tantangan:</strong> Selisih antara surat pengantar (SPP) Mobil Tangki dengan penerimaan SPBU ("tiba kurang") akibat kencing di jalan atau manipulasi segel.
                  </p>
                </div>
                <div className="pt-3 border-t border-slate-800 text-[11px] text-emerald-400 font-medium">
                  ✓ Solusi: Validasi E-Seal GPS Geofence + Rekonsiliasi instan ATG level receiving (BAP otomatis).
                </div>
              </div>
            </div>
          </div>

          {/* Implementation Roadmap */}
          <div className="p-6 rounded-2xl bg-[#121824] border border-slate-800 space-y-4">
            <h4 className="text-sm font-bold text-white uppercase tracking-wider">
              Tahapan Implementasi Proof-of-Concept (PoC 30 Hari)
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-4 gap-3 text-xs">
              <div className="p-3.5 rounded-xl bg-[#0B0F17] border border-slate-800 space-y-1">
                <span className="font-mono text-emerald-400 font-bold block">Minggu 1</span>
                <strong className="text-white block">Survei & Retrofit Probe</strong>
                <p className="text-slate-400 text-[11px]">Pemasangan probe magnetostriktif TankSight tanpa menghentikan operasi tangki.</p>
              </div>
              <div className="p-3.5 rounded-xl bg-[#0B0F17] border border-slate-800 space-y-1">
                <span className="font-mono text-emerald-400 font-bold block">Minggu 2</span>
                <strong className="text-white block">Integrasi Gateway & Cloud</strong>
                <p className="text-slate-400 text-[11px]">Sinkronisasi telemetri MQTT TLS 1.3 ke Command Center terpusat.</p>
              </div>
              <div className="p-3.5 rounded-xl bg-[#0B0F17] border border-slate-800 space-y-1">
                <span className="font-mono text-emerald-400 font-bold block">Minggu 3</span>
                <strong className="text-white block">Kalibrasi ASTM & CSLD</strong>
                <p className="text-slate-400 text-[11px]">Pencocokan tabel ukur strapping table metrologi legal Ditjen PKTN.</p>
              </div>
              <div className="p-3.5 rounded-xl bg-[#0B0F17] border border-slate-800 space-y-1">
                <span className="font-mono text-emerald-400 font-bold block">Minggu 4</span>
                <strong className="text-white block">Audit Hasil & Go-Live</strong>
                <p className="text-slate-400 text-[11px]">Evaluasi penurunan susut dan penyerahan dashboard command center.</p>
              </div>
            </div>
          </div>

          {/* Proposal Action Footer */}
          <div className="p-6 rounded-2xl bg-gradient-to-r from-[#ED1C24]/20 via-[#121824] to-[#00A651]/20 border border-slate-700 flex flex-col md:flex-row items-center justify-between gap-4">
            <div>
              <h4 className="text-base font-bold text-white">
                Uji Coba Live Interactive Command Center Sekarang
              </h4>
              <p className="text-xs text-slate-300 mt-0.5">
                Lihat langsung Digital Twin 3D tangki, simulator susut suhu ASTM D1250, dan pelacakan armada mobil tangki.
              </p>
            </div>

            <div className="flex items-center gap-3 shrink-0">
              <button
                onClick={onNavigateToDashboard}
                className="px-6 py-3 bg-[#ED1C24] hover:bg-red-700 text-white rounded-xl text-xs font-bold transition-all shadow-xl shadow-red-900/50 flex items-center gap-2"
              >
                <span>Buka Live Command Center Demo</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
