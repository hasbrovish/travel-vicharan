import { Component, OnInit, HostListener } from '@angular/core';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../services/auth.service';
import { LoginModal } from '../login-modal/login-modal';
import { ProfileDropdown } from '../profile-dropdown/profile-dropdown';
import { AdvancedSearch } from '../advanced-search/advanced-search';
import { Observable } from 'rxjs';
import { User } from '../../models/auth.model';

interface NavigationItem {
  id: string;
  label: string;
  route: string | string[];
  hasDropdown: boolean;
  subItems?: SubNavigationItem[];
  queryParams?: any;
}

interface SubNavigationItem {
  label: string;
  route: string | string[];
  icon?: string;
  queryParams?: any;
}

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, RouterLink, RouterLinkActive, LoginModal, ProfileDropdown, AdvancedSearch],
  templateUrl: './header.html',
  styleUrl: './header.css'
})
export class Header implements OnInit {
  showLoginModal = false;
  isLoggedIn$: Observable<boolean>;
  user$: Observable<User | null>;
  activeDropdown: string | null = null;
  isMobileMenuOpen = false;
  isSearchExpanded = false; // Track search expansion state

  navigationItems: NavigationItem[] = [
    {
      id: 'india',
      label: 'India',
      route: '/packages',
      hasDropdown: true,
      queryParams: { type: 'DOMESTIC' },
      subItems: [
        { label: 'North India', route: '/packages', queryParams: { type: 'DOMESTIC', destination: 'North India' }, icon: 'bi-geo-alt-fill' },
        { label: 'South India', route: '/packages', queryParams: { type: 'DOMESTIC', destination: 'South India' }, icon: 'bi-tree-fill' },
        { label: 'East India', route: '/packages', queryParams: { type: 'DOMESTIC', destination: 'East India' }, icon: 'bi-sunrise-fill' },
        { label: 'West India', route: '/packages', queryParams: { type: 'DOMESTIC', destination: 'West India' }, icon: 'bi-sunset-fill' },
        { label: 'Himachal Pradesh', route: '/packages', queryParams: { type: 'DOMESTIC', destination: 'Himachal' }, icon: 'bi-mountains' },
        { label: 'Kerala', route: '/packages', queryParams: { type: 'DOMESTIC', destination: 'Kerala' }, icon: 'bi-water' },
        { label: 'Rajasthan', route: '/packages', queryParams: { type: 'DOMESTIC', destination: 'Rajasthan' }, icon: 'bi-building' },
        { label: 'Goa', route: '/packages', queryParams: { type: 'DOMESTIC', destination: 'Goa' }, icon: 'bi-umbrella-fill' }
      ]
    },
    {
      id: 'world',
      label: 'World',
      route: '/packages',
      hasDropdown: true,
      queryParams: { type: 'INTERNATIONAL' },
      subItems: [
        { label: 'Europe', route: '/packages', queryParams: { type: 'INTERNATIONAL', destination: 'Europe' }, icon: 'bi-globe' },
        { label: 'Asia', route: '/packages', queryParams: { type: 'INTERNATIONAL', destination: 'Asia' }, icon: 'bi-globe2' },
        { label: 'Dubai & UAE', route: '/packages', queryParams: { type: 'INTERNATIONAL', destination: 'Dubai' }, icon: 'bi-building' },
        { label: 'Thailand', route: '/packages', queryParams: { type: 'INTERNATIONAL', destination: 'Thailand' }, icon: 'bi-tropical-storm' },
        { label: 'Singapore', route: '/packages', queryParams: { type: 'INTERNATIONAL', destination: 'Singapore' }, icon: 'bi-building' },
        { label: 'Bali', route: '/packages', queryParams: { type: 'INTERNATIONAL', destination: 'Bali' }, icon: 'bi-water' },
        { label: 'Maldives', route: '/packages', queryParams: { type: 'INTERNATIONAL', destination: 'Maldives' }, icon: 'bi-water' },
        { label: 'Vietnam', route: '/packages', queryParams: { type: 'INTERNATIONAL', destination: 'Vietnam' }, icon: 'bi-tree-fill' }
      ]
    },
    {
      id: 'speciality',
      label: 'Speciality Tours',
      route: '/packages',
      hasDropdown: true,
      subItems: [
        { label: 'Honeymoon Packages', route: '/packages', queryParams: { category: 'HONEYMOON' }, icon: 'bi-heart-fill' },
        { label: 'Family Packages', route: '/packages', queryParams: { category: 'FAMILY' }, icon: 'bi-people-fill' },
        { label: 'Adventure Tours', route: '/packages', queryParams: { category: 'ADVENTURE' }, icon: 'bi-lightning-fill' },
        { label: 'Luxury Holidays', route: '/packages', queryParams: { category: 'LUXURY' }, icon: 'bi-star-fill' },
        { label: 'Weekend Getaways', route: '/packages', queryParams: { category: 'WEEKEND' }, icon: 'bi-calendar-week' },
        { label: 'Group Tours', route: '/packages', queryParams: { category: 'GROUP' }, icon: 'bi-people' }
      ]
    },
    {
      id: 'customized',
      label: 'Customized Holidays',
      route: '/packages',
      hasDropdown: true,
      queryParams: { customized: true },
      subItems: [
        { label: 'Family Fun', route: '/packages', queryParams: { customized: true, theme: 'family' }, icon: 'bi-suitcase-fill' },
        { label: 'Romantic Holidays', route: '/packages', queryParams: { customized: true, theme: 'romantic' }, icon: 'bi-heart-fill' },
        { label: 'Getaways', route: '/packages', queryParams: { customized: true, theme: 'getaway' }, icon: 'bi-calendar-week' },
        { label: 'Hidden Gems', route: '/packages', queryParams: { customized: true, theme: 'hidden' }, icon: 'bi-geo-alt-fill' },
        { label: 'Self Drive Holidays', route: '/packages', queryParams: { customized: true, theme: 'self-drive' }, icon: 'bi-car-front-fill' },
        { label: 'Air Inclusive Holidays', route: '/packages', queryParams: { customized: true, theme: 'air-inclusive' }, icon: 'bi-airplane-fill' },
        { label: 'Cruise Holidays', route: '/packages', queryParams: { customized: true, theme: 'cruise' }, icon: 'bi-water' }
      ]
    },
    {
      id: 'corporate',
      label: 'Corporate Travel',
      route: '/packages',
      hasDropdown: false,
      queryParams: { corporate: true }
    },
    {
      id: 'inbound',
      label: 'Inbound',
      route: '/packages',
      hasDropdown: true,
      subItems: [
        { label: 'India Tours', route: '/packages', queryParams: { type: 'DOMESTIC' }, icon: 'bi-geo-alt-fill' },
        { label: 'Cultural Tours', route: '/packages', queryParams: { category: 'CULTURAL' }, icon: 'bi-building' },
        { label: 'Heritage Tours', route: '/packages', queryParams: { category: 'HERITAGE' }, icon: 'bi-shop-window' }
      ]
    },
    {
      id: 'forex',
      label: 'Forex',
      route: '/packages',
      hasDropdown: true,
      subItems: [
        { label: 'Currency Exchange', route: '/packages', queryParams: { forex: true }, icon: 'bi-cash-coin' },
        { label: 'Travel Cards', route: '/packages', queryParams: { forex: true, type: 'card' }, icon: 'bi-credit-card' }
      ]
    },
    {
      id: 'gift-cards',
      label: 'Gift Cards',
      route: '/gift-cards',
      hasDropdown: false
    },
    {
      id: 'contact',
      label: 'Contact Us',
      route: '/contact-us',
      hasDropdown: false
    }
  ];

