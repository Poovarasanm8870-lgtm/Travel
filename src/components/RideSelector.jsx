import React from 'react';
import { RIDE_RATES, calculateFare } from '../utils/fareCalculator';
import RideCard from './RideCard';

const RideSelector = ({ selectedRideType, onSelectRideType, distanceKm, durationMins }) => {
  const rideTypes = Object.values(RIDE_RATES);

  return (
    <div className="space-y-3">
      <h3 className="text-sm font-bold text-slate-400 uppercase tracking-wider mb-2">
        Available Ride Options
      </h3>
      <div className="grid grid-cols-1 gap-3">
        {rideTypes.map((ride) => {
          const fareDetails = calculateFare(ride.id, distanceKm, durationMins);
          return (
            <RideCard
              key={ride.id}
              ride={ride}
              fareDetails={fareDetails}
              isSelected={selectedRideType === ride.id}
              onSelect={onSelectRideType}
            />
          );
        })}
      </div>
    </div>
  );
};

export default RideSelector;
