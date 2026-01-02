import {
  TourPackage,
  RoomOption,
  TourInclusion,
  ItineraryDay
} from '../models/tour-package.model';

/**
 * International Tour Packages - Dubai, Thailand, Singapore, etc.
 * Data source: /tour-docs/
 */

// Common room options for international packages
const internationalRoomOptions: RoomOption[] = [
  {
    id: 'room_double_int',
    type: 'DOUBLE',
    name: 'Double Sharing',
    description: 'Two guests sharing one room with double bed',
    bedType: 'Double Bed',
    adultCapacity: 2,
    childCapacity: 1,
    priceModifier: 0
  },
  {
    id: 'room_twin_int',
    type: 'TWIN',
    name: 'Twin Sharing',
    description: 'Two guests sharing one room with twin beds',
    bedType: 'Twin Beds',
    adultCapacity: 2,
    childCapacity: 1,
    priceModifier: 0
  },
  {
    id: 'room_single_int',
    type: 'SINGLE',
    name: 'Single Occupancy',
    description: 'One guest in a private room',
    bedType: 'Single/Double Bed',
    adultCapacity: 1,
    childCapacity: 0,
    priceModifier: 15000
  }
];

// ==============================================
// DUBAI 4N/5D PACKAGE
// ==============================================

const dubai4N5D_Itinerary: ItineraryDay[] = [
  {
    day: 1,
    title: 'Arrival in Dubai + Dhow Cruise Dinner',
    description: 'Arrive at Dubai Airport, transfer to hotel. Evening Dhow Cruise at Dubai Creek/Marina with buffet dinner and live shows.',
    activities: ['Airport transfer', 'Hotel check-in', 'Dhow Cruise at Creek/Marina', 'Buffet dinner', 'Tanoura show'],
    meals: ['Dinner']
  },
  {
    day: 2,
    title: 'Dubai City Tour + Desert Safari',
    description: 'Morning city tour covering major attractions. Afternoon desert safari with dune bashing, camel ride, and BBQ dinner.',
    activities: ['Palm Jumeirah visit', 'Burj Al Arab photo stop', 'Jumeirah Mosque', 'Dubai Museum', 'Dune bashing', 'Camel riding', 'BBQ dinner', 'Cultural shows'],
    meals: ['Breakfast', 'Dinner']
  },
  {
    day: 3,
    title: 'Burj Khalifa + Dubai Mall + Fountain Show',
    description: 'Visit world\'s tallest building Burj Khalifa 124th floor. Explore Dubai Mall and watch spectacular Fountain Show.',
    activities: ['Burj Khalifa 124/125th floor', 'Dubai Mall shopping', 'Dubai Aquarium (optional)', 'Musical Fountain Show'],
    meals: ['Breakfast']
  },
  {
    day: 4,
    title: 'Abu Dhabi City Tour + Grand Mosque',
    description: 'Full day Abu Dhabi tour including Sheikh Zayed Grand Mosque, Corniche, and Emirates Palace.',
    activities: ['Sheikh Zayed Grand Mosque', 'Corniche drive', 'Emirates Palace photo stop', 'Ferrari World (optional)', 'Heritage Village'],
    meals: ['Breakfast']
  },
  {
    day: 5,
    title: 'Departure from Dubai',
    description: 'Check out and airport transfer.',
    activities: ['Hotel checkout', 'Airport transfer'],
    meals: ['Breakfast']
  }
];

