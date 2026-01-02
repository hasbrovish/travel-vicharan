import {
  TourPackage,
  PackageCategory,
  PackageType,
  DeparturePricing,
  RoomOption,
  TourInclusion,
  ItineraryDay,
  PricingType,
  BadgeType,
  TourType
} from '../models/tour-package.model';

/**
 * Real tour packages data converted from tour-docs
 * Data source: /tour-docs/KERALA TOUR PACKAGES.docx
 */

// Common room options for Kerala packages
const keralaRoomOptions: RoomOption[] = [
  {
    id: 'room_double',
    type: 'DOUBLE',
    name: 'Double Sharing',
    description: 'Two guests sharing one room with double bed',
    bedType: 'Double Bed',
    adultCapacity: 2,
    childCapacity: 1,
    priceModifier: 0 // Base price
  },
  {
    id: 'room_twin',
    type: 'TWIN',
    name: 'Twin Sharing',
    description: 'Two guests sharing one room with twin beds',
    bedType: 'Twin Beds',
    adultCapacity: 2,
    childCapacity: 1,
    priceModifier: 0 // Same as double
  },
  {
    id: 'room_single',
    type: 'SINGLE',
    name: 'Single Occupancy',
    description: 'One guest in a private room',
    bedType: 'Single/Double Bed',
    adultCapacity: 1,
    childCapacity: 0,
    priceModifier: 8000 // Additional ₹8,000 for single occupancy
  }
];

// Common inclusions for Kerala packages
const keralaInclusions: TourInclusion[] = [
  { icon: 'hotel', label: 'Accommodation' },
  { icon: 'meals', label: 'Daily Breakfast' },
  { icon: 'transport', label: 'Private AC Vehicle' },
  { icon: 'sightseeing', label: 'Sightseeing Tours' }
];

// ==============================================
// KERALA 3N/4D - KOCHI → MUNNAR → THEKKADY → ALLEPPEY
// ==============================================

const kerala3N4D_Itinerary: ItineraryDay[] = [
  {
    day: 1,
    title: 'Kochi → Munnar (130 km / 4 hours)',
    description: 'Arrive in Kochi and drive to Munnar through picturesque tea gardens and waterfalls. Visit Valara and Cheeyappara Waterfalls en route. Check in at hotel and relax.',
    activities: ['Airport/Railway pickup', 'Scenic drive through Western Ghats', 'Valara Waterfalls stop', 'Cheeyappara Waterfalls stop', 'Hotel check-in'],
    meals: ['Dinner']
  },
  {
    day: 2,
    title: 'Full-Day Munnar Sightseeing',
    description: 'Explore Eravikulam National Park, Tea Museum, Mattupetty Dam, Echo Point, and Kundala Lake. Enjoy scenic mountain views and tea plantations.',
    activities: ['Eravikulam National Park', 'Tea Museum visit', 'Mattupetty Dam', 'Echo Point', 'Kundala Lake', 'Tea plantation walk'],
    meals: ['Breakfast', 'Dinner']
  },
  {
    day: 3,
    title: 'Munnar → Thekkady (95 km / 3 hours)',
    description: 'Drive to Thekkady and enjoy boat ride at Periyar Wildlife Sanctuary. Optional spice plantation tour, Kathakali show, or elephant ride.',
    activities: ['Scenic drive through spice plantations', 'Periyar Lake boat ride', 'Wildlife spotting', 'Optional activities (spice tour, cultural shows)'],
    meals: ['Breakfast', 'Dinner']
  },
  {
    day: 4,
    title: 'Thekkady → Alleppey → Kochi Departure',
    description: 'Travel to Alleppey for houseboat cruise through backwaters. Enjoy lunch onboard and scenic village views. Return to Kochi for departure.',
    activities: ['Houseboat boarding', 'Backwater cruise', 'Village life observation', 'Lunch on houseboat', 'Drive to Kochi', 'Airport/Railway drop'],
    meals: ['Breakfast', 'Lunch (Houseboat)']
  }
];

