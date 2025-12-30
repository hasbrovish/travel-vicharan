import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { PackageService } from '../../services/package.service';
import { TourPackage, Departure, DeparturePricing } from '../../models';

@Component({
  selector: 'app-package-detail',
  standalone: true,
  imports: [CommonModule, FormsModule],
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

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private packageService: PackageService
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      const id = params['id'];
      if (id) {
        this.loadPackage(id);
      }
    });
  }

  loadPackage(id: string): void {
    this.loading = true;
    this.packageService.getPackageById(id).subscribe({
      next: (pkg) => {
        if (pkg) {
          this.package = pkg;
          // Handle both DATE_BASED and FIXED pricing
          if (pkg.pricingType === 'DATE_BASED' && pkg.datePricing && pkg.datePricing.length > 0) {
            this.selectedDeparture = pkg.datePricing[0];
          } else if (pkg.departures && pkg.departures.length > 0) {
            this.selectedDeparture = pkg.departures[0];
          }
        }
        this.loading = false;
      },
      error: () => {
        this.loading = false;
      }
    });
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
      return this.package.galleryImages;
    }
    return [this.package.imageUrl];
  }

  proceedToBooking(): void {
    if (this.package && this.selectedDeparture) {
      this.router.navigate(['/booking', this.package.id], {
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
}
