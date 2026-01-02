import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { EmailService } from '../../services/email.service';

export interface NewsletterSubscription {
  email: string;
  discountCode: string;
  subscribedAt: Date;
  discountPercent: number;
  validUntil: Date;
}

@Component({
  selector: 'app-newsletter-signup',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './newsletter-signup.html',
  styleUrl: './newsletter-signup.css'
})
export class NewsletterSignup {
  email = '';
  isSubmitting = false;
  showSuccess = false;
  showError = false;
  errorMessage = '';
  discountCode = '';

  constructor(private emailService: EmailService) {}

  onSubmit(): void {
    if (!this.isValidEmail(this.email)) {
      this.showError = true;
      this.errorMessage = 'Please enter a valid email address';
      return;
    }

    this.isSubmitting = true;
    this.showError = false;

    // Check if already subscribed
    const subscribers = JSON.parse(localStorage.getItem('newsletter-subscribers') || '[]');
    const existingSubscriber = subscribers.find((sub: NewsletterSubscription) => sub.email === this.email);
    
    if (existingSubscriber) {
      this.showError = true;
      this.errorMessage = 'This email is already subscribed';
      this.isSubmitting = false;
      return;
    }

    // Generate discount code
    const discountCode = this.generateDiscountCode();
    const subscription: NewsletterSubscription = {
      email: this.email,
      discountCode: discountCode,
      subscribedAt: new Date(),
      discountPercent: 10,
      validUntil: new Date(Date.now() + 90 * 24 * 60 * 60 * 1000) // 90 days from now
    };

    // Store subscription
    subscribers.push(subscription);
    localStorage.setItem('newsletter-subscribers', JSON.stringify(subscribers));

    // Send welcome email with discount code
    this.emailService.sendNewsletterWelcomeEmail(this.email, discountCode).subscribe({
      next: (response) => {
        if (response.success) {
          this.discountCode = discountCode;
          this.showSuccess = true;
          this.isSubmitting = false;
          this.email = '';

          // Hide success message after 8 seconds
          setTimeout(() => {
            this.showSuccess = false;
            this.discountCode = '';
          }, 8000);
        } else {
          this.showError = true;
          this.errorMessage = 'Subscription successful, but email could not be sent. Please check your email later.';
          this.isSubmitting = false;
        }
      },
      error: (error) => {
        // Still show success if subscription was saved, but email failed
        this.discountCode = discountCode;
        this.showSuccess = true;
        this.isSubmitting = false;
        this.email = '';
        console.error('Email sending failed:', error);
        
        setTimeout(() => {
          this.showSuccess = false;
          this.discountCode = '';
        }, 8000);
      }
    });
  }

  private generateDiscountCode(): string {
    const prefix = 'VT';
    const randomNum = Math.floor(1000 + Math.random() * 9000);
    const year = new Date().getFullYear().toString().slice(-2);
    return `${prefix}${year}${randomNum}`;
  }

  private isValidEmail(email: string): boolean {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }
}
