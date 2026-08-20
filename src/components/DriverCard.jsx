import React from 'react';
import { Star, ShieldCheck, Phone, MessageSquare, Award } from 'lucide-react';

const DriverCard = ({ driver, otp }) => {
  if (!driver) return null;

  return (
    <div className="glass-panel p-5 rounded-3xl shadow-xl space-y-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <div className="relative">
            <img
              src={driver.photo}
              alt={driver.name}
              className="w-14 h-14 rounded-2xl object-cover ring-2 ring-brand-500"
            />
            <div className="absolute -bottom-1 -right-1 bg-amber-500 text-white p-1 rounded-md text-[10px] font-extrabold flex items-center shadow">
              <Star className="w-3 h-3 fill-current mr-0.5" />
              {driver.rating}
            </div>
          </div>

          <div>
            <div className="flex items-center space-x-2">
              <h3 className="text-base font-extrabold text-slate-900 dark:text-white">
                {driver.name}
              </h3>
              <span className="px-2 py-0.5 bg-emerald-100 dark:bg-emerald-950/50 text-emerald-600 dark:text-emerald-400 text-[10px] font-bold rounded-full flex items-center">
                <ShieldCheck className="w-3 h-3 mr-1" /> Verified
              </span>
            </div>
            <p className="text-xs text-slate-500 dark:text-slate-400 font-medium">
              {driver.vehicleModel}
            </p>
            <p className="text-xs font-bold text-brand-600 dark:text-brand-400 tracking-wider">
              {driver.vehicleNumber}
            </p>
          </div>
        </div>

        {/* Start OTP Display */}
        {otp && (
          <div className="text-right bg-brand-500/10 dark:bg-brand-950/30 border border-brand-500/20 px-3 py-2 rounded-2xl">
            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Start OTP</p>
            <p className="text-lg font-black text-brand-500 tracking-widest">{otp}</p>
          </div>
        )}
      </div>

      <div className="pt-3 border-t border-slate-200/60 dark:border-slate-800 flex items-center justify-between text-xs">
        <div className="flex items-center space-x-2 text-slate-500 dark:text-slate-400 font-medium">
          <Award className="w-4 h-4 text-brand-500" />
          <span>{driver.trips || '2,400+'} Rides Completed</span>
        </div>

        <div className="flex items-center space-x-2">
          <a
            href={`tel:${driver.phone}`}
            className="p-2.5 bg-brand-500 hover:bg-brand-600 text-white rounded-xl shadow-md transition-all hover:scale-105"
          >
            <Phone className="w-4 h-4" />
          </a>
          <button
            onClick={() => alert(`Messaging ${driver.name}`)}
            className="p-2.5 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 text-slate-700 dark:text-slate-200 rounded-xl transition-all"
          >
            <MessageSquare className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default DriverCard;
