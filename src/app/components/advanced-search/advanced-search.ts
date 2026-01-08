import { Component, OnInit, Output, EventEmitter, HostListener } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { PackagesDataService } from '../../services/packages-data.service';
import { TourPackage } from '../../models/tour-package.model';

interface SearchSuggestion {
  type: 'destination' | 'package' | 'popular' | 'category' | 'departure-city';
  label: string;
  value: string;
  count?: number;
  departures?: number;
  imageUrl?: string;
}

interface CategoryTag {
  label: string;
  value: string;
  count: number;
  queryParams?: any;
}

interface DestinationCard {
  name: string;
  imageUrl: string;
  tourCount: number;
  departureCount: number;
  queryParams?: any;
}

interface MonthFilter {
  month: string;
  monthNumber: number;
  tourCount: number;
}

@Component({
  selector: 'app-advanced-search',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './advanced-search.html',
  styleUrl: './advanced-search.css'
})
export class AdvancedSearch implements OnInit {
  searchQuery: string = '';
  showSuggestions: boolean = false;
  suggestions: SearchSuggestion[] = [];
  popularSearches: SearchSuggestion[] = [];
  recentSearches: SearchSuggestion[] = [];
  categoryTags: CategoryTag[] = [];
  hotDestinations: DestinationCard[] = [];
  monthFilters: MonthFilter[] = [];
  priceRanges: { label: string; value: string; min?: number; max?: number }[] = [];
  attractions: CategoryTag[] = [];
  selectedYear: number = new Date().getFullYear();
  allPackages: TourPackage[] = [];
  isFocused: boolean = false;
  private searchDebounceTimer: any = null;

  @Output() search = new EventEmitter<string>();

  constructor(
    private router: Router,
    private packagesDataService: PackagesDataService
  ) {}

  ngOnInit(): void {
    this.loadPopularSearches();
    this.loadPriceRanges();
    this.loadRecentSearches();
    this.loadAllPackages(); // This will trigger loading of category tags, hot destinations, etc.
  }

  loadAllPackages(): void {
    this.packagesDataService.getAllPackages().subscribe({
      next: (packages) => {
        this.allPackages = packages;
        // Load dependent data after packages are loaded
        this.loadCategoryTags();
        this.loadHotDestinations();
        this.loadMonthFilters();
        this.loadAttractions();
      },
      error: (error) => {
        console.error('Error loading packages:', error);
        // Initialize empty arrays to prevent errors
        this.allPackages = [];
        this.categoryTags = [];
        this.hotDestinations = [];
        this.monthFilters = [];
        this.attractions = [];
      }
    });
  }

  loadPopularSearches(): void {
    this.popularSearches = [
      { type: 'popular', label: 'Dubai', value: 'Dubai', count: 45 },
      { type: 'popular', label: 'Thailand', value: 'Thailand', count: 38 },
      { type: 'popular', label: 'Singapore', value: 'Singapore', count: 32 },
      { type: 'popular', label: 'Bali', value: 'Bali', count: 28 },
      { type: 'popular', label: 'Europe', value: 'Europe', count: 25 },
      { type: 'popular', label: 'Kerala', value: 'Kerala', count: 22 },
      { type: 'popular', label: 'Goa', value: 'Goa', count: 20 },
      { type: 'popular', label: 'Maldives', value: 'Maldives', count: 18 }
    ];
  }

  onInputChange(): void {
    // Clear previous debounce timer
    if (this.searchDebounceTimer) {
      clearTimeout(this.searchDebounceTimer);
    }

    // Debounce search suggestions for better performance
    this.searchDebounceTimer = setTimeout(() => {
      if (this.searchQuery.trim().length >= 2) {
        this.generateSuggestions();
        this.showSuggestions = true;
      } else if (this.searchQuery.trim().length === 0) {
        this.showSuggestions = true;
        this.suggestions = [];
      } else {
        this.showSuggestions = false;
      }
    }, 200); // 200ms debounce delay
  }

