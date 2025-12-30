import {
  TourPackage,
  RoomOption,
  ItineraryDay
} from '../models/tour-package.model';

/**
 * Himachal Pradesh Tour Packages - Shimla, Manali, Dharamshala, Dalhousie
 * Data source: /tour-docs/HIMACHAL PRADESH TOUR PACKAGES.docx
 */

// Common room options for Himachal packages
const himachalRoomOptions: RoomOption[] = [
  {
    id: 'room_double_hp',
    type: 'DOUBLE',
    name: 'Double Sharing',
    description: 'Two guests sharing one room with double bed',
    bedType: 'Double Bed',
    adultCapacity: 2,
    childCapacity: 1,
    priceModifier: 0
  },
  {
    id: 'room_twin_hp',
    type: 'TWIN',
    name: 'Twin Sharing',
    description: 'Two guests sharing one room with twin beds',
    bedType: 'Twin Beds',
    adultCapacity: 2,
    childCapacity: 1,
    priceModifier: 0
  },
  {
    id: 'room_single_hp',
    type: 'SINGLE',
    name: 'Single Occupancy',
    description: 'One guest in a private room',
    bedType: 'Single/Double Bed',
    adultCapacity: 1,
    childCapacity: 0,
    priceModifier: 4000
  }
];

// ==============================================
// SHIMLA-MANALI 4N/5D PACKAGE
// ==============================================

const shimlaManali4N5D_Itinerary: ItineraryDay[] = [
  {
    day: 1,
    title: 'Chandigarh to Shimla',
    description: 'Depart from Chandigarh and drive to Shimla through scenic pine forests and mountain roads. Check in and evening Mall Road exploration.',
    activities: ['Chandigarh departure', 'Scenic drive', 'Hotel check-in', 'Mall Road', 'The Ridge', 'Christ Church'],
    meals: ['Dinner']
  },
  {
    day: 2,
    title: 'Kufri Excursion + Shimla Local Sightseeing',
    description: 'Morning trip to Kufri for nature park and adventure activities. Afternoon Shimla sightseeing covering temples and viewpoints.',
    activities: ['Kufri visit', 'Himalayan Nature Park', 'Horse/Yak rides', 'Mahasu Peak', 'Indian Institute of Advanced Studies', 'Jakhoo Temple', 'Sankat Mochan Temple'],
    meals: ['Breakfast', 'Dinner']
  },
  {
    day: 3,
    title: 'Shimla to Manali via Kullu',
    description: 'Scenic drive to Manali passing through Sundernagar, Pandoh Dam, and Kullu Valley. Visit shawl factory and riverside views.',
    activities: ['Scenic mountain drive', 'Sundernagar Lake', 'Pandoh Dam', 'Kullu shawl factory', 'Beas River views', 'Manali check-in'],
    meals: ['Breakfast', 'Dinner']
  },
  {
    day: 4,
    title: 'Solang Valley / Atal Tunnel Adventure',
    description: 'Full day excursion to Solang Valley for adventure activities. Optional Atal Tunnel visit for high-altitude experience.',
    activities: ['Solang Valley', 'Paragliding', 'Zorbing', 'ATV rides', 'Ropeway', 'Atal Tunnel (optional)', 'Snow activities'],
    meals: ['Breakfast', 'Dinner']
  },
  {
    day: 5,
    title: 'Manali Local + Chandigarh Drop',
    description: 'Morning Manali local sightseeing. Afternoon drive back to Chandigarh with beautiful mountain memories.',
    activities: ['Hadimba Temple', 'Vashisht Hot Springs', 'Van Vihar', 'Tibetan Monastery', 'Mall Road shopping', 'Return to Chandigarh'],
    meals: ['Breakfast']
  }
];

