import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

import { ALPHANUMERICS, PUNCTUATION_MARKS } from '@constants/global';
import { UtilitiesHelper } from '@core/helpers/utilities.helper';

import * as moment from 'moment';

export class ValidatorsHelper {
    /**
     * Validate an alphanumeric
     * @param  control The control to evaluate
     * @return         Error object if validation failed, otherwise null.
     */
    static alphanumeric(control: AbstractControl): ValidationErrors | null {
        if (ValidatorsHelper._checkCanValidate(control) === true) {
            const regex = /^[&a-zA-Z0-9ñÑáéíóúÁÉÍÓÚ ]*$/;
            const value = control.value;
            return !regex.test(value) ? { alphanumeric: true } : null;
        }
        return null;
    }

    /**
     * Validate an alphanumeric with hyphen
     * @param  control The control to evaluate
     * @return         Error object if validation failed, otherwise null.
     */
    static alphanumericWithHyphens(
        control: AbstractControl
    ): ValidationErrors | null {
        if (ValidatorsHelper._checkCanValidate(control) === true) {
            const regex = /^[a-zA-Z0-9ñÑáéíóúÁÉÍÓÚ_\-\ ]*$/;
            const value = control.value;
            return !regex.test(value) ? { alphanumeric: true } : null;
        }
        return null;
    }

    /**
     * Validate a brand name
     * @param  control The control to evaluate
     * @return         Error object if validation failed, otherwise null.
     */
    static brandName(control: AbstractControl): ValidationErrors | null {
        if (ValidatorsHelper._checkCanValidate(control) === true) {
            const regex = new RegExp(
                `^[/${ALPHANUMERICS} ${PUNCTUATION_MARKS}`
            );
            const value = control.value;
            return !regex.test(value) ? { alphanumeric: true } : null;
        }
        return null;
    }

    static amount(control: AbstractControl): ValidationErrors | null {
        if (ValidatorsHelper._checkCanValidate(control) === true) {
            const value: any = control.value;
            return ValidatorsHelper.isValidAmounMexican(value) ||
                ValidatorsHelper.isValidAmounSpanish(value)
                ? null
                : { currency: true };
        }
        return null;
    }

    static amountWithoutZero(
        control: AbstractControl
    ): ValidationErrors | null {
        if (ValidatorsHelper._checkCanValidate(control) === true) {
            let value: any = control.value;
            if (!!value) {
                value = value.toString();
                value = value.replace('.', '');
                value = value.replace(',', '');
                value = value.replace('-', '');
                return parseInt(value) * 1 !== 0 ? null : { currency: true };
            }
        }
        return null;
    }

    static isValidAmounMexican(value: any): boolean {
        const regex = /^-?(([1-9]\d{0,2}(,\d{3}){0,2})|\d{0,9})?(\.\d{1,2})?$/;
        return regex.test(value) ? true : false;
    }

    static isValidAmounSpanish(value: any): boolean {
        const regex = /^-?(([1-9]\d{0,2}(\.\d{3}){0,2})|\d{0,9})?(,\d{1,2})?$/;
        return regex.test(value) ? true : false;
    }

    /**
     * Validate a short date
     * @param  control The control to evaluate
     * @return         Error object if validation failed, otherwise null.
     */
    static date(control: AbstractControl): ValidationErrors | null {
        if (ValidatorsHelper._checkCanValidate(control) === true) {
            const regex =
                /^(0?[1-9]|[12][0-9]|3[01])[\/](0?[1-9]|1[012])[\/]([12][0-9]{3})$/;
            const value = control.value;
            return !regex.test(value) ? { date: true } : null;
        }
        return null;
    }

    /**
     * Validate a date greater than other
     * @param  minorDate The minor date
     * @return           The validation function
     */
    static dateGreaterThan(minorDate: string): ValidatorFn {
        return (control: AbstractControl): ValidationErrors | null => {
            if (
                ValidatorsHelper._checkCanValidate(control) === true &&
                typeof control.value !== 'undefined'
            ) {
                const date1 = moment(minorDate);
                const date2 = moment(
                    UtilitiesHelper.getOriginalDateFormat(control.value)
                );
                return !date2.isSameOrAfter(date1)
                    ? { dateGreaterThan: true }
                    : null;
            }
            return null;
        };
    }

    /**
     * Validate a file name
     * @param  control The control to evaluate
     * @return         Error object if validation failed, otherwise null.
     */
    static fileName(control: AbstractControl): ValidationErrors | null {
        if (ValidatorsHelper._checkCanValidate(control) === true) {
            const regex = new RegExp(
                `^[_${ALPHANUMERICS} ${PUNCTUATION_MARKS}`
            );
            const value = control.value;
            return !regex.test(value) ? { fileName: true } : null;
        }
        return null;
    }

