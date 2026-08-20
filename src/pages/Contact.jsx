import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Mail, Phone, MapPin, Send, CheckCircle2, MessageSquare, ShieldAlert } from 'lucide-react';
import Button from '../components/Button';
import { isValidEmail } from '../utils/validation';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: 'General Support',
    message: '',
  });
  const [errors, setErrors] = useState({});
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    if (errors[e.target.name]) {
      setErrors({ ...errors, [e.target.name]: '' });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newErrors = {};

    if (!formData.name.trim()) newErrors.name = 'Name is required';
    if (!formData.email.trim() || !isValidEmail(formData.email)) newErrors.email = 'Valid email required';
    if (!formData.message.trim()) newErrors.message = 'Message cannot be empty';

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setIsSubmitted(true);
    setTimeout(() => {
      setFormData({ name: '', email: '', phone: '', subject: 'General Support', message: '' });
    }, 500);
  };

  return (
    <div className="pt-28 pb-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
      {/* Header */}
      <div className="text-center max-w-2xl mx-auto space-y-4">
        <span className="px-3.5 py-1.5 rounded-full bg-brand-500/10 text-brand-600 dark:text-brand-400 text-xs font-bold uppercase tracking-wider">
          Contact & Customer Care
        </span>
        <h1 className="text-4xl font-black text-slate-900 dark:text-white tracking-tight">
          We're Here to Help 24/7
        </h1>
        <p className="text-slate-600 dark:text-slate-300 text-base font-medium">
          Have a question about a ride, payment refund, or captain application? Drop us a message.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
        {/* Left Contact Info */}
        <div className="lg:col-span-5 space-y-6">
          <div className="glass-panel p-6 sm:p-8 rounded-3xl space-y-6">
            <h3 className="text-xl font-extrabold text-slate-900 dark:text-white">
              Get in Touch Directly
            </h3>

            <div className="space-y-4 text-sm">
              <div className="flex items-start space-x-4">
                <div className="p-3 rounded-2xl bg-brand-500/10 text-brand-500">
                  <Mail className="w-5 h-5" />
                </div>
                <div>
                  <p className="font-bold text-slate-900 dark:text-white">Email Us</p>
                  <p className="text-slate-500 dark:text-slate-400">support@rideflow.app</p>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <div className="p-3 rounded-2xl bg-brand-500/10 text-brand-500">
                  <Phone className="w-5 h-5" />
                </div>
                <div>
                  <p className="font-bold text-slate-900 dark:text-white">24/7 Support Helpline</p>
                  <p className="text-slate-500 dark:text-slate-400">+91 1800 420 9900 (Toll Free)</p>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <div className="p-3 rounded-2xl bg-brand-500/10 text-brand-500">
                  <MapPin className="w-5 h-5" />
                </div>
                <div>
                  <p className="font-bold text-slate-900 dark:text-white">Headquarters</p>
                  <p className="text-slate-500 dark:text-slate-400">
                    RideFlow Mobility Tower, 100ft Road, Indiranagar, Bengaluru 560038
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="glass-panel p-6 rounded-3xl bg-gradient-to-tr from-brand-500/10 to-teal-500/5 space-y-3">
            <div className="flex items-center space-x-2 text-brand-500 font-bold text-sm">
              <ShieldAlert className="w-5 h-5" />
              <span>Ride Safety Assistance</span>
            </div>
            <p className="text-xs text-slate-600 dark:text-slate-400">
              In case of an ongoing ride emergency or safety incident, please tap the SOS button in your Ride Status tracker for immediate response.
            </p>
          </div>
        </div>

        {/* Right Form Card */}
        <div className="lg:col-span-7">
          <div className="glass-panel p-6 sm:p-10 rounded-3xl relative">
            <AnimatePresence>
              {isSubmitted ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="text-center py-12 space-y-4"
                >
                  <div className="w-16 h-16 rounded-full bg-emerald-100 dark:bg-emerald-950/50 text-emerald-500 flex items-center justify-center mx-auto">
                    <CheckCircle2 className="w-8 h-8" />
                  </div>
                  <h3 className="text-2xl font-extrabold text-slate-900 dark:text-white">
                    Message Sent Successfully!
                  </h3>
                  <p className="text-sm text-slate-500 dark:text-slate-400 max-w-md mx-auto">
                    Thank you for reaching out. Our customer support team will respond to your query within 24 hours.
                  </p>
                  <Button variant="outline" onClick={() => setIsSubmitted(false)}>
                    Send Another Message
                  </Button>
                </motion.div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <h3 className="text-xl font-extrabold text-slate-900 dark:text-white mb-6">
                    Send Us a Message
                  </h3>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-1">
                        Full Name *
                      </label>
                      <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        placeholder="John Doe"
                        className="w-full px-4 py-3 bg-slate-50 dark:bg-dark-input border border-slate-200 dark:border-slate-800 rounded-xl text-sm font-medium focus:ring-2 focus:ring-brand-500 focus:outline-none"
                      />
                      {errors.name && <p className="text-xs text-red-500 mt-1">{errors.name}</p>}
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-1">
                        Email Address *
                      </label>
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        placeholder="john@example.com"
                        className="w-full px-4 py-3 bg-slate-50 dark:bg-dark-input border border-slate-200 dark:border-slate-800 rounded-xl text-sm font-medium focus:ring-2 focus:ring-brand-500 focus:outline-none"
                      />
                      {errors.email && <p className="text-xs text-red-500 mt-1">{errors.email}</p>}
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-1">
                        Phone Number
                      </label>
                      <input
                        type="tel"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        placeholder="9876543210"
                        className="w-full px-4 py-3 bg-slate-50 dark:bg-dark-input border border-slate-200 dark:border-slate-800 rounded-xl text-sm font-medium focus:ring-2 focus:ring-brand-500 focus:outline-none"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-1">
                        Subject
                      </label>
                      <select
                        name="subject"
                        value={formData.subject}
                        onChange={handleChange}
                        className="w-full px-4 py-3 bg-slate-50 dark:bg-dark-input border border-slate-200 dark:border-slate-800 rounded-xl text-sm font-medium focus:ring-2 focus:ring-brand-500 focus:outline-none"
                      >
                        <option value="General Support">General Support</option>
                        <option value="Ride Refund">Ride Refund Inquiry</option>
                        <option value="Become a Captain">Become a Captain</option>
                        <option value="Corporate Booking">Corporate Booking</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-1">
                      Message *
                    </label>
                    <textarea
                      name="message"
                      rows="4"
                      value={formData.message}
                      onChange={handleChange}
                      placeholder="Describe your issue or query..."
                      className="w-full px-4 py-3 bg-slate-50 dark:bg-dark-input border border-slate-200 dark:border-slate-800 rounded-xl text-sm font-medium focus:ring-2 focus:ring-brand-500 focus:outline-none"
                    ></textarea>
                    {errors.message && <p className="text-xs text-red-500 mt-1">{errors.message}</p>}
                  </div>

                  <Button type="submit" variant="primary" fullWidth icon={Send}>
                    Submit Inquiry
                  </Button>
                </form>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
