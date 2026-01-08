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
    // Check sessionStorage for dismissed state (only for current session, not persistent)
    const dismissed = sessionStorage.getItem('announcement-banner-dismissed');
    if (dismissed === 'true') {
      this.showBanner = false;
      document.body.classList.add('banner-dismissed');
      return;
    }

    // Show banner by default
    this.showBanner = true;
    document.body.classList.remove('banner-dismissed');

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
    // Remove banner from DOM immediately - no gap
    this.showBanner = false;
    // Add dismissed class immediately after DOM update
    setTimeout(() => {
      document.body.classList.add('banner-dismissed');
    }, 0);
    // Store dismissal in sessionStorage (only for current session, will reappear on new session/page refresh)
    sessionStorage.setItem('announcement-banner-dismissed', 'true');
  }
}