  generateSuggestions(): void {
    const query = this.searchQuery.toLowerCase().trim();
    const suggestions: SearchSuggestion[] = [];

    // Enhanced fuzzy search scoring
    const calculateRelevance = (text: string, searchTerm: string): number => {
      const lowerText = text.toLowerCase();
      const lowerSearch = searchTerm.toLowerCase();
      
      // Exact match gets highest score
      if (lowerText === lowerSearch) return 100;
      
      // Starts with search term gets high score
      if (lowerText.startsWith(lowerSearch)) return 80;
      
      // Contains search term gets medium score
      if (lowerText.includes(lowerSearch)) return 60;
      
      // Fuzzy match (characters in order) gets lower score
      let searchIndex = 0;
      for (let i = 0; i < lowerText.length && searchIndex < lowerSearch.length; i++) {
        if (lowerText[i] === lowerSearch[searchIndex]) {
          searchIndex++;
        }
      }
      if (searchIndex === lowerSearch.length) return 40;
      
      return 0;
    };

    // Search in packages with relevance scoring
    const packageMatches = this.allPackages
      .map(pkg => {
        const nameScore = calculateRelevance(pkg.name, query);
        const destScore = Math.max(...pkg.destinations.map(dest => calculateRelevance(dest, query)));
        const highlightScore = Math.max(...pkg.highlights.map(h => calculateRelevance(h, query)));
        const maxScore = Math.max(nameScore, destScore, highlightScore * 0.5);
        
        return {
          pkg,
          score: maxScore
        };
      })
      .filter(item => item.score > 0)
      .sort((a, b) => b.score - a.score)
      .slice(0, 5);

    packageMatches.forEach(item => {
      suggestions.push({
        type: 'package',
        label: item.pkg.name,
        value: item.pkg.name,
        count: undefined
      });
    });

    // Search in destinations with relevance scoring
    const destinationMap = new Map<string, { count: number; score: number }>();
    
    this.allPackages.forEach(pkg => {
      pkg.destinations.forEach(dest => {
        const score = calculateRelevance(dest, query);
        if (score > 0) {
          const existing = destinationMap.get(dest);
          if (!existing || score > existing.score) {
            destinationMap.set(dest, {
              count: (existing?.count || 0) + 1,
              score: Math.max(existing?.score || 0, score)
            });
          } else {
            destinationMap.set(dest, {
              count: existing.count + 1,
              score: existing.score
            });
          }
        }
      });
    });

    // Sort destinations by relevance and count
    Array.from(destinationMap.entries())
      .sort((a, b) => {
        // First by score, then by count
        if (b[1].score !== a[1].score) {
          return b[1].score - a[1].score;
        }
        return b[1].count - a[1].count;
      })
      .slice(0, 5)
      .forEach(([dest, data]) => {
        suggestions.push({
          type: 'destination',
          label: dest,
          value: dest,
          count: data.count
        });
      });

    // Search in attractions
    this.attractions.forEach(attraction => {
      const score = calculateRelevance(attraction.label, query);
      if (score > 0) {
        suggestions.push({
          type: 'category',
          label: attraction.label,
          value: attraction.value,
          count: attraction.count
        });
      }
    });

    // Sort all suggestions by relevance and limit to 8
    this.suggestions = suggestions.slice(0, 8);
  }

  onFocus(): void {
    this.isFocused = true;
    if (this.searchQuery.trim().length === 0) {
      this.showSuggestions = true;
      this.suggestions = [];
    } else if (this.searchQuery.trim().length >= 2) {
      this.generateSuggestions();
      this.showSuggestions = true;
    }
  }

  onBlur(): void {
    // Delay to allow click on suggestion
    setTimeout(() => {
      if (!this.isClickingSuggestion) {
        this.isFocused = false;
        this.showSuggestions = false;
      }
      this.isClickingSuggestion = false;
    }, 200);
  }

  isClickingSuggestion: boolean = false;

  selectSuggestion(suggestion: SearchSuggestion, event?: Event): void {
    if (event) {
      event.preventDefault();
      event.stopPropagation();
    }
    this.isClickingSuggestion = true;
    this.searchQuery = suggestion.value;
    this.showSuggestions = false;
    this.isFocused = false;
    
    // Save to recent searches
    this.saveToRecentSearches(suggestion.value);
    
    // If it's a category/attraction suggestion, navigate directly with query params
    if (suggestion.type === 'category') {
      // Check if it's an attraction
      const attraction = this.attractions.find(a => a.value === suggestion.value);
      if (attraction) {
        this.router.navigate(['/packages'], {
          queryParams: attraction.queryParams || { attraction: attraction.value }
        });
        return;
      }
    }
    
    // Small delay to ensure state is updated
    setTimeout(() => {
      this.performSearch();
    }, 50);
  }

