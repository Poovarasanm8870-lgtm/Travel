import React, { useState, useEffect } from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Navigation,
  Sun,
  Moon,
  Menu,
  X,
  User,
  LogOut,
  LayoutDashboard,
  Clock,
  ChevronDown,
  Shield,
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useTheme } from '../context/ThemeContext';
import Button from './Button';

const Navbar = () => {
  const { user, isAuthenticated, logout } = useAuth();
  const { isDark, toggleTheme } = useTheme();
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [userDropdownOpen, setUserDropdownOpen] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'Rides', path: '/rides' },
    { name: 'Services', path: '/services' },
    { name: 'About Us', path: '/about' },
    { name: 'Contact', path: '/contact' },
  ];

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? 'glass-nav shadow-lg py-3'
          : 'bg-transparent py-5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-3 group">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-brand-500 to-teal-400 flex items-center justify-center text-white shadow-glow-teal group-hover:scale-105 transition-transform duration-300">
              <Navigation className="w-5 h-5 transform -rotate-45" />
            </div>
            <div className="flex flex-col">
              <span className="text-xl font-extrabold tracking-tight text-slate-900 dark:text-white flex items-center">
                Ride<span className="text-brand-500">Flow</span>
              </span>
              <span className="text-[10px] font-semibold text-slate-400 tracking-widest uppercase -mt-1">
                Urban Mobility
              </span>
            </div>
          </Link>

          {/* Desktop Nav Links */}
          <nav className="hidden md:flex items-center space-x-1 glass-panel px-4 py-1.5 rounded-full">
            {navLinks.map((link) => (
              <NavLink
                key={link.path}
                to={link.path}
                className={({ isActive }) =>
                  `px-4 py-2 text-sm font-semibold rounded-full transition-all duration-200 ${
                    isActive
                      ? 'bg-brand-500 text-white shadow-sm'
                      : 'text-slate-600 dark:text-slate-300 hover:text-brand-500 dark:hover:text-brand-400'
                  }`
                }
              >
                {link.name}
              </NavLink>
            ))}
          </nav>

          {/* Right Actions */}
          <div className="hidden md:flex items-center space-x-3">
            {/* Theme Switcher Button */}
            <button
              onClick={toggleTheme}
              aria-label="Toggle theme"
              className="p-2.5 rounded-xl border border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
            >
              {isDark ? <Sun className="w-4 h-4 text-amber-400" /> : <Moon className="w-4 h-4 text-slate-600" />}
            </button>

            {isAuthenticated ? (
              <div className="relative">
                <button
                  onClick={() => setUserDropdownOpen(!userDropdownOpen)}
                  className="flex items-center space-x-3 p-1.5 pr-3 rounded-full border border-slate-200 dark:border-slate-800 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
                >
                  <img
                    src={user?.avatar}
                    alt={user?.name}
                    className="w-8 h-8 rounded-full object-cover ring-2 ring-brand-500"
                  />
                  <span className="text-sm font-semibold text-slate-700 dark:text-slate-200">
                    {user?.name?.split(' ')[0]}
                  </span>
                  <ChevronDown className="w-3.5 h-3.5 text-slate-400" />
                </button>

                <AnimatePresence>
                  {userDropdownOpen && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 10 }}
                      className="absolute right-0 mt-2 w-56 glass-panel rounded-2xl p-2 shadow-xl z-50"
                    >
                      <div className="px-3 py-2 border-b border-slate-100 dark:border-slate-800">
                        <p className="text-xs text-slate-400 font-medium">Signed in as</p>
                        <p className="text-sm font-bold text-slate-800 dark:text-white truncate">
                          {user?.email}
                        </p>
                      </div>

                      <div className="py-1">
                        <Link
                          to="/dashboard"
                          onClick={() => setUserDropdownOpen(false)}
                          className="flex items-center px-3 py-2 text-sm font-medium text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-xl transition-colors"
                        >
                          <LayoutDashboard className="w-4 h-4 mr-2.5 text-brand-500" />
                          Dashboard
                        </Link>
                        <Link
                          to="/my-rides"
                          onClick={() => setUserDropdownOpen(false)}
                          className="flex items-center px-3 py-2 text-sm font-medium text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-xl transition-colors"
                        >
                          <Clock className="w-4 h-4 mr-2.5 text-brand-500" />
                          My Rides
                        </Link>
                        <Link
                          to="/profile"
                          onClick={() => setUserDropdownOpen(false)}
                          className="flex items-center px-3 py-2 text-sm font-medium text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-xl transition-colors"
                        >
                          <User className="w-4 h-4 mr-2.5 text-brand-500" />
                          Profile Settings
                        </Link>
                      </div>

                      <div className="pt-1 border-t border-slate-100 dark:border-slate-800">
                        <button
                          onClick={() => {
                            setUserDropdownOpen(false);
                            logout();
                            navigate('/login');
                          }}
                          className="w-full flex items-center px-3 py-2 text-sm font-medium text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-950/30 rounded-xl transition-colors"
                        >
                          <LogOut className="w-4 h-4 mr-2.5" />
                          Sign Out
                        </button>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ) : (
              <>
                <Link to="/login">
                  <Button variant="ghost" size="md">
                    Log In
                  </Button>
                </Link>
                <Link to="/book-ride">
                  <Button variant="primary" size="md">
                    Book Ride
                  </Button>
                </Link>
              </>
            )}
          </div>

          {/* Mobile Menu Button */}
          <div className="flex md:hidden items-center space-x-2">
            <button
              onClick={toggleTheme}
              className="p-2 rounded-xl border border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-300"
            >
              {isDark ? <Sun className="w-4 h-4 text-amber-400" /> : <Moon className="w-4 h-4 text-slate-600" />}
            </button>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-xl text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation Drawer */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, x: '100%' }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="fixed inset-y-0 right-0 z-50 w-full max-w-sm bg-white dark:bg-dark-card shadow-2xl p-6 flex flex-col justify-between"
          >
            <div>
              <div className="flex items-center justify-between pb-6 border-b border-slate-200 dark:border-slate-800">
                <div className="flex items-center space-x-3">
                  <div className="w-9 h-9 rounded-xl bg-brand-500 flex items-center justify-center text-white">
                    <Navigation className="w-5 h-5 transform -rotate-45" />
                  </div>
                  <span className="text-xl font-bold text-slate-900 dark:text-white">
                    Ride<span className="text-brand-500">Flow</span>
                  </span>
                </div>
                <button
                  onClick={() => setMobileMenuOpen(false)}
                  className="p-2 rounded-lg text-slate-500 hover:bg-slate-100 dark:hover:bg-slate-800"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* User summary if logged in */}
              {isAuthenticated && (
                <div className="my-4 p-3 bg-slate-50 dark:bg-dark-bg rounded-2xl flex items-center space-x-3">
                  <img src={user?.avatar} alt={user?.name} className="w-10 h-10 rounded-full object-cover" />
                  <div>
                    <p className="font-bold text-sm text-slate-800 dark:text-white">{user?.name}</p>
                    <p className="text-xs text-slate-400">{user?.email}</p>
                  </div>
                </div>
              )}

              <nav className="mt-6 flex flex-col space-y-2">
                {navLinks.map((link) => (
                  <NavLink
                    key={link.path}
                    to={link.path}
                    onClick={() => setMobileMenuOpen(false)}
                    className={({ isActive }) =>
                      `px-4 py-3 text-base font-semibold rounded-xl transition-all ${
                        isActive
                          ? 'bg-brand-500 text-white'
                          : 'text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800'
                      }`
                    }
                  >
                    {link.name}
                  </NavLink>
                ))}

                {isAuthenticated && (
                  <>
                    <NavLink
                      to="/dashboard"
                      onClick={() => setMobileMenuOpen(false)}
                      className="px-4 py-3 text-base font-semibold rounded-xl text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800"
                    >
                      Dashboard
                    </NavLink>
                    <NavLink
                      to="/my-rides"
                      onClick={() => setMobileMenuOpen(false)}
                      className="px-4 py-3 text-base font-semibold rounded-xl text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800"
                    >
                      My Rides
                    </NavLink>
                    <NavLink
                      to="/saved-places"
                      onClick={() => setMobileMenuOpen(false)}
                      className="px-4 py-3 text-base font-semibold rounded-xl text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800"
                    >
                      Saved Places
                    </NavLink>
                    <NavLink
                      to="/profile"
                      onClick={() => setMobileMenuOpen(false)}
                      className="px-4 py-3 text-base font-semibold rounded-xl text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800"
                    >
                      Profile & Settings
                    </NavLink>
                  </>
                )}
              </nav>
            </div>

            <div className="pt-6 border-t border-slate-200 dark:border-slate-800 flex flex-col space-y-3">
              {isAuthenticated ? (
                <Button
                  variant="danger"
                  fullWidth
                  onClick={() => {
                    setMobileMenuOpen(false);
                    logout();
                    navigate('/login');
                  }}
                >
                  Sign Out
                </Button>
              ) : (
                <>
                  <Link to="/login" onClick={() => setMobileMenuOpen(false)}>
                    <Button variant="outline" fullWidth>
                      Log In
                    </Button>
                  </Link>
                  <Link to="/book-ride" onClick={() => setMobileMenuOpen(false)}>
                    <Button variant="primary" fullWidth>
                      Book a Ride
                    </Button>
                  </Link>
                </>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};

export default Navbar;
