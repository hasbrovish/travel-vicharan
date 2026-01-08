# Navigation System - Complete Explanation

## Overview
The navigation system uses **query parameters** and **destination mapping** to filter tour packages intelligently. When users click navigation items, the system routes to `/packages` with specific query parameters that trigger filtering logic.

## How Navigation Works

### 1. Navigation Structure (Header Component)

**File:** `src/app/components/header/header.ts`

The navigation is defined as a hierarchical structure:

```typescript
navigationItems: NavigationItem[] = [
  {
    id: 'india',
    label: 'India',
    route: '/packages',
    hasDropdown: true,
    queryParams: { type: 'DOMESTIC' },
    subItems: [
      { label: 'North India', queryParams: { type: 'DOMESTIC', destination: 'North India' } },
      { label: 'South India', queryParams: { type: 'DOMESTIC', destination: 'South India' } },
      // ... more items
    ]
  }
]
```

### 2. Navigation Flow

```
User clicks "North India" in navigation
    ↓
Router navigates to: /packages?type=DOMESTIC&destination=North%20India
    ↓
PackageList component receives query params via ActivatedRoute
    ↓
ngOnInit() subscribes to route.queryParams
    ↓
Checks params in priority order:
  1. search query → searchPackages()
  2. attraction → loadPackagesByAttraction()
  3. category → loadPackagesByCategory()
  4. destination → loadPackagesByDestination() ← North India goes here
  5. type → loadPackagesByType()
  6. none → loadAllPackages()
    ↓
loadPackagesByDestination('North India')
    ↓
Uses packageBelongsToDestination() utility function
    ↓
Checks if package.destinations matches "North India" or any mapped cities
    ↓
Returns filtered packages
```

### 3. Destination Mapping System

**File:** `src/app/utils/destination-mapping.util.ts`

#### A. Mapping Structure
```typescript
DESTINATION_MAPPING = {
  'North India': ['Delhi', 'Agra', 'Varanasi', 'Haridwar', 'Rishikesh', 
                  'Shimla', 'Manali', 'Dharamshala', 'Srinagar', 
                  'Gulmarg', 'Jaipur', 'Udaipur', 'Jodhpur'],
  'Kerala': ['Kochi', 'Munnar', 'Thekkady', 'Alleppey', ...],
  // ... more mappings
}
```

#### B. Matching Logic
The `packageBelongsToDestination()` function checks:

1. **Direct Match:** Package destination === "North India"
2. **City Match:** Package destination === any city in North India's mapping
3. **Partial Match:** Package destination contains or is contained in mapped cities

**Example:**
- Package with destination `"Delhi"` → Shows up when filtering by `"North India"`
- Package with destination `"Shimla"` → Shows up when filtering by `"North India"`
- Package with destination `"Delhi & Agra"` → Shows up when filtering by `"North India"`

### 4. Filtering Priority

**File:** `src/app/components/package-list/package-list.ts`

The system checks query parameters in this order:

1. **`search`** - Text search query (highest priority)
2. **`attraction`** - Attraction-based filtering
3. **`category`** - Category filtering (HONEYMOON, FAMILY, WEEKEND, etc.)
4. **`destination`** - Destination-based filtering (uses mapping)
5. **`type`** - Package type (DOMESTIC/INTERNATIONAL)
6. **None** - Shows all packages

### 5. Navigation Grouping Basis

#### **India Dropdown:**
- **Regional Groups:** North/South/East/West India
  - Groups multiple states/regions together
  - Uses destination mapping to include all cities in those regions
  
- **State-Level:** Kerala, Rajasthan, Himachal Pradesh, Goa
  - Specific states with their own mappings
  - More granular filtering

#### **World Dropdown:**
- **Continental Groups:** Europe, Asia
  - Groups multiple countries together
  
- **Country-Level:** Dubai, Thailand, Singapore, Bali, Maldives, Vietnam
  - Specific countries with city mappings

#### **Speciality Tours:**
- Uses **category** filtering instead of destination
- Categories: HONEYMOON, FAMILY, ADVENTURE, LUXURY, WEEKEND, GROUP

#### **Customized Holidays:**
- Uses **customized** and **theme** query params
- Themes: family, romantic, getaway, hidden, self-drive, air-inclusive, cruise

### 6. Query Parameter Examples

| Navigation Item | Query Params | Filtering Method |
|----------------|--------------|------------------|
| North India | `{type: 'DOMESTIC', destination: 'North India'}` | Destination mapping |
| Kerala | `{type: 'DOMESTIC', destination: 'Kerala'}` | Destination mapping |
| Honeymoon Packages | `{category: 'HONEYMOON'}` | Category filter |
| Europe | `{type: 'INTERNATIONAL', destination: 'Europe'}` | Destination mapping |
| Family Fun | `{customized: true, theme: 'family'}` | Customized filter |

### 7. Integration with Offers Filter

**File:** `src/app/components/offers-filter/offers-filter.ts`

The Offers Filter component can **combine** with navigation filters:
- Navigation sets initial filters via query params
- User can then refine using Offers Filter (price, duration, etc.)
- Filters are applied on top of navigation results

### 8. Key Functions

#### `loadPackagesByDestination(destination: string)`
- Fetches all packages
- Filters using `packageBelongsToDestination()`
- Updates `filteredPackages`

#### `packageBelongsToDestination(packageDestinations, searchDestination)`
- Gets mapped cities for the destination
- Checks if any package destination matches
- Returns boolean

#### `getDestinationCities(destinationNameOrSlug)`
- Returns array of cities for a destination
- Handles slug-to-name conversion
- Falls back to the destination name itself if no mapping

## Summary

The navigation system works on **three key principles**:

1. **Query Parameter Routing** - Navigation items set query params that trigger filtering
2. **Destination Mapping** - Regional/state names map to specific cities for intelligent matching
3. **Priority-Based Filtering** - Search > Attraction > Category > Destination > Type > All

This allows users to navigate hierarchically (India → North India → Delhi) while the system intelligently matches packages based on destination mappings.

