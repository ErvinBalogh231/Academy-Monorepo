import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { UserService } from '../users/services/user.service';
import { User } from '../users/classes/User';

@Component({
  selector: 'app-user-edit',
  templateUrl: './user-edit.component.html',
  styleUrls: ['./user-edit.component.scss']
})
export class UserEditComponent {
  user: User;

  constructor(private route: ActivatedRoute, private userService: UserService) {
    this.getUser();
  }

  getUser() {
    const userId = parseInt(this.route.snapshot.paramMap.get('userId'));
    this.userService.getUser(userId).subscribe({
      next: (user) => {
        this.user = user;
      }
    })
  }
}
