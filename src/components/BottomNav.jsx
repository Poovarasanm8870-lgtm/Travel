import React from 'react';
import { NavLink } from 'react-router-dom';
import { Home, Compass, Clock, Bookmark, User } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

const BottomNav = () => {
  const { isAuthenticated } = useAuth();

  if (!isAuthenticated) return null;

  const items = [
    { label: 'Home', path: '/dashboard', icon: Home },
    { label: 'Book', path: '/book-ride', icon: Compass },
    { label: 'Rides', path: '/my-rides', icon: Clock },
    { label: 'Saved', path: '/saved-places', icon: Bookmark },
    { label: 'Profile', path: '/profile', icon: User },
  ];

  return (
    <div className="md:hidden fixed bottom-0 left-0 right-0 z-40 bg-white/90 dark:bg-dark-card/95 backdrop-blur-lg border-t border-slate-200 dark:border-slate-800 px-2 py-1 shadow-lg">
      <div className="flex items-center justify-around">
        {items.map((item) => {
          const Icon = item.icon;
          return (
            <NavLink
              key={item.path}
              to={item.path}
              className={({ isActive }) =>
                `flex flex-col items-center justify-center py-2 px-3 rounded-xl transition-all ${
                  isActive
                    ? 'text-brand-500 font-bold scale-105'
                    : 'text-slate-500 dark:text-slate-400 font-medium hover:text-slate-800 dark:hover:text-slate-200'
                }`
              }
            >
              <Icon className="w-5 h-5 mb-0.5" />
              <span className="text-[10px] tracking-tight">{item.label}</span>
            </NavLink>
          );
        })}
      </div>
    </div>
  );
};

export default BottomNav;
