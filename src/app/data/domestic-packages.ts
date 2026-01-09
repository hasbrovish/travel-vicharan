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
    title: 'Day 1 – Arrival & Historic Port Blair Experience',
    description: 'Welcome to the Emerald Islands! Begin your Andaman adventure with history and heritage. • Airport pickup and transfer to hotel • Visit the historic Cellular Jail (National Memorial) • Relax at Corbyn\'s Cove Beach • Evening Light & Sound Show at Cellular Jail (moving tribute to freedom fighters) • Overnight stay in Port Blair',
    activities: ['Airport transfer', 'Cellular Jail visit', 'Corbyn\'s Cove Beach', 'Light & Sound Show'],
    meals: ['Dinner']
  },
  {
    day: 2,
    title: 'Day 2 – Ferry to Havelock & Asia\'s Best Beach',
    description: 'Journey to paradise island through turquoise waters! • Morning ferry to Havelock Island (~2 hours scenic cruise) • Hotel check-in • Afternoon visit to Radhanagar Beach (ranked Asia\'s #1 beach) • Pristine white sands and crystal-clear waters • Sunset viewing and beach relaxation • Overnight stay in Havelock',
    activities: ['Ferry to Havelock', 'Hotel check-in', 'Radhanagar Beach visit', 'Sunset viewing'],
    meals: ['Breakfast', 'Dinner']
  },
  {
    day: 3,
    title: 'Day 3 – Elephant Beach Snorkeling & Return Journey',
    description: 'Underwater adventure and island hopping! • Morning speedboat to Elephant Beach • Complimentary snorkeling in coral reefs (witness colorful marine life) • Optional water sports: Sea Walk, Banana Ride, Jet Ski • Afternoon return ferry to Port Blair • Overnight stay in Port Blair',
    activities: ['Speedboat to Elephant Beach', 'Complimentary snorkeling', 'Optional water sports', 'Return ferry to Port Blair'],
    meals: ['Breakfast', 'Dinner']
  },
  {
    day: 4,
    title: 'Day 4 – Island Hopping & Colonial Heritage',
    description: 'Explore two iconic islands in one day! • Morning boat ride to North Bay Island • Glass-bottom boat ride over vibrant coral gardens • Visit Ross Island (British colonial ruins & museums) • Explore abandoned British settlement overtaken by nature • Japanese bunkers and heritage buildings • Overnight stay in Port Blair',
    activities: ['North Bay Island visit', 'Glass-bottom boat', 'Ross Island exploration', 'Heritage ruins'],
    meals: ['Breakfast', 'Dinner']
  },
  {
    day: 5,
    title: 'Day 5 – Departure with Island Memories',
    description: 'Final moments in paradise before heading home. • Hotel checkout after breakfast • Last-minute shopping at Aberdeen Bazaar (optional) • Airport transfer with memories of pristine beaches and turquoise waters • Tour ends',
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
    title: 'Day 1 – Arrival & Beach Sunset Welcome',
    description: 'Welcome to the land of sun, sand, and sea! Your Goa beach escape begins. • Airport/Railway station pickup and transfer to beachside resort • Resort check-in and refresh • Relax on the beach with sunset views • Welcome dinner at resort • Overnight stay in Goa',
    activities: ['Airport/Railway pickup', 'Resort check-in', 'Beach relaxation'],
    meals: ['Dinner']
  },
  {
    day: 2,
    title: 'Day 2 – North Goa Beach Trail & Portuguese Heritage',
    description: 'Explore the vibrant beaches and colonial history of North Goa. • Visit historic Fort Aguada (17th-century Portuguese fort with sea views) • Calangute Beach (Queen of Beaches) • Baga Beach (water sports and beach shacks) • Anjuna Beach (famous for its hippie culture) • Optional: Parasailing, jet-skiing, or banana boat rides • Evening free for beach relaxation or nightlife • Overnight stay in Goa',
    activities: ['Fort Aguada', 'Calangute Beach', 'Baga Beach', 'Anjuna Beach', 'Optional water sports'],
    meals: ['Breakfast']
  },
  {
    day: 3,
    title: 'Day 3 – South Goa Heritage & Serene Beaches',
    description: 'Discover the spiritual and peaceful side of Goa with UNESCO heritage and pristine southern beaches. • Visit Basilica of Bom Jesus (UNESCO World Heritage Site) • Se Cathedral (largest church in Asia) • Mangueshi Temple (Hindu temple with unique architecture) • Colva Beach (white sands and calm waters) • Palolem Beach (crescent-shaped paradise beach) • Evening free for shopping or beach sunset • Overnight stay in Goa',
    activities: ['Basilica of Bom Jesus', 'Se Cathedral', 'Mangueshi Temple', 'Colva Beach', 'Palolem Beach'],
    meals: ['Breakfast']
  },
  {
    day: 4,
    title: 'Day 4 – Departure with Beach Memories',
    description: 'Final moments in coastal paradise before heading home. • Hotel checkout after breakfast • Last beach walk or souvenir shopping (optional) • Airport/Railway transfer with memories of golden beaches and Portuguese charm • Tour ends',
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
      title: 'Day 1 – Arrival & First Beach Vibes',
      description: 'Welcome to Goa – where the party meets paradise! Begin your beach adventure. • Airport/Railway pickup and hotel check-in • Afternoon visit to Calangute Beach (Queen of Beaches) or Baga Beach • Evening free for beach shacks, live music, or nightlife exploration • Overnight stay in North Goa',
      activities: ['Airport pickup', 'Hotel check-in', 'Beach leisure', 'Nightlife exploration'],
      meals: ['Dinner']
    },
    {
      day: 2,
      title: 'Day 2 – North Goa Beach Circuit & Fort Views',
      description: 'Explore the iconic beaches and colonial landmarks of North Goa. • Morning visit to Fort Aguada (17th-century Portuguese fort with panoramic sea views) • Beach hopping: Calangute → Baga → Anjuna → Vagator • Optional water sports (parasailing, jet-skiing, banana boat) • Sunset at Chapora Fort (famous "Dil Chahta Hai" fort) • Evening free for shopping or beach parties • Overnight stay in North Goa',
      activities: ['Fort Aguada', 'Beach hopping', 'Water sports (optional)', 'Sunset at Chapora'],
      meals: ['Breakfast']
    },
    {
      day: 3,
      title: 'Day 3 – South Goa Heritage Trail & Serene Beaches',
      description: 'Discover the spiritual and tranquil side of Goa with UNESCO sites and pristine southern coastline. • Visit Basilica of Bom Jesus (UNESCO World Heritage Site, houses St. Francis Xavier\'s relics) • Se Cathedral (largest church in Asia) • Miramar Beach (city beach with golden sands) • Dona Paula viewpoint (romantic spot with Arabian Sea panorama) • Colva Beach (white sands and calm waters) • Overnight stay in South Goa',
      activities: ['Basilica of Bom Jesus', 'Se Cathedral', 'Temples', 'South Goa beaches'],
      meals: ['Breakfast']
    },
    {
      day: 4,
      title: 'Day 4 – Adventure & Leisure Day',
      description: 'Your day, your way! Choose your own Goa adventure. • Free day for personalized experiences • Optional: Grand Island boat trip (dolphin spotting, snorkeling, water sports) • Optional: Spice plantation tour with traditional Goan lunch • Shopping at Anjuna Flea Market or Mapusa Market • Beach relaxation and sunset views • Overnight stay in Goa',
      activities: ['Free time', 'Optional water sports', 'Shopping', 'Beach relaxation'],
      meals: ['Breakfast']
    },
    {
      day: 5,
      title: 'Day 5 – Departure with Coastal Memories',
      description: 'Final beach moments before bidding farewell to Goa. • Hotel checkout after breakfast • Last-minute souvenir shopping or beach visit • Airport/Railway transfer with memories of sun-kissed beaches, Portuguese heritage, and vibrant nightlife • Tour ends',
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
    {day: 1, title: 'Day 1 – Jaipur Arrival & Pink City Heritage', description: 'Welcome to the Pink City of India! Begin your royal Rajasthan journey. • Airport/Railway pickup and hotel check-in • Visit City Palace (royal residence with museums and courtyards) • Jantar Mantar (UNESCO World Heritage astronomical observatory) • Hawa Mahal photo stop (Palace of Winds with 953 windows) • Evening shopping at local bazaars (jewelry, textiles, handicrafts) • Overnight stay in Jaipur', activities: ['City Palace', 'Jantar Mantar', 'Hawa Mahal', 'Shopping'], meals: ['Dinner']},
    {day: 2, title: 'Day 2 – Jaipur Forts & Drive to Bikaner', description: 'Explore majestic Rajput forts before journeying to the desert city (330 km / ~6 hours). • Morning visit to Amber Fort (hilltop fort with elephant rides and mirror palace) • Photo stop at Jal Mahal (Water Palace in Man Sagar Lake) • Scenic drive to Bikaner through Thar Desert landscape • Evening arrival and hotel check-in • Overnight stay in Bikaner', activities: ['Amber Fort', 'Jal Mahal photo stop', 'Drive to Bikaner'], meals: ['Breakfast']},
    {day: 3, title: 'Day 3 – Bikaner Temples & Journey to Golden City', description: 'Discover the unique heritage of Bikaner before heading to Jaisalmer (330 km / ~6 hours). • Morning visit to Junagarh Fort (unconquered fort with intricate architecture) • Visit Karni Mata Temple (famous Rat Temple with 20,000 holy rats) • Scenic drive to Jaisalmer (Golden City) • Evening at Gadisar Lake (artificial lake with temples and ghats) • Overnight stay in Jaisalmer', activities: ['Junagarh Fort', 'Rat Temple', 'Gadisar Lake'], meals: ['Breakfast']},
    {day: 4, title: 'Day 4 – Jaisalmer Fort & Thar Desert Safari', description: 'Experience the magic of the Golden Fort and the vast Thar Desert. • Morning exploration of Jaisalmer Fort (living fort with shops and homes inside) • Visit Patwon ki Haveli (ornate merchant mansions with intricate carvings) • Afternoon drive to Sam Sand Dunes (45 km from city) • Camel safari on golden sand dunes during sunset • Cultural folk dance and music performances • BBQ dinner under the stars at desert camp • Overnight stay in desert camp', activities: ['Jaisalmer Fort', 'Patwon ki Haveli', 'Camel safari', 'Cultural show', 'BBQ dinner'], meals: ['Breakfast', 'Dinner']},
    {day: 5, title: 'Day 5 – Desert Sunrise & Blue City Journey', description: 'Witness the desert awakening before traveling to Jodhpur (285 km / ~5 hours). • Sunrise over sand dunes (magical desert morning) • Morning leisure at desert camp • Drive to Jodhpur (Blue City) through desert highways • Evening free for leisure or optional shopping • Overnight stay in Jodhpur', activities: ['Desert sunrise', 'Drive to Jodhpur', 'Leisure'], meals: ['Breakfast']},
    {day: 6, title: 'Day 6 – Departure with Royal Memories', description: 'Final moments in the land of kings before heading home. • Hotel checkout after breakfast • Optional: Last-minute shopping at local markets (spices, handicrafts, textiles) • Airport/Railway transfer with memories of forts, deserts, and royal heritage • Tour ends', activities: ['Shopping', 'Departure'], meals: ['Breakfast']}
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
