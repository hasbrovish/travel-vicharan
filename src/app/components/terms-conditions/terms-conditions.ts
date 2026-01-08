import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Breadcrumb } from '../breadcrumb/breadcrumb';

@Component({
  selector: 'app-terms-conditions',
  standalone: true,
  imports: [CommonModule, Breadcrumb],
  templateUrl: './terms-conditions.html',
  styleUrl: './terms-conditions.css'
})
export class TermsConditions {

}
