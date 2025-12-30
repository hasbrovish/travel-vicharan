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
    title: 'Arrival in Hanoi - Hoan Kiem Lake & Old Quarter',
    description: 'Arrive at Noi Bai International Airport, transfer to hotel. Evening explore Hoan Kiem Lake and bustling Old Quarter.',
    activities: ['Airport transfer', 'Hotel check-in', 'Hoan Kiem Lake', 'Old Quarter exploration', 'Local street food'],
    meals: []
  },
  {
    day: 2,
    title: 'Hanoi City Tour & Water Puppet Show',
    description: 'Full day Hanoi tour visiting Ho Chi Minh Mausoleum, One Pillar Pagoda, Temple of Literature. Evening Water Puppet Show.',
    activities: ['Ho Chi Minh Mausoleum', 'Presidential Palace', 'One Pillar Pagoda', 'Temple of Literature', 'Hanoi Opera House', 'Water Puppet Show'],
    meals: ['Breakfast']
  },
  {
    day: 3,
    title: 'Halong Bay Day Cruise with Lunch',
    description: 'Full day Halong Bay cruise exploring limestone karsts, floating villages, kayaking, and swimming in emerald waters.',
    activities: ['Drive to Halong Bay', 'Day cruise boarding', 'Limestone karst viewing', 'Floating village visit', 'Kayaking (optional)', 'Buffet lunch on board'],
    meals: ['Breakfast', 'Lunch']
  },
  {
    day: 4,
    title: 'Hanoi to Ho Chi Minh City - Cu Chi Tunnels & City Tour',
    description: 'Fly to Ho Chi Minh City. Visit Reunification Palace, Notre Dame Cathedral, Central Post Office, and Cu Chi Tunnels.',
    activities: ['Flight to Saigon', 'Reunification Palace', 'Notre Dame Cathedral', 'Central Post Office', 'Cu Chi Tunnels', 'Ben Thanh Market'],
    meals: ['Breakfast']
  },
  {
    day: 5,
    title: 'Mekong Delta Tour with Lunch',
    description: 'Full day Mekong Delta tour exploring lush delta, traditional villages, local handicrafts, and boat rides through canals.',
    activities: ['Drive to Mekong Delta', 'Village visits', 'Local handicrafts', 'Boat ride through canals', 'Coconut candy factory', 'Riverside lunch'],
    meals: ['Breakfast', 'Lunch']
  },
  {
    day: 6,
    title: 'Departure from Ho Chi Minh City',
    description: 'Check out and transfer to Tan Son Nhat Airport for departure.',
    activities: ['Hotel checkout', 'Last minute shopping', 'Airport transfer'],
    meals: ['Breakfast']
  }
];

const vietnam5N6D: TourPackage = {
  id: 'vietnam_5n6d_001',
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
    'https://images.unsplash.com/photo-1528127269322-539801943592?w=800',
    'https://images.unsplash.com/photo-1583417319070-4a69db38a482?w=800',
    'https://images.unsplash.com/photo-1559592413-7cec4d0cae2b?w=800',
    'https://images.unsplash.com/photo-1555633514-abcee6ab2e4e?w=800'
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
