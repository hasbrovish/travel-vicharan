import {
  TourPackage,
  RoomOption,
  ItineraryDay
} from '../models/tour-package.model';

/**
 * Vietnam Tour Packages - Hanoi, Halong Bay, Ho Chi Minh City, Mekong Delta
 * Data source: /tour-docs/VIETNAM TOUR PACKAGES.docx
 */

// Common room options for Vietnam packages
const vietnamRoomOptions: RoomOption[] = [
  {
    id: 'room_double_vietnam',
    type: 'DOUBLE',
    name: 'Double Sharing',
    description: 'Two guests sharing one room with double bed',
    bedType: 'Double Bed',
    adultCapacity: 2,
    childCapacity: 1,
    priceModifier: 0
  },
  {
    id: 'room_twin_vietnam',
    type: 'TWIN',
    name: 'Twin Sharing',
    description: 'Two guests sharing one room with twin beds',
    bedType: 'Twin Beds',
    adultCapacity: 2,
    childCapacity: 1,
    priceModifier: 0
  },
  {
    id: 'room_single_vietnam',
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
// VIETNAM 5N/6D - HANOI HALONG BAY SAIGON MEKONG
// ==============================================

const vietnam5N6D_Itinerary: ItineraryDay[] = [
  {
    day: 1,
    title: 'Day 1 – Arrival & Hanoi Old Quarter Exploration',
    description: 'Welcome to Vietnam! Begin your journey in the charming capital city. • Arrive at Noi Bai International Airport and transfer to hotel • Hotel check-in and freshen up • Evening explore Hoan Kiem Lake (Lake of the Restored Sword with Ngoc Son Temple) • Stroll through bustling Old Quarter (36 ancient streets with traditional architecture) • Experience local street food culture • Discover Vietnamese coffee culture • Overnight stay in Hanoi',
    activities: ['Airport transfer', 'Hotel check-in', 'Hoan Kiem Lake', 'Old Quarter exploration', 'Local street food'],
    meals: []
  },
  {
    day: 2,
    title: 'Day 2 – Hanoi Heritage Tour & Traditional Water Puppet Show',
    description: 'Discover Hanoi\'s rich history and cultural heritage. • Full day city tour: Ho Chi Minh Mausoleum (final resting place of Vietnam\'s beloved leader) • Presidential Palace (French colonial architecture) • One Pillar Pagoda (unique Buddhist temple on single pillar) • Temple of Literature (Vietnam\'s first university, 1070 AD) • Hanoi Opera House (French colonial landmark) • Evening traditional Water Puppet Show (unique Vietnamese art form) • Overnight stay in Hanoi',
    activities: ['Ho Chi Minh Mausoleum', 'Presidential Palace', 'One Pillar Pagoda', 'Temple of Literature', 'Hanoi Opera House', 'Water Puppet Show'],
    meals: ['Breakfast']
  },
  {
    day: 3,
    title: 'Day 3 – Halong Bay UNESCO World Heritage Cruise',
    description: 'Experience Vietnam\'s most iconic natural wonder – Halong Bay (170 km / ~3.5 hours). • Morning drive to Halong Bay through scenic countryside • Board day cruise boat • Explore limestone karsts and islets (thousands of limestone formations) • Visit floating fishing villages (traditional way of life) • Optional kayaking through caves and lagoons • Swimming in emerald waters • Buffet lunch served on board with Vietnamese cuisine • Return to Hanoi • Overnight stay in Hanoi',
    activities: ['Drive to Halong Bay', 'Day cruise boarding', 'Limestone karst viewing', 'Floating village visit', 'Kayaking (optional)', 'Buffet lunch on board'],
    meals: ['Breakfast', 'Lunch']
  },
  {
    day: 4,
    title: 'Day 4 – Flight to Ho Chi Minh City & Cu Chi Tunnels History',
    description: 'Journey to Vietnam\'s vibrant southern capital and explore war history. • Morning transfer to airport for domestic flight to Ho Chi Minh City • Arrive in Saigon and transfer to hotel • Afternoon city tour: Reunification Palace (historic site of Vietnam War end) • Notre Dame Cathedral (French colonial architecture) • Central Post Office (designed by Gustave Eiffel) • Visit Cu Chi Tunnels (underground network used during Vietnam War) • Ben Thanh Market (local market experience) • Overnight stay in Ho Chi Minh City',
    activities: ['Flight to Saigon', 'Reunification Palace', 'Notre Dame Cathedral', 'Central Post Office', 'Cu Chi Tunnels', 'Ben Thanh Market'],
    meals: ['Breakfast']
  },
  {
    day: 5,
    title: 'Day 5 – Mekong Delta River Life Experience',
    description: 'Discover the "Rice Bowl of Vietnam" – the Mekong Delta (70 km / ~2 hours). • Morning drive to Mekong Delta through lush countryside • Visit traditional villages (experience local life) • Explore local handicrafts (coconut products, rice paper making) • Boat ride through narrow canals (navigate through water channels) • Visit coconut candy factory (see traditional candy making) • Enjoy riverside lunch with local specialties • Experience delta culture and hospitality • Return to Ho Chi Minh City • Overnight stay in Ho Chi Minh City',
    activities: ['Drive to Mekong Delta', 'Village visits', 'Local handicrafts', 'Boat ride through canals', 'Coconut candy factory', 'Riverside lunch'],
    meals: ['Breakfast', 'Lunch']
  },
  {
    day: 6,
    title: 'Day 6 – Departure with Vietnamese Memories',
    description: 'Bid farewell to Vietnam with unforgettable memories. • Hotel checkout after breakfast • Last minute shopping (optional) • Transfer to Tan Son Nhat Airport • Tour ends',
    activities: ['Hotel checkout', 'Last minute shopping', 'Airport transfer'],
    meals: ['Breakfast']
  }
];

const vietnam5N6D: TourPackage = {
  id: 'vietnam_5n6d_001',
  slug: 'vietnam-explorer-6-days-5-nights',
  packageCode: 'VN-5N6D-001',
  name: 'Vietnam Explorer - 5N/6D',
  description: 'Discover Vietnam\'s highlights from Hanoi\'s colonial charm to Halong Bay\'s limestone wonders, and Saigon\'s bustling energy to Mekong Delta\'s tranquility.',
  category: 'FAMILY',
  type: 'INTERNATIONAL',
  days: 6,
  nights: 5,
  basePrice: 39999,
  currency: 'INR',
  destinations: ['Hanoi', 'Halong Bay', 'Ho Chi Minh City', 'Mekong Delta'],
  highlights: [
    'Halong Bay Day Cruise - UNESCO World Heritage Site',
    'Traditional Water Puppet Show in Hanoi',
    'Ho Chi Minh Mausoleum & Temple of Literature',
    'Cu Chi Tunnels - Vietnam War history',
    'Mekong Delta boat ride & floating markets',
    'Hanoi Old Quarter street food experience',
    'Saigon - Notre Dame Cathedral & Reunification Palace'
  ],
  inclusions: [
    '2 Nights accommodation in Hanoi with breakfast',
    '3 Nights accommodation in Ho Chi Minh City with breakfast',
    'Airport to Hotel to Airport transfers in Hanoi & Ho Chi Minh City',
    'Hanoi City Tour including Ho Chi Minh Mausoleum, One Pillar Pagoda, Temple of Literature',
    'Water Puppet Show tickets',
    'Halong Bay Day Cruise with lunch',
    'Ho Chi Minh City Tour including Reunification Palace, Notre Dame Cathedral & Central Post Office',
    'Mekong Delta Tour with lunch',
    'Domestic flight Hanoi to Ho Chi Minh City',
    'All sightseeing & transfers on SIC/Private basis',
    'English-speaking guide',
    'All applicable taxes'
  ],
  exclusions: [
    'International airfare to Vietnam',
    'Lunch & Dinner (except Halong Bay cruise & Mekong Delta lunch)',
    'Optional activities (kayaking, Cu Chi Tunnels extra)',
    'Personal expenses: shopping, minibar, tips, laundry',
    'Travel insurance',
    'Anything not mentioned in inclusions'
  ],
  itinerary: vietnam5N6D_Itinerary,
  departures: [],
  imageUrl: 'https://images.unsplash.com/photo-1528127269322-539801943592?w=800',
  galleryImages: [
    'https://images.unsplash.com/photo-1528127269322-539801943592?w=1200&auto=format&fit=crop', // Halong Bay
    'https://images.unsplash.com/photo-1583417319070-4a69db38a482?w=1200&auto=format&fit=crop', // Hanoi Old Quarter
    'https://images.unsplash.com/photo-1559592413-7cec4d0cae2b?w=1200&auto=format&fit=crop', // Ho Chi Minh City
    'https://images.unsplash.com/photo-1555633514-abcee6ab2e4e?w=1200&auto=format&fit=crop', // Vietnamese Countryside
    'https://images.unsplash.com/photo-1528127269322-539801943592?w=1200&auto=format&fit=crop', // Mekong Delta
    'https://images.unsplash.com/photo-1583417319070-4a69db38a482?w=1200&auto=format&fit=crop' // Vietnamese Culture
  ],
  rating: 4.7,
  totalReviews: 654,
  isActive: true,
  pricingType: 'DATE_BASED',
  datePricing: [
    {
      date: '2025-01-28',
      departureCity: 'Mumbai',
      availableSeats: 18,
      status: 'AVAILABLE',
      price: 39999,
      twinSharingPrice: 39999,
      singleOccupancyPrice: 51999,
      isLowestPrice: true
    },
    {
      date: '2025-02-12',
      departureCity: 'Delhi',
      availableSeats: 14,
      status: 'AVAILABLE',
      price: 41999,
      twinSharingPrice: 41999,
      singleOccupancyPrice: 53999
    },
    {
      date: '2025-02-26',
      departureCity: 'Bangalore',
      availableSeats: 10,
      status: 'FILLING_FAST',
      price: 43999,
      twinSharingPrice: 43999,
      singleOccupancyPrice: 55999
    },
    {
      date: '2025-03-14',
      departureCity: 'Chennai',
      availableSeats: 16,
      status: 'AVAILABLE',
      price: 42999,
      twinSharingPrice: 42999,
      singleOccupancyPrice: 54999
    },
    {
      date: '2025-03-28',
      departureCity: 'Hyderabad',
      availableSeats: 12,
      status: 'AVAILABLE',
      price: 44999,
      twinSharingPrice: 44999,
      singleOccupancyPrice: 56999
    }
  ],
  roomOptions: vietnamRoomOptions,
  badgeType: 'FAMILY',
  tourType: 'FAMILY',
  emiAvailable: true,
  emiStartingFrom: 6667,
  includes: [
    { icon: 'hotel', label: 'Hotels' },
    { icon: 'meals', label: 'Breakfast & Lunches' },
    { icon: 'transport', label: 'All Transfers' },
    { icon: 'sightseeing', label: 'UNESCO Sites' }
  ]
};

// Export all Vietnam packages
export const VIETNAM_TOUR_PACKAGES: TourPackage[] = [
  vietnam5N6D
];

export default VIETNAM_TOUR_PACKAGES;
