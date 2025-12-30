import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, FormArray, Validators, ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { PackageService } from '../../services/package.service';
import { BookingService } from '../../services/booking.service';
import { TourPackage, Booking, Passenger, PassengerTitle, Gender } from '../../models';

@Component({
  selector: 'app-booking-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './booking-form.html',
  styleUrl: './booking-form.css'
})
export class BookingForm implements OnInit {
  bookingForm!: FormGroup;
  package: TourPackage | null = null;
  departureDate: string = '';
  numberOfPassengers: number = 1;
  submitting = false;

  titles: PassengerTitle[] = ['Mr', 'Ms', 'Mrs', 'Master'];
  genders: Gender[] = ['Male', 'Female', 'Other'];

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private packageService: PackageService,
    private bookingService: BookingService
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      const packageId = params['id'];
      this.route.queryParams.subscribe(qParams => {
        this.departureDate = qParams['departure'];
        this.numberOfPassengers = +qParams['passengers'] || 1;

        if (packageId) {
          this.loadPackage(packageId);
        }
      });
    });
  }

  loadPackage(id: string): void {
    this.packageService.getPackageById(id).subscribe({
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
        departureCity: this.package.departures[0].departureCity,
        passengers: this.bookingForm.value.passengers as Passenger[],
        totalAmount: this.totalAmount,
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
            alert(`Booking confirmed! Your booking reference is: ${booking.bookingReference}`);
            this.router.navigate(['/my-bookings']);
          }
          this.submitting = false;
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
}
