import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router, NavigationEnd, RouterModule } from '@angular/router';
import { filter, map } from 'rxjs/operators';
import { PackagesDataService } from '../../services/packages-data.service';

export interface BreadcrumbItem {
  label: string;
  url: string;
  icon?: string;
}

@Component({
  selector: 'app-breadcrumb',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './breadcrumb.html',
  styleUrl: './breadcrumb.css'
})
export class Breadcrumb implements OnInit {
  breadcrumbs: BreadcrumbItem[] = [];
  currentRoute = '';

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private packagesDataService: PackagesDataService
  ) {}

  ngOnInit(): void {
    // Listen to route changes
    this.router.events
      .pipe(
        filter(event => event instanceof NavigationEnd),
        map(() => this.route),
        map(route => {
          while (route.firstChild) {
            route = route.firstChild;
          }
          return route;
        })
      )
      .subscribe(route => {
        this.buildBreadcrumbs(route);
      });

    // Build initial breadcrumbs
    this.buildBreadcrumbs(this.route);
  }

  private buildBreadcrumbs(route: ActivatedRoute): void {
    const breadcrumbs: BreadcrumbItem[] = [];
    let currentRoute = route;

    // Always start with Home
    breadcrumbs.push({
      label: 'Home',
      url: '/',
      icon: 'bi-house-fill'
    });

    // Get the full URL path
    const url = this.router.url;
    const urlSegments = url.split('/').filter(segment => segment);

    // Handle different route patterns
    if (urlSegments.length === 0) {
      // Home page - no breadcrumbs needed except Home
      this.breadcrumbs = breadcrumbs;
      return;
    }

    // Handle offers
    if (urlSegments[0] === 'offers') {
      breadcrumbs.push({
        label: 'Special Offers',
        url: '/offers',
        icon: 'bi-tag-fill'
      });
      this.breadcrumbs = breadcrumbs;
      return;
    }

    // Handle packages
    if (urlSegments[0] === 'packages') {
      breadcrumbs.push({
        label: 'Tour Packages',
        url: '/packages',
        icon: 'bi-compass'
      });

      // If there's a package ID, get package name
      if (urlSegments[1]) {
        const packageId = urlSegments[1];
        this.packagesDataService.getPackageById(packageId).subscribe(pkg => {
          if (pkg) {
            breadcrumbs.push({
              label: pkg.name,
              url: `/packages/${packageId}`,
              icon: 'bi-map'
            });
            this.breadcrumbs = breadcrumbs;
          } else {
            breadcrumbs.push({
              label: 'Package Details',
              url: `/packages/${packageId}`,
              icon: 'bi-map'
            });
            this.breadcrumbs = breadcrumbs;
          }
        });
      } else {
        this.breadcrumbs = breadcrumbs;
      }
      return;
    }

    // Handle booking
    if (urlSegments[0] === 'booking') {
      breadcrumbs.push({
        label: 'Tour Packages',
        url: '/packages',
        icon: 'bi-compass'
      });

      if (urlSegments[1]) {
        const packageSlug = urlSegments[1];
        // Try to get package by slug first, then by ID
        this.packagesDataService.getPackageBySlug(packageSlug).subscribe(pkg => {
          if (pkg) {
            breadcrumbs.push({
              label: pkg.name,
              url: `/packages/${pkg.slug || pkg.id}`,
              icon: 'bi-map'
            });
          }
          breadcrumbs.push({
            label: 'Booking',
            url: `/booking/${packageSlug}`,
            icon: 'bi-calendar-check-fill'
          });
          this.breadcrumbs = breadcrumbs;
        });
      } else {
        breadcrumbs.push({
          label: 'Booking',
          url: `/booking/${urlSegments[1]}`,
          icon: 'bi-calendar-check-fill'
        });
        this.breadcrumbs = breadcrumbs;
      }
      return;
    }

    // Handle account pages and other pages
    const accountPages: { [key: string]: { label: string; icon: string } } = {
      'my-account': { label: 'My Account', icon: 'bi-person-circle' },
      'my-bookings': { label: 'My Bookings', icon: 'bi-calendar-event' },
      'my-holiday-cart': { label: 'My Holiday Cart', icon: 'bi-cart-fill' },
      'my-wishlist': { label: 'My Wishlist', icon: 'bi-heart-fill' },
      'gift-cards': { label: 'Gift Cards', icon: 'bi-gift-fill' },
      'pre-departure-videos': { label: 'Pre-departure Videos', icon: 'bi-camera-video-fill' },
      'about-us': { label: 'About Us', icon: 'bi-info-circle-fill' },
      'contact-us': { label: 'Contact Us', icon: 'bi-telephone-fill' },
      'terms-conditions': { label: 'Terms & Conditions', icon: 'bi-file-text-fill' },
      'privacy-policy': { label: 'Privacy Policy', icon: 'bi-shield-lock-fill' },
      'faqs': { label: 'FAQs', icon: 'bi-question-circle-fill' }
    };

    if (urlSegments[0] && accountPages[urlSegments[0]]) {
      const pageInfo = accountPages[urlSegments[0]];
      breadcrumbs.push({
        label: pageInfo.label,
        url: `/${urlSegments[0]}`,
        icon: pageInfo.icon
      });
      this.breadcrumbs = breadcrumbs;
      return;
    }

    // Default: just show home
    this.breadcrumbs = breadcrumbs;
  }

  isLast(index: number): boolean {
    return index === this.breadcrumbs.length - 1;
  }
}

