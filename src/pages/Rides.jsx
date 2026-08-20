import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Bike, Car, Crown, Clock, ShieldCheck, ArrowRight, Check } from 'lucide-react';
import Button from '../components/Button';
import { RIDE_RATES, calculateFare } from '../utils/fareCalculator';
import LocationInput from '../components/LocationInput';

const Rides = () => {
  const [distanceKm, setDistanceKm] = useState(10);
  const [durationMins, setDurationMins] = useState(25);

  const rideTypes = Object.values(RIDE_RATES);

  return (
    <div className="pt-28 pb-16 space-y-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto space-y-4">
        <span className="px-3.5 py-1.5 rounded-full bg-brand-500/10 text-brand-600 dark:text-brand-400 text-xs font-bold uppercase tracking-wider">
          Ride Options & Fleet
        </span>
        <h1 className="text-4xl font-black text-slate-900 dark:text-white tracking-tight">
          Transparent Pricing for Every Trip
        </h1>
        <p className="text-slate-600 dark:text-slate-300 text-base font-medium">
          Choose from quick solo bikes, economical autos, comfortable family cabs, or luxury SUVs. No hidden fees ever.
        </p>
      </div>

      {/* Interactive Estimator Slider */}
      <div className="glass-panel p-6 sm:p-8 rounded-3xl max-w-4xl mx-auto space-y-6">
        <h3 className="text-lg font-extrabold text-slate-900 dark:text-white text-center">
          Interactive Trip Fare Calculator
        </h3>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <div className="space-y-2">
            <div className="flex justify-between text-xs font-bold text-slate-600 dark:text-slate-300">
              <span>Estimated Distance</span>
              <span className="text-brand-500">{distanceKm} km</span>
            </div>
            <input
              type="range"
              min="1"
              max="50"
              value={distanceKm}
              onChange={(e) => setDistanceKm(Number(e.target.value))}
              className="w-full accent-brand-500"
            />
          </div>

          <div className="space-y-2">
            <div className="flex justify-between text-xs font-bold text-slate-600 dark:text-slate-300">
              <span>Estimated Duration</span>
              <span className="text-brand-500">{durationMins} mins</span>
            </div>
            <input
              type="range"
              min="5"
              max="120"
              value={durationMins}
              onChange={(e) => setDurationMins(Number(e.target.value))}
              className="w-full accent-brand-500"
            />
          </div>
        </div>

        {/* Calculated Prices Comparison Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 pt-4">
          {rideTypes.map((ride) => {
            const fare = calculateFare(ride.id, distanceKm, durationMins);
            return (
              <div
                key={ride.id}
                className="p-4 rounded-2xl bg-slate-50 dark:bg-dark-input border border-slate-200 dark:border-slate-800 text-center space-y-2"
              >
                <p className="text-xs font-bold uppercase text-slate-400">{ride.name}</p>
                <p className="text-2xl font-black text-slate-900 dark:text-white">₹{fare.total}</p>
                <p className="text-[10px] text-slate-400">Includes taxes & platform fee</p>
              </div>
            );
          })}
        </div>
      </div>

      {/* Fleet Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {rideTypes.map((ride) => (
          <motion.div
            key={ride.id}
            whileHover={{ y: -4 }}
            className="glass-panel p-6 sm:p-8 rounded-3xl space-y-6 flex flex-col justify-between"
          >
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className="w-12 h-12 rounded-2xl bg-brand-500/10 text-brand-500 flex items-center justify-center font-bold">
                    <Bike className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="text-xl font-extrabold text-slate-900 dark:text-white">
                      {ride.name}
                    </h3>
                    <p className="text-xs font-semibold text-slate-400">{ride.capacity}</p>
                  </div>
                </div>
                <span className="px-3 py-1 bg-brand-500/10 text-brand-500 text-xs font-bold rounded-full">
                  ETA ~ {ride.etaMinutes} mins
                </span>
              </div>

              <p className="text-sm text-slate-600 dark:text-slate-300 font-medium">
                {ride.tagline}
              </p>

              <div className="space-y-2 text-xs text-slate-600 dark:text-slate-400">
                <div className="flex items-center justify-between py-1.5 border-b border-slate-100 dark:border-slate-800">
                  <span>Base Fare</span>
                  <span className="font-bold text-slate-800 dark:text-slate-100">₹{ride.baseFare}</span>
                </div>
                <div className="flex items-center justify-between py-1.5 border-b border-slate-100 dark:border-slate-800">
                  <span>Distance Rate</span>
                  <span className="font-bold text-slate-800 dark:text-slate-100">₹{ride.perKmRate} / km</span>
                </div>
                <div className="flex items-center justify-between py-1.5 border-b border-slate-100 dark:border-slate-800">
                  <span>Time Rate</span>
                  <span className="font-bold text-slate-800 dark:text-slate-100">₹{ride.perMinRate} / min</span>
                </div>
              </div>
            </div>

            <Link to="/book-ride">
              <Button variant="primary" fullWidth icon={ArrowRight}>
                Book {ride.name}
              </Button>
            </Link>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default Rides;
