import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";

@Component({
  selector: 'app-user-edit-form',
  templateUrl: './user-edit-form.component.html',
  styleUrl: './user-edit-form.component.scss'
})
export class UserEditFormComponent implements OnInit{
  userCrateForm: FormGroup

  ngOnInit(): void {
    this.initForm()
  }

  initForm() {
    this.userCrateForm = new FormGroup({
      name: new FormControl('', [Validators.required, Validators.minLength(3)],),
      image: new FormControl('',[Validators.required])
    })
  }

}
