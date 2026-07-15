import { Injectable, inject, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { jwtDecode } from 'jwt-decode';
import { Observable, tap } from 'rxjs';
import { environment } from '../../../environments/environment';
import { AuthenticationRequest, AuthenticationResponse, RegisterRequest, UserReadOnly, LoggedInUser } from '../models/auth-interface';

const TOKEN_KEY = 'token';

@Injectable({ providedIn: 'root' })
export class AuthService {

  private http = inject(HttpClient);
  private router = inject(Router);

  user = signal<LoggedInUser | null>(this.decodeStoredToken());

  login(credentials: AuthenticationRequest) {
    return this.http
      .post<AuthenticationResponse>(`${environment.apiUrl}/auth`, credentials)
      .pipe(tap(response => this.setSession(response.token)));
  }

  register(data: RegisterRequest) {
    return this.http.post<UserReadOnly>(`${environment.apiUrl}/users`, data);
  }

  logout() {
    localStorage.removeItem(TOKEN_KEY);
    this.user.set(null);
    this.router.navigate(['/login']);
  }

  getToken(): string | null {
    return localStorage.getItem(TOKEN_KEY);
  }

  private setSession(token: string) {
    localStorage.setItem(TOKEN_KEY, token);
    this.user.set(jwtDecode<LoggedInUser>(token));
  }

  private decodeStoredToken(): LoggedInUser | null {
    const token = localStorage.getItem(TOKEN_KEY);
    if (!token) return null;

    try {
      return jwtDecode<LoggedInUser>(token);
    } catch {
      return null;
    }
  }
}