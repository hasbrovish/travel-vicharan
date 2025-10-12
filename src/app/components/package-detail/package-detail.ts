import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { PackageService } from '../../services/package.service';
import { TourPackage, Departure } from '../../models';

@Component({
  selector: 'app-package-detail',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './package-detail.html',
  styleUrl: './package-detail.css'
})
export class PackageDetail implements OnInit {
  package: TourPackage | null = null;
  selectedDeparture: Departure | null = null;
  numberOfPassengers = 1;
  activeTab = 'overview';
  loading = false;

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
          this.selectedDeparture = pkg.departures[0];
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
    if (!this.package) return 0;
    return this.package.basePrice * this.numberOfPassengers;
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
}
