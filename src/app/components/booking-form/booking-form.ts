import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, FormArray, Validators, ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { PackagesDataService } from '../../services/packages-data.service';
import { BookingService } from '../../services/booking.service';
import { EmailService } from '../../services/email.service';
import { TourPackage, Booking, Passenger, PassengerTitle, Gender } from '../../models';
import { Breadcrumb } from '../breadcrumb/breadcrumb';

@Component({
  selector: 'app-booking-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, Breadcrumb],
  templateUrl: './booking-form.html',
  styleUrl: './booking-form.css'
})
export class BookingForm implements OnInit {
  bookingForm!: FormGroup;
  package: TourPackage | null = null;
  departureDate: string = '';
  numberOfPassengers: number = 1;
  submitting = false;
  showSuccessModal = false;
  bookingReference = '';

  titles: PassengerTitle[] = ['Mr', 'Ms', 'Mrs', 'Master'];
  genders: Gender[] = ['Male', 'Female', 'Other'];

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private packagesDataService: PackagesDataService,
    private bookingService: BookingService,
    private emailService: EmailService
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      const slug = params['slug'];
      this.route.queryParams.subscribe(qParams => {
        this.departureDate = qParams['departure'];
        this.numberOfPassengers = +qParams['passengers'] || 1;

        if (slug) {
          this.loadPackage(slug);
        }
      });
    });
  }

  loadPackage(slug: string): void {
    this.packagesDataService.getPackageBySlug(slug).subscribe({
      next: (pkg) => {
        if (pkg) {
          this.package = pkg;
          this.initializeForm();
        }
      }
    });
  }

  initializeForm(): void {
    this.bookingForm = this.fb.group({
      passengers: this.fb.array([])
    });

    for (let i = 0; i < this.numberOfPassengers; i++) {
      this.addPassenger();
    }
  }

  get passengers(): FormArray {
    return this.bookingForm.get('passengers') as FormArray;
  }

  createPassengerForm(): FormGroup {
    return this.fb.group({
      title: ['Mr', Validators.required],
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      age: ['', [Validators.required, Validators.min(1), Validators.max(120)]],
      gender: ['Male', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      phone: ['', [Validators.required, Validators.pattern(/^[0-9]{10}$/)]]
    });
  }

  addPassenger(): void {
    this.passengers.push(this.createPassengerForm());
  }

  removePassenger(index: number): void {
    if (this.passengers.length > 1) {
      this.passengers.removeAt(index);
    }
  }

  get totalAmount(): number {
    if (!this.package) return 0;
    return this.package.basePrice * this.numberOfPassengers;
  }

  get totalWithGST(): number {
    return this.totalAmount * 1.05; // 5% GST
  }

  onSubmit(): void {
    if (this.bookingForm.valid && this.package) {
      this.submitting = true;

      const booking: Booking = {
        id: Date.now().toString(),
        bookingReference: this.bookingService.generateBookingReference(),
        packageId: this.package.id,
        packageName: this.package.name,
        packageImage: this.package.imageUrl,
        departureDate: this.departureDate,
        departureCity: this.package.departures && this.package.departures.length > 0 
          ? this.package.departures[0].departureCity 
          : (this.package.datePricing && this.package.datePricing.length > 0 
            ? this.package.datePricing[0].departureCity 
            : 'Mumbai'),
        passengers: this.bookingForm.value.passengers as Passenger[],
        totalAmount: this.totalWithGST,
        status: 'CONFIRMED',
        createdAt: new Date(),
        // Room configuration - default to first room option if available
        roomConfiguration: {
          optionId: this.package.roomOptions?.[0]?.id || 'default',
          rooms: Math.ceil(this.numberOfPassengers / 2),
          description: this.package.roomOptions?.[0]?.name || 'Standard Room',
          totalCost: this.totalAmount
        },
        // Payment details - default to full payment
        paymentOption: 'FULL',
        convenienceFee: 0,
        // GST - not required by default
        gstRequired: false,
        // Agreement flags
        termsAccepted: true,
        communicationConsent: true,
        // Step tracking - simple booking is single step
        currentStep: 1,
        completedSteps: [1]
      };

      this.bookingService.createBooking(booking).subscribe({
        next: (success) => {
          if (success) {
            this.bookingReference = booking.bookingReference;
            // Send confirmation email
            this.emailService.sendBookingConfirmation(booking).subscribe({
              next: (emailResponse) => {
                if (emailResponse.success) {
                  console.log('✅ Booking confirmation email sent');
                }
              },
              error: (error) => {
                console.error('Email sending failed:', error);
                // Continue with booking even if email fails
              }
            });
            // Show success modal
            this.showSuccessModal = true;
            this.submitting = false;
          } else {
            alert('Booking failed. Please try again.');
            this.submitting = false;
          }
        },
        error: () => {
          alert('Booking failed. Please try again.');
          this.submitting = false;
        }
      });
    } else {
      alert('Please fill all required fields correctly.');
    }
  }

  closeSuccessModal(): void {
    this.showSuccessModal = false;
    // Just close the modal, don't navigate
  }

  viewMyBookings(): void {
    this.showSuccessModal = false;
    // Navigate to bookings page
    this.router.navigate(['/my-bookings']);
  }
}
