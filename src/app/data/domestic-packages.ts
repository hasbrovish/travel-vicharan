import {
  TourPackage,
  RoomOption,
  TourInclusion,
  ItineraryDay
} from '../models/tour-package.model';

/**
 * Domestic Tour Packages - Andaman, Goa, Rajasthan, etc.
 * Data source: /tour-docs/
 */

// Common room options for domestic packages
const domesticRoomOptions: RoomOption[] = [
  {
    id: 'room_double_dom',
    type: 'DOUBLE',
    name: 'Double Sharing',
    description: 'Two guests sharing one room with double bed',
    bedType: 'Double Bed',
    adultCapacity: 2,
    childCapacity: 1,
    priceModifier: 0
  },
  {
    id: 'room_twin_dom',
    type: 'TWIN',
    name: 'Twin Sharing',
    description: 'Two guests sharing one room with twin beds',
    bedType: 'Twin Beds',
    adultCapacity: 2,
    childCapacity: 1,
    priceModifier: 0
  },
  {
    id: 'room_single_dom',
    type: 'SINGLE',
    name: 'Single Occupancy',
    description: 'One guest in a private room',
    bedType: 'Single/Double Bed',
    adultCapacity: 1,
    childCapacity: 0,
    priceModifier: 7000
  }
];

// ==============================================
// ANDAMAN ISLANDS 4N/5D
// ==============================================

const andaman4N5D_Itinerary: ItineraryDay[] = [
  {
    day: 1,
    title: 'Arrival Port Blair – Cellular Jail – Light & Sound Show',
    description: 'Arrive at Port Blair, visit historic Cellular Jail and Corbyn\'s Cove Beach. Evening Light & Sound Show.',
    activities: ['Airport transfer', 'Cellular Jail visit', 'Corbyn\'s Cove Beach', 'Light & Sound Show'],
    meals: ['Dinner']
  },
  {
    day: 2,
    title: 'Port Blair → Havelock Island – Radhanagar Beach',
    description: 'Ferry to Havelock Island and visit Asia\'s best beach - Radhanagar Beach.',
    activities: ['Ferry to Havelock', 'Hotel check-in', 'Radhanagar Beach visit', 'Sunset viewing'],
    meals: ['Breakfast', 'Dinner']
  },
  {
    day: 3,
    title: 'Elephant Beach Trip – Return to Port Blair',
    description: 'Speedboat to Elephant Beach for snorkeling and water sports. Return ferry to Port Blair.',
    activities: ['Speedboat to Elephant Beach', 'Complimentary snorkeling', 'Optional water sports', 'Return ferry to Port Blair'],
    meals: ['Breakfast', 'Dinner']
  },
  {
    day: 4,
    title: 'North Bay & Ross Island Excursion',
    description: 'Boat trip to North Bay Island for corals and Ross Island for British ruins.',
    activities: ['North Bay Island visit', 'Glass-bottom boat', 'Ross Island exploration', 'Heritage ruins'],
    meals: ['Breakfast', 'Dinner']
  },
  {
    day: 5,
    title: 'Departure from Port Blair',
    description: 'Check out and airport transfer.',
    activities: ['Hotel checkout', 'Airport transfer'],
    meals: ['Breakfast']
  }
];

