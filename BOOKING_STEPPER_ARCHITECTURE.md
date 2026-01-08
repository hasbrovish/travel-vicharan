# Booking Stepper Architecture & Logic Flow

## 📁 File Structure

```
travel-booking/
├── src/
│   ├── app/
│   │   ├── components/
│   │   │   └── booking-form/
│   │   │       ├── booking-form.ts          # Component logic & state management
│   │   │       ├── booking-form.html        # Template with stepper UI
│   │   │       └── booking-form.css        # Styling for stepper & steps
│   │   ├── services/
│   │   │   ├── packages-data.service.ts     # Loads package data
│   │   │   ├── booking.service.ts          # Handles booking creation
│   │   │   └── email.service.ts            # Sends confirmation emails
│   │   ├── models/
│   │   │   ├── tour-package.model.ts        # TourPackage interface
│   │   │   └── booking.model.ts            # Booking interface
│   │   └── app.routes.ts                    # Route: /booking/:slug
│   └── styles/
│       └── _design-tokens.scss             # Design tokens (colors, spacing)
```

---

## 🔄 Complete Logic Flow

### **1. Component Initialization (ngOnInit)**

```
User navigates to: /booking/goa-beach-escape-4-days-3-nights?departure=2025-01-17&passengers=1&step=1
    ↓
Angular Router matches route: { path: 'booking/:slug', component: BookingForm }
    ↓
BookingForm component created
    ↓
ngOnInit() executes:
    1. setupStickyProgressBar()     → Sets up scroll listener for sticky header
    2. initializeForm()              → Creates ReactiveForm with FormArray for passengers
    3. currentStep = 1               → Initialize step to 1
    4. Read route.snapshot.queryParams:
       - step: 1 (if present, overwrites currentStep)
       - departure: "2025-01-17"
       - passengers: 1
    5. Read route.snapshot.params:
       - slug: "goa-beach-escape-4-days-3-nights"
    6. loadPackage(slug)             → Fetches package data from service
```

**Key Code:**
```typescript
// booking-form.ts:65-107
ngOnInit(): void {
  this.setupStickyProgressBar();
  this.initializeForm();
  this.currentStep = 1;  // Default step
  
  const params = this.route.snapshot.params;
  const qParams = this.route.snapshot.queryParams;
  
  // Read step from URL (only on initial load)
  if (qParams['step']) {
    const step = Number(qParams['step']);
    if (step >= 1 && step <= 5) {
      this.currentStep = step;
    }
  }
  
  this.departureDate = qParams['departure'] || '';
  this.numberOfPassengers = +(qParams['passengers'] || 1);
  
  if (params['slug']) {
    this.loadPackage(params['slug']);
  }
}
```

---

### **2. Package Loading (loadPackage)**

```
loadPackage(slug) called
    ↓
packagesDataService.getPackageBySlug(slug).subscribe()
    ↓
Package data received:
    - Sets this.package = pkg
    - Auto-selects room if only 1 option
    - If currentStep === 2 and no room options → skip to step 3
    ↓
cdr.detectChanges() → Updates template
```

**Key Code:**
```typescript
// booking-form.ts:207-230
loadPackage(slug: string): void {
  this.packagesDataService.getPackageBySlug(slug).subscribe({
    next: (pkg) => {
      if (pkg) {
        this.package = pkg;
        
        // Auto-select room if only one option
        if (pkg.roomOptions && pkg.roomOptions.length === 1) {
          this.selectedRoomOption = pkg.roomOptions[0].id;
        }
        
        // Skip step 2 if no room options
        if (this.currentStep === 2 && (!pkg.roomOptions || pkg.roomOptions.length === 0)) {
          setTimeout(() => this.goToStep(3), 0);
        }
        
        this.cdr.detectChanges();
      }
    }
  });
}
```

---

### **3. Step Navigation Flow**

#### **A. User Clicks "Next" Button**

