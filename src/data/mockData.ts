import { FacilityGroup, TankDevice, SupplyChainShipment, UserRole, TankAlert } from '../types';

export const MOCK_USERS: Record<string, UserRole> = {
  supervisor: {
    username: 'supervisor',
    name: 'Budi Santoso, S.T.',
    role: 'supervisor',
    roleLabel: 'Supervisor Pengendali Losses Pusat',
    assignedFacility: 'Head Office Pertamina Patra Niaga - Jakarta',
    avatarUrl: '',
    email: 'budi.santoso@pertamina.com',
    nip: 'P98412-PATRA'
  },
  admin_terminal: {
    username: 'admin_terminal',
    name: 'Rian Pratama',
    role: 'admin_terminal',
    roleLabel: 'Admin Operasional Fuel Terminal',
    assignedFacility: 'Integrated Terminal Jakarta - Plumpang',
    avatarUrl: '',
    email: 'rian.pratama@pertamina.com',
    nip: 'T77421-TBBM'
  },
  manager_spbu: {
    username: 'manager_spbu',
    name: 'Dewi Lestari',
    role: 'manager_spbu',
    roleLabel: 'Station Head Manager SPBU',
    assignedFacility: 'SPBU COCO 31.124.01 - TB Simatupang',
    avatarUrl: '',
    email: 'dewi.lestari@spbu.pertamina.com',
    nip: 'S44109-SPBU'
  }
};

export const MOCK_FACILITY_GROUPS: FacilityGroup[] = [
  {
    id: 'GRP-TBBM-01',
    name: 'Integrated Terminal Plumpang',
    code: 'TBBM-JKT-01',
    type: 'terminal_bbm',
    city: 'Jakarta Utara',
    region: 'Regional Jawa Bagian Barat (JBB)',
    coordinates: [-6.1284, 106.9015],
    tankCount: 18,
    totalCapacityLiters: 320000000,
    currentStockLiters: 264500000,
    onlineCount: 18,
    status: 'warning',
    avgLossPercent: 0.18, // slightly above 0.15% tolerance
    managerName: 'Hendra Gunawan',
    phone: '+62 21 4301288',
    address: 'Jl. Yos Sudarso No. 1, Plumpang, Koja, Jakarta Utara',
    lastUpdated: '1 menit yang lalu'
  },
  {
    id: 'GRP-TBBM-02',
    name: 'Fuel Terminal Surabaya Tanjung Perak',
    code: 'TBBM-SBY-02',
    type: 'terminal_bbm',
    city: 'Surabaya',
    region: 'Regional Jawa Bagian Timur (JBT)',
    coordinates: [-7.2036, 112.7291],
    tankCount: 14,
    totalCapacityLiters: 180000000,
    currentStockLiters: 152300000,
    onlineCount: 14,
    status: 'online',
    avgLossPercent: 0.09,
    managerName: 'Arif Wibowo',
    phone: '+62 31 3291244',
    address: 'Jl. Nilam Timur No. 12, Tanjung Perak, Surabaya',
    lastUpdated: '3 menit yang lalu'
  },
  {
    id: 'GRP-TBBM-03',
    name: 'Fuel Terminal Rewulu',
    code: 'TBBM-YOG-03',
    type: 'terminal_bbm',
    city: 'Bantul / Yogyakarta',
    region: 'Regional Jawa Bagian Tengah (JBTG)',
    coordinates: [-7.8189, 110.2858],
    tankCount: 10,
    totalCapacityLiters: 110000000,
    currentStockLiters: 94800000,
    onlineCount: 10,
    status: 'online',
    avgLossPercent: 0.11,
    managerName: 'Suryo Nugroho',
    phone: '+62 274 773120',
    address: 'Jl. Wates Km. 9.5, Argomulyo, Sedayu, Bantul, DIY',
    lastUpdated: '4 menit yang lalu'
  },
  {
    id: 'GRP-SPBU-01',
    name: 'SPBU COCO 31.124.01 - TB Simatupang',
    code: 'SPBU-JKT-12401',
    type: 'spbu',
    city: 'Jakarta Selatan',
    region: 'Sales Area Jabode',
    coordinates: [-6.2942, 106.8123],
    tankCount: 4,
    totalCapacityLiters: 120000,
    currentStockLiters: 89400,
    onlineCount: 4,
    status: 'warning',
    avgLossPercent: 0.62, // warning: tolerance 0.50%
    managerName: 'Dewi Lestari',
    phone: '+62 21 7884190',
    address: 'Jl. TB Simatupang No. 28, Cilandak, Jakarta Selatan',
    lastUpdated: '2 menit yang lalu'
  },
  {
    id: 'GRP-SPBU-02',
    name: 'SPBU Pasti Pas 34.128.02 - MT Haryono',
    code: 'SPBU-JKT-12802',
    type: 'spbu',
    city: 'Jakarta Selatan',
    region: 'Sales Area Jabode',
    coordinates: [-6.2435, 106.8584],
    tankCount: 5,
    totalCapacityLiters: 150000,
    currentStockLiters: 118200,
    onlineCount: 5,
    status: 'online',
    avgLossPercent: 0.31,
    managerName: 'Agus Setiawan',
    phone: '+62 21 8370921',
    address: 'Jl. MT Haryono Kav. 18, Tebet, Jakarta Selatan',
    lastUpdated: '1 menit yang lalu'
  },
  {
    id: 'GRP-SPBU-03',
    name: 'SPBU Green Energy Station 31.401.01 - Dago',
    code: 'SPBU-BDG-40101',
    type: 'spbu',
    city: 'Bandung',
    region: 'Sales Area Jawa Barat',
    coordinates: [-6.8856, 107.6139],
    tankCount: 4,
    totalCapacityLiters: 120000,
    currentStockLiters: 97500,
    onlineCount: 4,
    status: 'critical',
    avgLossPercent: 0.84, // critical loss flagged
    managerName: 'Fajar Nugraha',
    phone: '+62 22 2501982',
    address: 'Jl. Ir. H. Juanda (Dago) No. 120, Coblong, Bandung',
    lastUpdated: 'Just now'
  }
];

