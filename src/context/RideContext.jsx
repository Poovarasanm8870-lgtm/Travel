import React, { createContext, useContext, useState } from 'react';
import { getStorageItem, setStorageItem, STORAGE_KEYS } from '../utils/storage';
import { INITIAL_MOCK_RIDES } from '../data/rides';
import { MOCK_DRIVERS } from '../data/drivers';

const RideContext = createContext();

const DEFAULT_SAVED_PLACES = [
  { id: 'sp-1', type: 'Home', icon: 'Home', address: 'Indiranagar 100ft Road, 4th Cross, Bengaluru', note: 'Primary Residence' },
  { id: 'sp-2', type: 'Work', icon: 'Briefcase', address: 'EcoWorld IT Park, Bellandur, Bengaluru', note: 'Tech Park Gate 2' },
  { id: 'sp-3', type: 'College', icon: 'GraduationCap', address: 'IISc Campus, CV Raman Ave, Bengaluru', note: 'Main Gate' },
];

const DEFAULT_SETTINGS = {
  notifications: { rideUpdates: true, promotions: false, safetyAlerts: true },
  language: 'English (US)',
  currency: 'INR (₹)',
};

export const RideProvider = ({ children }) => {
  // Booking Draft State
  const [pickup, setPickup] = useState('Indiranagar Metro Station');
  const [destination, setDestination] = useState('MG Road Metro Station');
  const [selectedRideType, setSelectedRideType] = useState('bike');
  
  // Rides History & Saved Places stored in LocalStorage
  const [ridesHistory, setRidesHistory] = useState(() => 
    getStorageItem(STORAGE_KEYS.RIDES, INITIAL_MOCK_RIDES)
  );

  const [savedPlaces, setSavedPlaces] = useState(() => 
    getStorageItem(STORAGE_KEYS.SAVED_PLACES, DEFAULT_SAVED_PLACES)
  );

  const [settings, setSettings] = useState(() => 
    getStorageItem(STORAGE_KEYS.SETTINGS, DEFAULT_SETTINGS)
  );

  // Active Live Simulated Ride State
  const [activeRide, setActiveRide] = useState(null);

  // Create a new booking
  const createBooking = (fareDetails) => {
    const assignedDriver = MOCK_DRIVERS.find(d => d.vehicleType === selectedRideType) || MOCK_DRIVERS[0];
    const newRide = {
      id: `rf-${Math.floor(1000 + Math.random() * 9000)}`,
      date: new Date().toISOString().split('T')[0],
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      pickup,
      destination,
      rideType: selectedRideType,
      rideTypeName: fareDetails.rateConfig.name,
      fare: fareDetails.total,
      distanceKm: fareDetails.distanceKm,
      durationMins: fareDetails.durationMins,
      status: 'Upcoming',
      paymentMethod: 'UPI / RideFlow Wallet',
      driver: assignedDriver,
    };

    const updatedHistory = [newRide, ...ridesHistory];
    setRidesHistory(updatedHistory);
    setStorageItem(STORAGE_KEYS.RIDES, updatedHistory);
    setActiveRide(newRide);

    return newRide;
  };

  // Cancel an active ride
  const cancelRide = (rideId) => {
    const updated = ridesHistory.map((r) =>
      r.id === rideId ? { ...r, status: 'Cancelled' } : r
    );
    setRidesHistory(updated);
    setStorageItem(STORAGE_KEYS.RIDES, updated);
    if (activeRide && activeRide.id === rideId) {
      setActiveRide((prev) => prev ? { ...prev, status: 'Cancelled' } : null);
    }
  };

  // Saved Places CRUD
  const addSavedPlace = (place) => {
    const newPlace = { ...place, id: `sp-${Date.now()}` };
    const updated = [...savedPlaces, newPlace];
    setSavedPlaces(updated);
    setStorageItem(STORAGE_KEYS.SAVED_PLACES, updated);
  };

  const deleteSavedPlace = (id) => {
    const updated = savedPlaces.filter((p) => p.id !== id);
    setSavedPlaces(updated);
    setStorageItem(STORAGE_KEYS.SAVED_PLACES, updated);
  };

  // Settings update
  const updateSettings = (newSettings) => {
    const updated = { ...settings, ...newSettings };
    setSettings(updated);
    setStorageItem(STORAGE_KEYS.SETTINGS, updated);
  };

  return (
    <RideContext.Provider
      value={{
        pickup,
        setPickup,
        destination,
        setDestination,
        selectedRideType,
        setSelectedRideType,
        ridesHistory,
        savedPlaces,
        addSavedPlace,
        deleteSavedPlace,
        settings,
        updateSettings,
        activeRide,
        setActiveRide,
        createBooking,
        cancelRide,
      }}
    >
      {children}
    </RideContext.Provider>
  );
};

export const useRide = () => {
  const context = useContext(RideContext);
  if (!context) throw new Error('useRide must be used within a RideProvider');
  return context;
};
