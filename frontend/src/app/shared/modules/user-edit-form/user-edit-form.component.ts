import {Component, Input, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {User} from "../../../pages/users/classes/User";
import {UserService} from "../../../pages/users/users/services/user.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-user-edit-form',
  templateUrl: './user-edit-form.component.html',
  styleUrl: './user-edit-form.component.scss'
})
export class UserEditFormComponent implements OnInit{
  @Input() user:User

  userCrateForm: FormGroup

  constructor(private userService: UserService, private router: Router) {
  }

  ngOnInit(): void {
    this.initForm()
  }

  initForm() {
    this.userCrateForm = new FormGroup({
      name: new FormControl(this.user ? this.user.name :'', [Validators.minLength(3)],),
      image: new FormControl(this.user ? this.user.image : '',[Validators.required])
    })
  }

  saveForm() {
    const userFormData: User = this.userCrateForm.getRawValue()

    if(this.user) {
      this.userService.updateUser(this.user.id, userFormData).subscribe({
        next: () => {
          this.router.navigate(['users'])
        }
      })
    } else {
      this.userService.createUser(userFormData).subscribe({
        next: () => {
          this.router.navigate(['users'])
        }
      })
    }
  }

}
