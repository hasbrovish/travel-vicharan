import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterLink } from '@angular/router';
import { CartService, CartItem } from '../../services/cart.service';
import { Breadcrumb } from '../breadcrumb/breadcrumb';

@Component({
  selector: 'app-my-holiday-cart',
  standalone: true,
  imports: [CommonModule, RouterLink, Breadcrumb],
  templateUrl: './my-holiday-cart.html',
  styleUrl: './my-holiday-cart.css'
})
export class MyHolidayCart implements OnInit {
  cartItems: CartItem[] = [];
  loading = false;

  constructor(
    private router: Router,
    private cartService: CartService
  ) {}

  ngOnInit(): void {
    this.loadCartItems();
    // Subscribe to cart changes
    this.cartService.cartItems$.subscribe(items => {
      this.cartItems = items;
    });
  }

  loadCartItems(): void {
    this.loading = true;
    this.cartItems = this.cartService.getCartItems();
    this.loading = false;
  }

  removeItem(index: number): void {
    this.cartService.removeFromCart(index);
  }

  getTotalAmount(): number {
    return this.cartService.getTotalAmount();
  }

  proceedToCheckout(item: CartItem): void {
    this.router.navigate(['/booking', item.package.slug || item.package.id], {
      queryParams: {
        departure: item.departureDate,
        passengers: item.numberOfPassengers
      }
    });
  }

  clearCart(): void {
    if (confirm('Are you sure you want to clear your cart?')) {
      this.cartService.clearCart();
    }
  }
}

