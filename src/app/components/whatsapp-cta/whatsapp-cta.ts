import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-whatsapp-cta',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './whatsapp-cta.html',
  styleUrl: './whatsapp-cta.css'
})
export class WhatsAppCta {
  // WhatsApp number - update with actual VichranTrip WhatsApp number
  whatsappNumber = '919876543210'; // Replace with actual number
  defaultMessage = 'Hi VichranTrip, I\'m interested in your travel packages';

  openWhatsApp(): void {
    const encodedMessage = encodeURIComponent(this.defaultMessage);
    const whatsappUrl = `https://wa.me/${this.whatsappNumber}?text=${encodedMessage}`;
    window.open(whatsappUrl, '_blank');
  }
}

