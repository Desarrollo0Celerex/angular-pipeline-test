import { AbstractControl, ValidationErrors , ValidatorFn } from '@angular/forms';

import { ALPHANUMERICS, PUNCTUATION_MARKS } from '@constants/global';
import { UtilitiesHelper } from '@helpers/utilities.helper';

import * as moment from 'moment';

export class ValidatorsHelper {

    /**
     * Validate an alphanumeric
     * @param  control The control to evaluate
     * @return         Error object if validation failed, otherwise null.
     */
    static alphanumeric(control: AbstractControl): ValidationErrors | null {
        if(ValidatorsHelper._checkCanValidate(control) === true) {
            const regex = /^[&a-zA-Z0-9ñÑáéíóúÁÉÍÓÚ ]*$/;
            const value = control.value;
            return (!regex.test(value)) ? {alphanumeric: true} : null;
        }
        return null;
    }

    /**
     * Validate a brand name
     * @param  control The control to evaluate
     * @return         Error object if validation failed, otherwise null.
     */
    static brandName(control: AbstractControl): ValidationErrors | null {
        if(ValidatorsHelper._checkCanValidate(control) === true) {
            const regex = new RegExp(`^[${ALPHANUMERICS} ${PUNCTUATION_MARKS}`);
            const value = control.value;
            return (!regex.test(value)) ? {alphanumeric: true} : null;
        }
        return null;
    }

    /**
     * Validate an amount
     * @param  control The control to evaluate
     * @return         Error object if validation failed, otherwise null.
     */
    static amount(control: AbstractControl): ValidationErrors | null {
        if(ValidatorsHelper._checkCanValidate(control) === true) {
            const regex = /^-?(([1-9]\d{0,2}(,\d{3}){0,2})|\d{0,9})?(\.\d{1,2})?$/;
            const value = control.value;
            return (!regex.test(value)) ? {currency: true} : null;
        }
        return null;
    }

    /**
     * Validate a short date
     * @param  control The control to evaluate
     * @return         Error object if validation failed, otherwise null.
     */
    static date(control: AbstractControl): ValidationErrors | null {
        if(ValidatorsHelper._checkCanValidate(control) === true) {
            const regex = /^[0-9]{2}\/[0-9]{2}\/[0-9]{4}$/;
            const value = control.value;
            return (!regex.test(value)) ? {date: true} : null;
        }
        return null;
    }

    /**
     * Validate a date greater than other
     * @param  minorDate The minor date
     * @return           The validation function
     */
    static dateGreaterThan(minorDate: string): ValidatorFn  {
        return (control: AbstractControl): ValidationErrors | null => {
            if(ValidatorsHelper._checkCanValidate(control) === true && typeof control.value !== 'undefined') {
                const date1 = moment(minorDate);
                const date2 = moment(UtilitiesHelper.getOriginalDateFormat(control.value));
                return (!date2.isSameOrAfter(date1)) ? { dateGreaterThan: true } : null;
            }
            return null;
        }
    }

    /**
     * Validate a file name
     * @param  control The control to evaluate
     * @return         Error object if validation failed, otherwise null.
     */
    static fileName(control: AbstractControl): ValidationErrors | null {
        if(ValidatorsHelper._checkCanValidate(control) === true) {
            const regex = new RegExp(`^[${ALPHANUMERICS} ${PUNCTUATION_MARKS}`);
            const value = control.value;
            return (!regex.test(value)) ? {fileName: true} : null;
        }
        return null;
    }

