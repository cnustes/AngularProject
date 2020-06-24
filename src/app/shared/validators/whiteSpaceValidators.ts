import { FormControl } from "@angular/forms";
import { IfStmt } from "@angular/compiler";

export class whiteSpaceValidator {
    static cannotContainSpace(formControl: FormControl) {
        if(formControl.value.indexOf(' ') >= 0) {
            return {cannotContainSpace: true};
        }
        return null;
    }    
}