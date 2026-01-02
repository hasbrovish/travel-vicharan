import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { OffersService } from '../../services/offers.service';
import { OfferCard, OfferFeature } from '../../models/offers.model';
import { DestinationTile } from '../destination-tile/destination-tile';

@Component({
  selector: 'app-premium-offers',
  imports: [CommonModule, RouterLink, DestinationTile],
  templateUrl: './premium-offers.html',
  styleUrl: './premium-offers.css'
})
export class PremiumOffers implements OnInit {
  offers: OfferCard[] = [];
  features: OfferFeature[] = [];

  constructor(private offersService: OffersService) {}

  ngOnInit(): void {
    this.offersService.getOffers().subscribe(offers => {
      this.offers = offers;
    });
    this.offersService.getCustomizedFeatures().subscribe(features => {
      this.features = features;
    });
  }
}
