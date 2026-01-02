import { Component, EventEmitter, Output, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

export interface OffersFilterCriteria {
  tag?: string;
  priceRange?: string;
  departureCity?: string;
  joiningLeaving?: string;
  country?: string;
  city?: string;
  departStartDate?: string;
  departEndDate?: string;
  duration?: string;
}

@Component({
  selector: 'app-offers-filter',
  imports: [CommonModule, FormsModule],
  templateUrl: './offers-filter.html',
  styleUrl: './offers-filter.css'
})
export class OffersFilter implements OnInit {
  @Output() filterChange = new EventEmitter<OffersFilterCriteria>();

  selectedTag: string = '';
  selectedPriceRange: string = '';
  selectedDepartureCity: string = '';
  selectedJoiningLeaving: string = '';
  selectedCountry: string = '';
  selectedCity: string = '';
  selectedDuration: string = '';
  departStartDate: string = '';
  departEndDate: string = '';

  ngOnInit(): void {
    // Reset filters on component initialization
    this.clearFilters();
  }

  selectTag(tag: string): void {
    this.selectedTag = this.selectedTag === tag ? '' : tag;
    this.onFilterChange();
  }

  onFilterChange(): void {
    const criteria: OffersFilterCriteria = {
      tag: this.selectedTag || undefined,
      priceRange: this.selectedPriceRange || undefined,
      departureCity: this.selectedDepartureCity || undefined,
      joiningLeaving: this.selectedJoiningLeaving || undefined,
      country: this.selectedCountry || undefined,
      city: this.selectedCity || undefined,
      duration: this.selectedDuration || undefined,
      departStartDate: this.departStartDate || undefined,
      departEndDate: this.departEndDate || undefined
    };

    console.log('Filter changed:', criteria);
    this.filterChange.emit(criteria);
  }

  clearFilters(): void {
    this.selectedTag = '';
    this.selectedPriceRange = '';
    this.selectedDepartureCity = '';
    this.selectedJoiningLeaving = '';
    this.selectedCountry = '';
    this.selectedCity = '';
    this.selectedDuration = '';
    this.departStartDate = '';
    this.departEndDate = '';

    // Don't emit on initialization, only on user action
    if (this.filterChange.observers.length > 0) {
      this.onFilterChange();
    }
  }

  getActiveFilterCount(): number {
    let count = 0;
    if (this.selectedTag) count++;
    if (this.selectedPriceRange) count++;
    if (this.selectedDepartureCity) count++;
    if (this.selectedJoiningLeaving) count++;
    if (this.selectedCountry) count++;
    if (this.selectedCity) count++;
    if (this.selectedDuration) count++;
    if (this.departStartDate) count++;
    if (this.departEndDate) count++;
    return count;
  }
}
