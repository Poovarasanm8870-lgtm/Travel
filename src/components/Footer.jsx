import React from 'react';
import { Link } from 'react-router-dom';
import { Navigation, ShieldCheck, Heart, Smartphone, Apple } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-slate-900 text-slate-300 pt-16 pb-12 border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 pb-12 border-b border-slate-800">
          {/* Brand Info */}
          <div className="lg:col-span-2 space-y-4">
            <Link to="/" className="flex items-center space-x-3">
              <div className="w-10 h-10 rounded-xl bg-brand-500 flex items-center justify-center text-white shadow-glow-teal">
                <Navigation className="w-5 h-5 transform -rotate-45" />
              </div>
              <span className="text-2xl font-extrabold tracking-tight text-white">
                Ride<span className="text-brand-500">Flow</span>
              </span>
            </Link>
            <p className="text-sm text-slate-400 max-w-sm leading-relaxed">
              RideFlow is Next-Gen urban mobility built for speed, safety, and transparent pricing. Move smarter through city traffic with verified captains.
            </p>
            <div className="flex items-center space-x-3 text-xs text-brand-400 font-semibold pt-2">
              <ShieldCheck className="w-4 h-4" />
              <span>100% Verified Captains & 24/7 Safety Assistance</span>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-3">
            <h4 className="text-sm font-bold text-white uppercase tracking-wider">Company</h4>
            <ul className="space-y-2 text-sm text-slate-400">
              <li>
                <Link to="/about" className="hover:text-brand-400 transition-colors">
                  About Us
                </Link>
              </li>
              <li>
                <Link to="/services" className="hover:text-brand-400 transition-colors">
                  Services & Fleet
                </Link>
              </li>
              <li>
                <Link to="/contact" className="hover:text-brand-400 transition-colors">
                  Contact & Support
                </Link>
              </li>
              <li>
                <a href="#careers" className="hover:text-brand-400 transition-colors">
                  Captain Careers
                </a>
              </li>
            </ul>
          </div>

          {/* Services */}
          <div className="space-y-3">
            <h4 className="text-sm font-bold text-white uppercase tracking-wider">Our Fleet</h4>
            <ul className="space-y-2 text-sm text-slate-400">
              <li>
                <Link to="/book-ride" className="hover:text-brand-400 transition-colors">
                  RideFlow Bike Taxi
                </Link>
              </li>
              <li>
                <Link to="/book-ride" className="hover:text-brand-400 transition-colors">
                  RideFlow Auto Meter
                </Link>
              </li>
              <li>
                <Link to="/book-ride" className="hover:text-brand-400 transition-colors">
                  RideFlow Sedan / Hatch
                </Link>
              </li>
              <li>
                <Link to="/book-ride" className="hover:text-brand-400 transition-colors">
                  RideFlow Executive VIP
                </Link>
              </li>
            </ul>
          </div>

          {/* Mobile Apps */}
          <div className="space-y-4">
            <h4 className="text-sm font-bold text-white uppercase tracking-wider">Get the App</h4>
            <p className="text-xs text-slate-400">Download for instant one-tap booking and live ride tracking.</p>
            <div className="space-y-2">
              <button className="w-full flex items-center justify-center space-x-2 bg-slate-800 hover:bg-slate-700 text-white py-2.5 px-4 rounded-xl border border-slate-700 text-xs font-semibold transition-colors">
                <Smartphone className="w-4 h-4 text-brand-400" />
                <span>Google Play Store</span>
              </button>
              <button className="w-full flex items-center justify-center space-x-2 bg-slate-800 hover:bg-slate-700 text-white py-2.5 px-4 rounded-xl border border-slate-700 text-xs font-semibold transition-colors">
                <Apple className="w-4 h-4 text-brand-400" />
                <span>Apple App Store</span>
              </button>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col md:flex-row items-center justify-between text-xs text-slate-500 space-y-4 md:space-y-0">
          <p>© {new Date().getFullYear()} RideFlow Mobility Inc. All rights reserved.</p>
          <div className="flex items-center space-x-6">
            <a href="#privacy" className="hover:text-slate-400 transition-colors">
              Privacy Policy
            </a>
            <a href="#terms" className="hover:text-slate-400 transition-colors">
              Terms of Service
            </a>
            <a href="#cookies" className="hover:text-slate-400 transition-colors">
              Cookie Preferences
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
