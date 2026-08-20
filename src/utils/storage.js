// LocalStorage Keys
export const STORAGE_KEYS = {
  USER: 'rideflow_user',
  AUTH: 'rideflow_auth',
  RIDES: 'rideflow_rides',
  SAVED_PLACES: 'rideflow_saved_places',
  THEME: 'rideflow_theme',
  SETTINGS: 'rideflow_settings',
};

// Safe getItem with fallback
export const getStorageItem = (key, defaultValue = null) => {
  try {
    const item = localStorage.getItem(key);
    return item ? JSON.parse(item) : defaultValue;
  } catch (error) {
    console.error(`Error reading key "${key}" from localStorage:`, error);
    return defaultValue;
  }
};

// Safe setItem
export const setStorageItem = (key, value) => {
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch (error) {
    console.error(`Error writing key "${key}" to localStorage:`, error);
  }
};

// Safe removeItem
export const removeStorageItem = (key) => {
  try {
    localStorage.removeItem(key);
  } catch (error) {
    console.error(`Error removing key "${key}" from localStorage:`, error);
  }
};
