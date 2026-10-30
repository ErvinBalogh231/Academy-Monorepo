import {Component, Input, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {HttpErrorResponse} from "@angular/common/http";
import {User} from "../../../pages/users/classes/User";
import {UserService} from "../../../pages/users/users/services/user.service";
import {AuthService} from "../../services/auth.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-user-edit-form',
  templateUrl: './user-edit-form.component.html',
  styleUrl: './user-edit-form.component.scss'
})
export class UserEditFormComponent implements OnInit{
  @Input() user:User

  userForm: FormGroup
  errorMessage: string

  constructor(private userService: UserService, private authService: AuthService, private router: Router) {
  }

  ngOnInit(): void {
    this.initForm()
  }

  initForm() {
    this.userForm = new FormGroup({
      firstName: new FormControl(this.user ? this.user.firstName : '', [Validators.maxLength(10)]),
      lastName: new FormControl(this.user ? this.user.lastName : ''),
      email: new FormControl(this.user ? this.user.email : '', [Validators.required, Validators.email]),
      // Required only when creating; when editing, an empty password keeps the current one
      password: new FormControl('', this.user ? [Validators.minLength(6)] : [Validators.required, Validators.minLength(6)])
    })
  }

  saveForm() {
    const userFormData: User = this.userForm.getRawValue()
    if (!userFormData.password) {
      delete userFormData.password
    }

    this.errorMessage = null

    const request = this.user
      ? this.userService.updateUser(this.user.id, userFormData)
      : this.userService.createUser(userFormData)

    request.subscribe({
      next: () => {
        if (this.user && this.user.id === this.authService.getLoggedInUserValue()?.id) {
          this.authService.loadLoggedInUser()
        }

        // Registering (not logged in) goes back to the login page
        this.router.navigate([this.authService.isLoggedIn() ? 'users' : 'login'])
      },
      error: (error: HttpErrorResponse) => {
        this.errorMessage = error.status === 409
          ? 'A user with this email already exists.'
          : 'Saving the user failed.'
      }
    })
  }

}
