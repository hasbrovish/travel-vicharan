export type PackageCategory = 'FAMILY' | 'HONEYMOON' | 'GROUP' | 'SENIORS' | 'WEEKEND';
export type PackageType = 'DOMESTIC' | 'INTERNATIONAL';
export type DepartureStatus = 'AVAILABLE' | 'FILLING_FAST' | 'SOLD_OUT';

export interface ItineraryDay {
  day: number;
  title: string;
  description: string;
  activities: string[];
  meals: string[];
}

export interface Departure {
  date: string;
  departureCity: string;
  availableSeats: number;
  status: DepartureStatus;
}

export interface TourPackage {
  id: string;
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
}