const andaman4N5D: TourPackage = {
  id: 'andaman_4n5d_001',
  slug: 'andaman-island-paradise-5-days-4-nights',
  packageCode: 'AND-4N5D-001',
  name: 'Andaman Island Paradise - 4N/5D',
  description: 'Explore the pristine beaches and coral reefs of Andaman Islands. Visit Havelock, Radhanagar Beach, Elephant Beach, and historic Cellular Jail.',
  category: 'HONEYMOON',
  type: 'DOMESTIC',
  days: 5,
  nights: 4,
  basePrice: 22999,
  currency: 'INR',
  destinations: ['Port Blair', 'Havelock Island', 'Elephant Beach', 'Ross Island', 'North Bay'],
  highlights: [
    'Radhanagar Beach - Asia\'s #1 beach',
    'Elephant Beach snorkeling with coral reefs',
    'Historic Cellular Jail & Light & Sound Show',
    'Ross & North Bay Island boat excursion',
    'Complimentary snorkeling equipment',
    'Ferry rides through turquoise waters'
  ],
  inclusions: [
    '4 nights accommodation with breakfast',
    'Return airport transfers',
    'Port Blair ↔ Havelock ferry tickets',
    'Private AC vehicle for all sightseeing',
    'Elephant Beach boat transfers',
    'Complimentary snorkeling at Elephant Beach',
    'All permits and entry tickets',
    'Parking, fuel & driver allowances'
  ],
  exclusions: [
    'Airfare to/from Port Blair',
    'Lunch & dinner (except as specified)',
    'Water sports charges (scuba, sea walk, jet ski, parasailing)',
    'Camera fees at Cellular Jail/Ross Island',
    'Personal expenses (shopping, room service, tips)',
    'GST (5%) as applicable',
    'Anything not mentioned in inclusions'
  ],
  itinerary: andaman4N5D_Itinerary,
  departures: [],
  imageUrl: 'https://images.unsplash.com/photo-1559827260-dc66d52bef19?auto=format&fit=crop&w=800',
  galleryImages: [
    'https://images.unsplash.com/photo-1559827260-dc66d52bef19?w=1200&auto=format&fit=crop', // Radhanagar Beach
    'https://images.unsplash.com/photo-1606297681199-9de39def0796?w=1200&auto=format&fit=crop', // Havelock Island
    'https://images.unsplash.com/photo-1586276393509-125e5f0c31db?w=1200&auto=format&fit=crop', // Coral Reefs
    'https://images.unsplash.com/photo-1581783342876-c87f6f634c1b?w=1200&auto=format&fit=crop', // Cellular Jail
    'https://images.unsplash.com/photo-1559827260-dc66d52bef19?w=1200&auto=format&fit=crop', // Ross Island
    'https://images.unsplash.com/photo-1606297681199-9de39def0796?w=1200&auto=format&fit=crop' // Andaman Sunset
  ],
  rating: 4.8,
  totalReviews: 456,
  isActive: true,
  pricingType: 'DATE_BASED',
  datePricing: [
    {
      date: '2025-01-22',
      departureCity: 'Mumbai',
      availableSeats: 18,
      status: 'AVAILABLE',
      price: 22999,
      twinSharingPrice: 22999,
      singleOccupancyPrice: 29999,
      isLowestPrice: true
    },
    {
      date: '2025-02-08',
      departureCity: 'Delhi',
      availableSeats: 12,
      status: 'AVAILABLE',
      price: 24999,
      twinSharingPrice: 24999,
      singleOccupancyPrice: 31999
    },
    {
      date: '2025-02-22',
      departureCity: 'Bangalore',
      availableSeats: 8,
      status: 'FILLING_FAST',
      price: 26999,
      twinSharingPrice: 26999,
      singleOccupancyPrice: 33999
    },
    {
      date: '2025-03-10',
      departureCity: 'Kolkata',
      availableSeats: 15,
      status: 'AVAILABLE',
      price: 25999,
      twinSharingPrice: 25999,
      singleOccupancyPrice: 32999
    },
    {
      date: '2025-03-28',
      departureCity: 'Chennai',
      availableSeats: 10,
      status: 'AVAILABLE',
      price: 27999,
      twinSharingPrice: 27999,
      singleOccupancyPrice: 34999
    }
  ],
  roomOptions: domesticRoomOptions,
  badgeType: 'HONEYMOON',
  tourType: 'FAMILY',
  emiAvailable: true,
  emiStartingFrom: 3834,
  includes: [
    { icon: 'hotel', label: 'Accommodation' },
    { icon: 'meals', label: 'Breakfast' },
    { icon: 'transport', label: 'Ferry & Transfers' },
    { icon: 'sightseeing', label: 'Island Tours' }
  ]
};

// ==============================================
// GOA BEACH GETAWAY 3N/4D
// ==============================================

