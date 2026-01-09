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
    title: 'Day 1 – Chandigarh to Shimla Mountain Journey',
    description: 'Welcome to the Queen of Hills! Begin your Himalayan adventure with a scenic mountain drive (115 km / ~4 hours). • Pickup from Chandigarh Railway Station/Airport/Hotel • Drive through Kalka and winding mountain roads with pine forests • Pass through Solan (Mushroom City of India) • Arrive in Shimla and hotel check-in • Evening walk on Mall Road (colonial-era shopping street) • Visit The Ridge (open space with Christ Church and mountain views) • Photo stop at Christ Church (neo-Gothic architecture from 1857) • Overnight stay in Shimla',
    activities: ['Chandigarh departure', 'Scenic drive', 'Hotel check-in', 'Mall Road', 'The Ridge', 'Christ Church'],
    meals: ['Dinner']
  },
  {
    day: 2,
    title: 'Day 2 – Kufri Winter Wonderland & Shimla Heritage',
    description: 'Explore Shimla\'s highest point and colonial treasures. • Morning excursion to Kufri (16 km / ~30 minutes from Shimla at 2,743m) • Visit Himalayan Nature Park (rare Himalayan wildlife like snow leopards, yaks, musk deer) • Horse or yak rides on snowy slopes (seasonal) • Mahasu Peak trek for panoramic Himalayan views • Afternoon Shimla sightseeing: Indian Institute of Advanced Studies (former Viceregal Lodge with British architecture) • Jakhoo Temple (ancient Hanuman temple at Shimla\'s highest point, 2,455m) • Sankat Mochan Temple • Evening free for Mall Road shopping • Overnight stay in Shimla',
    activities: ['Kufri visit', 'Himalayan Nature Park', 'Horse/Yak rides', 'Mahasu Peak', 'Indian Institute of Advanced Studies', 'Jakhoo Temple', 'Sankat Mochan Temple'],
    meals: ['Breakfast', 'Dinner']
  },
  {
    day: 3,
    title: 'Day 3 – Shimla to Manali via Kullu Valley',
    description: 'Journey through breathtaking Himalayan landscapes to the Valley of Gods (265 km / ~7-8 hours). • Morning checkout from Shimla • Scenic mountain drive through Himachal\'s most beautiful route • Photo stop at Sundernagar Lake • Pandoh Dam (reservoir on Beas River) • Drive through Kullu Valley (Valley of Gods with apple orchards) • Visit traditional Kullu shawl factory (famous for handwoven shawls and caps) • Beautiful Beas River views throughout the journey • Arrive in Manali and hotel check-in • Overnight stay in Manali',
    activities: ['Scenic mountain drive', 'Sundernagar Lake', 'Pandoh Dam', 'Kullu shawl factory', 'Beas River views', 'Manali check-in'],
    meals: ['Breakfast', 'Dinner']
  },
  {
    day: 4,
    title: 'Day 4 – Solang Valley Adventure Playground',
    description: 'Experience the thrill of Himalayan adventure sports! • Full day excursion to Solang Valley (14 km from Manali at 2,560m) • Paragliding over snow-capped mountains (optional) • Zorbing (rolling down in a transparent ball) • ATV (All-Terrain Vehicle) rides on mountain slopes • Ropeway/Cable car ride for valley views • Optional: Atal Tunnel excursion to Sissu (world\'s longest highway tunnel at 3,000m) • Snow activities (seasonal: December-March) • Return to Manali • Overnight stay in Manali',
    activities: ['Solang Valley', 'Paragliding', 'Zorbing', 'ATV rides', 'Ropeway', 'Atal Tunnel (optional)', 'Snow activities'],
    meals: ['Breakfast', 'Dinner']
  },
  {
    day: 5,
    title: 'Day 5 – Manali Heritage Tour & Chandigarh Return',
    description: 'Explore Manali\'s spiritual sites before departing with mountain memories (315 km / ~8 hours return). • Morning Manali local sightseeing: Hadimba Devi Temple (ancient wooden temple dedicated to Hadimba from Mahabharata) • Vashisht Hot Water Springs (natural sulfur springs for therapeutic bath) • Van Vihar (peaceful park with tall deodar trees) • Tibetan Monastery (Buddhist monastery with colorful prayer wheels) • Mall Road shopping for woolen clothes, handicrafts, and souvenirs • Afternoon drive back to Chandigarh via Kullu Valley • Drop at Chandigarh Railway Station/Airport • Tour ends',
    activities: ['Hadimba Temple', 'Vashisht Hot Springs', 'Van Vihar', 'Tibetan Monastery', 'Mall Road shopping', 'Return to Chandigarh'],
    meals: ['Breakfast']
  }
];

