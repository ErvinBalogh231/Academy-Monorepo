import { Pipe, PipeTransform } from '@angular/core';
import { FormGroup, Validators } from '@angular/forms';

@Pipe({
  name: 'isControlRequired',
  pure: false
})
export class IsControlRequiredPipe implements PipeTransform {
  transform(formGroup: FormGroup, value: string): boolean {
    return formGroup.get(value).hasValidator(Validators.required);
  }
}
