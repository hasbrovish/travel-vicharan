import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { delay } from 'rxjs/operators';
import { HeroSlide, DestinationCategory } from '../models/home-carousel.model';

@Injectable({
  providedIn: 'root'
})
export class HomeCarouselService {
  
  getHeroSlides(): Observable<HeroSlide[]> {
    return of(this.mockHeroSlides).pipe(delay(300));
  }
  
  getCategories(): Observable<DestinationCategory[]> {
    return of(this.mockCategories).pipe(delay(300));
  }
  
  private mockHeroSlides: HeroSlide[] = [
    {
      id: 'hero-1',
      title: 'Where will your next story begin?',
      subtitle: 'Your journey deserves more than just bookings',
      backgroundImage: 'https://images.unsplash.com/photo-1467269204594-9661b134dd2b?w=1920',
      price: 45999,
      priceLabel: 'Starting from',
      ctaText: 'Start Your Journey',
      ctaLink: '/packages',
      badgeText: 'Most Loved'
    },
    {
      id: 'hero-2',
      title: 'Every destination has a story',
      subtitle: 'We help you write yours, one memory at a time',
      backgroundImage: 'https://images.unsplash.com/photo-1496442226666-8d4d0e62e6e9?w=1920',
      price: 89999,
      priceLabel: 'Starting from',
      ctaText: 'Explore Europe',
      ctaLink: '/packages?type=INTERNATIONAL&region=europe'
    },
    {
      id: 'hero-3',
      title: 'Travel is the only thing you buy that makes you richer',
      subtitle: 'Let us help you collect moments, not just miles',
      backgroundImage: 'https://images.unsplash.com/photo-1524492412937-b28074a5d7da?w=1920',
      price: 25999,
      priceLabel: 'Starting from',
      ctaText: 'Discover India',
      ctaLink: '/packages?type=DOMESTIC'
    }
  ];
  
  private mockCategories: DestinationCategory[] = [
    {
      id: 'cat-1',
      slug: 'europe',
      name: 'Europe',
      imageUrl: 'https://images.unsplash.com/photo-1467269204594-9661b134dd2b?w=1920',
      stats: {
        tours: 12,
        departures: 45,
        guests: 2500
      },
      description: 'Explore historic cities and stunning landscapes',
      featured: true
    },
    {
      id: 'cat-2',
      slug: 'asia',
      name: 'Asia',
      imageUrl: 'https://images.unsplash.com/photo-1507692049790-de58290a4334?w=1920',
      stats: {
        tours: 18,
        departures: 62,
        guests: 3200
      },
      description: 'Rich cultures and breathtaking scenery',
      featured: true
    },
    {
      id: 'cat-3',
      slug: 'india',
      name: 'India',
      imageUrl: 'https://images.unsplash.com/photo-1524492412937-b28074a5d7da?w=1920',
      stats: {
        tours: 25,
        departures: 80,
        guests: 5000
      },
      description: 'Diverse landscapes and rich heritage',
      featured: true
    },
    {
      id: 'cat-4',
      slug: 'beach',
      name: 'Beach',
      imageUrl: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=1920',
      stats: {
        tours: 15,
        departures: 55,
        guests: 2800
      },
      description: 'Tropical paradises and crystal clear waters',
      featured: true
    },
    {
      id: 'cat-5',
      slug: 'adventure',
      name: 'Adventure',
      imageUrl: 'https://images.unsplash.com/photo-1464822759844-d150ad2996e3?w=1920',
      stats: {
        tours: 10,
        departures: 35,
        guests: 1500
      },
      description: 'Thrilling experiences for the bold',
      featured: true
    },
    {
      id: 'cat-6',
      slug: 'luxury',
      name: 'Luxury',
      imageUrl: 'https://images.unsplash.com/photo-1551884170-09fb70a3a2ed?w=1920',
      stats: {
        tours: 8,
        departures: 28,
        guests: 1200
      },
      description: 'Premium experiences and exclusive access',
      featured: true
    }
  ];
}

