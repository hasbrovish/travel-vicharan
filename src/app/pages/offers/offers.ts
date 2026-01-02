import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { OffersService } from '../../services/offers.service';
import { OfferCard, OfferFeature } from '../../models/offers.model';
import { DestinationTile } from '../../components/destination-tile/destination-tile';
import { OffersFilter, OffersFilterCriteria } from '../../components/offers-filter/offers-filter';
import { PackagesDataService } from '../../services/packages-data.service';
import { TourPackage } from '../../models';

@Component({
  selector: 'app-offers',
  imports: [CommonModule, RouterLink, DestinationTile, OffersFilter],
  templateUrl: './offers.html',
  styleUrl: './offers.css'
})
export class Offers implements OnInit {
  offers: OfferCard[] = [];
  features: OfferFeature[] = [];
  currentFilters: OffersFilterCriteria = {};

  // Travel packages
  allPackages: TourPackage[] = [];
  filteredPackages: TourPackage[] = [];
  displayedPackages: TourPackage[] = [];

  constructor(
    private offersService: OffersService,
    private packagesDataService: PackagesDataService
  ) {}

  ngOnInit(): void {
    // Load offer cards
    this.offersService.getOffers().subscribe(offers => {
      this.offers = offers;
    });
    this.offersService.getCustomizedFeatures().subscribe(features => {
      this.features = features;
    });

    // Load all packages
    this.packagesDataService.getAllPackages().subscribe(packages => {
      this.allPackages = packages;
      this.filteredPackages = packages;
      this.displayedPackages = packages.slice(0, 9); // Show first 9 packages
    });
  }

  onFilterChange(criteria: OffersFilterCriteria): void {
    this.currentFilters = criteria;
    console.log('Filter criteria changed:', criteria);

    // Apply filters
    this.packagesDataService.filterPackages(criteria).subscribe(filtered => {
      this.filteredPackages = filtered;
      this.displayedPackages = filtered.slice(0, 9);
      console.log(`Filtered ${filtered.length} packages from ${this.allPackages.length} total`);
    });
  }

  loadMore(): void {
    const currentLength = this.displayedPackages.length;
    const nextBatch = this.filteredPackages.slice(currentLength, currentLength + 9);
    this.displayedPackages = [...this.displayedPackages, ...nextBatch];
  }

  get hasMorePackages(): boolean {
    return this.displayedPackages.length < this.filteredPackages.length;
  }
}
