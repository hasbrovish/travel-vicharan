import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Breadcrumb } from '../breadcrumb/breadcrumb';

interface GiftCard {
  id: string;
  amount: number;
  recipientName: string;
  recipientEmail: string;
  message: string;
  purchaseDate: string;
  status: 'ACTIVE' | 'USED' | 'EXPIRED';
}

@Component({
  selector: 'app-gift-cards',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, Breadcrumb],
  templateUrl: './gift-cards.html',
  styleUrl: './gift-cards.css'
})
export class GiftCards implements OnInit {
  giftCardForm!: FormGroup;
  myGiftCards: GiftCard[] = [];
  loading = false;
  activeTab: 'purchase' | 'my-cards' = 'purchase';
  giftAmounts = [5000, 10000, 25000, 50000, 100000];

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    this.initForm();
    this.loadMyGiftCards();
  }

  initForm(): void {
    this.giftCardForm = this.fb.group({
      amount: [10000, [Validators.required]],
      recipientName: ['', [Validators.required, Validators.minLength(2)]],
      recipientEmail: ['', [Validators.required, Validators.email]],
      message: ['', [Validators.maxLength(200)]],
      senderName: ['', [Validators.required]]
    });
  }

  loadMyGiftCards(): void {
    const cardsData = localStorage.getItem('gift_cards');
    if (cardsData) {
      this.myGiftCards = JSON.parse(cardsData);
    }
  }

  setActiveTab(tab: 'purchase' | 'my-cards'): void {
    this.activeTab = tab;
  }

  selectAmount(amount: number): void {
    this.giftCardForm.patchValue({ amount });
  }

  onSubmit(): void {
    if (this.giftCardForm.valid) {
      this.loading = true;
      // Simulate purchase
      setTimeout(() => {
        const newCard: GiftCard = {
          id: 'GC' + Date.now(),
          ...this.giftCardForm.value,
          purchaseDate: new Date().toISOString(),
          status: 'ACTIVE'
        };
        this.myGiftCards.push(newCard);
        localStorage.setItem('gift_cards', JSON.stringify(this.myGiftCards));
        this.giftCardForm.reset();
        this.giftCardForm.patchValue({ amount: 10000 });
        this.loading = false;
        this.activeTab = 'my-cards';
      }, 1000);
    }
  }

  getStatusClass(status: string): string {
    switch(status) {
      case 'ACTIVE': return 'success';
      case 'USED': return 'secondary';
      case 'EXPIRED': return 'danger';
      default: return 'secondary';
    }
  }
}

