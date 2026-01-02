import { Component, OnInit, OnDestroy, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { interval, Subject, Subscription } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { DestinationCategory } from '../../models/home-carousel.model';
import { trigger, state, style, transition, animate } from '@angular/animations';

@Component({
  selector: 'app-category-carousel',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './category-carousel.html',
  styleUrl: './category-carousel.css',
  animations: [
    trigger('slideAnimation', [
      transition('* => *', [
        animate('400ms cubic-bezier(0.4, 0, 0.2, 1)', style({}))
      ])
    ])
  ]
})
export class CategoryCarousel implements OnInit, OnDestroy {
  @Input() categories: DestinationCategory[] = [];
  
  currentIndex = 0;
  visibleCount = 3; // Number of cards visible at once
  private autoScrollSubscription?: Subscription;
  private pauseAutoScroll$ = new Subject<void>();
  private isPaused = false;

  ngOnInit(): void {
    this.updateVisibleCount();
    this.startAutoScroll();
    
    // Update visible count on window resize
    window.addEventListener('resize', () => this.updateVisibleCount());
  }

  ngOnDestroy(): void {
    this.stopAutoScroll();
    window.removeEventListener('resize', () => this.updateVisibleCount());
  }

  updateVisibleCount(): void {
    if (window.innerWidth >= 1200) {
      this.visibleCount = 3;
    } else if (window.innerWidth >= 768) {
      this.visibleCount = 2;
    } else {
      this.visibleCount = 1;
    }
  }

  startAutoScroll(): void {
    this.autoScrollSubscription = interval(2000)
      .pipe(takeUntil(this.pauseAutoScroll$))
      .subscribe(() => {
        if (!this.isPaused) {
          this.nextSlide();
        }
      });
  }

  stopAutoScroll(): void {
    if (this.autoScrollSubscription) {
      this.autoScrollSubscription.unsubscribe();
    }
    this.pauseAutoScroll$.next();
  }

  pauseAutoScroll(): void {
    this.isPaused = true;
  }

  resumeAutoScroll(): void {
    this.isPaused = false;
  }

  onMouseEnter(): void {
    this.pauseAutoScroll();
  }

  onMouseLeave(): void {
    // Resume after 3 seconds
    setTimeout(() => {
      this.resumeAutoScroll();
    }, 3000);
  }

  get visibleCategories(): DestinationCategory[] {
    return this.categories;
  }

  get transformX(): string {
    const cardWidth = 100 / this.visibleCount;
    const offset = -(this.currentIndex * cardWidth);
    return `translateX(${offset}%)`;
  }

  get totalSlides(): number {
    return Math.max(1, this.categories.length - this.visibleCount + 1);
  }

  get slideIndicators(): number[] {
    return Array(this.totalSlides).fill(0).map((_, i) => i);
  }

  nextSlide(): void {
    if (this.currentIndex < this.categories.length - this.visibleCount) {
      this.currentIndex++;
    } else {
      // Loop back to start
      this.currentIndex = 0;
    }
  }

  prevSlide(): void {
    if (this.currentIndex > 0) {
      this.currentIndex--;
    } else {
      // Loop to end
      this.currentIndex = Math.max(0, this.categories.length - this.visibleCount);
    }
  }

  goToSlide(index: number): void {
    this.currentIndex = index;
    this.pauseAutoScroll();
    setTimeout(() => {
      this.resumeAutoScroll();
    }, 3000);
  }

  isActiveIndicator(index: number): boolean {
    return index === this.currentIndex;
  }

  formatNumber(num: number): string {
    if (num >= 1000) {
      return (num / 1000).toFixed(1) + 'K+';
    }
    return num.toString();
  }
}

