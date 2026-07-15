import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {UserEditFormComponent} from "./user-edit-form.component";
import {IsControlRequiredPipe} from "./pipes/is-control-required.pipe";
import {ReactiveFormsModule} from "@angular/forms";



@NgModule({
  declarations: [UserEditFormComponent, IsControlRequiredPipe],
  exports: [
    UserEditFormComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule
  ]
})
export class UserEditFormModule { }
