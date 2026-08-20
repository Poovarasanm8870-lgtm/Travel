import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination } from 'swiper/modules';
import { ShieldCheck, Zap, Award, Star, ArrowRight, CheckCircle2, Clock, ThumbsUp } from 'lucide-react';
import BookingCard from '../components/BookingCard';
import MapPreview from '../components/MapPreview';
import StatCounter from '../components/StatCounter';
import Button from '../components/Button';
import { SERVICES_DATA } from '../data/services';

const TESTIMONIALS = [
  {
    id: 1,
    name: 'Priya Sharma',
    role: 'Product Manager, Swiggy',
    comment: 'RideFlow Bike is my daily lifesaver! I beat the morning peak hour traffic in Koramangala and save at least 35 minutes every single day.',
    avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=150&q=80',
    rating: 5,
  },
  {
    id: 2,
    name: 'Rohan Mehta',
    role: 'Software Architect',
    comment: 'The pricing transparency is unreal. No hidden surcharges, instant captain matching, and super smooth cab rides. RideFlow is next-level!',
    avatar: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=150&q=80',
    rating: 5,
  },
  {
    id: 3,
    name: 'Ananya Rao',
    role: 'University Student',
    comment: 'I love the safety features like live GPS sharing and 24/7 SOS support. As a solo rider returning late from college, I feel 100% safe.',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&q=80',
    rating: 5,
  },
];

