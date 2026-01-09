import { Component, OnInit, OnDestroy, HostListener } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { interval, Subscription } from 'rxjs';

interface Category {
  name: string;
  icon: string;
  count: number;
  link: string;
}

@Component({
  selector: 'app-quick-category-discovery',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './quick-category-discovery.html',
  styleUrl: './quick-category-discovery.css'
})
export class QuickCategoryDiscovery implements OnInit, OnDestroy {
  categories: Category[] = [
    { name: 'Domestic', icon: 'bi-flag-fill', count: 45, link: '/packages?type=DOMESTIC' },
    { name: 'International', icon: 'bi-globe-americas', count: 32, link: '/packages?type=INTERNATIONAL' },
    { name: 'Honeymoon', icon: 'bi-heart-fill', count: 18, link: '/packages?category=honeymoon' },
    { name: 'Family', icon: 'bi-people-fill', count: 28, link: '/packages?category=family' },
    { name: 'Adventure', icon: 'bi-mountain', count: 22, link: '/packages?category=adventure' },
    { name: 'Luxury', icon: 'bi-star-fill', count: 15, link: '/packages?category=luxury' }
  ];

  scrollPosition = 0;
  isPaused = false;
  private autoScrollSubscription?: Subscription;
  private touchStartX = 0;
  private touchEndX = 0;

  ngOnInit(): void {
    this.startAutoScroll();
  }

  ngOnDestroy(): void {
    if (this.autoScrollSubscription) {
      this.autoScrollSubscription.unsubscribe();
    }
  }

  startAutoScroll(): void {
    // Calm, slow auto-scroll - optional, subtle movement
    this.autoScrollSubscription = interval(50).subscribe(() => {
      if (!this.isPaused) {
        const container = document.querySelector('.category-scroll-container');
        if (container) {
          this.scrollPosition += 0.35; // Reduced from 0.5 to 0.35 (30% reduction) - calmer scroll
          if (this.scrollPosition >= container.scrollWidth - container.clientWidth) {
            this.scrollPosition = 0;
          }
          container.scrollLeft = this.scrollPosition;
        }
      }
    });
  }

  pauseAutoScroll(): void {
    this.isPaused = true;
  }

  resumeAutoScroll(): void {
    this.isPaused = false;
  }

  scrollLeft(): void {
    const container = document.querySelector('.category-scroll-container');
    if (container) {
      container.scrollBy({ left: -300, behavior: 'smooth' });
      this.pauseAutoScroll();
      setTimeout(() => this.resumeAutoScroll(), 3000);
    }
  }

  scrollRight(): void {
    const container = document.querySelector('.category-scroll-container');
    if (container) {
      container.scrollBy({ left: 300, behavior: 'smooth' });
      this.pauseAutoScroll();
      setTimeout(() => this.resumeAutoScroll(), 3000);
    }
  }

  @HostListener('touchstart', ['$event'])
  onTouchStart(event: TouchEvent): void {
    this.touchStartX = event.changedTouches[0].screenX;
    this.pauseAutoScroll();
  }

  @HostListener('touchend', ['$event'])
  onTouchEnd(event: TouchEvent): void {
    this.touchEndX = event.changedTouches[0].screenX;
    const diff = this.touchStartX - this.touchEndX;
    if (Math.abs(diff) > 50) {
      if (diff > 0) {
        this.scrollRight();
      } else {
        this.scrollLeft();
      }
    }
    setTimeout(() => this.resumeAutoScroll(), 2000);
  }
}
