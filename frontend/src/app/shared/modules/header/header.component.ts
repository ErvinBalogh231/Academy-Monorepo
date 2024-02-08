import { Component, OnDestroy, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit, OnDestroy {
  email: string;
  loggedInEmailSub: Subscription;

  constructor(private authService: AuthService) {
  }

  ngOnInit(): void {
    this.loggedInEmailSub = this.authService.loggedInEmail$.subscribe((email: string) => {
      this.email = email;
    });
  }

  logout() {
    this.authService.logout();
  }

  ngOnDestroy() {
    if (this.loggedInEmailSub) {
      this.loggedInEmailSub.unsubscribe();
    }
  }
}
