import { Passenger } from './passenger.model';

export type BookingStatus = 'CONFIRMED' | 'PENDING' | 'CANCELLED';
export type PaymentOption = 'REGISTRATION' | 'FULL' | 'CUSTOM';
export type RoomConfigType = 'DOUBLE' | 'TWIN' | 'SINGLE';

export interface SelectedRoomConfig {
  optionId: string;
  rooms: number;
  description: string;
  totalCost: number;
}

export interface GSTDetails {
  companyName: string;
  gstNumber: string;
  address: string;
}

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

  // NEW: Room details
  roomConfiguration: SelectedRoomConfig;

  // NEW: Payment details
  paymentOption: PaymentOption;
  registrationAmount?: number;
  customAmount?: number;
  balanceAmount?: number;
  balancePaymentDueDate?: string;
  convenienceFee: number;

  // NEW: GST
  gstRequired: boolean;
  gstDetails?: GSTDetails;

  // NEW: Agreement flags
  termsAccepted: boolean;
  communicationConsent: boolean;

  // NEW: Step tracking
  currentStep: number;
  completedSteps: number[];

  // NEW: Add-ons
  addOns?: string[];
}
