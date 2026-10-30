import { Component, OnInit } from '@angular/core';
import { AuthService } from './shared/services/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  loggedIn$ = this.authService.loggedIn$;

  constructor(private authService: AuthService) {
  }

  ngOnInit() {
    if (this.authService.isLoggedIn()) {
      this.authService.loadLoggedInUser();
    }
  }
}
