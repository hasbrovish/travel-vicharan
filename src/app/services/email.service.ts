import { Injectable } from '@angular/core';
import { Observable, of, delay, from } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { Booking } from '../models/booking.model';
import { Enquiry } from '../models/enquiry.model';
import emailjs from '@emailjs/browser';

export interface EmailResponse {
  success: boolean;
  message: string;
  emailId?: string;
}

@Injectable({
  providedIn: 'root'
})
export class EmailService {
  // EmailJS configuration
  // 📧 SETUP INSTRUCTIONS: See EMAILJS_SETUP_COMPLETE_GUIDE.md
  // Get these from: https://www.emailjs.com/
  private readonly EMAILJS_CONFIG = {
    serviceId: 'YOUR_SERVICE_ID_HERE', // ← Step 2: Get from Email Services
    templateId_booking: 'YOUR_BOOKING_TEMPLATE_ID', // ← Step 3: Booking template ID
    templateId_newsletter: 'YOUR_NEWSLETTER_TEMPLATE_ID', // ← Step 3: Newsletter template ID
    templateId_enquiry: 'YOUR_ENQUIRY_TEMPLATE_ID', // ← Step 3: Enquiry template ID
    userId: 'YOUR_PUBLIC_KEY_HERE', // ← Step 4: Get from Account → API Keys
    toEmail: 'VichranTrip.info@gmail.com'
  };

  // Enable/disable real email sending
  // ✅ Set to true after completing EmailJS setup (see guide above)
  private readonly USE_REAL_EMAILS = false; // ← Change to true after setup

  constructor() {
    if (this.USE_REAL_EMAILS) {
      this.initializeEmailJS();
    }
  }

  /**
   * Send booking confirmation email
   * Uses EmailJS if configured, otherwise logs to console (mock mode)
   */
  sendBookingConfirmation(booking: Booking): Observable<EmailResponse> {
    const leadPassenger = booking.passengers[0];

    if (this.USE_REAL_EMAILS) {
      // Real EmailJS implementation
      const templateParams = {
        to_email: leadPassenger.email,
        to_name: `${leadPassenger.firstName} ${leadPassenger.lastName}`,
        booking_reference: booking.bookingReference,
        package_name: booking.packageName,
        departure_date: booking.departureDate,
        departure_city: booking.departureCity,
        total_amount: `₹${booking.totalAmount.toLocaleString('en-IN')}`,
        number_of_passengers: booking.passengers.length.toString(),
        room_configuration: booking.roomConfiguration.description,
        payment_option: this.formatPaymentOption(booking.paymentOption),
        convenience_fee: `₹${booking.convenienceFee.toLocaleString('en-IN')}`,
        registration_amount: booking.registrationAmount ? `₹${booking.registrationAmount.toLocaleString('en-IN')}` : 'N/A',
        balance_amount: booking.balanceAmount ? `₹${booking.balanceAmount.toLocaleString('en-IN')}` : 'N/A',
        reply_to: this.EMAILJS_CONFIG.toEmail
      };

      return from(
        emailjs.send(
          this.EMAILJS_CONFIG.serviceId,
          this.EMAILJS_CONFIG.templateId_booking,
          templateParams,
          this.EMAILJS_CONFIG.userId
        )
      ).pipe(
        map((response) => ({
          success: true,
          message: 'Booking confirmation email sent successfully',
          emailId: response.text
        })),
        catchError((error) => {
          console.error('EmailJS Error:', error);
          return of({
            success: false,
            message: 'Failed to send email. Please contact support.',
            emailId: undefined
          });
        })
      );
    } else {
      // Mock mode - log to console
      console.log('📧 [MOCK MODE] Booking Confirmation Email:');
      console.log('To:', leadPassenger.email);
      console.log('Booking Reference:', booking.bookingReference);
      console.log('Package:', booking.packageName);
      console.log('Total Amount:', booking.totalAmount);
      console.log('⚠️  Real emails disabled. Enable by setting USE_REAL_EMAILS = true and configuring EmailJS.');

      return of({
        success: true,
        message: 'Email logged (mock mode). Configure EmailJS to send real emails.',
        emailId: `mock_${Date.now()}`
      }).pipe(delay(500));
    }
  }

