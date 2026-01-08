import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Breadcrumb } from '../breadcrumb/breadcrumb';

@Component({
  selector: 'app-privacy-policy',
  standalone: true,
  imports: [CommonModule, Breadcrumb],
  templateUrl: './privacy-policy.html',
  styleUrl: './privacy-policy.css'
})
export class PrivacyPolicy {

}
