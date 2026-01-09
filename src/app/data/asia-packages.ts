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
    title: 'Day 1 – Colombo Arrival & Negombo Beach Welcome',
    description: 'Ayubowan! Welcome to the Pearl of the Indian Ocean! Your Sri Lankan adventure begins. • Bandaranaike International Airport (Colombo) arrival • Transfer to Negombo beach town (10 km / ~20 minutes) • Hotel check-in and refresh • Afternoon leisure at Negombo Beach (golden sand and calm waters) • Visit the famous Dutch Canal and fish market (bustling local life) • Sunset at the beach • Overnight stay in Negombo',
    activities: ['Airport pickup', 'Transfer to Negombo', 'Beach leisure', 'Fish market visit'],
    meals: []
  },
  {
    day: 2,
    title: 'Day 2 – Elephants at Pinnawala & Dambulla Golden Temple',
    description: 'Journey into the heart of Sri Lanka with elephants and ancient cave temples (150 km / ~4 hours total). • Morning drive to Pinnawala Elephant Orphanage (largest herd of captive elephants - 70+ elephants) • Watch elephants bathing in the river • Feeding time with baby elephants • Continue to Dambulla Cave Temple (UNESCO World Heritage Site) • Explore 5 rock caves with 150+ Buddha statues and ancient murals • Transfer to Sigiriya area • Overnight stay in Sigiriya',
    activities: ['Pinnawala Elephant Orphanage', 'Elephant bathing & feeding', 'Dambulla Cave Temple', 'Ancient Buddha statues'],
    meals: ['Breakfast']
  },
  {
    day: 3,
    title: 'Day 3 – Sigiriya Rock Fortress Climb & Polonnaruwa Ruins',
    description: 'Explore two UNESCO World Heritage Sites in one incredible day. • Early morning climb Sigiriya Rock Fortress (Lion Rock - 200m high, 1,200 steps) • Ancient frescoes of Sigiriya maidens • Panoramic views from the summit (former royal palace) • Afternoon visit to Polonnaruwa Ancient City (medieval capital from 11th century) • Gal Vihara (massive rock-carved reclining Buddha - 14m long) • Royal Palace ruins and Parakrama Samudra lake • Overnight stay in Sigiriya',
    activities: ['Sigiriya Rock climb', 'Panoramic views', 'Polonnaruwa Ancient City', 'Gal Vihara Buddha', 'Royal palaces'],
    meals: ['Breakfast']
  },
  {
    day: 4,
    title: 'Day 4 – Spice Garden Experience & Sacred Kandy',
    description: 'Travel through aromatic spice gardens to Sri Lanka\'s spiritual capital (85 km / ~2.5 hours). • Morning drive to Kandy via Matale • Visit Matale Spice Garden (learn about cinnamon, cardamom, vanilla, pepper) • Spice and herbal product demonstrations • Continue to Kandy (last kingdom of ancient Sri Lanka) • Visit Temple of the Tooth Relic (sacred Buddhist temple housing Buddha\'s tooth) • Attend evening puja ceremony (prayer ritual with drums and chanting) • Walk around Kandy Lake • Overnight stay in Kandy',
    activities: ['Matale Spice Garden', 'Spice & herb learning', 'Temple of the Tooth Relic', 'Evening puja ceremony', 'Kandy Lake'],
    meals: ['Breakfast']
  },
  {
    day: 5,
    title: 'Day 5 – Scenic Tea Country Journey to Nuwara Eliya',
    description: 'Ascend to the misty hills of Ceylon tea country - Little England of Sri Lanka (77 km / ~2.5 hours). • Morning drive through breathtaking mountain roads • Visit tea plantations with carpets of green tea bushes • Tour tea factory to see Ceylon tea production process • Tea tasting session (orange pekoe, white tea, black tea) • Photo stop at Ramboda Falls • Explore Nuwara Eliya town (British colonial architecture and cool climate) • Visit Gregory Lake for boating (optional) • Overnight stay in Nuwara Eliya',
    activities: ['Tea Plantations & Factory', 'Ceylon tea tasting', 'Ramboda Falls', 'Gregory Lake', 'Nuwara Eliya town tour'],
    meals: ['Breakfast']
  },
  {
    day: 6,
    title: 'Day 6 – Departure with Island Memories',
    description: 'Farewell to the beautiful island nation. • Early breakfast at hotel • Scenic drive back to Colombo through hill country and winding roads (180 km / ~5 hours) • Airport transfer for departure • Tour ends with memories of ancient fortresses, sacred temples, elephants, and Ceylon tea',
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
    title: 'Day 1 – Bali Arrival & Beach Sunset Experience',
    description: 'Selamat Datang! Welcome to the Island of Gods. Your Balinese adventure begins. • Ngurah Rai International Airport (Denpasar) arrival • Transfer to Kuta or Seminyak beach area hotel • Hotel check-in and refresh • Afternoon leisure at Kuta Beach or Seminyak Beach (famous surf spots and beachfront) • Sunset views over the Indian Ocean • Explore beachfront cafes and local restaurants • Overnight stay in Kuta/Seminyak',
    activities: ['Airport pickup', 'Hotel check-in', 'Kuta/Seminyak Beach', 'Sunset views', 'Local cafes'],
    meals: []
  },
  {
    day: 2,
    title: 'Day 2 – Ubud Cultural Heart & Tanah Lot Sunset Temple',
    description: 'Discover Bali\'s artistic soul and most photographed temple. • Morning drive to Ubud (cultural capital) • Visit Sacred Monkey Forest Sanctuary (700+ playful long-tailed macaques in temple jungle) • Tegalalang Rice Terrace (Instagram-famous emerald green rice paddies with traditional Subak irrigation) • Ubud Art Market (handmade crafts, paintings, batik, and jewelry) • Ubud Royal Palace • Tirta Empul Temple (holy spring water temple for purification rituals) • Evening: Tanah Lot Temple (iconic sea temple on rock formation) • Sunset photography at this 16th-century Hindu temple • Overnight stay in Kuta/Seminyak',
    activities: ['Ubud Monkey Forest', 'Tegalalang Rice Terrace', 'Ubud Art Market', 'Royal Palace', 'Tirta Empul Temple', 'Tanah Lot sunset'],
    meals: ['Breakfast']
  },
  {
    day: 3,
    title: 'Day 3 – Nusa Dua Beach Water Sports & Uluwatu Kecak Dance',
    description: 'Experience Bali\'s pristine beaches and mesmerizing cultural performance. • Morning at Nusa Dua Beach (white sand and crystal-clear turquoise waters) • Optional water sports: Parasailing, jet-skiing, banana boat, fly-fish, snorkeling • Beach relaxation and swimming • Lunch included • Afternoon visit to Uluwatu Temple (perched on 70m high cliff above the ocean) • Watch the spectacular Kecak Fire Dance performance at sunset (traditional Balinese dance-drama with 50+ male performers chanting) • Stunning cliff views of Indian Ocean • Overnight stay in Kuta/Seminyak',
    activities: ['Nusa Dua Beach', 'Optional water sports', 'Uluwatu Temple', 'Kecak Dance Performance', 'Cliff views'],
    meals: ['Breakfast', 'Lunch']
  },
  {
    day: 4,
    title: 'Day 4 – Mount Batur Sunrise Trek & Waterfall Adventure',
    description: 'Witness an unforgettable volcanic sunrise and explore nature\'s beauty. • Very early morning (3:00 AM) departure for Mount Batur trek • Climb active volcano Mount Batur (1,717m) for sunrise (moderate 2-hour trek) • Breakfast cooked with volcanic steam on the summit • Panoramic views of Lake Batur and surrounding mountains • Descend and visit Tegenungan Waterfall (cascading jungle waterfall perfect for photos) • Optional swim in the natural pool • Explore Ubud markets for last-minute shopping • Overnight stay in Kuta/Seminyak',
    activities: ['Mount Batur sunrise trek', 'Mountain breakfast', 'Lake Batur views', 'Tegenungan Waterfall', 'Ubud markets'],
    meals: ['Breakfast']
  },
  {
    day: 5,
    title: 'Day 5 – Departure with Island Blessings',
    description: 'Sampai Jumpa! Farewell to the Island of Gods. • Hotel checkout after breakfast • Last-minute beach walk or souvenir shopping (optional) • Transfer to Ngurah Rai International Airport • Depart with memories of temples, rice terraces, volcanic sunrises, and Balinese culture • Tour ends',
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
    title: 'Day 1 – Singapore Arrival & Night Safari Adventure',
    description: 'Welcome to the Lion City – Asia\'s modern marvel! Begin your two-country adventure. • Changi Airport (world\'s best airport) arrival • Transfer to hotel and check-in • Afternoon rest and freshen up • Evening: World\'s first nocturnal wildlife park - Night Safari • Open-air tram ride through 7 geographical zones with 2,500+ animals • Creatures of the Night Show (amazing animal performances) • Walk trails to see lions, elephants, tigers in natural habitat • Overnight stay in Singapore',
    activities: ['Airport pickup', 'Hotel check-in', 'Night Safari', 'Tram Ride', 'Animal shows'],
    meals: []
  },
  {
    day: 2,
    title: 'Day 2 – Singapore City Icons & Sentosa Island Wonders',
    description: 'Explore futuristic Singapore and Asia\'s premier island resort. • Morning Singapore City Tour: Merlion Park (Singapore\'s iconic symbol - half-lion, half-fish) • Marina Bay Sands (famous rooftop infinity pool and SkyPark) • Little India (colorful streets and Indian culture) • Chinatown (heritage shophouses and temples) • Afternoon: Cable car ride to Sentosa Island (Asia\'s favorite playground) • Madame Tussauds Singapore (wax museum with celebrity figures) • Evening: Wings of Time Show (spectacular water, laser, and fire show over the sea) • Overnight stay in Singapore',
    activities: ['Merlion Park', 'Marina Bay Sands', 'Little India', 'Chinatown', 'Sentosa Cable Car', 'Madame Tussauds', 'Wings of Time Show'],
    meals: ['Breakfast']
  },
  {
    day: 3,
    title: 'Day 3 – Universal Studios Singapore Full-Day Thrills',
    description: 'Experience Southeast Asia\'s only Universal Studios theme park! • Full day at Universal Studios Singapore on Sentosa Island • Hollywood zone with movie magic • Sci-Fi City: Transformers The Ride 3D (mind-blowing ride) • Ancient Egypt: Revenge of the Mummy roller coaster • The Lost World: Jurassic Park Rapids Adventure • Madagascar zone and Far Far Away castle • WaterWorld live stunt show (explosive action) • New York street sets and shopping • Overnight stay in Singapore',
    activities: ['Universal Studios all zones', 'Transformers ride', 'Jurassic Park', 'Waterworld show', 'Theme park attractions'],
    meals: ['Breakfast']
  },
  {
    day: 4,
    title: 'Day 4 – Cross-Border Journey to Malaysia & Putrajaya',
    description: 'Travel from Singapore to Malaysia\'s capital and federal administrative city (350 km / ~5-6 hours). • Morning checkout from Singapore hotel • Luxury coach transfer to Kuala Lumpur via Malaysia-Singapore border (immigration clearance) • Afternoon arrival in Kuala Lumpur • Visit Putrajaya (Malaysia\'s planned federal city with futuristic architecture) • Putra Mosque (pink-domed mosque - one of Asia\'s most beautiful) • Putra Bridge (resembling Middle Eastern architecture) • Photo stop at Prime Minister\'s Office and Palace of Justice • Hotel check-in in KL • Overnight stay in Kuala Lumpur',
    activities: ['Singapore-KL transfer', 'Border crossing', 'Putrajaya Putra Mosque', 'Putra Bridge', 'Prime Minister Office', 'KL check-in'],
    meals: ['Breakfast']
  },
  {
    day: 5,
    title: 'Day 5 – Kuala Lumpur Highlights & Genting Highlands',
    description: 'Discover Malaysia\'s vibrant capital and mountain resort paradise. • Morning Kuala Lumpur City Tour: King\'s Palace (Istana Negara) • Independence Square (Dataran Merdeka with colonial buildings) • Photo stop at Petronas Twin Towers (world\'s tallest twin towers, 88 floors) • KL Tower (Menara KL telecommunications tower) • Afternoon: Drive to Genting Highlands (50 km / ~1 hour to 6,000 feet elevation) • Scenic Genting Skyway cable car ride (Asia\'s longest and fastest gondola lift) • SkyAvenue Mall shopping and entertainment • Skytropolis Indoor Theme Park • Return to KL • Overnight stay in Kuala Lumpur',
    activities: ['King\'s Palace', 'Independence Square', 'Petronas Towers', 'KL Tower', 'Genting Cable Car', 'SkyAvenue Mall', 'Skytropolis'],
    meals: ['Breakfast']
  },
  {
    day: 6,
    title: 'Day 6 – Departure with Southeast Asian Memories',
    description: 'Selamat Jalan! Farewell to Malaysia and Singapore. • Hotel checkout after breakfast • Last-minute shopping at Central Market or Pavilion KL (optional) • Transfer to Kuala Lumpur International Airport (KLIA) • Depart with memories of two incredible countries - Singapore\'s futuristic marvels and Malaysia\'s cultural richness • Tour ends',
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