const shimlaManali4N5D: TourPackage = {
  id: 'hp_shimla_manali_4n5d_001',
  packageCode: 'HP-SM-4N5D-001',
  name: 'Shimla-Manali Classic - 4N/5D',
  description: 'Experience Himachal\'s most popular hill stations with Shimla\'s colonial charm, Kufri\'s nature, and Manali\'s adventure at Solang Valley.',
  category: 'FAMILY',
  type: 'DOMESTIC',
  days: 5,
  nights: 4,
  basePrice: 14999,
  currency: 'INR',
  destinations: ['Shimla', 'Kufri', 'Manali', 'Solang Valley'],
  highlights: [
    'Shimla Mall Road & The Ridge colonial experience',
    'Kufri - Himalayan Nature Park & Mahasu Peak',
    'Scenic drive through Kullu Valley',
    'Solang Valley adventure activities',
    'Hadimba Temple & Vashisht Hot Springs',
    'Optional Atal Tunnel high-altitude experience'
  ],
  inclusions: [
    '4 nights accommodation (Shimla 2N + Manali 2N)',
    'Breakfast and dinner daily',
    'All transfers and sightseeing by private vehicle',
    'Driver allowances, toll taxes, parking, and fuel',
    'Pick-up & drop from Chandigarh',
    'All applicable hotel taxes'
  ],
  exclusions: [
    'Any Airfare / Train fare',
    'Lunch & personal expenses',
    'Adventure activities at Solang Valley / Kufri',
    'Entry fees to monuments, parks, or attractions',
    'Rohtang Pass Permit / Atal Tunnel special charges',
    'Anything not mentioned under inclusions'
  ],
  itinerary: shimlaManali4N5D_Itinerary,
  departures: [],
  imageUrl: 'https://images.unsplash.com/photo-1626621341517-bbf3d9990a23?w=800',
  galleryImages: [
    '/gallery/shimla-ridge.jpg',
    '/gallery/kufri-snow.jpg',
    '/gallery/manali-solang.jpg',
    '/gallery/hadimba-temple.jpg'
  ],
  rating: 4.5,
  totalReviews: 1456,
  isActive: true,
  pricingType: 'DATE_BASED',
  datePricing: [
    {
      date: '2025-02-01',
      departureCity: 'Chandigarh',
      availableSeats: 24,
      status: 'AVAILABLE',
      price: 14999,
      twinSharingPrice: 14999,
      singleOccupancyPrice: 18999,
      isLowestPrice: true
    },
    {
      date: '2025-02-15',
      departureCity: 'Chandigarh',
      availableSeats: 18,
      status: 'AVAILABLE',
      price: 16999,
      twinSharingPrice: 16999,
      singleOccupancyPrice: 20999
    },
    {
      date: '2025-03-01',
      departureCity: 'Chandigarh',
      availableSeats: 12,
      status: 'FILLING_FAST',
      price: 17999,
      twinSharingPrice: 17999,
      singleOccupancyPrice: 21999
    },
    {
      date: '2025-03-15',
      departureCity: 'Chandigarh',
      availableSeats: 20,
      status: 'AVAILABLE',
      price: 16999,
      twinSharingPrice: 16999,
      singleOccupancyPrice: 20999
    },
    {
      date: '2025-04-01',
      departureCity: 'Chandigarh',
      availableSeats: 16,
      status: 'AVAILABLE',
      price: 18999,
      twinSharingPrice: 18999,
      singleOccupancyPrice: 22999
    }
  ],
  roomOptions: himachalRoomOptions,
  badgeType: 'FAMILY',
  tourType: 'FAMILY',
  emiAvailable: true,
  emiStartingFrom: 2500,
  includes: [
    { icon: 'hotel', label: 'Hotels' },
    { icon: 'meals', label: 'Breakfast & Dinner' },
    { icon: 'transport', label: 'Private Cab' },
    { icon: 'sightseeing', label: 'All Sightseeing' }
  ]
};

// ==============================================
// SHIMLA-MANALI 5N/6D PACKAGE
// ==============================================

