import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { trigger, state, style, transition, animate, keyframes } from '@angular/animations';
import { EmailService } from '../../services/email.service';
import { Enquiry } from '../../models/enquiry.model';

@Component({
  selector: 'app-floating-action-buttons',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './floating-action-buttons.html',
  styleUrl: './floating-action-buttons.css',
  animations: [
    trigger('fadeIn', [
      transition(':enter', [
        style({ opacity: 0, transform: 'scale(0.8)' }),
        animate('300ms ease-out', style({ opacity: 1, transform: 'scale(1)' }))
      ])
    ])
  ]
})
export class FloatingActionButtons implements OnInit {
  showQuickEnquiry = false;
  enquiryForm = {
    name: '',
    email: '',
    phone: '',
    message: ''
  };
  isSubmitting = false;
  showSuccess = false;

  constructor(
    private router: Router,
    private emailService: EmailService
  ) {}

  ngOnInit(): void {
    // Component initialized
  }

  onBookOnline(): void {
    // Navigate to packages page
    this.router.navigate(['/packages']);
  }

  toggleQuickEnquiry(): void {
    this.showQuickEnquiry = !this.showQuickEnquiry;
    if (!this.showQuickEnquiry) {
      // Reset form when closing
      this.enquiryForm = {
        name: '',
        email: '',
        phone: '',
        message: ''
      };
      this.showSuccess = false;
    }
  }

  onSubmitEnquiry(): void {
    if (!this.enquiryForm.name || !this.enquiryForm.email || !this.enquiryForm.phone) {
      return;
    }

    this.isSubmitting = true;

    // Create enquiry object
    const enquiry: Enquiry = {
      id: `enquiry_${Date.now()}`,
      fullName: this.enquiryForm.name,
      email: this.enquiryForm.email,
      phone: this.enquiryForm.phone,
      packageName: 'Quick Enquiry - General',
      packageId: '',
      description: this.enquiryForm.message || 'No message provided',
      receiveWhatsApp: false,
      createdAt: new Date(),
      status: 'NEW'
    };

    // Store enquiry in localStorage
    const enquiries = JSON.parse(localStorage.getItem('quick-enquiries') || '[]');
    enquiries.push({
      ...enquiry,
      submittedAt: new Date().toISOString()
    });
    localStorage.setItem('quick-enquiries', JSON.stringify(enquiries));

    // Send email notification to VichranTrip.info@gmail.com
    this.emailService.sendEnquiryNotification(enquiry).subscribe({
      next: (response) => {
        if (response.success) {
          console.log('✅ Quick Enquiry email sent successfully');
        } else {
          console.warn('⚠️ Enquiry saved but email failed:', response.message);
        }
        this.isSubmitting = false;
        this.showSuccess = true;

        // Reset form after 3 seconds
        setTimeout(() => {
          this.showSuccess = false;
          this.enquiryForm = {
            name: '',
            email: '',
            phone: '',
            message: ''
          };
          this.showQuickEnquiry = false;
        }, 3000);
      },
      error: (error) => {
        console.error('Error sending enquiry email:', error);
        // Still show success even if email fails
        this.isSubmitting = false;
        this.showSuccess = true;

        setTimeout(() => {
          this.showSuccess = false;
          this.enquiryForm = {
            name: '',
            email: '',
            phone: '',
            message: ''
          };
          this.showQuickEnquiry = false;
        }, 3000);
      }
    });
  }

  closeEnquiry(): void {
    this.showQuickEnquiry = false;
    this.showSuccess = false;
    this.enquiryForm = {
      name: '',
      email: '',
      phone: '',
      message: ''
    };
  }
}

