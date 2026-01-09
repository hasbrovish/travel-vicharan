import { Component, OnInit, OnDestroy, HostListener } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-brand-story',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './brand-story.html',
  styleUrl: './brand-story.css'
})
export class BrandStory implements OnInit, OnDestroy {
  isVisible = false;
  private observer?: IntersectionObserver;

  ngOnInit(): void {
    // Scroll-triggered fade-in using Intersection Observer
    this.observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            this.isVisible = true;
            this.observer?.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1, rootMargin: '0px 0px -100px 0px' }
    );

    setTimeout(() => {
      const element = document.querySelector('.brand-story-section');
      if (element) {
        this.observer?.observe(element);
      }
    }, 100);
  }

  ngOnDestroy(): void {
    this.observer?.disconnect();
  }
}