    /**
     * Validate a free text
     * @param  control The control to evaluate
     * @return         [description]
     */
    static freeText(control: AbstractControl): ValidationErrors | null {
        if (ValidatorsHelper._checkCanValidate(control) === true) {
            const regex =
                /^[&a-zA-Z0-9ñÑáéíóúÁÉÍÓÚ,.:;\-\"()¿?¡!_/@ ]{1,1000}$/;
            const value = control.value;
            return !regex.test(value) ? { freeText: true } : null;
        }
        return null;
    }

    static freeTextShort(control: AbstractControl): ValidationErrors | null {
        if (ValidatorsHelper._checkCanValidate(control) === true) {
            const regex = /^[&a-zA-Z0-9ñÑáéíóúÁÉÍÓÚ,.:;\-\"()¿?¡!_/@ ]{1,100}$/;
            const value = control.value;
            return !regex.test(value) ? { freeText: true } : null;
        }
        return null;
    }

    /**
     * Validate a license code
     * @param  control The control to evaluate
     * @return         Error object if validation failed, otherwise null.
     */
    static activationCode(control: AbstractControl): ValidationErrors | null {
        if (ValidatorsHelper._checkCanValidate(control) === true) {
            const regex = /^[A-Z0-9]{5,30}$/;
            const value = control.value;
            return !regex.test(value) ? { activationCode: true } : null;
        }
        return null;
    }

    /**
     * Validate a number
     * @param  control The control to evaluate
     * @return         Error object if validation failed, otherwise null.
     */
    static number(control: AbstractControl): ValidationErrors | null {
        if (ValidatorsHelper._checkCanValidate(control) === true) {
            const regex = /^[0-9]{1,10}$/;
            const value = control.value;
            return !regex.test(value) ? { number: true } : null;
        }
        return null;
    }

    /**
     * Validate a multitext
     * @param  control The control to evaluate
     * @return         [description]
     */
    static multitext(control: AbstractControl): ValidationErrors | null {
        if (ValidatorsHelper._checkCanValidate(control) === true) {
            const regex =
                /^[&a-zA-Z0-9ñÑáéíóúÁÉÍÓÚ,.:;\-\"()¿?¡!_\/\|#%\r\n$@ ]{1,1000}$/;
            const value = control.value;
            return !regex.test(value) ? { freeText: true } : null;
        }
        return null;
    }

    /**
     * Validate an own name
     * @param  control The control to evaluate
     * @return         Error object if validation failed, otherwise null.
     */
    static ownName(control: AbstractControl): ValidationErrors | null {
        if (ValidatorsHelper._checkCanValidate(control) === true) {
            const regex = new RegExp(
                `^[/${ALPHANUMERICS} ${PUNCTUATION_MARKS}`
            );
            const value = control.value;
            return !regex.test(value) ? { alphanumeric: true } : null;
        }
        return null;
    }

    static percentage(control: AbstractControl): ValidationErrors | null {
        if (ValidatorsHelper._checkCanValidate(control) === true) {
            const value: any = control.value;
            const regex = /^(100|(\d{1,2})?(\.\d{1,2})?)$/;
            return regex.test(value) ? null : { percentage: true };
        }
        return null;
    }

    /**
     * Validate a postal code
     * @param  control The control to evaluate
     * @return         Error object if validation failed, otherwise null.
     */
    static postalCode(control: AbstractControl): ValidationErrors | null {
        if (ValidatorsHelper._checkCanValidate(control) === true) {
            const regex = /^[a-zA-Z0-9ñÑ]{3,10}$/;
            const value = control.value;
            return !regex.test(value) ? { postalCode: true } : null;
        }
        return null;
    }

    /**
     * Validate a phone number
     * @param  control The control to evaluate
     * @return         Error object if validation failed, otherwise null.
     */
    static phoneNumber(control: AbstractControl): ValidationErrors | null {
        if (ValidatorsHelper._checkCanValidate(control) === true) {
            const regex = /^[0-9]{7,15}$/;
            const value = control.value;
            return !regex.test(value) ? { phoneNumber: true } : null;
        }
        return null;
    }

    /**
     * Validate a real name
     * @param  control The control to evaluate
     * @return         Error object if validation failed, otherwise null.
     */
    static realName(control: AbstractControl): ValidationErrors | null {
        if (ValidatorsHelper._checkCanValidate(control) === true) {
            const regex = new RegExp(`^[${ALPHANUMERICS} ${PUNCTUATION_MARKS}`);
            const value = control.value;
            return !regex.test(value) ? { alphanumeric: true } : null;
        }
        return null;
    }

    /**
     * Validate a time 10:30 AM
     * @param  control The control to evaluate
     * @return         Error object if validation failed, otherwise null.
     */
    static time(control: AbstractControl): ValidationErrors | null {
        if (ValidatorsHelper._checkCanValidate(control) === true) {
            const regex =
                /^(0?[1-9]|1[012])[:](0?[1-9]|[012345][0-9])[ ](AM|PM)$/;
            const value = control.value;
            return !regex.test(value) ? { date: true } : null;
        }
        return null;
    }

    /**
     * Validate a short date
     * @param  control The control to evaluate
     * @return         Error object if validation failed, otherwise null.
     */
    /*static date(control: AbstractControl): ValidationErrors | null {
        if(ValidatorsHelper._checkCanValidate(control) === true) {
            const regex = /^(0?[1-9]|[12][0-9]|3[01])[\/](0?[1-9]|1[012])[\/]([12][0-9]{3})$/;
            const value = control.value;
            return (!regex.test(value)) ? {date: true} : null;
        }
        return null;
    }*/

    /**
     * Validate an alphanumeric
     * @param  control The control to evaluate
     * @return         Error object if validation failed, otherwise null.
     */
    static username(control: AbstractControl): ValidationErrors | null {
        if (ValidatorsHelper._checkCanValidate(control) === true) {
            const regex = /^[a-z0-9-]*$/;
            const value = control.value;
            return !regex.test(value) ? { alphanumeric: true } : null;
        }
        return null;
    }

    static vehicleModel(control: AbstractControl): ValidationErrors | null {
        if (ValidatorsHelper._checkCanValidate(control) === true) {
            const regex = /^[0-9]{4}$/;
            const value = control.value;
            return !regex.test(value) ? { vehicleModel: true } : null;
        }
        return null;
    }

    /**
     * Validate a web link
     * @param  control The control to evaluate
     * @return         Error object if validation failed, otherwise null.
     */
    static webLink(control: AbstractControl): ValidationErrors | null {
        if (ValidatorsHelper._checkCanValidate(control) === true) {
            const regex =
                /^(https:\/\/)?([\da-zA-ZñÑ\.-]+)\.([a-zA-ZñÑ\.]{2,6})([\/\w \.-]*)*\/?$/;
            let value = control.value;
            return !regex.test(value) ? { webLink: true } : null;
        }
        return null;
    }

    static webLinkCardium(control: AbstractControl): ValidationErrors | null {
        if (ValidatorsHelper._checkCanValidate(control) === true) {
            const regex = /^(https:\/\/my\.cardium\.io\/)([\/\w \.-]+)+\/?$/;
            let value = control.value;
            return !regex.test(value) ? { webLink: true } : null;
        }
        return null;
    }

    static webLinkFacebook(control: AbstractControl): ValidationErrors | null {
        if (ValidatorsHelper._checkCanValidate(control) === true) {
            const regex = /^(https:\/\/facebook\.com\/)([\/\w \.-]+)+\/?$/;
            let value = control.value;
            return !regex.test(value) ? { webLink: true } : null;
        }
        return null;
    }

    static webLinkInstagram(control: AbstractControl): ValidationErrors | null {
        if (ValidatorsHelper._checkCanValidate(control) === true) {
            const regex = /^(https:\/\/instagram\.com\/)([\/\w \.-]+)+\/?$/;
            let value = control.value;
            return !regex.test(value) ? { webLink: true } : null;
        }
        return null;
    }

    static webLinkTwitter(control: AbstractControl): ValidationErrors | null {
        if (ValidatorsHelper._checkCanValidate(control) === true) {
            const regex = /^(https:\/\/twitter\.com\/)([\/\w \.-]+)+\/?$/;
            let value = control.value;
            return !regex.test(value) ? { webLink: true } : null;
        }
        return null;
    }

    static webLinkLinkedin(control: AbstractControl): ValidationErrors | null {
        if (ValidatorsHelper._checkCanValidate(control) === true) {
            const regex = /^(https:\/\/linkedin\.com\/)([\/\w \.-]+)+\/?$/;
            let value = control.value;
            return !regex.test(value) ? { webLink: true } : null;
        }
        return null;
    }

    static webLinkTiktok(control: AbstractControl): ValidationErrors | null {
        if (ValidatorsHelper._checkCanValidate(control) === true) {
            const regex = /^(https:\/\/tiktok\.com\/)([\/\w \.-]+)+\/?$/;
            let value = control.value;
            return !regex.test(value) ? { webLink: true } : null;
        }
        return null;
    }

    /**
     * Check if a control can be validated
     * @param  control The control to evaluate
     * @return         True if you can, otherwise null.
     */
    private static _checkCanValidate(control: AbstractControl): boolean {
        if (Object.keys(control).length > 0) {
            const validators: ValidationErrors | null = control.validator!(
                {} as AbstractControl
            );
            if (
                (validators === null ||
                    (validators !== null &&
                        typeof validators.required == 'undefined')) &&
                control.value === ''
            ) {
                return false;
            }
        }
        return true;
    }
}