export const MOCK_TANKS: TankDevice[] = [
  {
    id: 'TNK-PLP-01',
    tankNumber: 'T-101',
    name: 'Tangki Timbun T-101 (Pertalite)',
    facilityId: 'GRP-TBBM-01',
    facilityName: 'Integrated Terminal Plumpang',
    facilityType: 'terminal_bbm',
    locationCity: 'Jakarta Utara',
    category: 'bulk_terminal',
    fuelType: 'Pertalite',
    status: 'warning',
    statusMessage: 'Penguapan Termal Tinggi (Vapor Loss Headspace)',
    atgProbeModel: 'TankSight Mag-X Ultra (Multi-Point Thermistor)',
    probeSerialNumber: 'TS-MAG-2026-9041',
    metrics: {
      grossVolumeLiters: 18450000,
      netStandardVolumeLiters: 18321000,
      capacityLiters: 25000000,
      productLevelMm: 12840,
      waterLevelMm: 8,
      safeFillLevelMm: 15500,
      ullageLiters: 6550000,
      avgTemperatureC: 34.8,
      densityKgM3: 735.4,
      headspacePressureKpa: 104.2,
      flowRateLpm: 0,
      lastDipTime: '1 menit yang lalu',
      thermistors: [
        { position: 'top', temp: 37.6, depthMm: 12000 },
        { position: 'upper_mid', temp: 35.8, depthMm: 9000 },
        { position: 'lower_mid', temp: 33.4, depthMm: 6000 },
        { position: 'bottom', temp: 32.2, depthMm: 1500 }
      ]
    },
    lossAnalysis: {
      dailyLossLiters: 38400,
      dailyLossPercent: 0.21,
      pertaminaTolerancePercent: 0.15,
      toleranceStatus: 'exceeds_tolerance',
      breakdown: {
        thermalShrinkageLiters: 22100,
        evaporationLiters: 14200,
        physicalLeakLiters: 0,
        unaccountedDiscrepancyLiters: 2100
      },
      primaryCause: 'evaporation',
      riskScore: 78,
      aiDiagnosis: 'Penyusutan dominan (94.5%) dipicu oleh radiasi panas matahari siang hari pada atap tangki timbun (headspace temp 37.6°C). Tekanan uap naik menjadi 104.2 kPa memicu pelepasan katup PV valve (Breather Valve). Tidak terdeteksi adanya kebocoran fisik dinding tangki (CSLD static pass).',
      recommendedAction: 'Aktifkan water sprinkler spray pendingin atap tangki untuk menurunkan suhu ruang uap (headspace) ke <32°C. Periksa kalibrasi pegas Breather Valve.'
    },
    trends24h: {
      timestamps: ['00:00', '02:00', '04:00', '06:00', '08:00', '10:00', '12:00', '14:00', '16:00', '18:00', '20:00', '22:00'],
      levelMm: [12870, 12868, 12866, 12865, 12860, 12852, 12844, 12838, 12835, 12837, 12839, 12840],
      tempC: [29.1, 28.6, 28.2, 28.5, 30.2, 33.1, 36.4, 37.6, 35.8, 32.7, 30.8, 29.9],
      grossVolume: [18495000, 18492000, 18489000, 18488000, 18480000, 18468000, 18456000, 18448000, 18443000, 18446000, 18449000, 18450000],
      netVolume15C: [18335000, 18334000, 18333000, 18332000, 18328000, 18324000, 18320000, 18318000, 18318000, 18319000, 18320000, 18321000],
      vaporPressure: [100.8, 100.5, 100.2, 100.4, 101.5, 103.2, 104.8, 105.1, 104.2, 102.6, 101.4, 101.0]
    },
    recentEvents: [
      { id: 'EVT-101', timestamp: '14:20:12', type: 'ALERT', severity: 'warning', message: 'Tekanan uap headspace mencapai 104.2 kPa, terdeteksi respirasi uap Breather Valve.' },
      { id: 'EVT-102', timestamp: '12:00:00', type: 'STATUS', severity: 'info', message: 'Suhu thermistor atas mencapai 36.4°C akibat paparan sinar matahari.' },
      { id: 'EVT-103', timestamp: '06:00:00', type: 'CALIBRATION', severity: 'info', message: 'Auto-zeroing ATG gauge sinkronisasi ASTM D1250 VCF selesai.' }
    ],
    activeAlerts: [
      {
        id: 'ALR-PLP-01',
        tankId: 'TNK-PLP-01',
        tankName: 'Tangki Timbun T-101',
        facilityName: 'Integrated Terminal Plumpang',
        severity: 'warning',
        type: 'temp_gradient',
        title: 'Thermal Vapor Loss & Headspace Overheat',
        description: 'Suhu ruang uap 37.6°C melampaui ambang batas 35.0°C. Volume susut uap diestimasi 14,200 L/hari.',
        timestamp: '14:20 WIB',
        acknowledged: false
      }
    ],
    lastCalibrationDate: '2026-08-12',
    uptimePercent: 99.98
  },
  {
    id: 'TNK-PLP-02',
    tankNumber: 'T-102',
    name: 'Tangki Timbun T-102 (Pertamax RON 92)',
    facilityId: 'GRP-TBBM-01',
    facilityName: 'Integrated Terminal Plumpang',
    facilityType: 'terminal_bbm',
    locationCity: 'Jakarta Utara',
    category: 'bulk_terminal',
    fuelType: 'Pertamax',
    status: 'normal',
    statusMessage: 'Nominal - Aliran Pengisian Pipa Penerimaan Kapal Tangker',
    atgProbeModel: 'TankSight Mag-X Ultra',
    probeSerialNumber: 'TS-MAG-2026-9042',
    metrics: {
      grossVolumeLiters: 22150000,
      netStandardVolumeLiters: 22010000,
      capacityLiters: 30000000,
      productLevelMm: 14200,
      waterLevelMm: 4,
      safeFillLevelMm: 18000,
      ullageLiters: 7850000,
      avgTemperatureC: 30.2,
      densityKgM3: 742.1,
      headspacePressureKpa: 101.5,
      flowRateLpm: 3400,
      lastDipTime: 'Just now',
      thermistors: [
        { position: 'top', temp: 31.5, depthMm: 13500 },
        { position: 'upper_mid', temp: 30.6, depthMm: 10000 },
        { position: 'lower_mid', temp: 29.8, depthMm: 6500 },
        { position: 'bottom', temp: 28.9, depthMm: 2000 }
      ]
    },
    lossAnalysis: {
      dailyLossLiters: 18200,
      dailyLossPercent: 0.08,
      pertaminaTolerancePercent: 0.15,
      toleranceStatus: 'within_tolerance',
      breakdown: {
        thermalShrinkageLiters: 12400,
        evaporationLiters: 4800,
        physicalLeakLiters: 0,
        unaccountedDiscrepancyLiters: 1000
      },
      primaryCause: 'normal',
      riskScore: 18,
      aiDiagnosis: 'Operasional normal. Fluktuasi volume berada di 0.08%, jauh di bawah batas toleransi Pertamina 0.15%. Sistem insulasi dan breather valve berfungsi optimal.',
      recommendedAction: 'Pertahankan jadwal pemantauan rutin ATG.'
    },
    trends24h: {
      timestamps: ['00:00', '02:00', '04:00', '06:00', '08:00', '10:00', '12:00', '14:00', '16:00', '18:00', '20:00', '22:00'],
      levelMm: [13800, 13850, 13900, 13950, 14000, 14050, 14100, 14150, 14180, 14200, 14200, 14200],
      tempC: [29.0, 28.8, 28.5, 28.7, 29.5, 30.2, 31.0, 31.5, 31.2, 30.8, 30.4, 30.2],
      grossVolume: [21500000, 21580000, 21660000, 21740000, 21820000, 21900000, 21980000, 22060000, 22120000, 22150000, 22150000, 22150000],
      netVolume15C: [21380000, 21460000, 21540000, 21620000, 21700000, 21770000, 21850000, 21920000, 21980000, 22010000, 22010000, 22010000],
      vaporPressure: [100.8, 100.8, 100.7, 100.9, 101.1, 101.4, 101.8, 102.0, 101.9, 101.7, 101.5, 101.5]
    },
    recentEvents: [
      { id: 'EVT-104', timestamp: '10:00:00', type: 'DELIVERY', severity: 'info', message: 'Menerima pasokan pipa dari tanker MT Gamkonora sebesar 650.000 L.' }
    ],
    activeAlerts: [],
    lastCalibrationDate: '2026-07-28',
    uptimePercent: 100
  },
  {
    id: 'TNK-SPBU-01-P92',
    tankNumber: 'TP-01',
    name: 'Tangki Pendam TP-01 (Pertamax RON 92)',
    facilityId: 'GRP-SPBU-01',
    facilityName: 'SPBU COCO 31.124.01 - TB Simatupang',
    facilityType: 'spbu',
    locationCity: 'Jakarta Selatan',
    category: 'underground_spbu',
    fuelType: 'Pertamax',
    status: 'warning',
    statusMessage: 'Indikasi Selisih Bongkar Muat (Delivery Discrepancy Flagged)',
    atgProbeModel: 'TankSight UST Magneto-Pro (Underground ATG)',
    probeSerialNumber: 'TS-UST-2026-4419',
    metrics: {
      grossVolumeLiters: 22450,
      netStandardVolumeLiters: 22210,
      capacityLiters: 30000,
      productLevelMm: 1720,
      waterLevelMm: 6,
      safeFillLevelMm: 2150,
      ullageLiters: 7550,
      avgTemperatureC: 29.8,
      densityKgM3: 741.8,
      headspacePressureKpa: 101.1,
      flowRateLpm: -38, // dispensing to nozzle island
      lastDipTime: 'Just now',
      thermistors: [
        { position: 'top', temp: 30.5, depthMm: 1700 },
        { position: 'upper_mid', temp: 30.0, depthMm: 1200 },
        { position: 'lower_mid', temp: 29.5, depthMm: 700 },
        { position: 'bottom', temp: 29.1, depthMm: 200 }
      ]
    },
    lossAnalysis: {
      dailyLossLiters: 195,
      dailyLossPercent: 0.65,
      pertaminaTolerancePercent: 0.50,
      toleranceStatus: 'exceeds_tolerance',
      breakdown: {
        thermalShrinkageLiters: 38,
        evaporationLiters: 12,
        physicalLeakLiters: 0,
        unaccountedDiscrepancyLiters: 145 // 145 L unexplained drop during bongkar muat
      },
      primaryCause: 'fraud_discrepancy',
      riskScore: 84,
      aiDiagnosis: 'Terdeteksi selisih volume signifikan (145 L) antara Surat Pengantar Pengiriman (SPP) Mobil Tangki B 9281 UFA (16.000 L) dengan kenaikan aktual ATG TankSight (15.855 L) saat bongkar muat pukul 11:30 WIB. Faktor suhu hanya menyumbang selisih 15 L. CSLD tidak menemukan kebocoran tangki pendam.',
      recommendedAction: 'Terbitkan Berita Acara Selisih Penerimaan (Tiba Kurang). Kunci bukti rekaman CCTV area un-loading dan periksa segel kompartemen Mobil Tangki.'
    },
    trends24h: {
      timestamps: ['00:00', '02:00', '04:00', '06:00', '08:00', '10:00', '11:30', '12:00', '14:00', '16:00', '18:00', '20:00'],
      levelMm: [1120, 1090, 1080, 1060, 950, 810, 1780, 1760, 1740, 1725, 1715, 1720],
      tempC: [29.1, 28.9, 28.8, 28.8, 29.2, 29.6, 31.4, 30.8, 30.4, 30.1, 29.9, 29.8],
      grossVolume: [14200, 13800, 13600, 13300, 11800, 9800, 23450, 23150, 22850, 22620, 22480, 22450],
      netVolume15C: [14040, 13650, 13450, 13150, 11670, 9690, 23180, 22890, 22600, 22380, 22240, 22210],
      vaporPressure: [100.9, 100.8, 100.8, 100.8, 101.0, 101.2, 102.1, 101.8, 101.5, 101.3, 101.2, 101.1]
    },
    recentEvents: [
      { id: 'EVT-105', timestamp: '11:45:00', type: 'ALERT', severity: 'critical', message: 'Tiba Kurang: Bongkar muat Mobil Tangki B 9281 UFA selisih -145 Liter terhadap DO/SPP.' },
      { id: 'EVT-106', timestamp: '11:15:00', type: 'DELIVERY', severity: 'info', message: 'Mulai proses bongkar muat Pertamax 16.000 L dari Plumpang.' }
    ],
    activeAlerts: [
      {
        id: 'ALR-SPBU-01',
        tankId: 'TNK-SPBU-01-P92',
        tankName: 'Tangki Pendam TP-01',
        facilityName: 'SPBU COCO 31.124.01',
        severity: 'critical',
        type: 'fraud_discrepancy',
        title: 'Discrepancy Bongkar Muat (-145 L)',
        description: 'Penerimaan BBM lebih rendah dari manifest pengiriman. Indikasi selisih kompartemen mobil tangki.',
        timestamp: '11:45 WIB',
        acknowledged: false,
        assignedTo: 'Manager SPBU (Dewi Lestari)'
      }
    ],
    lastCalibrationDate: '2026-06-15',
    uptimePercent: 99.95
  },
  {
    id: 'TNK-SPBU-01-P90',
    tankNumber: 'TP-02',
    name: 'Tangki Pendam TP-02 (Pertalite)',
    facilityId: 'GRP-SPBU-01',
    facilityName: 'SPBU COCO 31.124.01 - TB Simatupang',
    facilityType: 'spbu',
    locationCity: 'Jakarta Selatan',
    category: 'underground_spbu',
    fuelType: 'Pertalite',
    status: 'normal',
    statusMessage: 'Nominal - Penyaluran Nozzle Reguler',
    atgProbeModel: 'TankSight UST Magneto-Pro',
    probeSerialNumber: 'TS-UST-2026-4420',
    metrics: {
      grossVolumeLiters: 19800,
      netStandardVolumeLiters: 19610,
      capacityLiters: 30000,
      productLevelMm: 1540,
      waterLevelMm: 3,
      safeFillLevelMm: 2150,
      ullageLiters: 10200,
      avgTemperatureC: 29.2,
      densityKgM3: 734.9,
      headspacePressureKpa: 101.0,
      flowRateLpm: -65,
      lastDipTime: 'Just now',
      thermistors: [
        { position: 'top', temp: 29.8, depthMm: 1500 },
        { position: 'upper_mid', temp: 29.4, depthMm: 1100 },
        { position: 'lower_mid', temp: 29.0, depthMm: 700 },
        { position: 'bottom', temp: 28.6, depthMm: 200 }
      ]
    },
    lossAnalysis: {
      dailyLossLiters: 72,
      dailyLossPercent: 0.24,
      pertaminaTolerancePercent: 0.50,
      toleranceStatus: 'within_tolerance',
      breakdown: {
        thermalShrinkageLiters: 48,
        evaporationLiters: 14,
        physicalLeakLiters: 0,
        unaccountedDiscrepancyLiters: 10
      },
      primaryCause: 'normal',
      riskScore: 22,
      aiDiagnosis: 'Tingkat losses 0.24% sangat baik dan terkendali. Koreksi suhu ASTM D1250 seimbang dengan rekonsiliasi totalizer dispenser.',
      recommendedAction: 'Pertahankan prosedur standar operasional (SOP Pasti Pas).'
    },
    trends24h: {
      timestamps: ['00:00', '02:00', '04:00', '06:00', '08:00', '10:00', '12:00', '14:00', '16:00', '18:00', '20:00', '22:00'],
      levelMm: [1880, 1850, 1840, 1820, 1750, 1680, 1620, 1580, 1540, 1540, 1540, 1540],
      tempC: [28.8, 28.7, 28.6, 28.7, 29.0, 29.3, 29.6, 29.7, 29.5, 29.3, 29.2, 29.2],
      grossVolume: [24800, 24300, 24100, 23700, 22600, 21500, 20600, 20100, 19800, 19800, 19800, 19800],
      netVolume15C: [24580, 24090, 23890, 23500, 22400, 21300, 20400, 19910, 19610, 19610, 19610, 19610],
      vaporPressure: [100.8, 100.8, 100.8, 100.8, 100.9, 101.0, 101.2, 101.3, 101.1, 101.0, 101.0, 101.0]
    },
    recentEvents: [
      { id: 'EVT-107', timestamp: '08:00:00', type: 'STATUS', severity: 'info', message: 'Totalizer shift pagi sinkron: 3.200 L terjual.' }
    ],
    activeAlerts: [],
    lastCalibrationDate: '2026-06-15',
    uptimePercent: 100
  },
  {
    id: 'TNK-SPBU-03-SOL',
    tankNumber: 'TP-03',
    name: 'Tangki Pendam TP-03 (Biosolar B35)',
    facilityId: 'GRP-SPBU-03',
    facilityName: 'SPBU Green Energy Station - Dago',
    facilityType: 'spbu',
    locationCity: 'Bandung',
    category: 'underground_spbu',
    fuelType: 'Biosolar B35',
    status: 'alert',
    statusMessage: 'Peringatan Kebocoran CSLD & Deteksi Air Bawah (Water Cut)',
    atgProbeModel: 'TankSight UST Magneto-Pro (Water-Bottom & Interstitial)',
    probeSerialNumber: 'TS-UST-2026-7811',
    metrics: {
      grossVolumeLiters: 14200,
      netStandardVolumeLiters: 14120,
      capacityLiters: 30000,
      productLevelMm: 1150,
      waterLevelMm: 32, // Warning: Water > 25mm threshold!
      safeFillLevelMm: 2150,
      ullageLiters: 15800,
      avgTemperatureC: 24.1,
      densityKgM3: 848.2,
      headspacePressureKpa: 100.8,
      flowRateLpm: 0,
      lastDipTime: 'Just now',
      thermistors: [
        { position: 'top', temp: 24.8, depthMm: 1100 },
        { position: 'upper_mid', temp: 24.3, depthMm: 800 },
        { position: 'lower_mid', temp: 23.9, depthMm: 500 },
        { position: 'bottom', temp: 23.5, depthMm: 150 }
      ]
    },
    lossAnalysis: {
      dailyLossLiters: 252,
      dailyLossPercent: 0.84,
      pertaminaTolerancePercent: 0.50,
      toleranceStatus: 'exceeds_tolerance',
      breakdown: {
        thermalShrinkageLiters: 12,
        evaporationLiters: 5,
        physicalLeakLiters: 185, // physical seepage flagged by CSLD
        unaccountedDiscrepancyLiters: 50
      },
      primaryCause: 'leak',
      riskScore: 92,
      aiDiagnosis: 'Uji Statis CSLD (01:00-04:00 WIB saat SPBU tutup) mendeteksi laju penurunan level -0.38 L/jam tanpa transaksi dispenser. Bersamaan dengan itu, sensor water bottom mendeteksi kenaikan air dasar dari 12mm menjadi 32mm (+20mm), mengindikasikan infiltrasi air tanah atau kebocoran seal manhole.',
      recommendedAction: 'Hentikan penyaluran pompa Biosolar segera. Lakukan pengurasan air dasar (water draining) dan uji tekanan pipa/tangki (Pressure Decay Test).'
    },
    trends24h: {
      timestamps: ['00:00', '02:00', '04:00', '06:00', '08:00', '10:00', '12:00', '14:00', '16:00', '18:00', '20:00', '22:00'],
      levelMm: [1210, 1205, 1200, 1195, 1190, 1180, 1170, 1165, 1160, 1155, 1152, 1150],
      tempC: [23.8, 23.5, 23.2, 23.4, 23.9, 24.2, 24.6, 24.8, 24.5, 24.3, 24.2, 24.1],
      grossVolume: [15200, 15120, 15040, 14960, 14880, 14720, 14560, 14480, 14400, 14320, 14250, 14200],
      netVolume15C: [15110, 15030, 14950, 14870, 14790, 14630, 14480, 14400, 14320, 14240, 14170, 14120],
      vaporPressure: [100.6, 100.6, 100.5, 100.6, 100.7, 100.8, 100.9, 101.0, 100.9, 100.8, 100.8, 100.8]
    },
    recentEvents: [
      { id: 'EVT-108', timestamp: '04:12:00', type: 'ALERT', severity: 'critical', message: 'CSLD Static Test Fail: Laju penurunan -0.38 L/jam terkonfirmasi.' },
      { id: 'EVT-109', timestamp: '03:30:00', type: 'ALERT', severity: 'warning', message: 'Water Bottom Float terdeteksi di ketinggian 32mm (>25mm batas toleransi).' }
    ],
    activeAlerts: [
      {
        id: 'ALR-SPBU-03-LK',
        tankId: 'TNK-SPBU-03-SOL',
        tankName: 'Tangki Pendam TP-03',
        facilityName: 'SPBU Green Energy Station - Dago',
        severity: 'critical',
        type: 'leak_detected',
        title: 'Deteksi Kebocoran / Infiltrasi Air Tanah',
        description: 'Tinggi air dasar 32mm (ambang aman 25mm) dan CSLD membunyikan alarm rembesan tangki.',
        timestamp: '04:12 WIB',
        acknowledged: false,
        assignedTo: 'HSE & Maintenance Region JBB'
      },
      {
        id: 'ALR-SPBU-03-WT',
        tankId: 'TNK-SPBU-03-SOL',
        tankName: 'Tangki Pendam TP-03',
        facilityName: 'SPBU Green Energy Station - Dago',
        severity: 'warning',
        type: 'water_incursion',
        title: 'Water Bottom Incursion Exceeded',
        description: 'Air dasar tangki 32mm berpotensi menyentuh suction stub pipa hisap dispenser.',
        timestamp: '03:30 WIB',
        acknowledged: false
      }
    ],
    lastCalibrationDate: '2026-05-10',
    uptimePercent: 99.82
  },
  {
    id: 'TNK-SBY-01',
    tankNumber: 'T-201',
    name: 'Tangki Timbun T-201 (Biosolar B35)',
    facilityId: 'GRP-TBBM-02',
    facilityName: 'Fuel Terminal Surabaya Tanjung Perak',
    facilityType: 'terminal_bbm',
    locationCity: 'Surabaya',
    category: 'bulk_terminal',
    fuelType: 'Biosolar B35',
    status: 'normal',
    statusMessage: 'Nominal - Pemuatan Mobil Tangki ke SPBU',
    atgProbeModel: 'TankSight Mag-X Ultra',
    probeSerialNumber: 'TS-MAG-2026-6101',
    metrics: {
      grossVolumeLiters: 15400000,
      netStandardVolumeLiters: 15320000,
      capacityLiters: 20000000,
      productLevelMm: 11200,
      waterLevelMm: 5,
      safeFillLevelMm: 14500,
      ullageLiters: 4600000,
      avgTemperatureC: 31.0,
      densityKgM3: 849.0,
      headspacePressureKpa: 101.4,
      flowRateLpm: -1800,
      lastDipTime: '2 menit yang lalu',
      thermistors: [
        { position: 'top', temp: 32.0, depthMm: 10500 },
        { position: 'upper_mid', temp: 31.2, depthMm: 7500 },
        { position: 'lower_mid', temp: 30.6, depthMm: 4500 },
        { position: 'bottom', temp: 30.2, depthMm: 1500 }
      ]
    },
    lossAnalysis: {
      dailyLossLiters: 13800,
      dailyLossPercent: 0.09,
      pertaminaTolerancePercent: 0.15,
      toleranceStatus: 'within_tolerance',
      breakdown: {
        thermalShrinkageLiters: 9200,
        evaporationLiters: 2800,
        physicalLeakLiters: 0,
        unaccountedDiscrepancyLiters: 1800
      },
      primaryCause: 'normal',
      riskScore: 16,
      aiDiagnosis: 'Kondisi operasional normal. Losses terukur 0.09%, sangat terkontrol dalam rentang aman.',
      recommendedAction: 'Lanjutkan pengisian filling shed mobil tangki sesuai target.'
    },
    trends24h: {
      timestamps: ['00:00', '02:00', '04:00', '06:00', '08:00', '10:00', '12:00', '14:00', '16:00', '18:00', '20:00', '22:00'],
      levelMm: [12000, 11900, 11800, 11700, 11600, 11500, 11400, 11300, 11250, 11220, 11200, 11200],
      tempC: [30.2, 30.0, 29.8, 29.9, 30.4, 30.9, 31.5, 31.8, 31.4, 31.1, 31.0, 31.0],
      grossVolume: [16500000, 16360000, 16220000, 16080000, 15950000, 15810000, 15680000, 15540000, 15470000, 15430000, 15400000, 15400000],
      netVolume15C: [16410000, 16270000, 16130000, 15990000, 15860000, 15720000, 15600000, 15460000, 15390000, 15350000, 15320000, 15320000],
      vaporPressure: [101.1, 101.0, 101.0, 101.0, 101.2, 101.4, 101.6, 101.7, 101.5, 101.4, 101.4, 101.4]
    },
    recentEvents: [
      { id: 'EVT-110', timestamp: '14:00:00', type: 'DISPATCH', severity: 'info', message: 'Pengisian Mobil Tangki L 8920 UQ (24.000 L) selesai.' }
    ],
    activeAlerts: [],
    lastCalibrationDate: '2026-08-01',
    uptimePercent: 100
  },
  {
    id: 'TNK-REW-01',
    tankNumber: 'T-301',
    name: 'Tangki Timbun T-301 (Pertamax Turbo)',
    facilityId: 'GRP-TBBM-03',
    facilityName: 'Fuel Terminal Rewulu',
    facilityType: 'terminal_bbm',
    locationCity: 'Bantul / Yogyakarta',
    category: 'bulk_terminal',
    fuelType: 'Pertamax Turbo',
    status: 'normal',
    statusMessage: 'Nominal - Stok Siap Salur',
    atgProbeModel: 'TankSight Mag-X Ultra',
    probeSerialNumber: 'TS-MAG-2026-5519',
    metrics: {
      grossVolumeLiters: 8200000,
      netStandardVolumeLiters: 8140000,
      capacityLiters: 10000000,
      productLevelMm: 9800,
      waterLevelMm: 2,
      safeFillLevelMm: 12000,
      ullageLiters: 1800000,
      avgTemperatureC: 28.5,
      densityKgM3: 745.2,
      headspacePressureKpa: 101.1,
      flowRateLpm: 0,
      lastDipTime: '3 menit yang lalu',
      thermistors: [
        { position: 'top', temp: 29.5, depthMm: 9200 },
        { position: 'upper_mid', temp: 28.8, depthMm: 6500 },
        { position: 'lower_mid', temp: 28.2, depthMm: 4000 },
        { position: 'bottom', temp: 27.5, depthMm: 1200 }
      ]
    },
    lossAnalysis: {
      dailyLossLiters: 9000,
      dailyLossPercent: 0.11,
      pertaminaTolerancePercent: 0.15,
      toleranceStatus: 'within_tolerance',
      breakdown: {
        thermalShrinkageLiters: 5800,
        evaporationLiters: 2200,
        physicalLeakLiters: 0,
        unaccountedDiscrepancyLiters: 1000
      },
      primaryCause: 'normal',
      riskScore: 19,
      aiDiagnosis: 'Kondisi stabil dengan losses 0.11%. Suhu ambient Rewulu yang moderat menjaga evaporasi headspace tetap rendah.',
      recommendedAction: 'Jaga operasional rutin.'
    },
    trends24h: {
      timestamps: ['00:00', '02:00', '04:00', '06:00', '08:00', '10:00', '12:00', '14:00', '16:00', '18:00', '20:00', '22:00'],
      levelMm: [9800, 9800, 9800, 9800, 9800, 9800, 9800, 9800, 9800, 9800, 9800, 9800],
      tempC: [28.0, 27.8, 27.5, 27.6, 28.0, 28.5, 29.0, 29.3, 29.0, 28.7, 28.5, 28.5],
      grossVolume: [8200000, 8200000, 8200000, 8200000, 8200000, 8200000, 8200000, 8200000, 8200000, 8200000, 8200000, 8200000],
      netVolume15C: [8140000, 8140000, 8140000, 8140000, 8140000, 8140000, 8140000, 8140000, 8140000, 8140000, 8140000, 8140000],
      vaporPressure: [100.9, 100.9, 100.8, 100.8, 101.0, 101.1, 101.3, 101.3, 101.2, 101.1, 101.1, 101.1]
    },
    recentEvents: [
      { id: 'EVT-111', timestamp: '08:30:00', type: 'CALIBRATION', severity: 'info', message: 'Verifikasi densimeter laboratorium: 745.2 kg/m³ matched.' }
    ],
    activeAlerts: [],
    lastCalibrationDate: '2026-07-14',
    uptimePercent: 100
  }
];

