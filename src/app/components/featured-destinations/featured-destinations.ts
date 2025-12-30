import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { DESTINATIONS, Destination } from '../../data/destinations';

@Component({
  selector: 'app-featured-destinations',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './featured-destinations.html',
  styleUrl: './featured-destinations.css'
})
export class FeaturedDestinations {
  destinations: Destination[] = DESTINATIONS;
}
