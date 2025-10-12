import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { PackageService } from '../../services/package.service';
import { TourPackage, PackageType } from '../../models';
import { PackageCard } from '../package-card/package-card';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, RouterLink, PackageCard],
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
    private packageService: PackageService
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
    this.packageService.getPackagesByType(this.selectedType).subscribe({
      next: (packages) => {
        if (this.selectedType === 'DOMESTIC') {
          this.domesticPackages = packages;
        } else {
          this.internationalPackages = packages;
        }
      }
    });
  }

  switchType(type: PackageType): void {
    this.selectedType = type;
    this.loadPackagesByType();
  }

  get displayedPackages(): TourPackage[] {
    return this.selectedType === 'DOMESTIC' ? this.domesticPackages : this.internationalPackages;
  }
}
