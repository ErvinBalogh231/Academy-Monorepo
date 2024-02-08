import { Component, OnInit } from '@angular/core';
import { User } from './classes/User';
import { UserService } from './services/user.service';
import { Router } from '@angular/router';
import { Badge } from '../badges/classes/badge';
import { BadgeService } from '../badges/services/badge.service';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss'],
})
export class UsersComponent implements OnInit {
  users: User[];
  badges: Badge[];

  constructor(
    private userService: UserService,
    private badgeService: BadgeService,
    private router: Router
  ) {}

  ngOnInit() {
    this.getUsers();
    this.getBadges();
  }

  getUsers() {
    this.userService.getUsers().subscribe({
      next: (users) => {
        this.users = users;
      },
    });
  }

  getBadges() {
    this.badgeService.getBadges().subscribe({
      next: (badges: Badge[]) => {
        this.badges = badges;
      }
    })
  }

  navigateToCreateUser() {
    this.router.navigate(['user-create']);
  }

  navigateToEditUser(userId: number) {
    this.router.navigateByUrl(`user-edit/${userId}`);
  }

  deleteUser(userId: number) {
    this.userService.deleteUser(userId).subscribe({
      next: () => {
        this.users = this.users.filter((user: User) => {
          return user.id !== userId;
        });
      }
    })
  }
}
