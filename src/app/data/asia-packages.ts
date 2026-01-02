import {
  TourPackage,
  RoomOption,
  ItineraryDay
} from '../models/tour-package.model';

/**
 * Asia Tour Packages - Sri Lanka, Bali, Singapore-Malaysia
 * Data source: /tour-docs/
 */

// Common room options for Asia packages
const asiaRoomOptions: RoomOption[] = [
  {
    id: 'room_double_asia',
    type: 'DOUBLE',
    name: 'Double Sharing',
    description: 'Two guests sharing one room with double bed',
    bedType: 'Double Bed',
    adultCapacity: 2,
    childCapacity: 1,
    priceModifier: 0
  },
  {
    id: 'room_twin_asia',
    type: 'TWIN',
    name: 'Twin Sharing',
    description: 'Two guests sharing one room with twin beds',
    bedType: 'Twin Beds',
    adultCapacity: 2,
    childCapacity: 1,
    priceModifier: 0
  },
  {
    id: 'room_single_asia',
    type: 'SINGLE',
    name: 'Single Occupancy',
    description: 'One guest in a private room',
    bedType: 'Single/Double Bed',
    adultCapacity: 1,
    childCapacity: 0,
    priceModifier: 12000
  }
];

// ==============================================
// SRI LANKA 5N/6D PACKAGE
// ==============================================

const sriLanka5N6D_Itinerary: ItineraryDay[] = [
  {
    day: 1,
    title: 'Arrival in Colombo - Transfer to Negombo',
    description: 'Arrive at Bandaranaike International Airport, transfer to Negombo beach hotel. Explore Negombo Beach and local fish market.',
    activities: ['Airport pickup', 'Transfer to Negombo', 'Beach leisure', 'Fish market visit'],
    meals: []
  },
  {
    day: 2,
    title: 'Negombo to Sigiriya via Pinnawala & Dambulla',
    description: 'Visit Pinnawala Elephant Orphanage to see elephants bathing. Explore Dambulla Cave Temple and ancient rock temples.',
    activities: ['Pinnawala Elephant Orphanage', 'Elephant bathing & feeding', 'Dambulla Cave Temple', 'Ancient Buddha statues'],
    meals: ['Breakfast']
  },
  {
    day: 3,
    title: 'Sigiriya Rock Fortress & Polonnaruwa Ancient City',
    description: 'Early morning climb Sigiriya Rock Fortress (UNESCO site) for panoramic views. Explore Polonnaruwa Ancient City with royal palaces.',
    activities: ['Sigiriya Rock climb', 'Panoramic views', 'Polonnaruwa Ancient City', 'Gal Vihara Buddha', 'Royal palaces'],
    meals: ['Breakfast']
  },
  {
    day: 4,
    title: 'Sigiriya to Kandy via Matale Spice Garden',
    description: 'Transfer to Kandy visiting Matale Spice Garden. Explore Temple of the Tooth Relic and attend evening puja ceremony.',
    activities: ['Matale Spice Garden', 'Spice & herb learning', 'Temple of the Tooth Relic', 'Evening puja ceremony', 'Kandy Lake'],
    meals: ['Breakfast']
  },
  {
    day: 5,
    title: 'Kandy to Nuwara Eliya via Tea Plantations',
    description: 'Scenic drive to Nuwara Eliya through tea country. Visit tea plantations & factory. Explore Gregory Lake and hill town.',
    activities: ['Tea Plantations & Factory', 'Ceylon tea tasting', 'Ramboda Falls', 'Gregory Lake', 'Nuwara Eliya town tour'],
    meals: ['Breakfast']
  },
  {
    day: 6,
    title: 'Nuwara Eliya to Colombo - Departure',
    description: 'Early breakfast and scenic drive to Colombo. Transfer to airport for departure.',
    activities: ['Scenic drive through hill country', 'Airport transfer'],
    meals: ['Breakfast']
  }
];