const shimlaManali5N6D_Itinerary: ItineraryDay[] = [
  {
    day: 1,
    title: 'Chandigarh to Shimla',
    description: 'Drive from Chandigarh to Shimla through winding mountain roads and pine forests. Evening Mall Road stroll.',
    activities: ['Chandigarh departure', 'Scenic drive', 'Check-in', 'Mall Road', 'Christ Church', 'The Ridge'],
    meals: ['Dinner']
  },
  {
    day: 2,
    title: 'Kufri Excursion + Shimla Local',
    description: 'Visit Kufri for nature park and adventure. Shimla local sightseeing covering major attractions.',
    activities: ['Kufri', 'Himalayan Nature Park', 'Mahasu Peak', 'Kufri Fun World', 'Jakhoo Temple', 'Sankat Mochan Temple', 'Indian Institute'],
    meals: ['Breakfast', 'Dinner']
  },
  {
    day: 3,
    title: 'Shimla to Manali via Kullu Valley',
    description: 'Scenic journey to Manali with stops at Sundernagar Lake, Pandoh Dam, and Kullu shawl factories.',
    activities: ['Sundernagar Lake', 'Pandoh Dam', 'Kullu Valley', 'Shawl factory', 'Beas River', 'Manali arrival'],
    meals: ['Breakfast', 'Dinner']
  },
  {
    day: 4,
    title: 'Solang Valley / Atal Tunnel Full Day',
    description: 'Adventure day at Solang Valley with optional paragliding, zorbing, and ATV rides. Optional Atal Tunnel visit.',
    activities: ['Solang Valley', 'Paragliding', 'ATV rides', 'Zorbing', 'Ropeway', 'Atal Tunnel', 'Snow activities'],
    meals: ['Breakfast', 'Dinner']
  },
  {
    day: 5,
    title: 'Manali Local Sightseeing',
    description: 'Explore Manali\'s cultural and natural attractions. Visit temples, hot springs, and local markets.',
    activities: ['Hadimba Temple', 'Vashisht Hot Springs', 'Van Vihar', 'Tibetan Monastery', 'Mall Road', 'Old Manali'],
    meals: ['Breakfast', 'Dinner']
  },
  {
    day: 6,
    title: 'Manali to Chandigarh Drop',
    description: 'Morning at leisure. Afternoon drive back to Chandigarh with mountain memories.',
    activities: ['Leisure time', 'Shopping', 'Return journey to Chandigarh'],
    meals: ['Breakfast']
  }
];

const shimlaManali5N6D: TourPackage = {
  id: 'hp_shimla_manali_5n6d_001',
  packageCode: 'HP-SM-5N6D-001',
  name: 'Shimla-Manali Deluxe - 5N/6D',
  description: 'Extended Himachal tour with more time to explore Shimla\'s heritage and Manali\'s adventure. Perfect blend of culture and nature.',
  category: 'FAMILY',
  type: 'DOMESTIC',
  days: 6,
  nights: 5,
  basePrice: 18999,
  currency: 'INR',
  destinations: ['Shimla', 'Kufri', 'Manali', 'Solang Valley'],
  highlights: [
    'Shimla colonial heritage & Mall Road',
    'Kufri Nature Park & adventure activities',
    'Kullu Valley scenic drive & shawl factory',
    'Solang Valley full day adventure',
    'Manali local temples & hot springs',
    'Atal Tunnel high-altitude experience'
  ],
  inclusions: [
    '5 nights accommodation (Shimla 2N + Manali 3N)',
    'Breakfast and dinner daily',
    'All sightseeing and transfers by private cab',
    'Pick-up and drop at Chandigarh',
    'Parking charges, tolls, driver allowances, and fuel',
    'All applicable hotel taxes'
  ],
  exclusions: [
    'Airfare / Train fare',
    'Lunch and personal expenses',
    'Adventure activities at Solang, Kufri, or Atal Tunnel',
    'Entry fees to monuments or parks',
    'Rohtang Pass vehicle/permit charges (if applicable)',
    'Anything not mentioned in the inclusions'
  ],
  itinerary: shimlaManali5N6D_Itinerary,
  departures: [],
  imageUrl: 'https://images.unsplash.com/photo-1605649487212-47bdab064df7?w=800',
  galleryImages: [
    '/gallery/shimla-kufri.jpg',
    '/gallery/solang-valley-adventure.jpg',
    '/gallery/manali-hadimba.jpg',
    '/gallery/kullu-valley.jpg'
  ],
  rating: 4.6,
  totalReviews: 1287,
  isActive: true,
  pricingType: 'DATE_BASED',
  datePricing: [
    {
      date: '2025-02-03',
      departureCity: 'Chandigarh',
      availableSeats: 22,
      status: 'AVAILABLE',
      price: 18999,
      twinSharingPrice: 18999,
      singleOccupancyPrice: 22999,
      isLowestPrice: true
    },
    {
      date: '2025-02-17',
      departureCity: 'Chandigarh',
      availableSeats: 16,
      status: 'AVAILABLE',
      price: 20999,
      twinSharingPrice: 20999,
      singleOccupancyPrice: 24999
    },
    {
      date: '2025-03-03',
      departureCity: 'Chandigarh',
      availableSeats: 10,
      status: 'FILLING_FAST',
      price: 21999,
      twinSharingPrice: 21999,
      singleOccupancyPrice: 25999
    },
    {
      date: '2025-03-17',
      departureCity: 'Chandigarh',
      availableSeats: 18,
      status: 'AVAILABLE',
      price: 20999,
      twinSharingPrice: 20999,
      singleOccupancyPrice: 24999
    },
    {
      date: '2025-04-05',
      departureCity: 'Chandigarh',
      availableSeats: 14,
      status: 'AVAILABLE',
      price: 22999,
      twinSharingPrice: 22999,
      singleOccupancyPrice: 26999
    }
  ],
  roomOptions: himachalRoomOptions,
  badgeType: 'FAMILY',
  tourType: 'FAMILY',
  emiAvailable: true,
  emiStartingFrom: 3167,
  includes: [
    { icon: 'hotel', label: 'Hotels' },
    { icon: 'meals', label: 'Breakfast & Dinner' },
    { icon: 'transport', label: 'Private Cab' },
    { icon: 'sightseeing', label: 'All Sightseeing' }
  ]
};