  constructor(
    private router: Router,
    private authService: AuthService
  ) {
    this.isLoggedIn$ = this.authService.isLoggedIn$;
    this.user$ = this.authService.user$;
  }

  ngOnInit(): void {
    // Premium scroll behavior - header shrink and opacity change
    this.setupScrollBehavior();
  }

  private setupScrollBehavior(): void {
    const navbar = document.querySelector('.navbar') as HTMLElement;
    
    if (!navbar) return;

    window.addEventListener('scroll', () => {
      const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
      
      if (scrollTop > 50) {
        navbar.classList.add('scrolled');
      } else {
        navbar.classList.remove('scrolled');
      }
    }, { passive: true });
  }

  onSearch(query: string): void {
    if (query.trim()) {
      this.router.navigate(['/packages'], {
        queryParams: { search: query }
      });
    }
  }

  onSearchExpanded(expanded: boolean): void {
    this.isSearchExpanded = expanded;
    // Add/remove class to body for main content padding adjustment
    if (expanded) {
      document.body.classList.add('header-search-expanded');
    } else {
      document.body.classList.remove('header-search-expanded');
    }
  }

  openLoginModal(): void {
    this.showLoginModal = true;
  }

  closeLoginModal(): void {
    this.showLoginModal = false;
  }

  onLoginSuccess(): void {
    this.closeLoginModal();
  }

