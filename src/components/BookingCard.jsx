import React from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight, Sparkles, Navigation } from 'lucide-react';
import { useRide } from '../context/RideContext';
import LocationInput from './LocationInput';
import { RIDE_RATES, calculateEstimatedDistanceAndTime, calculateFare } from '../utils/fareCalculator';

const BookingCard = () => {
  const { pickup, setPickup, destination, setDestination, selectedRideType, setSelectedRideType } = useRide();
  const navigate = useNavigate();

  const { distanceKm, durationMins } = calculateEstimatedDistanceAndTime(pickup, destination);
  const fareDetails = calculateFare(selectedRideType, distanceKm, durationMins);

  const handleProceed = (e) => {
    e.preventDefault();
    if (!pickup || !destination) return;
    navigate('/book-ride');
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="glass-panel p-6 sm:p-8 rounded-3xl shadow-2xl relative overflow-hidden"
    >
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-2">
          <div className="w-8 h-8 rounded-lg bg-brand-500/10 text-brand-500 flex items-center justify-center font-bold">
            <Navigation className="w-4 h-4" />
          </div>
          <h2 className="text-lg font-extrabold text-slate-900 dark:text-white">
            Book Your Ride
          </h2>
        </div>
        <span className="inline-flex items-center text-xs font-semibold px-2.5 py-1 rounded-full bg-brand-500/10 text-brand-500">
          <Sparkles className="w-3 h-3 mr-1" /> Instant Match
        </span>
      </div>

      <form onSubmit={handleProceed} className="space-y-4">
        <LocationInput
          label="Pickup Location"
          value={pickup}
          onChange={setPickup}
          placeholder="Where are you?"
          iconType="pickup"
        />

        <LocationInput
          label="Destination"
          value={destination}
          onChange={setDestination}
          placeholder="Where are you going?"
          iconType="drop"
        />

        {/* Quick Ride Type Pill Selector */}
        <div>
          <label className="block text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-2">
            Select Ride Type
          </label>
          <div className="grid grid-cols-4 gap-2">
            {Object.values(RIDE_RATES).map((ride) => (
              <button
                key={ride.id}
                type="button"
                onClick={() => setSelectedRideType(ride.id)}
                className={`py-2 px-1 rounded-xl text-center border transition-all duration-200 ${
                  selectedRideType === ride.id
                    ? 'bg-brand-500 text-white border-brand-500 shadow-glow-teal font-bold'
                    : 'bg-slate-50 dark:bg-dark-input text-slate-700 dark:text-slate-300 border-slate-200 dark:border-slate-800 hover:border-brand-400'
                }`}
              >
                <p className="text-xs font-bold capitalize">{ride.id}</p>
                <p className="text-[10px] opacity-80 mt-0.5">₹{calculateFare(ride.id, distanceKm, durationMins).total}</p>
              </button>
            ))}
          </div>
        </div>

        {/* Estimate Bar */}
        <div className="p-3 bg-slate-100/70 dark:bg-dark-bg/60 rounded-xl flex items-center justify-between text-xs text-slate-600 dark:text-slate-300">
          <div>
            <span className="font-semibold text-slate-400">Est. Distance:</span>{' '}
            <span className="font-bold text-slate-800 dark:text-slate-100">{distanceKm} km</span>
          </div>
          <div>
            <span className="font-semibold text-slate-400">Est. Time:</span>{' '}
            <span className="font-bold text-slate-800 dark:text-slate-100">{durationMins} mins</span>
          </div>
          <div>
            <span className="font-semibold text-slate-400">Est. Fare:</span>{' '}
            <span className="font-extrabold text-brand-500 text-sm">₹{fareDetails.total}</span>
          </div>
        </div>

        <button
          type="submit"
          disabled={!pickup || !destination}
          className="w-full py-4 bg-brand-500 hover:bg-brand-600 disabled:opacity-50 text-white font-bold rounded-2xl shadow-lg shadow-brand-500/25 flex items-center justify-center space-x-2 transition-all hover:-translate-y-0.5 active:translate-y-0"
        >
          <span>Find Available Rides</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </form>
    </motion.div>
  );
};

export default BookingCard;