  /**
   * Send enquiry notification email
   * Uses EmailJS if configured, otherwise logs to console (mock mode)
   */
  sendEnquiryNotification(enquiry: Enquiry): Observable<EmailResponse> {
    if (this.USE_REAL_EMAILS) {
      // Real EmailJS implementation
      const templateParams = {
        to_email: this.EMAILJS_CONFIG.toEmail, // Send to VichranTrip.info@gmail.com
        to_name: 'VichranTrip Team',
        from_name: enquiry.fullName,
        from_email: enquiry.email,
        from_phone: enquiry.phone,
        package_name: enquiry.packageName,
        package_id: enquiry.packageId || 'N/A',
        enquiry_message: enquiry.description || 'No message provided',
        enquiry_id: enquiry.id,
        enquiry_date: new Date(enquiry.createdAt).toLocaleString('en-IN'),
        reply_to: enquiry.email
      };

      return from(
        emailjs.send(
          this.EMAILJS_CONFIG.serviceId,
          this.EMAILJS_CONFIG.templateId_enquiry,
          templateParams,
          this.EMAILJS_CONFIG.userId
        )
      ).pipe(
        map((response) => ({
          success: true,
          message: 'Enquiry notification email sent successfully',
          emailId: response.text
        })),
        catchError((error) => {
          console.error('EmailJS Error:', error);
          return of({
            success: false,
            message: 'Failed to send email. Enquiry saved locally.',
            emailId: undefined
          });
        })
      );
    } else {
      // Mock mode - log to console
      console.log('📧 [MOCK MODE] Enquiry Notification Email:');
      console.log('To:', this.EMAILJS_CONFIG.toEmail);
      console.log('From:', enquiry.fullName, '-', enquiry.email);
      console.log('Phone:', enquiry.phone);
      console.log('Package:', enquiry.packageName);
      console.log('Message:', enquiry.description);
      console.log('⚠️  Real emails disabled. Enable by setting USE_REAL_EMAILS = true and configuring EmailJS.');

      const emailContent = this.generateEnquiryEmailContent(enquiry);
      console.log('Email Content:', emailContent);

      return of({
        success: true,
        message: 'Email logged (mock mode). Configure EmailJS to send real emails.',
        emailId: `mock_${Date.now()}`
      }).pipe(delay(500));
    }
  }