export const MOCK_SHIPMENTS: SupplyChainShipment[] = [
  {
    id: 'SHP-2026-0914',
    poNumber: 'PO-PTM-88912',
    tankerPlateNumber: 'B 9281 UFA',
    driverName: 'Slamet Riyadi',
    originTerminal: 'Integrated Terminal Plumpang',
    destinationSpbu: 'SPBU COCO 31.124.01 - TB Simatupang',
    fuelType: 'Pertamax',
    volumeDispatchedLiters: 16000,
    volumeReceivedAtgLiters: 15855,
    volumeDifferenceLiters: -145,
    lossPercent: -0.91, // exceeds 0.50%
    status: 'flagged_discrepancy',
    eSealStatus: 'tampered',
    gpsCoordinates: [-6.2942, 106.8123],
    departureTime: '10:15 WIB',
    arrivalTime: '11:30 WIB',
    temperatureAtLoadingC: 30.2,
    temperatureAtDischargeC: 30.8
  },
  {
    id: 'SHP-2026-0915',
    poNumber: 'PO-PTM-88913',
    tankerPlateNumber: 'B 9412 UFE',
    driverName: 'Dedi Kurniawan',
    originTerminal: 'Integrated Terminal Plumpang',
    destinationSpbu: 'SPBU Pasti Pas 34.128.02 - MT Haryono',
    fuelType: 'Pertalite',
    volumeDispatchedLiters: 24000,
    volumeReceivedAtgLiters: 23960,
    volumeDifferenceLiters: -40,
    lossPercent: -0.17, // within tolerance
    status: 'completed',
    eSealStatus: 'unlocked_at_destination',
    gpsCoordinates: [-6.2435, 106.8584],
    departureTime: '08:45 WIB',
    arrivalTime: '09:50 WIB',
    temperatureAtLoadingC: 29.5,
    temperatureAtDischargeC: 29.9
  },
  {
    id: 'SHP-2026-0916',
    poNumber: 'PO-PTM-88914',
    tankerPlateNumber: 'L 8920 UQ',
    driverName: 'Bambang Irawan',
    originTerminal: 'Fuel Terminal Surabaya Tanjung Perak',
    destinationSpbu: 'SPBU 54.601.18 - Wonokromo Surabaya',
    fuelType: 'Biosolar B35',
    volumeDispatchedLiters: 16000,
    volumeReceivedAtgLiters: 0,
    volumeDifferenceLiters: 0,
    lossPercent: 0,
    status: 'in_transit',
    eSealStatus: 'sealed',
    gpsCoordinates: [-7.2575, 112.7521],
    departureTime: '14:15 WIB',
    arrivalTime: 'Est. 15:30 WIB',
    temperatureAtLoadingC: 31.0,
    temperatureAtDischargeC: 31.0
  }
];

