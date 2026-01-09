import {
  TourPackage,
  RoomOption,
  ItineraryDay
} from '../models/tour-package.model';

/**
 * North India Tour Packages - Uttarakhand, Jammu & Kashmir
 * Data source: /tour-docs/
 */

// Common room options for North India packages
const northIndiaRoomOptions: RoomOption[] = [
  {
    id: 'room_double_north',
    type: 'DOUBLE',
    name: 'Double Sharing',
    description: 'Two guests sharing one room with double bed',
    bedType: 'Double Bed',
    adultCapacity: 2,
    childCapacity: 1,
    priceModifier: 0
  },
  {
    id: 'room_twin_north',
    type: 'TWIN',
    name: 'Twin Sharing',
    description: 'Two guests sharing one room with twin beds',
    bedType: 'Twin Beds',
    adultCapacity: 2,
    childCapacity: 1,
    priceModifier: 0
  },
  {
    id: 'room_single_north',
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
// UTTARAKHAND 4N/5D - HARIDWAR RISHIKESH MUSSOORIE
// ==============================================

const uttarakhand4N5D_Itinerary: ItineraryDay[] = [
  {
    day: 1,
    title: 'Day 1 – Arrival & Divine Ganga Aarti Experience',
    description: 'Welcome to the spiritual gateway of Uttarakhand! Begin your divine journey. • Pickup from Dehradun Airport or Haridwar Railway Station • Transfer to hotel and check-in • Visit Har Ki Pauri (sacred ghat where Ganga touches the plains) • Mansa Devi Temple (cable car ride to hilltop temple) • Daksh Temple (ancient Shiva temple) • Evening attend divine Ganga Aarti ceremony (spiritual light ceremony on the riverbank) • Overnight stay in Haridwar',
    activities: ['Hotel check-in', 'Har Ki Pauri', 'Mansa Devi Temple', 'Daksh Temple', 'Ganga Aarti ceremony'],
    meals: ['Dinner']
  },
  {
    day: 2,
    title: 'Day 2 – Rishikesh Yoga Capital & Scenic Drive to Mussoorie',
    description: 'Explore the world\'s yoga capital before ascending to the Queen of Hills (80 km / ~2.5 hours). • Morning visit to Rishikesh: Ram Jhula (iconic suspension bridge over Ganga) • Laxman Jhula (twin bridge with spiritual significance) • Parmarth Niketan (famous ashram with evening Ganga Aarti) • Triveni Ghat (sacred bathing ghat) • Beatles Ashram (where the Beatles learned meditation) • Afternoon scenic drive to Mussoorie through mountain roads • Arrive in Mussoorie and hotel check-in • Evening walk on Mall Road • Overnight stay in Mussoorie',
    activities: ['Ram Jhula', 'Laxman Jhula', 'Parmarth Niketan', 'Triveni Ghat', 'Beatles Ashram', 'Transfer to Mussoorie', 'Mall Road'],
    meals: ['Breakfast', 'Dinner']
  },
  {
    day: 3,
    title: 'Day 3 – Mussoorie Hill Station Exploration',
    description: 'Discover the charm of Mussoorie, the Queen of Hills. • Full day sightseeing: Kempty Falls (picturesque waterfall perfect for photography) • Gun Hill Point (ropeway ride to highest point with panoramic views) • Company Garden (beautiful botanical garden with flowers) • Lal Tibba (highest point in Mussoorie with telescope views) • Camel\'s Back Road (scenic walking trail with mountain views) • Mussoorie Lake (serene lake with boating) • Evening free for shopping on Mall Road • Overnight stay in Mussoorie',
    activities: ['Kempty Falls', 'Gun Hill ropeway', 'Company Garden', 'Lal Tibba viewpoint', 'Camel\'s Back Road', 'Mussoorie Lake'],
    meals: ['Breakfast', 'Dinner']
  },
  {
    day: 4,
    title: 'Day 4 – Dehradun City Tour & Return to Haridwar',
    description: 'Explore Dehradun\'s natural wonders before returning to Haridwar (35 km / ~1 hour). • Morning visit to Dehradun: Robber\'s Cave (natural cave formation with stream) • Sahastradhara (thousand-fold spring with therapeutic properties) • Forest Research Institute (colonial architecture and museum) • Tapkeshwar Temple (cave temple dedicated to Lord Shiva) • Afternoon drive back to Haridwar • Evening at leisure • Overnight stay in Haridwar',
    activities: ['Robber\'s Cave', 'Sahastradhara', 'Forest Research Institute', 'Tapkeshwar Temple', 'Transfer to Haridwar'],
    meals: ['Breakfast', 'Dinner']
  },
  {
    day: 5,
    title: 'Day 5 – Departure with Spiritual Memories',
    description: 'Bid farewell to the divine land of Uttarakhand. • Hotel checkout after breakfast • Transfer to Haridwar Railway Station or Dehradun Airport • Tour ends',
    activities: ['Hotel checkout', 'Departure transfer'],
    meals: ['Breakfast']
  }
];

const uttarakhand4N5D: TourPackage = {
  id: 'uttarakhand_4n5d_001',
  slug: 'uttarakhand-divine-5-days-4-nights',
  packageCode: 'UK-4N5D-001',
  name: 'Uttarakhand Divine - 4N/5D',
  description: 'Spiritual and scenic Uttarakhand tour covering Haridwar\'s divine Ganga Aarti, Rishikesh yoga capital, and beautiful Mussoorie hill station.',
  category: 'FAMILY',
  type: 'DOMESTIC',
  days: 5,
  nights: 4,
  basePrice: 13999,
  currency: 'INR',
  destinations: ['Haridwar', 'Rishikesh', 'Mussoorie', 'Dehradun'],
  highlights: [
    'Ganga Aarti at Har Ki Pauri Haridwar',
    'Rishikesh - Ram Jhula, Laxman Jhula & Beatles Ashram',
    'Mussoorie - Queen of Hills with Kempty Falls',
    'Gun Hill Point ropeway & Camel\'s Back Road',
    'Dehradun - Robber\'s Cave & Sahastradhara',
    'Spiritual temples & scenic mountain views'
  ],
  inclusions: [
    '4 Nights accommodation (Haridwar 2N + Mussoorie 2N)',
    'Daily breakfast at the hotel',
    'Private AC vehicle for entire tour',
    'Pickup & drop from Dehradun Airport / Haridwar Station',
    'All sightseeing as per itinerary',
    'Driver allowance, toll taxes, parking charges',
    'All applicable hotel taxes'
  ],
  exclusions: [
    'Flight / Train tickets',
    'Lunch & Dinner (except breakfast)',
    'Ropeway tickets, boating, water activities',
    'Entry fees to monuments, attractions & parks',
    'Personal expenses (shopping, laundry, room service)',
    'Early check-in / Late check-out',
    'Anything not mentioned in the inclusions'
  ],
  itinerary: uttarakhand4N5D_Itinerary,
  departures: [],
  imageUrl: 'https://images.unsplash.com/photo-1609137144813-7d9921338f24?w=800',
  galleryImages: [
    'https://images.unsplash.com/photo-1606240724602-5fff10f2b4c9?w=1200&auto=format&fit=crop', // Haridwar Ganga Aarti
    'https://images.unsplash.com/photo-1626621341517-bbf3d9990a23?w=1200&auto=format&fit=crop', // Rishikesh Laxman Jhula
    'https://images.unsplash.com/photo-1605649487212-47bdab064df7?w=1200&auto=format&fit=crop', // Mussoorie Kempty Falls
    'https://images.unsplash.com/photo-1626621341580-9b4f81b8f8b0?w=1200&auto=format&fit=crop', // Dehradun Robbers Cave
    'https://images.unsplash.com/photo-1606240724602-5fff10f2b4c9?w=1200&auto=format&fit=crop', // Uttarakhand Mountains
    'https://images.unsplash.com/photo-1626621341517-bbf3d9990a23?w=1200&auto=format&fit=crop' // Valley View
  ],
  rating: 4.6,
  totalReviews: 867,
  isActive: true,
  pricingType: 'DATE_BASED',
  datePricing: [
    {
      date: '2025-02-02',
      departureCity: 'Delhi',
      availableSeats: 20,
      status: 'AVAILABLE',
      price: 13999,
      twinSharingPrice: 13999,
      singleOccupancyPrice: 17999,
      isLowestPrice: true
    },
    {
      date: '2025-02-16',
      departureCity: 'Delhi',
      availableSeats: 16,
      status: 'AVAILABLE',
      price: 14999,
      twinSharingPrice: 14999,
      singleOccupancyPrice: 18999
    },
    {
      date: '2025-03-02',
      departureCity: 'Delhi',
      availableSeats: 10,
      status: 'FILLING_FAST',
      price: 15999,
      twinSharingPrice: 15999,
      singleOccupancyPrice: 19999
    },
    {
      date: '2025-03-16',
      departureCity: 'Delhi',
      availableSeats: 18,
      status: 'AVAILABLE',
      price: 15499,
      twinSharingPrice: 15499,
      singleOccupancyPrice: 19499
    },
    {
      date: '2025-04-06',
      departureCity: 'Delhi',
      availableSeats: 14,
      status: 'AVAILABLE',
      price: 16999,
      twinSharingPrice: 16999,
      singleOccupancyPrice: 20999
    }
  ],
  roomOptions: northIndiaRoomOptions,
  badgeType: 'FAMILY',
  tourType: 'FAMILY',
  emiAvailable: true,
  emiStartingFrom: 2334,
  includes: [
    { icon: 'hotel', label: 'Hotels' },
    { icon: 'meals', label: 'Daily Breakfast' },
    { icon: 'transport', label: 'Private AC Vehicle' },
    { icon: 'sightseeing', label: 'All Sightseeing' }
  ]
};

// ==============================================
// KASHMIR 5N/6D - SRINAGAR GULMARG PAHALGAM
// ==============================================

const kashmir5N6D_Itinerary: ItineraryDay[] = [
  {
    day: 1,
    title: 'Day 1 – Arrival & Iconic Dal Lake Shikara Experience',
    description: 'Welcome to Paradise on Earth! Begin your Kashmir journey with its most iconic experience. • Arrive at Srinagar Airport and transfer to hotel/houseboat • Check-in to your accommodation (traditional houseboat stay available) • Evening peaceful Shikara ride on Dal Lake (traditional wooden boat) • Float through floating gardens (unique vegetable gardens on water) • Witness local life on the lake • Visit Lal Chowk market for local shopping • Overnight stay in Srinagar',
    activities: ['Airport transfer', 'Hotel/houseboat check-in', 'Shikara ride on Dal Lake', 'Floating gardens', 'Lal Chowk market'],
    meals: []
  },
  {
    day: 2,
    title: 'Day 2 – Gulmarg Meadow of Flowers & Gondola Adventure',
    description: 'Experience the breathtaking beauty of Gulmarg, the Meadow of Flowers (52 km / ~2 hours). • Morning drive to Gulmarg through scenic mountain roads • Gondola ride to Khilanmarg/Apharwat Peak (Asia\'s highest cable car) • Marvel at snow-capped peaks and alpine meadows • Optional skiing activities (seasonal: December-March) • Snow activities and photography • Enjoy the pristine mountain air • Return to Srinagar • Overnight stay in Srinagar',
    activities: ['Drive to Gulmarg', 'Gondola ride to Khilanmarg/Apharwat', 'Skiing (seasonal)', 'Snow activities', 'Meadow views'],
    meals: ['Breakfast']
  },
  {
    day: 3,
    title: 'Day 3 – Pahalgam Valley of Shepherds Exploration',
    description: 'Discover the stunning Valley of Shepherds with its pristine landscapes (95 km / ~3 hours). • Morning drive to Pahalgam through beautiful countryside • Visit Betaab Valley (named after the Bollywood movie, surrounded by pine forests) • Aru Valley (picturesque meadow with grazing horses) • Baisaran meadows (alpine meadow perfect for picnics) • Walk along Lidder River (crystal-clear mountain river) • Nature walks and photography • Return to Srinagar • Overnight stay in Srinagar',
    activities: ['Drive to Pahalgam', 'Betaab Valley', 'Aru Valley', 'Baisaran meadows', 'Lidder River', 'Nature walks'],
    meals: ['Breakfast']
  },
  {
    day: 4,
    title: 'Day 4 – Sonamarg Meadow of Gold & Glacier Views',
    description: 'Journey to the Meadow of Gold and witness nature\'s grandeur (80 km / ~2.5 hours). • Morning drive to Sonamarg through winding mountain roads • Marvel at Thajiwas Glacier views (stunning glacier surrounded by peaks) • Optional pony rides to glacier base (traditional way to explore) • Mountain photography and nature walks • Enjoy glacial streams and alpine flowers • Experience the raw beauty of Kashmir • Return to Srinagar • Overnight stay in Srinagar',
    activities: ['Drive to Sonamarg', 'Thajiwas Glacier views', 'Pony rides (optional)', 'Mountain photography', 'Glacial streams'],
    meals: ['Breakfast']
  },
  {
    day: 5,
    title: 'Day 5 – Mughal Gardens Heritage & Spiritual Sites',
    description: 'Explore Kashmir\'s Mughal heritage and spiritual landmarks. • Visit Shalimar Bagh (Mughal garden built by Emperor Jahangir) • Nishat Bagh (Garden of Joy with terraced lawns) • Chashme Shahi (Royal Spring with natural spring water) • Shankaracharya Temple (ancient Hindu temple on hilltop) • Pashmina shawl shopping (famous Kashmiri handicrafts) • Explore local markets for souvenirs • Evening at leisure • Overnight stay in Srinagar',
    activities: ['Shalimar Bagh', 'Nishat Bagh', 'Chashme Shahi', 'Shankaracharya Temple', 'Pashmina shopping', 'Local markets'],
    meals: ['Breakfast']
  },
  {
    day: 6,
    title: 'Day 6 – Departure with Paradise Memories',
    description: 'Bid farewell to Paradise on Earth with cherished memories. • Hotel/houseboat checkout after breakfast • Last minute shopping (optional) • Transfer to Srinagar Airport • Tour ends',
    activities: ['Checkout', 'Last minute shopping', 'Airport transfer'],
    meals: ['Breakfast']
  }
];

const kashmir5N6D: TourPackage = {
  id: 'kashmir_5n6d_001',
  slug: 'kashmir-paradise-6-days-5-nights',
  packageCode: 'JK-5N6D-001',
  name: 'Kashmir Paradise - 5N/6D',
  description: 'Experience Paradise on Earth with Srinagar houseboats, Gulmarg Gondola, Pahalgam valleys, Sonamarg glaciers, and Mughal Gardens.',
  category: 'HONEYMOON',
  type: 'DOMESTIC',
  days: 6,
  nights: 5,
  basePrice: 24999,
  currency: 'INR',
  destinations: ['Srinagar', 'Gulmarg', 'Pahalgam', 'Sonamarg'],
  highlights: [
    'Shikara ride on iconic Dal Lake',
    'Gulmarg Gondola ride to Khilanmarg',
    'Pahalgam - Betaab Valley, Aru Valley & Baisaran',
    'Sonamarg - Meadow of Gold with glaciers',
    'Mughal Gardens - Shalimar, Nishat & Chashme Shahi',
    'Houseboat stay experience (optional)',
    'Pashmina shawl shopping'
  ],
  inclusions: [
    '5 nights accommodation in hotel/houseboat on twin-sharing basis',
    'Daily breakfast',
    'All transfers and sightseeing by private vehicle',
    'Entrance fees to mentioned attractions',
    'Shikara ride at Dal Lake',
    'Experienced driver/guide',
    'All applicable taxes'
  ],
  exclusions: [
    'Airfare or train fare to/from Srinagar',
    'Lunch and dinner (unless specified)',
    'Personal expenses such as shopping, tips, and optional activities',
    'Adventure sports in Gulmarg or Sonamarg',
    'Gondola cable car tickets',
    'Travel insurance',
    'Anything not mentioned in inclusions'
  ],
  itinerary: kashmir5N6D_Itinerary,
  departures: [],
  imageUrl: 'https://images.unsplash.com/photo-1605649487212-47bdab064df7?w=800',
  galleryImages: [
    'https://images.unsplash.com/photo-1568322445389-f64ac2515020?w=1200&auto=format&fit=crop', // Dal Lake Srinagar
    'https://images.unsplash.com/photo-1548013146-72479768bada?w=1200&auto=format&fit=crop', // Gulmarg Meadows
    'https://images.unsplash.com/photo-1588580000645-c6e3369d3b39?w=1200&auto=format&fit=crop', // Pahalgam Valley
    'https://images.unsplash.com/photo-1587953601933-d97328a95818?w=1200&auto=format&fit=crop', // Mughal Gardens
    'https://images.unsplash.com/photo-1605649487212-47bdab064df7?w=1200&auto=format&fit=crop', // Kashmir Mountains
    'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=1200&auto=format&fit=crop' // Houseboats
  ],
  rating: 4.9,
  totalReviews: 1123,
  isActive: true,
  pricingType: 'DATE_BASED',
  datePricing: [
    {
      date: '2025-02-08',
      departureCity: 'Delhi',
      availableSeats: 16,
      status: 'AVAILABLE',
      price: 24999,
      twinSharingPrice: 24999,
      singleOccupancyPrice: 32999,
      isLowestPrice: true
    },
    {
      date: '2025-02-22',
      departureCity: 'Mumbai',
      availableSeats: 12,
      status: 'AVAILABLE',
      price: 26999,
      twinSharingPrice: 26999,
      singleOccupancyPrice: 34999
    },
    {
      date: '2025-03-10',
      departureCity: 'Bangalore',
      availableSeats: 8,
      status: 'FILLING_FAST',
      price: 27999,
      twinSharingPrice: 27999,
      singleOccupancyPrice: 35999
    },
    {
      date: '2025-03-24',
      departureCity: 'Delhi',
      availableSeats: 14,
      status: 'AVAILABLE',
      price: 27499,
      twinSharingPrice: 27499,
      singleOccupancyPrice: 35499
    },
    {
      date: '2025-04-12',
      departureCity: 'Pune',
      availableSeats: 10,
      status: 'AVAILABLE',
      price: 28999,
      twinSharingPrice: 28999,
      singleOccupancyPrice: 36999
    }
  ],
  roomOptions: northIndiaRoomOptions,
  badgeType: 'HONEYMOON',
  tourType: 'FAMILY',
  emiAvailable: true,
  emiStartingFrom: 4167,
  includes: [
    { icon: 'hotel', label: 'Hotel/Houseboat' },
    { icon: 'meals', label: 'Daily Breakfast' },
    { icon: 'transport', label: 'Private Vehicle' },
    { icon: 'sightseeing', label: 'All Valleys & Gardens' }
  ]
};

// Export all North India packages
export const NORTH_INDIA_TOUR_PACKAGES: TourPackage[] = [
  uttarakhand4N5D,
  kashmir5N6D
];

export default NORTH_INDIA_TOUR_PACKAGES;
