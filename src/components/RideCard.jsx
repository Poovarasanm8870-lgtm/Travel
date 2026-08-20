import React from 'react';
import { motion } from 'framer-motion';
import { Bike, Car, Crown, Users, Clock, CheckCircle2 } from 'lucide-react';

const RIDE_ICONS = {
  bike: Bike,
  auto: Car,
  cab: Car,
  premium: Crown,
};

const RideCard = ({ ride, fareDetails, isSelected, onSelect }) => {
  const IconComponent = RIDE_ICONS[ride.id] || Bike;

  return (
    <motion.div
      whileHover={{ y: -4, scale: 1.01 }}
      whileTap={{ scale: 0.98 }}
      onClick={() => onSelect(ride.id)}
      className={`relative cursor-pointer p-4 rounded-2xl border-2 transition-all duration-300 ${
        isSelected
          ? 'bg-brand-50/50 dark:bg-brand-950/20 border-brand-500 shadow-glow-teal'
          : 'bg-white dark:bg-dark-card border-slate-200 dark:border-slate-800 hover:border-brand-300 dark:hover:border-slate-700'
      }`}
    >
      {isSelected && (
        <div className="absolute top-3 right-3 text-brand-500">
          <CheckCircle2 className="w-5 h-5 fill-brand-500 text-white" />
        </div>
      )}

      <div className="flex items-center space-x-4">
        {/* Vehicle Image / Icon */}
        <div className="relative w-16 h-16 rounded-xl overflow-hidden bg-slate-100 dark:bg-slate-800 flex-shrink-0 flex items-center justify-center p-1 border border-slate-200/50 dark:border-slate-700/50">
          <img
            src={ride.image}
            alt={ride.name}
            className="w-full h-full object-cover rounded-lg group-hover:scale-105 transition-transform"
          />
        </div>

        {/* Details */}
        <div className="flex-1 min-w-0">
          <div className="flex items-center space-x-2">
            <h4 className="text-base font-bold text-slate-900 dark:text-white truncate">
              {ride.name}
            </h4>
            <span className="px-2 py-0.5 text-[10px] font-extrabold uppercase tracking-wide bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 rounded-md">
              {ride.capacity}
            </span>
          </div>
          <p className="text-xs text-slate-500 dark:text-slate-400 truncate mt-0.5">
            {ride.tagline}
          </p>

          <div className="flex items-center space-x-3 mt-2 text-xs text-slate-500 dark:text-slate-400">
            <span className="flex items-center font-medium">
              <Clock className="w-3.5 h-3.5 mr-1 text-brand-500" />
              {ride.etaMinutes} mins away
            </span>
          </div>
        </div>

        {/* Price */}
        <div className="text-right pl-2">
          <p className="text-lg font-extrabold text-slate-900 dark:text-white">
            ₹{fareDetails ? fareDetails.total : ride.baseFare}
          </p>
          <p className="text-[10px] text-slate-400 uppercase font-semibold">Total Fare</p>
        </div>
      </div>
    </motion.div>
  );
};

export default RideCard;
