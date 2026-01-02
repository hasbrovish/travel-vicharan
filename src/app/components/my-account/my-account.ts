import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { User } from '../../models/auth.model';
import { Breadcrumb } from '../breadcrumb/breadcrumb';

@Component({
  selector: 'app-my-account',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, Breadcrumb],
  templateUrl: './my-account.html',
  styleUrl: './my-account.css'
})
export class MyAccount implements OnInit {
  user: User | null = null;
  profileForm!: FormGroup;
  passwordForm!: FormGroup;
  activeTab: 'profile' | 'password' | 'travellers' = 'profile';
  loading = false;
  successMessage = '';
  showPassword = false;
  showNewPassword = false;
  showConfirmPassword = false;

  constructor(
    private authService: AuthService,
    private fb: FormBuilder,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.user = this.authService.getUser();
    if (!this.user) {
      this.router.navigate(['/']);
      return;
    }

    this.initForms();
  }

  initForms(): void {
    this.profileForm = this.fb.group({
      name: [this.user?.name || '', [Validators.required, Validators.minLength(2)]],
      email: [{ value: this.user?.email || '', disabled: true }, [Validators.required, Validators.email]],
      phone: ['', [Validators.pattern(/^[0-9]{10}$/)]],
      dateOfBirth: [''],
      gender: [''],
      address: [''],
      city: [''],
      state: [''],
      pincode: ['', [Validators.pattern(/^[0-9]{6}$/)]]
    });

    this.passwordForm = this.fb.group({
      currentPassword: ['', [Validators.required]],
      newPassword: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['', [Validators.required]]
    }, { validators: this.passwordMatchValidator.bind(this) });
  }

  passwordMatchValidator(form: FormGroup): { [key: string]: boolean } | null {
    const newPassword = form.get('newPassword');
    const confirmPassword = form.get('confirmPassword');
    if (newPassword && confirmPassword && newPassword.value !== confirmPassword.value) {
      confirmPassword.setErrors({ passwordMismatch: true });
      return { passwordMismatch: true };
    }
    return null;
  }

  setActiveTab(tab: 'profile' | 'password' | 'travellers'): void {
    this.activeTab = tab;
    this.successMessage = '';
  }

  onProfileSubmit(): void {
    if (this.profileForm.valid) {
      this.loading = true;
      // Simulate API call
      setTimeout(() => {
        // Update user in auth service
        const updatedUser = {
          ...this.user!,
          ...this.profileForm.value
        };
        // In production, call API to update user
        this.successMessage = 'Profile updated successfully!';
        this.loading = false;
        setTimeout(() => {
          this.successMessage = '';
        }, 3000);
      }, 500);
    }
  }

  onPasswordSubmit(): void {
    if (this.passwordForm.valid) {
      this.loading = true;
      // Simulate API call
      setTimeout(() => {
        this.successMessage = 'Password updated successfully!';
        this.loading = false;
        this.passwordForm.reset();
        setTimeout(() => {
          this.successMessage = '';
        }, 3000);
      }, 500);
    }
  }

  getUserInitials(): string {
    if (!this.user) return '';
    if (this.user.name) {
      return this.user.name
        .split(' ')
        .map(n => n[0])
        .join('')
        .toUpperCase()
        .slice(0, 2);
    }
    return 'U';
  }
}