  private dropdownTimeout: any = null;
  private showTimeout: any = null;

  showDropdown(id: string): void {
    // Clear any pending hide timeout
    if (this.dropdownTimeout) {
      clearTimeout(this.dropdownTimeout);
      this.dropdownTimeout = null;
    }
    // Clear any pending show timeout
    if (this.showTimeout) {
      clearTimeout(this.showTimeout);
    }
    // Show immediately when hovering over nav item or dropdown
    this.activeDropdown = id;
  }

  hideDropdown(id: string): void {
    // Clear any pending show timeout
    if (this.showTimeout) {
      clearTimeout(this.showTimeout);
      this.showTimeout = null;
    }
    // Longer delay before hiding (300ms) to allow moving between nav item and dropdown
    this.dropdownTimeout = setTimeout(() => {
      if (this.activeDropdown === id) {
        this.activeDropdown = null;
      }
    }, 300);
  }

  cancelHideDropdown(): void {
    // Cancel hide when mouse enters dropdown area
    if (this.dropdownTimeout) {
      clearTimeout(this.dropdownTimeout);
      this.dropdownTimeout = null;
    }
  }

  @HostListener('document:click', ['$event'])
  onDocumentClick(event: MouseEvent): void {
    const target = event.target as HTMLElement;
    // Close dropdown if clicking outside navigation area
    if (!target.closest('.navbar-nav') && !target.closest('.dropdown-wrapper')) {
      this.activeDropdown = null;
      if (this.dropdownTimeout) {
        clearTimeout(this.dropdownTimeout);
        this.dropdownTimeout = null;
      }
    }
  }

  toggleMobileMenu(): void {
    this.isMobileMenuOpen = !this.isMobileMenuOpen;
    // Prevent body scroll when menu is open
    if (this.isMobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
  }

  closeMobileMenu(): void {
    this.isMobileMenuOpen = false;
    document.body.style.overflow = '';
  }

  // Get travel-related icons for main navigation items
  getNavIcon(navId: string): string {
    const iconMap: { [key: string]: string } = {
      'india': 'bi-geo-alt-fill', // Map pin for India
      'world': 'bi-globe', // Globe for World
      'speciality': 'bi-star-fill', // Star for Speciality Tours
      'customized': 'bi-pencil-square', // Edit icon for Customized
      'corporate': 'bi-briefcase-fill', // Briefcase for Corporate
      'inbound': 'bi-arrow-down-circle-fill', // Arrow down for Inbound
      'forex': 'bi-currency-exchange', // Currency for Forex
      'gift-cards': 'bi-gift-fill', // Gift for Gift Cards
      'contact': 'bi-telephone-fill' // Phone for Contact
    };
    return iconMap[navId] || '';
  }
}
