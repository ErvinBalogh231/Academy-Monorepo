import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {UserEditComponent} from "./user-edit.component";
import {UserEditFormModule} from "../../shared/modules/user-edit-form/user-edit-form.module";



@NgModule({
  declarations: [UserEditComponent],
  imports: [
    CommonModule,
    UserEditFormModule
  ]
})
export class UserEditModule { }
