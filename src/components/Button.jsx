import React from 'react';
import { motion } from 'framer-motion';

const Button = ({
  children,
  onClick,
  type = 'button',
  variant = 'primary',
  size = 'md',
  fullWidth = false,
  disabled = false,
  loading = false,
  icon: Icon = null,
  className = '',
  ...props
}) => {
  const baseStyles = 'inline-flex items-center justify-center font-semibold rounded-xl transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer';

  const variants = {
    primary: 'bg-brand-500 hover:bg-brand-600 text-white shadow-lg shadow-brand-500/25 focus:ring-brand-500 active:scale-[0.98]',
    accent: 'bg-accent-500 hover:bg-accent-600 text-white shadow-lg shadow-accent-500/25 focus:ring-accent-500 active:scale-[0.98]',
    secondary: 'bg-slate-900 hover:bg-slate-800 text-white dark:bg-slate-100 dark:hover:bg-white dark:text-slate-900 focus:ring-slate-900 active:scale-[0.98]',
    outline: 'border-2 border-slate-300 dark:border-slate-700 text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 focus:ring-slate-400 active:scale-[0.98]',
    ghost: 'text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 focus:ring-slate-400 active:scale-[0.98]',
    danger: 'bg-red-500 hover:bg-red-600 text-white shadow-lg shadow-red-500/20 focus:ring-red-500 active:scale-[0.98]',
  };

  const sizes = {
    sm: 'px-3 py-1.5 text-xs font-medium',
    md: 'px-5 py-2.5 text-sm font-semibold',
    lg: 'px-7 py-3.5 text-base font-bold',
  };

  return (
    <motion.button
      whileHover={{ y: disabled || loading ? 0 : -2 }}
      whileTap={{ scale: disabled || loading ? 1 : 0.97 }}
      type={type}
      onClick={onClick}
      disabled={disabled || loading}
      className={`${baseStyles} ${variants[variant]} ${sizes[size]} ${fullWidth ? 'w-full' : ''} ${className}`}
      {...props}
    >
      {loading ? (
        <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-current" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
        </svg>
      ) : Icon ? (
        <Icon className="w-4 h-4 mr-2" />
      ) : null}
      {children}
    </motion.button>
  );
};

export default Button;
