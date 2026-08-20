import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Search, Filter, Clock, MapPin, CheckCircle2, XCircle, ArrowRight, ShieldCheck } from 'lucide-react';
import { useRide } from '../context/RideContext';
import Button from '../components/Button';
import Modal from '../components/Modal';

const MyRides = () => {
  const { ridesHistory } = useRide();
  const [filter, setFilter] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedRideModal, setSelectedRideModal] = useState(null);

  // Filtering
  const filteredRides = ridesHistory.filter((ride) => {
    const matchesFilter = filter === 'All' || ride.status === filter;
    const matchesSearch =
      ride.pickup.toLowerCase().includes(searchQuery.toLowerCase()) ||
      ride.destination.toLowerCase().includes(searchQuery.toLowerCase()) ||
      ride.driver.name.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  return (
    <div className="pt-28 pb-16 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-black text-slate-900 dark:text-white">
            My Ride History
          </h1>
          <p className="text-sm font-medium text-slate-500 dark:text-slate-400 mt-1">
            Review past bookings, download e-receipts, or re-book frequent routes.
          </p>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="glass-panel p-4 rounded-3xl flex flex-col sm:flex-row items-center justify-between gap-4">
        {/* Search */}
        <div className="relative w-full sm:w-80">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search by location or driver..."
            className="w-full pl-10 pr-4 py-2.5 bg-slate-50 dark:bg-dark-input border border-slate-200 dark:border-slate-800 rounded-xl text-xs font-medium focus:ring-2 focus:ring-brand-500 focus:outline-none"
          />
        </div>

        {/* Filter Pills */}
        <div className="flex items-center space-x-1 overflow-x-auto w-full sm:w-auto">
          {['All', 'Completed', 'Cancelled', 'Upcoming'].map((f) => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={`px-4 py-2 text-xs font-bold rounded-xl transition-all ${
                filter === f
                  ? 'bg-brand-500 text-white shadow-glow-teal'
                  : 'bg-slate-100 dark:bg-dark-input text-slate-600 dark:text-slate-400 hover:bg-slate-200 dark:hover:bg-slate-800'
              }`}
            >
              {f}
            </button>
          ))}
        </div>
      </div>

      {/* Rides List */}
      {filteredRides.length === 0 ? (
        <div className="glass-panel p-12 rounded-3xl text-center space-y-4">
          <div className="w-16 h-16 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-400 flex items-center justify-center mx-auto">
            <Clock className="w-8 h-8" />
          </div>
          <h3 className="text-xl font-bold text-slate-800 dark:text-slate-200">
            No Rides Found
          </h3>
          <p className="text-xs text-slate-500 dark:text-slate-400 max-w-sm mx-auto">
            No bookings match your selected filter or search term.
          </p>
        </div>
      ) : (
        <div className="space-y-4">
          {filteredRides.map((ride) => (
            <motion.div
              key={ride.id}
              whileHover={{ y: -2 }}
              className="glass-panel p-6 rounded-3xl space-y-4 border border-slate-200/80 dark:border-slate-800 hover:border-brand-300 transition-all cursor-pointer"
              onClick={() => setSelectedRideModal(ride)}
            >
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 border-b border-slate-100 dark:border-slate-800 text-xs">
                <div className="flex items-center space-x-3">
                  <span className="font-extrabold text-slate-900 dark:text-white">
                    #{ride.id}
                  </span>
                  <span className="text-slate-400">•</span>
                  <span className="text-slate-500 font-medium">
                    {ride.date} at {ride.time}
                  </span>
                </div>

                <div className="flex items-center space-x-3">
                  <span className="px-2.5 py-0.5 rounded-full text-[10px] font-extrabold uppercase bg-brand-500/10 text-brand-600 dark:text-brand-400">
                    {ride.rideTypeName || ride.rideType}
                  </span>
                  <span
                    className={`px-3 py-1 rounded-full text-[10px] font-bold ${
                      ride.status === 'Completed'
                        ? 'bg-emerald-100 dark:bg-emerald-950/50 text-emerald-600 dark:text-emerald-400'
                        : ride.status === 'Cancelled'
                        ? 'bg-red-100 dark:bg-red-950/50 text-red-600 dark:text-red-400'
                        : 'bg-amber-100 dark:bg-amber-950/50 text-amber-600 dark:text-amber-400'
                    }`}
                  >
                    {ride.status}
                  </span>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-12 gap-4 items-center">
                {/* Route */}
                <div className="md:col-span-7 space-y-2 text-xs">
                  <div className="flex items-center space-x-2">
                    <div className="w-2.5 h-2.5 rounded-full bg-emerald-500" />
                    <span className="font-bold text-slate-800 dark:text-slate-200 truncate">
                      {ride.pickup}
                    </span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <MapPin className="w-3.5 h-3.5 text-accent-500" />
                    <span className="font-bold text-slate-800 dark:text-slate-200 truncate">
                      {ride.destination}
                    </span>
                  </div>
                </div>

                {/* Driver */}
                <div className="md:col-span-3 flex items-center space-x-3">
                  <img
                    src={ride.driver.photo}
                    alt={ride.driver.name}
                    className="w-9 h-9 rounded-full object-cover ring-2 ring-brand-500"
                  />
                  <div>
                    <p className="text-xs font-bold text-slate-800 dark:text-slate-100">
                      {ride.driver.name}
                    </p>
                    <p className="text-[10px] text-slate-400">
                      {ride.driver.vehicleModel}
                    </p>
                  </div>
                </div>

                {/* Fare & CTA */}
                <div className="md:col-span-2 text-right">
                  <p className="text-lg font-black text-slate-900 dark:text-white">
                    ₹{ride.fare}
                  </p>
                  <span className="text-[10px] font-bold text-brand-500 flex items-center justify-end hover:underline">
                    View Details <ArrowRight className="w-3 h-3 ml-1" />
                  </span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      )}

      {/* Ride Detail Receipt Modal */}
      {selectedRideModal && (
        <Modal
          isOpen={!!selectedRideModal}
          onClose={() => setSelectedRideModal(null)}
          title={`E-Receipt #${selectedRideModal.id}`}
        >
          <div className="space-y-4 text-xs">
            <div className="p-4 bg-slate-50 dark:bg-dark-input rounded-2xl space-y-2">
              <div className="flex justify-between text-slate-500">
                <span>Date & Time</span>
                <span className="font-bold text-slate-800 dark:text-slate-100">{selectedRideModal.date} • {selectedRideModal.time}</span>
              </div>
              <div className="flex justify-between text-slate-500">
                <span>Vehicle Type</span>
                <span className="font-bold text-brand-500 capitalize">{selectedRideModal.rideType}</span>
              </div>
              <div className="flex justify-between text-slate-500">
                <span>Distance Covered</span>
                <span className="font-bold text-slate-800 dark:text-slate-100">{selectedRideModal.distanceKm} km</span>
              </div>
              <div className="flex justify-between text-slate-500">
                <span>Payment Method</span>
                <span className="font-bold text-slate-800 dark:text-slate-100">{selectedRideModal.paymentMethod}</span>
              </div>
            </div>

            <div className="pt-2 flex justify-between items-center text-sm font-black border-t border-slate-200 dark:border-slate-800">
              <span>Total Paid Amount</span>
              <span className="text-brand-500 text-xl">₹{selectedRideModal.fare}</span>
            </div>

            <Button
              variant="primary"
              fullWidth
              onClick={() => {
                setSelectedRideModal(null);
                alert(`E-Receipt downloaded for Ride #${selectedRideModal.id}`);
              }}
            >
              Download PDF E-Receipt
            </Button>
          </div>
        </Modal>
      )}
    </div>
  );
};

export default MyRides;
