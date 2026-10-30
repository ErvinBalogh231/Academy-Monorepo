import { Injectable } from '@angular/core';
import { Token } from '../classes/Token';

const TOKEN_KEY = 'token';
const EXPIRES_KEY = 'tokenExpires';

// Kept separate from AuthService (no HttpClient dependency), so the HTTP interceptor can use it
@Injectable({
  providedIn: 'root'
})
export class TokenService {
  getToken(): string {
    return this.hasValidToken() ? localStorage.getItem(TOKEN_KEY) : null;
  }

  setToken(token: Token) {
    localStorage.setItem(TOKEN_KEY, token.token);
    localStorage.setItem(EXPIRES_KEY, token.expires);
  }

  clearToken() {
    localStorage.removeItem(TOKEN_KEY);
    localStorage.removeItem(EXPIRES_KEY);
  }

  hasValidToken(): boolean {
    const token = localStorage.getItem(TOKEN_KEY);
    const expires = localStorage.getItem(EXPIRES_KEY);

    return !!token && !!expires && new Date(expires).getTime() > Date.now();
  }
}
