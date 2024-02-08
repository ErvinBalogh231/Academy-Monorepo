import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserEditFormComponent } from './user-edit-form.component';
import { ReactiveFormsModule } from '@angular/forms';
import { IsControlInvalidPipe } from './pipes/is-control-invalid.pipe';
import { IsControlRequiredPipe } from './pipes/is-control-required.pipe';
import { IsControlHasRequiredErrorPipe } from './pipes/is-control-has-required-error.pipe';

@NgModule({
  declarations: [
    UserEditFormComponent,
    IsControlInvalidPipe,
    IsControlRequiredPipe,
    IsControlHasRequiredErrorPipe
  ],
  exports: [
    UserEditFormComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule
  ]
})
export class UserEditFormModule { }
