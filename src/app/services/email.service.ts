import { Injectable } from '@angular/core';
import { Observable, of, delay } from 'rxjs';
import { Booking } from '../models/booking.model';
import { Enquiry } from '../models/enquiry.model';

export interface EmailResponse {
  success: boolean;
  message: string;
  emailId?: string;
}

@Injectable({
  providedIn: 'root'
})
export class EmailService {
  // Mock EmailJS configuration
  private readonly EMAILJS_CONFIG = {
    serviceId: 'service_vichrantrip',
    templateId_booking: 'template_booking_confirmation',
    templateId_enquiry: 'template_enquiry',
    userId: 'user_vichrantrip',
    toEmail: 'VichranTrip.info@gmail.com'
  };

  constructor() {}

  /**
   * Send booking confirmation email (Mock implementation)
   * In production, this would use EmailJS SDK:
   * emailjs.send(serviceId, templateId, templateParams, userId)
   */
  sendBookingConfirmation(booking: Booking): Observable<EmailResponse> {
    console.log('📧 Mock Email Service: Sending booking confirmation...');
    console.log('To:', this.EMAILJS_CONFIG.toEmail);
    console.log('Booking Reference:', booking.bookingReference);
    console.log('Package:', booking.packageName);
    console.log('Departure:', booking.departureDate);
    console.log('Total Amount:', booking.totalAmount);
    console.log('Passengers:', booking.passengers.length);

    const emailContent = this.generateBookingEmailContent(booking);
    console.log('Email Content:', emailContent);

    // Simulate API delay
    return of({
      success: true,
      message: 'Booking confirmation email sent successfully',
      emailId: `email_${Date.now()}`
    }).pipe(delay(1000));
  }

  /**
   * Send enquiry notification email (Mock implementation)
   */
  sendEnquiryNotification(enquiry: Enquiry): Observable<EmailResponse> {
    console.log('📧 Mock Email Service: Sending enquiry notification...');
    console.log('To:', this.EMAILJS_CONFIG.toEmail);
    console.log('From:', enquiry.fullName, '-', enquiry.email);
    console.log('Package:', enquiry.packageName);
    console.log('Message:', enquiry.description);

    const emailContent = this.generateEnquiryEmailContent(enquiry);
    console.log('Email Content:', emailContent);

    // Simulate API delay
    return of({
      success: true,
      message: 'Enquiry notification sent successfully',
      emailId: `email_${Date.now()}`
    }).pipe(delay(800));
  }

  /**
   * Generate booking confirmation email HTML content
   */
  private generateBookingEmailContent(booking: Booking): string {
    const leadPassenger = booking.passengers[0];

    return `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <div style="background: #2d5a5f; color: white; padding: 20px; text-align: center;">
          <h1>VichranTrip</h1>
          <h2>Booking Confirmation</h2>
        </div>

        <div style="padding: 20px; background: #f9f9f9;">
          <h3 style="color: #2d5a5f;">Booking Reference: ${booking.bookingReference}</h3>

          <div style="background: white; padding: 15px; margin: 10px 0; border-left: 4px solid #ffc107;">
            <h4 style="margin-top: 0;">Package Details</h4>
            <p><strong>Package:</strong> ${booking.packageName}</p>
            <p><strong>Departure Date:</strong> ${booking.departureDate}</p>
            <p><strong>Departure City:</strong> ${booking.departureCity}</p>
          </div>

          <div style="background: white; padding: 15px; margin: 10px 0; border-left: 4px solid #5eb8c8;">
            <h4 style="margin-top: 0;">Guest Details</h4>
            <p><strong>Lead Passenger:</strong> ${leadPassenger.firstName} ${leadPassenger.lastName}</p>
            <p><strong>Email:</strong> ${leadPassenger.email}</p>
            <p><strong>Phone:</strong> ${leadPassenger.phone}</p>
            <p><strong>Total Passengers:</strong> ${booking.passengers.length}</p>
          </div>

          <div style="background: white; padding: 15px; margin: 10px 0; border-left: 4px solid #28a745;">
            <h4 style="margin-top: 0;">Payment Details</h4>
            <p><strong>Room Configuration:</strong> ${booking.roomConfiguration.description}</p>
            <p><strong>Payment Option:</strong> ${this.formatPaymentOption(booking.paymentOption)}</p>
            <p><strong>Total Amount:</strong> ₹${booking.totalAmount.toLocaleString('en-IN')}</p>
            ${booking.registrationAmount ? `<p><strong>Registration Paid:</strong> ₹${booking.registrationAmount.toLocaleString('en-IN')}</p>` : ''}
            ${booking.balanceAmount ? `<p><strong>Balance Due:</strong> ₹${booking.balanceAmount.toLocaleString('en-IN')}</p>` : ''}
            <p><strong>Convenience Fee:</strong> ₹${booking.convenienceFee.toLocaleString('en-IN')}</p>
          </div>

          <div style="background: #fff3cd; padding: 15px; margin: 10px 0; border-radius: 4px;">
            <p style="margin: 0;"><strong>Important:</strong> This is a mock email. In production, this will be sent via EmailJS to ${this.EMAILJS_CONFIG.toEmail}</p>
          </div>
        </div>

        <div style="background: #2d5a5f; color: white; padding: 15px; text-align: center;">
          <p>VichranTrip | Email: VichranTrip.info@gmail.com | Call: 1800 313 5555</p>
        </div>
      </div>
    `;
  }