const goa3N4D_Itinerary: ItineraryDay[] = [
  {
    day: 1,
    title: 'Arrival in Goa',
    description: 'Arrive and transfer to beach resort. Evening free for beach leisure.',
    activities: ['Airport/Railway pickup', 'Resort check-in', 'Beach relaxation'],
    meals: ['Dinner']
  },
  {
    day: 2,
    title: 'North Goa Tour',
    description: 'Visit Fort Aguada, Calangute, Baga & Anjuna beaches. Evening at leisure.',
    activities: ['Fort Aguada', 'Calangute Beach', 'Baga Beach', 'Anjuna Beach', 'Optional water sports'],
    meals: ['Breakfast']
  },
  {
    day: 3,
    title: 'South Goa Tour',
    description: 'Explore Old Goa churches, Mangueshi Temple, and South Goa beaches.',
    activities: ['Basilica of Bom Jesus', 'Se Cathedral', 'Mangueshi Temple', 'Colva Beach', 'Palolem Beach'],
    meals: ['Breakfast']
  },
  {
    day: 4,
    title: 'Departure',
    description: 'Check out and airport/railway transfer.',
    activities: ['Hotel checkout', 'Departure transfer'],
    meals: ['Breakfast']
  }
];

const goa3N4D: TourPackage = {
  id: 'goa_3n4d_001',
  slug: 'goa-beach-escape-4-days-3-nights',
  packageCode: 'GOA-3N4D-001',
  name: 'Goa Beach Escape - 3N/4D',
  description: 'Quick Goa getaway covering pristine beaches, Portuguese heritage, and vibrant nightlife. Perfect weekend escape.',
  category: 'WEEKEND',
  type: 'DOMESTIC',
  days: 4,
  nights: 3,
  basePrice: 12999,
  currency: 'INR',
  destinations: ['North Goa', 'South Goa', 'Old Goa'],
  highlights: [
    'Baga & Calangute - North Goa\'s famous beaches',
    'Fort Aguada with panoramic ocean views',
    'Old Goa UNESCO heritage churches',
    'Palolem & Colva beaches in South Goa',
    'Beach resort stay',
    'Optional water sports & nightlife'
  ],
  inclusions: [
    '3 nights beach resort accommodation',
    'Daily breakfast',
    'Airport/Railway station transfers',
    'North Goa & South Goa sightseeing',
    'AC vehicle for all transfers',
    'Toll, parking & driver charges'
  ],
  exclusions: [
    'Airfare/train tickets',
    'Lunch & dinner',
    'Water sports activities',
    'Entry fees to monuments',
    'Personal expenses',
    'GST (5%) as applicable',
    'Anything not in inclusions'
  ],
  itinerary: goa3N4D_Itinerary,
  departures: [],
  imageUrl: 'https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?w=800',
  galleryImages: [
    'https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?w=1200&auto=format&fit=crop', // Baga Beach
    'https://images.unsplash.com/photo-1559827260-dc66d52bef19?w=1200&auto=format&fit=crop', // Fort Aguada
    'https://images.unsplash.com/photo-1606297681199-9de39def0796?w=1200&auto=format&fit=crop', // Old Goa Church
    'https://images.unsplash.com/photo-1586276393509-125e5f0c31db?w=1200&auto=format&fit=crop', // Palolem Beach
    'https://images.unsplash.com/photo-1581783342876-c87f6f634c1b?w=1200&auto=format&fit=crop', // Calangute Beach
    'https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?w=1200&auto=format&fit=crop' // Goa Sunset
  ],
  rating: 4.6,
  totalReviews: 782,
  isActive: true,
  pricingType: 'DATE_BASED',
  datePricing: [
    {
      date: '2025-01-17',
      departureCity: 'Mumbai',
      availableSeats: 20,
      status: 'AVAILABLE',
      price: 12999,
      twinSharingPrice: 12999,
      singleOccupancyPrice: 18999,
      isLowestPrice: true
    },
    {
      date: '2025-02-07',
      departureCity: 'Pune',
      availableSeats: 15,
      status: 'AVAILABLE',
      price: 13999,
      twinSharingPrice: 13999,
      singleOccupancyPrice: 19999
    },
    {
      date: '2025-02-21',
      departureCity: 'Bangalore',
      availableSeats: 6,
      status: 'FILLING_FAST',
      price: 14999,
      twinSharingPrice: 14999,
      singleOccupancyPrice: 20999
    },
    {
      date: '2025-03-14',
      departureCity: 'Delhi',
      availableSeats: 18,
      status: 'AVAILABLE',
      price: 15999,
      twinSharingPrice: 15999,
      singleOccupancyPrice: 21999
    },
    {
      date: '2025-03-28',
      departureCity: 'Hyderabad',
      availableSeats: 12,
      status: 'AVAILABLE',
      price: 14499,
      twinSharingPrice: 14499,
      singleOccupancyPrice: 20499
    }
  ],
  roomOptions: domesticRoomOptions,
  badgeType: 'SHORT_TRIP',
  tourType: 'FAMILY',
  emiAvailable: true,
  emiStartingFrom: 2167,
  includes: [
    { icon: 'hotel', label: 'Beach Resort' },
    { icon: 'meals', label: 'Breakfast' },
    { icon: 'transport', label: 'Transfers' },
    { icon: 'sightseeing', label: 'Tours' }
  ]
};

