import {Pipe, PipeTransform} from "@angular/core";
import {FormGroup, Validators} from "@angular/forms";

@Pipe({
    name:'isControlRequired',
    pure:false
})

export class IsControlRequiredPipe implements  PipeTransform {
    transform(fromGroup:FormGroup, value:string): boolean {
        return fromGroup.get(value).hasValidator(Validators.required)
    }
}