  /**
   * Generate enquiry notification email HTML content
   */
  private generateEnquiryEmailContent(enquiry: Enquiry): string {
    return `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <div style="background: #2d5a5f; color: white; padding: 20px; text-align: center;">
          <h1>VichranTrip</h1>
          <h2>New Enquiry Received</h2>
        </div>

        <div style="padding: 20px; background: #f9f9f9;">
          <div style="background: white; padding: 15px; margin: 10px 0; border-left: 4px solid #ffc107;">
            <h4 style="margin-top: 0;">Customer Details</h4>
            <p><strong>Name:</strong> ${enquiry.fullName}</p>
            <p><strong>Email:</strong> ${enquiry.email}</p>
            <p><strong>Phone:</strong> ${enquiry.phone}</p>
            <p><strong>WhatsApp Updates:</strong> ${enquiry.receiveWhatsApp ? 'Yes' : 'No'}</p>
          </div>

          <div style="background: white; padding: 15px; margin: 10px 0; border-left: 4px solid #5eb8c8;">
            <h4 style="margin-top: 0;">Package Interest</h4>
            <p><strong>Package:</strong> ${enquiry.packageName}</p>
            <p><strong>Package ID:</strong> ${enquiry.packageId}</p>
          </div>

          <div style="background: white; padding: 15px; margin: 10px 0; border-left: 4px solid #28a745;">
            <h4 style="margin-top: 0;">Message</h4>
            <p>${enquiry.description}</p>
          </div>

          <div style="background: #e8f4f4; padding: 15px; margin: 10px 0; border-radius: 4px;">
            <p style="margin: 0;"><strong>Enquiry ID:</strong> ${enquiry.id}</p>
            <p style="margin: 5px 0 0 0;"><strong>Submitted:</strong> ${new Date(enquiry.createdAt).toLocaleString('en-IN')}</p>
          </div>

          <div style="background: #fff3cd; padding: 15px; margin: 10px 0; border-radius: 4px;">
            <p style="margin: 0;"><strong>Note:</strong> This is a mock email. In production, this will be sent via EmailJS to ${this.EMAILJS_CONFIG.toEmail}</p>
          </div>
        </div>

        <div style="background: #2d5a5f; color: white; padding: 15px; text-align: center;">
          <p>VichranTrip | Email: VichranTrip.info@gmail.com | Call: 1800 313 5555</p>
        </div>
      </div>
    `;
  }

  /**
   * Format payment option for display
   */
  private formatPaymentOption(option: string): string {
    const options: Record<string, string> = {
      'REGISTRATION': 'Registration Amount Only',
      'FULL': 'Full Payment',
      'CUSTOM': 'Custom Amount'
    };
    return options[option] || option;
  }

  /**
   * Initialize EmailJS (Mock - would be called in production)
   * In real implementation:
   * import emailjs from '@emailjs/browser';
   * emailjs.init(this.EMAILJS_CONFIG.userId);
   */
  initializeEmailJS(): void {
    console.log('📧 EmailJS Mock initialized');
    console.log('Service ID:', this.EMAILJS_CONFIG.serviceId);
    console.log('User ID:', this.EMAILJS_CONFIG.userId);
    console.log('Target Email:', this.EMAILJS_CONFIG.toEmail);
    console.log('Note: This is a mock service. Real emails will be sent in production.');
  }
}
