import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private loggedInEmail = new BehaviorSubject<string>(null);

  constructor(private router: Router) {
    this.initLoggedInEmail();
  }

  get loggedInEmail$() {
    return this.loggedInEmail.asObservable();
  }

  getLoggedInEmailValue(): string {
    return this.loggedInEmail.value;
  }

  initLoggedInEmail() {
    const loggedInEmail = localStorage.getItem('loggedInEmail');
    this.loggedInEmail.next(loggedInEmail ?? null);
  }

  login(email: string) {
    localStorage.setItem('loggedInEmail', email);

    this.loggedInEmail.next(email);
    this.router.navigate(['users']);
  }

  logout() {
    localStorage.removeItem('loggedInEmail');

    this.loggedInEmail.next(null);
    this.router.navigate(['login']);
  }
}
