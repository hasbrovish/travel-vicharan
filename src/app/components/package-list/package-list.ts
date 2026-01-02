import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { PackagesDataService } from '../../services/packages-data.service';
import { TourPackage, PackageType, PackageCategory } from '../../models';
import { PackageCard } from '../package-card/package-card';
import { OffersFilter, OffersFilterCriteria } from '../offers-filter/offers-filter';
import { Breadcrumb } from '../breadcrumb/breadcrumb';
import { packageBelongsToDestination } from '../../utils/destination-mapping.util';

@Component({
  selector: 'app-package-list',
  standalone: true,
  imports: [CommonModule, PackageCard, RouterLink, OffersFilter, Breadcrumb],
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
  selectedDuration: 'short' | 'medium' | 'long' | null = null;
  minPrice = 0;
  maxPrice = 300000;

  categories: PackageCategory[] = ['FAMILY', 'HONEYMOON', 'GROUP', 'SENIORS', 'WEEKEND'];
  availableDestinations: string[] = [];

  constructor(
    private packagesDataService: PackagesDataService,
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
    // Use PackagesDataService for comprehensive mock data
    this.packagesDataService.getAllPackages().subscribe({
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
    this.packagesDataService.getAllPackages().subscribe({
      next: (packages) => {
        this.allPackages = packages;
        // Filter packages by destination using destination mapping
        this.filteredPackages = packages.filter(pkg =>
          packageBelongsToDestination(pkg.destinations, destination)
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
    this.packagesDataService.getAllPackages().subscribe({
      next: (packages) => {
        this.allPackages = packages;
        this.filteredPackages = packages.filter(pkg => pkg.type === type && pkg.isActive);
        this.extractDestinations(packages);
        this.loading = false;
      },
      error: () => {
        this.loading = false;
      }
    });
  }

  searchPackages(query: string): void {
    this.loading = true;
    this.packagesDataService.getAllPackages().subscribe({
      next: (packages) => {
        this.allPackages = packages;
        const term = query.toLowerCase();
        this.filteredPackages = packages.filter(pkg =>
          pkg.isActive && (
            pkg.name.toLowerCase().includes(term) ||
            pkg.destinations.some(dest => dest.toLowerCase().includes(term)) ||
            pkg.description.toLowerCase().includes(term)
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

  applyFilters(): void {
    // Apply basic filters manually since we're using PackagesDataService
    let filtered = [...this.allPackages];
    
    if (this.selectedType) {
      filtered = filtered.filter(pkg => pkg.type === this.selectedType);
    }
    
    if (this.selectedCategories.length > 0) {
      filtered = filtered.filter(pkg => this.selectedCategories.includes(pkg.category));
    }
    
    if (this.minPrice > 0) {
      filtered = filtered.filter(pkg => pkg.basePrice >= this.minPrice);
    }
    
    if (this.maxPrice < 300000) {
      filtered = filtered.filter(pkg => pkg.basePrice <= this.maxPrice);
    }
    
    this.filteredPackages = filtered;
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
    // Trigger filter change to reset filters in OffersFilter component
    this.onFilterChange({});
  }

  setViewMode(mode: 'grid' | 'list'): void {
    this.viewMode = mode;
  }

  setBudget(min: number, max: number): void {
    this.minPrice = min;
    this.maxPrice = max;
    this.applyFilters();
  }

  setDuration(duration: 'short' | 'medium' | 'long' | null): void {
    this.selectedDuration = duration;
    this.applyFilters();
  }

  onFilterChange(criteria: OffersFilterCriteria): void {
    console.log('Filter criteria changed:', criteria);

    // If destination is selected from query params, add it to criteria
    if (this.selectedDestination && !criteria.city && !criteria.country) {
      criteria.city = this.selectedDestination;
    }

    // Apply filters using PackagesDataService
    this.packagesDataService.filterPackages(criteria).subscribe(filtered => {
      this.filteredPackages = filtered;
      console.log(`Filtered ${filtered.length} packages from ${this.allPackages.length} total`);
    });
  }
}