const sriLanka5N6D: TourPackage = {
  id: 'sri_lanka_5n6d_001',
  slug: 'sri-lanka-cultural-triangle-6-days-5-nights',
  packageCode: 'LK-5N6D-001',
  name: 'Sri Lanka Cultural Triangle - 5N/6D',
  description: 'Explore Sri Lanka\'s UNESCO World Heritage sites including Sigiriya Rock, ancient Polonnaruwa, sacred Kandy, and beautiful Nuwara Eliya tea country.',
  category: 'FAMILY',
  type: 'INTERNATIONAL',
  days: 6,
  nights: 5,
  basePrice: 34999,
  currency: 'INR',
  destinations: ['Colombo', 'Negombo', 'Sigiriya', 'Kandy', 'Nuwara Eliya'],
  highlights: [
    'Sigiriya Rock Fortress - UNESCO World Heritage Site',
    'Pinnawala Elephant Orphanage',
    'Dambulla Cave Temple with ancient Buddha statues',
    'Polonnaruwa Ancient City ruins',
    'Temple of the Tooth Relic in Kandy',
    'Tea Plantations & Factory visit in Nuwara Eliya',
    'Matale Spice Garden experience'
  ],
  inclusions: [
    '5 Nights accommodation in Sri Lanka with daily breakfast',
    'Airport to Hotel to Airport transfers',
    'Pinnawala Elephant Orphanage visit',
    'Dambulla Cave Temple visit',
    'Sigiriya Rock Fortress entrance',
    'Polonnaruwa Ancient City tour',
    'Matale Spice Garden visit',
    'Temple of the Tooth Relic visit in Kandy',
    'Tea Plantations & Ramboda Falls visit',
    'Guided sightseeing as per itinerary',
    'All transfers in private AC vehicle',
    'English-speaking guide',
    'All applicable taxes'
  ],
  exclusions: [
    'International airfare to/from Sri Lanka',
    'Lunch & Dinner (except where mentioned)',
    'Optional activities (boat rides, adventure sports)',
    'Personal expenses: shopping, tips, minibar, laundry',
    'Travel insurance',
    'Anything not mentioned in inclusions'
  ],
  itinerary: sriLanka5N6D_Itinerary,
  departures: [],
  imageUrl: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=800',
  galleryImages: [
    'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=1200&auto=format&fit=crop', // Sri Lanka Temple
    'https://images.unsplash.com/photo-1579965342575-16428a7c8520?w=1200&auto=format&fit=crop', // Sigiriya Rock
    'https://images.unsplash.com/photo-1557838923-2985c318be48?w=1200&auto=format&fit=crop', // Kandy Lake
    'https://images.unsplash.com/photo-1608147951827-b7a66c6f1c86?w=1200&auto=format&fit=crop', // Tea Plantations
    'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=1200&auto=format&fit=crop', // Beaches
    'https://images.unsplash.com/photo-1579965342575-16428a7c8520?w=1200&auto=format&fit=crop' // Wildlife
  ],
  rating: 4.7,
  totalReviews: 543,
  isActive: true,
  pricingType: 'DATE_BASED',
  datePricing: [
    {
      date: '2025-01-24',
      departureCity: 'Mumbai',
      availableSeats: 18,
      status: 'AVAILABLE',
      price: 34999,
      twinSharingPrice: 34999,
      singleOccupancyPrice: 46999,
      isLowestPrice: true
    },
    {
      date: '2025-02-10',
      departureCity: 'Delhi',
      availableSeats: 14,
      status: 'AVAILABLE',
      price: 36999,
      twinSharingPrice: 36999,
      singleOccupancyPrice: 48999
    },
    {
      date: '2025-02-24',
      departureCity: 'Bangalore',
      availableSeats: 8,
      status: 'FILLING_FAST',
      price: 38999,
      twinSharingPrice: 38999,
      singleOccupancyPrice: 50999
    },
    {
      date: '2025-03-12',
      departureCity: 'Chennai',
      availableSeats: 16,
      status: 'AVAILABLE',
      price: 37999,
      twinSharingPrice: 37999,
      singleOccupancyPrice: 49999
    },
    {
      date: '2025-03-28',
      departureCity: 'Hyderabad',
      availableSeats: 12,
      status: 'AVAILABLE',
      price: 39999,
      twinSharingPrice: 39999,
      singleOccupancyPrice: 51999
    }
  ],
  roomOptions: asiaRoomOptions,
  badgeType: 'FAMILY',
  tourType: 'FAMILY',
  emiAvailable: true,
  emiStartingFrom: 5834,
  includes: [
    { icon: 'hotel', label: 'Hotels' },
    { icon: 'meals', label: 'Daily Breakfast' },
    { icon: 'transport', label: 'Private AC Vehicle' },
    { icon: 'sightseeing', label: 'All UNESCO Sites' }
  ]
};

