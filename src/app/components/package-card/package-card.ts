import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { TourPackage } from '../../models';

@Component({
  selector: 'app-package-card',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './package-card.html',
  styleUrl: './package-card.css'
})
export class PackageCard {
  @Input() package!: TourPackage;

  getStatusClass(status: string): string {
    switch(status) {
      case 'AVAILABLE': return 'success';
      case 'FILLING_FAST': return 'warning';
      case 'SOLD_OUT': return 'danger';
      default: return 'secondary';
    }
  }

  getStatusText(status: string): string {
    return status.replace('_', ' ');
  }

  getStarArray(rating: number): number[] {
    return Array(Math.floor(rating)).fill(0);
  }
}
