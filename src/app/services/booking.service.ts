import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { delay } from 'rxjs/operators';
import { Booking } from '../models';
import { DataService } from './data.service';

@Injectable({
  providedIn: 'root'
})
export class BookingService {
  constructor(private dataService: DataService) {}

  createBooking(booking: Booking): Observable<boolean> {
    try {
      this.dataService.createBooking(booking);
      // Simulate API call with delay
      return of(true).pipe(delay(500));
    } catch (error) {
      return of(false).pipe(delay(500));
    }
  }

  getAllBookings(): Observable<Booking[]> {
    return of(this.dataService.getAllBookings()).pipe(delay(300));
  }

  getBookingById(id: string): Observable<Booking | undefined> {
    return of(this.dataService.getBookingById(id)).pipe(delay(300));
  }

  generateBookingReference(): string {
    return this.dataService.generateBookingReference();
  }

  calculateTotalAmount(basePrice: number, numberOfPassengers: number): number {
    return basePrice * numberOfPassengers;
  }
}
