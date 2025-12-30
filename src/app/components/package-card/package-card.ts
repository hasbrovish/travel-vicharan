import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { TourPackage } from '../../models';

@Component({
  selector: 'app-package-card',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './package-card.html',
  styleUrl: './package-card.css'
})
export class PackageCard {
  @Input() package!: TourPackage;

  get firstDeparture() {
    // For DATE_BASED pricing, use datePricing
    if (this.package.pricingType === 'DATE_BASED' && this.package.datePricing && this.package.datePricing.length > 0) {
      return this.package.datePricing[0];
    }
    // For FIXED pricing, use departures (legacy)
    if (this.package.departures && this.package.departures.length > 0) {
      return this.package.departures[0];
    }
    return null;
  }

  get startingPrice(): number {
    if (this.package.pricingType === 'DATE_BASED' && this.package.datePricing && this.package.datePricing.length > 0) {
      // Find lowest price from datePricing
      return Math.min(...this.package.datePricing.map(d => d.price));
    }
    return this.package.basePrice;
  }

  getStatusClass(status: string): string {
    switch(status) {
      case 'AVAILABLE': return 'success';
      case 'FILLING_FAST': return 'warning';
      case 'SOLD_OUT': return 'danger';
      default: return 'secondary';
    }
  }

  getStatusText(status: string): string {
    return status.replace('_', ' ');
  }

  getStarArray(rating: number): number[] {
    return Array(Math.floor(rating)).fill(0);
  }
}