const kerala3N4D: TourPackage = {
  id: 'kerala_3n4d_001',
  packageCode: 'KER-3N4D-001',
  name: 'Kerala Highlights - 3N/4D',
  description: 'Experience the best of Kerala in 4 days covering Munnar hills, Thekkady wildlife, and Alleppey backwaters. Perfect for quick getaways.',
  category: 'FAMILY',
  type: 'DOMESTIC',
  days: 4,
  nights: 3,
  basePrice: 15999,
  currency: 'INR',
  destinations: ['Kochi', 'Munnar', 'Thekkady', 'Alleppey'],
  highlights: [
    'Scenic drive through Western Ghats with waterfall stops',
    'Eravikulam National Park - home of Nilgiri Tahr',
    'Tea Museum and vast tea plantations',
    'Periyar Wildlife Sanctuary boat cruise',
    'Traditional Kerala houseboat experience',
    'Backwater cruise through palm-fringed canals'
  ],
  inclusions: [
    'Daily breakfast at all hotels',
    'All meals on houseboat (lunch, snacks, dinner, breakfast)',
    'Accommodation on double/twin sharing basis',
    'Private AC vehicle for all transfers and sightseeing',
    'Toll, parking, driver allowance & fuel charges',
    'Pick-up and drop at Kochi',
    'Sightseeing as per itinerary'
  ],
  exclusions: [
    'Train/flight tickets',
    'Entry fees to monuments, parks, or boating',
    'Optional activities (jeep safari, massages, cultural shows, elephant ride)',
    'Lunch & dinner except on houseboat',
    'Personal expenses such as tips, laundry, or drinks',
    'GST (5%) as applicable',
    'Anything not mentioned in inclusions'
  ],
  itinerary: kerala3N4D_Itinerary,
  departures: [],
  imageUrl: 'https://images.unsplash.com/photo-1602216056096-3b40cc0c9944?w=800',
  galleryImages: [
    'https://images.unsplash.com/photo-1593693397690-362cb9666fc2?w=800',
    'https://images.unsplash.com/photo-1584274294230-d59ae3a0b1f1?w=800',
    'https://images.unsplash.com/photo-1588407894683-348dace4e3c8?w=800',
    'https://images.unsplash.com/photo-1602216056096-3b40cc0c9944?w=800'
  ],
  rating: 4.7,
  totalReviews: 342,
  isActive: true,
  pricingType: 'DATE_BASED',
  datePricing: [
    {
      date: '2025-01-15',
      departureCity: 'Kochi',
      availableSeats: 12,
      status: 'AVAILABLE',
      price: 15999,
      twinSharingPrice: 15999,
      singleOccupancyPrice: 23999,
      isLowestPrice: true
    },
    {
      date: '2025-01-25',
      departureCity: 'Kochi',
      availableSeats: 8,
      status: 'FILLING_FAST',
      price: 16999,
      twinSharingPrice: 16999,
      singleOccupancyPrice: 24999
    },
    {
      date: '2025-02-10',
      departureCity: 'Kochi',
      availableSeats: 15,
      status: 'AVAILABLE',
      price: 17499,
      twinSharingPrice: 17499,
      singleOccupancyPrice: 25499
    },
    {
      date: '2025-02-20',
      departureCity: 'Kochi',
      availableSeats: 10,
      status: 'AVAILABLE',
      price: 17999,
      twinSharingPrice: 17999,
      singleOccupancyPrice: 25999
    },
    {
      date: '2025-03-05',
      departureCity: 'Kochi',
      availableSeats: 5,
      status: 'FILLING_FAST',
      price: 18499,
      twinSharingPrice: 18499,
      singleOccupancyPrice: 26499
    }
  ],
  roomOptions: keralaRoomOptions,
  badgeType: 'SHORT_TRIP',
  tourType: 'FAMILY',
  emiAvailable: true,
  emiStartingFrom: 2667,
  includes: keralaInclusions
};

// ==============================================
// KERALA 4N/5D - KOCHI → MUNNAR → THEKKADY → ALLEPPEY → KOCHI
// ==============================================