const Home = () => {
  return (
    <div className="pt-24 pb-16 space-y-24 overflow-hidden">
      {/* 1. Hero Section */}
      <section className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Background Subtle Gradient Blobs */}
        <div className="absolute top-0 right-1/4 w-96 h-96 bg-brand-500/10 rounded-full blur-3xl -z-10 pointer-events-none" />
        <div className="absolute bottom-0 left-10 w-80 h-80 bg-accent-500/10 rounded-full blur-3xl -z-10 pointer-events-none" />

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Left Hero Content */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-6 space-y-6"
          >
            <div className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full bg-brand-500/10 text-brand-600 dark:text-brand-400 text-xs font-bold border border-brand-500/20">
              <Zap className="w-4 h-4" />
              <span>Next-Gen Urban Mobility Platform</span>
            </div>

            <h1 className="text-4xl sm:text-6xl font-black text-slate-900 dark:text-white leading-[1.15] tracking-tight">
              Move smarter.{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-500 to-teal-400">
                Ride better.
              </span>
            </h1>

            <p className="text-base sm:text-lg text-slate-600 dark:text-slate-300 leading-relaxed font-medium max-w-xl">
              Experience lightning-fast bike taxis, auto meters, and premium AC cabs with zero surge gimmicks, 100% verified captains, and real-time live GPS tracking.
            </p>

            <div className="flex flex-wrap items-center gap-4 pt-2">
              <Link to="/book-ride">
                <Button variant="primary" size="lg" icon={ArrowRight}>
                  Book a Ride Now
                </Button>
              </Link>
              <Link to="/services">
                <Button variant="outline" size="lg">
                  Explore Services
                </Button>
              </Link>
            </div>

            {/* Micro Highlights */}
            <div className="pt-6 grid grid-cols-3 gap-4 border-t border-slate-200 dark:border-slate-800 text-xs font-semibold text-slate-600 dark:text-slate-400">
              <div className="flex items-center space-x-2">
                <CheckCircle2 className="w-4 h-4 text-brand-500" />
                <span>Zero Haggling</span>
              </div>
              <div className="flex items-center space-x-2">
                <Clock className="w-4 h-4 text-brand-500" />
                <span>3 Min Average Pick</span>
              </div>
              <div className="flex items-center space-x-2">
                <ShieldCheck className="w-4 h-4 text-brand-500" />
                <span>SOS Assistance</span>
              </div>
            </div>
          </motion.div>

          {/* Right Hero Booking Card */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="lg:col-span-6 animate-float"
          >
            <BookingCard />
          </motion.div>
        </div>
      </section>

      {/* 2. Simulated Hero Map Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
        <div className="text-center max-w-2xl mx-auto space-y-2">
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white">
            Real-Time Live Map Experience
          </h2>
          <p className="text-sm text-slate-500 dark:text-slate-400">
            Track your captain's precise location and route trajectory with millisecond precision.
          </p>
        </div>

        <MapPreview pickupName="Indiranagar 100ft Rd" dropName="MG Road Metro" rideType="bike" />
      </section>

      {/* 3. Stat Counters */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          <StatCounter value="1000000" suffix="+" label="Rides Completed" />
          <StatCounter value="50000" suffix="+" label="Verified Captains" />
          <StatCounter value="25" suffix="+" label="Cities Operating" />
          <StatCounter value="4.9" suffix="/5" label="Average User Rating" />
        </div>
      </section>

      {/* 4. Fleet Services Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        <div className="flex flex-col md:flex-row md:items-end justify-between">
          <div>
            <span className="text-xs font-extrabold uppercase tracking-widest text-brand-500">
              Our Versatile Fleet
            </span>
            <h2 className="text-3xl font-black text-slate-900 dark:text-white mt-1">
              Choose the Perfect Ride for Every Trip
            </h2>
          </div>
          <Link to="/services" className="mt-4 md:mt-0">
            <Button variant="ghost" size="sm" icon={ArrowRight}>
              View All Specs
            </Button>
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {SERVICES_DATA.map((service) => (
            <motion.div
              key={service.id}
              whileHover={{ y: -8 }}
              className="glass-panel p-6 rounded-3xl group flex flex-col justify-between hover:shadow-card-hover transition-all duration-300"
            >
              <div className="space-y-4">
                <div className="relative h-44 rounded-2xl overflow-hidden bg-slate-100 dark:bg-slate-800">
                  <img
                    src={service.image}
                    alt={service.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <span className="absolute top-3 right-3 bg-slate-900/80 backdrop-blur-md text-white text-[10px] font-extrabold px-2.5 py-1 rounded-full uppercase tracking-wider">
                    {service.badge}
                  </span>
                </div>

                <div>
                  <h3 className="text-lg font-extrabold text-slate-900 dark:text-white">
                    {service.title}
                  </h3>
                  <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 line-clamp-2">
                    {service.description}
                  </p>
                </div>
              </div>

              <div className="pt-4 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between mt-4">
                <span className="text-xs font-bold text-brand-600 dark:text-brand-400">
                  {service.pricing}
                </span>
                <Link to="/book-ride">
                  <div className="w-8 h-8 rounded-xl bg-brand-500 text-white flex items-center justify-center group-hover:scale-110 transition-transform">
                    <ArrowRight className="w-4 h-4" />
                  </div>
                </Link>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* 5. Swiper Testimonials Slider */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="text-center max-w-xl mx-auto space-y-2">
          <span className="text-xs font-extrabold uppercase tracking-widest text-brand-500">
            Rider Love
          </span>
          <h2 className="text-3xl font-black text-slate-900 dark:text-white">
            Trusted by Millions Daily
          </h2>
        </div>

        <Swiper
          modules={[Autoplay, Pagination]}
          spaceBetween={24}
          slidesPerView={1}
          autoplay={{ delay: 4000, disableOnInteraction: false }}
          pagination={{ clickable: true }}
          breakpoints={{
            640: { slidesPerView: 2 },
            1024: { slidesPerView: 3 },
          }}
          className="pb-12"
        >
          {TESTIMONIALS.map((t) => (
            <SwiperSlide key={t.id}>
              <div className="glass-panel p-6 rounded-3xl h-full flex flex-col justify-between space-y-4">
                <div className="space-y-3">
                  <div className="flex items-center space-x-1 text-amber-400">
                    {[...Array(t.rating)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-current" />
                    ))}
                  </div>
                  <p className="text-sm text-slate-600 dark:text-slate-300 italic leading-relaxed">
                    "{t.comment}"
                  </p>
                </div>

                <div className="flex items-center space-x-3 pt-4 border-t border-slate-100 dark:border-slate-800">
                  <img src={t.avatar} alt={t.name} className="w-10 h-10 rounded-full object-cover ring-2 ring-brand-500" />
                  <div>
                    <h4 className="text-xs font-bold text-slate-900 dark:text-white">{t.name}</h4>
                    <p className="text-[11px] text-slate-400">{t.role}</p>
                  </div>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </section>

      {/* 6. CTA Banner */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative rounded-3xl bg-gradient-to-r from-brand-600 to-teal-500 p-8 sm:p-12 text-white overflow-hidden shadow-2xl">
          <div className="relative z-10 max-w-2xl space-y-4">
            <h2 className="text-3xl sm:text-4xl font-black tracking-tight">
              Ready to Upgrade Your Daily Commute?
            </h2>
            <p className="text-brand-100 text-sm sm:text-base font-medium">
              Join over 1 Million+ riders across India who save time and money with RideFlow.
            </p>
            <div className="pt-2">
              <Link to="/book-ride">
                <Button variant="secondary" size="lg" icon={ArrowRight}>
                  Book Your First Ride
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