  /**
   * Send newsletter welcome email with discount code
   * Uses EmailJS if configured, otherwise logs to console (mock mode)
   */
  sendNewsletterWelcomeEmail(email: string, discountCode: string): Observable<EmailResponse> {
    const validUntil = new Date();
    validUntil.setDate(validUntil.getDate() + 90);

    if (this.USE_REAL_EMAILS) {
      // Real EmailJS implementation
      const templateParams = {
        to_email: email,
        to_name: email.split('@')[0], // Use email prefix as name
        discount_code: discountCode,
        discount_percent: '10',
        valid_until: validUntil.toLocaleDateString('en-IN', { year: 'numeric', month: 'long', day: 'numeric' }),
        website_url: window.location.origin,
        reply_to: this.EMAILJS_CONFIG.toEmail
      };

      return from(
        emailjs.send(
          this.EMAILJS_CONFIG.serviceId,
          this.EMAILJS_CONFIG.templateId_newsletter,
          templateParams,
          this.EMAILJS_CONFIG.userId
        )
      ).pipe(
        map((response) => ({
          success: true,
          message: 'Newsletter welcome email sent successfully',
          emailId: response.text
        })),
        catchError((error) => {
          console.error('EmailJS Error:', error);
          return of({
            success: false,
            message: 'Failed to send email. Your discount code is still valid.',
            emailId: undefined
          });
        })
      );
    } else {
      // Mock mode - log to console
      console.log('📧 [MOCK MODE] Newsletter Welcome Email:');
      console.log('To:', email);
      console.log('Discount Code:', discountCode);
      console.log('Valid Until:', validUntil.toLocaleDateString());
      console.log('⚠️  Real emails disabled. Enable by setting USE_REAL_EMAILS = true and configuring EmailJS.');

      return of({
        success: true,
        message: 'Email logged (mock mode). Configure EmailJS to send real emails.',
        emailId: `mock_${Date.now()}`
      }).pipe(delay(500));
    }
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
   * Generate newsletter welcome email HTML content
   */
  private generateNewsletterWelcomeEmailContent(email: string, discountCode: string): string {
    const validUntil = new Date();
    validUntil.setDate(validUntil.getDate() + 90); // 90 days from now

    return `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <div style="background: linear-gradient(135deg, #059669 0%, #10b981 100%); color: white; padding: 30px; text-align: center; border-radius: 10px 10px 0 0;">
          <h1 style="margin: 0; font-size: 2rem;">🎉 Welcome to VichranTrip!</h1>
          <p style="margin: 10px 0 0 0; font-size: 1.1rem;">Thank You for Subscribing</p>
        </div>

        <div style="padding: 30px; background: #f9f9f9;">
          <div style="background: white; padding: 25px; margin-bottom: 20px; border-radius: 10px; border-left: 5px solid #10b981;">
            <h2 style="color: #059669; margin-top: 0;">🎁 Your Exclusive Discount Code</h2>
            <div style="background: linear-gradient(135deg, #d1fae5 0%, #a7f3d0 100%); padding: 20px; border-radius: 10px; text-align: center; margin: 20px 0; border: 2px solid #10b981;">
              <p style="margin: 0 0 10px 0; color: #047857; font-weight: 600; font-size: 0.9rem;">USE THIS CODE AT CHECKOUT</p>
              <h1 style="margin: 0; color: #059669; font-size: 2.5rem; letter-spacing: 5px; font-family: 'Courier New', monospace;">${discountCode}</h1>
              <p style="margin: 10px 0 0 0; color: #047857; font-weight: 600;">Get 10% OFF on Your First Booking!</p>
            </div>
            <p style="color: #64748b; margin: 15px 0 0 0;">
              <strong>Valid until:</strong> ${validUntil.toLocaleDateString('en-IN', { year: 'numeric', month: 'long', day: 'numeric' })}
            </p>
          </div>

          <div style="background: white; padding: 25px; margin-bottom: 20px; border-radius: 10px;">
            <h3 style="color: #059669; margin-top: 0;">✨ What You'll Get:</h3>
            <ul style="color: #334155; line-height: 2;">
              <li>✅ <strong>Early Access</strong> to new travel packages before they're released</li>
              <li>✅ <strong>Exclusive Seasonal Offers</strong> with special discounts</li>
              <li>✅ <strong>Travel Tips & Guides</strong> to make your journey memorable</li>
              <li>✅ <strong>Priority Support</strong> for all your travel queries</li>
            </ul>
          </div>

          <div style="background: linear-gradient(135deg, #f0fdf4 0%, #dcfce7 100%); padding: 20px; border-radius: 10px; border: 2px solid #86efac;">
            <h3 style="color: #047857; margin-top: 0;">🚀 Ready to Start Your Journey?</h3>
            <p style="color: #065f46; margin-bottom: 20px;">Use your discount code on any package and save 10% on your first booking!</p>
            <a href="https://yourwebsite.com/packages" style="display: inline-block; background: linear-gradient(135deg, #059669 0%, #10b981 100%); color: white; padding: 15px 30px; text-decoration: none; border-radius: 8px; font-weight: 600; text-align: center;">
              Explore Packages Now →
            </a>
          </div>

          <div style="background: #fff3cd; padding: 15px; margin: 20px 0; border-radius: 8px; border-left: 4px solid #ffc107;">
            <p style="margin: 0; color: #856404; font-size: 0.9rem;">
              <strong>Note:</strong> This is a mock email. In production, this will be sent via EmailJS to ${email}
            </p>
          </div>
        </div>

        <div style="background: #1e5558; color: white; padding: 20px; text-align: center; border-radius: 0 0 10px 10px;">
          <p style="margin: 0 0 10px 0;">VichranTrip | Your Trusted Travel Partner</p>
          <p style="margin: 0; font-size: 0.9rem; opacity: 0.9;">
            Email: VichranTrip.info@gmail.com | Call: 1800 313 5555
          </p>
          <p style="margin: 10px 0 0 0; font-size: 0.85rem; opacity: 0.8;">
            <a href="#" style="color: #86efac;">Unsubscribe</a> | 
            <a href="#" style="color: #86efac;">Privacy Policy</a>
          </p>
        </div>
      </div>
    `;
  }

  /**
   * Initialize EmailJS
   */
  private initializeEmailJS(): void {
    try {
      emailjs.init(this.EMAILJS_CONFIG.userId);
      console.log('✅ EmailJS initialized successfully');
      console.log('Service ID:', this.EMAILJS_CONFIG.serviceId);
      console.log('User ID:', this.EMAILJS_CONFIG.userId);
    } catch (error) {
      console.error('❌ EmailJS initialization failed:', error);
      console.log('⚠️  Falling back to mock mode');
    }
  }
}
