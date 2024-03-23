import {Component, OnInit} from '@angular/core';
import { User } from '../classes/User';
import {UserService} from "./services/user.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrl: './users.component.scss'
})
export class UsersComponent implements OnInit{
  users: User[];

  constructor(private userService: UserService, private router:Router) {
  }

  ngOnInit() {
    this.getUsers()
  }

  private getUsers() {
    this.userService.getUsers().subscribe({
      next: (users)=> {
        this.users = users
      }
    })
  }

  navigateToCreateUser() {
    this.router.navigate(['user-create']);
  }

  navigateToEditUser(userId:number){
    this.router.navigateByUrl(`user-edit/${userId}`)
  }
}
