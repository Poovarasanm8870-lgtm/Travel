import React, { useState } from 'react';
import { MapPin, Navigation, X, Home, Briefcase, Clock } from 'lucide-react';
import { useRide } from '../context/RideContext';

const POPULAR_LOCATIONS = [
  'Indiranagar Metro Station, 100ft Road',
  'MG Road Metro Station, Church Street',
  'Koramangala 5th Block, Sony World Signal',
  'HSR Layout Sector 1, BDA Complex',
  'Bengaluru International Airport Terminal 1',
  'Whitefield ITPL Main Gate',
  'Electronic City Phase 1',
];

const LocationInput = ({ label, value, onChange, placeholder, iconType = 'pickup' }) => {
  const [isOpen, setIsOpen] = useState(false);
  const { savedPlaces } = useRide();

  const handleSelect = (loc) => {
    onChange(loc);
    setIsOpen(false);
  };

  return (
    <div className="relative w-full">
      <label className="block text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-1.5">
        {label}
      </label>
      <div className="relative flex items-center">
        <div className="absolute left-3.5 pointer-events-none">
          {iconType === 'pickup' ? (
            <div className="w-3 h-3 rounded-full bg-emerald-500 ring-4 ring-emerald-500/20" />
          ) : (
            <MapPin className="w-4 h-4 text-accent-500" />
          )}
        </div>
        <input
          type="text"
          value={value}
          onChange={(e) => {
            onChange(e.target.value);
            setIsOpen(true);
          }}
          onFocus={() => setIsOpen(true)}
          placeholder={placeholder}
          className="w-full pl-10 pr-9 py-3 bg-slate-50 dark:bg-dark-input border border-slate-200 dark:border-slate-800 rounded-xl text-sm font-medium text-slate-800 dark:text-slate-100 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-brand-500/50 focus:border-brand-500 transition-all"
        />
        {value && (
          <button
            type="button"
            onClick={() => onChange('')}
            className="absolute right-3 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200"
          >
            <X className="w-4 h-4" />
          </button>
        )}
      </div>

      {/* Autocomplete Dropdown */}
      {isOpen && (
        <>
          <div className="fixed inset-0 z-10" onClick={() => setIsOpen(false)} />
          <div className="absolute left-0 right-0 top-full mt-2 z-20 bg-white dark:bg-dark-card border border-slate-200 dark:border-slate-800 rounded-2xl shadow-xl max-h-64 overflow-y-auto p-2">
            {/* Saved Places Quick Select */}
            {savedPlaces && savedPlaces.length > 0 && (
              <div className="mb-2 pb-2 border-b border-slate-100 dark:border-slate-800">
                <p className="px-3 py-1 text-[11px] font-bold text-slate-400 uppercase tracking-wider">
                  Saved Places
                </p>
                {savedPlaces.map((place) => (
                  <button
                    key={place.id}
                    type="button"
                    onClick={() => handleSelect(place.address)}
                    className="w-full text-left px-3 py-2 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-xl flex items-center space-x-2.5 transition-colors"
                  >
                    {place.type === 'Home' ? (
                      <Home className="w-4 h-4 text-brand-500" />
                    ) : (
                      <Briefcase className="w-4 h-4 text-amber-500" />
                    )}
                    <div>
                      <p className="text-xs font-bold text-slate-700 dark:text-slate-200">{place.type}</p>
                      <p className="text-[11px] text-slate-400 truncate max-w-[220px]">{place.address}</p>
                    </div>
                  </button>
                ))}
              </div>
            )}

            {/* Popular Suggestions */}
            <div>
              <p className="px-3 py-1 text-[11px] font-bold text-slate-400 uppercase tracking-wider">
                Suggested Locations
              </p>
              {POPULAR_LOCATIONS.filter((loc) =>
                loc.toLowerCase().includes((value || '').toLowerCase())
              ).map((loc, idx) => (
                <button
                  key={idx}
                  type="button"
                  onClick={() => handleSelect(loc)}
                  className="w-full text-left px-3 py-2 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-xl flex items-center space-x-2.5 transition-colors text-xs font-medium text-slate-700 dark:text-slate-300"
                >
                  <Clock className="w-3.5 h-3.5 text-slate-400" />
                  <span className="truncate">{loc}</span>
                </button>
              ))}
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default LocationInput;