export const MOCK_ALL_ALERTS: TankAlert[] = [
  {
    id: 'ALR-SPBU-01',
    tankId: 'TNK-SPBU-01-P92',
    tankName: 'Tangki Pendam TP-01',
    facilityName: 'SPBU COCO 31.124.01',
    severity: 'critical',
    type: 'fraud_discrepancy',
    title: 'Discrepancy Bongkar Muat (-145 L)',
    description: 'Penerimaan BBM lebih rendah dari manifest pengiriman. Indikasi selisih kompartemen mobil tangki B 9281 UFA.',
    timestamp: '11:45 WIB',
    acknowledged: false,
    assignedTo: 'Manager SPBU (Dewi Lestari)'
  },
  {
    id: 'ALR-SPBU-03-LK',
    tankId: 'TNK-SPBU-03-SOL',
    tankName: 'Tangki Pendam TP-03',
    facilityName: 'SPBU Green Energy Station - Dago',
    severity: 'critical',
    type: 'leak_detected',
    title: 'Deteksi Kebocoran / Infiltrasi Air Tanah',
    description: 'Tinggi air dasar 32mm (ambang aman 25mm) dan CSLD membunyikan alarm rembesan tangki.',
    timestamp: '04:12 WIB',
    acknowledged: false,
    assignedTo: 'HSE & Maintenance Region JBB'
  },
  {
    id: 'ALR-PLP-01',
    tankId: 'TNK-PLP-01',
    tankName: 'Tangki Timbun T-101',
    facilityName: 'Integrated Terminal Plumpang',
    severity: 'warning',
    type: 'temp_gradient',
    title: 'Thermal Vapor Loss & Headspace Overheat',
    description: 'Suhu ruang uap 37.6°C melampaui ambang batas 35.0°C. Volume susut uap diestimasi 14,200 L/hari.',
    timestamp: '14:20 WIB',
    acknowledged: false
  },
  {
    id: 'ALR-SPBU-03-WT',
    tankId: 'TNK-SPBU-03-SOL',
    tankName: 'Tangki Pendam TP-03',
    facilityName: 'SPBU Green Energy Station - Dago',
    severity: 'warning',
    type: 'water_incursion',
    title: 'Water Bottom Incursion Exceeded',
    description: 'Air dasar tangki 32mm berpotensi menyentuh suction stub pipa hisap dispenser.',
    timestamp: '03:30 WIB',
    acknowledged: false
  }
];
