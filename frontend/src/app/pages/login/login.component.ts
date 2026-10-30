import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';
import { AuthService } from '../../shared/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
  email: string;
  password: string;
  errorMessage: string;
  loading = false;

  constructor(private authService: AuthService, private router: Router) {
  }

  login() {
    this.loading = true;
    this.errorMessage = null;

    this.authService.login(this.email, this.password).subscribe({
      next: () => {
        this.router.navigate(['users']);
      },
      error: (error: HttpErrorResponse) => {
        this.loading = false;
        this.errorMessage = error.status === 401
          ? 'Invalid email or password.'
          : 'Could not reach the server.';
      }
    });
  }
}
