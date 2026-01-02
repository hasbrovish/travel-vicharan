import { Component, OnInit, OnDestroy, Output, EventEmitter, HostListener } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { trigger, state, style, transition, animate } from '@angular/animations';

@Component({
  selector: 'app-login-modal',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './login-modal.html',
  styleUrl: './login-modal.css',
  animations: [
    trigger('modalEnter', [
      transition(':enter', [
        style({
          opacity: 0,
          transform: 'scale(0.95) translateY(-20px)'
        }),
        animate('300ms cubic-bezier(0.4, 0, 0.2, 1)', style({
          opacity: 1,
          transform: 'scale(1) translateY(0)'
        }))
      ]),
      transition(':leave', [
        animate('200ms cubic-bezier(0.4, 0, 0.2, 1)', style({
          opacity: 0,
          transform: 'scale(0.95) translateY(-20px)'
        }))
      ])
    ]),
    trigger('backdropFade', [
      transition(':enter', [
        style({ opacity: 0 }),
        animate('300ms ease-out', style({ opacity: 1 }))
      ]),
      transition(':leave', [
        animate('200ms ease-out', style({ opacity: 0 }))
      ])
    ])
  ]
})
export class LoginModal implements OnInit, OnDestroy {
  @Output() close = new EventEmitter<void>();
  @Output() loginSuccess = new EventEmitter<void>();

