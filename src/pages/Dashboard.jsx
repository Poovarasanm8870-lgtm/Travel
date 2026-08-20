import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Compass, Clock, Bookmark, CreditCard, ShieldCheck, ArrowRight, Home, Briefcase, MapPin, CheckCircle2 } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useRide } from '../context/RideContext';
import BookingCard from '../components/BookingCard';
import Button from '../components/Button';

const Dashboard = () => {
  const { user } = useAuth();
  const { ridesHistory, savedPlaces, activeRide } = useRide();
  const navigate = useNavigate();

  // Statistics calculation
  const totalRides = ridesHistory.length;
  const completedRides = ridesHistory.filter((r) => r.status === 'Completed').length;
  const cancelledRides = ridesHistory.filter((r) => r.status === 'Cancelled').length;
  const totalSpent = ridesHistory.reduce((acc, r) => (r.status === 'Completed' ? acc + r.fare : acc), 0);

  const recentRides = ridesHistory.slice(0, 3);

  return (
    <div className="pt-28 pb-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
      {/* Welcome Banner */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-black text-slate-900 dark:text-white">
            Good day, {user?.name?.split(' ')[0] || 'Rider'} 👋
          </h1>
          <p className="text-sm font-medium text-slate-500 dark:text-slate-400 mt-1">
            Where would you like to go today?
          </p>
        </div>
        <div className="flex items-center space-x-3">
          <Link to="/book-ride">
            <Button variant="primary" size="md" icon={Compass}>
              Book New Ride
            </Button>
          </Link>
        </div>
      </div>

      {/* Active Live Ride Tracker Banner if any */}
      {activeRide && activeRide.status !== 'Completed' && activeRide.status !== 'Cancelled' && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="p-5 rounded-3xl bg-gradient-to-r from-brand-600 to-teal-500 text-white shadow-xl flex flex-col sm:flex-row items-center justify-between gap-4"
        >
          <div className="flex items-center space-x-4">
            <div className="w-12 h-12 rounded-2xl bg-white/20 backdrop-blur-md flex items-center justify-center font-bold text-white">
              <Clock className="w-6 h-6 animate-spin" />
            </div>
            <div>
              <span className="text-[10px] uppercase tracking-widest font-extrabold bg-white/20 px-2 py-0.5 rounded-md">
                Active Booking Tracker
              </span>
              <h3 className="text-lg font-extrabold mt-0.5">Ride #{activeRide.id} is Active</h3>
              <p className="text-xs text-brand-100">{activeRide.pickup} → {activeRide.destination}</p>
            </div>
          </div>
          <Link to="/ride-status">
            <Button variant="secondary" size="sm" icon={ArrowRight}>
              Open Live Tracker
            </Button>
          </Link>
        </motion.div>
      )}

      {/* Statistics Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="glass-panel p-5 rounded-3xl space-y-1 border border-slate-200/80 dark:border-slate-800">
          <p className="text-xs font-bold text-slate-400 uppercase tracking-wider">Total Rides</p>
          <p className="text-2xl font-black text-slate-900 dark:text-white">{totalRides}</p>
        </div>

        <div className="glass-panel p-5 rounded-3xl space-y-1 border border-slate-200/80 dark:border-slate-800">
          <p className="text-xs font-bold text-emerald-500 uppercase tracking-wider">Completed</p>
          <p className="text-2xl font-black text-slate-900 dark:text-white">{completedRides}</p>
        </div>

        <div className="glass-panel p-5 rounded-3xl space-y-1 border border-slate-200/80 dark:border-slate-800">
          <p className="text-xs font-bold text-red-500 uppercase tracking-wider">Cancelled</p>
          <p className="text-2xl font-black text-slate-900 dark:text-white">{cancelledRides}</p>
        </div>

        <div className="glass-panel p-5 rounded-3xl space-y-1 border border-slate-200/80 dark:border-slate-800">
          <p className="text-xs font-bold text-brand-500 uppercase tracking-wider">Total Spent</p>
          <p className="text-2xl font-black text-slate-900 dark:text-white">₹{totalSpent}</p>
        </div>
      </div>

      {/* Main Grid: Quick Booking + Quick Saved Places */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Quick Booking Widget */}
        <div className="lg:col-span-7">
          <BookingCard />
        </div>

        {/* Quick Actions & Saved Places */}
        <div className="lg:col-span-5 space-y-6">
          {/* Saved Places Panel */}
          <div className="glass-panel p-6 rounded-3xl space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-base font-extrabold text-slate-900 dark:text-white flex items-center">
                <Bookmark className="w-4 h-4 mr-2 text-brand-500" />
                Saved Places
              </h3>
              <Link to="/saved-places" className="text-xs font-bold text-brand-500 hover:underline">
                Manage
              </Link>
            </div>

            <div className="space-y-2">
              {savedPlaces.map((place) => (
                <div
                  key={place.id}
                  onClick={() => navigate('/book-ride')}
                  className="p-3 bg-slate-50 dark:bg-dark-input hover:bg-slate-100 dark:hover:bg-slate-800 rounded-2xl cursor-pointer transition-colors flex items-center space-x-3"
                >
                  <div className="p-2 rounded-xl bg-brand-500/10 text-brand-500">
                    {place.type === 'Home' ? <Home className="w-4 h-4" /> : <Briefcase className="w-4 h-4" />}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-xs font-bold text-slate-800 dark:text-slate-100">{place.type}</p>
                    <p className="text-[11px] text-slate-400 truncate">{place.address}</p>
                  </div>
                  <ArrowRight className="w-4 h-4 text-slate-400" />
                </div>
              ))}
            </div>
          </div>

          {/* Safety Card */}
          <div className="glass-panel p-6 rounded-3xl bg-gradient-to-br from-brand-500/10 to-teal-500/5 space-y-3">
            <div className="flex items-center space-x-2 text-brand-600 dark:text-brand-400 font-bold text-sm">
              <ShieldCheck className="w-5 h-5" />
              <span>RideFlow Safety Guarantee</span>
            </div>
            <p className="text-xs text-slate-600 dark:text-slate-400">
              All rides are monitored with live GPS tracking. Share trip details with loved ones at any time.
            </p>
          </div>
        </div>
      </div>

      {/* Recent Rides Table */}
      <div className="glass-panel p-6 sm:p-8 rounded-3xl space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-extrabold text-slate-900 dark:text-white flex items-center">
            <Clock className="w-5 h-5 mr-2 text-brand-500" />
            Recent Trips
          </h3>
          <Link to="/my-rides" className="text-xs font-bold text-brand-500 hover:underline">
            View All Rides
          </Link>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-slate-200 dark:border-slate-800 text-[11px] font-extrabold text-slate-400 uppercase tracking-wider">
                <th className="py-3 px-3">Date & Time</th>
                <th className="py-3 px-3">Route</th>
                <th className="py-3 px-3">Type</th>
                <th className="py-3 px-3">Fare</th>
                <th className="py-3 px-3">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-800 text-xs">
              {recentRides.map((ride) => (
                <tr key={ride.id} className="hover:bg-slate-50/50 dark:hover:bg-dark-input/50 transition-colors">
                  <td className="py-3 px-3 font-semibold text-slate-800 dark:text-slate-200 whitespace-nowrap">
                    {ride.date} • {ride.time}
                  </td>
                  <td className="py-3 px-3 max-w-xs truncate text-slate-600 dark:text-slate-300">
                    {ride.pickup} → {ride.destination}
                  </td>
                  <td className="py-3 px-3 capitalize font-bold text-brand-600 dark:text-brand-400">
                    {ride.rideType}
                  </td>
                  <td className="py-3 px-3 font-black text-slate-900 dark:text-white">
                    ₹{ride.fare}
                  </td>
                  <td className="py-3 px-3">
                    <span
                      className={`px-2.5 py-1 rounded-full text-[10px] font-bold ${
                        ride.status === 'Completed'
                          ? 'bg-emerald-100 dark:bg-emerald-950/50 text-emerald-600 dark:text-emerald-400'
                          : 'bg-red-100 dark:bg-red-950/50 text-red-600 dark:text-red-400'
                      }`}
                    >
                      {ride.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