```
Template: <button (click)="nextStep()">
    ↓
nextStep() method called
    ↓
Checks currentStep:
    - If currentStep === 1:
        → Check if package has room options
        → If no room options → goToStep(3) (skip step 2)
        → If 1 room option → auto-select it → goToStep(2)
        → If multiple options → goToStep(2)
    - Else:
        → goToStep(currentStep + 1)
```

**Key Code:**
```typescript
// booking-form.ts:104-126
nextStep(): void {
  if (this.currentStep >= this.totalSteps) return;
  
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
```

#### **B. goToStep() - Core Step Management**

```
goToStep(step) called
    ↓
1. Validate step (1-5)
    ↓
2. Set currentStep = Number(step)  ← CRITICAL: State update
    ↓
3. Force change detection:
    - cdr.markForCheck()
    - cdr.detectChanges()
    ↓
4. Update URL via router.navigate():
    - queryParams: { step: currentStep }
    - queryParamsHandling: 'merge'
    - replaceUrl: true
    ↓
5. After navigation:
    - Verify step wasn't reset
    - Force change detection again
```

**Key Code:**
```typescript
// booking-form.ts:141-180
goToStep(step: number): void {
  if (step < 1 || step > this.totalSteps) return;
  
  // Set step synchronously
  this.currentStep = Number(step);
  
  // Force change detection
  this.cdr.markForCheck();
  this.cdr.detectChanges();
  
  // Update URL
  this.router.navigate([], {
    relativeTo: this.route,
    queryParams: { step: this.currentStep },
    queryParamsHandling: 'merge',
    replaceUrl: true
  }).then(() => {
    // Verify step wasn't reset
    this.cdr.markForCheck();
    this.cdr.detectChanges();
  });
}
```

---

### **4. Template Rendering Flow**

#### **A. Stepper UI (Always Visible)**

```html
<!-- booking-form.html:7-62 -->
<div class="booking-progress-premium" [class.sticky-active]="isProgressSticky">
  <div class="progress-steps-premium">
    <!-- Step 1 -->
    <div class="step-premium" 
         [class.active]="isStep(1)" 
         [class.completed]="currentStep > 1">
      <!-- Icon, number, label -->
    </div>
    
    <!-- Step 2 -->
    <div class="step-premium" 
         [class.active]="isStep(2)" 
         [class.completed]="currentStep > 2">
      <!-- Icon, number, label -->
    </div>
    
    <!-- ... Steps 3, 4, 5 ... -->
  </div>
  
  <!-- Progress bar -->
  <div class="progress-bar-premium">
    <div class="progress-fill-premium" 
         [style.width.%]="(currentStep / 5) * 100">
    </div>
  </div>
</div>
```

**Logic:**
- `isStep(n)` → Returns `true` if `currentStep === n`
- `[class.active]` → Adds "active" class when step is current
- `[class.completed]` → Adds "completed" class when step is past
- Progress bar width = `(currentStep / 5) * 100%`

#### **B. Step Content (Conditional Rendering)**

```html
<!-- booking-form.html:65-410 -->
<div class="row g-4" *ngIf="package">
  <!-- Form Content (Left) -->
  <div class="col-12 col-lg-8">
    
    <!-- Step 1: Package & Dates -->
    <div *ngIf="isStep(1)" class="booking-step-content">
      <!-- Package summary, date display -->
    </div>
    
    <!-- Step 2: Room Selection -->
    <div *ngIf="isStep(2)" class="booking-step-content">
      <!-- Room option cards -->
    </div>
    
    <!-- Step 3: Passenger Details -->
    <div *ngIf="isStep(3)" class="booking-step-content">
      <!-- ReactiveForm with FormArray -->
    </div>
    
    <!-- Step 4: Add-ons -->
    <div *ngIf="isStep(4)" class="booking-step-content">
      <!-- Add-on selection cards -->
    </div>
    
    <!-- Step 5: Review & Payment -->
    <div *ngIf="isStep(5)" class="booking-step-content">
      <!-- Booking summary, terms, submit button -->
    </div>
    
    <!-- Navigation Buttons -->
    <div class="booking-navigation" *ngIf="currentStep < 5">
      <button (click)="previousStep()">Previous</button>
      <button (click)="nextStep()">Next</button>
    </div>
  </div>
  
  <!-- Booking Summary Sidebar (Right) -->
  <div class="col-12 col-lg-4">
    <div class="booking-summary-card">
      <!-- Package details, price breakdown -->
    </div>
  </div>
</div>
```

