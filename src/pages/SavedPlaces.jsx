import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Home, Briefcase, GraduationCap, MapPin, Plus, Trash2, Edit3, Bookmark } from 'lucide-react';
import { useRide } from '../context/RideContext';
import Button from '../components/Button';
import Modal from '../components/Modal';

const PLACE_ICONS = {
  Home: Home,
  Work: Briefcase,
  College: GraduationCap,
  Other: MapPin,
};

const SavedPlaces = () => {
  const { savedPlaces, addSavedPlace, deleteSavedPlace } = useRide();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newPlace, setNewPlace] = useState({
    type: 'Home',
    address: '',
    note: '',
  });

  const handleAdd = (e) => {
    e.preventDefault();
    if (!newPlace.address.trim()) return;
    addSavedPlace({
      type: newPlace.type,
      address: newPlace.address,
      note: newPlace.note || `${newPlace.type} Address`,
      icon: newPlace.type,
    });
    setNewPlace({ type: 'Home', address: '', note: '' });
    setIsModalOpen(false);
  };

  return (
    <div className="pt-28 pb-16 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-black text-slate-900 dark:text-white flex items-center">
            <Bookmark className="w-7 h-7 mr-2 text-brand-500" />
            Saved Locations
          </h1>
          <p className="text-sm font-medium text-slate-500 dark:text-slate-400 mt-1">
            Save your frequent destinations for one-tap instant ride booking.
          </p>
        </div>

        <Button variant="primary" icon={Plus} onClick={() => setIsModalOpen(true)}>
          Add New Place
        </Button>
      </div>

      {/* Grid of Saved Places */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {savedPlaces.map((place) => {
          const IconComp = PLACE_ICONS[place.type] || MapPin;
          return (
            <motion.div
              key={place.id}
              whileHover={{ y: -4 }}
              className="glass-panel p-6 rounded-3xl space-y-4 flex flex-col justify-between border border-slate-200/80 dark:border-slate-800"
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className="p-3 rounded-2xl bg-brand-500/10 text-brand-500">
                      <IconComp className="w-5 h-5" />
                    </div>
                    <div>
                      <h3 className="text-base font-extrabold text-slate-900 dark:text-white">
                        {place.type}
                      </h3>
                      <p className="text-[10px] text-slate-400 font-bold uppercase">{place.note}</p>
                    </div>
                  </div>

                  <button
                    onClick={() => deleteSavedPlace(place.id)}
                    className="p-2 text-slate-400 hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-950/30 rounded-xl transition-colors"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>

                <p className="text-xs text-slate-600 dark:text-slate-300 font-medium leading-relaxed">
                  {place.address}
                </p>
              </div>

              <div className="pt-3 border-t border-slate-100 dark:border-slate-800">
                <span className="text-[10px] font-bold text-brand-500 hover:underline cursor-pointer">
                  Use in Booking Form →
                </span>
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* Add Place Modal */}
      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title="Save New Location"
      >
        <form onSubmit={handleAdd} className="space-y-4">
          <div>
            <label className="block text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-1">
              Location Type
            </label>
            <select
              value={newPlace.type}
              onChange={(e) => setNewPlace({ ...newPlace, type: e.target.value })}
              className="w-full px-4 py-3 bg-slate-50 dark:bg-dark-input border border-slate-200 dark:border-slate-800 rounded-xl text-sm font-medium focus:ring-2 focus:ring-brand-500 focus:outline-none"
            >
              <option value="Home">Home</option>
              <option value="Work">Work Office</option>
              <option value="College">College / Campus</option>
              <option value="Other">Other Custom</option>
            </select>
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-1">
              Full Address Address *
            </label>
            <input
              type="text"
              required
              value={newPlace.address}
              onChange={(e) => setNewPlace({ ...newPlace, address: e.target.value })}
              placeholder="e.g. 100ft Road, Indiranagar, Bengaluru"
              className="w-full px-4 py-3 bg-slate-50 dark:bg-dark-input border border-slate-200 dark:border-slate-800 rounded-xl text-sm font-medium focus:ring-2 focus:ring-brand-500 focus:outline-none"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-1">
              Custom Tag / Note
            </label>
            <input
              type="text"
              value={newPlace.note}
              onChange={(e) => setNewPlace({ ...newPlace, note: e.target.value })}
              placeholder="e.g. Primary Gate 2"
              className="w-full px-4 py-3 bg-slate-50 dark:bg-dark-input border border-slate-200 dark:border-slate-800 rounded-xl text-sm font-medium focus:ring-2 focus:ring-brand-500 focus:outline-none"
            />
          </div>

          <Button type="submit" variant="primary" fullWidth icon={Plus}>
            Save Location
          </Button>
        </form>
      </Modal>
    </div>
  );
};

export default SavedPlaces;
