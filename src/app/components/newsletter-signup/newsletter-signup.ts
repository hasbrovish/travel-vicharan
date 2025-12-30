import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

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

  onSubmit(): void {
    if (!this.isValidEmail(this.email)) {
      this.showError = true;
      this.errorMessage = 'Please enter a valid email address';
      return;
    }

    this.isSubmitting = true;
    this.showError = false;

    // Simulate API call
    setTimeout(() => {
      // Store in localStorage
      const subscribers = JSON.parse(localStorage.getItem('newsletter-subscribers') || '[]');
      
      if (subscribers.includes(this.email)) {
        this.showError = true;
        this.errorMessage = 'This email is already subscribed';
        this.isSubmitting = false;
        return;
      }

      subscribers.push(this.email);
      localStorage.setItem('newsletter-subscribers', JSON.stringify(subscribers));

      this.showSuccess = true;
      this.isSubmitting = false;
      this.email = '';

      // Hide success message after 5 seconds
      setTimeout(() => {
        this.showSuccess = false;
      }, 5000);
    }, 1000);
  }

  private isValidEmail(email: string): boolean {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }
}
