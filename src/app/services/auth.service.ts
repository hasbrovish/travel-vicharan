import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of, throwError } from 'rxjs';
import { delay, map, tap } from 'rxjs/operators';
import { User, AuthState, LoginCredentials } from '../models/auth.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private readonly STORAGE_KEY = 'auth_state';
  private authState$ = new BehaviorSubject<AuthState>(this.getStoredAuth());

  // Mock users for testing
  private mockUsers = [
    {
      email: 'demo@example.com',
      password: 'demo123',
      user: {
        id: '1',
        email: 'demo@example.com',
        name: 'Demo User',
        avatar: undefined,
        provider: 'email' as const
      }
    },
    {
      email: 'test@example.com',
      password: 'test123',
      user: {
        id: '2',
        email: 'test@example.com',
        name: 'Test User',
        avatar: undefined,
        provider: 'email' as const
      }
    }
  ];

  constructor() {
    this.loadAuthState();
  }

  /**
   * Login with email and password
   */
  loginWithEmail(email: string, password: string): Observable<boolean> {
    // Find mock user
    const mockUser = this.mockUsers.find(
      u => u.email === email && u.password === password
    );

    if (mockUser) {
      // Simulate network delay
      return of(true).pipe(
        delay(400),
        tap(() => {
          this.setAuthState({
            isAuthenticated: true,
            user: mockUser.user
          });
        })
      );
    } else {
      // Simulate error
      return throwError(() => new Error('Invalid email or password'));
    }
  }

  /**
   * Sign up with email and password
   */
  signup(name: string, email: string, password: string): Observable<boolean> {
    // Check if email already exists
    const existingUser = this.mockUsers.find(u => u.email === email);
    
    if (existingUser) {
      return throwError(() => new Error('Email already registered. Please sign in instead.'));
    }

    // Create new user
    const newUser = {
      id: Date.now().toString(),
      email: email,
      name: name,
      avatar: undefined as undefined,
      provider: 'email' as const
    };

    // Add to mock users
    this.mockUsers.push({
      email: email,
      password: password,
      user: newUser
    });

    // Simulate network delay
    return of(true).pipe(
      delay(400),
      tap(() => {
        this.setAuthState({
          isAuthenticated: true,
          user: newUser
        });
      })
    );
  }

  /**
   * Login with Google
   */
  loginWithGoogle(user: User): Observable<boolean> {
    // Store Google user
    return of(true).pipe(
      delay(300),
      tap(() => {
        this.setAuthState({
          isAuthenticated: true,
          user: {
            ...user,
            provider: 'google'
          }
        });
      })
    );
  }

  /**
   * Logout user
   */
  logout(): void {
    localStorage.removeItem(this.STORAGE_KEY);
    this.authState$.next({
      isAuthenticated: false,
      user: null
    });
  }

  /**
   * Observable for login status
   */
  get isLoggedIn$(): Observable<boolean> {
    return this.authState$.pipe(
      map(state => state.isAuthenticated)
    );
  }

  /**
   * Observable for current user
   */
  get user$(): Observable<User | null> {
    return this.authState$.pipe(
      map(state => state.user)
    );
  }

  /**
   * Get current user synchronously
   */
  getUser(): User | null {
    return this.authState$.value.user;
  }

  /**
   * Get current auth state
   */
  getAuthState(): AuthState {
    return this.authState$.value;
  }

  /**
   * Check if user is authenticated
   */
  isAuthenticated(): boolean {
    return this.authState$.value.isAuthenticated;
  }

  /**
   * Load auth state from localStorage
   */
  private loadAuthState(): void {
    const stored = this.getStoredAuth();
    if (stored.isAuthenticated && stored.user) {
      this.authState$.next(stored);
    }
  }

  /**
   * Get stored auth state from localStorage
   */
  private getStoredAuth(): AuthState {
    try {
      const stored = localStorage.getItem(this.STORAGE_KEY);
      if (stored) {
        return JSON.parse(stored);
      }
    } catch (error) {
      console.error('Error loading auth state:', error);
    }
    return {
      isAuthenticated: false,
      user: null
    };
  }

  /**
   * Save auth state to localStorage
   */
  private setAuthState(state: AuthState): void {
    try {
      localStorage.setItem(this.STORAGE_KEY, JSON.stringify(state));
      this.authState$.next(state);
    } catch (error) {
      console.error('Error saving auth state:', error);
    }
  }
}

