import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Navigation, User, Mail, Phone, Lock, Eye, EyeOff, ArrowRight } from 'lucide-react';
import Button from '../components/Button';
import { useAuth } from '../context/AuthContext';
import { getPasswordStrength, isValidEmail, isValidPhone } from '../utils/validation';

const Register = () => {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: '',
    termsAgreed: true,
  });

  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  const { register } = useAuth();
  const navigate = useNavigate();

  const passwordStrength = getPasswordStrength(formData.password);

  const handleChange = (e) => {
    const val = e.target.type === 'checkbox' ? e.target.checked : e.target.value;
    setFormData({ ...formData, [e.target.name]: val });
    if (errors[e.target.name]) setErrors({ ...errors, [e.target.name]: '' });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newErrors = {};

    if (!formData.fullName.trim()) newErrors.fullName = 'Full Name is required';
    if (!formData.email.trim() || !isValidEmail(formData.email)) newErrors.email = 'Valid email required';
    if (!formData.phone.trim() || !isValidPhone(formData.phone)) newErrors.phone = '10-digit phone required';
    if (!formData.password || formData.password.length < 6) newErrors.password = 'Password must be at least 6 chars';
    if (formData.password !== formData.confirmPassword) newErrors.confirmPassword = 'Passwords do not match';
    if (!formData.termsAgreed) newErrors.termsAgreed = 'You must accept the terms';

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setLoading(true);
    setTimeout(() => {
      register(formData);
      setLoading(false);
      navigate('/dashboard');
    }, 800);
  };

  return (
    <div className="min-h-screen pt-24 pb-16 flex items-center justify-center max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-md glass-panel p-8 sm:p-10 rounded-3xl shadow-2xl space-y-6"
      >
        <div className="text-center space-y-2">
          <Link to="/" className="inline-flex items-center space-x-2">
            <div className="w-10 h-10 rounded-xl bg-brand-500 text-white flex items-center justify-center shadow-glow-teal">
              <Navigation className="w-5 h-5 transform -rotate-45" />
            </div>
            <span className="text-2xl font-black text-slate-900 dark:text-white">
              Ride<span className="text-brand-500">Flow</span>
            </span>
          </Link>
          <h2 className="text-xl font-extrabold text-slate-900 dark:text-white">
            Create Your Account
          </h2>
          <p className="text-xs text-slate-500 dark:text-slate-400">
            Join RideFlow for fast, safe, and transparent urban rides.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-1">
              Full Name
            </label>
            <div className="relative">
              <User className="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5" />
              <input
                type="text"
                name="fullName"
                value={formData.fullName}
                onChange={handleChange}
                placeholder="Alex Johnson"
                className="w-full pl-10 pr-4 py-3 bg-slate-50 dark:bg-dark-input border border-slate-200 dark:border-slate-800 rounded-xl text-sm font-medium focus:ring-2 focus:ring-brand-500 focus:outline-none"
              />
            </div>
            {errors.fullName && <p className="text-xs text-red-500 mt-1">{errors.fullName}</p>}
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-1">
              Email Address
            </label>
            <div className="relative">
              <Mail className="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5" />
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="alex@example.com"
                className="w-full pl-10 pr-4 py-3 bg-slate-50 dark:bg-dark-input border border-slate-200 dark:border-slate-800 rounded-xl text-sm font-medium focus:ring-2 focus:ring-brand-500 focus:outline-none"
              />
            </div>
            {errors.email && <p className="text-xs text-red-500 mt-1">{errors.email}</p>}
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-1">
              Mobile Phone
            </label>
            <div className="relative">
              <Phone className="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5" />
              <input
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                placeholder="9876543210"
                className="w-full pl-10 pr-4 py-3 bg-slate-50 dark:bg-dark-input border border-slate-200 dark:border-slate-800 rounded-xl text-sm font-medium focus:ring-2 focus:ring-brand-500 focus:outline-none"
              />
            </div>
            {errors.phone && <p className="text-xs text-red-500 mt-1">{errors.phone}</p>}
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-1">
              Password
            </label>
            <div className="relative">
              <Lock className="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5" />
              <input
                type={showPassword ? 'text' : 'password'}
                name="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="••••••••"
                className="w-full pl-10 pr-10 py-3 bg-slate-50 dark:bg-dark-input border border-slate-200 dark:border-slate-800 rounded-xl text-sm font-medium focus:ring-2 focus:ring-brand-500 focus:outline-none"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-3.5 text-slate-400 hover:text-slate-600"
              >
                {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>

            {/* Visual Password Strength Meter */}
            {formData.password && (
              <div className="mt-2 space-y-1">
                <div className="h-1.5 w-full bg-slate-200 dark:bg-slate-800 rounded-full overflow-hidden">
                  <div
                    className={`h-full transition-all duration-300 ${passwordStrength.color}`}
                    style={{ width: `${passwordStrength.score}%` }}
                  />
                </div>
                <div className="flex justify-between text-[10px] font-bold text-slate-400">
                  <span>Password Strength</span>
                  <span className="capitalize">{passwordStrength.label}</span>
                </div>
              </div>
            )}
            {errors.password && <p className="text-xs text-red-500 mt-1">{errors.password}</p>}
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-1">
              Confirm Password
            </label>
            <input
              type="password"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
              placeholder="••••••••"
              className="w-full px-4 py-3 bg-slate-50 dark:bg-dark-input border border-slate-200 dark:border-slate-800 rounded-xl text-sm font-medium focus:ring-2 focus:ring-brand-500 focus:outline-none"
            />
            {errors.confirmPassword && <p className="text-xs text-red-500 mt-1">{errors.confirmPassword}</p>}
          </div>

          <label className="flex items-center space-x-2 cursor-pointer pt-1">
            <input
              type="checkbox"
              name="termsAgreed"
              checked={formData.termsAgreed}
              onChange={handleChange}
              className="rounded border-slate-300 text-brand-500 focus:ring-brand-500"
            />
            <span className="text-xs text-slate-600 dark:text-slate-400 font-medium">
              I agree to the <a href="#terms" className="text-brand-500 font-bold">Terms of Service</a> & <a href="#privacy" className="text-brand-500 font-bold">Privacy Policy</a>
            </span>
          </label>
          {errors.termsAgreed && <p className="text-xs text-red-500">{errors.termsAgreed}</p>}

          <Button type="submit" variant="primary" fullWidth loading={loading} icon={ArrowRight}>
            Create Account
          </Button>
        </form>

        <p className="text-center text-xs text-slate-500 dark:text-slate-400">
          Already have an account?{' '}
          <Link to="/login" className="text-brand-500 font-bold hover:underline">
            Log In
          </Link>
        </p>
      </motion.div>
    </div>
  );
};

export default Register;
