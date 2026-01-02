/**
 * Utility function to generate SEO-friendly slugs from package names
 */
export function generateSlug(name: string, days?: number, nights?: number): string {
  // Convert to lowercase
  let slug = name.toLowerCase();
  
  // Replace spaces and special characters with hyphens
  slug = slug.replace(/[^a-z0-9]+/g, '-');
  
  // Remove leading/trailing hyphens
  slug = slug.replace(/^-+|-+$/g, '');
  
  // Add duration if provided
  if (days && nights) {
    slug += `-${days}-days-${nights}-nights`;
  } else if (days) {
    slug += `-${days}-days`;
  }
  
  return slug;
}

/**
 * Generate slug from package data
 */
export function generatePackageSlug(packageData: { name: string; days?: number; nights?: number }): string {
  return generateSlug(packageData.name, packageData.days, packageData.nights);
}

