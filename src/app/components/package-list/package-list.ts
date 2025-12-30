import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { PackageService } from '../../services/package.service';
import { TourPackage, PackageType, PackageCategory } from '../../models';
import { PackageCard } from '../package-card/package-card';

@Component({
  selector: 'app-package-list',
  standalone: true,
  imports: [CommonModule, PackageCard, RouterLink],
  templateUrl: './package-list.html',
  styleUrl: './package-list.css'
})
export class PackageList implements OnInit {
  allPackages: TourPackage[] = [];
  filteredPackages: TourPackage[] = [];
  loading = false;
  viewMode: 'grid' | 'list' = 'grid'; // View toggle

  // Filters
  selectedType: PackageType | null = null;
  selectedCategories: PackageCategory[] = [];
  selectedDestination: string | null = null;
  minPrice = 0;
  maxPrice = 300000;

  categories: PackageCategory[] = ['FAMILY', 'HONEYMOON', 'GROUP', 'SENIORS', 'WEEKEND'];
  availableDestinations: string[] = [];

  constructor(
    private packageService: PackageService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      const searchQuery = params['search'];
      const type = params['type'] as PackageType;
      const destination = params['destination'];

      if (searchQuery) {
        this.searchPackages(searchQuery);
      } else if (destination) {
        this.selectedDestination = destination;
        this.loadPackagesByDestination(destination);
      } else if (type) {
        this.selectedType = type;
        this.loadPackagesByType(type);
      } else {
        this.loadAllPackages();
      }
    });
  }

  loadAllPackages(): void {
    this.loading = true;
    this.packageService.getAllPackages().subscribe({
      next: (packages) => {
        this.allPackages = packages;
        this.filteredPackages = packages;
        this.extractDestinations(packages);
        this.loading = false;
      },
      error: () => {
        this.loading = false;
      }
    });
  }

  loadPackagesByDestination(destination: string): void {
    this.loading = true;
    this.packageService.getAllPackages().subscribe({
      next: (packages) => {
        this.allPackages = packages;
        // Filter packages by destination (case-insensitive)
        this.filteredPackages = packages.filter(pkg =>
          pkg.destinations.some(dest =>
            dest.toLowerCase().includes(destination.toLowerCase())
          )
        );
        this.extractDestinations(packages);
        this.loading = false;
      },
      error: () => {
        this.loading = false;
      }
    });
  }

  extractDestinations(packages: TourPackage[]): void {
    const destSet = new Set<string>();
    packages.forEach(pkg => {
      pkg.destinations.forEach(dest => destSet.add(dest));
    });
    this.availableDestinations = Array.from(destSet).sort();
  }

  loadPackagesByType(type: PackageType): void {
    this.loading = true;
    this.packageService.getPackagesByType(type).subscribe({
      next: (packages) => {
        this.allPackages = packages;
        this.filteredPackages = packages;
        this.loading = false;
      },
      error: () => {
        this.loading = false;
      }
    });
  }

  searchPackages(query: string): void {
    this.loading = true;
    this.packageService.searchPackages(query).subscribe({
      next: (packages) => {
        this.allPackages = packages;
        this.filteredPackages = packages;
        this.loading = false;
      },
      error: () => {
        this.loading = false;
      }
    });
  }

  applyFilters(): void {
    this.filteredPackages = this.packageService.filterPackages(this.allPackages, {
      type: this.selectedType || undefined,
      categories: this.selectedCategories.length > 0 ? this.selectedCategories : undefined,
      minPrice: this.minPrice,
      maxPrice: this.maxPrice
    });
  }

  toggleCategory(category: PackageCategory): void {
    const index = this.selectedCategories.indexOf(category);
    if (index > -1) {
      this.selectedCategories.splice(index, 1);
    } else {
      this.selectedCategories.push(category);
    }
    this.applyFilters();
  }

  setType(type: PackageType | null): void {
    this.selectedType = type;
    this.applyFilters();
  }

  clearFilters(): void {
    this.selectedType = null;
    this.selectedCategories = [];
    this.selectedDestination = null;
    this.minPrice = 0;
    this.maxPrice = 300000;
    this.filteredPackages = this.allPackages;
  }

  setViewMode(mode: 'grid' | 'list'): void {
    this.viewMode = mode;
  }
}