    /**
     * Validate a free text
     * @param  control The control to evaluate
     * @return         [description]
     */
    static freeText(control: AbstractControl): ValidationErrors | null {
        if(ValidatorsHelper._checkCanValidate(control) === true) {
            const regex = /^[&a-zA-Z0-9ñÑáéíóúÁÉÍÓÚ,.:;\-\"()¿?¡!_ ]{3,1000}$/;
            const value = control.value;
            return (!regex.test(value)) ? {freeText: true} : null;
        }
        return null;
    }

    /**
     * Validate a license code
     * @param  control The control to evaluate
     * @return         Error object if validation failed, otherwise null.
     */
    static licenseCode(control: AbstractControl): ValidationErrors | null {
        if(ValidatorsHelper._checkCanValidate(control) === true) {
            const regex = /^[0-9]{16}$/;
            const value = control.value;
            return (!regex.test(value)) ? {licenseCode: true} : null;
        }
        return null;
    }

    /**
     * Validate a number
     * @param  control The control to evaluate
     * @return         Error object if validation failed, otherwise null.
     */
    static number(control: AbstractControl): ValidationErrors | null {
        if(ValidatorsHelper._checkCanValidate(control) === true) {
            const regex = /^[0-9]{1,10}$/;
            const value = control.value;
            return (!regex.test(value)) ? {number: true} : null;
        }
        return null;
    }

    /**
     * Validate a multitext
     * @param  control The control to evaluate
     * @return         [description]
     */
    static multitext(control: AbstractControl): ValidationErrors | null {
        if(ValidatorsHelper._checkCanValidate(control) === true) {
            const regex = /^[&a-zA-Z0-9ñÑáéíóúÁÉÍÓÚ,.:;\-\"()¿?¡!_\/\|#%\r\n$ ]{1,1000}$/;
            const value = control.value;
            return (!regex.test(value)) ? {freeText: true} : null;
        }
        return null;
    }

    /**
     * Validate an own name
     * @param  control The control to evaluate
     * @return         Error object if validation failed, otherwise null.
     */
    static ownName(control: AbstractControl): ValidationErrors | null {
        if(ValidatorsHelper._checkCanValidate(control) === true) {
            const regex = new RegExp(`^[${ALPHANUMERICS} ${PUNCTUATION_MARKS}`);
            const value = control.value;
            return (!regex.test(value)) ? {alphanumeric: true} : null;
        }
        return null;
    }

    /**
     * Validate a postal code
     * @param  control The control to evaluate
     * @return         Error object if validation failed, otherwise null.
     */
    static postalCode(control: AbstractControl): ValidationErrors | null {
        if(ValidatorsHelper._checkCanValidate(control) === true) {
            const regex = /^[0-9]{5}$/;
            const value = control.value;
            return (!regex.test(value)) ? {postalCode: true} : null;
        }
        return null;
    }

    /**
     * Validate a phone number
     * @param  control The control to evaluate
     * @return         Error object if validation failed, otherwise null.
     */
    static phoneNumber(control: AbstractControl): ValidationErrors | null {
        if(ValidatorsHelper._checkCanValidate(control) === true) {
            const regex = /^[0-9]{10}$/;
            const value = control.value;
            return (!regex.test(value)) ? {phoneNumber: true} : null;
        }
        return null;
    }

    /**
     * Validate a real name
     * @param  control The control to evaluate
     * @return         Error object if validation failed, otherwise null.
     */
    static realName(control: AbstractControl): ValidationErrors | null {
        if(ValidatorsHelper._checkCanValidate(control) === true) {
            const regex = new RegExp(`^[${ALPHANUMERICS} ${PUNCTUATION_MARKS}`);
            const value = control.value;
            return (!regex.test(value)) ? {alphanumeric: true} : null;
        }
        return null;
    }

    /**
     * Validate a web link
     * @param  control The control to evaluate
     * @return         Error object if validation failed, otherwise null.
     */
    static webLink(control: AbstractControl): ValidationErrors | null {
        if(ValidatorsHelper._checkCanValidate(control) === true) {
            const regex = /^(https:\/\/)?([\da-zA-ZñÑ\.-]+)\.([a-zA-ZñÑ\.]{2,6})([\/\w \.-]*)*\/?$/;
            let value = control.value;
            return (!regex.test(value)) ? {webLink: true} : null;
        }
        return null;
    }

    /**
     * Check if a control can be validated
     * @param  control The control to evaluate
     * @return         True if you can, otherwise null.
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
