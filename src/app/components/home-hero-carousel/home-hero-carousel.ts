import { Component, OnInit, OnDestroy, HostListener } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { HomeCarouselService } from '../../services/home-carousel.service';
import { HeroSlide, DestinationCategory } from '../../models/home-carousel.model';
import { trigger, state, style, transition, animate } from '@angular/animations';
import { interval, Subscription } from 'rxjs';

@Component({
  selector: 'app-home-hero-carousel',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './home-hero-carousel.html',
  styleUrl: './home-hero-carousel.css',
  animations: [
    trigger('fadeSlideUp', [
      transition(':enter', [
        style({
          opacity: 0,
          transform: 'translateY(14px)' // Reduced from 20px (30% reduction)
        }),
        animate('840ms cubic-bezier(0.25, 0.1, 0.25, 1)', style({ // Slower, calmer easing
          opacity: 1,
          transform: 'translateY(0)'
        }))
      ])
    ]),
    trigger('heroSlide', [
      transition('* => *', [
        style({ opacity: 0, transform: 'scale(1.035)' }), // Reduced zoom from 1.05 to 1.035 (30% reduction)
        animate('1120ms cubic-bezier(0.25, 0.1, 0.25, 1)', style({ // Slower, calmer transition
          opacity: 1,
          transform: 'scale(1)'
        }))
      ])
    ]),
    trigger('fadeIn', [
      transition('* => *', [
        style({ opacity: 0 }),
        animate('840ms cubic-bezier(0.25, 0.1, 0.25, 1)', style({ opacity: 1 })) // Calmer easing
      ])
    ]),
    trigger('fadeSlideIn', [
      transition('* => *', [
        style({ opacity: 0, transform: 'translateY(10px)' }), // Reduced from 15px (30% reduction)
        animate('980ms cubic-bezier(0.25, 0.1, 0.25, 1)', style({ // Slower, calmer
          opacity: 1,
          transform: 'translateY(0)'
        }))
      ])
    ])
  ]
})
export class HomeHeroCarousel implements OnInit, OnDestroy {
  heroSlides: HeroSlide[] = [];
  categories: DestinationCategory[] = [];
  currentHeroIndex = 0;
  loading = true;
  private autoScrollSubscription?: Subscription;
  isPaused = false; // Made public for template access
  private touchStartX = 0;
  private touchEndX = 0;

  constructor(private carouselService: HomeCarouselService) {}

  ngOnInit(): void {
    this.loadData();
  }

  ngOnDestroy(): void {
    if (this.autoScrollSubscription) {
      this.autoScrollSubscription.unsubscribe();
    }
  }

  loadData(): void {
    this.carouselService.getHeroSlides().subscribe({
      next: (slides) => {
        this.heroSlides = slides;
        this.loading = false;
        this.startAutoScroll();
      }
    });

    this.carouselService.getCategories().subscribe({
      next: (categories) => {
        // Limit to 4 categories for 2x2 grid
        this.categories = categories.slice(0, 4);
      }
    });
  }

  startAutoScroll(): void {
    if (this.heroSlides.length <= 1) return;
    
    // Auto-rotate every 4.5 seconds (calm, premium pace)
    this.autoScrollSubscription = interval(4500).subscribe(() => {
      if (!this.isPaused) {
        this.nextHeroSlide();
      }
    });
  }

  pauseAutoScroll(): void {
    this.isPaused = true;
  }

  resumeAutoScroll(): void {
    this.isPaused = false;
  }

  @HostListener('touchstart', ['$event'])
  onTouchStart(event: TouchEvent): void {
    this.touchStartX = event.changedTouches[0].screenX;
  }

  @HostListener('touchend', ['$event'])
  onTouchEnd(event: TouchEvent): void {
    this.touchEndX = event.changedTouches[0].screenX;
    this.handleSwipe();
  }

  private handleSwipe(): void {
    const swipeThreshold = 50;
    const diff = this.touchStartX - this.touchEndX;
    
    if (Math.abs(diff) > swipeThreshold) {
      if (diff > 0) {
        this.nextHeroSlide();
      } else {
        this.prevHeroSlide();
      }
    }
  }

  get currentHeroSlide(): HeroSlide | null {
    return this.heroSlides[this.currentHeroIndex] || null;
  }

  nextHeroSlide(): void {
    if (this.currentHeroIndex < this.heroSlides.length - 1) {
      this.currentHeroIndex++;
    } else {
      this.currentHeroIndex = 0;
    }
    // Pause longer after user interaction for calm UX
    this.pauseAutoScroll();
    setTimeout(() => this.resumeAutoScroll(), 8000);
  }

  prevHeroSlide(): void {
    if (this.currentHeroIndex > 0) {
      this.currentHeroIndex--;
    } else {
      this.currentHeroIndex = this.heroSlides.length - 1;
    }
    // Pause longer after user interaction for calm UX
    this.pauseAutoScroll();
    setTimeout(() => this.resumeAutoScroll(), 8000);
  }

  goToHeroSlide(index: number): void {
    this.currentHeroIndex = index;
    // Pause after user interaction
    this.pauseAutoScroll();
    setTimeout(() => this.resumeAutoScroll(), 8000);
  }

  @HostListener('keydown', ['$event'])
  handleKeydown(event: KeyboardEvent): void {
    // Keyboard navigation support for accessibility
    if (event.key === 'ArrowLeft') {
      event.preventDefault();
      this.prevHeroSlide();
    } else if (event.key === 'ArrowRight') {
      event.preventDefault();
      this.nextHeroSlide();
    } else if (event.key === 'Home') {
      event.preventDefault();
      this.currentHeroIndex = 0;
      this.goToHeroSlide(0);
    } else if (event.key === 'End') {
      event.preventDefault();
      this.currentHeroIndex = this.heroSlides.length - 1;
      this.goToHeroSlide(this.heroSlides.length - 1);
    }
  }

  formatPrice(price: number): string {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0
    }).format(price);
  }

  formatNumber(num: number): string {
    if (num >= 100000) {
      return (num / 100000).toFixed(1) + 'L+';
    } else if (num >= 1000) {
      return (num / 1000).toFixed(1) + 'K+';
    }
    return num.toString();
  }
}

