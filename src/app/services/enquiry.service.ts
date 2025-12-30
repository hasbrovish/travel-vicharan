import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { map, delay } from 'rxjs/operators';
import { Enquiry, EnquiryStatus } from '../models/enquiry.model';

@Injectable({
  providedIn: 'root'
})
export class EnquiryService {
  private readonly STORAGE_KEY = 'vichrantrip_enquiries';
  private enquiriesSubject = new BehaviorSubject<Enquiry[]>([]);
  public enquiries$ = this.enquiriesSubject.asObservable();

  constructor() {
    this.loadEnquiriesFromStorage();
  }

  /**
   * Load enquiries from LocalStorage
   */
  private loadEnquiriesFromStorage(): void {
    try {
      const stored = localStorage.getItem(this.STORAGE_KEY);
      if (stored) {
        const enquiries = JSON.parse(stored).map((e: any) => ({
          ...e,
          createdAt: new Date(e.createdAt)
        }));
        this.enquiriesSubject.next(enquiries);
        console.log('📋 Loaded', enquiries.length, 'enquiries from storage');
      }
    } catch (error) {
      console.error('Error loading enquiries from storage:', error);
      this.enquiriesSubject.next([]);
    }
  }

  /**
   * Save enquiries to LocalStorage
   */
  private saveEnquiriesToStorage(enquiries: Enquiry[]): void {
    try {
      localStorage.setItem(this.STORAGE_KEY, JSON.stringify(enquiries));
      console.log('💾 Saved', enquiries.length, 'enquiries to storage');
    } catch (error) {
      console.error('Error saving enquiries to storage:', error);
    }
  }

  /**
   * Create a new enquiry
   */
  createEnquiry(enquiry: Omit<Enquiry, 'id' | 'createdAt' | 'status'>): Observable<Enquiry> {
    const newEnquiry: Enquiry = {
      ...enquiry,
      id: this.generateEnquiryId(),
      createdAt: new Date(),
      status: 'NEW'
    };

    const currentEnquiries = this.enquiriesSubject.value;
    const updatedEnquiries = [newEnquiry, ...currentEnquiries];

    this.enquiriesSubject.next(updatedEnquiries);
    this.saveEnquiriesToStorage(updatedEnquiries);

    console.log('✅ New enquiry created:', newEnquiry.id);
    console.log('Package:', newEnquiry.packageName);
    console.log('Customer:', newEnquiry.fullName);

    // Simulate API delay
    return of(newEnquiry).pipe(delay(500));
  }

  /**
   * Get all enquiries
   */
  getAllEnquiries(): Observable<Enquiry[]> {
    return this.enquiries$;
  }

  /**
   * Get enquiry by ID
   */
  getEnquiryById(id: string): Observable<Enquiry | undefined> {
    return this.enquiries$.pipe(
      map(enquiries => enquiries.find(e => e.id === id))
    );
  }

  /**
   * Get enquiries by package ID
   */
  getEnquiriesByPackage(packageId: string): Observable<Enquiry[]> {
    return this.enquiries$.pipe(
      map(enquiries => enquiries.filter(e => e.packageId === packageId))
    );
  }

  /**
   * Get enquiries by status
   */
  getEnquiriesByStatus(status: EnquiryStatus): Observable<Enquiry[]> {
    return this.enquiries$.pipe(
      map(enquiries => enquiries.filter(e => e.status === status))
    );
  }

  /**
   * Update enquiry status
   */
  updateEnquiryStatus(id: string, status: EnquiryStatus): Observable<boolean> {
    const currentEnquiries = this.enquiriesSubject.value;
    const enquiryIndex = currentEnquiries.findIndex(e => e.id === id);

    if (enquiryIndex === -1) {
      console.error('Enquiry not found:', id);
      return of(false);
    }

    const updatedEnquiries = [...currentEnquiries];
    updatedEnquiries[enquiryIndex] = {
      ...updatedEnquiries[enquiryIndex],
      status
    };

    this.enquiriesSubject.next(updatedEnquiries);
    this.saveEnquiriesToStorage(updatedEnquiries);

    console.log(`📝 Updated enquiry ${id} status to ${status}`);

    return of(true).pipe(delay(300));
  }

