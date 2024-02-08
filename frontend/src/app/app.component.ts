import { Component, OnDestroy, OnInit } from '@angular/core';
import { AuthService } from './shared/services/auth.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit, OnDestroy {
  email: string;
  loggedInEmailSub: Subscription;

  constructor(private authService: AuthService) {
  }

  ngOnInit(): void {
    this.loggedInEmailSub = this.authService.loggedInEmail$.subscribe((email: string) => {
      this.email = email;
    });
  }

  ngOnDestroy() {
    if (this.loggedInEmailSub) {
      this.loggedInEmailSub.unsubscribe();
    }
  }
}
