import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { PackagesDataService } from '../../services/packages-data.service';
import { TourPackage } from '../../models';

interface PlannerStep {
  id: number;
  title: string;
  icon: string;
  completed: boolean;
}

interface DestinationOption {
  id: string;
  name: string;
  image: string;
  type: 'DOMESTIC' | 'INTERNATIONAL';
}

interface TravelPreference {
  id: string;
  label: string;
  icon: string;
  selected: boolean;
}

@Component({
  selector: 'app-travel-planner',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './travel-planner.html',
  styleUrl: './travel-planner.css'
})
export class TravelPlanner implements OnInit {
  currentStep = 1;
  totalSteps = 5;
  
  steps: PlannerStep[] = [
    { id: 1, title: 'Destination', icon: 'bi-geo-alt-fill', completed: false },
    { id: 2, title: 'Dates', icon: 'bi-calendar-event', completed: false },
    { id: 3, title: 'Travelers', icon: 'bi-people-fill', completed: false },
    { id: 4, title: 'Budget', icon: 'bi-currency-rupee', completed: false },
    { id: 5, title: 'Preferences', icon: 'bi-heart-fill', completed: false }
  ];

  // Step 1: Destination
  selectedDestination: DestinationOption | null = null;
  destinations: DestinationOption[] = [
    { id: 'kerala', name: 'Kerala', image: '/assets/kerala.jpg', type: 'DOMESTIC' },
    { id: 'goa', name: 'Goa', image: '/assets/goa.jpg', type: 'DOMESTIC' },
    { id: 'himachal', name: 'Himachal Pradesh', image: '/assets/himachal.jpg', type: 'DOMESTIC' },
    { id: 'rajasthan', name: 'Rajasthan', image: '/assets/rajasthan.jpg', type: 'DOMESTIC' },
    { id: 'dubai', name: 'Dubai', image: '/assets/dubai.jpg', type: 'INTERNATIONAL' },
    { id: 'thailand', name: 'Thailand', image: '/assets/thailand.jpg', type: 'INTERNATIONAL' },
    { id: 'bali', name: 'Bali', image: '/assets/bali.jpg', type: 'INTERNATIONAL' },
    { id: 'maldives', name: 'Maldives', image: '/assets/maldives.jpg', type: 'INTERNATIONAL' }
  ];

  // Step 2: Dates
  startDate: string = '';
  endDate: string = '';
  minDate: string = '';

  // Step 3: Travelers
  adults = 2;
  children = 0;
  infants = 0;

  // Step 4: Budget
  budgetRange = 50000;
  minBudget = 10000;
  maxBudget = 500000;
  budgetLabel = '₹50,000';

  // Step 5: Preferences
  preferences: TravelPreference[] = [
    { id: 'adventure', label: 'Adventure', icon: 'bi-lightning-fill', selected: false },
    { id: 'luxury', label: 'Luxury', icon: 'bi-star-fill', selected: false },
    { id: 'family', label: 'Family', icon: 'bi-people-fill', selected: false },
    { id: 'honeymoon', label: 'Honeymoon', icon: 'bi-heart-fill', selected: false },
    { id: 'beach', label: 'Beach', icon: 'bi-umbrella-fill', selected: false },
    { id: 'mountain', label: 'Mountains', icon: 'bi-mountain', selected: false },
    { id: 'culture', label: 'Culture', icon: 'bi-building', selected: false },
    { id: 'wildlife', label: 'Wildlife', icon: 'bi-tree-fill', selected: false }
  ];

  // Results
  suggestedPackages: TourPackage[] = [];
  loading = false;

  constructor(
    private packagesDataService: PackagesDataService,
    private router: Router
  ) {}

  ngOnInit(): void {
    const today = new Date();
    this.minDate = today.toISOString().split('T')[0];
    this.updateBudgetLabel();
  }

  nextStep(): void {
    if (this.canProceed()) {
      this.steps[this.currentStep - 1].completed = true;
      if (this.currentStep < this.totalSteps) {
        this.currentStep++;
      } else {
        this.searchPackages();
      }
    }
  }

  previousStep(): void {
    if (this.currentStep > 1) {
      this.currentStep--;
    }
  }

  goToStep(step: number): void {
    if (step <= this.getLastCompletedStep() + 1) {
      this.currentStep = step;
    }
  }

  getLastCompletedStep(): number {
    return this.steps.filter(s => s.completed).length;
  }

  canProceed(): boolean {
    switch (this.currentStep) {
      case 1: return this.selectedDestination !== null;
      case 2: return this.startDate !== '' && this.endDate !== '';
      case 3: return this.adults > 0;
      case 4: return true; // Budget always has a value
      case 5: return true; // Preferences optional
      default: return false;
    }
  }

  selectDestination(dest: DestinationOption): void {
    this.selectedDestination = dest;
  }

  updateBudgetLabel(): void {
    if (this.budgetRange >= 100000) {
      this.budgetLabel = `₹${(this.budgetRange / 1000).toFixed(0)}K`;
    } else {
      this.budgetLabel = `₹${this.budgetRange.toLocaleString('en-IN')}`;
    }
  }

  togglePreference(pref: TravelPreference): void {
    pref.selected = !pref.selected;
  }

  incrementAdults(): void {
    this.adults++;
  }

  decrementAdults(): void {
    this.adults = Math.max(1, this.adults - 1);
  }

  incrementChildren(): void {
    this.children++;
  }

  decrementChildren(): void {
    this.children = Math.max(0, this.children - 1);
  }

  incrementInfants(): void {
    this.infants++;
  }

  decrementInfants(): void {
    this.infants = Math.max(0, this.infants - 1);
  }

  searchPackages(): void {
    this.loading = true;
    this.packagesDataService.getAllPackages().subscribe({
      next: (packages) => {
        // Filter packages based on selections
        let filtered = packages.filter(pkg => pkg.isActive);
        
        if (this.selectedDestination) {
          filtered = filtered.filter(pkg => 
            pkg.type === this.selectedDestination!.type &&
            pkg.destinations.some(d => 
              d.toLowerCase().includes(this.selectedDestination!.name.toLowerCase())
            )
          );
        }

        if (this.budgetRange) {
          filtered = filtered.filter(pkg => 
            pkg.basePrice <= this.budgetRange * (this.adults + this.children)
          );
        }

        this.suggestedPackages = filtered.slice(0, 6);
        this.loading = false;
        this.currentStep = 6; // Show results
      },
      error: () => {
        this.loading = false;
      }
    });
  }

  viewPackage(packageSlug: string): void {
    this.router.navigate(['/packages', packageSlug]);
  }

  resetPlanner(): void {
    this.currentStep = 1;
    this.selectedDestination = null;
    this.startDate = '';
    this.endDate = '';
    this.adults = 2;
    this.children = 0;
    this.infants = 0;
    this.budgetRange = 50000;
    this.preferences.forEach(p => p.selected = false);
    this.suggestedPackages = [];
    this.steps.forEach(s => s.completed = false);
    this.updateBudgetLabel();
  }
}

