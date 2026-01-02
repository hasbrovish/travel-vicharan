export interface HeroSlide {
  id: string;
  title: string;
  subtitle?: string;
  backgroundImage: string;
  personImage?: string;
  landmarkImage?: string;
  price: number;
  priceLabel?: string;
  ctaText?: string;
  ctaLink?: string;
  badgeText?: string;
}

export interface DestinationCategory {
  id: string;
  slug: string;
  name: string;
  imageUrl: string;
  stats: {
    tours: number;
    departures: number;
    guests: number;
  };
  description?: string;
  featured?: boolean;
}

