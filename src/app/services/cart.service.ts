import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { TourPackage } from '../models/tour-package.model';

export interface CartItem {
  package: TourPackage;
  departureDate: string;
  numberOfPassengers: number;
  totalAmount: number;
  addedDate: string;
}

@Injectable({
  providedIn: 'root'
})
export class CartService {
  private cartItemsSubject = new BehaviorSubject<CartItem[]>([]);
  public cartItems$: Observable<CartItem[]> = this.cartItemsSubject.asObservable();

  constructor() {
    this.loadCart();
  }

  private loadCart(): void {
    const cartData = localStorage.getItem('holiday_cart');
    if (cartData) {
      try {
        const items = JSON.parse(cartData);
        this.cartItemsSubject.next(items);
      } catch (e) {
        console.error('Error loading cart:', e);
        this.cartItemsSubject.next([]);
      }
    }
  }

  addToCart(packageItem: TourPackage, departureDate: string, numberOfPassengers: number = 1): void {
    const cartItems = this.cartItemsSubject.value;
    const newItem: CartItem = {
      package: packageItem,
      departureDate,
      numberOfPassengers,
      totalAmount: packageItem.basePrice * numberOfPassengers,
      addedDate: new Date().toISOString()
    };
    cartItems.push(newItem);
    this.saveCart(cartItems);
  }

  removeFromCart(index: number): void {
    const cartItems = this.cartItemsSubject.value;
    cartItems.splice(index, 1);
    this.saveCart(cartItems);
  }

  clearCart(): void {
    this.saveCart([]);
  }

  getCartItems(): CartItem[] {
    return this.cartItemsSubject.value;
  }

  getTotalAmount(): number {
    return this.cartItemsSubject.value.reduce((sum, item) => sum + item.totalAmount, 0);
  }

  private saveCart(items: CartItem[]): void {
    localStorage.setItem('holiday_cart', JSON.stringify(items));
    this.cartItemsSubject.next(items);
  }
}

