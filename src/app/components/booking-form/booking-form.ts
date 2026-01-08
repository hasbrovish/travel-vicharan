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
  styleUrl: './booking-form.css',
})
export class BookingForm implements OnInit {
  bookingForm!: FormGroup;
  package: TourPackage | null = null;
  departureDate: string = '';
  numberOfPassengers: number = 1;
  submitting = false;
  showSuccessModal = false;
  bookingReference = '';
  currentStep: number = 1;
  totalSteps: number = 5;
  selectedRoomOption: string | null = null;
  selectedAddOns: string[] = [];
  isProgressSticky = false; // Track if progress bar should be sticky

  titles: PassengerTitle[] = ['Mr', 'Ms', 'Mrs', 'Master'];
  genders: Gender[] = ['Male', 'Female', 'Other'];
  
  addOns = [
    { id: 'insurance', name: 'Travel Insurance', price: 500, description: 'Comprehensive travel insurance coverage' },
    { id: 'visa', name: 'Visa Assistance', price: 2000, description: 'Expert visa processing assistance' },
    { id: 'sim', name: 'International SIM Card', price: 1000, description: 'Pre-activated SIM card for your destination' },
    { id: 'guide', name: 'Local Guide', price: 3000, description: 'Experienced local guide for better experience' }
  ];

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private packagesDataService: PackagesDataService,
    private bookingService: BookingService,
    private emailService: EmailService
  ) {}

  ngOnInit(): void {
    // Setup scroll listener for sticky progress bar
    this.setupStickyProgressBar();
    this.route.params.subscribe(params => {
      const slug = params['slug'];
      this.route.queryParams.subscribe(qParams => {
        this.departureDate = qParams['departure'];
        this.numberOfPassengers = +qParams['passengers'] || 1;
        const stepValue = qParams['step'];
        this.currentStep = stepValue ? +stepValue : 1;

        if (slug) {
          this.loadPackage(slug);
        }
      });
    });
  }

  nextStep(): void {
    if (this.canProceedToNextStep()) {
      if (this.currentStep < this.totalSteps) {
        let nextStep: number = this.currentStep + 1;
        
        // Skip step 2 (room selection) if no room options available
        if (nextStep === 2 && (!this.package?.roomOptions || this.package.roomOptions.length === 0)) {
          nextStep = 3;
        }
        
        // Auto-select room if only one option exists when moving to step 2
        if (nextStep === 2 && this.package?.roomOptions && this.package.roomOptions.length === 1) {
          this.selectedRoomOption = this.package.roomOptions[0].id;
        }
        
        this.currentStep = nextStep;
        this.updateURL();
      }
    }
  }

  previousStep(): void {
    if (this.currentStep > 1) {
      let prevStep: number = this.currentStep - 1;
      
      // Skip step 2 (room selection) if no room options available when going backwards
      if (prevStep === 2 && (!this.package?.roomOptions || this.package.roomOptions.length === 0)) {
        prevStep = 1;
      }
      
      this.currentStep = prevStep;
      this.updateURL();
    }
  }

  goToStep(step: number): void {
    if (step >= 1 && step <= this.totalSteps) {
      // Skip step 2 if no room options available
      if (step === 2 && (!this.package?.roomOptions || this.package.roomOptions.length === 0)) {
        // If trying to go to step 2 but no room options, go to step 3 instead
        if (step < this.currentStep) {
          // Going backwards, skip to step 1
          this.currentStep = 1;
        } else {
          // Going forwards, skip to step 3
          this.currentStep = 3;
        }
      } else {
        this.currentStep = step;
      }
      this.updateURL();
    }
  }

  getCurrentStep(): number {
    return this.currentStep;
  }

  canProceedToNextStep(): boolean {
    switch (this.currentStep) {
      case 1: return !!this.departureDate;
      case 2: 
        // Allow proceeding if no room options or a room is selected
        if (!this.package?.roomOptions || this.package.roomOptions.length === 0) {
          return true; // Skip room selection if no options
        }
        return !!this.selectedRoomOption;
      case 3: return this.bookingForm?.valid || false;
      case 4: return true; // Add-ons optional
      case 5: return true;
      default: return false;
    }
  }

  updateURL(): void {
    this.router.navigate([], {
      relativeTo: this.route,
      queryParams: { step: this.currentStep },
      queryParamsHandling: 'merge'
    });
  }

  toggleAddOn(addOnId: string): void {
    const index = this.selectedAddOns.indexOf(addOnId);
    if (index > -1) {
      this.selectedAddOns.splice(index, 1);
    } else {
      this.selectedAddOns.push(addOnId);
    }
  }

  get addOnsTotal(): number {
    return this.addOns
      .filter(addon => this.selectedAddOns.includes(addon.id))
      .reduce((sum, addon) => sum + addon.price, 0);
  }

  get selectedRoomName(): string {
    if (!this.package || !this.selectedRoomOption) {
      return 'Standard';
    }
    const room = this.package.roomOptions.find(r => r.id === this.selectedRoomOption);
    return room?.name || 'Standard';
  }

  loadPackage(slug: string): void {
    this.packagesDataService.getPackageBySlug(slug).subscribe({
      next: (pkg) => {
        if (pkg) {
          this.package = pkg;
          this.initializeForm();
          
          // Auto-select first room option if available and only one option exists
          if (this.package.roomOptions && this.package.roomOptions.length > 0) {
            if (this.package.roomOptions.length === 1) {
              // Auto-select the only room option
              this.selectedRoomOption = this.package.roomOptions[0].id;
            } else if (!this.selectedRoomOption && this.currentStep === 2) {
              // Pre-select first room option when on step 2
              this.selectedRoomOption = this.package.roomOptions[0].id;
            }
          }
          
          // If no room options and we're on step 2, auto-advance to step 3
          if ((!this.package.roomOptions || this.package.roomOptions.length === 0) && this.currentStep === 2) {
            this.currentStep = 3;
            this.updateURL();
          }
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
        addOns: this.selectedAddOns,
        status: 'CONFIRMED',
        createdAt: new Date(),
        // Room configuration - use selected room option
        roomConfiguration: {
          optionId: this.selectedRoomOption || this.package.roomOptions?.[0]?.id || 'default',
          rooms: Math.ceil(this.numberOfPassengers / 2),
          description: this.package.roomOptions?.find(r => r.id === this.selectedRoomOption)?.name || 
                       this.package.roomOptions?.[0]?.name || 'Standard Room',
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

  // Setup sticky progress bar - becomes sticky only after breadcrumb scrolls out
  setupStickyProgressBar(): void {
    // Use setTimeout to ensure DOM is ready
    setTimeout(() => {
      const progressBar = document.querySelector('.booking-progress-premium');
      const breadcrumb = document.querySelector('.breadcrumb-nav');
      
      if (!progressBar || !breadcrumb) return;

      const checkSticky = () => {
        const breadcrumbRect = breadcrumb.getBoundingClientRect();
        const headerHeight = window.innerWidth > 992 ? 72 : 64; // Header height (desktop vs mobile)
        
        // Become sticky only when breadcrumb has scrolled past the top
        this.isProgressSticky = breadcrumbRect.bottom <= headerHeight;
      };

      // Check on scroll
      window.addEventListener('scroll', checkSticky, { passive: true });
      // Initial check
      checkSticky();
      // Check on resize
      window.addEventListener('resize', checkSticky, { passive: true });
    }, 100);
  }
}