const kerala4N5D_Itinerary: ItineraryDay[] = [
  {
    day: 1,
    title: 'Kochi → Munnar (130 km / 4 hours)',
    description: 'Scenic drive to Munnar with stops at Valara and Cheeyappara Waterfalls. Check in and relax at hill resort.',
    activities: ['Airport/Railway pickup', 'Waterfall photography', 'Tea estate views', 'Hotel check-in', 'Evening tea walk'],
    meals: ['Dinner']
  },
  {
    day: 2,
    title: 'Full-Day Munnar Sightseeing',
    description: 'Visit Eravikulam National Park, Tea Museum, Mattupetty Dam, Echo Point, Kundala Lake, and Blossom Park.',
    activities: ['Eravikulam National Park', 'Tea Museum', 'Mattupetty Dam visit', 'Echo Point', 'Kundala Lake boating', 'Blossom Park'],
    meals: ['Breakfast', 'Dinner']
  },
  {
    day: 3,
    title: 'Munnar → Thekkady (95 km / 3 hours)',
    description: 'Transfer to Thekkady and explore Periyar Wildlife Sanctuary with boat cruise. Optional cultural shows and activities.',
    activities: ['Spice plantation drive', 'Periyar boat cruise', 'Wildlife spotting', 'Spice plantation tour', 'Kathakali/Kalaripayattu shows'],
    meals: ['Breakfast', 'Dinner']
  },
  {
    day: 4,
    title: 'Thekkady → Alleppey Houseboat',
    description: 'Board traditional Kerala houseboat and cruise through serene backwaters. Overnight stay on houseboat.',
    activities: ['Houseboat check-in', 'Backwater cruising', 'Village life viewing', 'Traditional Kerala lunch', 'Sunset on deck', 'Overnight on water'],
    meals: ['Breakfast', 'Lunch', 'Snacks', 'Dinner']
  },
  {
    day: 5,
    title: 'Alleppey → Kochi (60 km / 1.5 hours) - Departure',
    description: 'Morning on houseboat, then Kochi city tour including Chinese Fishing Nets, Fort Kochi, and Mattancherry Palace. Airport drop.',
    activities: ['Breakfast on houseboat', 'Chinese Fishing Nets', 'Fort Kochi Beach', 'Santa Cruz Basilica', 'Mattancherry Palace', 'Marine Drive', 'Departure transfer'],
    meals: ['Breakfast']
  }
];

const kerala4N5D: TourPackage = {
  id: 'kerala_4n5d_001',
  packageCode: 'KER-4N5D-001',
  name: 'Kerala Complete - 4N/5D',
  description: 'Comprehensive Kerala tour covering hill stations, wildlife, backwaters, and cultural Kochi. Includes overnight houseboat stay.',
  category: 'FAMILY',
  type: 'DOMESTIC',
  days: 5,
  nights: 4,
  basePrice: 19999,
  currency: 'INR',
  destinations: ['Kochi', 'Munnar', 'Thekkady', 'Alleppey'],
  highlights: [
    'Two full days in Munnar with extensive sightseeing',
    'Periyar Wildlife Sanctuary and spice plantations',
    'Overnight houseboat stay in Alleppey backwaters',
    'Kochi heritage tour - Chinese Fishing Nets & Fort Kochi',
    'All meals on houseboat included',
    'Perfect blend of nature, wildlife, and culture'
  ],
  inclusions: [
    'Accommodation for 4 nights on double/twin sharing',
    'Daily breakfast at all hotels',
    'All meals on houseboat (lunch, snacks, dinner, breakfast)',
    'Private AC vehicle for entire tour',
    'Driver allowance, toll, parking & fuel charges',
    'Pick-up and drop at Kochi',
    'All sightseeing mentioned in itinerary'
  ],
  exclusions: [
    'Airfare or train tickets',
    'Entry tickets for Eravikulam Park, Periyar boating, museums, cultural shows',
    'Personal expenses (laundry, tips, extra meals, beverages)',
    'Optional activities (Ayurvedic massage, Kathakali show, elephant ride, jeep safari)',
    'GST (5%) as applicable',
    'Anything not mentioned in inclusions'
  ],
  itinerary: kerala4N5D_Itinerary,
  departures: [],
  imageUrl: 'https://images.unsplash.com/photo-1602216056096-3b40cc0c9944?w=800',
  galleryImages: [
    'https://images.unsplash.com/photo-1602216056096-3b40cc0c9944?w=800',
    'https://images.unsplash.com/photo-1593693397690-362cb9666fc2?w=800',
    'https://images.unsplash.com/photo-1596422846543-75c6fc197f07?w=800',
    'https://images.unsplash.com/photo-1584274292003-1887b3e8e8e6?w=800'
  ],
  rating: 4.8,
  totalReviews: 528,
  isActive: true,
  pricingType: 'DATE_BASED',
  datePricing: [
    {
      date: '2025-01-18',
      departureCity: 'Kochi',
      availableSeats: 14,
      status: 'AVAILABLE',
      price: 19999,
      twinSharingPrice: 19999,
      singleOccupancyPrice: 29999,
      isLowestPrice: true
    },
    {
      date: '2025-02-01',
      departureCity: 'Kochi',
      availableSeats: 6,
      status: 'FILLING_FAST',
      price: 21499,
      twinSharingPrice: 21499,
      singleOccupancyPrice: 31499
    },
    {
      date: '2025-02-15',
      departureCity: 'Kochi',
      availableSeats: 12,
      status: 'AVAILABLE',
      price: 22499,
      twinSharingPrice: 22499,
      singleOccupancyPrice: 32499
    },
    {
      date: '2025-03-01',
      departureCity: 'Kochi',
      availableSeats: 10,
      status: 'AVAILABLE',
      price: 23999,
      twinSharingPrice: 23999,
      singleOccupancyPrice: 33999
    },
    {
      date: '2025-03-20',
      departureCity: 'Kochi',
      availableSeats: 8,
      status: 'AVAILABLE',
      price: 24999,
      twinSharingPrice: 24999,
      singleOccupancyPrice: 34999
    }
  ],
  roomOptions: keralaRoomOptions,
  badgeType: 'FAMILY',
  tourType: 'FAMILY',
  emiAvailable: true,
  emiStartingFrom: 3334,
  includes: keralaInclusions
};

