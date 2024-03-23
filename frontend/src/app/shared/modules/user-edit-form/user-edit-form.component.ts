import {Component, Input, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {User} from "../../../pages/users/classes/User";

@Component({
  selector: 'app-user-edit-form',
  templateUrl: './user-edit-form.component.html',
  styleUrl: './user-edit-form.component.scss'
})
export class UserEditFormComponent implements OnInit{
  @Input() user:User

  userCrateForm: FormGroup

  ngOnInit(): void {
    this.initForm()
  }

  initForm() {
    this.userCrateForm = new FormGroup({
      name: new FormControl(this.user ? this.user.name :'', [Validators.required, Validators.minLength(3)],),
      image: new FormControl(this.user ? this.user.image : '',[Validators.required])
    })
  }

}
