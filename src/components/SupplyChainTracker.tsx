import React, { useState } from 'react';
import { SupplyChainShipment } from '../types';
import { Truck, ShieldCheck, AlertOctagon, CheckCircle2, MapPin, ArrowRight, Clock, Navigation } from 'lucide-react';

interface SupplyChainTrackerProps {
  shipments: SupplyChainShipment[];
}

export const SupplyChainTracker: React.FC<SupplyChainTrackerProps> = ({ shipments }) => {
  const [selectedShipment, setSelectedShipment] = useState<SupplyChainShipment>(shipments[0]);

  return (
    <div className="bg-[#121824] rounded-xl border border-slate-800 p-6 space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-800/80 pb-5">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <Truck className="w-5 h-5 text-[#ED1C24]" />
            <h3 className="text-base font-bold text-white tracking-tight">
              Monitoring Rantai Pasok BBM (Terminal BBM ke SPBU)
            </h3>
          </div>
          <p className="text-xs text-slate-400">
            Pelacakan integritas volume pengiriman Mobil Tangki Pertamina, status E-Seal Digital, dan rekonsiliasi penerimaan ATG.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <span className="text-xs px-2.5 py-1 rounded bg-slate-800 text-slate-300 font-mono">
            {shipments.length} Armada Terhubung
          </span>
        </div>
      </div>

      {/* Shipment Selection Tabs */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
        {shipments.map((shipment) => {
          const isSelected = selectedShipment.id === shipment.id;
          const hasDiscrepancy = shipment.status === 'flagged_discrepancy';

          return (
            <button
              key={shipment.id}
              onClick={() => setSelectedShipment(shipment)}
              className={`p-3.5 rounded-xl border text-left transition-all relative ${
                isSelected 
                  ? 'bg-slate-800/80 border-[#ED1C24] shadow-lg' 
                  : 'bg-[#0E1524] border-slate-800 hover:border-slate-700'
              }`}
            >
              <div className="flex items-center justify-between mb-2">
                <span className="font-mono font-bold text-white text-xs">{shipment.tankerPlateNumber}</span>
                <span className={`text-[10px] font-mono px-2 py-0.5 rounded font-semibold ${
                  hasDiscrepancy 
                    ? 'bg-red-950 text-red-400 border border-red-800' 
                    : shipment.status === 'in_transit'
                    ? 'bg-amber-950 text-amber-400 border border-amber-800'
                    : 'bg-emerald-950 text-emerald-400 border border-emerald-800'
                }`}>
                  {hasDiscrepancy ? 'Selisih Tiba Kurang' : shipment.status === 'in_transit' ? 'Perjalanan' : 'Selesai Bongkar'}
                </span>
              </div>

              <div className="text-xs text-slate-300 font-medium mb-1 truncate">
                {shipment.destinationSpbu}
              </div>

              <div className="flex items-center justify-between text-[11px] text-slate-400 pt-1 border-t border-slate-800/60">
                <span>{shipment.fuelType}</span>
                <span className="font-mono font-semibold text-slate-200">
                  {shipment.volumeDispatchedLiters.toLocaleString()} L
                </span>
              </div>
            </button>
          );
        })}
      </div>

      {/* Active Shipment Detail & Custody Transfer Audit */}
      <div className="p-5 rounded-xl bg-[#0B0F17] border border-slate-800 space-y-5">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 border-b border-slate-800/80 pb-4">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-lg bg-red-950/60 border border-red-900/60 text-[#ED1C24]">
              <Truck className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h4 className="text-sm font-bold text-white tracking-wide">{selectedShipment.tankerPlateNumber}</h4>
                <span className="text-xs text-slate-400 font-mono">({selectedShipment.poNumber})</span>
              </div>
              <p className="text-xs text-slate-400">
                Pengemudi: <strong className="text-slate-200">{selectedShipment.driverName}</strong> · Berangkat: {selectedShipment.departureTime}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className={`px-3 py-1.5 rounded-lg border text-xs flex items-center gap-2 ${
              selectedShipment.eSealStatus === 'tampered'
                ? 'bg-red-950/70 border-red-800 text-red-300'
                : 'bg-emerald-950/60 border-emerald-800 text-emerald-300'
            }`}>
              {selectedShipment.eSealStatus === 'tampered' ? (
                <>
                  <AlertOctagon className="w-4 h-4 text-red-400" />
                  <span>E-Seal Tampered (Manipulasi Segel)</span>
                </>
              ) : (
                <>
                  <ShieldCheck className="w-4 h-4 text-emerald-400" />
                  <span>Segel Digital E-Seal Terverifikasi</span>
                </>
              )}
            </div>
          </div>
        </div>

        {/* Visual Route Pipeline Steps */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
          {/* Step 1: Loading at Terminal BBM */}
          <div className="p-3.5 rounded-lg bg-slate-900/90 border border-slate-800 space-y-2">
            <div className="flex items-center justify-between text-slate-400">
              <span className="font-semibold text-slate-200">1. Pemuatan Terminal BBM</span>
              <span className="text-[10px] font-mono text-emerald-400">Loading Rack Done</span>
            </div>
            <p className="text-[11px] text-slate-300">{selectedShipment.originTerminal}</p>
            <div className="pt-1 flex justify-between font-mono text-slate-300 text-[11px]">
              <span>Volume Pengiriman:</span>
              <strong className="text-white">{selectedShipment.volumeDispatchedLiters.toLocaleString()} L</strong>
            </div>
            <div className="flex justify-between font-mono text-slate-400 text-[11px]">
              <span>Suhu Muat:</span>
              <span>{selectedShipment.temperatureAtLoadingC}°C</span>
            </div>
          </div>

          {/* Step 2: In-Transit Tracking */}
          <div className="p-3.5 rounded-lg bg-slate-900/90 border border-slate-800 space-y-2">
            <div className="flex items-center justify-between text-slate-400">
              <span className="font-semibold text-slate-200">2. Perjalanan & GPS Tracking</span>
              <span className="text-[10px] font-mono text-sky-400">Live Telemetri</span>
            </div>
            <p className="text-[11px] text-slate-300">Rute Terverifikasi Pertamina Geofence</p>
            <div className="pt-1 flex justify-between font-mono text-slate-300 text-[11px]">
              <span>Status Segel:</span>
              <strong className={selectedShipment.eSealStatus === 'tampered' ? 'text-red-400' : 'text-emerald-400'}>
                {selectedShipment.eSealStatus === 'tampered' ? 'Warning: Dibuka Ilegal' : 'Aman Terkunci'}
              </strong>
            </div>
            <div className="flex justify-between font-mono text-slate-400 text-[11px]">
              <span>Koordinat Terkini:</span>
              <span>{selectedShipment.gpsCoordinates[0].toFixed(4)}, {selectedShipment.gpsCoordinates[1].toFixed(4)}</span>
            </div>
          </div>

          {/* Step 3: SPBU ATG Receiving (Bongkar Muat) */}
          <div className="p-3.5 rounded-lg bg-slate-900/90 border border-slate-800 space-y-2">
            <div className="flex items-center justify-between text-slate-400">
              <span className="font-semibold text-slate-200">3. Penerimaan Tangki SPBU</span>
              <span className={`text-[10px] font-mono ${selectedShipment.volumeDifferenceLiters < -50 ? 'text-red-400 font-bold' : 'text-emerald-400'}`}>
                {selectedShipment.volumeDifferenceLiters < -50 ? 'Audit Discrepancy' : 'Matched'}
              </span>
            </div>
            <p className="text-[11px] text-slate-300">{selectedShipment.destinationSpbu}</p>
            <div className="pt-1 flex justify-between font-mono text-slate-300 text-[11px]">
              <span>Ukur Aktual ATG:</span>
              <strong className="text-white">
                {selectedShipment.volumeReceivedAtgLiters > 0 
                  ? `${selectedShipment.volumeReceivedAtgLiters.toLocaleString()} L` 
                  : 'Menunggu Bongkar'}
              </strong>
            </div>
            <div className="flex justify-between font-mono text-slate-400 text-[11px]">
              <span>Selisih Tiba Kurang:</span>
              <span className={selectedShipment.volumeDifferenceLiters < 0 ? 'text-red-400 font-bold' : 'text-emerald-400'}>
                {selectedShipment.volumeDifferenceLiters} L ({selectedShipment.lossPercent}%)
              </span>
            </div>
          </div>
        </div>

        {/* Audit Callout if discrepancy detected */}
        {selectedShipment.volumeDifferenceLiters < -50 && (
          <div className="p-4 rounded-lg bg-red-950/40 border border-red-900 text-xs text-red-200 flex flex-col md:flex-row items-start md:items-center justify-between gap-3">
            <div className="flex items-center gap-2.5">
              <AlertOctagon className="w-5 h-5 text-red-400 shrink-0" />
              <div>
                <strong>Peringatan Kerugian / Fraud Pengiriman:</strong>
                <p className="text-slate-300 mt-0.5">
                  Selisih volume tiba kurang sebesar {Math.abs(selectedShipment.volumeDifferenceLiters)} Liter melebihi ambang batas toleransi susut jalan Pertamina (0.50%). Status E-Seal kompartemen tercatat pernah dibuka di luar titik geofence SPBU.
                </p>
              </div>
            </div>
            <button className="px-3 py-1.5 bg-[#ED1C24] hover:bg-red-700 text-white rounded font-medium whitespace-nowrap transition-colors">
              Cetak BAP Tiba Kurang
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
