import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { HomeCarouselService } from '../../services/home-carousel.service';
import { HeroSlide, DestinationCategory } from '../../models/home-carousel.model';
import { trigger, state, style, transition, animate } from '@angular/animations';

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
          transform: 'translateY(20px)'
        }),
        animate('600ms cubic-bezier(0.4, 0, 0.2, 1)', style({
          opacity: 1,
          transform: 'translateY(0)'
        }))
      ])
    ]),
    trigger('heroSlide', [
      transition('* => *', [
        animate('500ms cubic-bezier(0.4, 0, 0.2, 1)')
      ])
    ])
  ]
})
export class HomeHeroCarousel implements OnInit {
  heroSlides: HeroSlide[] = [];
  categories: DestinationCategory[] = [];
  currentHeroIndex = 0;
  loading = true;

  constructor(private carouselService: HomeCarouselService) {}

  ngOnInit(): void {
    this.loadData();
  }

  loadData(): void {
    this.carouselService.getHeroSlides().subscribe({
      next: (slides) => {
        this.heroSlides = slides;
        this.loading = false;
        // Auto-scroll removed - manual navigation only
      }
    });

    this.carouselService.getCategories().subscribe({
      next: (categories) => {
        // Limit to 4 categories for 2x2 grid
        this.categories = categories.slice(0, 4);
      }
    });
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
  }

  prevHeroSlide(): void {
    if (this.currentHeroIndex > 0) {
      this.currentHeroIndex--;
    } else {
      this.currentHeroIndex = this.heroSlides.length - 1;
    }
  }

  goToHeroSlide(index: number): void {
    this.currentHeroIndex = index;
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