  performSearch(): void {
    const query = this.searchQuery.trim();
    if (query) {
      // Save to recent searches
      this.saveToRecentSearches(query);
      
      console.log('Performing search for:', query);
      this.search.emit(query);
      this.router.navigate(['/packages'], {
        queryParams: { search: query }
      }).then(() => {
        console.log('Navigation completed');
      }).catch((error) => {
        console.error('Navigation error:', error);
      });
      this.showSuggestions = false;
      this.isFocused = false;
    }
  }

  loadRecentSearches(): void {
    try {
      const recent = localStorage.getItem('recent-searches');
      if (recent) {
        const recentArray = JSON.parse(recent);
        this.recentSearches = recentArray.slice(0, 5).map((search: string) => ({
          type: 'popular' as const,
          label: search,
          value: search
        }));
      }
    } catch (error) {
      console.error('Error loading recent searches:', error);
      this.recentSearches = [];
    }
  }

  saveToRecentSearches(query: string): void {
    try {
      const recent = localStorage.getItem('recent-searches');
      let recentArray: string[] = recent ? JSON.parse(recent) : [];
      
      // Remove if already exists
      recentArray = recentArray.filter(item => item.toLowerCase() !== query.toLowerCase());
      
      // Add to beginning
      recentArray.unshift(query);
      
      // Keep only last 10 searches
      recentArray = recentArray.slice(0, 10);
      
      localStorage.setItem('recent-searches', JSON.stringify(recentArray));
      this.loadRecentSearches();
    } catch (error) {
      console.error('Error saving recent search:', error);
    }
  }

  clearRecentSearches(): void {
    try {
      localStorage.removeItem('recent-searches');
      this.recentSearches = [];
    } catch (error) {
      console.error('Error clearing recent searches:', error);
    }
  }

  loadCategoryTags(): void {
    // Category tags like "Europe", "Japan", "Women's Special", "Tour Packages From Mumbai"
    const activePackages = this.allPackages.filter(pkg => pkg.isActive);
    
    // Group by destination/type
    const destinationMap = new Map<string, number>();
    const departureCityMap = new Map<string, number>();
    
    activePackages.forEach(pkg => {
      // Count by destinations
      pkg.destinations.forEach(dest => {
        destinationMap.set(dest, (destinationMap.get(dest) || 0) + 1);
      });
      
      // Count by departure cities
      pkg.departures.forEach(dep => {
        departureCityMap.set(dep.departureCity, (departureCityMap.get(dep.departureCity) || 0) + 1);
      });
    });

    this.categoryTags = [
      // Top destinations
      ...Array.from(destinationMap.entries())
        .sort((a, b) => b[1] - a[1])
        .slice(0, 6)
        .map(([dest, count]) => ({
          label: dest,
          value: dest,
          count,
          queryParams: { destination: dest }
        })),
      // Departure cities
      ...Array.from(departureCityMap.entries())
        .sort((a, b) => b[1] - a[1])
        .slice(0, 3)
        .map(([city, count]) => ({
          label: `Tour Packages From ${city}`,
          value: city,
          count,
          queryParams: { departureCity: city }
        }))
    ];
  }

  loadHotDestinations(): void {
    // Hot selling destinations with tour count and departure count
    const activePackages = this.allPackages.filter(pkg => pkg.isActive);
    const destinationMap = new Map<string, { packages: TourPackage[]; departures: number; imageUrl: string }>();
    
    activePackages.forEach(pkg => {
      pkg.destinations.forEach(dest => {
        if (!destinationMap.has(dest)) {
          destinationMap.set(dest, { packages: [], departures: 0, imageUrl: pkg.imageUrl });
        }
        const data = destinationMap.get(dest)!;
        data.packages.push(pkg);
        data.departures += pkg.departures.length;
      });
    });

    this.hotDestinations = Array.from(destinationMap.entries())
      .map(([dest, data]) => ({
        name: dest,
        imageUrl: data.imageUrl,
        tourCount: data.packages.length,
        departureCount: data.departures,
        queryParams: { destination: dest }
      }))
      .sort((a, b) => b.tourCount - a.tourCount)
      .slice(0, 6);
  }

