import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

interface TravelerType {
  id: string;
  emoji: string;
  title: string;
  description: string;
  category?: string;
  route: string;
}

@Component({
  selector: 'app-traveler-type-guide',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './traveler-type-guide.html',
  styleUrl: './traveler-type-guide.css'
})
export class TravelerTypeGuide {
  selectedTypeId: string | null = null;
  
  travelerTypes: TravelerType[] = [
    {
      id: 'scenic',
      emoji: '🌴',
      title: 'Slow & Scenic',
      description: 'Take your time, soak in the views',
      category: 'Scenic',
      route: '/packages?category=Scenic'
    },
    {
      id: 'explorer',
      emoji: '🏔️',
      title: 'Explorer',
      description: 'Adventure awaits around every corner',
      category: 'Adventure',
      route: '/packages?category=Adventure'
    },
    {
      id: 'romantic',
      emoji: '💑',
      title: 'Romantic',
      description: 'Create moments together',
      category: 'Honeymoon',
      route: '/packages?category=Honeymoon'
    },
    {
      id: 'family',
      emoji: '👨‍👩‍👧',
      title: 'Family-first',
      description: 'Memories for everyone',
      category: 'Family',
      route: '/packages?category=Family'
    }
  ];

  constructor(private router: Router) {}

  selectTravelerType(type: TravelerType): void {
    this.selectedTypeId = type.id;
    // Smooth scroll to next section after selection
    setTimeout(() => {
      const nextSection = document.querySelector('.premium-offers-section');
      if (nextSection) {
        nextSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }, 300);
    // Navigate after visual feedback
    setTimeout(() => {
      this.router.navigateByUrl(type.route);
    }, 500);
  }
}