const dubai4N5D: TourPackage = {
  id: 'dubai_4n5d_001',
  slug: 'dubai-deluxe-5-days-4-nights',
  packageCode: 'DXB-4N5D-001',
  name: 'Dubai Deluxe - 4N/5D',
  description: 'Experience the glitz and glamour of Dubai with Burj Khalifa, Desert Safari, Dhow Cruise, and Abu Dhabi tour. Complete Dubai package.',
  category: 'FAMILY',
  type: 'INTERNATIONAL',
  days: 5,
  nights: 4,
  basePrice: 45999,
  currency: 'INR',
  destinations: ['Dubai', 'Abu Dhabi'],
  highlights: [
    'Burj Khalifa 124th/125th Floor Observatory',
    'Desert Safari with dune bashing & BBQ dinner',
    'Dhow Cruise dinner with live entertainment',
    'Dubai City Tour - Palm, Burj Al Arab, Marina',
    'Abu Dhabi - Sheikh Zayed Grand Mosque',
    'Dubai Musical Fountain Show'
  ],
  inclusions: [
    '4 nights hotel accommodation in Dubai',
    'Daily breakfast',
    'Return airport transfers',
    'Half-day Dubai City Tour',
    'Dhow Cruise with dinner',
    'Desert Safari with BBQ dinner',
    'Burj Khalifa 124/125th floor tickets',
    'Abu Dhabi City Tour',
    'All tours on SIC/Private basis',
    'All applicable taxes (except Tourism Dirham)'
  ],
  exclusions: [
    'Flight tickets to/from Dubai',
    'UAE Visa & travel insurance',
    'Lunch & dinner (except cruise & safari dinner)',
    'Ferrari World tickets (optional)',
    'Tourism Dirham Fee (payable at hotel)',
    'Personal expenses (shopping, tips, room service)',
    'GST (5%) as applicable',
    'Anything not mentioned in inclusions'
  ],
  itinerary: dubai4N5D_Itinerary,
  departures: [],
  imageUrl: 'https://images.unsplash.com/photo-1512453979798-5ea266f8880c?w=800',
  galleryImages: [
    'https://images.unsplash.com/photo-1512453979798-5ea266f8880c?w=1200&auto=format&fit=crop', // Burj Khalifa Night
    'https://images.unsplash.com/photo-1488646953014-85cb44e25828?w=1200&auto=format&fit=crop', // Desert Safari
    'https://images.unsplash.com/photo-1512453979798-5ea266f8880c?w=1200&auto=format&fit=crop', // Dhow Cruise
    'https://images.unsplash.com/photo-1488646953014-85cb44e25828?w=1200&auto=format&fit=crop', // Sheikh Zayed Mosque
    'https://images.unsplash.com/photo-1512453979798-5ea266f8880c?w=1200&auto=format&fit=crop', // Dubai Skyline
    'https://images.unsplash.com/photo-1488646953014-85cb44e25828?w=1200&auto=format&fit=crop' // Palm Jumeirah
  ],
  rating: 4.7,
  totalReviews: 892,
  isActive: true,
  pricingType: 'DATE_BASED',
  datePricing: [
    {
      date: '2025-01-25',
      departureCity: 'Mumbai',
      availableSeats: 24,
      status: 'AVAILABLE',
      price: 45999,
      twinSharingPrice: 45999,
      singleOccupancyPrice: 60999,
      isLowestPrice: true
    },
    {
      date: '2025-02-12',
      departureCity: 'Delhi',
      availableSeats: 18,
      status: 'AVAILABLE',
      price: 47999,
      twinSharingPrice: 47999,
      singleOccupancyPrice: 62999
    },
    {
      date: '2025-02-26',
      departureCity: 'Bangalore',
      availableSeats: 9,
      status: 'FILLING_FAST',
      price: 49999,
      twinSharingPrice: 49999,
      singleOccupancyPrice: 64999
    },
    {
      date: '2025-03-15',
      departureCity: 'Ahmedabad',
      availableSeats: 20,
      status: 'AVAILABLE',
      price: 48999,
      twinSharingPrice: 48999,
      singleOccupancyPrice: 63999
    },
    {
      date: '2025-03-30',
      departureCity: 'Hyderabad',
      availableSeats: 16,
      status: 'AVAILABLE',
      price: 51999,
      twinSharingPrice: 51999,
      singleOccupancyPrice: 66999
    }
  ],
  roomOptions: internationalRoomOptions,
  badgeType: 'FAMILY',
  tourType: 'FAMILY',
  emiAvailable: true,
  emiStartingFrom: 7667,
  includes: [
    { icon: 'hotel', label: 'Hotel' },
    { icon: 'meals', label: 'Breakfast & Dinners' },
    { icon: 'transport', label: 'Transfers' },
    { icon: 'sightseeing', label: 'All Tours' }
  ]
};

// ==============================================
// DUBAI 5N/6D WITH BAPS MANDIR
// ==============================================

