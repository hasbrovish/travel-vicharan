# Booking Flow Debug Analysis

## Bug Reproduction Steps

1. Navigate to booking page: `/booking/goa-beach-escape-4-days-3-nights?departure=2025-01-17&passengers=1`
2. Component initializes with `currentStep = 1` (from `ngOnInit()` line 70)
3. User clicks "Next" button
4. `nextStep()` calls `goToStep(2)` (line 122)
5. `goToStep()` sets `currentStep = 2` (line 147)
6. `goToStep()` calls `router.navigate()` to update URL with `step=2` (line 162)
7. **BUG**: Template still shows `currentStep=1` even though component has `currentStep=2`

## Issue Statement

**The template displays `currentStep=1` while the component property `currentStep` is `2`, indicating Angular's change detection is not updating the view after `goToStep()` modifies the step.**

## State Storage & Flow

### Where State is Stored
- **Location**: Component property `currentStep: number` (line 28)
- **NOT in localStorage**: No persistence, purely in-memory component state
- **Initialization**: Set in `ngOnInit()` (line 70) to `1`, then potentially overwritten from URL (line 81)

### How State Changes
1. **Initial Load**: `ngOnInit()` → sets `currentStep = 1` → reads from URL `qParams['step']` → overwrites if present
2. **Step Navigation**: `nextStep()` → calls `goToStep(step)` → sets `currentStep = Number(step)` → updates URL via `router.navigate()`
3. **Direct Navigation**: `goToStep(step)` → sets `currentStep` → updates URL

## Debug Logs Added

### Component Lifecycle
- `🔵 ngOnInit() CALLED` - When component initializes
- `🔵 ngOnInit() - currentStep BEFORE init` - State before initialization
- `🔵 ngOnInit() - currentStep FINAL` - State after initialization
- `🔴 ngOnDestroy() CALLED` - When component is destroyed

### Step Transitions
- `🔄 goToStep() CALLED` - When step navigation starts
- `🔄 goToStep() - currentStep BEFORE` - State before change
- `🔄 goToStep() - currentStep AFTER assignment` - State after assignment
- `🔄 goToStep() - After detectChanges, currentStep` - State after change detection

### Template Evaluation
- `🔍 isStep(2) CALLED` - When template calls `isStep(2)`
- `🔍 isStep(2) - current: X, target: 2, result: Y` - Comparison details
- Template debug alert shows: `currentStep`, `isStep(2)`, `package`, `roomOptions`, `timestamp`

## What to Look For

### Scenario 1: Component Recreation
**If you see:**
```
🔵 ngOnInit() CALLED
🔵 ngOnInit() - currentStep BEFORE init: undefined
🔄 goToStep() CALLED
🔄 goToStep() - currentStep AFTER assignment: 2
🔵 ngOnInit() CALLED  <-- Component recreated!
🔵 ngOnInit() - currentStep set to 1  <-- Reset!
```
**Root Cause**: Component is being destroyed and recreated after `router.navigate()`, causing `ngOnInit()` to reset `currentStep` to 1.

**Fix**: Prevent component recreation by using `skipLocationChange: true` or ensuring route doesn't trigger component recreation.

### Scenario 2: Change Detection Not Running
**If you see:**
```
🔄 goToStep() - currentStep AFTER assignment: 2
🔄 goToStep() - After detectChanges, currentStep: 2
🔍 isStep(2) CALLED - currentStep: 1  <-- Template has stale value!
```
**Root Cause**: Template is not re-evaluating after `detectChanges()`.

**Fix**: Ensure change detection runs in Angular zone, or use `ApplicationRef.tick()`.

### Scenario 3: Timing Issue
**If you see:**
```
🔄 goToStep() - currentStep AFTER assignment: 2
🔍 isStep(2) CALLED - currentStep: 1  <-- Called before detectChanges completes
🔄 goToStep() - After detectChanges, currentStep: 2
```
**Root Cause**: Template evaluates before change detection completes.

**Fix**: Use `setTimeout` or `requestAnimationFrame` to defer change detection.

## Expected Console Output (Working)

```
🔵 ngOnInit() CALLED
🔵 ngOnInit() - currentStep BEFORE init: undefined
🔵 ngOnInit() - currentStep set to 1: 1
🔵 ngOnInit() - URL step param: undefined
🔵 ngOnInit() - currentStep FINAL: 1
🔄 goToStep() CALLED
🔄 goToStep() - currentStep BEFORE: 1
🔄 goToStep() - target step: 2
🔄 goToStep() - currentStep AFTER assignment: 2
🔄 goToStep() - Calling markForCheck()
🔄 goToStep() - Calling detectChanges()
🔄 goToStep() - After detectChanges, currentStep: 2
🔍 isStep(2) CALLED - currentStep: 2
🔍 isStep(2) - current: 2, target: 2, result: true
✅ URL updated, currentStep: 2
```

## Minimal Fix (Proposed)

Based on the most likely scenario (component recreation), the fix would be:

**Option 1: Prevent component recreation**
```typescript
// In goToStep(), line 162
this.router.navigate([], {
  relativeTo: this.route,
  queryParams: { step: this.currentStep },
  queryParamsHandling: 'merge',
  replaceUrl: true,
  skipLocationChange: false  // Keep this false, but ensure route doesn't recreate component
});
```

**Option 2: Read step from route AFTER navigation completes**
```typescript
// In goToStep(), after router.navigate().then()
.then(() => {
  // Verify step wasn't reset by route
  const urlStep = Number(this.route.snapshot.queryParams['step']);
  if (urlStep !== this.currentStep) {
    console.error('⚠️ Route reset step! Restoring...');
    this.currentStep = urlStep;
    this.cdr.detectChanges();
  }
});
```

**Option 3: Use OnPush change detection strategy** (requires refactor, not minimal)

## Next Steps

1. Run the app and navigate to booking page
2. Click "Next" button
3. Check console logs for the patterns above
4. Identify which scenario matches
5. Apply the corresponding minimal fix