// ==============================================
// BALI 4N/5D PACKAGE
// ==============================================

const bali4N5D_Itinerary: ItineraryDay[] = [
  {
    day: 1,
    title: 'Arrival in Bali - Kuta/Seminyak Beach Leisure',
    description: 'Arrive at Ngurah Rai International Airport, transfer to hotel in Kuta/Seminyak. Evening beach leisure and sunset.',
    activities: ['Airport pickup', 'Hotel check-in', 'Kuta/Seminyak Beach', 'Sunset views', 'Local cafes'],
    meals: []
  },
  {
    day: 2,
    title: 'Ubud Sightseeing & Tanah Lot Temple',
    description: 'Full day Ubud tour visiting Monkey Forest, Tegalalang Rice Terrace, Art Market, and Tirta Empul Temple. Evening sunset at Tanah Lot Temple.',
    activities: ['Ubud Monkey Forest', 'Tegalalang Rice Terrace', 'Ubud Art Market', 'Royal Palace', 'Tirta Empul Temple', 'Tanah Lot sunset'],
    meals: ['Breakfast']
  },
  {
    day: 3,
    title: 'Nusa Dua Water Sports & Uluwatu Temple with Kecak Dance',
    description: 'Morning at Nusa Dua Beach with optional water sports. Afternoon visit Uluwatu Temple on cliff and watch spectacular Kecak Dance performance.',
    activities: ['Nusa Dua Beach', 'Optional water sports', 'Uluwatu Temple', 'Kecak Dance Performance', 'Cliff views'],
    meals: ['Breakfast', 'Lunch']
  },
  {
    day: 4,
    title: 'Mount Batur Sunrise Trek & Tegenungan Waterfall',
    description: 'Early morning Mount Batur sunrise trek with breakfast on mountain. Visit Tegenungan Waterfall and explore local markets.',
    activities: ['Mount Batur sunrise trek', 'Mountain breakfast', 'Lake Batur views', 'Tegenungan Waterfall', 'Ubud markets'],
    meals: ['Breakfast']
  },
  {
    day: 5,
    title: 'Departure from Bali',
    description: 'Check out and transfer to Ngurah Rai International Airport for departure.',
    activities: ['Hotel checkout', 'Airport transfer'],
    meals: ['Breakfast']
  }
];

