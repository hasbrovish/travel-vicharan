import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Breadcrumb } from '../breadcrumb/breadcrumb';

interface FAQ {
  id: number;
  category: string;
  question: string;
  answer: string;
  isOpen: boolean;
}

@Component({
  selector: 'app-faqs',
  standalone: true,
  imports: [CommonModule, FormsModule, Breadcrumb],
  templateUrl: './faqs.html',
  styleUrl: './faqs.css'
})
export class FAQs implements OnInit {
  searchQuery: string = '';
  selectedCategory: string = 'All';
  categories: string[] = ['All', 'Booking', 'Payment', 'Cancellation', 'Travel', 'General'];

  faqs: FAQ[] = [
    {
      id: 1,
      category: 'Booking',
      question: 'How do I book a tour package?',
      answer: 'You can book a tour package by browsing our website, selecting your desired package, and clicking on "Book Now". Fill in the required details including passenger information, travel dates, and make the payment. You will receive a confirmation email within 24 hours.',
      isOpen: false
    },
    {
      id: 2,
      category: 'Booking',
      question: 'Can I customize my tour package?',
      answer: 'Yes, we offer customized tour packages. Please contact our travel experts at +91 9929443313 or email us at info@vichrantrip.com with your requirements, and we will create a personalized itinerary for you.',
      isOpen: false
    },
    {
      id: 3,
      category: 'Payment',
      question: 'What payment methods do you accept?',
      answer: 'We accept various payment methods including credit cards, debit cards, net banking, UPI, and bank transfers. All payments are processed through secure payment gateways to ensure your financial information is protected.',
      isOpen: false
    },
    {
      id: 4,
      category: 'Payment',
      question: 'When do I need to make the payment?',
      answer: 'For most packages, you can either pay the full amount upfront or pay a deposit (typically 25-30% of the total cost) to confirm your booking, with the balance due 15-30 days before departure. Specific payment terms will be mentioned at the time of booking.',
      isOpen: false
    },
    {
      id: 5,
      category: 'Cancellation',
      question: 'What is your cancellation policy?',
      answer: 'Cancellation charges apply as follows: 30+ days before departure: 25% of tour cost, 15-29 days: 50%, 8-14 days: 75%, Less than 7 days: 100% (no refund). Refunds are processed within 15-20 business days. Please refer to our Terms & Conditions for detailed information.',
      isOpen: false
    },
    {
      id: 6,
      category: 'Cancellation',
      question: 'Can I get a refund if I cancel my booking?',
      answer: 'Refunds are subject to our cancellation policy. The amount refunded depends on when you cancel relative to your departure date. Processing fees may apply. Please contact our customer service team for assistance with cancellations.',
      isOpen: false
    },
    {
      id: 7,
      category: 'Travel',
      question: 'What travel documents do I need?',
      answer: 'You need a valid passport with at least 6 months validity from your return date, required visas for the destination country, travel insurance (highly recommended), and any other documents as required by the destination. We recommend checking visa requirements well in advance.',
      isOpen: false
    },
    {
      id: 8,
      category: 'Travel',
      question: 'Is travel insurance included in the package?',
      answer: 'Travel insurance is not automatically included but is highly recommended. We can help you arrange comprehensive travel insurance covering medical expenses, trip cancellation, baggage loss, and personal accident. Please inquire at the time of booking.',
      isOpen: false
    },
    {
      id: 9,
      category: 'Travel',
      question: 'What happens if my flight is delayed or cancelled?',
      answer: 'If your flight is delayed or cancelled due to circumstances beyond our control (weather, airline issues, etc.), we will assist you in making alternative arrangements. However, additional costs may apply. We recommend purchasing travel insurance to cover such situations.',
      isOpen: false
    },
    {
      id: 10,
      category: 'General',
      question: 'How can I contact customer support?',
      answer: 'You can reach us via phone at +91 9929443313 or +91 9785757753, email at VichranTrip.info@gmail.com, or visit our office in Jaipur, Rajasthan. Our customer support team is available Monday to Saturday, 10:00 AM to 7:00 PM IST.',
      isOpen: false
    },
    {
      id: 11,
      category: 'General',
      question: 'Do you offer group discounts?',
      answer: 'Yes, we offer special discounts for group bookings. Discounts vary based on group size and package selected. Please contact our sales team for group booking inquiries and customized group packages.',
      isOpen: false
    },
    {
      id: 12,
      category: 'General',
      question: 'What makes VichranTrip different from other travel agencies?',
      answer: 'VichranTrip is a community of travel enthusiasts dedicated to making travel accessible and affordable. We offer customized packages, competitive pricing, personalized service, and a commitment to creating memorable travel experiences. We cater to all types of travelers from backpackers to families.',
      isOpen: false
    }
  ];

  filteredFAQs: FAQ[] = [];

  ngOnInit(): void {
    this.filteredFAQs = [...this.faqs];
  }

  selectCategory(category: string): void {
    this.selectedCategory = category;
    this.filterFAQs();
  }

  filterFAQs(): void {
    let filtered = [...this.faqs];

    // Filter by category
    if (this.selectedCategory !== 'All') {
      filtered = filtered.filter(faq => faq.category === this.selectedCategory);
    }

    // Filter by search query
    if (this.searchQuery.trim()) {
      const query = this.searchQuery.toLowerCase().trim();
      filtered = filtered.filter(faq =>
        faq.question.toLowerCase().includes(query) ||
        faq.answer.toLowerCase().includes(query)
      );
    }

    this.filteredFAQs = filtered;
  }

  toggleFAQ(faq: FAQ): void {
    faq.isOpen = !faq.isOpen;
  }
}
