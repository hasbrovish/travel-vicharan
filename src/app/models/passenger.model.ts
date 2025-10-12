export type PassengerTitle = 'Mr' | 'Ms' | 'Mrs' | 'Master';
export type Gender = 'Male' | 'Female' | 'Other';

export interface Passenger {
  title: PassengerTitle;
  firstName: string;
  lastName: string;
  age: number;
  gender: Gender;
  email: string;
  phone: string;
}
