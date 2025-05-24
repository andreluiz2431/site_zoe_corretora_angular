import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { User } from '../models/user.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private currentUserSubject = new BehaviorSubject<User | null>(null);
  public currentUser$: Observable<User | null> = this.currentUserSubject.asObservable();
  
  constructor() {
    // Check if there's a stored user in localStorage
    const storedUser = localStorage.getItem('currentUser');
    if (storedUser) {
      this.currentUserSubject.next(JSON.parse(storedUser));
    }
  }

  login(email: string, password: string): boolean {
    // This is a mock implementation - will be replaced with actual API call
    // In a real app, this would make an HTTP request to authenticate
    if (email === 'admin@example.com' && password === 'password') {
      const user = { 
        id: '1',
        name: 'Admin User',
        email,
        role: 'client'
      };
      
      // Store user details and JWT token in local storage to keep user logged in
      localStorage.setItem('currentUser', JSON.stringify(user));
      localStorage.setItem('token', 'mock-jwt-token');
      
      this.currentUserSubject.next(user);
      return true;
    }
    
    return false;
  }

  logout(): void {
    // Remove user from local storage and set current user to null
    localStorage.removeItem('currentUser');
    localStorage.removeItem('token');
    this.currentUserSubject.next(null);
  }

  isAuthenticated(): boolean {
    return !!this.currentUserSubject.value;
  }

  getToken(): string | null {
    return localStorage.getItem('token');
  }

  getCurrentUser(): User | null {
    return this.currentUserSubject.value;
  }
}