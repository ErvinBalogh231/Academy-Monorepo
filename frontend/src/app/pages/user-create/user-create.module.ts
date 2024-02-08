import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserCreateComponent } from './user-create.component';
import { UserEditFormModule } from '../../shared/modules/user-edit-form/user-edit-form.module';

@NgModule({
  declarations: [
    UserCreateComponent
  ],
  imports: [
    CommonModule,
    UserEditFormModule
  ]
})
export class UserCreateModule { }
