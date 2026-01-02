import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { TourPackage } from '../models/tour-package.model';

@Injectable({
  providedIn: 'root'
})
export class WishlistService {
  private wishlistSubject = new BehaviorSubject<TourPackage[]>([]);
  public wishlist$: Observable<TourPackage[]> = this.wishlistSubject.asObservable();

  constructor() {
    this.loadWishlist();
  }

  private loadWishlist(): void {
    const wishlistData = localStorage.getItem('wishlist');
    if (wishlistData) {
      try {
        const items = JSON.parse(wishlistData);
        this.wishlistSubject.next(items);
      } catch (e) {
        console.error('Error loading wishlist:', e);
        this.wishlistSubject.next([]);
      }
    }
  }

  addToWishlist(packageItem: TourPackage): void {
    const wishlist = this.wishlistSubject.value;
    if (!wishlist.find(pkg => pkg.id === packageItem.id)) {
      wishlist.push(packageItem);
      this.saveWishlist(wishlist);
    }
  }

  removeFromWishlist(packageId: string): void {
    const wishlist = this.wishlistSubject.value.filter(pkg => pkg.id !== packageId);
    this.saveWishlist(wishlist);
  }

  isInWishlist(packageId: string): boolean {
    return this.wishlistSubject.value.some(pkg => pkg.id === packageId);
  }

  clearWishlist(): void {
    this.saveWishlist([]);
  }

  getWishlist(): TourPackage[] {
    return this.wishlistSubject.value;
  }

  private saveWishlist(items: TourPackage[]): void {
    localStorage.setItem('wishlist', JSON.stringify(items));
    this.wishlistSubject.next(items);
  }
}

