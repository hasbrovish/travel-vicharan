import { Component, OnInit, Output, EventEmitter, HostListener } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { PackagesDataService } from '../../services/packages-data.service';
import { TourPackage } from '../../models/tour-package.model';

interface SearchSuggestion {
  type: 'destination' | 'package' | 'popular';
  label: string;
  value: string;
  count?: number;
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
  allPackages: TourPackage[] = [];
  isFocused: boolean = false;

  @Output() search = new EventEmitter<string>();

  constructor(
    private router: Router,
    private packagesDataService: PackagesDataService
  ) {}

  ngOnInit(): void {
    this.loadPopularSearches();
    this.loadAllPackages();
  }

  loadAllPackages(): void {
    this.packagesDataService.getAllPackages().subscribe({
      next: (packages) => {
        this.allPackages = packages;
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
    if (this.searchQuery.trim().length >= 2) {
      this.generateSuggestions();
      this.showSuggestions = true;
    } else if (this.searchQuery.trim().length === 0) {
      this.showSuggestions = true;
      this.suggestions = [];
    } else {
      this.showSuggestions = false;
    }
  }

  generateSuggestions(): void {
    const query = this.searchQuery.toLowerCase().trim();
    const suggestions: SearchSuggestion[] = [];

    // Search in packages
    const matchingPackages = this.allPackages
      .filter(pkg => 
        pkg.name.toLowerCase().includes(query) ||
        pkg.destinations.some(dest => dest.toLowerCase().includes(query))
      )
      .slice(0, 5);

    matchingPackages.forEach(pkg => {
      suggestions.push({
        type: 'package',
        label: pkg.name,
        value: pkg.name,
        count: undefined
      });
    });

    // Search in destinations
    const allDestinations = new Set<string>();
    this.allPackages.forEach(pkg => {
      pkg.destinations.forEach(dest => {
        if (dest.toLowerCase().includes(query)) {
          allDestinations.add(dest);
        }
      });
    });

    Array.from(allDestinations).slice(0, 5).forEach(dest => {
      suggestions.push({
        type: 'destination',
        label: dest,
        value: dest,
        count: this.allPackages.filter(pkg => pkg.destinations.includes(dest)).length
      });
    });

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
    // Small delay to ensure state is updated
    setTimeout(() => {
      this.performSearch();
    }, 50);
  }

  performSearch(): void {
    const query = this.searchQuery.trim();
    if (query) {
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

