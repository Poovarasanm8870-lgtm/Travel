import React from 'react';
import { motion } from 'framer-motion';
import { MapPin, Navigation, ShieldCheck, Phone, Bike, Car } from 'lucide-react';

const MapPreview = ({ pickupName = 'Indiranagar', dropName = 'MG Road', rideType = 'bike', liveProgress = 0.4 }) => {
  return (
    <div className="relative w-full h-[380px] sm:h-[420px] rounded-3xl overflow-hidden border border-slate-200/80 dark:border-slate-800 shadow-2xl bg-slate-900">
      {/* Map Graphic Layer */}
      <div className="absolute inset-0 opacity-80 bg-[radial-gradient(#334155_1px,transparent_1px)] [background-size:24px_24px]">
        {/* Simulated SVG Roads & Grid */}
        <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <linearGradient id="routeGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#14b8a6" />
              <stop offset="100%" stopColor="#f97316" />
            </linearGradient>
          </defs>

          {/* Road Network Lines */}
          <path d="M-50 120 Q 150 100 450 140" stroke="#1e293b" strokeWidth="24" fill="none" />
          <path d="M120 -50 Q 180 200 220 500" stroke="#1e293b" strokeWidth="32" fill="none" />
          <path d="M-50 280 Q 200 320 500 240" stroke="#1e293b" strokeWidth="20" fill="none" />

          {/* Secondary Roads */}
          <path d="M-50 120 Q 150 100 450 140" stroke="#334155" strokeWidth="8" strokeDasharray="6 6" fill="none" />
          <path d="M120 -50 Q 180 200 220 500" stroke="#334155" strokeWidth="12" fill="none" />

          {/* Main Curved Animated Route Line */}
          <path
            id="activeRoutePath"
            d="M 70 280 C 140 180, 220 220, 310 100"
            stroke="url(#routeGrad)"
            strokeWidth="6"
            strokeLinecap="round"
            fill="none"
            className="route-dash"
          />
        </svg>
      </div>

      {/* Pickup Marker Pin */}
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ type: 'spring', stiffness: 200, delay: 0.2 }}
        className="absolute left-[50px] top-[260px] z-10 flex flex-col items-center group cursor-pointer"
      >
        <div className="px-2.5 py-1 bg-slate-900/90 text-white rounded-lg text-[10px] font-bold shadow-lg border border-slate-700 whitespace-nowrap mb-1">
          Pickup: {pickupName}
        </div>
        <div className="w-8 h-8 rounded-full bg-emerald-500 text-white flex items-center justify-center shadow-lg shadow-emerald-500/40 ring-4 ring-emerald-500/30">
          <div className="w-3 h-3 rounded-full bg-white animate-ping" />
        </div>
      </motion.div>

      {/* Destination Marker Pin */}
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ type: 'spring', stiffness: 200, delay: 0.4 }}
        className="absolute left-[290px] top-[75px] z-10 flex flex-col items-center group cursor-pointer"
      >
        <div className="px-2.5 py-1 bg-slate-900/90 text-white rounded-lg text-[10px] font-bold shadow-lg border border-slate-700 whitespace-nowrap mb-1">
          Drop: {dropName}
        </div>
        <div className="w-8 h-8 rounded-full bg-accent-500 text-white flex items-center justify-center shadow-lg shadow-accent-500/40 ring-4 ring-accent-500/30">
          <MapPin className="w-4 h-4" />
        </div>
      </motion.div>

      {/* Animated Moving Vehicle Marker */}
      <motion.div
        animate={{
          x: [60, 140, 220, 290],
          y: [265, 175, 200, 85],
        }}
        transition={{
          duration: 7,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
        className="absolute z-20"
      >
        <div className="relative">
          <div className="w-10 h-10 rounded-2xl bg-brand-500 text-white flex items-center justify-center shadow-glow-teal ring-4 ring-brand-500/40">
            {rideType === 'bike' ? (
              <Bike className="w-5 h-5 animate-pulse" />
            ) : (
              <Car className="w-5 h-5 animate-pulse" />
            )}
          </div>
          {/* Signal wave effect */}
          <div className="absolute -inset-1 rounded-2xl bg-brand-400 opacity-40 animate-ping -z-10" />
        </div>
      </motion.div>

      {/* Map Control Floating Overlay */}
      <div className="absolute top-4 left-4 z-20">
        <div className="glass-panel px-3 py-1.5 rounded-full flex items-center space-x-2 text-xs font-semibold text-white">
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
          <span>Live GPS Tracking Active</span>
        </div>
      </div>

      {/* Map Bottom Information Badge */}
      <div className="absolute bottom-4 left-4 right-4 z-20 glass-panel p-3 rounded-2xl flex items-center justify-between text-xs text-white">
        <div className="flex items-center space-x-3">
          <div className="p-2 rounded-xl bg-brand-500/20 text-brand-400">
            <ShieldCheck className="w-4 h-4" />
          </div>
          <div>
            <p className="font-bold text-white">RideFlow Safety Shield Enabled</p>
            <p className="text-[10px] text-slate-400">Verified captain path & 24/7 SOS helpline</p>
          </div>
        </div>
        <button className="p-2 bg-slate-800 hover:bg-slate-700 text-brand-400 rounded-xl transition-colors">
          <Phone className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};

export default MapPreview;
