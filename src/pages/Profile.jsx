import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { User, Mail, Phone, Camera, Save, CheckCircle2, ShieldCheck } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import Button from '../components/Button';

const AVATAR_OPTIONS = [
  'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=250&q=80',
  'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=250&q=80',
  'https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?auto=format&fit=crop&w=250&q=80',
  'https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=250&q=80',
];

const Profile = () => {
  const { user, updateProfile } = useAuth();
  const [formData, setFormData] = useState({
    name: user?.name || '',
    email: user?.email || '',
    phone: user?.phone || '',
    avatar: user?.avatar || AVATAR_OPTIONS[0],
    preferredPayment: user?.preferredPayment || 'UPI / Wallet',
  });

  const [savedSuccess, setSavedSuccess] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    updateProfile(formData);
    setSavedSuccess(true);
    setTimeout(() => setSavedSuccess(false), 3000);
  };

  return (
    <div className="pt-28 pb-16 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-black text-slate-900 dark:text-white">
          Account Profile
        </h1>
        <p className="text-sm font-medium text-slate-500 dark:text-slate-400 mt-1">
          Manage your personal information, avatar, and rider profile preferences.
        </p>
      </div>

      <div className="glass-panel p-6 sm:p-10 rounded-3xl space-y-8">
        {savedSuccess && (
          <div className="p-4 bg-emerald-500/10 border border-emerald-500/20 text-emerald-500 rounded-2xl text-xs font-bold flex items-center space-x-2">
            <CheckCircle2 className="w-5 h-5" />
            <span>Profile settings updated successfully!</span>
          </div>
        )}

        {/* Avatar Picker */}
        <div className="space-y-3">
          <label className="block text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider">
            Choose Avatar Picture
          </label>
          <div className="flex items-center space-x-4 overflow-x-auto pb-2">
            {AVATAR_OPTIONS.map((imgUrl, idx) => (
              <img
                key={idx}
                src={imgUrl}
                alt="Avatar option"
                onClick={() => setFormData({ ...formData, avatar: imgUrl })}
                className={`w-16 h-16 rounded-2xl object-cover cursor-pointer transition-all border-4 ${
                  formData.avatar === imgUrl
                    ? 'border-brand-500 scale-105 shadow-glow-teal'
                    : 'border-transparent opacity-60 hover:opacity-100'
                }`}
              />
            ))}
          </div>
        </div>

        {/* Form Fields */}
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-1">
                Full Name
              </label>
              <div className="relative">
                <User className="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5" />
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full pl-10 pr-4 py-3 bg-slate-50 dark:bg-dark-input border border-slate-200 dark:border-slate-800 rounded-xl text-sm font-medium focus:ring-2 focus:ring-brand-500 focus:outline-none"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-1">
                Email Address
              </label>
              <div className="relative">
                <Mail className="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5" />
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full pl-10 pr-4 py-3 bg-slate-50 dark:bg-dark-input border border-slate-200 dark:border-slate-800 rounded-xl text-sm font-medium focus:ring-2 focus:ring-brand-500 focus:outline-none"
                />
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-1">
                Phone Number
              </label>
              <div className="relative">
                <Phone className="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5" />
                <input
                  type="tel"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  className="w-full pl-10 pr-4 py-3 bg-slate-50 dark:bg-dark-input border border-slate-200 dark:border-slate-800 rounded-xl text-sm font-medium focus:ring-2 focus:ring-brand-500 focus:outline-none"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-1">
                Preferred Payment Method
              </label>
              <select
                value={formData.preferredPayment}
                onChange={(e) => setFormData({ ...formData, preferredPayment: e.target.value })}
                className="w-full px-4 py-3 bg-slate-50 dark:bg-dark-input border border-slate-200 dark:border-slate-800 rounded-xl text-sm font-medium focus:ring-2 focus:ring-brand-500 focus:outline-none"
              >
                <option value="UPI / Wallet">Google Pay / PhonePe UPI</option>
                <option value="Cash">Cash on Delivery</option>
                <option value="Credit Card">Saved Credit / Debit Card</option>
              </select>
            </div>
          </div>

          <div className="pt-4 flex justify-end">
            <Button type="submit" variant="primary" icon={Save}>
              Save Profile Changes
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Profile;
