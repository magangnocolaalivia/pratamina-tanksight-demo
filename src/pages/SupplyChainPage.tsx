import React from 'react';
import { SupplyChainShipment } from '../types';
import { SupplyChainTracker } from '../components/SupplyChainTracker';
import { Truck, ShieldCheck, AlertOctagon, Fuel, Navigation, Clock, CheckCircle2 } from 'lucide-react';

interface SupplyChainPageProps {
  shipments: SupplyChainShipment[];
}

export const SupplyChainPage: React.FC<SupplyChainPageProps> = ({ shipments }) => {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-[#121824] rounded-2xl border border-slate-800 p-6 shadow-xl">
        <div className="flex items-center gap-2 mb-1.5">
          <Truck className="w-5 h-5 text-[#ED1C24]" />
          <h2 className="text-xl md:text-2xl font-extrabold text-white tracking-tight">
            Integritas Rantai Pasok BBM & Pengiriman Mobil Tangki
          </h2>
        </div>
        <p className="text-xs text-slate-400 max-w-3xl">
          Verifikasi end-to-end custody transfer BBM dari Loading Rack Terminal BBM menuju SPBU tujuan. Deteksi otomatis anomali pembukaan segel elektronik (E-Seal), deviasi jalur geofence, dan selisih volume tiba kurang saat bongkar muat.
        </p>
      </div>

      {/* Main Component */}
      <SupplyChainTracker shipments={shipments} />
    </div>
  );
};
