export type PackageCategory = 'FAMILY' | 'HONEYMOON' | 'GROUP' | 'SENIORS' | 'WEEKEND';
export type PackageType = 'DOMESTIC' | 'INTERNATIONAL';
export type DepartureStatus = 'AVAILABLE' | 'FILLING_FAST' | 'SOLD_OUT';
export type PricingType = 'FIXED' | 'DATE_BASED';
export type BadgeType = 'GROUP_TOUR' | 'FAMILY' | 'HONEYMOON' | 'SHORT_TRIP';
export type TourType = 'MPSM' | 'FAMILY' | 'GROUP';
export type RoomType = 'DOUBLE' | 'TWIN' | 'SINGLE';
export type TourInclusionIcon = 'hotel' | 'meals' | 'flight' | 'sightseeing' | 'transport' | 'guide';

export interface ItineraryDay {
  day: number;
  title: string;
  description: string;
  activities: string[];
  meals: string[];
  transport?: string; // Optional transport information
  accommodation?: string; // Optional accommodation information
  // Enhanced fields from tour docs
  tips?: string[]; // Travel tips for this day
  importantNotes?: string[]; // Important information
  timeSchedule?: { activity: string; time: string }[]; // Activity timings
  photos?: string[]; // Day-specific photos
  distance?: string; // Distance covered
  duration?: string; // Duration of travel
  highlights?: string[]; // Day-specific highlights
  optionalActivities?: string[]; // Optional activities
  localInsights?: string; // Cultural/local information
  packingSuggestions?: string[]; // What to pack for this day
}

export interface Departure {
  date: string;
  departureCity: string;
  availableSeats: number;
  status: DepartureStatus;
}

export interface DeparturePricing extends Departure {
  price: number;
  twinSharingPrice: number;
  singleOccupancyPrice?: number;
  isLowestPrice?: boolean;
}

export interface RoomOption {
  id: string;
  type: RoomType;
  name: string;
  description: string;
  bedType: string;
  adultCapacity: number;
  childCapacity: number;
  priceModifier: number;
}

export interface TourInclusion {
  icon: TourInclusionIcon;
  label: string;
}

export interface TourPackage {
  id: string;
  slug: string; // SEO-friendly URL slug
  packageCode: string;
  name: string;
  description: string;
  category: PackageCategory;
  type: PackageType;
  days: number;
  nights: number;
  basePrice: number;
  currency: string;
  destinations: string[];
  highlights: string[];
  inclusions: string[];
  exclusions: string[];
  itinerary: ItineraryDay[];
  departures: Departure[];
  imageUrl: string;
  galleryImages: string[];
  rating: number;
  totalReviews: number;
  isActive: boolean;

  // NEW: Date-based pricing
  pricingType: PricingType;
  datePricing?: DeparturePricing[];

  // NEW: Room configuration options
  roomOptions: RoomOption[];

  // NEW: Badge and tour type
  badgeType?: BadgeType;
  tourType?: TourType;

  // NEW: EMI information
  emiAvailable: boolean;
  emiStartingFrom?: number;

  // NEW: Tour includes (icons)
  includes: TourInclusion[];
}
