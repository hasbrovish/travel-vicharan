import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { delay } from 'rxjs/operators';
import { TourPackage, PackageType } from '../models';
import { DataService } from './data.service';

@Injectable({
  providedIn: 'root'
})
export class PackageService {
  constructor(private dataService: DataService) {}

  getAllPackages(): Observable<TourPackage[]> {
    // Simulate API call with delay
    return of(this.dataService.getAllPackages()).pipe(delay(500));
  }

  getPackageById(id: string): Observable<TourPackage | undefined> {
    return of(this.dataService.getPackageById(id)).pipe(delay(300));
  }

  getPackagesByType(type: PackageType): Observable<TourPackage[]> {
    return of(this.dataService.getPackagesByType(type)).pipe(delay(500));
  }

  getFeaturedPackages(limit: number = 6): Observable<TourPackage[]> {
    return of(this.dataService.getFeaturedPackages(limit)).pipe(delay(500));
  }

  searchPackages(searchTerm: string): Observable<TourPackage[]> {
    return of(this.dataService.searchPackages(searchTerm)).pipe(delay(300));
  }

  filterPackages(
    packages: TourPackage[],
    filters: {
      type?: PackageType;
      categories?: string[];
      minPrice?: number;
      maxPrice?: number;
    }
  ): TourPackage[] {
    let filtered = [...packages];

    if (filters.type) {
      filtered = filtered.filter(pkg => pkg.type === filters.type);
    }

    if (filters.categories && filters.categories.length > 0) {
      filtered = filtered.filter(pkg => filters.categories!.includes(pkg.category));
    }

    if (filters.minPrice !== undefined) {
      filtered = filtered.filter(pkg => pkg.basePrice >= filters.minPrice!);
    }

    if (filters.maxPrice !== undefined) {
      filtered = filtered.filter(pkg => pkg.basePrice <= filters.maxPrice!);
    }

    return filtered;
  }
}