// ==============================================
// SHIMLA-MANALI-DHARAMSHALA 6N/7D PACKAGE
// ==============================================

const shimlaManaliDharamshala6N7D_Itinerary: ItineraryDay[] = [
  {
    day: 1,
    title: 'Chandigarh to Shimla',
    description: 'Scenic drive to Shimla, the Queen of Hills. Evening Mall Road and Ridge exploration.',
    activities: ['Chandigarh departure', 'Mountain drive', 'Check-in', 'Mall Road', 'The Ridge', 'Christ Church'],
    meals: ['Dinner']
  },
  {
    day: 2,
    title: 'Kufri Excursion + Shimla Local',
    description: 'Morning Kufri visit for nature and adventure. Afternoon Shimla heritage sightseeing.',
    activities: ['Kufri', 'Himalayan Nature Park', 'Mahasu Peak', 'Jakhoo Temple', 'Sankat Mochan', 'Indian Institute'],
    meals: ['Breakfast', 'Dinner']
  },
  {
    day: 3,
    title: 'Shimla to Manali via Kullu',
    description: 'Beautiful drive through valleys and riverside. Stopover at Pandoh Dam and Kullu.',
    activities: ['Sundernagar Lake', 'Pandoh Dam', 'Kullu shawl factory', 'Beas River', 'Manali arrival'],
    meals: ['Breakfast', 'Dinner']
  },
  {
    day: 4,
    title: 'Solang Valley / Atal Tunnel Adventure',
    description: 'Full day at Solang Valley with adventure activities and optional Atal Tunnel visit.',
    activities: ['Solang Valley', 'Paragliding', 'Zorbing', 'ATV rides', 'Atal Tunnel', 'Mountain views'],
    meals: ['Breakfast', 'Dinner']
  },
  {
    day: 5,
    title: 'Manali Local + Transfer to Dharamshala',
    description: 'Morning Manali sightseeing. Afternoon scenic drive to Dharamshala.',
    activities: ['Hadimba Temple', 'Vashisht Hot Springs', 'Van Vihar', 'Tibetan Monastery', 'Drive to Dharamshala'],
    meals: ['Breakfast', 'Dinner']
  },
  {
    day: 6,
    title: 'Dharamshala Local Sightseeing',
    description: 'Explore spiritual McLeod Ganj, Dalai Lama Temple, and scenic viewpoints.',
    activities: ['Dalai Lama Temple', 'McLeod Ganj', 'Bhagsu Nag Temple & Waterfall', 'St. John Church', 'Naddi Viewpoint'],
    meals: ['Breakfast', 'Dinner']
  },
  {
    day: 7,
    title: 'Dharamshala to Chandigarh Drop',
    description: 'Morning at leisure. Drive back to Chandigarh with wonderful Himachal memories.',
    activities: ['Leisure time', 'Return journey', 'Chandigarh drop'],
    meals: ['Breakfast']
  }
];

