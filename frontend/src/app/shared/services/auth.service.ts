import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { environment } from '../../../environments/environment';
import { User } from '../../pages/users/classes/User';
import { Token } from '../classes/Token';
import { TokenService } from './token.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private loggedIn: BehaviorSubject<boolean>;
  private loggedInUser = new BehaviorSubject<User>(null);

  constructor(private http: HttpClient, private router: Router, private tokenService: TokenService) {
    this.loggedIn = new BehaviorSubject<boolean>(this.tokenService.hasValidToken());
  }

  get loggedIn$() {
    return this.loggedIn.asObservable();
  }

  get loggedInUser$() {
    return this.loggedInUser.asObservable();
  }

  getLoggedInUserValue(): User {
    return this.loggedInUser.value;
  }

  isLoggedIn(): boolean {
    return this.tokenService.hasValidToken();
  }

  login(email: string, password: string): Observable<Token> {
    return this.http.post<Token>(`${environment.apiUrl}/account/login`, { email, password }).pipe(
      tap((token: Token) => {
        this.tokenService.setToken(token);
        this.loggedIn.next(true);
        this.loadLoggedInUser();
      })
    );
  }

  loadLoggedInUser() {
    this.http.get<User>(`${environment.apiUrl}/users/me`).subscribe({
      next: (user: User) => {
        this.loggedInUser.next(user);
      }
    });
  }

  logout() {
    this.tokenService.clearToken();

    this.loggedIn.next(false);
    this.loggedInUser.next(null);
    this.router.navigate(['login']);
  }
}
