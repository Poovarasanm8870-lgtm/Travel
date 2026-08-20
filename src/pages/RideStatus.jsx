import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { CheckCircle2, Clock, ShieldCheck, Phone, AlertTriangle, Navigation } from 'lucide-react';
import { useRide } from '../context/RideContext';
import DriverCard from '../components/DriverCard';
import MapPreview from '../components/MapPreview';
import Button from '../components/Button';

const STATUS_TIMELINE = [
  { id: 'confirmed', label: 'Ride Confirmed', desc: 'Captain accepted your ride request' },
  { id: 'assigned', label: 'Driver Assigned', desc: 'Captain Arjun is navigating to pickup' },
  { id: 'arriving', label: 'Driver Arriving', desc: 'Captain is 2 minutes away' },
  { id: 'started', label: 'Ride Started', desc: 'Trip to destination in progress' },
  { id: 'completed', label: 'Ride Completed', desc: 'Thank you for riding with RideFlow!' },
];

const RideStatus = () => {
  const { activeRide, cancelRide } = useRide();
  const [statusIndex, setStatusIndex] = useState(2); // Default 'Driver Arriving'
  const navigate = useNavigate();

  // Simulated status progression
  useEffect(() => {
    const timer = setInterval(() => {
      setStatusIndex((prev) => (prev < STATUS_TIMELINE.length - 1 ? prev + 1 : prev));
    }, 12000); // Progress every 12 seconds
    return () => clearInterval(timer);
  }, []);

  const currentStatus = STATUS_TIMELINE[statusIndex];
  const driverData = activeRide?.driver || {
    name: 'Arjun Kumar',
    rating: 4.9,
    vehicleModel: 'Honda Activa 6G',
    vehicleNumber: 'TN 01 AB 1234',
    photo: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=250&q=80',
    phone: '+91 98765 43210',
    trips: '1,840',
  };

  return (
    <div className="pt-28 pb-16 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
      {/* Top Banner Header */}
      <div className="glass-panel p-6 rounded-3xl flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="flex items-center space-x-4">
          <div className="w-12 h-12 rounded-2xl bg-brand-500 text-white flex items-center justify-center shadow-glow-teal">
            <Navigation className="w-6 h-6 animate-pulse" />
          </div>
          <div>
            <span className="text-[10px] font-extrabold uppercase tracking-widest text-brand-500">
              Live Ride Tracking
            </span>
            <h1 className="text-2xl font-black text-slate-900 dark:text-white">
              {currentStatus.label}
            </h1>
            <p className="text-xs text-slate-500 dark:text-slate-400">{currentStatus.desc}</p>
          </div>
        </div>

        <div className="flex items-center space-x-3">
          {statusIndex < 3 && (
            <Button
              variant="danger"
              size="sm"
              onClick={() => {
                if (activeRide) cancelRide(activeRide.id);
                navigate('/dashboard');
              }}
            >
              Cancel Ride
            </Button>
          )}
          <Button
            variant="outline"
            size="sm"
            onClick={() => setStatusIndex((prev) => (prev < 4 ? prev + 1 : 0))}
          >
            Simulate Next Status
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left Map View */}
        <div className="lg:col-span-7">
          <MapPreview
            pickupName={activeRide?.pickup || 'Indiranagar Metro'}
            dropName={activeRide?.destination || 'MG Road Metro'}
            rideType={activeRide?.rideType || 'bike'}
          />
        </div>

        {/* Right Details & Timeline */}
        <div className="lg:col-span-5 space-y-6">
          {/* Driver Information Card */}
          <DriverCard driver={driverData} otp="4821" />

          {/* Status Timeline */}
          <div className="glass-panel p-6 rounded-3xl space-y-4">
            <h3 className="text-sm font-bold text-slate-400 uppercase tracking-wider">
              Ride Progress Timeline
            </h3>

            <div className="space-y-4 relative pl-6 before:absolute before:left-2.5 before:top-2 before:bottom-2 before:w-0.5 before:bg-slate-200 dark:before:bg-slate-800">
              {STATUS_TIMELINE.map((item, idx) => {
                const isPassed = idx <= statusIndex;
                const isCurrent = idx === statusIndex;

                return (
                  <div key={item.id} className="relative flex items-start space-x-3">
                    <div
                      className={`absolute -left-6 top-1 w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-bold transition-all ${
                        isCurrent
                          ? 'bg-brand-500 text-white ring-4 ring-brand-500/30'
                          : isPassed
                          ? 'bg-emerald-500 text-white'
                          : 'bg-slate-200 dark:bg-slate-800 text-slate-400'
                      }`}
                    >
                      {isPassed ? '✓' : idx + 1}
                    </div>

                    <div>
                      <p
                        className={`text-xs font-extrabold ${
                          isCurrent
                            ? 'text-brand-600 dark:text-brand-400'
                            : isPassed
                            ? 'text-slate-800 dark:text-slate-200'
                            : 'text-slate-400'
                        }`}
                      >
                        {item.label}
                      </p>
                      <p className="text-[11px] text-slate-400">{item.desc}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RideStatus;
