import React from 'react';
import { Sun, Moon, Monitor, Bell, Globe, DollarSign, Shield, CheckCircle2 } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';
import { useRide } from '../context/RideContext';
import Button from '../components/Button';

const Settings = () => {
  const { theme, setTheme } = useTheme();
  const { settings, updateSettings } = useRide();

  const handleNotificationToggle = (key) => {
    updateSettings({
      notifications: {
        ...settings.notifications,
        [key]: !settings.notifications[key],
      },
    });
  };

  return (
    <div className="pt-28 pb-16 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-black text-slate-900 dark:text-white">
          Application Settings
        </h1>
        <p className="text-sm font-medium text-slate-500 dark:text-slate-400 mt-1">
          Customize your theme, notification alerts, language, and regional preferences.
        </p>
      </div>

      <div className="space-y-6">
        {/* 1. Theme Appearance */}
        <div className="glass-panel p-6 sm:p-8 rounded-3xl space-y-4">
          <h3 className="text-lg font-extrabold text-slate-900 dark:text-white flex items-center">
            <Sun className="w-5 h-5 mr-2 text-brand-500" />
            Appearance & Theme
          </h3>

          <div className="grid grid-cols-3 gap-4">
            <button
              onClick={() => setTheme('light')}
              className={`p-4 rounded-2xl border text-center space-y-2 transition-all ${
                theme === 'light'
                  ? 'border-brand-500 bg-brand-500/10 text-brand-600 font-bold shadow-glow-teal'
                  : 'border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-400'
              }`}
            >
              <Sun className="w-6 h-6 mx-auto text-amber-500" />
              <p className="text-xs font-bold">Light Theme</p>
            </button>

            <button
              onClick={() => setTheme('dark')}
              className={`p-4 rounded-2xl border text-center space-y-2 transition-all ${
                theme === 'dark'
                  ? 'border-brand-500 bg-brand-500/10 text-brand-400 font-bold shadow-glow-teal'
                  : 'border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-400'
              }`}
            >
              <Moon className="w-6 h-6 mx-auto text-brand-400" />
              <p className="text-xs font-bold">Dark Obsidian</p>
            </button>

            <button
              onClick={() => setTheme('system')}
              className={`p-4 rounded-2xl border text-center space-y-2 transition-all ${
                theme === 'system'
                  ? 'border-brand-500 bg-brand-500/10 text-brand-500 font-bold shadow-glow-teal'
                  : 'border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-400'
              }`}
            >
              <Monitor className="w-6 h-6 mx-auto text-slate-400" />
              <p className="text-xs font-bold">System Default</p>
            </button>
          </div>
        </div>

        {/* 2. Notification Toggles */}
        <div className="glass-panel p-6 sm:p-8 rounded-3xl space-y-4">
          <h3 className="text-lg font-extrabold text-slate-900 dark:text-white flex items-center">
            <Bell className="w-5 h-5 mr-2 text-brand-500" />
            Notification Preferences
          </h3>

          <div className="space-y-3">
            <div className="flex items-center justify-between p-3 bg-slate-50 dark:bg-dark-input rounded-2xl">
              <div>
                <p className="text-sm font-bold text-slate-800 dark:text-slate-100">Live Ride Status Updates</p>
                <p className="text-xs text-slate-400">Receive instant push alerts when captain arrives or trip starts.</p>
              </div>
              <input
                type="checkbox"
                checked={settings.notifications.rideUpdates}
                onChange={() => handleNotificationToggle('rideUpdates')}
                className="w-5 h-5 accent-brand-500 rounded cursor-pointer"
              />
            </div>

            <div className="flex items-center justify-between p-3 bg-slate-50 dark:bg-dark-input rounded-2xl">
              <div>
                <p className="text-sm font-bold text-slate-800 dark:text-slate-100">Promotions & Coupons</p>
                <p className="text-xs text-slate-400">Special weekend ride discounts and referral cashbacks.</p>
              </div>
              <input
                type="checkbox"
                checked={settings.notifications.promotions}
                onChange={() => handleNotificationToggle('promotions')}
                className="w-5 h-5 accent-brand-500 rounded cursor-pointer"
              />
            </div>

            <div className="flex items-center justify-between p-3 bg-slate-50 dark:bg-dark-input rounded-2xl">
              <div>
                <p className="text-sm font-bold text-slate-800 dark:text-slate-100">Safety & Security Alerts</p>
                <p className="text-xs text-slate-400">Night ride safety check-ins and emergency helpline notifications.</p>
              </div>
              <input
                type="checkbox"
                checked={settings.notifications.safetyAlerts}
                onChange={() => handleNotificationToggle('safetyAlerts')}
                className="w-5 h-5 accent-brand-500 rounded cursor-pointer"
              />
            </div>
          </div>
        </div>

        {/* 3. Regional Preferences */}
        <div className="glass-panel p-6 sm:p-8 rounded-3xl space-y-4">
          <h3 className="text-lg font-extrabold text-slate-900 dark:text-white flex items-center">
            <Globe className="w-5 h-5 mr-2 text-brand-500" />
            Language & Currency
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-1">
                Display Language
              </label>
              <select
                value={settings.language}
                onChange={(e) => updateSettings({ language: e.target.value })}
                className="w-full px-4 py-3 bg-slate-50 dark:bg-dark-input border border-slate-200 dark:border-slate-800 rounded-xl text-sm font-medium focus:ring-2 focus:ring-brand-500 focus:outline-none"
              >
                <option value="English (US)">English (US)</option>
                <option value="Hindi (हिंदी)">Hindi (हिंदी)</option>
                <option value="Kannada (ಕನ್ನಡ)">Kannada (ಕನ್ನಡ)</option>
                <option value="Tamil (தமிழ்)">Tamil (தமிழ்)</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-1">
                Display Currency
              </label>
              <select
                value={settings.currency}
                onChange={(e) => updateSettings({ currency: e.target.value })}
                className="w-full px-4 py-3 bg-slate-50 dark:bg-dark-input border border-slate-200 dark:border-slate-800 rounded-xl text-sm font-medium focus:ring-2 focus:ring-brand-500 focus:outline-none"
              >
                <option value="INR (₹)">INR (₹)</option>
                <option value="USD ($)">USD ($)</option>
              </select>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Settings;