  loadMonthFilters(): void {
    // Calculate tours per month for current year
    const activePackages = this.allPackages.filter(pkg => pkg.isActive);
    const monthCounts = new Map<number, number>();
    
    const monthNames = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    
    // Initialize all months to 0
    for (let i = 0; i < 12; i++) {
      monthCounts.set(i + 1, 0);
    }
    
    activePackages.forEach(pkg => {
      pkg.departures.forEach(dep => {
        const depDate = new Date(dep.date);
        if (depDate.getFullYear() === this.selectedYear) {
          const month = depDate.getMonth() + 1;
          monthCounts.set(month, (monthCounts.get(month) || 0) + 1);
        }
      });
    });
    
    this.monthFilters = Array.from(monthCounts.entries())
      .map(([monthNum, count]) => ({
        month: monthNames[monthNum - 1],
        monthNumber: monthNum,
        tourCount: count
      }));
  }

  loadPriceRanges(): void {
    this.priceRanges = [
      { label: 'Below ₹35,000', value: 'below-35000', max: 35000 },
      { label: '₹35,000 - ₹50,000', value: '35000-50000', min: 35000, max: 50000 },
      { label: '₹50,000 - 1L', value: '50000-100000', min: 50000, max: 100000 },
      { label: '₹1L - ₹2L', value: '100000-200000', min: 100000, max: 200000 },
      { label: '₹2L - ₹3L', value: '200000-300000', min: 200000, max: 300000 },
      { label: '₹3L & above', value: 'above-300000', min: 300000 }
    ];
  }

  loadAttractions(): void {
    // Special attractions and celebrations - extract from package highlights and activities
    const activePackages = this.allPackages.filter(pkg => pkg.isActive);
    
    // Common attraction keywords to look for
    const attractionKeywords: { [key: string]: string[] } = {
      'Beach': ['beach', 'coast', 'seaside', 'shore'],
      'Mountain': ['mountain', 'hill', 'peak', 'summit', 'himalaya'],
      'Wildlife': ['wildlife', 'safari', 'animal', 'jungle', 'forest'],
      'Temple': ['temple', 'shrine', 'religious', 'pilgrimage', 'spiritual'],
      'Adventure': ['adventure', 'trekking', 'hiking', 'rafting', 'paragliding'],
      'Culture': ['cultural', 'heritage', 'traditional', 'festival', 'celebration'],
      'Waterfall': ['waterfall', 'falls', 'cascade'],
      'Lake': ['lake', 'pond', 'backwater', 'river'],
      'Desert': ['desert', 'sand', 'dunes', 'sahara'],
      'Island': ['island', 'islet', 'archipelago']
    };
    
    const attractionsMap = new Map<string, number>();
    
    // Extract attractions from highlights, description, and activities
    activePackages.forEach(pkg => {
      const allText = [
        ...pkg.highlights,
        pkg.description,
        ...pkg.itinerary.flatMap(day => day.activities)
      ].join(' ').toLowerCase();
      
      // Check for each attraction type
      Object.entries(attractionKeywords).forEach(([attractionName, keywords]) => {
        const hasAttraction = keywords.some(keyword => allText.includes(keyword));
        if (hasAttraction) {
          attractionsMap.set(attractionName, (attractionsMap.get(attractionName) || 0) + 1);
        }
      });
    });
    
    // Convert to array and sort by count
    this.attractions = Array.from(attractionsMap.entries())
      .sort((a, b) => b[1] - a[1])
      .slice(0, 8) // Top 8 attractions
      .map(([name, count]) => ({
        label: name,
        value: name.toLowerCase().replace(/\s+/g, '-'),
        count,
        queryParams: { attraction: name.toLowerCase().replace(/\s+/g, '-') }
      }));
    
    // If no attractions found, add some default ones
    if (this.attractions.length === 0) {
      this.attractions = [
        { label: 'Beach', value: 'beach', count: 0, queryParams: { attraction: 'beach' } },
        { label: 'Mountain', value: 'mountain', count: 0, queryParams: { attraction: 'mountain' } },
        { label: 'Wildlife', value: 'wildlife', count: 0, queryParams: { attraction: 'wildlife' } },
        { label: 'Culture', value: 'culture', count: 0, queryParams: { attraction: 'culture' } }
      ];
    }
  }

  selectCategoryTag(tag: CategoryTag): void {
    this.router.navigate(['/packages'], {
      queryParams: tag.queryParams || { destination: tag.value }
    });
    this.showSuggestions = false;
    this.isFocused = false;
  }