const dubai5N6D_Itinerary: ItineraryDay[] = [
  {
    day: 1,
    title: 'Arrival + Dhow Cruise Dinner',
    description: 'Airport transfer, check-in. Evening Dhow Cruise with international buffet and shows.',
    activities: ['Airport reception', 'Hotel check-in', 'Dhow Cruise dinner', 'Live Tanoura show'],
    meals: ['Dinner']
  },
  {
    day: 2,
    title: 'Dubai City Tour + Burj Khalifa + Fountain Show',
    description: 'Morning city tour, evening Burj Khalifa visit and fountain show.',
    activities: ['Palm Jumeirah', 'Dubai Marina', 'Jumeirah Mosque', 'Burj Al Arab', 'Burj Khalifa 124/125', 'Dubai Fountain Show'],
    meals: ['Breakfast']
  },
  {
    day: 3,
    title: 'Desert Safari with BBQ Dinner',
    description: 'Free morning. Afternoon desert adventure with activities and dinner.',
    activities: ['Leisure time/shopping', 'Dune bashing', 'Camel ride', 'Sand boarding', 'Henna painting', 'Cultural shows', 'BBQ dinner'],
    meals: ['Breakfast', 'Dinner']
  },
  {
    day: 4,
    title: 'Abu Dhabi Tour + BAPS Hindu Mandir',
    description: 'Full day Abu Dhabi tour highlighting the stunning BAPS Mandir.',
    activities: ['BAPS Hindu Mandir visit', 'Sheikh Zayed Grand Mosque', 'Corniche Beach', 'Emirates Palace', 'Heritage Village', 'Ferrari World photo stop'],
    meals: ['Breakfast']
  },
  {
    day: 5,
    title: 'Miracle Garden + Dubai Frame + Global Village',
    description: 'Visit iconic Dubai attractions and cultural theme park.',
    activities: ['Dubai Miracle Garden (seasonal)', 'Dubai Frame panoramic views', 'Global Village (seasonal)', 'Shopping & rides'],
    meals: ['Breakfast']
  },
  {
    day: 6,
    title: 'Departure',
    description: 'Check out and airport transfer.',
    activities: ['Checkout', 'Airport drop'],
    meals: ['Breakfast']
  }
];