const shimlaManaliDharamshala6N7D: TourPackage = {
  id: 'hp_smd_6n7d_001',
  packageCode: 'HP-SMD-6N7D-001',
  name: 'Himachal Grand Tour - 6N/7D',
  description: 'Complete Himachal experience covering Shimla\'s colonial charm, Manali\'s adventure, and Dharamshala\'s spiritual serenity.',
  category: 'FAMILY',
  type: 'DOMESTIC',
  days: 7,
  nights: 6,
  basePrice: 22999,
  currency: 'INR',
  destinations: ['Shimla', 'Kufri', 'Manali', 'Solang', 'Dharamshala', 'McLeod Ganj'],
  highlights: [
    'Shimla - The Queen of Hills colonial heritage',
    'Kufri Nature Park & Mahasu Peak',
    'Manali adventure at Solang Valley',
    'Dharamshala - Dalai Lama Temple & McLeod Ganj',
    'Bhagsu Waterfall & spiritual monasteries',
    'Scenic mountain drives through 3 hill stations'
  ],
  inclusions: [
    '6 nights accommodation (Shimla 2N + Manali 3N + Dharamshala 1N)',
    'Breakfast and dinner every day',
    'Private cab for the entire trip',
    'Chandigarh pick-up and drop',
    'All sightseeing as per itinerary',
    'Driver allowances, toll taxes, parking, and fuel',
    'All applicable hotel taxes'
  ],
  exclusions: [
    'Airfare / Train fare',
    'Lunch, snacks, and personal expenses',
    'Adventure activities at Solang, Kufri, or Atal Tunnel',
    'Monument / park entry charges',
    'Rohtang Pass vehicle & permit (if applicable)',
    'Anything not mentioned in inclusions'
  ],
  itinerary: shimlaManaliDharamshala6N7D_Itinerary,
  departures: [],
  imageUrl: 'https://images.unsplash.com/photo-1626621341517-bbf3d9990a23?w=800',
  galleryImages: [
    'https://images.unsplash.com/photo-1606240724602-5fff10f2b4c9?auto=format&fit=crop&w=800',
    'https://images.unsplash.com/photo-1626621341517-bbf3d9990a23?w=800',
    'https://images.unsplash.com/photo-1605649487212-47bdab064df7?w=800',
    'https://images.unsplash.com/photo-1626621341580-9b4f81b8f8b0?w=800'
  ],
  rating: 4.7,
  totalReviews: 934,
  isActive: true,
  pricingType: 'DATE_BASED',
  datePricing: [
    {
      date: '2025-02-05',
      departureCity: 'Chandigarh',
      availableSeats: 20,
      status: 'AVAILABLE',
      price: 22999,
      twinSharingPrice: 22999,
      singleOccupancyPrice: 26999,
      isLowestPrice: true
    },
    {
      date: '2025-02-19',
      departureCity: 'Chandigarh',
      availableSeats: 14,
      status: 'AVAILABLE',
      price: 24999,
      twinSharingPrice: 24999,
      singleOccupancyPrice: 28999
    },
    {
      date: '2025-03-05',
      departureCity: 'Chandigarh',
      availableSeats: 8,
      status: 'FILLING_FAST',
      price: 25999,
      twinSharingPrice: 25999,
      singleOccupancyPrice: 29999
    },
    {
      date: '2025-03-19',
      departureCity: 'Chandigarh',
      availableSeats: 16,
      status: 'AVAILABLE',
      price: 24999,
      twinSharingPrice: 24999,
      singleOccupancyPrice: 28999
    },
    {
      date: '2025-04-08',
      departureCity: 'Chandigarh',
      availableSeats: 12,
      status: 'AVAILABLE',
      price: 26999,
      twinSharingPrice: 26999,
      singleOccupancyPrice: 30999
    }
  ],
  roomOptions: himachalRoomOptions,
  badgeType: 'FAMILY',
  tourType: 'FAMILY',
  emiAvailable: true,
  emiStartingFrom: 3834,
  includes: [
    { icon: 'hotel', label: 'Hotels' },
    { icon: 'meals', label: 'Breakfast & Dinner' },
    { icon: 'transport', label: 'Private Cab' },
    { icon: 'sightseeing', label: 'All 3 Destinations' }
  ]
};

// Export all Himachal packages
export const HIMACHAL_TOUR_PACKAGES: TourPackage[] = [
  shimlaManali4N5D,
  shimlaManali5N6D,
  shimlaManaliDharamshala6N7D
];

export default HIMACHAL_TOUR_PACKAGES;