**Logic:**
- Only ONE step content div is visible at a time (via `*ngIf="isStep(n)"`)
- All steps are in the DOM, but only the active one renders
- `*ngIf="package"` ensures content only shows when package is loaded

---

### **5. State Management**

#### **State Properties:**

```typescript
// booking-form.ts:20-50
export class BookingForm {
  // Step Management
  currentStep!: number;           // Current step (1-5)
  readonly totalSteps = 5;        // Total number of steps
  
  // Package & Booking Data
  package: TourPackage | null;    // Selected package
  departureDate: string;           // Selected departure date
  numberOfPassengers: number;     // Number of travelers
  
  // Form State
  bookingForm!: FormGroup;        // ReactiveForm for passenger details
  selectedRoomOption: string | null;  // Selected room option ID
  selectedAddOns: string[];        // Selected add-on IDs
  
  // UI State
  submitting: boolean;            // Booking submission in progress
  showSuccessModal: boolean;      // Success modal visibility
  isProgressSticky: boolean;      // Progress bar sticky state
}
```

#### **State Flow:**

```
Initial State:
  currentStep = 1
  package = null
  departureDate = ""
  numberOfPassengers = 1
    ↓
Package Loaded:
  package = { ...tourPackageData }
    ↓
User Navigates Steps:
  currentStep = 1 → 2 → 3 → 4 → 5
  (Each step updates relevant state)
    ↓
Step 2: Room Selection
  selectedRoomOption = "room-id-1"
    ↓
Step 3: Passenger Details
  bookingForm.value = { passengers: [...] }
    ↓
Step 4: Add-ons
  selectedAddOns = ["insurance", "visa"]
    ↓
Step 5: Review & Submit
  onSubmit() → Creates Booking object → Saves to localStorage
```

---

### **6. Helper Methods**

#### **isStep(step: number): boolean**
```typescript
// booking-form.ts:183-195
isStep(step: number): boolean {
  const current = Number(this.currentStep);
  const target = Number(step);
  return current === target;
}
```
**Purpose:** Template helper to check if a specific step is active

#### **canProceedToNextStep(): boolean**
```typescript
// booking-form.ts:196-205
canProceedToNextStep(): boolean {
  switch (this.currentStep) {
    case 1: return !!this.departureDate;
    case 2: return true;  // Always can proceed
    case 3: return this.bookingForm?.valid || false;
    case 4: return true;  // Always can proceed
    case 5: return true;  // Always can proceed
    default: return false;
  }
}
```
**Purpose:** Validates if user can proceed to next step (disables "Next" button if invalid)

---

### **7. Complete User Journey**

```
1. User on Package Detail Page
   → Clicks "Book Now"
   → Navigates to: /booking/:slug?departure=2025-01-17&passengers=1
   
2. BookingForm Component Initializes
   → ngOnInit() runs
   → currentStep = 1
   → Loads package data
   → Template renders Step 1
   
3. Step 1: Package & Dates
   → User sees package summary
   → Clicks "Next"
   → nextStep() → goToStep(2)
   → URL updates: ?step=2
   → Template renders Step 2
   
4. Step 2: Room Selection
   → User sees room options (if available)
   → User selects room OR auto-selected
   → Clicks "Next"
   → nextStep() → goToStep(3)
   → URL updates: ?step=3
   → Template renders Step 3
   
5. Step 3: Passenger Details
   → User fills ReactiveForm (FormArray)
   → Can add/remove passengers
   → Form validation runs
   → Clicks "Next" (only if form valid)
   → nextStep() → goToStep(4)
   → URL updates: ?step=4
   → Template renders Step 4
   
6. Step 4: Add-ons
   → User selects optional add-ons
   → Clicks "Next"
   → nextStep() → goToStep(5)
   → URL updates: ?step=5
   → Template renders Step 5
   
7. Step 5: Review & Payment
   → User reviews all details
   → Accepts terms
   → Clicks "Confirm & Proceed to Payment"
   → onSubmit() runs
   → Booking created
   → Saved to localStorage
   → Email sent
   → Success modal shown
```

