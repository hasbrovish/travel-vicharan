export interface DestinationTile {
  id: string;
  name: string;
  imageUrl: string;
  price?: number;
  easyVisa?: boolean;
}

export interface HolidayTile {
  id: string;
  icon: string;
  name: string;
  startingPrice: number;
  currency: string;
}

export interface OfferFeature {
  icon: string;
  label: string;
}

export interface OfferCard {
  id: string;
  type: 'last-minute' | 'easy-visa' | 'customized';
  title: string;
  subtitle: string;
  gradient: string;
  ctaText: string;
  ctaCount?: string;
  destinations?: DestinationTile[];
  holidays?: HolidayTile[];
  features?: OfferFeature[];
  carouselText?: string;
}