  /**
   * Delete enquiry
   */
  deleteEnquiry(id: string): Observable<boolean> {
    const currentEnquiries = this.enquiriesSubject.value;
    const updatedEnquiries = currentEnquiries.filter(e => e.id !== id);

    if (currentEnquiries.length === updatedEnquiries.length) {
      console.error('Enquiry not found:', id);
      return of(false);
    }

    this.enquiriesSubject.next(updatedEnquiries);
    this.saveEnquiriesToStorage(updatedEnquiries);

    console.log('🗑️ Deleted enquiry:', id);

    return of(true).pipe(delay(300));
  }

  /**
   * Get enquiry statistics
   */
  getEnquiryStats(): Observable<{
    total: number;
    new: number;
    contacted: number;
    converted: number;
    conversionRate: number;
  }> {
    return this.enquiries$.pipe(
      map(enquiries => {
        const total = enquiries.length;
        const newCount = enquiries.filter(e => e.status === 'NEW').length;
        const contacted = enquiries.filter(e => e.status === 'CONTACTED').length;
        const converted = enquiries.filter(e => e.status === 'CONVERTED').length;
        const conversionRate = total > 0 ? (converted / total) * 100 : 0;

        return {
          total,
          new: newCount,
          contacted,
          converted,
          conversionRate: Math.round(conversionRate * 10) / 10
        };
      })
    );
  }

  /**
   * Get recent enquiries (last N days)
   */
  getRecentEnquiries(days: number = 7): Observable<Enquiry[]> {
    const cutoffDate = new Date();
    cutoffDate.setDate(cutoffDate.getDate() - days);

    return this.enquiries$.pipe(
      map(enquiries => enquiries.filter(e => e.createdAt >= cutoffDate))
    );
  }

  /**
   * Search enquiries by customer name or email
   */
  searchEnquiries(searchTerm: string): Observable<Enquiry[]> {
    const term = searchTerm.toLowerCase();

    return this.enquiries$.pipe(
      map(enquiries => enquiries.filter(e =>
        e.fullName.toLowerCase().includes(term) ||
        e.email.toLowerCase().includes(term) ||
        e.phone.includes(term) ||
        e.packageName.toLowerCase().includes(term)
      ))
    );
  }

  /**
   * Clear all enquiries (for testing)
   */
  clearAllEnquiries(): void {
    this.enquiriesSubject.next([]);
    localStorage.removeItem(this.STORAGE_KEY);
    console.log('🗑️ All enquiries cleared');
  }

  /**
   * Generate unique enquiry ID
   */
  private generateEnquiryId(): string {
    const timestamp = Date.now();
    const random = Math.random().toString(36).substring(2, 9).toUpperCase();
    return `ENQ${timestamp}${random}`;
  }

  /**
   * Export enquiries to CSV (for admin dashboard)
   */
  exportToCSV(): string {
    const enquiries = this.enquiriesSubject.value;

    if (enquiries.length === 0) {
      return '';
    }

    const headers = ['ID', 'Date', 'Name', 'Email', 'Phone', 'Package', 'Status', 'WhatsApp', 'Message'];
    const rows = enquiries.map(e => [
      e.id,
      new Date(e.createdAt).toLocaleDateString('en-IN'),
      e.fullName,
      e.email,
      e.phone,
      e.packageName,
      e.status,
      e.receiveWhatsApp ? 'Yes' : 'No',
      `"${e.description.replace(/"/g, '""')}"`
    ]);

    const csv = [
      headers.join(','),
      ...rows.map(row => row.join(','))
    ].join('\n');

    console.log('📊 Exported', enquiries.length, 'enquiries to CSV');
    return csv;
  }

  /**
   * Download enquiries as CSV file
   */
  downloadCSV(): void {
    const csv = this.exportToCSV();

    if (!csv) {
      console.warn('No enquiries to export');
      return;
    }

    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    const url = URL.createObjectURL(blob);

    link.setAttribute('href', url);
    link.setAttribute('download', `vichrantrip_enquiries_${Date.now()}.csv`);
    link.style.visibility = 'hidden';

    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    console.log('⬇️ CSV download initiated');
  }
}
