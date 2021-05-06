import { AbstractControl, FormGroup, ValidatorFn } from "@angular/forms";

export function checkPasswords(formGroup: FormGroup) {
    const password = formGroup.get('password').value;
    const confirmPassword = formGroup.get('confirmPassword').value;
  
    return password === confirmPassword ? null : { notSame: true }
}