// ==============================================
// GOA 4N/5D - COMPLETE GOA EXPERIENCE
// ==============================================

const goa4N5D: TourPackage = {
  id: 'goa_4n5d_001',
  slug: 'goa-complete-5-days-4-nights',
  packageCode: 'GOA-4N5D-001',
  name: 'Goa Complete - 4N/5D',
  description: 'Complete Goa tour with North & South Goa sightseeing, beaches, churches, water sports, and nightlife. Perfect family vacation.',
  category: 'FAMILY',
  type: 'DOMESTIC',
  days: 5,
  nights: 4,
  basePrice: 16999,
  currency: 'INR',
  destinations: ['North Goa', 'South Goa', 'Old Goa'],
  highlights: [
    'Fort Aguada & North Goa beaches (Calangute, Baga, Anjuna)',
    'South Goa - Old Goa Churches (UNESCO)',
    'Dudhsagar Waterfalls & Spice Plantation',
    'Dona Paula, Miramar & Colva beaches',
    'Optional water sports & adventure activities',
    'Beach shacks, nightlife & shopping'
  ],
  inclusions: [
    '4 nights accommodation',
    'Daily breakfast',
    'Private AC vehicle for all sightseeing',
    'North Goa & South Goa tours',
    'Airport/Railway transfers',
    'Toll, parking & driver charges'
  ],
  exclusions: [
    'Airfare/train tickets',
    'Lunch & dinner',
    'Water sports (parasailing, jetski, scuba)',
    'Entry fees',
    'Personal expenses',
    'GST (5%) as applicable'
  ],
  itinerary: [
    {
      day: 1,
      title: 'Arrival & Leisure',
      description: 'Arrive and check in. Visit Calangute/Baga beaches.',
      activities: ['Airport pickup', 'Hotel check-in', 'Beach leisure', 'Nightlife exploration'],
      meals: ['Dinner']
    },
    {
      day: 2,
      title: 'North Goa Full Day',
      description: 'Fort Aguada, Calangute, Baga, Anjuna, Vagator, Chapora Fort.',
      activities: ['Fort Aguada', 'Beach hopping', 'Water sports (optional)', 'Sunset at Chapora'],
      meals: ['Breakfast']
    },
    {
      day: 3,
      title: 'South Goa Tour',
      description: 'Old Goa churches, Miramar, Dona Paula, Colva Beach.',
      activities: ['Basilica of Bom Jesus', 'Se Cathedral', 'Temples', 'South Goa beaches'],
      meals: ['Breakfast']
    },
    {
      day: 4,
      title: 'Adventure Day',
      description: 'Leisure or optional activities - water sports, Grand Island.',
      activities: ['Free time', 'Optional water sports', 'Shopping', 'Beach relaxation'],
      meals: ['Breakfast']
    },
    {
      day: 5,
      title: 'Departure',
      description: 'Check out and departure transfer.',
      activities: ['Checkout', 'Last minute shopping', 'Departure'],
      meals: ['Breakfast']
    }
  ],
  departures: [],
  imageUrl: 'https://images.unsplash.com/photo-1587922546307-776227941871?w=800',
  galleryImages: [
    'https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?w=1200&auto=format&fit=crop', // Fort Aguada
    'https://images.unsplash.com/photo-1606297681199-9de39def0796?w=1200&auto=format&fit=crop', // Old Goa Church
    'https://images.unsplash.com/photo-1586276393509-125e5f0c31db?w=1200&auto=format&fit=crop', // Calangute Beach
    'https://images.unsplash.com/photo-1559827260-dc66d52bef19?w=1200&auto=format&fit=crop', // Baga Beach
    'https://images.unsplash.com/photo-1581783342876-c87f6f634c1b?w=1200&auto=format&fit=crop', // Anjuna Beach
    'https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?w=1200&auto=format&fit=crop' // Goa Sunset
  ],
  rating: 4.7,
  totalReviews: 956,
  isActive: true,
  pricingType: 'DATE_BASED',
  datePricing: [
    {date: '2025-01-20', departureCity: 'Mumbai', availableSeats: 18, status: 'AVAILABLE', price: 16999, twinSharingPrice: 16999, singleOccupancyPrice: 23999, isLowestPrice: true},
    {date: '2025-02-10', departureCity: 'Pune', availableSeats: 14, status: 'AVAILABLE', price: 17999, twinSharingPrice: 17999, singleOccupancyPrice: 24999},
    {date: '2025-02-24', departureCity: 'Bangalore', availableSeats: 7, status: 'FILLING_FAST', price: 18999, twinSharingPrice: 18999, singleOccupancyPrice: 25999},
    {date: '2025-03-12', departureCity: 'Delhi', availableSeats: 20, status: 'AVAILABLE', price: 19999, twinSharingPrice: 19999, singleOccupancyPrice: 26999},
    {date: '2025-03-28', departureCity: 'Hyderabad', availableSeats: 12, status: 'AVAILABLE', price: 18499, twinSharingPrice: 18499, singleOccupancyPrice: 25499}
  ],
  roomOptions: domesticRoomOptions,
  badgeType: 'FAMILY',
  tourType: 'FAMILY',
  emiAvailable: true,
  emiStartingFrom: 2834,
  includes: [{icon: 'hotel', label: 'Beach Resort'}, {icon: 'meals', label: 'Breakfast'}, {icon: 'transport', label: 'Transfers'}, {icon: 'sightseeing', label: 'Tours'}]
};

