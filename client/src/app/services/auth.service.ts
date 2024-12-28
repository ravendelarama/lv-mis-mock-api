import { Injectable } from '@angular/core';
import { jwtDecode } from 'jwt-decode';
@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor() {}

  setToken(
    name: 'portal-access-token' | 'portal-refresh-token',
    value: string
  ) {
    localStorage.setItem(name, value);
  }

  getToken(
    name: 'portal-access-token' | 'portal-refresh-token'
  ): string | null {
    return localStorage.getItem(name);
  }

  removeToken(name: 'portal-access-token' | 'portal-refresh-token') {
    localStorage.removeItem(name);
  }

  isAuthenticated(): boolean {
    const token = this.getToken('portal-access-token');
    if (!token) {
      return false;
    }
    try {
      const decodedToken: any = jwtDecode(token);
      const currentTime = Math.floor(new Date().getTime() / 1000);
      return decodedToken.exp > currentTime;
    } catch (error) {
      return false;
    }
  }
}