// ==============================================
// KERALA 5N/6D - EXTENDED WITH KOVALAM BEACH
// ==============================================

const kerala5N6D_Itinerary: ItineraryDay[] = [
  {
    day: 1,
    title: 'Kochi → Munnar (130 km / 4 hours)',
    description: 'Arrival and scenic mountain journey to Munnar with waterfall stops.',
    activities: ['Airport pickup', 'Valara & Cheeyappara Waterfalls', 'Tea garden views', 'Check-in at resort'],
    meals: ['Dinner']
  },
  {
    day: 2,
    title: 'Full-Day Munnar Sightseeing',
    description: 'Comprehensive sightseeing covering all major Munnar attractions.',
    activities: ['Eravikulam National Park', 'Tea Museum', 'Mattupetty Dam', 'Echo Point', 'Kundala Lake', 'Rose Garden', 'Photo Point'],
    meals: ['Breakfast', 'Dinner']
  },
  {
    day: 3,
    title: 'Munnar → Thekkady (95 km / 3 hours)',
    description: 'Transfer to wildlife haven with Periyar boat cruise and spice plantation visit.',
    activities: ['Scenic drive', 'Periyar boat ride', 'Spice plantation tour', 'Kathakali/Kalaripayattu shows', 'Elephant ride option'],
    meals: ['Breakfast', 'Dinner']
  },
  {
    day: 4,
    title: 'Thekkady → Alleppey Houseboat',
    description: 'Backwater cruise with overnight stay on traditional houseboat.',
    activities: ['Houseboat boarding', 'Canal cruising', 'Paddy field views', 'Village observation', 'Sunset watching', 'Dinner on deck'],
    meals: ['Breakfast', 'Lunch', 'Snacks', 'Dinner']
  },
  {
    day: 5,
    title: 'Alleppey → Kovalam (160 km / 4.5 hours)',
    description: 'Transfer to beach paradise. Relax at Lighthouse Beach and enjoy sunset.',
    activities: ['Morning on houseboat', 'Coastal drive', 'Beach relaxation', 'Ayurvedic massage option', 'Sunset viewing'],
    meals: ['Breakfast', 'Dinner']
  },
  {
    day: 6,
    title: 'Kovalam → Trivandrum City Tour → Departure',
    description: 'Trivandrum sightseeing and departure transfer.',
    activities: ['Padmanabhaswamy Temple', 'Napier Museum', 'Art Gallery', 'Zoo visit', 'Local market shopping', 'Airport drop'],
    meals: ['Breakfast']
  }
];

