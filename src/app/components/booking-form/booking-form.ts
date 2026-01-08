import { Component, OnInit, OnDestroy, ChangeDetectorRef, NgZone } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, FormArray, Validators, ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { PackagesDataService } from '../../services/packages-data.service';
import { BookingService } from '../../services/booking.service';
import { EmailService } from '../../services/email.service';
import { TourPackage, Booking, Passenger, PassengerTitle, Gender } from '../../models';
import { Breadcrumb } from '../breadcrumb/breadcrumb';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-booking-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, Breadcrumb],
  templateUrl: './booking-form.html',
  styleUrl: './booking-form.css',
})
export class BookingForm implements OnInit, OnDestroy {
  // Form and package data
  bookingForm!: FormGroup;
  package: TourPackage | null = null;
  departureDate: string = '';
  numberOfPassengers: number = 1;
  
  // Step management - SIMPLIFIED: Just a number, no complex logic
  // Explicitly type as number to avoid literal type inference
  currentStep!: number;
  readonly totalSteps = 5;
  
  // UI state
  submitting = false;
  showSuccessModal = false;
  bookingReference = '';
  isProgressSticky = false;
  
  // Selection state
  selectedRoomOption: string | null = null;
  selectedAddOns: string[] = [];
  
  // Form options
  titles: PassengerTitle[] = ['Mr', 'Ms', 'Mrs', 'Master'];
  genders: Gender[] = ['Male', 'Female', 'Other'];
  
  addOns = [
    { id: 'insurance', name: 'Travel Insurance', price: 500, description: 'Comprehensive travel insurance coverage' },
    { id: 'visa', name: 'Visa Assistance', price: 2000, description: 'Expert visa processing assistance' },
    { id: 'sim', name: 'International SIM Card', price: 1000, description: 'Pre-activated SIM card for your destination' },
    { id: 'guide', name: 'Local Guide', price: 3000, description: 'Experienced local guide for better experience' }
  ];