const shimlaManali4N5D: TourPackage = {
  id: 'hp_shimla_manali_4n5d_001',
  slug: 'shimla-manali-classic-5-days-4-nights',
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
    'https://images.unsplash.com/photo-1606240724602-5fff10f2b4c9?w=1200&auto=format&fit=crop', // Shimla Ridge
    'https://images.unsplash.com/photo-1626621341517-bbf3d9990a23?w=1200&auto=format&fit=crop', // Kufri Snow
    'https://images.unsplash.com/photo-1605649487212-47bdab064df7?w=1200&auto=format&fit=crop', // Manali Solang
    'https://images.unsplash.com/photo-1626621341580-9b4f81b8f8b0?w=1200&auto=format&fit=crop', // Hadimba Temple
    'https://images.unsplash.com/photo-1606240724602-5fff10f2b4c9?w=1200&auto=format&fit=crop', // Himachal Mountains
    'https://images.unsplash.com/photo-1626621341517-bbf3d9990a23?w=1200&auto=format&fit=crop' // Hill Station View
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
    title: 'Day 1 – Chandigarh to Shimla Hill Escape',
    description: 'Begin your extended Himachal journey to the colonial summer capital (115 km / ~4 hours). • Pickup from Chandigarh Railway Station/Airport/Hotel • Scenic drive through Kalka and pine-covered mountain roads • Pass through Solan (Mushroom City) • Arrive in Shimla and hotel check-in • Evening leisure at Mall Road (British-era shopping promenade) • Visit Christ Church (beautiful neo-Gothic church from 1857) • Walk on The Ridge (open space with panoramic mountain views) • Overnight stay in Shimla',
    activities: ['Chandigarh departure', 'Scenic drive', 'Check-in', 'Mall Road', 'Christ Church', 'The Ridge'],
    meals: ['Dinner']
  },
  {
    day: 2,
    title: 'Day 2 – Kufri Winter Wonderland & Shimla Heritage Tour',
    description: 'Discover Shimla\'s highest peaks and colonial legacy. • Morning excursion to Kufri (16 km at 2,743m elevation) • Visit Himalayan Nature Park (snow leopards, yaks, rare Himalayan fauna) • Mahasu Peak trek (highest point in Kufri) • Kufri Fun World (amusement park with go-karts and rides) • Afternoon Shimla sightseeing: Jakhoo Temple (Hanuman temple at 2,455m with giant statue) • Sankat Mochan Temple • Indian Institute of Advanced Studies (Viceregal Lodge) • Mall Road shopping • Overnight stay in Shimla',
    activities: ['Kufri', 'Himalayan Nature Park', 'Mahasu Peak', 'Kufri Fun World', 'Jakhoo Temple', 'Sankat Mochan Temple', 'Indian Institute'],
    meals: ['Breakfast', 'Dinner']
  },
  {
    day: 3,
    title: 'Day 3 – Shimla to Manali through Kullu Valley',
    description: 'Journey through Himachal\'s most scenic route to the adventure capital (265 km / ~7-8 hours). • Morning checkout from Shimla • Scenic mountain highway drive • Photo stop at Sundernagar Lake (serene reservoir) • Pandoh Dam on Beas River • Enter Kullu Valley (Valley of Gods with apple orchards and deodar forests) • Visit traditional Kullu shawl factory (famous handwoven products) • Beautiful Beas River views throughout • Arrive in Manali and hotel check-in • Overnight stay in Manali',
    activities: ['Sundernagar Lake', 'Pandoh Dam', 'Kullu Valley', 'Shawl factory', 'Beas River', 'Manali arrival'],
    meals: ['Breakfast', 'Dinner']
  },
  {
    day: 4,
    title: 'Day 4 – Solang Valley Adventure & Atal Tunnel Exploration',
    description: 'Experience Himalayan adventure sports and engineering marvel! • Full day at Solang Valley (14 km at 2,560m - adventure capital of Himachal) • Paragliding over snow-capped peaks (optional) • ATV (All-Terrain Vehicle) rides on mountain slopes • Zorbing (transparent ball rolling) • Ropeway/Cable car for panoramic views • Optional: Atal Tunnel visit (world\'s longest highway tunnel above 10,000 feet, 9.02 km long) • Snow activities in winter (December-March) • Overnight stay in Manali',
    activities: ['Solang Valley', 'Paragliding', 'ATV rides', 'Zorbing', 'Ropeway', 'Atal Tunnel', 'Snow activities'],
    meals: ['Breakfast', 'Dinner']
  },
  {
    day: 5,
    title: 'Day 5 – Manali Cultural & Spiritual Heritage Day',
    description: 'Immerse in Manali\'s temples, hot springs, and local charm. • Morning: Hadimba Devi Temple (unique wooden temple dedicated to Hadimba from Mahabharata, built in 1553) • Vashisht Hot Water Springs (natural sulfur springs for therapeutic bathing) • Van Vihar (peaceful municipal park with tall deodar trees and boating) • Tibetan Monastery (Buddhist monastery with colorful prayer wheels and flags) • Afternoon: Manali Mall Road shopping (woolen clothes, shawls, handicrafts) • Explore Old Manali (hippie village with cafes and live music) • Overnight stay in Manali',
    activities: ['Hadimba Temple', 'Vashisht Hot Springs', 'Van Vihar', 'Tibetan Monastery', 'Mall Road', 'Old Manali'],
    meals: ['Breakfast', 'Dinner']
  },
  {
    day: 6,
    title: 'Day 6 – Departure with Himalayan Memories',
    description: 'Final mountain moments before returning to the plains (315 km / ~8 hours). • Morning at leisure (optional last-minute shopping or river walk) • Checkout and begin return journey to Chandigarh • Drive through Kullu Valley and Mandi • Drop at Chandigarh Railway Station/Airport with memories of snow peaks, adventure, and mountain serenity • Tour ends',
    activities: ['Leisure time', 'Shopping', 'Return journey to Chandigarh'],
    meals: ['Breakfast']
  }
];

