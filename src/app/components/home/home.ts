import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { PackageService } from '../../services/package.service';
import { TourPackage, PackageType } from '../../models';
import { PackageCard } from '../package-card/package-card';
import { FeaturedDestinations } from '../featured-destinations/featured-destinations';
import { Testimonials } from '../testimonials/testimonials';
import { NewsletterSignup } from '../newsletter-signup/newsletter-signup';
import { TrustBadges } from '../trust-badges/trust-badges';
import { PremiumOffers } from '../premium-offers/premium-offers';
import { HomeHeroCarousel } from '../home-hero-carousel/home-hero-carousel';
import { FloatingActionButtons } from '../floating-action-buttons/floating-action-buttons';
import { QuickCategoryDiscovery } from '../quick-category-discovery/quick-category-discovery';
import { TravelerTypeGuide } from '../traveler-type-guide/traveler-type-guide';
import { BrandStory } from '../brand-story/brand-story';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, RouterLink, PackageCard, FeaturedDestinations, Testimonials, NewsletterSignup, TrustBadges, PremiumOffers, HomeHeroCarousel, FloatingActionButtons, QuickCategoryDiscovery, TravelerTypeGuide, BrandStory],
  templateUrl: './home.html',
  styleUrl: './home.css'
})
export class Home implements OnInit {
  featuredPackages: TourPackage[] = [];
  domesticPackages: TourPackage[] = [];
  internationalPackages: TourPackage[] = [];
  selectedType: PackageType = 'DOMESTIC';
  loading = false;

  constructor(
    private packageService: PackageService,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.loadFeaturedPackages();
    this.loadPackagesByType();
  }

  loadFeaturedPackages(): void {
    this.loading = true;
    this.packageService.getFeaturedPackages(6).subscribe({
      next: (packages) => {
        this.featuredPackages = packages;
        this.loading = false;
      },
      error: () => {
        this.loading = false;
      }
    });
  }

  loadPackagesByType(): void {
    // Set loading state
    this.loading = true;
    
    // Store the type we're loading to prevent race conditions
    const loadingType = this.selectedType;
    
    this.packageService.getPackagesByType(loadingType).subscribe({
      next: (packages) => {
        // Only update if we're still on the same type (prevent race conditions)
        if (this.selectedType === loadingType) {
          // Create new array reference to trigger change detection
          if (loadingType === 'DOMESTIC') {
            this.domesticPackages = [...packages];
          } else if (loadingType === 'INTERNATIONAL') {
            this.internationalPackages = [...packages];
          }
          this.loading = false;
        }
      },
      error: () => {
        this.loading = false;
        // Clear packages on error
        if (loadingType === 'DOMESTIC') {
          this.domesticPackages = [];
        } else {
          this.internationalPackages = [];
        }
      }
    });
  }

  switchType(type: PackageType): void {
    // Prevent unnecessary reloads if already on this tab
    if (this.selectedType === type) {
      return;
    }
    
    // Update selected type immediately
    this.selectedType = type;
    
    // Force change detection to update UI
    this.cdr.detectChanges();
    
    // Load packages for the selected type
    this.loadPackagesByType();
    
    // Reset animation state for new packages after DOM updates
    setTimeout(() => {
      const items = document.querySelectorAll('.explore-carousel-item');
      items.forEach((item, index) => {
        (item as HTMLElement).style.animation = 'none';
        // Force reflow to reset animation
        void (item as HTMLElement).offsetHeight;
        setTimeout(() => {
          (item as HTMLElement).style.animation = `packageFadeIn 0.6s ease-out ${index * 0.1}s forwards`;
        }, 10);
      });
    }, 150); // Increased delay to ensure packages are loaded
  }

  get displayedPackages(): TourPackage[] {
    const packages = this.selectedType === 'DOMESTIC' ? this.domesticPackages : this.internationalPackages;
    return packages.slice(0, 6); // Show max 6 cards
  }

  scrollCarousel(direction: 'left' | 'right'): void {
    const container = document.querySelector('.explore-carousel-container');
    if (container) {
      const scrollAmount = 300;
      const currentScroll = container.scrollLeft;
      const newPosition = direction === 'left' 
        ? currentScroll - scrollAmount 
        : currentScroll + scrollAmount;
      
      container.scrollTo({ left: newPosition, behavior: 'smooth' });
    }
  }

  scrollStoryRail(direction: 'left' | 'right'): void {
    const track = document.querySelector('.story-rail-track');
    if (track) {
      const scrollAmount = 400;
      const currentScroll = track.scrollLeft;
      const newPosition = direction === 'left' 
        ? currentScroll - scrollAmount 
        : currentScroll + scrollAmount;
      
      track.scrollTo({ left: newPosition, behavior: 'smooth' });
    }
  }
}
