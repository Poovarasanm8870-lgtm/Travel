// Fare rates configuration per kilometer and per minute
export const RIDE_RATES = {
  bike: {
    id: 'bike',
    name: 'RideFlow Bike',
    tagline: 'Fastest through traffic',
    baseFare: 25,
    perKmRate: 10,
    perMinRate: 1.5,
    platformFee: 5,
    capacity: '1 Person',
    etaMinutes: 3,
    icon: 'Bike',
    image: 'https://images.unsplash.com/photo-1558981806-ec527fa84c39?auto=format&fit=crop&w=400&q=80',
  },
  auto: {
    id: 'auto',
    name: 'RideFlow Auto',
    tagline: 'Comfortable everyday travel',
    baseFare: 35,
    perKmRate: 14,
    perMinRate: 2,
    platformFee: 7,
    capacity: '3 Persons',
    etaMinutes: 5,
    icon: 'CarSimple',
    image: 'https://images.unsplash.com/photo-1593941707882-a5bba14938c7?auto=format&fit=crop&w=400&q=80',
  },
  cab: {
    id: 'cab',
    name: 'RideFlow Sedan',
    tagline: 'Air-conditioned hatchback/sedan',
    baseFare: 60,
    perKmRate: 18,
    perMinRate: 2.5,
    platformFee: 10,
    capacity: '4 Persons',
    etaMinutes: 7,
    icon: 'Car',
    image: 'https://images.unsplash.com/photo-1549317661-bd32c8ce0db2?auto=format&fit=crop&w=400&q=80',
  },
  premium: {
    id: 'premium',
    name: 'RideFlow Luxury',
    tagline: 'Top rated drivers & luxury SUVs',
    baseFare: 100,
    perKmRate: 28,
    perMinRate: 4,
    platformFee: 15,
    capacity: '6 Persons',
    etaMinutes: 8,
    icon: 'Crown',
    image: 'https://images.unsplash.com/photo-1563720223185-11003d516935?auto=format&fit=crop&w=400&q=80',
  },
};

export const calculateFare = (rideType = 'bike', distanceKm = 8.5, durationMins = 22) => {
  const rateConfig = RIDE_RATES[rideType] || RIDE_RATES.bike;
  
  const baseFare = rateConfig.baseFare;
  const distanceCharge = Math.round(distanceKm * rateConfig.perKmRate);
  const timeCharge = Math.round(durationMins * rateConfig.perMinRate);
  const platformFee = rateConfig.platformFee;
  
  const subtotal = baseFare + distanceCharge + timeCharge + platformFee;
  const gstTax = Math.round(subtotal * 0.05); // 5% GST
  const total = subtotal + gstTax;

  return {
    rideType,
    baseFare,
    distanceCharge,
    timeCharge,
    platformFee,
    gstTax,
    total,
    distanceKm,
    durationMins,
    rateConfig,
  };
};

export const calculateEstimatedDistanceAndTime = (pickup = '', destination = '') => {
  if (!pickup || !destination) {
    return { distanceKm: 8.5, durationMins: 22 };
  }
  // Generate deterministic distance/time from input strings for consistent UI demo
  let hash = 0;
  const combined = pickup.toLowerCase() + destination.toLowerCase();
  for (let i = 0; i < combined.length; i++) {
    hash = (hash << 5) - hash + combined.charCodeAt(i);
    hash |= 0;
  }
  const positiveHash = Math.abs(hash);
  const distanceKm = Number(((positiveHash % 150) / 10 + 2.5).toFixed(1)); // 2.5km to 17.5km
  const durationMins = Math.round(distanceKm * 2.8 + 4); // Estimated travel mins

  return { distanceKm, durationMins };
};