---

### **8. Key Design Decisions**

#### **Why Component-Controlled Steps?**
- **Problem:** Route subscriptions were resetting `currentStep` after `goToStep()` set it
- **Solution:** Read step from URL only once in `ngOnInit()`, then control entirely via `goToStep()`
- **Benefit:** No interference from route changes

#### **Why Snapshot Instead of Subscribe?**
- **Problem:** `route.queryParams.subscribe()` was firing after `goToStep()` updated URL
- **Solution:** Use `route.snapshot.queryParams` to read once on init
- **Benefit:** No reactive updates that interfere with step management

#### **Why Multiple detectChanges() Calls?**
- **Problem:** Template not updating after `currentStep` changes
- **Solution:** Call `cdr.detectChanges()` multiple times (immediate, after navigation, in requestAnimationFrame)
- **Benefit:** Ensures Angular updates the view

#### **Why Conditional Rendering with *ngIf?**
- **Problem:** All steps visible at once, confusing UX
- **Solution:** Use `*ngIf="isStep(n)"` to show only active step
- **Benefit:** Clean, focused user experience

---

### **9. CSS Architecture**

#### **Sticky Progress Bar:**
```css
/* booking-form.css */
.booking-progress-premium {
  position: static;  /* Initially not sticky */
}

.booking-progress-premium.sticky-active {
  position: sticky;
  top: 72px;  /* Below header */
  z-index: 999;
}
```

#### **Step States:**
```css
.step-premium {
  /* Default: Inactive */
}

.step-premium.active {
  /* Current step: Highlighted */
  background: var(--primary-600);
  color: white;
}

.step-premium.completed {
  /* Past steps: Checkmark */
  background: var(--success-400);
}
```

---

### **10. Debug Logging**

All key operations are logged with emoji prefixes:
- `🔵` = Component lifecycle (ngOnInit, ngOnDestroy)
- `🔄` = Step transitions (goToStep, nextStep)
- `🔍` = Template evaluation (isStep calls)
- `✅` = Success operations
- `❌` = Errors

**Example Console Output:**
```
🔵 ngOnInit() CALLED - Component initializing
🔵 ngOnInit() - currentStep set to 1: 1
🔄 goToStep() CALLED
🔄 goToStep() - currentStep BEFORE: 1
🔄 goToStep() - currentStep AFTER assignment: 2
🔍 isStep(2) CALLED - currentStep: 2
✅ URL updated, currentStep: 2
```

---

## 🎯 Summary

**File Structure:**
- `booking-form.ts` → Logic & state management
- `booking-form.html` → Template with stepper UI
- `booking-form.css` → Styling

**Core Flow:**
1. Component initializes → Reads URL params → Loads package
2. User navigates steps → `goToStep()` updates `currentStep` → Template re-renders
3. Each step collects data → Stored in component state
4. Final step → Submit → Create booking → Save to localStorage

**State Management:**
- `currentStep` is the single source of truth
- URL is updated but doesn't control step (only read on init)
- Change detection forced multiple times to ensure UI updates

**Key Methods:**
- `ngOnInit()` → Initialize
- `goToStep(step)` → Change step
- `nextStep()` → Go to next step
- `previousStep()` → Go to previous step
- `isStep(n)` → Check if step is active
- `canProceedToNextStep()` → Validate step completion
