import { Component } from '@angular/core';
import {User} from "../users/classes/User";
import {ActivatedRoute} from "@angular/router";
import {UserService} from "../users/users/services/user.service";

@Component({
  selector: 'app-user-edit',
  templateUrl: './user-edit.component.html',
  styleUrl: './user-edit.component.scss'
})
export class UserEditComponent {
  user: User

  constructor(private  route:ActivatedRoute, private userService:UserService) {
    this.getUser()
  }

  getUser(){
    const userId = parseInt(this.route.snapshot.paramMap.get('userId'))
    this.userService.getUser(userId).subscribe({
      next:(user)=> {
        this.user=user
      }
    })

  }
}