  loginForm!: FormGroup;
  signupForm!: FormGroup;
  showPassword = false;
  showConfirmPassword = false;
  loading = false;
  errorMessage = '';
  isSignupMode = false;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.initForm();
    this.initGoogleSignIn();
    // Autofocus email field
    setTimeout(() => {
      const emailInput = document.getElementById('email-input');
      if (emailInput) {
        emailInput.focus();
      }
    }, 100);
  }

  initGoogleSignIn(): void {
    // Wait for Google Identity Services to load
    if (typeof window !== 'undefined' && (window as any).google) {
      this.setupGoogleSignIn();
    } else {
      // Retry after a delay if Google script hasn't loaded yet
      let retryCount = 0;
      const maxRetries = 3;
      
      const checkGoogle = setInterval(() => {
        retryCount++;
        if ((window as any).google) {
          clearInterval(checkGoogle);
          this.setupGoogleSignIn();
        } else if (retryCount >= maxRetries) {
          clearInterval(checkGoogle);
          // If Google script doesn't load after retries, show fallback
          console.warn('Google Identity Services script failed to load. Using fallback login.');
          this.showFallbackButton();
        }
      }, 1000);
    }
  }

  setupGoogleSignIn(): void {
    try {
      const googleButtonElement = document.getElementById('google-signin-button');
      if (!googleButtonElement) {
        console.warn('Google sign-in button element not found');
        this.showFallbackButton();
        return;
      }

      // Check if we have a valid client ID (not the placeholder)
      const clientId = 'YOUR_GOOGLE_CLIENT_ID.apps.googleusercontent.com';
      
      // If using placeholder, show fallback button instead
      if (clientId.includes('YOUR_GOOGLE_CLIENT_ID')) {
        console.info('Google OAuth client ID not configured. Using fallback login.');
        this.showFallbackButton();
        return;
      }

      (window as any).google.accounts.id.initialize({
        client_id: clientId,
        callback: this.handleGoogleSignIn.bind(this),
        auto_select: false,
        cancel_on_tap_outside: true
      });

      // Render the button
      (window as any).google.accounts.id.renderButton(
        googleButtonElement,
        {
          theme: 'outline',
          size: 'large',
          width: '100%',
          text: 'signin_with',
          locale: 'en'
        }
      );
    } catch (error: any) {
      console.error('Error initializing Google Sign-In:', error);
      // Show fallback button if Google services fail
      this.showFallbackButton();
      
      // Show user-friendly error message
      if (error?.message?.includes('client_id') || error?.message?.includes('invalid')) {
        console.info('Google OAuth client ID error. Using fallback login.');
      }
    }
  }

  showFallbackButton(): void {
    // Hide the Google Identity Services button container
    const googleButtonElement = document.getElementById('google-signin-button');
    if (googleButtonElement) {
      googleButtonElement.style.display = 'none';
    }
    
    // Show the fallback button
    const fallbackButton = document.querySelector('.fallback-google-btn') as HTMLElement;
    if (fallbackButton) {
      fallbackButton.style.display = 'flex';
    }
  }

  handleGoogleSignIn(response: any): void {
    try {
      // Decode JWT token
      const base64Url = response.credential.split('.')[1];
      const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
      const jsonPayload = decodeURIComponent(atob(base64).split('').map(function(c) {
        return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
      }).join(''));

      const payload = JSON.parse(jsonPayload);

      // Extract user info
      const googleUser = {
        id: payload.sub,
        email: payload.email,
        name: payload.name,
        avatar: payload.picture,
        provider: 'google' as const
      };

      this.loading = true;
      this.errorMessage = '';

      this.authService.loginWithGoogle(googleUser).subscribe({
        next: (success) => {
          if (success) {
            this.loginSuccess.emit();
            this.closeModal();
          }
          this.loading = false;
        },
        error: (error) => {
          this.errorMessage = error.message || 'Google login failed';
          this.loading = false;
        }
      });
    } catch (error) {
      console.error('Error processing Google sign-in:', error);
      this.errorMessage = 'Failed to process Google sign-in. Please try again.';
      this.loading = false;
    }
  }

  ngOnDestroy(): void {
    // Cleanup if needed
  }

  @HostListener('document:keydown.escape', ['$event'])
  onEscapeKey(event: Event): void {
    this.closeModal();
  }

  initForm(): void {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });

    this.signupForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(2)]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['', [Validators.required]]
    }, { validators: this.passwordMatchValidator.bind(this) });
  }

  passwordMatchValidator(form: FormGroup): { [key: string]: boolean } | null {
    const password = form.get('password');
    const confirmPassword = form.get('confirmPassword');
    if (password && confirmPassword && password.value !== confirmPassword.value) {
      confirmPassword.setErrors({ passwordMismatch: true });
      return { passwordMismatch: true };
    }
    if (confirmPassword && confirmPassword.hasError('passwordMismatch') && password && confirmPassword.value === password.value) {
      confirmPassword.setErrors(null);
    }
    return null;
  }

  toggleSignupMode(): void {
    this.isSignupMode = !this.isSignupMode;
    this.errorMessage = '';
    this.loginForm.reset();
    this.signupForm.reset();
  }

  toggleConfirmPasswordVisibility(): void {
    this.showConfirmPassword = !this.showConfirmPassword;
  }

  togglePasswordVisibility(): void {
    this.showPassword = !this.showPassword;
  }

  get emailControl() {
    return this.isSignupMode ? this.signupForm.get('email') : this.loginForm.get('email');
  }

  get passwordControl() {
    return this.isSignupMode ? this.signupForm.get('password') : this.loginForm.get('password');
  }

  get nameControl() {
    return this.signupForm.get('name');
  }

  get confirmPasswordControl() {
    return this.signupForm.get('confirmPassword');
  }

  getNameError(): string {
    const control = this.nameControl;
    if (control?.hasError('required')) {
      return 'Name is required';
    }
    if (control?.hasError('minlength')) {
      return 'Name must be at least 2 characters';
    }
    return '';
  }

  getConfirmPasswordError(): string {
    const control = this.confirmPasswordControl;
    if (control?.hasError('required')) {
      return 'Please confirm your password';
    }
    if (control?.hasError('passwordMismatch')) {
      return 'Passwords do not match';
    }
    return '';
  }

  getEmailError(): string {
    const control = this.emailControl;
    if (control?.hasError('required')) {
      return 'Email is required';
    }
    if (control?.hasError('email')) {
      return 'Please enter a valid email';
    }
    return '';
  }

  getPasswordError(): string {
    const control = this.passwordControl;
    if (control?.hasError('required')) {
      return 'Password is required';
    }
    if (control?.hasError('minlength')) {
      return 'Password must be at least 6 characters';
    }
    return '';
  }

  onSubmit(): void {
    if (this.isSignupMode) {
      this.onSignup();
    } else {
      this.onLogin();
    }
  }

  onLogin(): void {
    if (this.loginForm.valid) {
      this.loading = true;
      this.errorMessage = '';

      const { email, password } = this.loginForm.value;

      this.authService.loginWithEmail(email, password).subscribe({
        next: (success) => {
          if (success) {
            this.loginSuccess.emit();
            this.closeModal();
          }
          this.loading = false;
        },
        error: (error) => {
          this.errorMessage = error.message || 'Invalid email or password';
          this.loading = false;
        }
      });
    } else {
      // Mark all fields as touched to show errors
      Object.keys(this.loginForm.controls).forEach(key => {
        this.loginForm.get(key)?.markAsTouched();
      });
    }
  }

  onSignup(): void {
    if (this.signupForm.valid) {
      this.loading = true;
      this.errorMessage = '';

      const { name, email, password } = this.signupForm.value;

      this.authService.signup(name, email, password).subscribe({
        next: (success) => {
          if (success) {
            this.loginSuccess.emit();
            this.closeModal();
          }
          this.loading = false;
        },
        error: (error) => {
          this.errorMessage = error.message || 'Sign up failed. Please try again.';
          this.loading = false;
        }
      });
    } else {
      // Mark all fields as touched to show errors
      Object.keys(this.signupForm.controls).forEach(key => {
        this.signupForm.get(key)?.markAsTouched();
      });
    }
  }

  onGoogleLogin(): void {
    // This method is kept for fallback mock login if Google Identity Services fails
    // In production, Google Identity Services will handle the login automatically
    this.loading = true;
    this.errorMessage = '';

    // Fallback mock Google login (for development/testing)
    const mockGoogleUser = {
      id: 'google_' + Date.now(),
      email: 'user@gmail.com',
      name: 'Google User',
      avatar: 'https://via.placeholder.com/40',
      provider: 'google' as const
    };

    this.authService.loginWithGoogle(mockGoogleUser).subscribe({
      next: (success) => {
        if (success) {
          this.loginSuccess.emit();
          this.closeModal();
        }
        this.loading = false;
      },
      error: (error) => {
        this.errorMessage = error.message || 'Google login failed';
        this.loading = false;
      }
    });
  }

  closeModal(): void {
    this.close.emit();
  }

  onBackdropClick(event: MouseEvent): void {
    const target = event.target as HTMLElement;
    if (target.classList.contains('modal-backdrop')) {
      this.closeModal();
    }
  }
}

