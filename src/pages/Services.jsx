import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight, CheckCircle2, Shield, Zap, Compass, Star } from 'lucide-react';
import Button from '../components/Button';
import { SERVICES_DATA } from '../data/services';

const Services = () => {
  return (
    <div className="pt-28 pb-16 space-y-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto space-y-4">
        <span className="px-3.5 py-1.5 rounded-full bg-brand-500/10 text-brand-600 dark:text-brand-400 text-xs font-bold uppercase tracking-wider">
          Services & Capabilities
        </span>
        <h1 className="text-4xl font-black text-slate-900 dark:text-white tracking-tight">
          Tailored Mobility Solutions for Every Need
        </h1>
        <p className="text-slate-600 dark:text-slate-300 text-base font-medium">
          From quick solo bike taxi hops to executive luxury SUV airport transfers, discover how RideFlow powers your daily movement.
        </p>
      </div>

      {/* Grid of Premium Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {SERVICES_DATA.map((service) => (
          <motion.div
            key={service.id}
            whileHover={{ y: -8 }}
            className="group glass-panel p-8 rounded-3xl space-y-6 border border-slate-200/80 dark:border-slate-800 hover:border-brand-500/50 hover:shadow-card-hover transition-all duration-300 flex flex-col justify-between"
          >
            <div className="space-y-6">
              {/* Image Banner with Hover Scale */}
              <div className="relative h-56 rounded-2xl overflow-hidden bg-slate-100 dark:bg-slate-800">
                <img
                  src={service.image}
                  alt={service.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute top-4 left-4 bg-slate-900/80 backdrop-blur-md text-white text-xs font-extrabold px-3 py-1 rounded-full uppercase tracking-wider">
                  {service.badge}
                </div>
              </div>

              <div>
                <h3 className="text-2xl font-black text-slate-900 dark:text-white group-hover:text-brand-500 transition-colors">
                  {service.title}
                </h3>
                <p className="text-xs font-bold text-brand-600 dark:text-brand-400 mt-1">
                  {service.subtitle}
                </p>
                <p className="text-sm text-slate-600 dark:text-slate-300 mt-3 leading-relaxed">
                  {service.description}
                </p>
              </div>

              {/* Feature Checklist */}
              <div className="space-y-2 pt-2 border-t border-slate-100 dark:border-slate-800">
                {service.features.map((feat, idx) => (
                  <div key={idx} className="flex items-center space-x-2 text-xs font-semibold text-slate-700 dark:text-slate-300">
                    <CheckCircle2 className="w-4 h-4 text-brand-500 flex-shrink-0" />
                    <span>{feat}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="pt-6 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between">
              <div>
                <p className="text-[10px] text-slate-400 uppercase font-bold">Standard Pricing</p>
                <p className="text-sm font-extrabold text-slate-900 dark:text-white">
                  {service.pricing}
                </p>
              </div>
              <Link to="/book-ride">
                <Button variant="primary" size="md" icon={ArrowRight}>
                  Book Service
                </Button>
              </Link>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default Services;
