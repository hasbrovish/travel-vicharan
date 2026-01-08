import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { TourPackage, PackageType } from '../models';
import { OffersFilterCriteria } from '../components/offers-filter/offers-filter';
import { DataService } from './data.service';
import { packageBelongsToDestination } from '../utils/destination-mapping.util';

@Injectable({
  providedIn: 'root'
})
export class PackagesDataService {

  constructor(private dataService: DataService) {}

  // Get all packages from DataService (real packages)
  private get allPackages(): TourPackage[] {
    return this.dataService.getAllPackages();
  }

  // Get all packages synchronously for navigation
  getAllPackagesSync(): TourPackage[] {
    return this.dataService.getAllPackages();
  }

  // Legacy mock packages - kept for reference but not used
  private mockPackages: TourPackage[] = [
    // India - Domestic Packages
    {
      id: 'pkg-001',
      slug: 'kashmir-valley-family-escape-5-days-4-nights',
      packageCode: 'KAS-FAM-001',
      name: 'Kashmir Valley Family Escape',
      description: 'Explore the paradise on Earth with Dal Lake, Gulmarg, and Pahalgam. Perfect for families.',
      category: 'FAMILY',
      type: 'DOMESTIC',
      days: 5,
      nights: 4,
      basePrice: 18500,
      currency: 'INR',
      destinations: ['Srinagar', 'Gulmarg', 'Pahalgam'],
      highlights: ['Dal Lake Shikara Ride', 'Gulmarg Gondola', 'Mughal Gardens', 'Betaab Valley'],
      inclusions: ['4 nights accommodation', 'Daily breakfast', 'Airport transfers', 'Sightseeing'],
      exclusions: ['Lunch & Dinner', 'Gondola tickets', 'Personal expenses'],
      itinerary: [
        { day: 1, title: 'Arrival in Srinagar', description: 'Arrive and check-in to houseboat', activities: ['Dal Lake Shikara ride'], meals: ['Dinner'] },
        { day: 2, title: 'Gulmarg Day Trip', description: 'Visit Gulmarg meadows', activities: ['Gondola ride', 'Snow activities'], meals: ['Breakfast'] },
        { day: 3, title: 'Pahalgam Excursion', description: 'Explore Betaab Valley', activities: ['Valley visit', 'Horse riding'], meals: ['Breakfast'] },
        { day: 4, title: 'Srinagar Sightseeing', description: 'Mughal Gardens tour', activities: ['Nishat Bagh', 'Shalimar Bagh'], meals: ['Breakfast'] },
        { day: 5, title: 'Departure', description: 'Check-out and transfer', activities: [], meals: ['Breakfast'] }
      ],
      departures: [
        { date: '2026-02-15', departureCity: 'Delhi', availableSeats: 20, status: 'AVAILABLE' },
        { date: '2026-02-22', departureCity: 'Mumbai', availableSeats: 5, status: 'FILLING_FAST' },
        { date: '2026-03-01', departureCity: 'Bangalore', availableSeats: 18, status: 'AVAILABLE' }
      ],
      imageUrl: 'https://images.unsplash.com/photo-1568322445389-f64ac2515020?w=800',
      galleryImages: [
        'https://images.unsplash.com/photo-1568322445389-f64ac2515020?w=1200&auto=format&fit=crop', // Dal Lake
        'https://images.unsplash.com/photo-1548013146-72479768bada?w=1200&auto=format&fit=crop', // Gulmarg
        'https://images.unsplash.com/photo-1588580000645-c6e3369d3b39?w=1200&auto=format&fit=crop', // Pahalgam
        'https://images.unsplash.com/photo-1605649487212-47bdab064df7?w=1200&auto=format&fit=crop', // Kashmir Valley
        'https://images.unsplash.com/photo-1587953601933-d97328a95818?w=1200&auto=format&fit=crop', // Mughal Gardens
        'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=1200&auto=format&fit=crop' // Houseboats
      ],
      rating: 4.5,
      totalReviews: 128,
      isActive: true,
      pricingType: 'FIXED',
      roomOptions: [
        { id: 'r1', type: 'DOUBLE', name: 'Double Room', description: 'Standard double', bedType: 'Queen', adultCapacity: 2, childCapacity: 1, priceModifier: 0 }
      ],
      badgeType: 'FAMILY',
      tourType: 'FAMILY',
      emiAvailable: true,
      emiStartingFrom: 3083,
      includes: [
        { icon: 'hotel', label: '4 Star Hotels' },
        { icon: 'meals', label: 'Breakfast' },
        { icon: 'transport', label: 'Transfers' },
        { icon: 'sightseeing', label: 'Sightseeing' }
      ]
    },

    {
      id: 'pkg-002',
      slug: 'rajasthan-royal-honeymoon-6-days-5-nights',
      packageCode: 'RAJ-HON-002',
      name: 'Rajasthan Royal Honeymoon',
      description: 'Experience royal heritage of Jaipur, Udaipur, and Jodhpur. Perfect for honeymooners.',
      category: 'HONEYMOON',
      type: 'DOMESTIC',
      days: 6,
      nights: 5,
      basePrice: 28000,
      currency: 'INR',
      destinations: ['Jaipur', 'Udaipur', 'Jodhpur'],
      highlights: ['Amber Fort', 'City Palace', 'Desert Safari', 'Lake Pichola'],
      inclusions: ['5 nights luxury hotels', 'Daily breakfast', 'Candlelight dinner', 'Desert safari'],
      exclusions: ['Flights', 'Lunch', 'Monument entry fees'],
      itinerary: [
        { day: 1, title: 'Arrival Jaipur', description: 'Pink city exploration', activities: ['City Palace'], meals: ['Dinner'] },
        { day: 2, title: 'Jaipur Sightseeing', description: 'Forts and palaces', activities: ['Amber Fort', 'Hawa Mahal'], meals: ['Breakfast'] },
        { day: 3, title: 'Jaipur to Udaipur', description: 'Travel to lake city', activities: ['Lake Pichola boat ride'], meals: ['Breakfast', 'Dinner'] },
        { day: 4, title: 'Udaipur Exploration', description: 'City of lakes', activities: ['City Palace', 'Saheliyon ki Bari'], meals: ['Breakfast'] },
        { day: 5, title: 'Udaipur to Jodhpur', description: 'Blue city visit', activities: ['Mehrangarh Fort'], meals: ['Breakfast'] },
        { day: 6, title: 'Departure', description: 'Check-out', activities: [], meals: ['Breakfast'] }
      ],
      departures: [
        { date: '2026-02-10', departureCity: 'Delhi', availableSeats: 12, status: 'AVAILABLE' },
        { date: '2026-03-15', departureCity: 'Mumbai', availableSeats: 8, status: 'AVAILABLE' }
      ],
      imageUrl: 'https://images.unsplash.com/photo-1599661046289-e31897846e41?w=800',
      galleryImages: [
        'https://images.unsplash.com/photo-1599661046289-e31897846e41?w=1200&auto=format&fit=crop', // Jaipur Palace
        'https://images.unsplash.com/photo-1539650116574-75c0c6d73a6e?w=1200&auto=format&fit=crop', // Udaipur Lake
        'https://images.unsplash.com/photo-1559827260-dc66d52bef19?w=1200&auto=format&fit=crop', // Jodhpur Fort
        'https://images.unsplash.com/photo-1524492412937-b28074a5d7da?w=1200&auto=format&fit=crop', // Amber Fort
        'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=1200&auto=format&fit=crop', // Desert Safari
        'https://images.unsplash.com/photo-1559827260-dc66d52bef19?w=1200&auto=format&fit=crop' // City Palace
      ],
      rating: 4.8,
      totalReviews: 89,
      isActive: true,
      pricingType: 'FIXED',
      roomOptions: [
        { id: 'r1', type: 'DOUBLE', name: 'Honeymoon Suite', description: 'Romantic suite', bedType: 'King', adultCapacity: 2, childCapacity: 0, priceModifier: 0 }
      ],
      badgeType: 'HONEYMOON',
      tourType: 'FAMILY',
      emiAvailable: true,
      emiStartingFrom: 4667,
      includes: [
        { icon: 'hotel', label: '5 Star Hotels' },
        { icon: 'meals', label: 'Breakfast & Dinner' },
        { icon: 'transport', label: 'Private Car' },
        { icon: 'sightseeing', label: 'All Sightseeing' }
      ]
    },

    // International - Thailand
    {
      id: 'pkg-101',
      slug: 'bangkok-pattaya-group-tour-5-days-4-nights',
      packageCode: 'THA-GRP-101',
      name: 'Bangkok Pattaya Group Tour',
      description: 'City temples, island beaches, and vibrant nightlife. Easy visa on arrival.',
      category: 'GROUP',
      type: 'INTERNATIONAL',
      days: 5,
      nights: 4,
      basePrice: 32000,
      currency: 'INR',
      destinations: ['Bangkok', 'Pattaya'],
      highlights: ['Grand Palace', 'Coral Island', 'Floating Market', 'Alcazar Show'],
      inclusions: ['Round-trip flights', '4 nights hotel', 'Daily breakfast', 'Visa assistance', 'Sightseeing'],
      exclusions: ['Lunch & Dinner', 'Travel insurance', 'Optional activities'],
      itinerary: [
        { day: 1, title: 'Arrival Bangkok', description: 'Welcome to Thailand', activities: ['Hotel check-in'], meals: [] },
        { day: 2, title: 'Bangkok City Tour', description: 'Temples and palace', activities: ['Grand Palace', 'Wat Pho'], meals: ['Breakfast'] },
        { day: 3, title: 'Pattaya Transfer', description: 'Beach city', activities: ['Coral Island', 'Water sports'], meals: ['Breakfast'] },
        { day: 4, title: 'Pattaya Fun', description: 'Shows and shopping', activities: ['Alcazar Show', 'Walking Street'], meals: ['Breakfast'] },
        { day: 5, title: 'Departure', description: 'Fly back', activities: [], meals: ['Breakfast'] }
      ],
      departures: [
        { date: '2026-02-18', departureCity: 'Delhi', availableSeats: 25, status: 'AVAILABLE' },
        { date: '2026-02-25', departureCity: 'Mumbai', availableSeats: 3, status: 'FILLING_FAST' },
        { date: '2026-03-05', departureCity: 'Bangalore', availableSeats: 30, status: 'AVAILABLE' }
      ],
      imageUrl: 'https://images.unsplash.com/photo-1552465011-b4e21bf6e79a?w=800',
      galleryImages: [
        'https://images.unsplash.com/photo-1552465011-b4e21bf6e79a?w=1200&auto=format&fit=crop', // Bangkok Temples
        'https://images.unsplash.com/photo-1589394815804-964ed0be2eb5?w=1200&auto=format&fit=crop', // Pattaya Beach
        'https://images.unsplash.com/photo-1528181304800-75b772005e0a?w=1200&auto=format&fit=crop', // Grand Palace
        'https://images.unsplash.com/photo-1552465011-b4e21bf6e79a?w=1200&auto=format&fit=crop', // Floating Market
        'https://images.unsplash.com/photo-1589394815804-964ed0be2eb5?w=1200&auto=format&fit=crop', // Coral Island
        'https://images.unsplash.com/photo-1528181304800-75b772005e0a?w=1200&auto=format&fit=crop' // Thai Culture
      ],
      rating: 4.6,
      totalReviews: 245,
      isActive: true,
      pricingType: 'FIXED',
      roomOptions: [
        { id: 'r1', type: 'TWIN', name: 'Twin Sharing', description: 'Two beds', bedType: 'Twin', adultCapacity: 2, childCapacity: 0, priceModifier: 0 }
      ],
      badgeType: 'GROUP_TOUR',
      tourType: 'GROUP',
      emiAvailable: true,
      emiStartingFrom: 5333,
      includes: [
        { icon: 'flight', label: 'Flights Included' },
        { icon: 'hotel', label: '3 Star Hotels' },
        { icon: 'meals', label: 'Breakfast' },
        { icon: 'guide', label: 'Tour Guide' }
      ]
    },

    // Dubai
    {
      id: 'pkg-201',
      slug: 'dubai-family-adventure-4-days-3-nights',
      packageCode: 'DXB-FAM-201',
      name: 'Dubai Family Adventure',
      description: 'Burj Khalifa, desert safari, and luxury shopping. Visa included.',
      category: 'FAMILY',
      type: 'INTERNATIONAL',
      days: 4,
      nights: 3,
      basePrice: 48000,
      currency: 'INR',
      destinations: ['Dubai'],
      highlights: ['Burj Khalifa 124th floor', 'Desert Safari with BBQ', 'Dubai Mall', 'Dhow Cruise'],
      inclusions: ['Return flights', '3 nights 4-star hotel', 'Daily breakfast', 'Visa', 'Desert safari', 'City tour'],
      exclusions: ['Lunch & Dinner (except safari)', 'Burj Khalifa tickets', 'Shopping'],
      itinerary: [
        { day: 1, title: 'Arrival Dubai', description: 'Welcome to UAE', activities: ['Hotel check-in', 'Evening Dhow Cruise'], meals: [] },
        { day: 2, title: 'Dubai City Tour', description: 'Modern marvels', activities: ['Burj Khalifa', 'Dubai Mall', 'Dubai Fountain'], meals: ['Breakfast'] },
        { day: 3, title: 'Desert Safari', description: 'Arabian adventure', activities: ['Dune bashing', 'Camel ride', 'BBQ dinner'], meals: ['Breakfast', 'Dinner'] },
        { day: 4, title: 'Departure', description: 'Fly home', activities: ['Shopping time'], meals: ['Breakfast'] }
      ],
      departures: [
        { date: '2026-02-12', departureCity: 'Delhi', availableSeats: 15, status: 'AVAILABLE' },
        { date: '2026-02-20', departureCity: 'Mumbai', availableSeats: 10, status: 'AVAILABLE' },
        { date: '2026-03-01', departureCity: 'Bangalore', availableSeats: 12, status: 'AVAILABLE' }
      ],
      imageUrl: 'https://images.unsplash.com/photo-1512453979798-5ea266f8880c?w=800',
      galleryImages: [
        'https://images.unsplash.com/photo-1512453979798-5ea266f8880c?w=1200&auto=format&fit=crop', // Burj Khalifa
        'https://images.unsplash.com/photo-1488646953014-85cb44e25828?w=1200&auto=format&fit=crop', // Dubai Skyline
        'https://images.unsplash.com/photo-1512453979798-5ea266f8880c?w=1200&auto=format&fit=crop', // Desert Safari
        'https://images.unsplash.com/photo-1488646953014-85cb44e25828?w=1200&auto=format&fit=crop', // Dubai Mall
        'https://images.unsplash.com/photo-1512453979798-5ea266f8880c?w=1200&auto=format&fit=crop', // Dhow Cruise
        'https://images.unsplash.com/photo-1488646953014-85cb44e25828?w=1200&auto=format&fit=crop' // Palm Jumeirah
      ],
      rating: 4.7,
      totalReviews: 312,
      isActive: true,
      pricingType: 'FIXED',
      roomOptions: [
        { id: 'r1', type: 'DOUBLE', name: 'Family Room', description: 'Spacious room', bedType: 'King + Sofa', adultCapacity: 2, childCapacity: 2, priceModifier: 0 }
      ],
      badgeType: 'FAMILY',
      tourType: 'FAMILY',
      emiAvailable: true,
      emiStartingFrom: 8000,
      includes: [
        { icon: 'flight', label: 'Flights' },
        { icon: 'hotel', label: '4 Star Hotel' },
        { icon: 'meals', label: 'Breakfast' },
        { icon: 'sightseeing', label: 'Desert Safari' }
      ]
    },

    // Singapore
    {
      id: 'pkg-301',
      slug: 'singapore-family-fun-4-days-3-nights',
      packageCode: 'SIN-FAM-301',
      name: 'Singapore Family Fun',
      description: 'Gardens by the Bay, Sentosa, and Universal Studios. Visa-free for Indians.',
      category: 'FAMILY',
      type: 'INTERNATIONAL',
      days: 4,
      nights: 3,
      basePrice: 45000,
      currency: 'INR',
      destinations: ['Singapore'],
      highlights: ['Universal Studios', 'Gardens by the Bay', 'Sentosa Island', 'Night Safari'],
      inclusions: ['Flights', '3 nights hotel', 'Breakfast', 'Universal Studios ticket', 'City tour'],
      exclusions: ['Lunch & Dinner', 'Additional attractions', 'Shopping'],
      itinerary: [
        { day: 1, title: 'Arrival', description: 'Lion city', activities: ['Marina Bay', 'Gardens by the Bay'], meals: [] },
        { day: 2, title: 'Universal Studios', description: 'Full day fun', activities: ['Universal Studios'], meals: ['Breakfast'] },
        { day: 3, title: 'Sentosa Island', description: 'Beach and attractions', activities: ['S.E.A Aquarium', 'Cable car'], meals: ['Breakfast'] },
        { day: 4, title: 'Departure', description: 'Fly back', activities: ['Shopping at Orchard'], meals: ['Breakfast'] }
      ],
      departures: [
        { date: '2026-02-14', departureCity: 'Delhi', availableSeats: 8, status: 'FILLING_FAST' },
        { date: '2026-02-28', departureCity: 'Chennai', availableSeats: 20, status: 'AVAILABLE' },
        { date: '2026-03-10', departureCity: 'Bangalore', availableSeats: 15, status: 'AVAILABLE' }
      ],
      imageUrl: 'https://images.unsplash.com/photo-1525625293386-3f8f99389edd?w=800',
      galleryImages: [
        'https://images.unsplash.com/photo-1525625293386-3f8f99389edd?w=1200&auto=format&fit=crop', // Marina Bay
        'https://images.unsplash.com/photo-1480714378408-67cf0d13bc1b?w=1200&auto=format&fit=crop', // Gardens by the Bay
        'https://images.unsplash.com/photo-1525625293386-3f8f99389edd?w=1200&auto=format&fit=crop', // Universal Studios
        'https://images.unsplash.com/photo-1480714378408-67cf0d13bc1b?w=1200&auto=format&fit=crop', // Sentosa Island
        'https://images.unsplash.com/photo-1525625293386-3f8f99389edd?w=1200&auto=format&fit=crop', // Singapore Skyline
        'https://images.unsplash.com/photo-1480714378408-67cf0d13bc1b?w=1200&auto=format&fit=crop' // Night Safari
      ],
      rating: 4.8,
      totalReviews: 198,
      isActive: true,
      pricingType: 'FIXED',
      roomOptions: [
        { id: 'r1', type: 'DOUBLE', name: 'Deluxe Room', description: 'City view', bedType: 'Queen', adultCapacity: 2, childCapacity: 1, priceModifier: 0 }
      ],
      badgeType: 'FAMILY',
      tourType: 'FAMILY',
      emiAvailable: true,
      emiStartingFrom: 7500,
      includes: [
        { icon: 'flight', label: 'Return Flights' },
        { icon: 'hotel', label: '4 Star Hotel' },
        { icon: 'meals', label: 'Breakfast' },
        { icon: 'sightseeing', label: 'Universal Studios' }
      ]
    }
  ];

