import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DestinationTile as DestinationModel } from '../../models/offers.model';

@Component({
  selector: 'app-destination-tile',
  imports: [CommonModule],
  templateUrl: './destination-tile.html',
  styleUrl: './destination-tile.css'
})
export class DestinationTile {
  @Input() destination!: DestinationModel;
  @Input() size: 'small' | 'medium' | 'large' = 'medium';
}
