import React from 'react';

export const PageLoader = () => {
  return (
    <div className="min-h-[60vh] flex flex-col items-center justify-center space-y-4">
      <div className="relative w-16 h-16">
        <div className="absolute inset-0 rounded-full border-4 border-slate-200 dark:border-slate-800" />
        <div className="absolute inset-0 rounded-full border-4 border-brand-500 border-t-transparent animate-spin" />
      </div>
      <p className="text-xs font-bold text-slate-400 uppercase tracking-widest animate-pulse">
        Loading RideFlow...
      </p>
    </div>
  );
};

export const CardSkeleton = () => {
  return (
    <div className="glass-panel p-6 rounded-3xl animate-pulse space-y-4">
      <div className="h-6 bg-slate-200 dark:bg-slate-800 rounded-lg w-1/3" />
      <div className="h-4 bg-slate-200 dark:bg-slate-800 rounded-lg w-2/3" />
      <div className="h-10 bg-slate-200 dark:bg-slate-800 rounded-xl w-full" />
    </div>
  );
};

export default PageLoader;
