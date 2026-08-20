import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Compass, Navigation, ArrowLeft, Home } from 'lucide-react';
import Button from '../components/Button';

const NotFound = () => {
  return (
    <div className="min-h-screen pt-24 pb-16 flex items-center justify-center max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="max-w-lg space-y-6 glass-panel p-10 sm:p-12 rounded-3xl shadow-2xl"
      >
        <div className="w-20 h-20 rounded-3xl bg-brand-500/10 text-brand-500 flex items-center justify-center mx-auto animate-float">
          <Navigation className="w-10 h-10 transform -rotate-45" />
        </div>

        <div className="space-y-2">
          <h1 className="text-6xl font-black text-transparent bg-clip-text bg-gradient-to-r from-brand-500 to-teal-400">
            404
          </h1>
          <h2 className="text-2xl font-extrabold text-slate-900 dark:text-white">
            Off-Route Destination
          </h2>
          <p className="text-sm text-slate-500 dark:text-slate-400 leading-relaxed max-w-xs mx-auto">
            Oops! The page or ride route you are looking for does not exist or has been relocated.
          </p>
        </div>

        <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-3">
          <Link to="/" className="w-full sm:w-auto">
            <Button variant="primary" fullWidth icon={Home}>
              Back to Home
            </Button>
          </Link>
          <Link to="/book-ride" className="w-full sm:w-auto">
            <Button variant="outline" fullWidth icon={Compass}>
              Book a Ride
            </Button>
          </Link>
        </div>
      </motion.div>
    </div>
  );
};

export default NotFound;
