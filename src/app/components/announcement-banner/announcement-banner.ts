import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { interval, Subscription } from 'rxjs';

interface Announcement {
  text: string;
  cta: string;
  link: string;
}

@Component({
  selector: 'app-announcement-banner',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './announcement-banner.html',
  styleUrl: './announcement-banner.css'
})
export class AnnouncementBanner implements OnInit, OnDestroy {
  showBanner = true;
  currentIndex = 0;
  private rotationSubscription?: Subscription;

  announcements: Announcement[] = [
    {
      text: 'Virtual Travel Conference - Register Today!',
      cta: 'Learn More',
      link: '#'
    },
    {
      text: 'Our offices now open on Sundays!',
      cta: 'Locate Us',
      link: '#'
    },
    {
      text: 'Plan ahead! Travel Planner 2026 - Start Planning',
      cta: 'Start Now',
      link: '#'
    }
  ];

  ngOnInit(): void {
    // Clean up any old localStorage first
    localStorage.removeItem('announcement-banner-dismissed');

    // Show banner by default (sessionStorage clears on browser close, not on reload)
    // Only keep dismissed during same page session, not across reloads
    this.showBanner = true;

    // Auto-rotate announcements every 5 seconds
    this.rotationSubscription = interval(5000).subscribe(() => {
      this.currentIndex = (this.currentIndex + 1) % this.announcements.length;
    });
  }

  ngOnDestroy(): void {
    if (this.rotationSubscription) {
      this.rotationSubscription.unsubscribe();
    }
  }

  get currentAnnouncement(): Announcement {
    return this.announcements[this.currentIndex];
  }

  closeBanner(): void {
    // Add class for smooth transition - CSS handles the hide animation
    document.body.classList.add('banner-dismissed');
    // Don't persist dismissal - banner will show again on reload
  }
}
