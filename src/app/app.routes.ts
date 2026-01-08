import { Routes } from '@angular/router';
import { Home } from './components/home/home';
import { PackageList } from './components/package-list/package-list';
import { PackageDetail } from './components/package-detail/package-detail';
import { BookingForm } from './components/booking-form/booking-form';
import { MyBookings } from './components/my-bookings/my-bookings';
import { MyAccount } from './components/my-account/my-account';
import { MyHolidayCart } from './components/my-holiday-cart/my-holiday-cart';
import { MyWishlist } from './components/my-wishlist/my-wishlist';
import { GiftCards } from './components/gift-cards/gift-cards';
import { PreDepartureVideos } from './components/pre-departure-videos/pre-departure-videos';
import { ContactUs } from './components/contact-us/contact-us';
import { AboutUs } from './components/about-us/about-us';
import { TermsConditions } from './components/terms-conditions/terms-conditions';
import { PrivacyPolicy } from './components/privacy-policy/privacy-policy';
import { FAQs } from './components/faqs/faqs';
import { Offers } from './pages/offers/offers';
import { TravelPlanner } from './components/travel-planner/travel-planner';
import { AuthGuard } from './guards/auth.guard';

export const routes: Routes = [
  { path: '', component: Home },
  { path: 'offers', component: Offers },
  { path: 'packages', component: PackageList },
  { path: 'packages/:slug', component: PackageDetail }, // SEO-friendly slug route
  { path: 'booking/:slug', component: BookingForm }, // SEO-friendly slug route
  { path: 'about-us', component: AboutUs },
  { path: 'contact-us', component: ContactUs },
  { path: 'travel-planner', component: TravelPlanner },
  { path: 'terms-conditions', component: TermsConditions },
  { path: 'privacy-policy', component: PrivacyPolicy },
  { path: 'faqs', component: FAQs },
  { path: 'my-account', component: MyAccount, canActivate: [AuthGuard] },
  { path: 'my-bookings', component: MyBookings, canActivate: [AuthGuard] },
  { path: 'my-holiday-cart', component: MyHolidayCart, canActivate: [AuthGuard] },
  { path: 'my-wishlist', component: MyWishlist, canActivate: [AuthGuard] },
  { path: 'gift-cards', component: GiftCards, canActivate: [AuthGuard] },
  { path: 'pre-departure-videos', component: PreDepartureVideos, canActivate: [AuthGuard] },
  { path: '**', redirectTo: '' }
];