const dubai5N6D: TourPackage = {
  id: 'dubai_5n6d_001',
  slug: 'dubai-premium-with-baps-mandir-6-days-5-nights',
  packageCode: 'DXB-5N6D-001',
  name: 'Dubai Premium with BAPS Mandir - 5N/6D',
  description: 'Premium Dubai tour including BAPS Hindu Mandir, Burj Khalifa, Desert Safari, Miracle Garden, Global Village, and Abu Dhabi Grand Mosque.',
  category: 'FAMILY',
  type: 'INTERNATIONAL',
  days: 6,
  nights: 5,
  basePrice: 54999,
  currency: 'INR',
  destinations: ['Dubai', 'Abu Dhabi'],
  highlights: [
    'BAPS Hindu Mandir - UAE\'s first traditional temple',
    'Burj Khalifa + Dubai Fountain Show',
    'Desert Safari with cultural performances',
    'Dubai Miracle Garden (150 million flowers)',
    'Global Village - 90+ country pavilions',
    'Dubai Frame with panoramic glass bridge',
    'Sheikh Zayed Grand Mosque Abu Dhabi'
  ],
  inclusions: [
    '5 nights Dubai hotel accommodation',
    'Daily breakfast',
    'Airport pickup & drop',
    'Dhow Cruise dinner',
    'Dubai City Tour',
    'Burj Khalifa 124/125 floor tickets',
    'Desert Safari with BBQ dinner',
    'Abu Dhabi City Tour + BAPS Mandir visit',
    'Miracle Garden + Dubai Frame entry',
    'Global Village entry (seasonal)',
    'All tours on SIC/Private basis',
    'All taxes (except Tourism Dirham)'
  ],
  exclusions: [
    'Airfare',
    'UAE Visa & travel insurance',
    'Lunch & dinner (except specified)',
    'Ferrari World/Warner Bros tickets',
    'Museum of the Future tickets',
    'Tourism Dirham Fee',
    'Personal expenses',
    'GST (5%) as applicable',
    'Anything not in inclusions'
  ],
  itinerary: dubai5N6D_Itinerary,
  departures: [],
  imageUrl: 'https://images.unsplash.com/photo-1518684079-3c830dcef090?w=800',
  galleryImages: [
    'https://images.unsplash.com/photo-1512453979798-5ea266f8880c?w=1200&auto=format&fit=crop', // BAPS Mandir Dubai
    'https://images.unsplash.com/photo-1488646953014-85cb44e25828?w=1200&auto=format&fit=crop', // Miracle Garden
    'https://images.unsplash.com/photo-1512453979798-5ea266f8880c?w=1200&auto=format&fit=crop', // Global Village
    'https://images.unsplash.com/photo-1488646953014-85cb44e25828?w=1200&auto=format&fit=crop', // Dubai Frame
    'https://images.unsplash.com/photo-1512453979798-5ea266f8880c?w=1200&auto=format&fit=crop', // Dubai Marina
    'https://images.unsplash.com/photo-1488646953014-85cb44e25828?w=1200&auto=format&fit=crop' // Dubai Attractions
  ],
  rating: 4.9,
  totalReviews: 634,
  isActive: true,
  pricingType: 'DATE_BASED',
  datePricing: [
    {
      date: '2025-01-28',
      departureCity: 'Mumbai',
      availableSeats: 22,
      status: 'AVAILABLE',
      price: 54999,
      twinSharingPrice: 54999,
      singleOccupancyPrice: 69999,
      isLowestPrice: true
    },
    {
      date: '2025-02-14',
      departureCity: 'Delhi',
      availableSeats: 16,
      status: 'AVAILABLE',
      price: 57999,
      twinSharingPrice: 57999,
      singleOccupancyPrice: 72999
    },
    {
      date: '2025-03-01',
      departureCity: 'Bangalore',
      availableSeats: 8,
      status: 'FILLING_FAST',
      price: 59999,
      twinSharingPrice: 59999,
      singleOccupancyPrice: 74999
    },
    {
      date: '2025-03-18',
      departureCity: 'Pune',
      availableSeats: 18,
      status: 'AVAILABLE',
      price: 58999,
      twinSharingPrice: 58999,
      singleOccupancyPrice: 73999
    },
    {
      date: '2025-04-05',
      departureCity: 'Ahmedabad',
      availableSeats: 14,
      status: 'AVAILABLE',
      price: 61999,
      twinSharingPrice: 61999,
      singleOccupancyPrice: 76999
    }
  ],
  roomOptions: internationalRoomOptions,
  badgeType: 'FAMILY',
  tourType: 'FAMILY',
  emiAvailable: true,
  emiStartingFrom: 9167,
  includes: [
    { icon: 'hotel', label: 'Hotel' },
    { icon: 'meals', label: 'Meals Included' },
    { icon: 'transport', label: 'All Transfers' },
    { icon: 'sightseeing', label: 'Premium Tours' }
  ]
};

// ==============================================
// THAILAND 5N/6D BANGKOK-PATTAYA PACKAGE
// ==============================================

const thailand5N6D_Itinerary: ItineraryDay[] = [
  {
    day: 1,
    title: 'Arrival in Bangkok - Transfer to Pattaya + Alcazar Show',
    description: 'Arrive at Bangkok Airport, meet your driver and transfer to Pattaya (2 hrs). Evening enjoy the spectacular Alcazar Cabaret Show.',
    activities: ['Airport pickup', 'Transfer to Pattaya', 'Hotel check-in', 'Alcazar Cabaret Show'],
    meals: ['Dinner']
  },
  {
    day: 2,
    title: 'Coral Island Tour with Indian Lunch',
    description: 'Speedboat tour to Coral Island with optional water sports. Enjoy swimming, beach activities, and Indian lunch.',
    activities: ['Speedboat to Coral Island', 'Beach activities', 'Optional water sports', 'Indian lunch', 'Return to hotel'],
    meals: ['Breakfast', 'Lunch']
  },
  {
    day: 3,
    title: 'Pattaya to Bangkok + City & Temple Tour',
    description: 'Transfer to Bangkok. Visit Wat Traimit (Golden Buddha) and Wat Pho (Reclining Buddha). Panoramic city tour covering Gems Gallery and markets.',
    activities: ['Check out Pattaya', 'Transfer to Bangkok', 'Wat Traimit visit', 'Wat Pho visit', 'Bangkok City Tour', 'Hotel check-in'],
    meals: ['Breakfast']
  },
  {
    day: 4,
    title: 'Safari World & Marine Park Full Day',
    description: 'Full day at Safari World with Safari Drive and live shows including Dolphin, Sea Lion, Bird, and Cowboy Stunt shows.',
    activities: ['Safari Drive', 'Dolphin Show', 'Sea Lion Show', 'Bird Show', 'Orangutan Show', 'Cowboy Stunt Show', 'Buffet lunch'],
    meals: ['Breakfast', 'Lunch']
  },
  {
    day: 5,
    title: 'Bangkok Free Day / Optional Tours',
    description: 'Leisure day for shopping or optional tours. Explore Platinum Mall, Indra Market, MBK Center, or choose from various optional activities.',
    activities: ['Free day', 'Shopping', 'Optional tours available'],
    meals: ['Breakfast']
  },
  {
    day: 6,
    title: 'Departure from Bangkok',
    description: 'Check out and transfer to Bangkok Airport for your return flight.',
    activities: ['Hotel checkout', 'Airport transfer'],
    meals: ['Breakfast']
  }
];