const shimlaManali5N6D: TourPackage = {
  id: 'hp_shimla_manali_5n6d_001',
  slug: 'shimla-manali-deluxe-6-days-5-nights',
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
    'https://images.unsplash.com/photo-1606240724602-5fff10f2b4c9?w=1200&auto=format&fit=crop', // Shimla Kufri
    'https://images.unsplash.com/photo-1626621341517-bbf3d9990a23?w=1200&auto=format&fit=crop', // Solang Valley Adventure
    'https://images.unsplash.com/photo-1605649487212-47bdab064df7?w=1200&auto=format&fit=crop', // Manali Hadimba
    'https://images.unsplash.com/photo-1626621341580-9b4f81b8f8b0?w=1200&auto=format&fit=crop', // Kullu Valley
    'https://images.unsplash.com/photo-1606240724602-5fff10f2b4c9?w=1200&auto=format&fit=crop', // Mountain Views
    'https://images.unsplash.com/photo-1626621341517-bbf3d9990a23?w=1200&auto=format&fit=crop' // Adventure Activities
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
    title: 'Day 1 – Arrival & Mountain Journey to Shimla',
    description: 'Welcome to the Queen of Hills! Begin your complete Himachal adventure (115 km / ~4 hours). • Pickup from Chandigarh Railway Station/Airport/Hotel • Scenic drive through Kalka and winding mountain roads • Pass through Solan (Mushroom City of India) • Arrive in Shimla and hotel check-in • Evening walk on Mall Road (colonial-era shopping street) • Visit The Ridge (open space with Christ Church and mountain views) • Overnight stay in Shimla',
    activities: ['Chandigarh departure', 'Mountain drive', 'Check-in', 'Mall Road', 'The Ridge', 'Christ Church'],
    meals: ['Dinner']
  },
  {
    day: 2,
    title: 'Day 2 – Kufri Winter Wonderland & Shimla Heritage',
    description: 'Explore Shimla\'s highest point and colonial treasures. • Morning excursion to Kufri (16 km / ~30 minutes at 2,743m) • Visit Himalayan Nature Park (rare Himalayan wildlife) • Mahasu Peak trek for panoramic views • Afternoon Shimla sightseeing: Indian Institute of Advanced Studies (former Viceregal Lodge) • Jakhoo Temple (ancient Hanuman temple at 2,455m) • Sankat Mochan Temple • Evening free for Mall Road shopping • Overnight stay in Shimla',
    activities: ['Kufri', 'Himalayan Nature Park', 'Mahasu Peak', 'Jakhoo Temple', 'Sankat Mochan', 'Indian Institute'],
    meals: ['Breakfast', 'Dinner']
  },
  {
    day: 3,
    title: 'Day 3 – Scenic Transfer to Manali via Kullu Valley',
    description: 'Journey through breathtaking Himalayan landscapes to the Valley of Gods (265 km / ~7-8 hours). • Morning checkout from Shimla • Scenic mountain drive through Himachal\'s most beautiful route • Photo stop at Sundernagar Lake • Pandoh Dam (reservoir on Beas River) • Drive through Kullu Valley (Valley of Gods with apple orchards) • Visit traditional Kullu shawl factory • Beautiful Beas River views throughout • Arrive in Manali and hotel check-in • Overnight stay in Manali',
    activities: ['Sundernagar Lake', 'Pandoh Dam', 'Kullu shawl factory', 'Beas River', 'Manali arrival'],
    meals: ['Breakfast', 'Dinner']
  },
  {
    day: 4,
    title: 'Day 4 – Solang Valley Adventure Playground',
    description: 'Experience the thrill of Himalayan adventure sports! • Full day excursion to Solang Valley (14 km at 2,560m) • Paragliding over snow-capped mountains (optional) • Zorbing (rolling down in a transparent ball) • ATV (All-Terrain Vehicle) rides on mountain slopes • Ropeway/Cable car ride for valley views • Optional: Atal Tunnel excursion (world\'s longest highway tunnel at 3,000m) • Snow activities (seasonal: December-March) • Overnight stay in Manali',
    activities: ['Solang Valley', 'Paragliding', 'Zorbing', 'ATV rides', 'Atal Tunnel', 'Mountain views'],
    meals: ['Breakfast', 'Dinner']
  },
  {
    day: 5,
    title: 'Day 5 – Manali Heritage Tour & Transfer to Dharamshala',
    description: 'Explore Manali\'s spiritual sites before journeying to the spiritual capital (200 km / ~6 hours). • Morning Manali local sightseeing: Hadimba Devi Temple (ancient wooden temple) • Vashisht Hot Water Springs (natural sulfur springs) • Van Vihar (peaceful park with tall deodar trees) • Tibetan Monastery (Buddhist monastery with colorful prayer wheels) • Afternoon scenic drive to Dharamshala through mountain roads • Arrive in Dharamshala and hotel check-in • Overnight stay in Dharamshala',
    activities: ['Hadimba Temple', 'Vashisht Hot Springs', 'Van Vihar', 'Tibetan Monastery', 'Drive to Dharamshala'],
    meals: ['Breakfast', 'Dinner']
  },
  {
    day: 6,
    title: 'Day 6 – Dharamshala Spiritual & Scenic Exploration',
    description: 'Discover the spiritual heart of Himachal Pradesh. • Visit Dalai Lama Temple (Tibetan Buddhist monastery complex) • Explore McLeod Ganj (Little Lhasa with Tibetan culture) • Bhagsu Nag Temple & Waterfall (ancient temple with cascading waterfall) • St. John Church (colonial-era church in the wilderness) • Naddi Viewpoint (panoramic views of Dhauladhar ranges) • Tibetan market shopping (handicrafts, prayer flags, souvenirs) • Overnight stay in Dharamshala',
    activities: ['Dalai Lama Temple', 'McLeod Ganj', 'Bhagsu Nag Temple & Waterfall', 'St. John Church', 'Naddi Viewpoint'],
    meals: ['Breakfast', 'Dinner']
  },
  {
    day: 7,
    title: 'Day 7 – Dharamshala Heritage Tour & Departure',
    description: 'Final spiritual moments before returning to the plains (250 km / ~7 hours). • Morning at leisure (optional last-minute shopping or temple visit) • Checkout and begin return journey to Chandigarh • Drive through Kangra Valley and Mandi • Drop at Chandigarh Railway Station/Airport with wonderful Himachal memories • Tour ends',
    activities: ['Leisure time', 'Return journey', 'Chandigarh drop'],
    meals: ['Breakfast']
  }
];

const shimlaManaliDharamshala6N7D: TourPackage = {
  id: 'hp_smd_6n7d_001',
  slug: 'himachal-grand-tour-7-days-6-nights',
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
    'https://images.unsplash.com/photo-1606240724602-5fff10f2b4c9?w=1200&auto=format&fit=crop', // Shimla Ridge
    'https://images.unsplash.com/photo-1626621341517-bbf3d9990a23?w=1200&auto=format&fit=crop', // Manali Snow
    'https://images.unsplash.com/photo-1605649487212-47bdab064df7?w=1200&auto=format&fit=crop', // Solang Valley
    'https://images.unsplash.com/photo-1626621341580-9b4f81b8f8b0?w=1200&auto=format&fit=crop', // Rohtang Pass
    'https://images.unsplash.com/photo-1606240724602-5fff10f2b4c9?w=1200&auto=format&fit=crop', // Kufri Snow
    'https://images.unsplash.com/photo-1626621341517-bbf3d9990a23?w=1200&auto=format&fit=crop' // Hill Station Views
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
