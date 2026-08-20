import React, { createContext, useContext, useState, useEffect } from 'react';
import { getStorageItem, setStorageItem, removeStorageItem, STORAGE_KEYS } from '../utils/storage';

const AuthContext = createContext();

const DEFAULT_DEMO_USER = {
  id: 'usr-9901',
  name: 'Alex Johnson',
  email: 'alex.johnson@example.com',
  phone: '9876543210',
  avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=250&q=80',
  memberSince: 'August 2024',
  preferredPayment: 'UPI / Wallet',
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => getStorageItem(STORAGE_KEYS.USER, DEFAULT_DEMO_USER));
  const [isAuthenticated, setIsAuthenticated] = useState(() => getStorageItem(STORAGE_KEYS.AUTH, true));

  const login = (emailOrPhone, password) => {
    // Simulated login logic
    const existingUser = getStorageItem(STORAGE_KEYS.USER, DEFAULT_DEMO_USER);
    setUser(existingUser);
    setIsAuthenticated(true);
    setStorageItem(STORAGE_KEYS.AUTH, true);
    setStorageItem(STORAGE_KEYS.USER, existingUser);
    return { success: true };
  };

  const register = (userData) => {
    const newUser = {
      id: `usr-${Date.now()}`,
      name: userData.fullName,
      email: userData.email,
      phone: userData.phone,
      avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=250&q=80',
      memberSince: 'August 2026',
      preferredPayment: 'UPI',
    };
    setUser(newUser);
    setIsAuthenticated(true);
    setStorageItem(STORAGE_KEYS.AUTH, true);
    setStorageItem(STORAGE_KEYS.USER, newUser);
    return { success: true };
  };

  const logout = () => {
    setIsAuthenticated(false);
    removeStorageItem(STORAGE_KEYS.AUTH);
  };

  const updateProfile = (updatedFields) => {
    const updated = { ...user, ...updatedFields };
    setUser(updated);
    setStorageItem(STORAGE_KEYS.USER, updated);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated,
        login,
        register,
        logout,
        updateProfile,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error('useAuth must be used within an AuthProvider');
  return context;
};
