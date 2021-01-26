import { AbstractControl, ValidationErrors } from '@angular/forms';

import { ALPHANUMERICS, PUNCTUATION_MARKS } from '@constants/global';

export class ValidatorsHelper {

    /**
     * Validate a real name
     * @param  control Control
     * @return         Error object if validation was successful, otherwise false.
     */
    static realName(control: AbstractControl) {
        if(ValidatorsHelper._checkCanValidate(control) === true) {
            const regex = new RegExp(`^[${ALPHANUMERICS} ${PUNCTUATION_MARKS}`);
            const value = control.value;
            return (!regex.test(value)) ? {alphanumeric: true} : null;
        }
        return null;
    }

    /**
     * Validate a brand name
     * @param  control Control
     * @return         Error object if validation was successful, otherwise false.
     */
    static brandName(control: AbstractControl) {
        if(ValidatorsHelper._checkCanValidate(control) === true) {
            const regex = new RegExp(`^[${ALPHANUMERICS} ${PUNCTUATION_MARKS}`);
            const value = control.value;
            return (!regex.test(value)) ? {alphanumeric: true} : null;
        }
        return null;
    }

    /**
     * Validate an own name
     * @param  control Control
     * @return         Error object if validation was successful, otherwise false.
     */
    static ownName(control: AbstractControl) {
        if(ValidatorsHelper._checkCanValidate(control) === true) {
            const regex = new RegExp(`^[${ALPHANUMERICS} ${PUNCTUATION_MARKS}`);
            const value = control.value;
            return (!regex.test(value)) ? {alphanumeric: true} : null;
        }
        return null;
    }

    /**
     * Validate a phone number
     * @param  control Control
     * @return         Error object if validation was successful, otherwise false.
     */
    static phoneNumber(control: AbstractControl) {
        if(ValidatorsHelper._checkCanValidate(control) === true) {
            const regex = /^[0-9]{10}$/;
            const value = control.value;
            return (!regex.test(value)) ? {phoneNumber: true} : null;
        }
        return null;
    }

    /**
     * Validate a web link
     * @param  control Control
     * @return         Error object if validation was successful, otherwise false.
     */
    static webLink(control: AbstractControl): Object | null {
        if(ValidatorsHelper._checkCanValidate(control) === true) {
            const regex = /^(https:\/\/)?([\da-zñ\.-]+)\.([a-zñ\.]{2,6})([\/\w \.-]*)*\/?$/;
            let value = control.value;
            return (!regex.test(value)) ? {webLink: true} : null;
        }
        return null;
    }

    /**
     * Check if a control can be validated
     * @param  control Control
     * @return         True if you can, otherwise false.
     */
    private static _checkCanValidate(control: AbstractControl): boolean {
        if( Object.keys(control).length > 0) {
            const validators: ValidationErrors | null = control.validator!({} as AbstractControl);
            if((validators === null || (validators !== null && typeof validators.required == 'undefined') ) && control.value === '') {
                return false;
            }
        }
        return true;
    }
}
