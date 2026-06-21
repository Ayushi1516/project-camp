import { computed, inject, Injectable, signal } from '@angular/core';
import { AuthResponse, AuthUser, User } from '../models/user.model';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { catchError, switchMap, tap, throwError, of } from 'rxjs';

@Injectable({ providedIn: 'root' })

export class AuthService {
  apiUrl = 'http://localhost:3000/api/v1/auth/';
  private http = inject(HttpClient);
  currentUser = signal<AuthUser | null>(null);
  token = signal<string | null>(null);
  isAuthenticated = computed(() => !!this.token());
  userRole = computed(() => this.currentUser()?.role ?? null);

  constructor() {
    this.restoreSession();
  }

  private handleError(error: HttpErrorResponse) {
    let errorMessage = 'An unexpected error occurred';
    
    if (error.error instanceof ErrorEvent) {
      // Client-side error
      errorMessage = error.error.message;
    } else {
      // Server-side error
      errorMessage = error?.error?.message || error.statusText || errorMessage;
    }
    
    console.error('API Error:', errorMessage);
    return throwError(() => new Error(errorMessage));
  }

  loginUser(user: User) {
    return this.http.post<any>(`${this.apiUrl}login`, user).pipe(
      tap((response) => {
        // Support multiple response shapes: { token } or { data: { accessToken } }
        const token = response?.token ?? response?.data?.accessToken ?? response?.accessToken;
        if (token) {
          this.setToken(token);
        }

        let respUser = response?.user ?? response?.data?.user ?? null;
        
        // If no user in response, parse from token
        if (!respUser && token) {
          respUser = this.parseTokenUser(token);
        } else if (respUser && token) {
          // If user exists but missing role, extract from token
          if (!respUser.role) {
            const tokenPayload = this.parseJwt<{ role?: AuthUser['role'] }>(token);
            if (tokenPayload?.role) {
              respUser = { ...respUser, role: tokenPayload.role };
            }
          }
        }

        if (respUser) {
          this.currentUser.set(respUser as AuthUser);
          if (typeof window !== 'undefined' && 'localStorage' in window) {
            localStorage.setItem('auth_user', JSON.stringify(respUser));
          }
        }
      }),
      // If currentUser already present from response, skip fetching; otherwise call protected endpoint
      switchMap(() => (this.currentUser() ? of(this.currentUser()) : this.fetchCurrentUser())),
      catchError((error: HttpErrorResponse) => this.handleError(error))
    );
  }

  requestPasswordReset(email: any) {
    return this.http.post(`${this.apiUrl}forgot-password`, { email }).pipe(
      catchError((error: HttpErrorResponse) => this.handleError(error))
    );
  }

  verifyResetCode(email: any, code: any, password: any) {
    return this.http.post(`${this.apiUrl}reset-password/${code}`, { email, code, password }).pipe(
      catchError((error: HttpErrorResponse) => this.handleError(error))
    );
  }

  registerUser(user: User) {
    return this.http.post(`${this.apiUrl}register`, user).pipe(
      catchError((error: HttpErrorResponse) => this.handleError(error))
    );
  }

  logout() {
    this.token.set(null);
    this.currentUser.set(null);
    if (typeof window !== 'undefined' && 'localStorage' in window) {
      localStorage.removeItem('auth_token');
      localStorage.removeItem('auth_user');
    }
  }

  getToken() {
    return this.token();
  }

  hasRole(role: AuthUser['role']) {
    return this.currentUser()?.role === role;
  }

  hasAnyRole(roles: AuthUser['role'][] = []) {
    return roles.some((role) => this.currentUser()?.role === role);
  }

  private setToken(token: string | null) {
    if (!token) return;

    this.token.set(token);
    if (typeof window !== 'undefined' && 'localStorage' in window) {
      localStorage.setItem('auth_token', token);
    }
  }

  private fetchCurrentUser() {
    return this.http.post<AuthUser>(`${this.apiUrl}current-user`, {}).pipe(
      tap((currentUser) => {
        // If API response doesn't include role, extract from JWT token
        let enrichedUser = currentUser;
        if (!enrichedUser?.role && this.token()) {
          const tokenPayload = this.parseJwt<{ role?: AuthUser['role'] }>(this.token()!);
          if (tokenPayload?.role) {
            enrichedUser = { ...enrichedUser, role: tokenPayload.role };
          }
        }

        this.currentUser.set(enrichedUser);
        if (typeof window !== 'undefined' && 'localStorage' in window) {
          localStorage.setItem('auth_user', JSON.stringify(enrichedUser));
        }
      })
    );
  }

  private setSession(response: AuthResponse) {
    if (!response?.token) return;

    this.setToken(response.token);

    const authUser = response.user ?? this.parseTokenUser(response.token);
    if (authUser) {
      this.currentUser.set(authUser);
      if (typeof window !== 'undefined' && 'localStorage' in window) {
        localStorage.setItem('auth_user', JSON.stringify(authUser));
      }
    }
  }

  private restoreSession() {
    if (typeof window === 'undefined' || !('localStorage' in window)) {
      return;
    }

    const storedToken = localStorage.getItem('auth_token');
    const storedUser = localStorage.getItem('auth_user');

    if (storedToken) {
      this.token.set(storedToken);

      if (storedUser) {
        try {
          this.currentUser.set(JSON.parse(storedUser));
        } catch {
          this.currentUser.set(this.parseTokenUser(storedToken));
        }
      } else {
        this.currentUser.set(this.parseTokenUser(storedToken));
      }
    }
  }

  private parseTokenUser(token: string): AuthUser | null {
    const payload = this.parseJwt<{ id?: string; email?: string; name?: string; username?: string; role?: AuthUser['role'] }>(token);
    if (!payload || !payload.role) {
      return null;
    }

    return {
      id: payload.id,
      email: payload.email ?? null,
      name: payload.name ?? payload.username ?? '',
      role: payload.role,
    };
  }

  private parseJwt<T>(token: string): T | null {
    const parts = token.split('.');
    if (parts.length !== 3) {
      return null;
    }

    try {
      const base64 = parts[1].replace(/-/g, '+').replace(/_/g, '/');
      const jsonPayload = decodeURIComponent(
        Array.prototype.map
          .call(atob(base64), (c: string) => '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2))
          .join('')
      );
      return JSON.parse(jsonPayload) as T;
    } catch {
      return null;
    }
  }

}