const bali4N5D: TourPackage = {
  id: 'bali_4n5d_001',
  slug: 'bali-adventure-5-days-4-nights',
  packageCode: 'BALI-4N5D-001',
  name: 'Bali Adventure - 4N/5D',
  description: 'Experience Bali\'s cultural treasures and natural beauty with Ubud temples, Mount Batur sunrise trek, Uluwatu Kecak Dance, and pristine beaches.',
  category: 'FAMILY',
  type: 'INTERNATIONAL',
  days: 5,
  nights: 4,
  basePrice: 36999,
  currency: 'INR',
  destinations: ['Bali', 'Ubud', 'Uluwatu'],
  highlights: [
    'Mount Batur Sunrise Trek with mountain breakfast',
    'Ubud Monkey Forest & Tegalalang Rice Terrace',
    'Uluwatu Temple with spectacular Kecak Dance',
    'Tanah Lot Temple sunset views',
    'Tirta Empul Holy Water Temple',
    'Nusa Dua Beach with water sports',
    'Tegenungan Waterfall'
  ],
  inclusions: [
    '4 Nights accommodation in Bali with daily breakfast',
    'Airport to Hotel to Airport transfers',
    'Ubud sightseeing including Monkey Forest, Tegalalang Rice Terrace, Art Market & Royal Palace',
    'Tirta Empul Temple & Tanah Lot Temple visit',
    'Nusa Dua Beach Water Sports (optional activities extra)',
    'Uluwatu Temple & Kecak Dance Performance',
    'Mount Batur Sunrise Trek with breakfast',
    'Tegenungan Waterfall visit',
    'All sightseeing & transfers on SIC/Private basis',
    'English-speaking guide',
    'All applicable taxes'
  ],
  exclusions: [
    'International airfare to/from Bali',
    'Lunch & Dinner (except where mentioned)',
    'Optional activities & water sports at Nusa Dua',
    'Personal expenses: shopping, tips, minibar, laundry',
    'Travel Insurance',
    'Anything not mentioned in inclusions'
  ],
  itinerary: bali4N5D_Itinerary,
  departures: [],
  imageUrl: 'https://images.unsplash.com/photo-1537996194471-e657df975ab4?w=800',
  galleryImages: [
    'https://images.unsplash.com/photo-1537996194471-e657df975ab4?w=1200&auto=format&fit=crop', // Bali Temples
    'https://images.unsplash.com/photo-1518548419970-58e3b4079ab2?w=1200&auto=format&fit=crop', // Ubud Rice Terraces
    'https://images.unsplash.com/photo-1555400038-63f5ba517a47?w=1200&auto=format&fit=crop', // Bali Beaches
    'https://images.unsplash.com/photo-1604999333679-b86d54738315?w=1200&auto=format&fit=crop', // Tanah Lot Temple
    'https://images.unsplash.com/photo-1537996194471-e657df975ab4?w=1200&auto=format&fit=crop', // Balinese Culture
    'https://images.unsplash.com/photo-1518548419970-58e3b4079ab2?w=1200&auto=format&fit=crop' // Volcanic Views
  ],
  rating: 4.8,
  totalReviews: 721,
  isActive: true,
  pricingType: 'DATE_BASED',
  datePricing: [
    {
      date: '2025-01-20',
      departureCity: 'Mumbai',
      availableSeats: 20,
      status: 'AVAILABLE',
      price: 36999,
      twinSharingPrice: 36999,
      singleOccupancyPrice: 48999,
      isLowestPrice: true
    },
    {
      date: '2025-02-06',
      departureCity: 'Delhi',
      availableSeats: 16,
      status: 'AVAILABLE',
      price: 38999,
      twinSharingPrice: 38999,
      singleOccupancyPrice: 50999
    },
    {
      date: '2025-02-19',
      departureCity: 'Bangalore',
      availableSeats: 10,
      status: 'FILLING_FAST',
      price: 40999,
      twinSharingPrice: 40999,
      singleOccupancyPrice: 52999
    },
    {
      date: '2025-03-07',
      departureCity: 'Chennai',
      availableSeats: 18,
      status: 'AVAILABLE',
      price: 39999,
      twinSharingPrice: 39999,
      singleOccupancyPrice: 51999
    },
    {
      date: '2025-03-21',
      departureCity: 'Pune',
      availableSeats: 14,
      status: 'AVAILABLE',
      price: 41999,
      twinSharingPrice: 41999,
      singleOccupancyPrice: 53999
    }
  ],
  roomOptions: asiaRoomOptions,
  badgeType: 'FAMILY',
  tourType: 'FAMILY',
  emiAvailable: true,
  emiStartingFrom: 6167,
  includes: [
    { icon: 'hotel', label: 'Beach Hotels' },
    { icon: 'meals', label: 'Breakfast Daily' },
    { icon: 'transport', label: 'All Transfers' },
    { icon: 'sightseeing', label: 'Temples & Trekking' }
  ]
};

// ==============================================
// SINGAPORE 3N + MALAYSIA 2N COMBO
// ==============================================

