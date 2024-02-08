import { Pipe, PipeTransform } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Pipe({
  name: 'isControlHasRequiredError',
  pure: false
})
export class IsControlHasRequiredErrorPipe implements PipeTransform {
  transform(formGroup: FormGroup, value: string): boolean {
    return formGroup.get(value).hasError('required');
  }
}
