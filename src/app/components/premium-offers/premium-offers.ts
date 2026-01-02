import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { trigger, state, style, transition, animate } from '@angular/animations';
import { OffersService } from '../../services/offers.service';
import { OfferCard, OfferFeature } from '../../models/offers.model';
import { DestinationTile } from '../destination-tile/destination-tile';

@Component({
  selector: 'app-premium-offers',
  imports: [CommonModule, RouterLink, DestinationTile],
  templateUrl: './premium-offers.html',
  styleUrl: './premium-offers.css',
  animations: [
    trigger('carouselSlide', [
      transition('* => *', [
        animate('400ms cubic-bezier(0.4, 0, 0.2, 1)')
      ])
    ])
  ]
})
export class PremiumOffers implements OnInit, OnDestroy {
  offers: OfferCard[] = [];
  features: OfferFeature[] = [];

  // Carousel state
  currentSlide = 0;
  autoScrollInterval: any;
  isAutoScrolling = true;

  constructor(private offersService: OffersService) {}

  ngOnInit(): void {
    this.offersService.getOffers().subscribe(offers => {
      this.offers = offers;
      // Start auto-scroll after offers are loaded
      if (offers.length > 0 && offers[1]?.destinations) {
        this.startAutoScroll();
      }
    });
    this.offersService.getCustomizedFeatures().subscribe(features => {
      this.features = features;
    });
  }

  ngOnDestroy(): void {
    this.stopAutoScroll();
  }

  startAutoScroll(): void {
    this.autoScrollInterval = setInterval(() => {
      if (this.isAutoScrolling) {
        this.nextSlide();
      }
    }, 3000); // Change slide every 3 seconds
  }

  stopAutoScroll(): void {
    if (this.autoScrollInterval) {
      clearInterval(this.autoScrollInterval);
    }
  }

  pauseAutoScroll(): void {
    this.isAutoScrolling = false;
  }

  resumeAutoScroll(): void {
    this.isAutoScrolling = true;
  }

  nextSlide(): void {
    const totalSlides = this.offers[1]?.destinations?.length || 0;
    if (totalSlides > 0) {
      this.currentSlide = (this.currentSlide + 1) % totalSlides;
    }
  }

  prevSlide(): void {
    const totalSlides = this.offers[1]?.destinations?.length || 0;
    if (totalSlides > 0) {
      this.currentSlide = this.currentSlide === 0 ? totalSlides - 1 : this.currentSlide - 1;
    }
  }

  goToSlide(index: number): void {
    this.currentSlide = index;
    this.pauseAutoScroll();
    setTimeout(() => this.resumeAutoScroll(), 5000); // Resume after 5 seconds
  }

  get visibleDestinations() {
    if (!this.offers[1]?.destinations) return [];
    const destinations = this.offers[1].destinations;
    const itemsToShow = 3; // Show 3 items at a time

    // Create circular array for infinite scroll effect
    const extendedArray = [...destinations, ...destinations, ...destinations];
    const startIndex = this.currentSlide + destinations.length;

    return extendedArray.slice(startIndex, startIndex + itemsToShow);
  }
}