// ==============================================
// RAJASTHAN 5N/6D - GOLDEN TRIANGLE + DESERT
// ==============================================

const rajasthan5N6D: TourPackage = {
  id: 'rajasthan_5n6d_001',
  slug: 'rajasthan-royal-6-days-5-nights',
  packageCode: 'RAJ-5N6D-001',
  name: 'Rajasthan Royal - 5N/6D',
  description: 'Experience the royal heritage of Rajasthan covering Jaipur, Bikaner, Jaisalmer desert with camel safari and cultural performances.',
  category: 'FAMILY',
  type: 'DOMESTIC',
  days: 6,
  nights: 5,
  basePrice: 28999,
  currency: 'INR',
  destinations: ['Jaipur', 'Bikaner', 'Jaisalmer', 'Desert Camp'],
  highlights: [
    'Jaipur - City Palace, Amber Fort, Hawa Mahal',
    'Bikaner - Junagarh Fort & Camel Research Centre',
    'Jaisalmer Golden Fort & Patwon ki Haveli',
    'Sam Sand Dunes - Camel Safari & Cultural Evening',
    'Desert camp stay with Rajasthani dinner',
    'Royal palaces, forts & colorful bazaars'
  ],
  inclusions: [
    '5 nights accommodation (4 hotels + 1 desert camp)',
    'Daily breakfast + dinner at desert camp',
    'Private AC vehicle for entire tour',
    'Camel safari at Sam Sand Dunes',
    'Cultural program & desert camp activities',
    'All transfers, tolls, parking & driver charges'
  ],
  exclusions: [
    'Airfare/train tickets',
    'Entry fees to monuments',
    'Lunch & dinner (except desert camp)',
    'Jeep safari (optional)',
    'Personal expenses',
    'GST (5%) as applicable'
  ],
  itinerary: [
    {day: 1, title: 'Jaipur Arrival & City Tour', description: 'City Palace, Jantar Mantar, Hawa Mahal, local markets.', activities: ['City Palace', 'Jantar Mantar', 'Hawa Mahal', 'Shopping'], meals: ['Dinner']},
    {day: 2, title: 'Jaipur Forts → Bikaner', description: 'Amber Fort, Jal Mahal, drive to Bikaner.', activities: ['Amber Fort', 'Jal Mahal photo stop', 'Drive to Bikaner'], meals: ['Breakfast']},
    {day: 3, title: 'Bikaner → Jaisalmer', description: 'Junagarh Fort, Karni Mata Temple, drive to Golden City.', activities: ['Junagarh Fort', 'Rat Temple', 'Gadisar Lake'], meals: ['Breakfast']},
    {day: 4, title: 'Jaisalmer Fort & Desert Safari', description: 'Golden Fort, Havelis, Sam Sand Dunes camel safari.', activities: ['Jaisalmer Fort', 'Patwon ki Haveli', 'Camel safari', 'Cultural show', 'BBQ dinner'], meals: ['Breakfast', 'Dinner']},
    {day: 5, title: 'Desert to Jodhpur', description: 'Morning in desert, drive to Blue City.', activities: ['Desert sunrise', 'Drive to Jodhpur', 'Leisure'], meals: ['Breakfast']},
    {day: 6, title: 'Departure', description: 'Checkout and departure.', activities: ['Shopping', 'Departure'], meals: ['Breakfast']}
  ],
  departures: [],
  imageUrl: 'https://images.unsplash.com/photo-1599661046289-e31897846e41?w=800',
  galleryImages: [
    'https://images.unsplash.com/photo-1524492412937-b28074a5d7da?w=1200&auto=format&fit=crop', // Amber Fort
    'https://images.unsplash.com/photo-1599661046289-e31897846e41?w=1200&auto=format&fit=crop', // Jaisalmer Fort
    'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=1200&auto=format&fit=crop', // Desert Camel
    'https://images.unsplash.com/photo-1559827260-dc66d52bef19?w=1200&auto=format&fit=crop', // Jodhpur Blue City
    'https://images.unsplash.com/photo-1539650116574-75c0c6d73a6e?w=1200&auto=format&fit=crop', // Udaipur Lake
    'https://images.unsplash.com/photo-1524492412937-b28074a5d7da?w=1200&auto=format&fit=crop' // Rajasthan Palace
  ],
  rating: 4.8,
  totalReviews: 734,
  isActive: true,
  pricingType: 'DATE_BASED',
  datePricing: [
    {date: '2025-01-24', departureCity: 'Delhi', availableSeats: 16, status: 'AVAILABLE', price: 28999, twinSharingPrice: 28999, singleOccupancyPrice: 38999, isLowestPrice: true},
    {date: '2025-02-14', departureCity: 'Mumbai', availableSeats: 12, status: 'AVAILABLE', price: 30999, twinSharingPrice: 30999, singleOccupancyPrice: 40999},
    {date: '2025-03-05', departureCity: 'Bangalore', availableSeats: 8, status: 'FILLING_FAST', price: 32999, twinSharingPrice: 32999, singleOccupancyPrice: 42999},
    {date: '2025-03-20', departureCity: 'Ahmedabad', availableSeats: 14, status: 'AVAILABLE', price: 31999, twinSharingPrice: 31999, singleOccupancyPrice: 41999},
    {date: '2025-04-10', departureCity: 'Jaipur', availableSeats: 18, status: 'AVAILABLE', price: 29999, twinSharingPrice: 29999, singleOccupancyPrice: 39999}
  ],
  roomOptions: domesticRoomOptions,
  badgeType: 'FAMILY',
  tourType: 'FAMILY',
  emiAvailable: true,
  emiStartingFrom: 4834,
  includes: [{icon: 'hotel', label: 'Heritage Hotels'}, {icon: 'meals', label: 'Meals'}, {icon: 'transport', label: 'Private AC Car'}, {icon: 'sightseeing', label: 'All Tours'}]
};

// Export all domestic packages
export const DOMESTIC_TOUR_PACKAGES: TourPackage[] = [
  andaman4N5D,
  goa3N4D,
  goa4N5D,
  rajasthan5N6D
];

export default DOMESTIC_TOUR_PACKAGES;
