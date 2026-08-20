import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle2, ArrowRight, ArrowLeft, ShieldCheck, MapPin, Clock, CreditCard, Sparkles, Navigation } from 'lucide-react';
import { useRide } from '../context/RideContext';
import LocationInput from '../components/LocationInput';
import RideSelector from '../components/RideSelector';
import Button from '../components/Button';
import { calculateEstimatedDistanceAndTime, calculateFare } from '../utils/fareCalculator';

const BookRide = () => {
  const [step, setStep] = useState(1);
  const { pickup, setPickup, destination, setDestination, selectedRideType, setSelectedRideType, createBooking } = useRide();
  const [paymentMode, setPaymentMode] = useState('UPI / Wallet');
  const [loading, setLoading] = useState(false);
  const [confirmedRide, setConfirmedRide] = useState(null);

  const navigate = useNavigate();

  const { distanceKm, durationMins } = calculateEstimatedDistanceAndTime(pickup, destination);
  const fareDetails = calculateFare(selectedRideType, distanceKm, durationMins);

  const handleNextStep = () => {
    if (step === 1 && (!pickup || !destination)) return;
    setStep((prev) => prev + 1);
  };

  const handlePrevStep = () => {
    setStep((prev) => prev - 1);
  };

  const handleConfirmRide = () => {
    setLoading(true);
    setTimeout(() => {
      const newBooking = createBooking(fareDetails);
      setConfirmedRide(newBooking);
      setLoading(false);
      setStep(5); // Success step
    }, 1200);
  };

  return (
    <div className="pt-28 pb-16 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
      {/* Wizard Progress Bar */}
      {step < 5 && (
        <div className="glass-panel p-4 rounded-2xl flex items-center justify-between">
          <div className="flex items-center space-x-2">
            {[1, 2, 3, 4].map((s) => (
              <React.Fragment key={s}>
                <div
                  className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-xs transition-all ${
                    step >= s
                      ? 'bg-brand-500 text-white shadow-glow-teal'
                      : 'bg-slate-200 dark:bg-slate-800 text-slate-500'
                  }`}
                >
                  {s}
                </div>
                {s < 4 && (
                  <div
                    className={`h-1 w-8 sm:w-16 rounded-full transition-colors ${
                      step > s ? 'bg-brand-500' : 'bg-slate-200 dark:bg-slate-800'
                    }`}
                  />
                )}
              </React.Fragment>
            ))}
          </div>

          <span className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider">
            Step {step} of 4
          </span>
        </div>
      )}

      {/* Step Content Container */}
      <div className="glass-panel p-6 sm:p-10 rounded-3xl relative min-h-[420px]">
        <AnimatePresence mode="wait">
          {/* STEP 1: Locations */}
          {step === 1 && (
            <motion.div
              key="step1"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="space-y-6"
            >
              <div>
                <h2 className="text-2xl font-black text-slate-900 dark:text-white">
                  Where are you heading?
                </h2>
                <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                  Enter pickup point and drop destination to get exact fare estimates.
                </p>
              </div>

              <div className="space-y-4">
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
              </div>

              {/* Estimate Summary */}
              {pickup && destination && (
                <div className="p-4 bg-slate-50 dark:bg-dark-input rounded-2xl flex items-center justify-between text-xs text-slate-600 dark:text-slate-300">
                  <div>
                    <span className="text-slate-400">Est. Distance:</span>{' '}
                    <span className="font-bold text-slate-800 dark:text-white">{distanceKm} km</span>
                  </div>
                  <div>
                    <span className="text-slate-400">Est. Travel Time:</span>{' '}
                    <span className="font-bold text-slate-800 dark:text-white">{durationMins} mins</span>
                  </div>
                </div>
              )}

              <div className="pt-4 flex justify-end">
                <Button
                  variant="primary"
                  size="lg"
                  disabled={!pickup || !destination}
                  onClick={handleNextStep}
                  icon={ArrowRight}
                >
                  Continue to Select Vehicle
                </Button>
              </div>
            </motion.div>
          )}

          {/* STEP 2: Ride Type */}
          {step === 2 && (
            <motion.div
              key="step2"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="space-y-6"
            >
              <div>
                <h2 className="text-2xl font-black text-slate-900 dark:text-white">
                  Choose Your Ride Type
                </h2>
                <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                  Select the vehicle that best fits your timing and budget.
                </p>
              </div>

              <RideSelector
                selectedRideType={selectedRideType}
                onSelectRideType={setSelectedRideType}
                distanceKm={distanceKm}
                durationMins={durationMins}
              />

              <div className="pt-4 flex items-center justify-between">
                <Button variant="outline" onClick={handlePrevStep} icon={ArrowLeft}>
                  Back
                </Button>
                <Button variant="primary" size="lg" onClick={handleNextStep} icon={ArrowRight}>
                  Review Fare Breakdown
                </Button>
              </div>
            </motion.div>
          )}

          {/* STEP 3: Fare Breakdown */}
          {step === 3 && (
            <motion.div
              key="step3"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="space-y-6"
            >
              <div>
                <h2 className="text-2xl font-black text-slate-900 dark:text-white">
                  Transparent Fare Breakdown
                </h2>
                <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                  Itemized pricing details with zero hidden fees.
                </p>
              </div>

              <div className="p-6 bg-slate-50 dark:bg-dark-input rounded-3xl space-y-3 text-sm">
                <div className="flex justify-between text-slate-600 dark:text-slate-300">
                  <span>Base Minimum Fare</span>
                  <span className="font-bold">₹{fareDetails.baseFare}</span>
                </div>
                <div className="flex justify-between text-slate-600 dark:text-slate-300">
                  <span>Distance Charge ({distanceKm} km)</span>
                  <span className="font-bold">₹{fareDetails.distanceCharge}</span>
                </div>
                <div className="flex justify-between text-slate-600 dark:text-slate-300">
                  <span>Time Charge ({durationMins} mins)</span>
                  <span className="font-bold">₹{fareDetails.timeCharge}</span>
                </div>
                <div className="flex justify-between text-slate-600 dark:text-slate-300">
                  <span>Safety & Platform Fee</span>
                  <span className="font-bold">₹{fareDetails.platformFee}</span>
                </div>
                <div className="flex justify-between text-slate-600 dark:text-slate-300">
                  <span>GST Tax (5%)</span>
                  <span className="font-bold">₹{fareDetails.gstTax}</span>
                </div>

                <div className="pt-4 border-t border-slate-200 dark:border-slate-800 flex justify-between items-center text-lg font-black text-slate-900 dark:text-white">
                  <span>Total Payable Fare</span>
                  <span className="text-brand-500 text-2xl">₹{fareDetails.total}</span>
                </div>
              </div>

              <div className="pt-4 flex items-center justify-between">
                <Button variant="outline" onClick={handlePrevStep} icon={ArrowLeft}>
                  Back
                </Button>
                <Button variant="primary" size="lg" onClick={handleNextStep} icon={ArrowRight}>
                  Proceed to Confirmation
                </Button>
              </div>
            </motion.div>
          )}

          {/* STEP 4: Confirmation */}
          {step === 4 && (
            <motion.div
              key="step4"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="space-y-6"
            >
              <div>
                <h2 className="text-2xl font-black text-slate-900 dark:text-white">
                  Confirm Booking Details
                </h2>
                <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                  Review your route and select payment method to dispatch your captain.
                </p>
              </div>

              <div className="space-y-4">
                {/* Route Summary Box */}
                <div className="p-4 bg-slate-50 dark:bg-dark-input rounded-2xl space-y-3 text-xs">
                  <div className="flex items-center space-x-3">
                    <div className="w-3 h-3 rounded-full bg-emerald-500" />
                    <div>
                      <p className="font-bold text-slate-400 uppercase">Pickup Point</p>
                      <p className="text-sm font-bold text-slate-800 dark:text-slate-100">{pickup}</p>
                    </div>
                  </div>

                  <div className="flex items-center space-x-3">
                    <MapPin className="w-3.5 h-3.5 text-accent-500" />
                    <div>
                      <p className="font-bold text-slate-400 uppercase">Destination</p>
                      <p className="text-sm font-bold text-slate-800 dark:text-slate-100">{destination}</p>
                    </div>
                  </div>
                </div>

                {/* Ride Type & Payment Mode Selection */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="p-4 bg-slate-50 dark:bg-dark-input rounded-2xl space-y-1">
                    <p className="text-[10px] font-bold text-slate-400 uppercase">Selected Vehicle</p>
                    <p className="text-sm font-extrabold text-slate-900 dark:text-white capitalize">{selectedRideType} Taxi</p>
                    <p className="text-xs text-brand-500 font-bold">₹{fareDetails.total} Total</p>
                  </div>

                  <div className="p-4 bg-slate-50 dark:bg-dark-input rounded-2xl space-y-2">
                    <p className="text-[10px] font-bold text-slate-400 uppercase">Payment Mode</p>
                    <select
                      value={paymentMode}
                      onChange={(e) => setPaymentMode(e.target.value)}
                      className="w-full bg-white dark:bg-dark-card border border-slate-200 dark:border-slate-800 rounded-xl p-2 text-xs font-bold text-slate-800 dark:text-slate-100 focus:outline-none"
                    >
                      <option value="UPI / Wallet">GooglePay / PhonePe UPI</option>
                      <option value="Cash">Cash to Captain</option>
                      <option value="Credit Card">Credit / Debit Card</option>
                    </select>
                  </div>
                </div>
              </div>

              <div className="pt-4 flex items-center justify-between">
                <Button variant="outline" onClick={handlePrevStep} icon={ArrowLeft}>
                  Back
                </Button>
                <Button
                  variant="primary"
                  size="lg"
                  loading={loading}
                  onClick={handleConfirmRide}
                  icon={CheckCircle2}
                >
                  Confirm & Dispatch Ride
                </Button>
              </div>
            </motion.div>
          )}

          {/* STEP 5: Animated Success Confirmation */}
          {step === 5 && (
            <motion.div
              key="step5"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="text-center py-10 space-y-6"
            >
              {/* Checkmark Animation */}
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: 'spring', stiffness: 200, damping: 12 }}
                className="w-24 h-24 rounded-full bg-emerald-500 text-white flex items-center justify-center mx-auto shadow-glow-teal"
              >
                <CheckCircle2 className="w-14 h-14" />
              </motion.div>

              <div>
                <h2 className="text-3xl font-black text-slate-900 dark:text-white">
                  Ride Confirmed!
                </h2>
                <p className="text-sm font-semibold text-brand-600 dark:text-brand-400 mt-1">
                  Your captain is on the way to your pickup location.
                </p>
              </div>

              {/* Ride Summary Pill */}
              {confirmedRide && (
                <div className="max-w-md mx-auto p-4 bg-slate-50 dark:bg-dark-input rounded-2xl text-left space-y-2 text-xs">
                  <div className="flex justify-between font-bold text-slate-700 dark:text-slate-200">
                    <span>Booking ID:</span>
                    <span>#{confirmedRide.id}</span>
                  </div>
                  <div className="flex justify-between text-slate-500">
                    <span>Assigned Captain:</span>
                    <span className="font-bold text-slate-800 dark:text-slate-100">{confirmedRide.driver.name}</span>
                  </div>
                  <div className="flex justify-between text-slate-500">
                    <span>Vehicle:</span>
                    <span>{confirmedRide.driver.vehicleModel} ({confirmedRide.driver.vehicleNumber})</span>
                  </div>
                </div>
              )}

              <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-4">
                <Button
                  variant="primary"
                  size="lg"
                  onClick={() => navigate('/ride-status')}
                  icon={ArrowRight}
                >
                  Track Captain Live
                </Button>
                <Button variant="outline" size="lg" onClick={() => navigate('/dashboard')}>
                  Go to Dashboard
                </Button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default BookRide;
