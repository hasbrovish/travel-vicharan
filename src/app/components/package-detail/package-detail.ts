import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { PackagesDataService } from '../../services/packages-data.service';
import { CartService } from '../../services/cart.service';
import { WishlistService } from '../../services/wishlist.service';
import { TourPackage, Departure, DeparturePricing } from '../../models';
import { Breadcrumb } from '../breadcrumb/breadcrumb';

@Component({
  selector: 'app-package-detail',
  standalone: true,
  imports: [CommonModule, FormsModule, Breadcrumb],
  templateUrl: './package-detail.html',
  styleUrl: './package-detail.css'
})
export class PackageDetail implements OnInit {
  package: TourPackage | null = null;
  selectedDeparture: Departure | DeparturePricing | null = null;
  numberOfPassengers = 1;
  activeTab = 'overview';
  loading = false;
  selectedImageIndex = 0;
  selectedRoomOption: string | null = null;
  showFAQ = false;
  expandedDays: Set<number> = new Set();
  isInWishlist = false;
  showAddToCartSuccess = false;
  failedImages: Set<string> = new Set(); // Track failed image loads
  previousPackage: TourPackage | null = null;
  nextPackage: TourPackage | null = null;

  constructor(
    public route: ActivatedRoute,
    public router: Router,
    private packagesDataService: PackagesDataService,
    private cartService: CartService,
    private wishlistService: WishlistService
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      const slug = params['slug'];
      if (slug) {
        this.loadPackage(slug);
      }
    });
    // Expand first day by default
    this.expandedDays.add(1);
    
    // Setup booking card sticky behavior
    this.setupBookingCardSticky();
  }

  loadPackage(slug: string): void {
    this.loading = true;
    this.packagesDataService.getPackageBySlug(slug).subscribe({
      next: (pkg) => {
        if (pkg) {
          this.package = pkg;
          this.isInWishlist = this.wishlistService.isInWishlist(pkg.id);
          // Handle both DATE_BASED and FIXED pricing
          if (pkg.pricingType === 'DATE_BASED' && pkg.datePricing && pkg.datePricing.length > 0) {
            this.selectedDeparture = pkg.datePricing[0];
          } else if (pkg.departures && pkg.departures.length > 0) {
            this.selectedDeparture = pkg.departures[0];
          }
          // Auto-select first room option if only one exists
          if (pkg.roomOptions && pkg.roomOptions.length === 1) {
            this.selectedRoomOption = pkg.roomOptions[0].id;
          }
          // Load previous and next packages
          this.loadPreviousNextPackages(pkg);
        } else {
          console.error('Package not found with slug:', slug);
        }
        this.loading = false;
      },
      error: (error) => {
        console.error('Error loading package:', error);
        this.loading = false;
      }
    });
  }

  loadPreviousNextPackages(currentPackage: TourPackage): void {
    // Get all packages synchronously from service
    const allPackages = this.packagesDataService.getAllPackagesSync();
    const currentIndex = allPackages.findIndex(p => p.id === currentPackage.id);
    
    if (currentIndex > 0) {
      this.previousPackage = allPackages[currentIndex - 1];
    } else {
      this.previousPackage = null;
    }
    
    if (currentIndex < allPackages.length - 1 && currentIndex >= 0) {
      this.nextPackage = allPackages[currentIndex + 1];
    } else {
      this.nextPackage = null;
    }
  }

  navigateToPackage(pkg: TourPackage | null): void {
    if (pkg) {
      this.router.navigate(['/packages', pkg.slug]);
    }
  }

  setActiveTab(tab: string): void {
    this.activeTab = tab;
  }

  get totalAmount(): number {
    if (!this.package || !this.selectedDeparture) return 0;
    // Use selected departure price or base price
    const pricePerPerson = ('price' in this.selectedDeparture)
      ? this.selectedDeparture.price
      : this.package.basePrice;
    return pricePerPerson * this.numberOfPassengers;
  }

  get availableDepartures(): (Departure | DeparturePricing)[] {
    if (!this.package) return [];
    if (this.package.pricingType === 'DATE_BASED' && this.package.datePricing) {
      return this.package.datePricing;
    }
    return this.package.departures || [];
  }

  get galleryImages(): string[] {
    if (!this.package) return [];
    // Use gallery images if available, otherwise use main image
    if (this.package.galleryImages && this.package.galleryImages.length > 0) {
      // Filter out empty, null, undefined, or invalid image URLs
      const validImages = this.package.galleryImages.filter(img => 
        img && 
        img.trim() !== '' && 
        img !== 'null' && 
        img !== 'undefined' &&
        img.length > 0
      );
      // If we have valid images, return them; otherwise fall back to main image
      return validImages.length > 0 ? validImages : (this.package.imageUrl ? [this.package.imageUrl] : []);
    }
    return this.package.imageUrl ? [this.package.imageUrl] : [];
  }

  proceedToBooking(): void {
    if (this.package && this.selectedDeparture) {
      this.router.navigate(['/booking', this.package.slug || this.package.id], {
        queryParams: {
          departure: this.selectedDeparture.date,
          passengers: this.numberOfPassengers
        }
      });
    }
  }

  getStarArray(rating: number): number[] {
    return Array(Math.floor(rating)).fill(0);
  }

  getDayIcon(dayNumber: number): string {
    const icons = [
      'bi-airplane-fill',
      'bi-binoculars-fill',
      'bi-camera-fill',
      'bi-tree-fill',
      'bi-water',
      'bi-mountain',
      'bi-building',
      'bi-compass-fill'
    ];
    return icons[(dayNumber - 1) % icons.length];
  }

  getRoomOption(id: string) {
    if (!this.package) return null;
    return this.package.roomOptions.find(room => room.id === id);
  }

  getRoomPrice(): number {
    if (!this.selectedRoomOption || !this.package) return 0;
    const room = this.getRoomOption(this.selectedRoomOption);
    if (!room) return 0;
    const basePrice = ('price' in this.selectedDeparture! && this.selectedDeparture)
      ? this.selectedDeparture.price
      : this.package.basePrice;
    return basePrice + room.priceModifier;
  }

  getTotalWithRoom(): number {
    const roomPrice = this.getRoomPrice();
    return roomPrice * this.numberOfPassengers;
  }

  toggleFAQ(): void {
    this.showFAQ = !this.showFAQ;
  }

  toggleDayExpansion(dayNumber: number): void {
    if (this.expandedDays.has(dayNumber)) {
      // Collapse if already expanded
      this.expandedDays.delete(dayNumber);
    } else {
      // Expand only this day - collapse all others (accordion behavior)
      this.expandedDays.clear();
      this.expandedDays.add(dayNumber);
    }
  }

  isDayExpanded(dayNumber: number): boolean {
    return this.expandedDays.has(dayNumber);
  }

  getActivityIcon(activity: string): string {
    const activityLower = activity.toLowerCase();
    
    // Airport & Transfer related
    if (activityLower.includes('airport') || activityLower.includes('transfer') || activityLower.includes('pickup') || activityLower.includes('drop')) {
      return 'bi-airplane-fill';
    }
    
    // Hotel related
    if (activityLower.includes('hotel') || activityLower.includes('check-in') || activityLower.includes('check-out') || activityLower.includes('accommodation')) {
      return 'bi-building';
    }
    
    // Sightseeing & Tours
    if (activityLower.includes('sightseeing') || activityLower.includes('tour') || activityLower.includes('visit') || activityLower.includes('explore')) {
      return 'bi-binoculars-fill';
    }
    
    // Transportation
    if (activityLower.includes('drive') || activityLower.includes('travel') || activityLower.includes('journey') || activityLower.includes('route')) {
      return 'bi-car-front-fill';
    }
    
    // Water activities
    if (activityLower.includes('boat') || activityLower.includes('cruise') || activityLower.includes('shikara') || activityLower.includes('water') || activityLower.includes('lake') || activityLower.includes('backwater')) {
      return 'bi-water';
    }
    
    // Nature & Wildlife
    if (activityLower.includes('wildlife') || activityLower.includes('safari') || activityLower.includes('park') || activityLower.includes('nature') || activityLower.includes('forest')) {
      return 'bi-tree-fill';
    }
    
    // Mountains & Hills
    if (activityLower.includes('mountain') || activityLower.includes('hill') || activityLower.includes('valley') || activityLower.includes('peak')) {
      return 'bi-mountain';
    }
    
    // Photography & Views
    if (activityLower.includes('photo') || activityLower.includes('view') || activityLower.includes('scenic') || activityLower.includes('panoramic')) {
      return 'bi-camera-fill';
    }
    
    // Food & Meals
    if (activityLower.includes('meal') || activityLower.includes('breakfast') || activityLower.includes('lunch') || activityLower.includes('dinner') || activityLower.includes('food')) {
      return 'bi-egg-fried';
    }
    
    // Shopping
    if (activityLower.includes('shop') || activityLower.includes('market') || activityLower.includes('mall')) {
      return 'bi-bag-fill';
    }
    
    // Cultural & Shows
    if (activityLower.includes('show') || activityLower.includes('cultural') || activityLower.includes('dance') || activityLower.includes('performance')) {
      return 'bi-music-note-beamed';
    }
    
    // Temple & Religious
    if (activityLower.includes('temple') || activityLower.includes('shrine') || activityLower.includes('mosque') || activityLower.includes('church') || activityLower.includes('religious')) {
      return 'bi-building';
    }
    
    // Adventure & Sports
    if (activityLower.includes('adventure') || activityLower.includes('sport') || activityLower.includes('activity') || activityLower.includes('ride') || activityLower.includes('gondola')) {
      return 'bi-lightning-fill';
    }
    
    // Beach & Island
    if (activityLower.includes('beach') || activityLower.includes('island') || activityLower.includes('coast')) {
      return 'bi-water';
    }
    
    // Default icon
    return 'bi-geo-alt-fill';
  }

  getMealIcon(meal: string): string {
    const mealLower = meal.toLowerCase();
    if (mealLower.includes('breakfast')) return 'bi-sunrise';
    if (mealLower.includes('lunch')) return 'bi-sun';
    if (mealLower.includes('dinner')) return 'bi-moon-stars';
    return 'bi-egg-fried';
  }

  addToCart(): void {
    if (!this.package || !this.selectedDeparture) return;
    
    const departureDate = 'date' in this.selectedDeparture 
      ? this.selectedDeparture.date 
      : new Date().toISOString().split('T')[0];
    
    this.cartService.addToCart(
      this.package,
      departureDate,
      this.numberOfPassengers
    );
    
    this.showAddToCartSuccess = true;
    setTimeout(() => {
      this.showAddToCartSuccess = false;
    }, 3000);
  }

  toggleWishlist(): void {
    if (!this.package) return;
    
    if (this.isInWishlist) {
      this.wishlistService.removeFromWishlist(this.package.id);
    } else {
      this.wishlistService.addToWishlist(this.package);
    }
    this.isInWishlist = !this.isInWishlist;
  }

  get totalActivities(): number {
    if (!this.package || !this.package.itinerary) return 0;
    return this.package.itinerary.reduce((sum, day) => sum + (day.activities?.length || 0), 0);
  }

  formatDescription(description: string): string {
    if (!description) return '';
    
    // Split by periods and create paragraphs for better readability
    const sentences = description.split(/[.!?]+/).filter(s => s.trim().length > 0);
    
    // If only one sentence or very short, return as single paragraph
    if (sentences.length <= 1 || description.length < 100) {
      return `<p class="narrative-paragraph">${description}</p>`;
    }
    
    // Group sentences into paragraphs (2-3 sentences per paragraph for better flow)
    const paragraphs: string[] = [];
    for (let i = 0; i < sentences.length; i += 2) {
      const paragraphSentences = sentences.slice(i, i + 2);
      const paragraph = paragraphSentences
        .map(s => s.trim())
        .filter(s => s.length > 0)
        .join('. ') + '.';
      if (paragraph.length > 1 && paragraph !== '.') {
        paragraphs.push(paragraph);
      }
    }
    
    // If no paragraphs created, return as single paragraph
    if (paragraphs.length === 0) {
      return `<p class="narrative-paragraph">${description}</p>`;
    }
    
    // Return formatted paragraphs
    return paragraphs.map(p => `<p class="narrative-paragraph">${p}</p>`).join('');
  }

  openPhotoGallery(photos: string[], currentPhoto: string): void {
    // TODO: Implement photo gallery modal/lightbox
    console.log('Open gallery:', photos, currentPhoto);
  }

  onImageError(event: Event, imageUrl: string): void {
    // Mark image as failed
    this.failedImages.add(imageUrl);
    // Set a placeholder image
    const img = event.target as HTMLImageElement;
    img.src = 'https://via.placeholder.com/800x500/0d9488/ffffff?text=Image+Not+Available';
    img.alt = 'Image not available';
  }

  isValidImage(imageUrl: string | null | undefined): boolean {
    if (!imageUrl) return false;
    const url = imageUrl.trim();
    return url !== '' && 
           url !== 'null' && 
           url !== 'undefined' && 
           !this.failedImages.has(url);
  }

  // Setup booking card to become sticky only after hero section scrolls out
  setupBookingCardSticky(): void {
    setTimeout(() => {
      const bookingCard = document.querySelector('.booking-card');
      const heroSection = document.querySelector('.package-hero');
      
      if (!bookingCard || !heroSection) return;

      const checkSticky = () => {
        const heroRect = heroSection.getBoundingClientRect();
        const headerHeight = 72; // Header height
        
        // Become sticky only when hero has scrolled past the top
        if (heroRect.bottom <= headerHeight) {
          bookingCard.classList.add('sticky-active');
        } else {
          bookingCard.classList.remove('sticky-active');
        }
      };

      // Check on scroll
      window.addEventListener('scroll', checkSticky, { passive: true });
      // Initial check
      checkSticky();
      // Check on resize
      window.addEventListener('resize', checkSticky, { passive: true });
    }, 100);
  }
}
