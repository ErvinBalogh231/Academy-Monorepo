import { Pipe, PipeTransform } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Pipe({
  name: 'isControlInvalid',
  pure: false
})
export class IsControlInvalidPipe implements PipeTransform {
  transform(formGroup: FormGroup, value: string): boolean {
    return formGroup.get(value).invalid;
  }
}
