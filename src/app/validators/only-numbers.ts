import { AbstractControl, ValidatorFn } from '@angular/forms';

export function ValidateNumber(): ValidatorFn {
    return (control: AbstractControl): { [key: string]: boolean } | null => {
        if (control.value !== undefined && control.value < 5) {
            return { 'minBet': true };
        }
        return null;
    };
}