  private subscriptions = new Subscription();

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private packagesDataService: PackagesDataService,
    private bookingService: BookingService,
    private emailService: EmailService,
    private cdr: ChangeDetectorRef,
    private ngZone: NgZone
  ) {}

  ngOnInit(): void {
    console.log('🔵 ngOnInit() CALLED - Component initializing');
    console.log('🔵 ngOnInit() - currentStep BEFORE init:', this.currentStep);
    
    this.setupStickyProgressBar();
    this.initializeForm();
    
    // Initialize currentStep FIRST (before reading from route)
    this.currentStep = 1;
    console.log('🔵 ngOnInit() - currentStep set to 1:', this.currentStep);
    
    // Read initial data from route ONCE using snapshot
    const params = this.route.snapshot.params;
    const qParams = this.route.snapshot.queryParams;
    
    console.log('🔵 ngOnInit() - URL queryParams:', qParams);
    console.log('🔵 ngOnInit() - URL step param:', qParams['step']);
    
    // Read step from URL ONLY on initial load - set it ONCE
    // After this, step is controlled ONLY by goToStep() method
    if (qParams['step']) {
      const step = Number(qParams['step']);
      console.log('🔵 ngOnInit() - Found step in URL:', step);
      if (step >= 1 && step <= 5) {
        this.currentStep = step;
        console.log('🔵 ngOnInit() - currentStep set from URL:', this.currentStep);
      }
    }
    
    console.log('🔵 ngOnInit() - currentStep FINAL:', this.currentStep);
    
    this.departureDate = qParams['departure'] || '';
    this.numberOfPassengers = +(qParams['passengers'] || 1);
    
    // Load package if slug exists
    if (params['slug']) {
      this.loadPackage(params['slug']);
    }
    
    // DO NOT subscribe to route.params or route.queryParams
    // This causes interference with step management
    // Step is now 100% component-controlled via goToStep()
  }

  ngOnDestroy(): void {
    console.log('🔴 ngOnDestroy() CALLED - Component being destroyed');
    console.log('🔴 ngOnDestroy() - currentStep at destruction:', this.currentStep);
    this.subscriptions.unsubscribe();
  }

  // SIMPLIFIED: Direct step navigation - no complex logic
  nextStep(): void {
    if (this.currentStep >= this.totalSteps) return;
    
    // Handle step 2 skip logic
    if (this.currentStep === 1) {
      const nextStep = 2;
      
      // Skip step 2 if no room options
      if (this.package && (!this.package.roomOptions || this.package.roomOptions.length === 0)) {
        this.goToStep(3);
        return;
      }
      
      // Auto-select if only one room option
      if (this.package?.roomOptions?.length === 1) {
        this.selectedRoomOption = this.package.roomOptions[0].id;
      }
      
      this.goToStep(nextStep);
    } else {
      this.goToStep(this.currentStep + 1);
    }
  }

  previousStep(): void {
    if (this.currentStep <= 1) return;
    
    let prevStep = this.currentStep - 1;
    
    // Skip step 2 when going backwards if no room options
    if (prevStep === 2 && this.package && (!this.package.roomOptions || this.package.roomOptions.length === 0)) {
      prevStep = 1;
    }
    
    this.goToStep(prevStep);
  }

  goToStep(step: number): void {
    if (step < 1 || step > this.totalSteps) return;
    
    console.log('🔄 goToStep() CALLED');
    console.log('🔄 goToStep() - currentStep BEFORE:', this.currentStep);
    console.log('🔄 goToStep() - target step:', step);
    
    // CRITICAL: Set step FIRST, synchronously
    this.currentStep = Number(step);
    console.log('🔄 goToStep() - currentStep AFTER assignment:', this.currentStep);
    console.log('🔄 goToStep() - typeof currentStep:', typeof this.currentStep);
    
    // Force change detection IMMEDIATELY - multiple times to ensure it sticks
    console.log('🔄 goToStep() - Calling markForCheck()');
    this.cdr.markForCheck();
    console.log('🔄 goToStep() - Calling detectChanges()');
    this.cdr.detectChanges();
    console.log('🔄 goToStep() - After detectChanges, currentStep:', this.currentStep);
    
    // Use requestAnimationFrame to ensure DOM update happens
    requestAnimationFrame(() => {
      console.log('🔄 goToStep() - Inside requestAnimationFrame, currentStep:', this.currentStep);
      this.cdr.markForCheck();
      this.cdr.detectChanges();
      console.log('📍 After requestAnimationFrame - currentStep:', this.currentStep, 'isStep(2):', this.isStep(2));
    });
    
    // Update URL AFTER step is set
    console.log('🔄 goToStep() - Starting router.navigate()');
    this.router.navigate([], {
      relativeTo: this.route,
      queryParams: { step: this.currentStep },
      queryParamsHandling: 'merge',
      replaceUrl: true
    }).then(() => {
      console.log('✅ URL updated, currentStep:', this.currentStep);
      console.log('✅ Router navigation complete, checking if component was recreated...');
      // Force change detection again after navigation
      this.cdr.markForCheck();
      this.cdr.detectChanges();
      
      // Final check with another animation frame
      requestAnimationFrame(() => {
        this.cdr.markForCheck();
        this.cdr.detectChanges();
        console.log('🔍 Final check - currentStep:', this.currentStep, 'isStep(2):', this.isStep(2));
      });
    });
  }

  // Helper method for template comparisons - ensures proper type checking
  isStep(step: number): boolean {
    const current = Number(this.currentStep);
    const target = Number(step);
    const result = current === target;
    
    // Debug logging for step 2
    if (step === 2) {
      console.log('🔍 isStep(2) CALLED - currentStep:', this.currentStep, 'type:', typeof this.currentStep);
      console.log('🔍 isStep(2) - current:', current, 'target:', target, 'result:', result);
    }
    
    return result;
  }
  
  // Helper for debug timestamp
  getCurrentTime(): string {
    return new Date().getTime().toString();
  }
  
  // Helper to get type of currentStep for template
  getCurrentStepType(): string {
    return typeof this.currentStep;
  }

  canProceedToNextStep(): boolean {
    switch (this.currentStep) {
      case 1: return !!this.departureDate;
      case 2: return true;
      case 3: return this.bookingForm?.valid || false;
      case 4: return true;
      case 5: return true;
      default: return false;
    }
  }

  loadPackage(slug: string): void {
    this.packagesDataService.getPackageBySlug(slug).subscribe({
      next: (pkg) => {
        if (pkg) {
          this.package = pkg;
          
          // Auto-select room if only one option
          if (pkg.roomOptions && pkg.roomOptions.length === 1) {
            this.selectedRoomOption = pkg.roomOptions[0].id;
          }
          
          // If on step 2 and no room options, skip to step 3
          if (this.currentStep === 2 && (!pkg.roomOptions || pkg.roomOptions.length === 0)) {
            setTimeout(() => this.goToStep(3), 0);
          }
          
          this.cdr.detectChanges();
        }
      },
      error: (error) => {
        console.error('Error loading package:', error);
      }
    });
  }

  initializeForm(): void {
    this.bookingForm = this.fb.group({
      passengers: this.fb.array([
        this.fb.group({
          title: ['Mr', Validators.required],
          firstName: ['', [Validators.required, Validators.minLength(2)]],
          lastName: ['', [Validators.required, Validators.minLength(2)]],
          age: [18, [Validators.required, Validators.min(1), Validators.max(120)]],
          gender: ['Male', Validators.required],
          email: ['', [Validators.required, Validators.email]],
          phone: ['', [Validators.required, Validators.pattern(/^[0-9]{10}$/)]]
        })
      ])
    });
  }

  get passengers(): FormArray {
    return this.bookingForm.get('passengers') as FormArray;
  }

  addPassenger(): void {
    if (this.passengers.length < 10) {
      const passengerGroup = this.fb.group({
        title: ['Mr', Validators.required],
        firstName: ['', [Validators.required, Validators.minLength(2)]],
        lastName: ['', [Validators.required, Validators.minLength(2)]],
        age: [18, [Validators.required, Validators.min(1), Validators.max(120)]],
        gender: ['Male', Validators.required],
        email: ['', [Validators.required, Validators.email]],
        phone: ['', [Validators.required, Validators.pattern(/^[0-9]{10}$/)]]
      });
      this.passengers.push(passengerGroup);
    }
  }

  removePassenger(index: number): void {
    if (this.passengers.length > 1) {
      this.passengers.removeAt(index);
    }
  }

  toggleAddOn(addOnId: string): void {
    const index = this.selectedAddOns.indexOf(addOnId);
    if (index > -1) {
      this.selectedAddOns.splice(index, 1);
    } else {
      this.selectedAddOns.push(addOnId);
    }
  }

  get totalAmount(): number {
    if (!this.package) return 0;
    return this.package.basePrice * this.numberOfPassengers;
  }

  get totalWithGST(): number {
    return this.totalAmount * 1.05;
  }

  get selectedRoomName(): string {
    if (!this.package || !this.selectedRoomOption) return '';
    const room = this.package.roomOptions?.find(r => r.id === this.selectedRoomOption);
    return room?.name || '';
  }

  get addOnsTotal(): number {
    if (!this.selectedAddOns || this.selectedAddOns.length === 0) return 0;
    return this.selectedAddOns.reduce((total, addOnId) => {
      const addOn = this.addOns.find(a => a.id === addOnId);
      return total + (addOn?.price || 0);
    }, 0);
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
        roomConfiguration: {
          optionId: this.selectedRoomOption || this.package.roomOptions?.[0]?.id || 'default',
          rooms: Math.ceil(this.numberOfPassengers / 2),
          description: this.package.roomOptions?.find(r => r.id === this.selectedRoomOption)?.name || 
                       this.package.roomOptions?.[0]?.name || 'Standard Room',
          totalCost: this.totalAmount
        },
        paymentOption: 'FULL',
        convenienceFee: 0,
        gstRequired: false,
        termsAccepted: true,
        communicationConsent: true,
        currentStep: 1,
        completedSteps: [1]
      };

      this.bookingService.createBooking(booking).subscribe({
        next: (success) => {
          if (success) {
            this.bookingReference = booking.bookingReference;
            this.emailService.sendBookingConfirmation(booking).subscribe({
              next: (emailResponse) => {
                if (emailResponse.success) {
                  console.log('✅ Booking confirmation email sent');
                }
              },
              error: (error) => {
                console.error('Email sending failed:', error);
              }
            });
            this.showSuccessModal = true;
            this.submitting = false;
          } else {
            alert('Booking failed. Please try again.');
            this.submitting = false;
          }
        },
        error: (error) => {
          console.error('Booking error:', error);
          alert('An error occurred. Please try again.');
          this.submitting = false;
        }
      });
    }
  }

  onSearch(searchParams: any): void {
    this.router.navigate(['/packages'], { queryParams: searchParams });
  }

  openLoginModal(): void {
    console.log('Open login modal');
  }

  closeSuccessModal(): void {
    this.showSuccessModal = false;
  }

  viewMyBookings(): void {
    this.router.navigate(['/my-bookings']);
  }

  setupStickyProgressBar(): void {
    if (typeof window !== 'undefined') {
      window.addEventListener('scroll', () => {
        const breadcrumb = document.querySelector('.breadcrumb-nav');
        const progressBar = document.querySelector('.booking-progress-premium');
        
        if (breadcrumb && progressBar) {
          const breadcrumbRect = breadcrumb.getBoundingClientRect();
          const shouldBeSticky = breadcrumbRect.bottom <= 0;
          this.isProgressSticky = shouldBeSticky;
          this.cdr.markForCheck();
        }
      });
    }
  }
}
