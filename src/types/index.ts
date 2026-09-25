export type FuelType = 
  | 'Pertamax Turbo' 
  | 'Pertamax' 
  | 'Pertalite' 
  | 'Dexlite' 
  | 'Pertamina Dex' 
  | 'Biosolar B35';

export type TankCategory = 'bulk_terminal' | 'underground_spbu';

export type TankStatus = 'normal' | 'warning' | 'alert' | 'receiving' | 'dispensing';

export type FacilityType = 'terminal_bbm' | 'spbu';

export interface ThermistorPoint {
  position: 'top' | 'upper_mid' | 'lower_mid' | 'bottom';
  temp: number; // Celsius
  depthMm: number;
}

export interface TankMetrics {
  grossVolumeLiters: number;      // GOV (Gross Observed Volume)
  netStandardVolumeLiters: number;// NSV at 15°C (ASTM D1250)
  capacityLiters: number;
  productLevelMm: number;
  waterLevelMm: number;           // Bottom water incursion
  safeFillLevelMm: number;
  ullageLiters: number;           // Remaining room to fill
  avgTemperatureC: number;
  densityKgM3: number;            // at 15°C
  headspacePressureKpa: number;   // Vapor pressure in tank
  flowRateLpm: number;            // Current flow (+ receiving, - dispensing)
  lastDipTime: string;
  thermistors: ThermistorPoint[];
}

export interface LossAnalysis {
  dailyLossLiters: number;
  dailyLossPercent: number;
  pertaminaTolerancePercent: number; // 0.15% for Terminal, 0.50% for SPBU
  toleranceStatus: 'within_tolerance' | 'exceeds_tolerance';
  breakdown: {
    thermalShrinkageLiters: number;  // Caused by temperature & ASTM D1250 VCF
    evaporationLiters: number;        // Vapor loss in headspace
    physicalLeakLiters: number;       // Detected by CSLD / night static test
    unaccountedDiscrepancyLiters: number; // Potential fraud / delivery short / meter drift
  };
  primaryCause: 'evaporation' | 'temperature' | 'leak' | 'fraud_discrepancy' | 'normal';
  riskScore: number; // 0 - 100
  aiDiagnosis: string;
  recommendedAction: string;
}

export interface TankDevice {
  id: string;
  tankNumber: string;
  name: string;
  facilityId: string;
  facilityName: string;
  facilityType: FacilityType;
  locationCity: string;
  category: TankCategory;
  fuelType: FuelType;
  status: TankStatus;
  statusMessage: string;
  atgProbeModel: string;
  probeSerialNumber: string;
  metrics: TankMetrics;
  lossAnalysis: LossAnalysis;
  trends24h: {
    timestamps: string[];
    levelMm: number[];
    tempC: number[];
    grossVolume: number[];
    netVolume15C: number[];
    vaporPressure: number[];
  };
  recentEvents: TankEvent[];
  activeAlerts: TankAlert[];
  lastCalibrationDate: string;
  uptimePercent: number;
}

export interface TankEvent {
  id: string;
  timestamp: string;
  type: 'ALERT' | 'STATUS' | 'DELIVERY' | 'DISPATCH' | 'CALIBRATION' | 'SYSTEM';
  severity: 'critical' | 'warning' | 'info';
  message: string;
  operator?: string;
}

export interface TankAlert {
  id: string;
  tankId: string;
  tankName: string;
  facilityName: string;
  severity: 'critical' | 'warning' | 'info';
  type: 'loss_exceeded' | 'water_incursion' | 'leak_detected' | 'overfill_risk' | 'fraud_discrepancy' | 'temp_gradient';
  title: string;
  description: string;
  timestamp: string;
  acknowledged: boolean;
  assignedTo?: string;
}

export interface FacilityGroup {
  id: string;
  name: string;
  code: string;
  type: FacilityType;
  city: string;
  region: string;
  coordinates: [number, number]; // [lat, lng]
  tankCount: number;
  totalCapacityLiters: number;
  currentStockLiters: number;
  onlineCount: number;
  status: 'online' | 'warning' | 'critical';
  avgLossPercent: number;
  managerName: string;
  phone: string;
  address: string;
  lastUpdated: string;
}

export interface SupplyChainShipment {
  id: string;
  poNumber: string;
  tankerPlateNumber: string;
  driverName: string;
  originTerminal: string;
  destinationSpbu: string;
  fuelType: FuelType;
  volumeDispatchedLiters: number;
  volumeReceivedAtgLiters: number;
  volumeDifferenceLiters: number;
  lossPercent: number;
  status: 'in_transit' | 'bongkar_muat' | 'completed' | 'flagged_discrepancy';
  eSealStatus: 'sealed' | 'tampered' | 'unlocked_at_destination';
  gpsCoordinates: [number, number];
  departureTime: string;
  arrivalTime: string;
  temperatureAtLoadingC: number;
  temperatureAtDischargeC: number;
}

export interface UserRole {
  username: string;
  name: string;
  role: 'supervisor' | 'admin_terminal' | 'manager_spbu';
  roleLabel: string;
  assignedFacility: string;
  avatarUrl: string;
  email: string;
  nip: string;
}
