import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { OfferCard, OfferFeature } from '../models/offers.model';

@Injectable({
  providedIn: 'root'
})
export class OffersService {

  getOffers(): Observable<OfferCard[]> {
    return of([
      {
        id: 'last-minute',
        type: 'last-minute',
        title: 'Abhi Jana Hai? Kuch Hai kya?',
        subtitle: 'Last Minute departures, for you',
        gradient: 'linear-gradient(135deg, #4f46e5 0%, #6366f1 50%, #818cf8 100%)', // Premium Indigo
        ctaText: 'View all Departures',
        ctaCount: '80+',
        destinations: [
          {
            id: 'lm-1',
            name: 'Bali, Indonesia',
            imageUrl: 'https://images.unsplash.com/photo-1537996194471-e657df975ab4?w=600'
          },
          {
            id: 'lm-2',
            name: 'Dubai, UAE',
            imageUrl: 'https://images.unsplash.com/photo-1512453979798-5ea266f8880c?w=600'
          },
          {
            id: 'lm-3',
            name: 'Maldives',
            imageUrl: 'https://images.unsplash.com/photo-1514282401047-d79a71a590e8?w=600'
          },
          {
            id: 'lm-4',
            name: 'Singapore',
            imageUrl: 'https://images.unsplash.com/photo-1525625293386-3f8f99389edd?w=600'
          }
        ]
      },
      {
        id: 'easy-visa',
        type: 'easy-visa',
        title: 'Easy-Visa Destinations',
        subtitle: 'Travel with zero visa stress',
        gradient: 'linear-gradient(135deg, #6366f1 0%, #ec4899 100%)', // Premium Indigo-Pink (Eye-Catching)
        ctaText: 'View all Destinations',
        ctaCount: '80+',
        carouselText: 'Explore 80+ More easy-visa destinations',
        destinations: [
          {
            id: 'ev-1',
            name: 'Thailand',
            imageUrl: 'https://images.unsplash.com/photo-1552465011-b4e21bf6e79a?w=600'
          },
          {
            id: 'ev-2',
            name: 'Malaysia',
            imageUrl: 'https://images.unsplash.com/photo-1596422846543-75c6fc197f07?w=600'
          },
          {
            id: 'ev-3',
            name: 'Mauritius',
            imageUrl: 'https://images.unsplash.com/photo-1535490329600-b89736f7ff1e?w=600'
          },
          {
            id: 'ev-4',
            name: 'Sri Lanka',
            imageUrl: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=600'
          },
          {
            id: 'ev-5',
            name: 'Bhutan',
            imageUrl: 'https://images.unsplash.com/photo-1609137144813-7d9921338f24?w=600'
          }
        ]
      },
      {
        id: 'customized',
        type: 'customized',
        title: 'Customized Holidays – Flights Included',
        subtitle: 'Your itinerary, your pace, your way',
        gradient: 'linear-gradient(135deg, #8b5cf6 0%, #a78bfa 100%)', // Premium Purple
        ctaText: 'View all Holidays',
        features: [
          { icon: 'bi-calendar-check', label: 'Personalized Itineraries' },
          { icon: 'bi-calendar2-week', label: 'Flexible Travel Dates' },
          { icon: 'bi-person-badge', label: 'Dedicated Travel Advisor' }
        ],
        holidays: [
          {
            id: 'h-1',
            name: 'Romantic Getaway',
            icon: 'bi-heart-fill',
            startingPrice: 45000,
            currency: 'INR'
          },
          {
            id: 'h-2',
            name: 'Adventure Trip',
            icon: 'bi-bicycle',
            startingPrice: 38000,
            currency: 'INR'
          },
          {
            id: 'h-3',
            name: 'Beach Paradise',
            icon: 'bi-sun-fill',
            startingPrice: 52000,
            currency: 'INR'
          },
          {
            id: 'h-4',
            name: 'Cultural Tour',
            icon: 'bi-building',
            startingPrice: 41000,
            currency: 'INR'
          }
        ]
      }
    ]);
  }

  getCustomizedFeatures(): Observable<OfferFeature[]> {
    return of([
      { icon: 'bi-calendar-check', label: 'Personalized Itineraries' },
      { icon: 'bi-calendar2-week', label: 'Flexible Travel Dates' },
      { icon: 'bi-person-badge', label: 'Dedicated Travel Advisor' }
    ]);
  }
}
