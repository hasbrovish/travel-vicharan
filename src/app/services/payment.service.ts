import { Injectable } from '@angular/core';
import { Observable, of, delay, throwError } from 'rxjs';

export interface PaymentRequest {
  bookingReference: string;
  amount: number;
  currency: string;
  customerName: string;
  customerEmail: string;
  customerPhone: string;
  description: string;
}

export interface PaymentResponse {
  success: boolean;
  transactionId?: string;
  paymentMethod?: string;
  amount?: number;
  timestamp?: Date;
  message: string;
  gatewayResponse?: any;
}

export type PaymentGateway = 'RAZORPAY' | 'PAYTM' | 'PHONEPE';

@Injectable({
  providedIn: 'root'
})
export class PaymentService {
  // Mock payment gateway configuration
  private readonly GATEWAY_CONFIG = {
    razorpay: {
      keyId: 'rzp_test_vichrantrip',
      keySecret: 'mock_secret_key',
      accountName: 'VichranTrip',
      brandColor: '#2d5a5f',
      logo: '/new-logo.png'
    },
    merchantInfo: {
      name: 'VichranTrip',
      email: 'VichranTrip.info@gmail.com',
      phone: '1800 313 5555'
    }
  };

  // Mock success rate (90% success, 10% failure for testing)
  private readonly MOCK_SUCCESS_RATE = 0.9;

  constructor() {}

  /**
   * Process payment through mock gateway
   * Simulates Razorpay/Paytm/PhonePe integration
   */
  processPayment(paymentRequest: PaymentRequest, gateway: PaymentGateway = 'RAZORPAY'): Observable<PaymentResponse> {
    console.log('💳 Mock Payment Service: Processing payment...');
    console.log('Gateway:', gateway);
    console.log('Amount:', paymentRequest.amount, paymentRequest.currency);
    console.log('Booking Reference:', paymentRequest.bookingReference);
    console.log('Customer:', paymentRequest.customerName);

    // Simulate random success/failure
    const isSuccess = Math.random() < this.MOCK_SUCCESS_RATE;

    if (!isSuccess) {
      console.error('❌ Payment failed (mock failure)');
      return throwError(() => ({
        success: false,
        message: 'Payment failed. Please try again.',
        gatewayResponse: {
          error: 'PAYMENT_DECLINED',
          errorDescription: 'Mock payment declined for testing purposes'
        }
      })).pipe(delay(2000));
    }

    const transactionId = this.generateTransactionId(gateway);

    console.log('✅ Payment successful (mock)');
    console.log('Transaction ID:', transactionId);

    return of({
      success: true,
      transactionId: transactionId,
      paymentMethod: this.getMockPaymentMethod(),
      amount: paymentRequest.amount,
      timestamp: new Date(),
      message: 'Payment processed successfully',
      gatewayResponse: {
        gateway: gateway,
        status: 'SUCCESS',
        orderId: `order_${Date.now()}`,
        signature: this.generateMockSignature()
      }
    }).pipe(delay(2500)); // Simulate network delay
  }

  /**
   * Verify payment status (Mock implementation)
   */
  verifyPayment(transactionId: string): Observable<PaymentResponse> {
    console.log('🔍 Mock Payment Service: Verifying payment...');
    console.log('Transaction ID:', transactionId);

    return of({
      success: true,
      transactionId: transactionId,
      message: 'Payment verified successfully',
      gatewayResponse: {
        status: 'VERIFIED',
        verifiedAt: new Date()
      }
    }).pipe(delay(1000));
  }

  /**
   * Calculate convenience fee
   * Typically 2-3% of transaction amount for payment gateway charges
   */
  calculateConvenienceFee(amount: number): number {
    const feePercentage = 0.025; // 2.5%
    const calculatedFee = amount * feePercentage;

    // Round to nearest rupee, minimum ₹10
    return Math.max(10, Math.round(calculatedFee));
  }

  /**
   * Calculate registration amount (typically 20-30% of total)
   */
  calculateRegistrationAmount(totalAmount: number): number {
    const registrationPercentage = 0.25; // 25%
    return Math.round(totalAmount * registrationPercentage);
  }

  /**
   * Calculate balance payment due date
   * Typically 15-30 days before departure
   */
  calculateBalanceDueDate(departureDate: string, daysBeforeDeparture: number = 15): string {
    const departure = new Date(departureDate);
    const dueDate = new Date(departure);
    dueDate.setDate(dueDate.getDate() - daysBeforeDeparture);
    return dueDate.toISOString().split('T')[0];
  }

  /**
   * Initialize payment gateway (Mock)
   * In production, this would load Razorpay/Paytm SDK scripts
   */
  initializeGateway(gateway: PaymentGateway = 'RAZORPAY'): Observable<boolean> {
    console.log(`🔧 Initializing ${gateway} payment gateway (mock)...`);
    console.log('Key ID:', this.GATEWAY_CONFIG.razorpay.keyId);
    console.log('Merchant:', this.GATEWAY_CONFIG.merchantInfo.name);

    return of(true).pipe(delay(500));
  }

  /**
   * Open payment modal (Mock)
   * In production, this would open Razorpay/Paytm checkout modal
   */
  openPaymentModal(paymentRequest: PaymentRequest): Observable<PaymentResponse> {
    console.log('🪟 Opening payment modal (mock)...');
    console.log('Order Details:', {
      description: paymentRequest.description,
      amount: paymentRequest.amount,
      currency: paymentRequest.currency,
      customer: {
        name: paymentRequest.customerName,
        email: paymentRequest.customerEmail,
        phone: paymentRequest.customerPhone
      },
      theme: {
        color: this.GATEWAY_CONFIG.razorpay.brandColor
      },
      logo: this.GATEWAY_CONFIG.razorpay.logo
    });

    // Simulate user completing payment in modal
    return this.processPayment(paymentRequest);
  }

  /**
   * Generate mock transaction ID
   */
  private generateTransactionId(gateway: PaymentGateway): string {
    const prefix = {
      'RAZORPAY': 'pay_rzp',
      'PAYTM': 'pay_ptm',
      'PHONEPE': 'pay_phn'
    }[gateway];

    const timestamp = Date.now();
    const random = Math.random().toString(36).substring(2, 10).toUpperCase();

    return `${prefix}_${timestamp}_${random}`;
  }

  /**
   * Generate mock payment signature (for verification)
   */
  private generateMockSignature(): string {
    return Math.random().toString(36).substring(2, 15) +
           Math.random().toString(36).substring(2, 15);
  }

  /**
   * Get random mock payment method
   */
  private getMockPaymentMethod(): string {
    const methods = [
      'Credit Card - Visa ending in 4532',
      'Debit Card - Mastercard ending in 7890',
      'UPI - customer@paytm',
      'Net Banking - HDFC Bank',
      'Wallet - Paytm',
      'UPI - customer@oksbi'
    ];
    return methods[Math.floor(Math.random() * methods.length)];
  }

  /**
   * Format currency amount
   */
  formatAmount(amount: number, currency: string = 'INR'): string {
    if (currency === 'INR') {
      return `₹${amount.toLocaleString('en-IN')}`;
    }
    return `${currency} ${amount.toLocaleString()}`;
  }

  /**
   * Get payment gateway fees structure
   */
  getGatewayFees(): { domestic: number; international: number; upi: number } {
    return {
      domestic: 2.5, // 2.5% for domestic cards
      international: 3.5, // 3.5% for international cards
      upi: 0 // Free for UPI (up to certain limit)
    };
  }
}
