export type EnquiryStatus = 'NEW' | 'CONTACTED' | 'CONVERTED';

export interface Enquiry {
  id: string;
  fullName: string;
  phone: string;
  email: string;
  packageId: string;
  packageName: string;
  description: string;
  receiveWhatsApp: boolean;
  createdAt: Date;
  status: EnquiryStatus;
}