const singaporeMalaysia5N6D_Itinerary: ItineraryDay[] = [
  {
    day: 1,
    title: 'Arrival in Singapore + Night Safari',
    description: 'Arrive at Changi Airport, transfer to hotel. Evening experience world-famous Night Safari with Tram Ride and Creatures of the Night Show.',
    activities: ['Airport pickup', 'Hotel check-in', 'Night Safari', 'Tram Ride', 'Animal shows'],
    meals: []
  },
  {
    day: 2,
    title: 'Singapore City Tour + Sentosa Island',
    description: 'Morning Singapore City Tour covering Merlion, Marina Bay, Little India. Afternoon Sentosa Island with Madame Tussauds and Wings of Time Show.',
    activities: ['Merlion Park', 'Marina Bay Sands', 'Little India', 'Chinatown', 'Sentosa Cable Car', 'Madame Tussauds', 'Wings of Time Show'],
    meals: ['Breakfast']
  },
  {
    day: 3,
    title: 'Universal Studios Singapore',
    description: 'Full day at Universal Studios with thrilling rides in Hollywood, Sci-Fi City, Ancient Egypt, and Jurassic Park zones.',
    activities: ['Universal Studios all zones', 'Transformers ride', 'Jurassic Park', 'Waterworld show', 'Theme park attractions'],
    meals: ['Breakfast']
  },
  {
    day: 4,
    title: 'Singapore to Kuala Lumpur + Putrajaya Tour',
    description: 'Transfer to Kuala Lumpur by luxury coach (5-6 hrs). Afternoon Putrajaya tour visiting Putra Mosque, bridges, and government buildings.',
    activities: ['Singapore-KL transfer', 'Border crossing', 'Putrajaya Putra Mosque', 'Putra Bridge', 'Prime Minister Office', 'KL check-in'],
    meals: ['Breakfast']
  },
  {
    day: 5,
    title: 'KL City Tour + Genting Highlands',
    description: 'Morning Kuala Lumpur City Tour. Afternoon Genting Highlands with cable car ride and SkyAvenue Mall.',
    activities: ['King\'s Palace', 'Independence Square', 'Petronas Towers', 'KL Tower', 'Genting Cable Car', 'SkyAvenue Mall', 'Skytropolis'],
    meals: ['Breakfast']
  },
  {
    day: 6,
    title: 'Departure from Kuala Lumpur',
    description: 'Check out and transfer to Kuala Lumpur International Airport for return journey.',
    activities: ['Hotel checkout', 'Airport transfer'],
    meals: ['Breakfast']
  }
];

