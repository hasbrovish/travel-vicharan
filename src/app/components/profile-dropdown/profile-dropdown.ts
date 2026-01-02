import { Component, OnInit, HostListener, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { User } from '../../models/auth.model';
import { trigger, state, style, transition, animate } from '@angular/animations';

@Component({
  selector: 'app-profile-dropdown',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './profile-dropdown.html',
  styleUrl: './profile-dropdown.css',
  animations: [
    trigger('dropdownEnter', [
      transition(':enter', [
        style({
          opacity: 0,
          transform: 'scale(0.95) translateY(-10px)'
        }),
        animate('200ms cubic-bezier(0.4, 0, 0.2, 1)', style({
          opacity: 1,
          transform: 'scale(1) translateY(0)'
        }))
      ]),
      transition(':leave', [
        animate('150ms cubic-bezier(0.4, 0, 0.2, 1)', style({
          opacity: 0,
          transform: 'scale(0.95) translateY(-10px)'
        }))
      ])
    ])
  ]
})
export class ProfileDropdown implements OnInit {
  @Input() user: User | null = null;
  isOpen = false;

  constructor(
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit(): void {
    // Subscribe to user changes from auth service
    this.authService.user$.subscribe(user => {
      this.user = user;
    });
    
    // Also get initial user if available
    if (!this.user) {
      this.user = this.authService.getUser();
    }
  }

  @HostListener('document:click', ['$event'])
  onDocumentClick(event: MouseEvent): void {
    if (!this.isOpen) return;
    
    const target = event.target as HTMLElement;
    const container = target.closest('.profile-dropdown-container');
    if (!container) {
      this.isOpen = false;
    }
  }

  @HostListener('document:keydown.escape', ['$event'])
  onEscapeKey(event: Event): void {
    this.isOpen = false;
  }

  toggleDropdown(event: MouseEvent): void {
    event.stopPropagation();
    event.preventDefault();
    const wasOpen = this.isOpen;
    this.isOpen = !wasOpen;
    console.log('Toggle dropdown - wasOpen:', wasOpen, 'now:', this.isOpen, 'user:', this.user);
  }

  closeDropdown(): void {
    this.isOpen = false;
  }

  getUserInitials(): string {
    if (!this.user) return '';
    if (this.user.name) {
      return this.user.name
        .split(' ')
        .map(n => n[0])
        .join('')
        .toUpperCase()
        .slice(0, 2);
    }
    if (this.user.email) {
      return this.user.email[0].toUpperCase();
    }
    return 'U';
  }

  getUserDisplayName(): string {
    if (!this.user) return 'User';
    if (this.user.name) {
      return this.user.name;
    }
    if (this.user.email) {
      // Show email prefix if name not available
      const emailPrefix = this.user.email.split('@')[0];
      return emailPrefix.length > 15 ? emailPrefix.substring(0, 15) + '...' : emailPrefix;
    }
    return 'User';
  }

  getUserFirstName(): string {
    if (!this.user) return 'User';
    if (this.user.name) {
      return this.user.name.split(' ')[0];
    }
    if (this.user.email) {
      return this.user.email.split('@')[0];
    }
    return 'User';
  }

  onMyAccount(event?: Event): void {
    if (event) {
      event.preventDefault();
    }
    this.closeDropdown();
    setTimeout(() => {
      this.router.navigate(['/my-account']);
    }, 100);
  }

  onMyBookings(event?: Event): void {
    if (event) {
      event.preventDefault();
    }
    this.closeDropdown();
    setTimeout(() => {
      this.router.navigate(['/my-bookings']);
    }, 100);
  }

  onMyHolidayCart(event?: Event): void {
    if (event) {
      event.preventDefault();
    }
    this.closeDropdown();
    setTimeout(() => {
      this.router.navigate(['/my-holiday-cart']);
    }, 100);
  }

  onMyWishlist(event?: Event): void {
    if (event) {
      event.preventDefault();
    }
    this.closeDropdown();
    setTimeout(() => {
      this.router.navigate(['/my-wishlist']);
    }, 100);
  }

  onGiftCards(event?: Event): void {
    if (event) {
      event.preventDefault();
    }
    this.closeDropdown();
    setTimeout(() => {
      this.router.navigate(['/gift-cards']);
    }, 100);
  }

  onPreDepartureVideos(event?: Event): void {
    if (event) {
      event.preventDefault();
    }
    this.closeDropdown();
    setTimeout(() => {
      this.router.navigate(['/pre-departure-videos']);
    }, 100);
  }

  onLogout(): void {
    this.closeDropdown();
    this.authService.logout();
    this.router.navigate(['/']);
  }
}