  getAllPackages(): Observable<TourPackage[]> {
    return of(this.allPackages);
  }

  getPackageById(id: string): Observable<TourPackage | undefined> {
    const pkg = this.dataService.getPackageById(id);
    return of(pkg);
  }

  getPackageBySlug(slug: string): Observable<TourPackage | undefined> {
    const pkg = this.dataService.getPackageBySlug(slug);
    return of(pkg);
  }

  filterPackages(criteria: OffersFilterCriteria): Observable<TourPackage[]> {
    let filtered = [...this.allPackages];

    // Category filter (FAMILY, HONEYMOON, GROUP, SENIORS, WEEKEND)
    if (criteria.category) {
      filtered = filtered.filter(pkg => pkg.category === criteria.category);
    }

    // Attraction filter (search in highlights, description, activities)
    if (criteria.attraction) {
      const attractionLower = criteria.attraction.toLowerCase().replace(/-/g, ' ');
      filtered = filtered.filter(pkg => {
        // Check highlights
        const hasInHighlights = pkg.highlights.some(highlight => 
          highlight.toLowerCase().includes(attractionLower)
        );
        
        // Check description
        const hasInDescription = pkg.description.toLowerCase().includes(attractionLower);
        
        // Check itinerary activities
        const hasInActivities = pkg.itinerary.some(day => 
          day.activities.some(activity => 
            activity.toLowerCase().includes(attractionLower)
          )
        );
        
        return hasInHighlights || hasInDescription || hasInActivities;
      });
    }

    // Tag filter (India/World → DOMESTIC/INTERNATIONAL)
    if (criteria.tag) {
      const type: PackageType = criteria.tag === 'India' ? 'DOMESTIC' : 'INTERNATIONAL';
      filtered = filtered.filter(pkg => pkg.type === type);
    }

    // Price range filter
    if (criteria.priceRange) {
      const [min, max] = this.parsePriceRange(criteria.priceRange);
      filtered = filtered.filter(pkg => {
        if (max) {
          return pkg.basePrice >= min && pkg.basePrice <= max;
        } else {
          return pkg.basePrice >= min;
        }
      });
    }

    // Departure city filter
    if (criteria.departureCity) {
      filtered = filtered.filter(pkg =>
        pkg.departures.some(d => d.departureCity === criteria.departureCity)
      );
    }

    // City filter (check destinations array using destination mapping)
    if (criteria.city) {
      filtered = filtered.filter(pkg =>
        packageBelongsToDestination(pkg.destinations, criteria.city!)
      );
    }

    // Country filter (for international packages, check if destination matches using mapping)
    if (criteria.country) {
      filtered = filtered.filter(pkg =>
        packageBelongsToDestination(pkg.destinations, criteria.country!)
      );
    }

    // Duration filter
    if (criteria.duration) {
      filtered = filtered.filter(pkg => {
        const totalDays = pkg.days;
        switch (criteria.duration) {
          case 'short':
            return totalDays >= 1 && totalDays <= 3;
          case 'medium':
            return totalDays >= 4 && totalDays <= 7;
          case 'long':
            return totalDays >= 8;
          default:
            return true;
        }
      });
    }

    // Date range filter
    if (criteria.departStartDate && criteria.departEndDate) {
      const startDate = new Date(criteria.departStartDate);
      const endDate = new Date(criteria.departEndDate);
      filtered = filtered.filter(pkg =>
        pkg.departures.some(d => {
          const depDate = new Date(d.date);
          return depDate >= startDate && depDate <= endDate;
        })
      );
    }

    return of(filtered);
  }

  private parsePriceRange(range: string): [number, number | null] {
    // Handle formats like "300000+", "100000+", etc.
    if (range.includes('+')) {
      const min = parseInt(range.replace('+', ''), 10);
      return [min, null];
    }
    // Handle formats like "0-35000", "35000-50000", etc.
    if (range.includes('-')) {
      const [min, max] = range.split('-').map(Number);
      return [min, max];
    }
    // Fallback: treat as minimum price
    return [parseInt(range, 10), null];
  }
}
