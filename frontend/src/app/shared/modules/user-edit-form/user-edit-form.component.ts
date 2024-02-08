import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { UserService } from '../../../pages/users/services/user.service';
import { Router } from '@angular/router';
import { User } from '../../../pages/users/classes/User';
import { BadgeService } from '../../../pages/badges/services/badge.service';
import { Badge } from 'src/app/pages/badges/classes/badge';
import { UserBadge } from '../../../pages/users/classes/UserBadge';

@Component({
  selector: 'app-user-edit-form',
  templateUrl: './user-edit-form.component.html',
  styleUrls: ['./user-edit-form.component.scss']
})
export class UserEditFormComponent implements OnInit {
  @Input() user: User;

  userCreateForm: FormGroup;
  selectedBadges: {[key: string]: boolean} = {};

  badges: Badge[];

  constructor(
    private userService: UserService,
    private router: Router,
    private badgeService: BadgeService
  ) {}

  ngOnInit() {
    this.initForm();
    this.getBadges();
    this.initSelectedBadges();
  }

  initSelectedBadges() {
    if (this.user.badges) {
      for (const badge of this.user.badges) {
        this.selectedBadges[badge.id.toString()] = true;
      }
    }
  }

  mapSelectedBadgesToUserBadges(): UserBadge[] {
    return Object.keys(this.selectedBadges).filter((badgeId) => {
      return this.selectedBadges[badgeId] === true;
    }).map((badgeId) => {
      return {
        id: parseInt(badgeId)
      }
    })
  }

  toggleSelectedBadge(badgeId: number) {
    this.selectedBadges[badgeId] = !this.selectedBadges[badgeId];
  }

  getBadges() {
    this.badgeService.getBadges().subscribe({
      next: (badges) => {
        this.badges = badges;
      }
    })
  }

  initForm() {
    this.userCreateForm = new FormGroup({
      name: new FormControl(this.user ? this.user.name : '', [
        Validators.required,
        Validators.minLength(3),
      ]),
      image: new FormControl(this.user ? this.user.image : '', [Validators.required])
    });
  }

  saveForm() {
    const userFormData: User = this.userCreateForm.getRawValue();
    userFormData.badges = this.mapSelectedBadgesToUserBadges();

    if (this.user) {
      this.userService.updateUser(this.user.id, userFormData).subscribe({
        next: () => {
          this.router.navigate(['users']);
        }
      });
    } else {
      this.userService.createUser(userFormData).subscribe({
        next: () => {
          this.router.navigate(['users']);
        }
      });
    }
  }
}
