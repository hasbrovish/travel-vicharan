import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
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
    private route: ActivatedRoute,
    private router: Router
  ) {}

  currentSearchQuery: string | null = null;

  highlightText(text: string, query: string | null): string {
    if (!query || !text) return text;
    
    const regex = new RegExp(`(${query.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')})`, 'gi');
    return text.replace(regex, '<mark class="search-highlight">$1</mark>');
  }

  clearSearch(): void {
    this.currentSearchQuery = null;
    this.router.navigate(['/packages'], {
      queryParams: {}
    });
    this.loadAllPackages();
  }

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      const searchQuery = params['search'];
      const type = params['type'] as PackageType;
      const destination = params['destination'];
      const category = params['category'] as PackageCategory;
      const attraction = params['attraction'];
      const priceRange = params['priceRange'];

      // Store current search query
      this.currentSearchQuery = searchQuery || null;

      // Build filter criteria from query params
      const filterCriteria: OffersFilterCriteria = {};
      if (priceRange) {
        filterCriteria.priceRange = priceRange;
      }
      if (attraction) {
        filterCriteria.attraction = attraction;
      }
      if (category) {
        filterCriteria.category = category;
      }
      if (destination) {
        filterCriteria.city = destination;
      }
      if (type) {
        filterCriteria.tag = type === 'DOMESTIC' ? 'India' : 'World';
      }

      if (searchQuery) {
        this.searchPackages(searchQuery);
        // Apply filters on top of search results
        if (Object.keys(filterCriteria).length > 0) {
          setTimeout(() => {
            this.onFilterChange(filterCriteria);
          }, 200);
        }
      } else if (attraction) {
        // Handle attraction filter
        this.loadPackagesByAttraction(attraction);
        // Apply price range if present
        if (priceRange) {
          setTimeout(() => {
            this.onFilterChange(filterCriteria);
          }, 200);
        }
      } else if (category) {
        // Handle category filter from navigation (e.g., Honeymoon, Family, Weekend)
        this.selectedCategories = [category];
        this.loadPackagesByCategory(category);
        // Apply price range if present
        if (priceRange) {
          setTimeout(() => {
            this.onFilterChange(filterCriteria);
          }, 200);
        }
      } else if (destination) {
        this.selectedDestination = destination;
        this.loadPackagesByDestination(destination);
        // Apply price range if present
        if (priceRange) {
          setTimeout(() => {
            this.onFilterChange(filterCriteria);
          }, 200);
        }
      } else if (type) {
        this.selectedType = type;
        this.loadPackagesByType(type);
        // Apply price range if present
        if (priceRange) {
          setTimeout(() => {
            this.onFilterChange(filterCriteria);
          }, 200);
        }
      } else if (priceRange) {
        // Only price range filter
        this.loadAllPackages();
        setTimeout(() => {
          this.onFilterChange(filterCriteria);
        }, 200);
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

  loadPackagesByCategory(category: PackageCategory): void {
    this.loading = true;
    this.packagesDataService.getAllPackages().subscribe({
      next: (packages) => {
        this.allPackages = packages;
        // Filter by exact category match only - no other categories should appear
        this.filteredPackages = packages.filter(pkg => 
          pkg.isActive && pkg.category === category
        );
        this.extractDestinations(packages);
        this.loading = false;
      },
      error: () => {
        this.loading = false;
      }
    });
  }

  loadPackagesByAttraction(attraction: string): void {
    this.loading = true;
    this.packagesDataService.getAllPackages().subscribe({
      next: (packages) => {
        this.allPackages = packages;
        // Filter packages that have the attraction in highlights or description
        const attractionLower = attraction.toLowerCase().replace(/-/g, ' ');
        this.filteredPackages = packages.filter(pkg => {
          if (!pkg.isActive) return false;
          
          // Check highlights
          const hasInHighlights = pkg.highlights.some(highlight => 
            highlight.toLowerCase().includes(attractionLower)
          );
          
          // Check description
          const hasInDescription = pkg.description.toLowerCase().includes(attractionLower);
          
          // Check itinerary activities
          const hasInActivities = pkg.itinerary.some(day => 
            day.activities.some(activity => 
              activity.toLowerCase().includes(attractionLower)
            )
          );
          
          return hasInHighlights || hasInDescription || hasInActivities;
        });
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
        const term = query.toLowerCase().trim();
        
        // First check if it's a destination name using destination mapping
        const isDestinationSearch = packageBelongsToDestination(
          packages.flatMap(pkg => pkg.destinations),
          query
        );
        
        if (isDestinationSearch) {
          // Use destination mapping for better results
          this.filteredPackages = packages.filter(pkg =>
            pkg.isActive && packageBelongsToDestination(pkg.destinations, query)
          );
        } else {
          // Regular text search
          this.filteredPackages = packages.filter(pkg =>
            pkg.isActive && (
              pkg.name.toLowerCase().includes(term) ||
              pkg.destinations.some(dest => dest.toLowerCase().includes(term)) ||
              pkg.description.toLowerCase().includes(term) ||
              pkg.highlights.some(highlight => highlight.toLowerCase().includes(term))
            )
          );
        }
        
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
    
    // Always filter by active status first
    filtered = filtered.filter(pkg => pkg.isActive);
    
    if (this.selectedType) {
      filtered = filtered.filter(pkg => pkg.type === this.selectedType);
    }
    
    // Category filter - strict match only (exact category must match)
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

    // Always preserve category filter from selectedCategories if set
    if (this.selectedCategories.length > 0 && !criteria.category) {
      criteria.category = this.selectedCategories[0];
    }

    // If destination is selected from query params, add it to criteria
    if (this.selectedDestination && !criteria.city && !criteria.country) {
      criteria.city = this.selectedDestination;
    }

    // Check if there's a current search query
    if (this.currentSearchQuery) {
      // If search query exists, apply search first, then filters
      this.packagesDataService.getAllPackages().subscribe(packages => {
        this.allPackages = packages;
        const term = this.currentSearchQuery!.toLowerCase().trim();
        
        // Apply search filter
        let filtered = packages.filter(pkg => {
          if (!pkg.isActive) return false;
          
          // Check if it's a destination search
          const isDestinationSearch = packageBelongsToDestination(
            packages.flatMap(p => p.destinations),
            this.currentSearchQuery!
          );
          
          if (isDestinationSearch) {
            return packageBelongsToDestination(pkg.destinations, this.currentSearchQuery!);
          } else {
            return (
              pkg.name.toLowerCase().includes(term) ||
              pkg.destinations.some(dest => dest.toLowerCase().includes(term)) ||
              pkg.description.toLowerCase().includes(term) ||
              pkg.highlights.some(highlight => highlight.toLowerCase().includes(term))
            );
          }
        });
        
        // Always apply category filter if selectedCategories is set (even if not in criteria)
        if (this.selectedCategories.length > 0) {
          filtered = filtered.filter(pkg => this.selectedCategories.includes(pkg.category));
        }
        
        // Then apply additional filters from criteria
        if (Object.keys(criteria).length > 0) {
          // Apply filters manually on search results
          // Attraction filter
          if (criteria.attraction) {
            const attractionLower = criteria.attraction.toLowerCase().replace(/-/g, ' ');
            filtered = filtered.filter(pkg => {
              const hasInHighlights = pkg.highlights.some(h => h.toLowerCase().includes(attractionLower));
              const hasInDescription = pkg.description.toLowerCase().includes(attractionLower);
              const hasInActivities = pkg.itinerary.some(day => 
                day.activities.some(activity => activity.toLowerCase().includes(attractionLower))
              );
              return hasInHighlights || hasInDescription || hasInActivities;
            });
          }
          
          // Category filter (exact match only - strict filtering)
          if (criteria.category) {
            filtered = filtered.filter(pkg => pkg.category === criteria.category);
          }
          
          if (criteria.tag) {
            const type: PackageType = criteria.tag === 'India' ? 'DOMESTIC' : 'INTERNATIONAL';
            filtered = filtered.filter(pkg => pkg.type === type);
          }
          
          if (criteria.priceRange) {
            const [min, max] = this.parsePriceRange(criteria.priceRange);
            filtered = filtered.filter(pkg => {
              if (max) {
                return pkg.basePrice >= min && pkg.basePrice <= max;
              } else {
                return pkg.basePrice >= min;
              }
            });
          }
          
          if (criteria.departureCity) {
            filtered = filtered.filter(pkg =>
              pkg.departures.some(d => d.departureCity === criteria.departureCity)
            );
          }
          
          if (criteria.city && (!this.currentSearchQuery || !this.currentSearchQuery.toLowerCase().includes(criteria.city.toLowerCase()))) {
            filtered = filtered.filter(pkg =>
              packageBelongsToDestination(pkg.destinations, criteria.city!)
            );
          }
          
          if (criteria.country && (!this.currentSearchQuery || !this.currentSearchQuery.toLowerCase().includes(criteria.country.toLowerCase()))) {
            filtered = filtered.filter(pkg =>
              packageBelongsToDestination(pkg.destinations, criteria.country!)
            );
          }
          
          if (criteria.duration) {
            filtered = filtered.filter(pkg => {
              const totalDays = pkg.days;
              switch (criteria.duration) {
                case 'short':
                  return totalDays >= 1 && totalDays <= 3;
                case 'medium':
                  return totalDays >= 4 && totalDays <= 7;
                case 'long':
                  return totalDays >= 8;
                default:
                  return true;
              }
            });
          }
        }
        
        this.filteredPackages = filtered;
        console.log(`Filtered ${filtered.length} packages from ${this.allPackages.length} total`);
      });
    } else {
      // No search query, just apply filters
      // Always preserve category filter from selectedCategories if set
      if (this.selectedCategories.length > 0 && !criteria.category) {
        criteria.category = this.selectedCategories[0];
      }
      
      this.packagesDataService.filterPackages(criteria).subscribe(filtered => {
        // Apply additional strict category filter if selectedCategories is set
        // This ensures only the selected category is shown, even if filterPackages doesn't filter correctly
        if (this.selectedCategories.length > 0) {
          filtered = filtered.filter(pkg => this.selectedCategories.includes(pkg.category));
        }
        this.filteredPackages = filtered;
        console.log(`Filtered ${filtered.length} packages from ${this.allPackages.length} total`);
      });
    }
  }

  private parsePriceRange(range: string): [number, number | null] {
    // Handle formats like "300000+", "100000+", etc.
    if (range.includes('+')) {
      const min = parseInt(range.replace('+', ''), 10);
      return [min, null];
    }
    // Handle formats like "0-35000", "35000-50000", etc.
    if (range.includes('-')) {
      const [min, max] = range.split('-').map(Number);
      return [min, max];
    }
    // Fallback: treat as minimum price
    return [parseInt(range, 10), null];
  }
}
