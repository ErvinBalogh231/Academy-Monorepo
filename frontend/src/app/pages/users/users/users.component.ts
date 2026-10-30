import {Component, OnInit} from '@angular/core';
import { User } from '../classes/User';
import {UserService} from "./services/user.service";
import {Router} from "@angular/router";
import {AuthService} from "../../../shared/services/auth.service";

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrl: './users.component.scss'
})
export class UsersComponent implements OnInit{
  users: User[];

  constructor(private userService: UserService, private authService: AuthService, private router:Router) {
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

  deleteUser(userId:number) {
    this.userService.deleteUser(userId).subscribe({
      next: () => {
        // Deleting your own account ends the session
        if (userId === this.authService.getLoggedInUserValue()?.id) {
          this.authService.logout()
          return
        }

        this.users = this.users.filter((user: User) => {
          return user.id !== userId
        })
      }
    })
  }
}