const thailand5N6D: TourPackage = {
  id: 'thailand_5n6d_001',
  slug: 'thailand-classic-6-days-5-nights',
  packageCode: 'TH-5N6D-001',
  name: 'Thailand Classic - 5N/6D',
  description: 'Classic Bangkok & Pattaya package with Alcazar Show, Coral Island, Temple Tours, and Safari World. Perfect family vacation.',
  category: 'FAMILY',
  type: 'INTERNATIONAL',
  days: 6,
  nights: 5,
  basePrice: 32999,
  currency: 'INR',
  destinations: ['Bangkok', 'Pattaya'],
  highlights: [
    'Alcazar Cabaret Show - Thailand\'s spectacular performance',
    'Coral Island Tour with Indian Lunch',
    'Bangkok City & 2 Temple Tour',
    'Safari World & Marine Park with live shows',
    'Shopping at Platinum Mall & MBK Center',
    'All transfers & tours included'
  ],
  inclusions: [
    '2 Nights accommodation in Pattaya with breakfast',
    '3 Nights accommodation in Bangkok with breakfast',
    'Bangkok Airport to Pattaya to Bangkok transfers',
    'Alcazar Show',
    'Coral Island Tour with Indian Lunch',
    'Bangkok City Tour + 2 Temple Tour',
    'Safari World & Marine Park with lunch',
    'All tours on SIC/private basis',
    'All taxes'
  ],
  exclusions: [
    'International airfare',
    'Thailand Visa / Visa on Arrival',
    'Lunch & dinner (except where mentioned)',
    'Water sports at Coral Island',
    'Optional tours & activities',
    'Personal expenses: shopping, minibar, tips',
    'Early check-in / Late check-out',
    'Travel Insurance',
    'Anything not mentioned in inclusions'
  ],
  itinerary: thailand5N6D_Itinerary,
  departures: [],
  imageUrl: 'https://images.unsplash.com/photo-1528181304800-259b08848526?w=800',
  galleryImages: [
    'https://images.unsplash.com/photo-1552465011-b4e21bf6e79a?w=1200&auto=format&fit=crop', // Bangkok Temples
    'https://images.unsplash.com/photo-1589394815804-964ed0be2eb5?w=1200&auto=format&fit=crop', // Coral Island Pattaya
    'https://images.unsplash.com/photo-1528181304800-75b772005e0a?w=1200&auto=format&fit=crop', // Grand Palace
    'https://images.unsplash.com/photo-1552465011-b4e21bf6e79a?w=1200&auto=format&fit=crop', // Alcazar Show
    'https://images.unsplash.com/photo-1589394815804-964ed0be2eb5?w=1200&auto=format&fit=crop', // Safari World
    'https://images.unsplash.com/photo-1528181304800-75b772005e0a?w=1200&auto=format&fit=crop' // Thai Culture
  ],
  rating: 4.6,
  totalReviews: 1245,
  isActive: true,
  pricingType: 'DATE_BASED',
  datePricing: [
    {
      date: '2025-01-22',
      departureCity: 'Mumbai',
      availableSeats: 26,
      status: 'AVAILABLE',
      price: 32999,
      twinSharingPrice: 32999,
      singleOccupancyPrice: 44999,
      isLowestPrice: true
    },
    {
      date: '2025-02-08',
      departureCity: 'Delhi',
      availableSeats: 22,
      status: 'AVAILABLE',
      price: 34999,
      twinSharingPrice: 34999,
      singleOccupancyPrice: 46999
    },
    {
      date: '2025-02-20',
      departureCity: 'Bangalore',
      availableSeats: 12,
      status: 'FILLING_FAST',
      price: 36999,
      twinSharingPrice: 36999,
      singleOccupancyPrice: 48999
    },
    {
      date: '2025-03-10',
      departureCity: 'Chennai',
      availableSeats: 18,
      status: 'AVAILABLE',
      price: 35999,
      twinSharingPrice: 35999,
      singleOccupancyPrice: 47999
    },
    {
      date: '2025-03-25',
      departureCity: 'Hyderabad',
      availableSeats: 20,
      status: 'AVAILABLE',
      price: 37999,
      twinSharingPrice: 37999,
      singleOccupancyPrice: 49999
    }
  ],
  roomOptions: internationalRoomOptions,
  badgeType: 'FAMILY',
  tourType: 'FAMILY',
  emiAvailable: true,
  emiStartingFrom: 5500,
  includes: [
    { icon: 'hotel', label: 'Hotel' },
    { icon: 'meals', label: 'Breakfast & Lunches' },
    { icon: 'transport', label: 'All Transfers' },
    { icon: 'sightseeing', label: 'All Tours' }
  ]
};

