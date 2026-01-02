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
    // Check localStorage for dismissed state
    const dismissed = localStorage.getItem('announcement-banner-dismissed');
    if (dismissed === 'true') {
      this.showBanner = false;
      document.body.classList.add('banner-dismissed');
      return;
    }

    // Show banner by default
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
    // Hide banner with smooth transition
    this.showBanner = false;
    document.body.classList.add('banner-dismissed');
    // Persist dismissal in localStorage
    localStorage.setItem('announcement-banner-dismissed', 'true');
  }
}
