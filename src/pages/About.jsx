import React from 'react';
import { motion } from 'framer-motion';
import { ShieldCheck, Zap, Heart, Award, Users, Globe, Cpu } from 'lucide-react';
import StatCounter from '../components/StatCounter';

const About = () => {
  return (
    <div className="pt-28 pb-16 space-y-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      {/* Hero Header */}
      <div className="text-center max-w-3xl mx-auto space-y-4">
        <span className="px-3.5 py-1.5 rounded-full bg-brand-500/10 text-brand-600 dark:text-brand-400 text-xs font-bold uppercase tracking-wider">
          Our Story & Mission
        </span>
        <h1 className="text-4xl sm:text-5xl font-black text-slate-900 dark:text-white tracking-tight">
          Redefining How India Moves Every Single Day
        </h1>
        <p className="text-slate-600 dark:text-slate-300 text-base sm:text-lg font-medium leading-relaxed">
          RideFlow was founded with a singular vision: to liberate urban commuters from traffic deadlock through technology-driven, affordable, and safe mobility solutions.
        </p>
      </div>

      {/* Animated Metrics Counter Grid */}
      <section className="grid grid-cols-2 md:grid-cols-4 gap-6">
        <StatCounter value="1000000" suffix="+" label="Rides Completed" />
        <StatCounter value="50000" suffix="+" label="Verified Captains" />
        <StatCounter value="25" suffix="+" label="Cities Connected" />
        <StatCounter value="4.8" suffix="/5" label="Customer Rating" />
      </section>

      {/* Mission & Vision Split */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <motion.div
          whileHover={{ y: -4 }}
          className="glass-panel p-8 rounded-3xl space-y-4 border-l-4 border-brand-500"
        >
          <div className="w-12 h-12 rounded-2xl bg-brand-500/10 text-brand-500 flex items-center justify-center">
            <Zap className="w-6 h-6" />
          </div>
          <h3 className="text-2xl font-black text-slate-900 dark:text-white">Our Mission</h3>
          <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed font-medium">
            To provide fast, reliable, and affordable micro-mobility options to every urban traveler while empowering hundreds of thousands of independent captains with fair earnings.
          </p>
        </motion.div>

        <motion.div
          whileHover={{ y: -4 }}
          className="glass-panel p-8 rounded-3xl space-y-4 border-l-4 border-accent-500"
        >
          <div className="w-12 h-12 rounded-2xl bg-accent-500/10 text-accent-500 flex items-center justify-center">
            <Globe className="w-6 h-6" />
          </div>
          <h3 className="text-2xl font-black text-slate-900 dark:text-white">Our Vision</h3>
          <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed font-medium">
            To build zero-friction, eco-conscious transport networks across 100+ tier-1, tier-2, and tier-3 cities, making personal vehicle dependency obsolete.
          </p>
        </motion.div>
      </div>

      {/* Core Values */}
      <div className="space-y-8">
        <div className="text-center max-w-xl mx-auto">
          <h2 className="text-3xl font-black text-slate-900 dark:text-white">
            Why Riders Choose RideFlow
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="glass-panel p-6 rounded-3xl space-y-3">
            <ShieldCheck className="w-8 h-8 text-brand-500" />
            <h4 className="text-lg font-bold text-slate-900 dark:text-white">Uncompromising Safety</h4>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              100% background-verified captains, helmet enforcement, and round-the-clock emergency response teams.
            </p>
          </div>

          <div className="glass-panel p-6 rounded-3xl space-y-3">
            <Cpu className="w-8 h-8 text-brand-500" />
            <h4 className="text-lg font-bold text-slate-900 dark:text-white">Smart AI Dispatch</h4>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              Machine learning algorithms match you with the nearest captain within 15 seconds.
            </p>
          </div>

          <div className="glass-panel p-6 rounded-3xl space-y-3">
            <Heart className="w-8 h-8 text-brand-500" />
            <h4 className="text-lg font-bold text-slate-900 dark:text-white">Captain-First Ethics</h4>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              Lowest commission rates in the industry ensure our driver partners earn up to 40% more.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
