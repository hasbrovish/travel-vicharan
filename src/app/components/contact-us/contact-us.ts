import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Breadcrumb } from '../breadcrumb/breadcrumb';
import { EmailService } from '../../services/email.service';

interface Office {
  id: string;
  city: string;
  type: 'Sales Office' | 'Head Office';
  hasForex: boolean;
  hours: string;
  address: string;
  phone: string;
  email?: string;
  pincode: string;
  state: string;
}

interface TourCategory {
  name: string;
  image: string;
  tours: number;
  departures: number;
  guests: number;
}

@Component({
  selector: 'app-contact-us',
  standalone: true,
  imports: [CommonModule, FormsModule, Breadcrumb],
  templateUrl: './contact-us.html',
  styleUrl: './contact-us.css'
})
export class ContactUs implements OnInit {
  searchQuery: string = '';
  offices: Office[] = [];
  filteredOffices: Office[] = [];
  selectedOffice: Office | null = null;

  callbackForm = {
    fullName: '',
    phone: '',
    email: '',
    countryCode: '+91'
  };

  isSubmitting = false;
  showSuccess = false;

  tourCategories: TourCategory[] = [
    {
      name: 'Family',
      image: 'https://images.unsplash.com/photo-1511895426328-dc8714191300?w=400',
      tours: 329,
      departures: 1362,
      guests: 666932
    },
    {
      name: 'Honeymoon Special',
      image: 'https://images.unsplash.com/photo-1518568814500-bf0f8d125f46?w=400',
      tours: 13,
      departures: 27,
      guests: 47125
    },
    {
      name: "Women's Special",
      image: 'https://images.unsplash.com/photo-1523050854058-8df90110c9f1?w=400',
      tours: 45,
      departures: 89,
      guests: 125000
    },
    {
      name: "Seniors' Special",
      image: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400',
      tours: 28,
      departures: 56,
      guests: 89000
    }
  ];

  constructor(private emailService: EmailService) {}

  ngOnInit(): void {
    this.loadOffices();
    this.filteredOffices = this.offices;
  }

  loadOffices(): void {
    // Mock office data - replace with real data
    this.offices = [
      {
        id: '1',
        city: 'Ahmedabad',
        type: 'Sales Office',
        hasForex: true,
        hours: 'MON - SAT: 10:00 AM TO 07:00 PM',
        address: '4, Anam 1, Commercial Co. Op. Service Society Ltd, Opp. Parimal Garden, Ambawadi',
        phone: '+91 8879977200',
        email: 'ahmedabad@vichrantrip.com',
        pincode: '380006',
        state: 'Gujarat'
      },
      {
        id: '2',
        city: 'Airoli',
        type: 'Sales Office',
        hasForex: false,
        hours: 'MON - SAT: 10:00 AM TO 07:00 PM',
        address: 'Shop no. 11 ground floor, Someshwar, Sector 8 Plot no. 5',
        phone: '+91 8879979200',
        email: 'airoli@vichrantrip.com',
        pincode: '400708',
        state: 'Maharashtra'
      },
      {
        id: '3',
        city: 'Andheri',
        type: 'Sales Office',
        hasForex: true,
        hours: 'MON - SAT: 10:00 AM TO 07:00 PM',
        address: 'Suvidha Square, Next to St. Blases Church, CTS no. 13, Caesar Road, Amboli Naka',
        phone: '+91 8879972216',
        email: 'andheri@vichrantrip.com',
        pincode: '400058',
        state: 'Maharashtra'
      },
      {
        id: '4',
        city: 'Mumbai',
        type: 'Head Office',
        hasForex: true,
        hours: 'MON - SAT: 10:00 AM TO 07:00 PM',
        address: 'VichranTrip Headquarters, Business District',
        phone: '+91 1800 313 5555',
        email: 'info@vichrantrip.com',
        pincode: '400001',
        state: 'Maharashtra'
      },
      {
        id: '5',
        city: 'Delhi',
        type: 'Sales Office',
        hasForex: true,
        hours: 'MON - SAT: 10:00 AM TO 07:00 PM',
        address: 'Connaught Place, Central Delhi',
        phone: '+91 8879978000',
        email: 'delhi@vichrantrip.com',
        pincode: '110001',
        state: 'Delhi'
      },
      {
        id: '6',
        city: 'Bangalore',
        type: 'Sales Office',
        hasForex: false,
        hours: 'MON - SAT: 10:00 AM TO 07:00 PM',
        address: 'MG Road, Central Bangalore',
        phone: '+91 8879979000',
        email: 'bangalore@vichrantrip.com',
        pincode: '560001',
        state: 'Karnataka'
      }
    ];
  }

  onSearch(): void {
    const query = this.searchQuery.toLowerCase().trim();
    if (!query) {
      this.filteredOffices = this.offices;
      return;
    }

    this.filteredOffices = this.offices.filter(office =>
      office.city.toLowerCase().includes(query) ||
      office.state.toLowerCase().includes(query) ||
      office.pincode.includes(query) ||
      office.address.toLowerCase().includes(query)
    );
  }

  selectOffice(office: Office): void {
    this.selectedOffice = office;
  }

  onSubmitCallback(): void {
    if (!this.callbackForm.fullName || !this.callbackForm.phone || !this.callbackForm.email) {
      return;
    }

    this.isSubmitting = true;
    
    // Simulate API call
    setTimeout(() => {
      // Store in localStorage
      const callbacks = JSON.parse(localStorage.getItem('callbacks') || '[]');
      callbacks.push({
        ...this.callbackForm,
        timestamp: new Date().toISOString()
      });
      localStorage.setItem('callbacks', JSON.stringify(callbacks));

      this.isSubmitting = false;
      this.showSuccess = true;
      
      setTimeout(() => {
        this.showSuccess = false;
        this.callbackForm = {
          fullName: '',
          phone: '',
          email: '',
          countryCode: '+91'
        };
      }, 3000);
    }, 1000);
  }

  formatNumber(num: number): string {
    return num.toLocaleString('en-IN');
  }
}