  selectHotDestination(dest: DestinationCard): void {
    this.router.navigate(['/packages'], {
      queryParams: dest.queryParams || { destination: dest.name }
    });
    this.showSuggestions = false;
    this.isFocused = false;
  }

  selectMonth(month: MonthFilter): void {
    const startDate = new Date(this.selectedYear, month.monthNumber - 1, 1);
    const endDate = new Date(this.selectedYear, month.monthNumber, 0);
    
    this.router.navigate(['/packages'], {
      queryParams: {
        departStartDate: startDate.toISOString().split('T')[0],
        departEndDate: endDate.toISOString().split('T')[0]
      }
    });
    this.showSuggestions = false;
    this.isFocused = false;
  }

  selectPriceRange(range: { label: string; value: string; min?: number; max?: number }): void {
    let priceRange = '';
    if (range.max && !range.min) {
      priceRange = `0-${range.max}`;
    } else if (range.min && range.max) {
      priceRange = `${range.min}-${range.max}`;
    } else if (range.min) {
      priceRange = `${range.min}+`;
    }
    
    this.router.navigate(['/packages'], {
      queryParams: { priceRange }
    });
    this.showSuggestions = false;
    this.isFocused = false;
  }

  selectAttraction(attraction: CategoryTag): void {
    this.router.navigate(['/packages'], {
      queryParams: attraction.queryParams || { attraction: attraction.value }
    });
    this.showSuggestions = false;
    this.isFocused = false;
  }

  onKeyDown(event: KeyboardEvent): void {
    if (event.key === 'Enter') {
      event.preventDefault();
      this.performSearch();
    } else if (event.key === 'Escape') {
      this.showSuggestions = false;
    }
  }

  @HostListener('document:click', ['$event'])
  onDocumentClick(event: MouseEvent): void {
    const target = event.target as HTMLElement;
    if (!target.closest('.advanced-search-container')) {
      this.showSuggestions = false;
      this.isFocused = false;
    }
  }

  @HostListener('document:keydown', ['$event'])
  onKeyDownGlobal(event: KeyboardEvent): void {
    // Press 'Q' to focus search (like reference design)
    // Only trigger if not already typing in an input/textarea/contenteditable
    const target = event.target as HTMLElement;
    const isInput = target.tagName === 'INPUT' || 
                    target.tagName === 'TEXTAREA' || 
                    target.isContentEditable ||
                    target.closest('input') ||
                    target.closest('textarea');
    
    if ((event.key === 'q' || event.key === 'Q') && !isInput) {
      // Check if Ctrl/Cmd is not pressed (to allow Ctrl+Q shortcuts)
      if (!event.ctrlKey && !event.metaKey) {
        event.preventDefault();
        const searchInput = document.querySelector('.search-input') as HTMLInputElement;
        if (searchInput) {
          searchInput.focus();
          searchInput.select();
        }
      }
    }
  }

  onVoiceSearch(event?: Event): void {
    if (event) {
      event.preventDefault();
      event.stopPropagation();
    }
    
    // Voice search functionality
    try {
      const SpeechRecognition = (window as any).webkitSpeechRecognition || (window as any).SpeechRecognition;
      
      if (!SpeechRecognition) {
        // Fallback if speech recognition is not available
        alert('Voice search is not supported in your browser. Please type your search query.');
        return;
      }
      
      const recognition = new SpeechRecognition();
      
      recognition.continuous = false;
      recognition.interimResults = false;
      recognition.lang = 'en-US';
      
      recognition.onstart = () => {
        console.log('Voice recognition started');
        // Visual feedback - you can add a loading state here
      };
      
      recognition.onresult = (event: any) => {
        const transcript = event.results[0][0].transcript;
        this.searchQuery = transcript;
        this.onInputChange();
        // Auto-search after voice input
        setTimeout(() => {
          this.performSearch();
        }, 100);
      };
      
      recognition.onerror = (event: any) => {
        console.error('Voice recognition error:', event.error);
        if (event.error !== 'no-speech') {
          alert('Voice search encountered an error. Please try typing your search query.');
        }
      };
      
      recognition.onend = () => {
        console.log('Voice recognition ended');
      };
      
      recognition.start();
    } catch (error) {
      console.error('Voice search initialization error:', error);
      alert('Voice search is not available. Please type your search query.');
    }
  }
}

