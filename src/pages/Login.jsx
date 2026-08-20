import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Navigation, Eye, EyeOff, Lock, Mail, ArrowRight } from 'lucide-react';
import Button from '../components/Button';
import { useAuth } from '../context/AuthContext';

const Login = () => {
  const [emailOrPhone, setEmailOrPhone] = useState('alex.johnson@example.com');
  const [password, setPassword] = useState('password123');
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(true);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const { login } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const from = location.state?.from?.pathname || '/dashboard';

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!emailOrPhone || !password) {
      setError('Please fill in all fields.');
      return;
    }

    setLoading(true);
    setTimeout(() => {
      login(emailOrPhone, password);
      setLoading(false);
      navigate(from, { replace: true });
    }, 800);
  };

  return (
    <div className="min-h-screen pt-24 pb-16 flex items-center justify-center max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-md glass-panel p-8 sm:p-10 rounded-3xl shadow-2xl space-y-6"
      >
        {/* Brand Header */}
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
            Welcome Back Rider
          </h2>
          <p className="text-xs text-slate-500 dark:text-slate-400">
            Sign in to access your saved places, ride history, and book trips.
          </p>
        </div>

        {error && (
          <div className="p-3 bg-red-500/10 border border-red-500/20 text-red-500 rounded-xl text-xs font-bold text-center">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-1">
              Email or Mobile Number
            </label>
            <div className="relative">
              <Mail className="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5" />
              <input
                type="text"
                value={emailOrPhone}
                onChange={(e) => setEmailOrPhone(e.target.value)}
                placeholder="alex.johnson@example.com"
                className="w-full pl-10 pr-4 py-3 bg-slate-50 dark:bg-dark-input border border-slate-200 dark:border-slate-800 rounded-xl text-sm font-medium focus:ring-2 focus:ring-brand-500 focus:outline-none"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-1">
              Password
            </label>
            <div className="relative">
              <Lock className="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5" />
              <input
                type={showPassword ? 'text' : 'password'}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
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
          </div>

          <div className="flex items-center justify-between text-xs">
            <label className="flex items-center space-x-2 cursor-pointer">
              <input
                type="checkbox"
                checked={rememberMe}
                onChange={(e) => setRememberMe(e.target.checked)}
                className="rounded border-slate-300 text-brand-500 focus:ring-brand-500"
              />
              <span className="text-slate-600 dark:text-slate-400 font-medium">Remember me</span>
            </label>
            <a href="#forgot" className="text-brand-500 font-bold hover:underline">
              Forgot password?
            </a>
          </div>

          <Button type="submit" variant="primary" fullWidth loading={loading} icon={ArrowRight}>
            Log In
          </Button>
        </form>

        {/* Social Login Simulation */}
        <div className="space-y-3 pt-2">
          <div className="relative flex items-center justify-center">
            <div className="border-t border-slate-200 dark:border-slate-800 w-full" />
            <span className="bg-white dark:bg-dark-card px-3 text-[10px] uppercase font-bold text-slate-400 absolute">
              Or Sign In With
            </span>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <button
              onClick={handleSubmit}
              className="py-2.5 px-4 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 rounded-xl text-xs font-bold transition-colors flex items-center justify-center space-x-2"
            >
              <span>Google</span>
            </button>
            <button
              onClick={handleSubmit}
              className="py-2.5 px-4 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 rounded-xl text-xs font-bold transition-colors flex items-center justify-center space-x-2"
            >
              <span>Phone OTP</span>
            </button>
          </div>
        </div>

        <p className="text-center text-xs text-slate-500 dark:text-slate-400 pt-2">
          Don't have an account?{' '}
          <Link to="/register" className="text-brand-500 font-bold hover:underline">
            Create Free Account
          </Link>
        </p>
      </motion.div>
    </div>
  );
};

export default Login;
