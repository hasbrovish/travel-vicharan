import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterLink } from '@angular/router';
import { TourPackage } from '../../models';
import { PackageCard } from '../package-card/package-card';
import { WishlistService } from '../../services/wishlist.service';
import { Breadcrumb } from '../breadcrumb/breadcrumb';

@Component({
  selector: 'app-my-wishlist',
  standalone: true,
  imports: [CommonModule, RouterLink, PackageCard, Breadcrumb],
  templateUrl: './my-wishlist.html',
  styleUrl: './my-wishlist.css'
})
export class MyWishlist implements OnInit {
  wishlistItems: TourPackage[] = [];
  loading = false;

  constructor(
    private router: Router,
    private wishlistService: WishlistService
  ) {}

  ngOnInit(): void {
    this.loadWishlist();
    // Subscribe to wishlist changes
    this.wishlistService.wishlist$.subscribe(items => {
      this.wishlistItems = items;
    });
  }

  loadWishlist(): void {
    this.loading = true;
    this.wishlistItems = this.wishlistService.getWishlist();
    this.loading = false;
  }

  removeFromWishlist(packageId: string): void {
    this.wishlistService.removeFromWishlist(packageId);
  }

  clearWishlist(): void {
    if (confirm('Are you sure you want to clear your wishlist?')) {
      this.wishlistService.clearWishlist();
    }
  }
}

