/**
 * Destination Mapping Utility
 * Maps destination names (like "Kerala") to cities/places that belong to that destination
 */

export interface DestinationMapping {
  [key: string]: string[]; // destination name -> array of cities/places
}

export const DESTINATION_MAPPING: DestinationMapping = {
  // Indian States/Regions
  'Kerala': ['Kochi', 'Munnar', 'Thekkady', 'Alleppey', 'Alappuzha', 'Kovalam', 'Trivandrum', 'Wayanad', 'Kumarakom', 'Varkala'],
  'Kashmir': ['Srinagar', 'Gulmarg', 'Pahalgam', 'Sonamarg', 'Jammu'],
  'Himachal Pradesh': ['Shimla', 'Manali', 'Dharamshala', 'Dalhousie', 'Kullu', 'Kasauli', 'Spiti', 'Kinnaur'],
  'Himachal': ['Shimla', 'Manali', 'Dharamshala', 'Dalhousie', 'Kullu', 'Kasauli', 'Spiti', 'Kinnaur'],
  'Rajasthan': ['Jaipur', 'Udaipur', 'Jodhpur', 'Jaisalmer', 'Bikaner', 'Pushkar', 'Ajmer', 'Mount Abu'],
  'Goa': ['North Goa', 'South Goa', 'Old Goa', 'Panaji', 'Margao', 'Calangute', 'Baga', 'Anjuna'],
  'Andaman': ['Port Blair', 'Havelock', 'Neil Island', 'Ross Island', 'Baratang'],
  'North India': ['Delhi', 'Agra', 'Varanasi', 'Haridwar', 'Rishikesh', 'Shimla', 'Manali', 'Dharamshala', 'Srinagar', 'Gulmarg', 'Jaipur', 'Udaipur', 'Jodhpur'],
  'South India': ['Kochi', 'Munnar', 'Alleppey', 'Bangalore', 'Mysore', 'Ooty', 'Kodaikanal', 'Chennai', 'Pondicherry', 'Hyderabad', 'Hampi'],
  'East India': ['Kolkata', 'Darjeeling', 'Gangtok', 'Bhubaneswar', 'Puri', 'Konark'],
  'West India': ['Mumbai', 'Goa', 'Pune', 'Aurangabad', 'Ajanta', 'Ellora'],
  
  // International Destinations
  'Dubai': ['Dubai', 'Abu Dhabi', 'Sharjah'],
  'Thailand': ['Bangkok', 'Pattaya', 'Phuket', 'Krabi', 'Chiang Mai', 'Coral Island'],
  'Singapore': ['Singapore', 'Sentosa'],
  'Malaysia': ['Kuala Lumpur', 'Genting Highlands', 'Langkawi', 'Penang'],
  'Bali': ['Bali', 'Ubud', 'Seminyak', 'Kuta', 'Nusa Dua'],
  'Maldives': ['Male', 'Maafushi', 'Thulusdhoo'],
  'Vietnam': ['Hanoi', 'Halong Bay', 'Ho Chi Minh', 'Saigon', 'Hoi An', 'Da Nang'],
  'Europe': ['Paris', 'London', 'Rome', 'Venice', 'Switzerland', 'Amsterdam', 'Barcelona', 'Prague', 'Vienna'],
  'Asia': ['Bangkok', 'Singapore', 'Bali', 'Dubai', 'Maldives', 'Vietnam', 'Sri Lanka', 'Malaysia'],
  
  // Categories (for backward compatibility)
  'India': ['Delhi', 'Mumbai', 'Bangalore', 'Chennai', 'Kolkata', 'Hyderabad', 'Jaipur', 'Udaipur', 'Goa', 'Kerala', 'Kashmir', 'Himachal'],
};

/**
 * Get all cities/places for a destination name or slug
 */
export function getDestinationCities(destinationNameOrSlug: string): string[] {
  const normalized = destinationNameOrSlug.trim();
  
  // Try direct match first
  if (DESTINATION_MAPPING[normalized]) {
    return DESTINATION_MAPPING[normalized];
  }
  
  // Try slug to name mapping
  const slugToName: { [key: string]: string } = {
    'kerala': 'Kerala',
    'kashmir': 'Kashmir',
    'himachal-pradesh': 'Himachal Pradesh',
    'himachal': 'Himachal Pradesh',
    'rajasthan': 'Rajasthan',
    'goa': 'Goa',
    'andaman': 'Andaman',
    'north-india': 'North India',
    'south-india': 'South India',
    'east-india': 'East India',
    'west-india': 'West India',
    'dubai': 'Dubai',
    'thailand': 'Thailand',
    'singapore': 'Singapore',
    'malaysia': 'Malaysia',
    'bali': 'Bali',
    'maldives': 'Maldives',
    'vietnam': 'Vietnam',
    'europe': 'Europe',
    'asia': 'Asia',
    'india': 'India'
  };
  
  const nameFromSlug = slugToName[normalized.toLowerCase()];
  if (nameFromSlug && DESTINATION_MAPPING[nameFromSlug]) {
    return DESTINATION_MAPPING[nameFromSlug];
  }
  
  // Return the name/slug itself if no mapping found
  return [normalized];
}

/**
 * Check if a package belongs to a destination
 */
export function packageBelongsToDestination(
  packageDestinations: string[],
  searchDestination: string
): boolean {
  const normalizedSearch = searchDestination.trim().toLowerCase();
  
  // Get mapped cities for the destination
  const mappedCities = getDestinationCities(searchDestination);
  
  // Check if any package destination matches the search destination or its mapped cities
  return packageDestinations.some(pkgDest => {
    const normalizedPkgDest = pkgDest.toLowerCase();
    
    // Direct match
    if (normalizedPkgDest === normalizedSearch) {
      return true;
    }
    
    // Check if package destination is in the mapped cities
    return mappedCities.some(city => 
      normalizedPkgDest === city.toLowerCase() || 
      normalizedPkgDest.includes(city.toLowerCase()) ||
      city.toLowerCase().includes(normalizedPkgDest)
    );
  });
}

