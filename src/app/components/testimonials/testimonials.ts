import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { interval, Subscription } from 'rxjs';
import { TESTIMONIALS, Testimonial } from '../../data/testimonials';
import { trigger, transition, style, animate } from '@angular/animations';

@Component({
  selector: 'app-testimonials',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './testimonials.html',
  styleUrl: './testimonials.css',
  animations: [
    trigger('fadeSlide', [
      transition('* => *', [
        style({ opacity: 0, transform: 'translateY(14px)' }), // Reduced from 20px (30% reduction)
        animate('1120ms cubic-bezier(0.25, 0.1, 0.25, 1)', style({ // Slower, calmer transition (6-8 seconds feel)
          opacity: 1, 
          transform: 'translateY(0)' 
        }))
      ])
    ])
  ]
})
export class Testimonials implements OnInit, OnDestroy {
  testimonials: Testimonial[] = TESTIMONIALS;
  currentIndex = 0;
  private autoRotateSubscription?: Subscription;
  private isPaused = false;

  ngOnInit(): void {
    // Auto-rotate every 7 seconds - calm, premium pace for emotional pause
    this.startAutoRotate();
  }

  startAutoRotate(): void {
    this.autoRotateSubscription = interval(7000).subscribe(() => {
      if (!this.isPaused) {
        this.next();
      }
    });
  }

  pauseAutoRotate(): void {
    this.isPaused = true;
  }

  resumeAutoRotate(): void {
    this.isPaused = false;
  }

  ngOnDestroy(): void {
    if (this.autoRotateSubscription) {
      this.autoRotateSubscription.unsubscribe();
    }
  }

  get currentTestimonial(): Testimonial {
    return this.testimonials[this.currentIndex];
  }

  get canGoPrevious(): boolean {
    return this.currentIndex > 0;
  }

  get canGoNext(): boolean {
    return this.currentIndex < this.testimonials.length - 1;
  }

  previous(): void {
    if (this.canGoPrevious) {
      this.currentIndex--;
    } else {
      this.currentIndex = this.testimonials.length - 1; // Loop to end
    }
    // Pause after user interaction
    this.pauseAutoRotate();
    setTimeout(() => this.resumeAutoRotate(), 10000);
  }

  next(): void {
    if (this.canGoNext) {
      this.currentIndex++;
    } else {
      this.currentIndex = 0; // Loop back to start
    }
    // Pause after user interaction
    this.pauseAutoRotate();
    setTimeout(() => this.resumeAutoRotate(), 10000);
  }

  goToSlide(index: number): void {
    this.currentIndex = index;
    // Pause after user interaction
    this.pauseAutoRotate();
    setTimeout(() => this.resumeAutoRotate(), 10000);
  }

  get slideIndicators(): number[] {
    return Array(this.testimonials.length).fill(0).map((_, i) => i);
  }

  getStarArray(rating: number): number[] {
    return Array(Math.floor(rating)).fill(0);
  }

  handleKeydown(event: KeyboardEvent): void {
    // Keyboard navigation support for accessibility
    if (event.key === 'ArrowLeft') {
      event.preventDefault();
      this.previous();
    } else if (event.key === 'ArrowRight') {
      event.preventDefault();
      this.next();
    } else if (event.key === 'Home') {
      event.preventDefault();
      this.goToSlide(0);
    } else if (event.key === 'End') {
      event.preventDefault();
      this.goToSlide(this.testimonials.length - 1);
    }
  }
}
