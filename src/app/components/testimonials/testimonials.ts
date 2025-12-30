import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { interval, Subscription } from 'rxjs';
import { TESTIMONIALS, Testimonial } from '../../data/testimonials';

@Component({
  selector: 'app-testimonials',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './testimonials.html',
  styleUrl: './testimonials.css'
})
export class Testimonials implements OnInit, OnDestroy {
  testimonials: Testimonial[] = TESTIMONIALS;
  currentIndex = 0;
  itemsPerPage = 3;
  private autoRotateSubscription?: Subscription;

  ngOnInit(): void {
    // Auto-rotate every 5 seconds
    this.autoRotateSubscription = interval(5000).subscribe(() => {
      this.next();
    });
  }

  ngOnDestroy(): void {
    if (this.autoRotateSubscription) {
      this.autoRotateSubscription.unsubscribe();
    }
  }

  get visibleTestimonials(): Testimonial[] {
    const start = this.currentIndex;
    const end = start + this.itemsPerPage;
    return this.testimonials.slice(start, end);
  }

  get canGoPrevious(): boolean {
    return this.currentIndex > 0;
  }

  get canGoNext(): boolean {
    return this.currentIndex + this.itemsPerPage < this.testimonials.length;
  }

  previous(): void {
    if (this.canGoPrevious) {
      this.currentIndex--;
    }
  }

  next(): void {
    if (this.canGoNext) {
      this.currentIndex++;
    } else {
      this.currentIndex = 0; // Loop back to start
    }
  }

  goToSlide(index: number): void {
    this.currentIndex = index;
  }

  get totalSlides(): number {
    return Math.ceil(this.testimonials.length / this.itemsPerPage);
  }

  get slideIndicators(): number[] {
    return Array(this.totalSlides).fill(0).map((_, i) => i);
  }

  getStarArray(rating: number): number[] {
    return Array(Math.floor(rating)).fill(0);
  }
}
