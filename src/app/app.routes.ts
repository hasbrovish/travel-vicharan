import { Routes } from '@angular/router';
import { Home } from './components/home/home';
import { PackageList } from './components/package-list/package-list';
import { PackageDetail } from './components/package-detail/package-detail';
import { BookingForm } from './components/booking-form/booking-form';
import { MyBookings } from './components/my-bookings/my-bookings';

export const routes: Routes = [
  { path: '', component: Home },
  { path: 'packages', component: PackageList },
  { path: 'packages/:id', component: PackageDetail },
  { path: 'booking/:id', component: BookingForm },
  { path: 'my-bookings', component: MyBookings },
  { path: '**', redirectTo: '' }
];
