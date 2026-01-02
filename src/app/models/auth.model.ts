export interface User {
  id: string;
  email: string;
  name: string;
  avatar?: string;
  provider?: 'email' | 'google';
}

export interface AuthState {
  isAuthenticated: boolean;
  user: User | null;
  token?: string;
  expiresAt?: number;
}

export interface LoginCredentials {
  email: string;
  password: string;
}