const kerala5N6D: TourPackage = {
  id: 'kerala_5n6d_001',
  packageCode: 'KER-5N6D-001',
  name: 'Kerala Grand Tour - 5N/6D',
  description: 'Complete Kerala experience from misty hills to backwaters and pristine beaches. Includes Munnar, Thekkady, Alleppey houseboat, and Kovalam beach.',
  category: 'HONEYMOON',
  type: 'DOMESTIC',
  days: 6,
  nights: 5,
  basePrice: 24999,
  currency: 'INR',
  destinations: ['Kochi', 'Munnar', 'Thekkady', 'Alleppey', 'Kovalam', 'Trivandrum'],
  highlights: [
    'Complete Kerala circuit covering hills, wildlife, backwaters & beaches',
    'Overnight houseboat stay in Alleppey',
    '2 days in scenic Munnar hill station',
    'Kovalam beach relaxation and Ayurvedic spa options',
    'Trivandrum heritage tour including Padmanabhaswamy Temple',
    'Perfect for honeymooners and leisure travelers'
  ],
  inclusions: [
    '5 nights accommodation on double/twin sharing',
    'Daily breakfast at all hotels',
    'All meals on houseboat (lunch, dinner, breakfast, snacks)',
    'Private AC vehicle for all transfers and sightseeing',
    'Toll, parking, fuel, and driver allowance',
    'Pick-up from Kochi & drop at Trivandrum',
    'Sightseeing as per itinerary'
  ],
  exclusions: [
    'Train or flight tickets',
    'Entry fees for parks, museums, Periyar boating, cultural programs',
    'Optional activities (Ayurvedic massage, spice plantation, Kathakali, Kalaripayattu)',
    'Lunch & dinner except houseboat stay',
    'Personal expenses (laundry, tips, beverages)',
    'GST (5%) as applicable',
    'Anything not mentioned under inclusions'
  ],
  itinerary: kerala5N6D_Itinerary,
  departures: [],
  imageUrl: 'https://images.unsplash.com/photo-1602216056096-3b40cc0c9944?w=800',
  galleryImages: [
    '/gallery/kovalam-beach.jpg',
    '/gallery/kerala-houseboat-sunset.jpg',
    '/gallery/munnar-panorama.jpg',
    '/gallery/trivandrum-temple.jpg'
  ],
  rating: 4.9,
  totalReviews: 671,
  isActive: true,
  pricingType: 'DATE_BASED',
  datePricing: [
    {
      date: '2025-01-20',
      departureCity: 'Kochi',
      availableSeats: 16,
      status: 'AVAILABLE',
      price: 24999,
      twinSharingPrice: 24999,
      singleOccupancyPrice: 36999,
      isLowestPrice: true
    },
    {
      date: '2025-02-05',
      departureCity: 'Kochi',
      availableSeats: 7,
      status: 'FILLING_FAST',
      price: 26999,
      twinSharingPrice: 26999,
      singleOccupancyPrice: 38999
    },
    {
      date: '2025-02-18',
      departureCity: 'Kochi',
      availableSeats: 14,
      status: 'AVAILABLE',
      price: 27999,
      twinSharingPrice: 27999,
      singleOccupancyPrice: 39999
    },
    {
      date: '2025-03-10',
      departureCity: 'Kochi',
      availableSeats: 12,
      status: 'AVAILABLE',
      price: 29999,
      twinSharingPrice: 29999,
      singleOccupancyPrice: 41999
    },
    {
      date: '2025-03-25',
      departureCity: 'Kochi',
      availableSeats: 5,
      status: 'FILLING_FAST',
      price: 31999,
      twinSharingPrice: 31999,
      singleOccupancyPrice: 43999
    }
  ],
  roomOptions: keralaRoomOptions,
  badgeType: 'HONEYMOON',
  tourType: 'FAMILY',
  emiAvailable: true,
  emiStartingFrom: 4167,
  includes: keralaInclusions
};

// Export all packages
export const REAL_TOUR_PACKAGES: TourPackage[] = [
  kerala3N4D,
  kerala4N5D,
  kerala5N6D
];

export default REAL_TOUR_PACKAGES;