const singaporeMalaysia5N6D: TourPackage = {
  id: 'sing_malay_5n6d_001',
  slug: 'singapore-malaysia-combo-6-days-5-nights',
  packageCode: 'SGMY-5N6D-001',
  name: 'Singapore-Malaysia Combo - 5N/6D',
  description: 'Best of both countries: Singapore Night Safari, Universal Studios, Sentosa, plus Malaysia\'s Putrajaya, KL City, and Genting Highlands.',
  category: 'FAMILY',
  type: 'INTERNATIONAL',
  days: 6,
  nights: 5,
  basePrice: 42999,
  currency: 'INR',
  destinations: ['Singapore', 'Kuala Lumpur', 'Putrajaya', 'Genting'],
  highlights: [
    'Night Safari with Tram & Animal Shows',
    'Universal Studios Singapore - Full Day',
    'Sentosa Island with Madame Tussauds & Wings of Time',
    'Singapore City & Marina Bay Tour',
    'Putrajaya Pink Mosque & Bridges',
    'Genting Highlands Cable Car',
    'Kuala Lumpur - Petronas Towers & KL Tower'
  ],
  inclusions: [
    '3 Nights hotel accommodation in Singapore',
    '2 Nights accommodation in Kuala Lumpur',
    'Daily breakfast',
    'Night Safari with Tram & Show',
    'Half-Day Singapore City Tour',
    'Sentosa Island Tour (Cable Car + attractions + Wings of Time)',
    'Universal Studios Full-Day Access',
    'Singapore to Kuala Lumpur Transfer by Coach/Private',
    'Putrajaya Tour',
    'KL City Tour',
    'Genting Highlands Tour + Cable Car',
    'All transfers in Singapore & Malaysia (SIC/Private)',
    'Kuala Lumpur Airport Transfers',
    'All taxes (except hotel tourism tax)'
  ],
  exclusions: [
    'Airfare',
    'Singapore & Malaysia Visa charges',
    'Travel Insurance',
    'Lunch & Dinner',
    'Hotel tourism tax (Singapore & Malaysia) payable at hotel',
    'Optional Activities (SEA Aquarium, Gardens by the Bay, Indoor Theme Park, etc.)',
    'Personal expenses (shopping, drinks, tips)',
    'Anything not mentioned in inclusions'
  ],
  itinerary: singaporeMalaysia5N6D_Itinerary,
  departures: [],
  imageUrl: 'https://images.unsplash.com/photo-1525625293386-3f8f99389edd?w=800',
  galleryImages: [
    'https://images.unsplash.com/photo-1525625293386-3f8f99389edd?w=1200&auto=format&fit=crop', // Marina Bay Singapore
    'https://images.unsplash.com/photo-1480714378408-67cf0d13bc1b?w=1200&auto=format&fit=crop', // Gardens by the Bay
    'https://images.unsplash.com/photo-1596422846543-75c6fc197f07?w=1200&auto=format&fit=crop', // Petronas Towers KL
    'https://images.unsplash.com/photo-1542267207-f8127b454605?w=1200&auto=format&fit=crop', // Universal Studios
    'https://images.unsplash.com/photo-1562503542-2a1e6f03b16b?w=1200&auto=format&fit=crop', // Sentosa Island
    'https://images.unsplash.com/photo-1525625293386-3f8f99389edd?w=1200&auto=format&fit=crop' // Singapore Skyline
  ],
  rating: 4.7,
  totalReviews: 982,
  isActive: true,
  pricingType: 'DATE_BASED',
  datePricing: [
    {
      date: '2025-01-26',
      departureCity: 'Mumbai',
      availableSeats: 24,
      status: 'AVAILABLE',
      price: 42999,
      twinSharingPrice: 42999,
      singleOccupancyPrice: 56999,
      isLowestPrice: true
    },
    {
      date: '2025-02-11',
      departureCity: 'Delhi',
      availableSeats: 18,
      status: 'AVAILABLE',
      price: 44999,
      twinSharingPrice: 44999,
      singleOccupancyPrice: 58999
    },
    {
      date: '2025-02-25',
      departureCity: 'Bangalore',
      availableSeats: 10,
      status: 'FILLING_FAST',
      price: 46999,
      twinSharingPrice: 46999,
      singleOccupancyPrice: 60999
    },
    {
      date: '2025-03-14',
      departureCity: 'Chennai',
      availableSeats: 20,
      status: 'AVAILABLE',
      price: 45999,
      twinSharingPrice: 45999,
      singleOccupancyPrice: 59999
    },
    {
      date: '2025-03-29',
      departureCity: 'Hyderabad',
      availableSeats: 16,
      status: 'AVAILABLE',
      price: 47999,
      twinSharingPrice: 47999,
      singleOccupancyPrice: 61999
    }
  ],
  roomOptions: asiaRoomOptions,
  badgeType: 'FAMILY',
  tourType: 'FAMILY',
  emiAvailable: true,
  emiStartingFrom: 7167,
  includes: [
    { icon: 'hotel', label: 'Hotels' },
    { icon: 'meals', label: 'Daily Breakfast' },
    { icon: 'transport', label: 'All Transfers' },
    { icon: 'sightseeing', label: 'Top Attractions' }
  ]
};

// Export all Asia packages
export const ASIA_TOUR_PACKAGES: TourPackage[] = [
  sriLanka5N6D,
  bali4N5D,
  singaporeMalaysia5N6D
];

export default ASIA_TOUR_PACKAGES;