// ==============================================
// PHUKET-KRABI 4N/5D PACKAGE
// ==============================================

const phuketKrabi4N5D_Itinerary: ItineraryDay[] = [
  {
    day: 1,
    title: 'Arrival in Phuket + City Tour + Patong Beach',
    description: 'Arrive at Phuket Airport, transfer to hotel. Afternoon Phuket City Tour including Karon Viewpoint, Big Buddha, Wat Chalong, and Old Town. Evening at Patong Beach.',
    activities: ['Airport transfer', 'Hotel check-in', 'Karon Viewpoint', 'Big Buddha', 'Wat Chalong', 'Old Phuket Town', 'Patong Beach', 'Bangla Road'],
    meals: []
  },
  {
    day: 2,
    title: 'Phi Phi Island Tour by Speedboat with Lunch',
    description: 'Full day Phi Phi Island tour visiting Maya Bay, Pileh Lagoon, Viking Cave, Monkey Beach with snorkeling and buffet lunch.',
    activities: ['Speedboat to Phi Phi', 'Maya Bay', 'Pileh Lagoon', 'Viking Cave', 'Monkey Beach', 'Snorkeling', 'Buffet lunch', 'Beach time'],
    meals: ['Breakfast', 'Lunch']
  },
  {
    day: 3,
    title: 'Phuket to Krabi Transfer + Ao Nang Beach',
    description: 'Transfer to Krabi by road (3 hrs). Check in and explore Ao Nang Beach, local markets, and sunset views.',
    activities: ['Check out Phuket', 'Transfer to Krabi', 'Hotel check-in', 'Ao Nang Beach', 'Local markets'],
    meals: ['Breakfast']
  },
  {
    day: 4,
    title: 'Four Island Tour by Speedboat with Lunch',
    description: 'Explore 4 beautiful islands: Phra Nang Cave Beach, Chicken Island, Tup Island, and Poda Island. Swimming, snorkeling, and beach relaxation.',
    activities: ['Phra Nang Cave Beach', 'Chicken Island', 'Tup Island', 'Poda Island', 'Snorkeling', 'Buffet lunch'],
    meals: ['Breakfast', 'Lunch']
  },
  {
    day: 5,
    title: 'Departure from Krabi / Phuket Airport',
    description: 'Check out and transfer to Krabi or Phuket Airport depending on flight schedule.',
    activities: ['Hotel checkout', 'Airport transfer'],
    meals: ['Breakfast']
  }
];

