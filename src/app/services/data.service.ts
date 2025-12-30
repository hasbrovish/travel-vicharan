import { Injectable } from '@angular/core';
import { TourPackage, Booking, PackageType, RoomOption, TourInclusion } from '../models';
import REAL_TOUR_PACKAGES from '../data/real-tour-packages';
import DOMESTIC_TOUR_PACKAGES from '../data/domestic-packages';
import INTERNATIONAL_TOUR_PACKAGES from '../data/international-packages';
import ASIA_TOUR_PACKAGES from '../data/asia-packages';
import HIMACHAL_TOUR_PACKAGES from '../data/himachal-packages';
import NORTH_INDIA_TOUR_PACKAGES from '../data/north-india-packages';
import VIETNAM_TOUR_PACKAGES from '../data/vietnam-packages';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  private readonly BOOKINGS_KEY = 'travel_bookings';

  // Default room options for legacy packages
  private readonly DEFAULT_ROOM_OPTIONS: RoomOption[] = [
    {
      id: 'room_double_default',
      type: 'DOUBLE',
      name: 'Double Sharing',
      description: 'Two guests sharing one room',
      bedType: 'Double Bed',
      adultCapacity: 2,
      childCapacity: 1,
      priceModifier: 0
    },
    {
      id: 'room_single_default',
      type: 'SINGLE',
      name: 'Single Occupancy',
      description: 'One guest in private room',
      bedType: 'Single Bed',
      adultCapacity: 1,
      childCapacity: 0,
      priceModifier: 10000
    }
  ];

  // Default inclusions for legacy packages
  private readonly DEFAULT_INCLUDES: TourInclusion[] = [
    { icon: 'hotel', label: 'Accommodation' },
    { icon: 'meals', label: 'Meals' },
    { icon: 'transport', label: 'Transport' },
    { icon: 'sightseeing', label: 'Sightseeing' }
  ];

  private packages: TourPackage[] = [
    // Real tour packages from tour-docs - All legacy packages removed
    ...REAL_TOUR_PACKAGES,              // Kerala packages (3)
    ...DOMESTIC_TOUR_PACKAGES,          // Andaman, Goa, Rajasthan (4)
    ...INTERNATIONAL_TOUR_PACKAGES,     // Dubai, Thailand, Phuket-Krabi (4)
    ...ASIA_TOUR_PACKAGES,              // Sri Lanka, Bali, Singapore-Malaysia (3)
    ...HIMACHAL_TOUR_PACKAGES,          // Shimla-Manali combinations (3)
    ...NORTH_INDIA_TOUR_PACKAGES,       // Uttarakhand, Kashmir (2)
    ...VIETNAM_TOUR_PACKAGES            // Vietnam Hanoi-Halong-Saigon (1)
  ];

  // LEGACY PACKAGES REMOVED - Keeping code for reference only
  /*
  private legacyPackages = [
    {
      id: '1',
      packageCode: 'EUR-001',
      name: 'European Splendours',
      description: 'Experience the best of Europe with visits to Paris, Switzerland, and Italy. Marvel at iconic landmarks, scenic landscapes, and rich cultural heritage.',
      category: 'FAMILY',
      type: 'INTERNATIONAL',
      days: 10,
      nights: 9,
      basePrice: 262000,
      currency: 'INR',
      destinations: ['Paris', 'Switzerland', 'Rome', 'Venice'],
      highlights: [
        'Eiffel Tower and Louvre Museum in Paris',
        'Swiss Alps and scenic train rides',
        'Colosseum and Vatican City in Rome',
        'Gondola ride in Venice',
        'Authentic European cuisine experiences'
      ],
      inclusions: [
        'Round-trip airfare',
        '9 nights accommodation in 4-star hotels',
        'Daily breakfast and select meals',
        'All sightseeing and entrance fees',
        'Professional tour guide',
        'Airport transfers and intercity transport'
      ],
      exclusions: [
        'Travel insurance',
        'Personal expenses',
        'Lunch and dinner (unless specified)',
        'Optional activities',
        'Tips and gratuities'
      ],
      itinerary: [
        {
          day: 1,
          title: 'Arrival in Paris',
          description: 'Welcome to the City of Lights! Transfer to hotel and evening at leisure.',
          activities: ['Airport transfer', 'Hotel check-in', 'Welcome dinner'],
          meals: ['Dinner']
        },
        {
          day: 2,
          title: 'Paris City Tour',
          description: 'Full day exploring iconic Parisian landmarks including Eiffel Tower and Louvre.',
          activities: ['Eiffel Tower visit', 'Seine River cruise', 'Louvre Museum', 'Champs-Élysées walk'],
          meals: ['Breakfast', 'Lunch']
        },
        {
          day: 3,
          title: 'Paris to Switzerland',
          description: 'Travel to Switzerland and enjoy the scenic beauty of the Alps.',
          activities: ['Train journey', 'Interlaken sightseeing', 'Lake Thun visit'],
          meals: ['Breakfast', 'Dinner']
        }
      ],
      departures: [
        { date: '2025-11-15', departureCity: 'Mumbai', availableSeats: 8, status: 'AVAILABLE' },
        { date: '2025-12-10', departureCity: 'Delhi', availableSeats: 3, status: 'FILLING_FAST' },
        { date: '2026-01-20', departureCity: 'Bangalore', availableSeats: 15, status: 'AVAILABLE' }
      ],
      imageUrl: 'https://images.unsplash.com/photo-1502602898657-3e91760cbb34?w=800',
      galleryImages: [
        'https://images.unsplash.com/photo-1502602898657-3e91760cbb34?w=800',
        'https://images.unsplash.com/photo-1527004013197-933c4bb611b3?w=800',
        'https://images.unsplash.com/photo-1552832230-c0197dd311b5?w=800'
      ],
      rating: 4.8,
      totalReviews: 245,
      isActive: true,
      pricingType: 'FIXED',
      roomOptions: this.DEFAULT_ROOM_OPTIONS,
      emiAvailable: true,
      emiStartingFrom: 43667,
      includes: [{ icon: 'flight', label: 'Flights' }, { icon: 'hotel', label: 'Hotels' }, { icon: 'meals', label: 'Meals' }, { icon: 'guide', label: 'Guide' }]
    },
    {
      id: '2',
      packageCode: 'KER-002',
      name: 'Kerala Highlights',
      description: 'Gods Own Country beckons! Explore the lush greenery, serene backwaters, and vibrant culture of Kerala.',
      category: 'FAMILY',
      type: 'DOMESTIC',
      days: 6,
      nights: 5,
      basePrice: 45000,
      currency: 'INR',
      destinations: ['Kochi', 'Munnar', 'Thekkady', 'Alleppey'],
      highlights: [
        'Houseboat stay in Alleppey backwaters',
        'Tea plantation visit in Munnar',
        'Kathakali dance performance',
        'Spice plantation tour in Thekkady',
        'Fort Kochi heritage walk'
      ],
      inclusions: [
        'Accommodation in premium hotels',
        'Daily breakfast',
        '1 night houseboat stay with meals',
        'All transfers and sightseeing',
        'Professional guide',
        'Entrance fees'
      ],
      exclusions: [
        'Airfare/train tickets to Kochi',
        'Lunch and dinner (except houseboat)',
        'Personal expenses',
        'Optional activities'
      ],
      itinerary: [
        {
          day: 1,
          title: 'Arrival in Kochi',
          description: 'Arrive in Kochi, transfer to hotel. Evening visit to Fort Kochi and Marine Drive.',
          activities: ['Fort Kochi walk', 'Chinese fishing nets', 'Marine Drive'],
          meals: ['Dinner']
        },
        {
          day: 2,
          title: 'Kochi to Munnar',
          description: 'Drive to Munnar, the hill station known for tea gardens and scenic beauty.',
          activities: ['Scenic drive', 'Cheeyappara waterfalls', 'Tea plantation visit'],
          meals: ['Breakfast']
        }
      ],
      departures: [
        { date: '2025-11-05', departureCity: 'Mumbai', availableSeats: 12, status: 'AVAILABLE' },
        { date: '2025-11-25', departureCity: 'Delhi', availableSeats: 10, status: 'AVAILABLE' },
        { date: '2025-12-15', departureCity: 'Pune', availableSeats: 5, status: 'FILLING_FAST' }
      ],
      imageUrl: 'https://images.unsplash.com/photo-1602216056096-3b40cc0c9944?w=800',
      galleryImages: [
        'https://images.unsplash.com/photo-1602216056096-3b40cc0c9944?w=800',
        'https://images.unsplash.com/photo-1593693397690-362cb9666fc2?w=800',
        'https://images.unsplash.com/photo-1584274292003-1887b3e8e8e6?w=800'
      ],
      rating: 4.7,
      totalReviews: 189,
      isActive: true,
      pricingType: 'FIXED',
      roomOptions: this.DEFAULT_ROOM_OPTIONS,
      emiAvailable: true,
      emiStartingFrom: 7500,
      includes: [{ icon: 'hotel', label: 'Hotels' }, { icon: 'meals', label: 'Breakfast' }, { icon: 'transport', label: 'Transport' }, { icon: 'sightseeing', label: 'Tours' }]
    },
    {
      id: '3',
      packageCode: 'RAJ-003',
      name: 'Rajasthan Royal',
      description: 'Journey through the land of kings. Experience royal palaces, majestic forts, and colorful culture of Rajasthan.',
      category: 'GROUP',
      type: 'DOMESTIC',
      days: 7,
      nights: 6,
      basePrice: 52000,
      currency: 'INR',
      destinations: ['Jaipur', 'Udaipur', 'Jodhpur', 'Jaisalmer'],
      highlights: [
        'Amber Fort and City Palace in Jaipur',
        'Lake Pichola boat ride in Udaipur',
        'Mehrangarh Fort in Jodhpur',
        'Camel safari in Jaisalmer',
        'Traditional Rajasthani dinner with folk dance'
      ],
      inclusions: [
        'Accommodation in heritage hotels',
        'Daily breakfast and dinner',
        'All sightseeing and transfers',
        'Camel safari in Jaisalmer',
        'Professional guide',
        'Entrance fees to monuments'
      ],
      exclusions: [
        'Airfare/train tickets',
        'Lunch',
        'Personal expenses',
        'Travel insurance',
        'Optional activities'
      ],
      itinerary: [
        {
          day: 1,
          title: 'Arrival in Jaipur',
          description: 'Welcome to the Pink City! Check-in and evening at leisure.',
          activities: ['Hotel check-in', 'Local market visit'],
          meals: ['Dinner']
        },
        {
          day: 2,
          title: 'Jaipur Sightseeing',
          description: 'Explore Amber Fort, City Palace, Hawa Mahal, and Jantar Mantar.',
          activities: ['Amber Fort', 'City Palace', 'Hawa Mahal', 'Jantar Mantar'],
          meals: ['Breakfast', 'Dinner']
        }
      ],
      departures: [
        { date: '2025-11-10', departureCity: 'Mumbai', availableSeats: 15, status: 'AVAILABLE' },
        { date: '2025-12-05', departureCity: 'Bangalore', availableSeats: 2, status: 'FILLING_FAST' },
        { date: '2026-01-15', departureCity: 'Chennai', availableSeats: 20, status: 'AVAILABLE' }
      ],
      imageUrl: 'https://images.unsplash.com/photo-1599661046289-e31897846e41?w=800',
      galleryImages: [
        'https://images.unsplash.com/photo-1599661046289-e31897846e41?w=800',
        'https://images.unsplash.com/photo-1609137144813-7d9921338f24?w=800',
        'https://images.unsplash.com/photo-1620766182966-c6eb5ed2b788?w=800'
      ],
      rating: 4.6,
      totalReviews: 156,
      isActive: true,
      pricingType: 'FIXED',
      roomOptions: this.DEFAULT_ROOM_OPTIONS,
      emiAvailable: true,
      emiStartingFrom: 8667,
      includes: [{ icon: 'hotel', label: 'Heritage Hotels' }, { icon: 'meals', label: 'Meals' }, { icon: 'transport', label: 'Transport' }, { icon: 'guide', label: 'Guide' }]
    },
    {
      id: '4',
      packageCode: 'GOA-004',
      name: 'Goa Beach Paradise',
      description: 'Relax on pristine beaches, enjoy water sports, and experience the vibrant nightlife of Goa.',
      category: 'WEEKEND',
      type: 'DOMESTIC',
      days: 5,
      nights: 4,
      basePrice: 32000,
      currency: 'INR',
      destinations: ['North Goa', 'South Goa', 'Old Goa'],
      highlights: [
        'Baga and Calangute beaches',
        'Water sports activities',
        'Dudhsagar Waterfalls excursion',
        'Old Goa churches visit',
        'Anjuna flea market shopping',
        'Sunset cruise on Mandovi River'
      ],
      inclusions: [
        'Accommodation in beach resort',
        'Daily breakfast',
        'Airport/railway station transfers',
        'North and South Goa sightseeing',
        'Water sports (1 activity)',
        'Sunset cruise'
      ],
      exclusions: [
        'Airfare/train tickets',
        'Lunch and dinner',
        'Additional water sports',
        'Personal expenses',
        'Travel insurance'
      ],
      itinerary: [
        {
          day: 1,
          title: 'Arrival in Goa',
          description: 'Arrive and transfer to beach resort. Evening free to relax on the beach.',
          activities: ['Hotel check-in', 'Beach leisure time'],
          meals: ['Welcome drink']
        },
        {
          day: 2,
          title: 'North Goa Tour',
          description: 'Visit famous beaches and forts of North Goa.',
          activities: ['Fort Aguada', 'Baga Beach', 'Calangute Beach', 'Anjuna Market'],
          meals: ['Breakfast']
        }
      ],
      departures: [
        { date: '2025-11-20', departureCity: 'Mumbai', availableSeats: 10, status: 'AVAILABLE' },
        { date: '2025-12-20', departureCity: 'Pune', availableSeats: 8, status: 'AVAILABLE' },
        { date: '2025-12-31', departureCity: 'Bangalore', availableSeats: 0, status: 'SOLD_OUT' }
      ],
      imageUrl: 'https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?w=800',
      galleryImages: [
        'https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?w=800',
        'https://images.unsplash.com/photo-1587922546307-776227941871?w=800',
        'https://images.unsplash.com/photo-1559827260-dc66d52bef19?w=800'
      ],
      rating: 4.5,
      totalReviews: 203,
      isActive: true,
      pricingType: 'FIXED',
      roomOptions: this.DEFAULT_ROOM_OPTIONS,
      emiAvailable: true,
      emiStartingFrom: 5334,
      includes: [{ icon: 'hotel', label: 'Beach Resort' }, { icon: 'meals', label: 'Breakfast' }, { icon: 'transport', label: 'Transfers' }, { icon: 'sightseeing', label: 'Tours' }]
    },
    {
      id: '5',
      packageCode: 'DXB-005',
      name: 'Dubai Extravaganza',
      description: 'Experience the glitz and glamour of Dubai with iconic landmarks, luxury shopping, and desert adventures.',
      category: 'FAMILY',
      type: 'INTERNATIONAL',
      days: 5,
      nights: 4,
      basePrice: 85000,
      currency: 'INR',
      destinations: ['Dubai', 'Abu Dhabi'],
      highlights: [
        'Burj Khalifa 124th floor visit',
        'Desert safari with BBQ dinner',
        'Dubai Mall and Dubai Fountain',
        'Abu Dhabi city tour with Sheikh Zayed Mosque',
        'Dhow cruise on Dubai Creek',
        'Gold Souk and Spice Souk visit'
      ],
      inclusions: [
        'Round-trip airfare',
        '4 nights in 4-star hotel',
        'Daily breakfast',
        'Desert safari with dinner',
        'Dubai city tour',
        'Abu Dhabi tour',
        'Burj Khalifa tickets',
        'Dhow cruise dinner'
      ],
      exclusions: [
        'Lunch and dinner (except specified)',
        'Personal expenses',
        'Optional activities',
        'Travel insurance'
      ],
      itinerary: [
        {
          day: 1,
          title: 'Arrival in Dubai',
          description: 'Arrive at Dubai International Airport and transfer to hotel.',
          activities: ['Airport transfer', 'Hotel check-in', 'Evening at leisure'],
          meals: []
        },
        {
          day: 2,
          title: 'Dubai City Tour',
          description: 'Full day exploring Dubai Marina, Palm Jumeirah, and Burj Khalifa.',
          activities: ['Dubai Marina', 'Atlantis The Palm', 'Burj Khalifa', 'Dubai Mall'],
          meals: ['Breakfast']
        }
      ],
      departures: [
        { date: '2025-11-18', departureCity: 'Mumbai', availableSeats: 12, status: 'AVAILABLE' },
        { date: '2025-12-22', departureCity: 'Delhi', availableSeats: 6, status: 'FILLING_FAST' },
        { date: '2026-01-10', departureCity: 'Ahmedabad', availableSeats: 15, status: 'AVAILABLE' }
      ],
      imageUrl: 'https://images.unsplash.com/photo-1512453979798-5ea266f8880c?w=800',
      galleryImages: [
        'https://images.unsplash.com/photo-1512453979798-5ea266f8880c?w=800',
        'https://images.unsplash.com/photo-1518684079-3c830dcef090?w=800',
        'https://images.unsplash.com/photo-1559628376-f3fe5f782a2e?w=800'
      ],
      rating: 4.7,
      totalReviews: 178,
      isActive: true,
      pricingType: 'FIXED',
      roomOptions: this.DEFAULT_ROOM_OPTIONS,
      emiAvailable: true,
      emiStartingFrom: 14167,
      includes: [{ icon: 'flight', label: 'Flights' }, { icon: 'hotel', label: '4-Star Hotel' }, { icon: 'meals', label: 'Breakfast' }, { icon: 'sightseeing', label: 'Tours' }]
    },
    {
      id: '6',
      packageCode: 'THL-006',
      name: 'Magical Thailand',
      description: 'Discover the beauty and culture of Thailand with Bangkok temples, Pattaya beaches, and vibrant markets.',
      category: 'HONEYMOON',
      type: 'INTERNATIONAL',
      days: 7,
      nights: 6,
      basePrice: 68000,
      currency: 'INR',
      destinations: ['Bangkok', 'Pattaya', 'Coral Island'],
      highlights: [
        'Grand Palace and Temple of Emerald Buddha',
        'Coral Island tour with water sports',
        'Alcazar Show in Pattaya',
        'Safari World and Marine Park',
        'Floating Market visit',
        'Thai massage and spa session'
      ],
      inclusions: [
        'Round-trip airfare',
        '6 nights accommodation',
        'Daily breakfast',
        'All tours and transfers',
        'Alcazar Show tickets',
        'Visa assistance',
        'Professional guide'
      ],
      exclusions: [
        'Lunch and dinner',
        'Personal expenses',
        'Optional activities',
        'Travel insurance',
        'Tips and gratuities'
      ],
      itinerary: [
        {
          day: 1,
          title: 'Arrival in Bangkok',
          description: 'Welcome to Thailand! Transfer to hotel and evening at leisure.',
          activities: ['Airport transfer', 'Hotel check-in'],
          meals: []
        },
        {
          day: 2,
          title: 'Bangkok City Tour',
          description: 'Visit iconic temples and experience Thai culture.',
          activities: ['Grand Palace', 'Temple of Emerald Buddha', 'Wat Pho', 'Wat Arun'],
          meals: ['Breakfast']
        }
      ],
      departures: [
        { date: '2025-11-12', departureCity: 'Mumbai', availableSeats: 14, status: 'AVAILABLE' },
        { date: '2025-12-18', departureCity: 'Delhi', availableSeats: 10, status: 'AVAILABLE' },
        { date: '2026-01-25', departureCity: 'Kolkata', availableSeats: 8, status: 'AVAILABLE' }
      ],
      imageUrl: 'https://images.unsplash.com/photo-1528181304800-259b08848526?w=800',
      galleryImages: [
        'https://images.unsplash.com/photo-1528181304800-259b08848526?w=800',
        'https://images.unsplash.com/photo-1534008757030-27299c4371b6?w=800',
        'https://images.unsplash.com/photo-1552465011-b4e21bf6e79a?w=800'
      ],
      rating: 4.6,
      totalReviews: 167,
      isActive: true,
      pricingType: 'FIXED',
      roomOptions: this.DEFAULT_ROOM_OPTIONS,
      emiAvailable: true,
      emiStartingFrom: 11334,
      includes: [{ icon: 'flight', label: 'Flights' }, { icon: 'hotel', label: 'Hotels' }, { icon: 'meals', label: 'Breakfast' }, { icon: 'guide', label: 'Guide' }]
    },
    {
      id: '7',
      packageCode: 'SGM-007',
      name: 'Singapore Malaysia',
      description: 'Explore the modern marvels of Singapore and the cultural diversity of Malaysia in one amazing trip.',
      category: 'FAMILY',
      type: 'INTERNATIONAL',
      days: 6,
      nights: 5,
      basePrice: 72000,
      currency: 'INR',
      destinations: ['Singapore', 'Kuala Lumpur', 'Genting Highlands'],
      highlights: [
        'Universal Studios Singapore',
        'Gardens by the Bay',
        'Sentosa Island exploration',
        'Petronas Twin Towers',
        'Batu Caves visit',
        'Genting Highlands day trip'
      ],
      inclusions: [
        'Round-trip airfare',
        '5 nights accommodation',
        'Daily breakfast',
        'Universal Studios tickets',
        'All city tours and transfers',
        'Professional guide',
        'Visa assistance'
      ],
      exclusions: [
        'Lunch and dinner',
        'Personal expenses',
        'Optional activities',
        'Travel insurance'
      ],
      itinerary: [
        {
          day: 1,
          title: 'Arrival in Singapore',
          description: 'Arrive in Singapore, transfer to hotel. Evening visit to Marina Bay.',
          activities: ['Airport transfer', 'Marina Bay Sands', 'Light and Water Show'],
          meals: []
        },
        {
          day: 2,
          title: 'Singapore City Tour',
          description: 'Full day city tour including Sentosa Island.',
          activities: ['Merlion Park', 'Gardens by the Bay', 'Sentosa Island', 'Cable car ride'],
          meals: ['Breakfast']
        }
      ],
      departures: [
        { date: '2025-11-28', departureCity: 'Mumbai', availableSeats: 16, status: 'AVAILABLE' },
        { date: '2025-12-28', departureCity: 'Chennai', availableSeats: 4, status: 'FILLING_FAST' },
        { date: '2026-01-18', departureCity: 'Hyderabad', availableSeats: 12, status: 'AVAILABLE' }
      ],
      imageUrl: 'https://images.unsplash.com/photo-1525625293386-3f8f99389edd?w=800',
      galleryImages: [
        'https://images.unsplash.com/photo-1525625293386-3f8f99389edd?w=800',
        'https://images.unsplash.com/photo-1542267207-f8127b454605?w=800',
        'https://images.unsplash.com/photo-1596422846543-75c6fc197f07?w=800'
      ],
      rating: 4.8,
      totalReviews: 192,
      isActive: true,
      pricingType: 'FIXED',
      roomOptions: this.DEFAULT_ROOM_OPTIONS,
      emiAvailable: true,
      emiStartingFrom: 12000,
      includes: [{ icon: 'flight', label: 'Flights' }, { icon: 'hotel', label: 'Hotels' }, { icon: 'meals', label: 'Breakfast' }, { icon: 'sightseeing', label: 'Tours' }]
    },
    {
      id: '8',
      packageCode: 'KSH-008',
      name: 'Kashmir Paradise',
      description: 'Experience the beauty of Paradise on Earth with stunning valleys, gardens, and Himalayan landscapes.',
      category: 'HONEYMOON',
      type: 'DOMESTIC',
      days: 6,
      nights: 5,
      basePrice: 38000,
      currency: 'INR',
      destinations: ['Srinagar', 'Gulmarg', 'Pahalgam', 'Sonamarg'],
      highlights: [
        'Shikara ride on Dal Lake',
        'Gondola cable car ride in Gulmarg',
        'Betaab Valley and Aru Valley in Pahalgam',
        'Mughal Gardens tour',
        'Thajiwas Glacier excursion',
        'Traditional houseboat stay'
      ],
      inclusions: [
        'Accommodation in deluxe hotels and houseboat',
        'Daily breakfast and dinner',
        'All transfers and sightseeing',
        'Shikara ride',
        'Gondola ride (Phase 1)',
        'Professional guide',
        'All entrance fees'
      ],
      exclusions: [
        'Airfare/train tickets to Srinagar',
        'Lunch',
        'Gondola Phase 2 tickets',
        'Personal expenses',
        'Travel insurance'
      ],
      itinerary: [
        {
          day: 1,
          title: 'Arrival in Srinagar',
          description: 'Arrive in Srinagar, transfer to hotel. Evening Shikara ride on Dal Lake.',
          activities: ['Airport transfer', 'Dal Lake Shikara ride', 'Boulevard walk'],
          meals: ['Dinner']
        },
        {
          day: 2,
          title: 'Srinagar Local Sightseeing',
          description: 'Visit famous Mughal Gardens and temples.',
          activities: ['Nishat Bagh', 'Shalimar Bagh', 'Shankaracharya Temple', 'Hazratbal Shrine'],
          meals: ['Breakfast', 'Dinner']
        }
      ],
      departures: [
        { date: '2025-11-08', departureCity: 'Mumbai', availableSeats: 10, status: 'AVAILABLE' },
        { date: '2025-12-12', departureCity: 'Delhi', availableSeats: 2, status: 'FILLING_FAST' },
        { date: '2026-01-22', departureCity: 'Bangalore', availableSeats: 12, status: 'AVAILABLE' }
      ],
      imageUrl: 'https://images.unsplash.com/photo-1609137144813-7d9921338f24?w=800',
      galleryImages: [
        'https://images.unsplash.com/photo-1609137144813-7d9921338f24?w=800',
        'https://images.unsplash.com/photo-1609137144813-7d9921338f24?w=800',
        'https://images.unsplash.com/photo-1626621341517-bbf3d9990a23?w=800'
      ],
      rating: 4.9,
      totalReviews: 234,
      isActive: true,
      pricingType: 'FIXED',
      roomOptions: this.DEFAULT_ROOM_OPTIONS,
      emiAvailable: true,
      emiStartingFrom: 6334,
      includes: [{ icon: 'hotel', label: 'Hotels & Houseboat' }, { icon: 'meals', label: 'Meals' }, { icon: 'transport', label: 'Transport' }, { icon: 'guide', label: 'Guide' }]
    }
  ];
  */

  constructor() {}

  // Package methods
  getAllPackages(): TourPackage[] {
    return this.packages;
  }

  getPackageById(id: string): TourPackage | undefined {
    return this.packages.find(pkg => pkg.id === id);
  }

  getPackagesByType(type: PackageType): TourPackage[] {
    return this.packages.filter(pkg => pkg.type === type && pkg.isActive);
  }

  getFeaturedPackages(limit: number = 6): TourPackage[] {
    return this.packages
      .filter(pkg => pkg.isActive)
      .sort((a, b) => b.rating - a.rating)
      .slice(0, limit);
  }

  searchPackages(searchTerm: string): TourPackage[] {
    const term = searchTerm.toLowerCase();
    return this.packages.filter(pkg =>
      pkg.isActive && (
        pkg.name.toLowerCase().includes(term) ||
        pkg.destinations.some(dest => dest.toLowerCase().includes(term)) ||
        pkg.description.toLowerCase().includes(term)
      )
    );
  }

  // Booking methods
  createBooking(booking: Booking): void {
    const bookings = this.getAllBookings();
    bookings.push(booking);
    localStorage.setItem(this.BOOKINGS_KEY, JSON.stringify(bookings));
  }

  getAllBookings(): Booking[] {
    const bookingsJson = localStorage.getItem(this.BOOKINGS_KEY);
    if (bookingsJson) {
      return JSON.parse(bookingsJson);
    }
    return [];
  }

  getBookingById(id: string): Booking | undefined {
    const bookings = this.getAllBookings();
    return bookings.find(booking => booking.id === id);
  }

  // Utility method to generate booking reference
  generateBookingReference(): string {
    const timestamp = Date.now();
    const random = Math.floor(Math.random() * 1000);
    return `VT${timestamp}${random}`; // VT = VichranTrip
  }
}
