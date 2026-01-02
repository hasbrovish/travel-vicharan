export interface DestinationTile {
  id: string;
  name: string;
  imageUrl: string;
  price?: number;
}

export interface HolidayTile {
  id: string;
  name: string;
  icon: string;
  startingPrice: number;
}

export interface OfferCard {
  id: string;
  type: 'last-minute' | 'easy-visa' | 'customized';
  title: string;
  subtitle: string;
  gradient: string;
  destinations?: DestinationTile[];
  holidays?: HolidayTile[];
  ctaText: string;
  ctaCount?: string;
}

export interface OfferFeature {
  icon: string;
  text: string;
}