const phuketKrabi4N5D: TourPackage = {
  id: 'phuket_krabi_4n5d_001',
  slug: 'phuket-krabi-island-combo-5-days-4-nights',
  packageCode: 'TH-PKBI-4N5D-001',
  name: 'Phuket-Krabi Island Combo - 4N/5D',
  description: 'Explore Thailand\'s most beautiful islands with Phi Phi Island tour from Phuket and Four Island tour from Krabi. Perfect beach holiday.',
  category: 'HONEYMOON',
  type: 'INTERNATIONAL',
  days: 5,
  nights: 4,
  basePrice: 38999,
  currency: 'INR',
  destinations: ['Phuket', 'Krabi'],
  highlights: [
    'Phuket City Tour - Big Buddha, Wat Chalong, Old Town',
    'Phi Phi Island Tour - Maya Bay, Pileh Lagoon, Viking Cave',
    'Krabi Four Island Tour - Pristine beaches & snorkeling',
    'Patong Beach & Bangla Road nightlife',
    'Ao Nang Beach sunset views',
    'All island tours with lunch included'
  ],
  inclusions: [
    '2 Nights accommodation in Phuket with breakfast',
    '2 Nights accommodation in Krabi with breakfast',
    'Phuket Airport to Hotel to Krabi to Airport transfers',
    'Phuket City Tour',
    'Phi Phi Island Tour with lunch (speedboat)',
    'Krabi 4 Island Tour with lunch (speedboat)',
    'All tours & transfers on SIC/private basis',
    'English-speaking guide',
    'All taxes'
  ],
  exclusions: [
    'International flights',
    'Thailand Visa / Visa on Arrival',
    'Lunch & dinner (except where included)',
    'Island National Park fees (if not included)',
    'Optional water sports',
    'Personal expenses (shopping, minibar, tips)',
    'Travel insurance',
    'Anything not mentioned in inclusions'
  ],
  itinerary: phuketKrabi4N5D_Itinerary,
  departures: [],
  imageUrl: 'https://images.unsplash.com/photo-1589394815804-964ed0be2eb5?w=800',
  galleryImages: [
    'https://images.unsplash.com/photo-1589394815804-964ed0be2eb5?w=1200&auto=format&fit=crop', // Phi Phi Maya Bay
    'https://images.unsplash.com/photo-1552465011-b4e21bf6e79a?w=1200&auto=format&fit=crop', // Krabi 4 Islands
    'https://images.unsplash.com/photo-1528181304800-75b772005e0a?w=1200&auto=format&fit=crop', // Phuket Big Buddha
    'https://images.unsplash.com/photo-1589394815804-964ed0be2eb5?w=1200&auto=format&fit=crop', // Ao Nang Beach
    'https://images.unsplash.com/photo-1552465011-b4e21bf6e79a?w=1200&auto=format&fit=crop', // Thai Islands
    'https://images.unsplash.com/photo-1528181304800-75b772005e0a?w=1200&auto=format&fit=crop' // Beach Paradise
  ],
  rating: 4.8,
  totalReviews: 876,
  isActive: true,
  pricingType: 'DATE_BASED',
  datePricing: [
    {
      date: '2025-01-18',
      departureCity: 'Mumbai',
      availableSeats: 20,
      status: 'AVAILABLE',
      price: 38999,
      twinSharingPrice: 38999,
      singleOccupancyPrice: 52999,
      isLowestPrice: true
    },
    {
      date: '2025-02-05',
      departureCity: 'Delhi',
      availableSeats: 16,
      status: 'AVAILABLE',
      price: 41999,
      twinSharingPrice: 41999,
      singleOccupancyPrice: 55999
    },
    {
      date: '2025-02-18',
      departureCity: 'Bangalore',
      availableSeats: 8,
      status: 'FILLING_FAST',
      price: 43999,
      twinSharingPrice: 43999,
      singleOccupancyPrice: 57999
    },
    {
      date: '2025-03-08',
      departureCity: 'Pune',
      availableSeats: 14,
      status: 'AVAILABLE',
      price: 42999,
      twinSharingPrice: 42999,
      singleOccupancyPrice: 56999
    },
    {
      date: '2025-03-22',
      departureCity: 'Chennai',
      availableSeats: 18,
      status: 'AVAILABLE',
      price: 44999,
      twinSharingPrice: 44999,
      singleOccupancyPrice: 58999
    }
  ],
  roomOptions: internationalRoomOptions,
  badgeType: 'HONEYMOON',
  tourType: 'FAMILY',
  emiAvailable: true,
  emiStartingFrom: 6500,
  includes: [
    { icon: 'hotel', label: 'Beach Hotels' },
    { icon: 'meals', label: 'Breakfast & Island Lunches' },
    { icon: 'transport', label: 'All Transfers' },
    { icon: 'sightseeing', label: 'Island Tours' }
  ]
};

// Export all international packages
export const INTERNATIONAL_TOUR_PACKAGES: TourPackage[] = [
  dubai4N5D,
  dubai5N6D,
  thailand5N6D,
  phuketKrabi4N5D
];

export default INTERNATIONAL_TOUR_PACKAGES;
