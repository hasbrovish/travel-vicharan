import { Passenger } from './passenger.model';

export type BookingStatus = 'CONFIRMED' | 'PENDING' | 'CANCELLED';

export interface Booking {
  id: string;
  bookingReference: string;
  packageId: string;
  packageName: string;
  packageImage: string;
  departureDate: string;
  departureCity: string;
  passengers: Passenger[];
  totalAmount: number;
  status: BookingStatus;
  createdAt: Date;
}
