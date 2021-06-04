import { AbstractControl, ValidationErrors } from '@angular/forms';

export class InputValidatorHelper {

    /**
     * Get the validation class
     * @param  control         Control
     * @param  isFormSubmitted Is form submitted
     * @return                 Validation class
     */
    static getValidationClass(control: AbstractControl | null, isFormSubmitted: boolean): string {
        let validationClass: string = '';
        if(control !== null) {
            const validators = control.validator!( {} as AbstractControl);
            // If the field is not required
            if((validators === null || (validators !== null && typeof validators.required == 'undefined') ) && control.value === '') {
                validationClass = '';
            } else if(control.touched || isFormSubmitted) {
                // If the field is disabled
                if(control.status === 'DISABLED') {
                    validationClass = '';
                } else {
                    validationClass = (control.valid) ? 'is-valid' : 'is-invalid';
                }
            }
        }
        return validationClass;
    }

    /**
     * Get the error message
     * @param  errors Error to evaluate
     * @return        Error message
     */
    static getErrorMessage(control: AbstractControl | null): string {
        let message: string = '';
        if(!!control) {
            const error: ValidationErrors | null = control.errors;
            if(!!error) {
                switch(true) {
                    case (typeof error.required !== 'undefined'):
                        message = 'Por favor complete este campo.';
                        break;
                    case (typeof error.minlength !== 'undefined'):
                        message = 'Solo se permiten palabras con más de '+error.minlength.requiredLength+' caracteres.';
                        break;
                    case (typeof error.maxlength !== 'undefined'):
                        message = 'Solo se permiten palabras con menos de '+error.maxlength.requiredLength+' caracteres.';
                        break;
                    case (typeof error.alphanumeric !== 'undefined'):
                        message = 'Solo se permiten textos con números y letras.';
                        break;
                    case (typeof error.phoneNumber !== 'undefined'):
                        message = 'Por favor ingresa un número de 10 dígitos.';
                        break;
                    case (typeof error.webLink !== 'undefined'):
                        message = 'Por favor ingresa un enlace válido.';
                        break;
                    case (typeof error.numeric !== 'undefined'):
                        message = 'Por favor ingresa un número válido.';
                        break;
                    case (typeof error.email !== 'undefined'):
                        message = 'Por favor ingresa un correo válido.';
                        break;
                    case (typeof error.licenseCode !== 'undefined'):
                        message = 'Por favor ingresa un código de licensia válido.';
                        break;
                    case (typeof error.date !== 'undefined'):
                        message = 'Por favor ingresa una fecha válida.';
                        break;
                    case (typeof error.postalCode !== 'undefined'):
                        message = 'Por favor ingresa un código postal válido.';
                        break;
                    case (typeof error.currency !== 'undefined'):
                        message = 'Por favor ingresa una cantidad válida.';
                        break;
                    case (typeof error.number !== 'undefined'):
                        message = 'Solo se permiten números.';
                        break;
                    case (typeof error.freeText !== 'undefined'):
                        message = 'Algunos caracteres no son validos.';
                        break;
                    case (typeof error.max !== 'undefined'):
                        message = 'El monto no puede ser mayor a $'+error.max.max;
                        break;
                    case (typeof error.dateGreaterThan !== 'undefined'):
                        message = 'Por favor ingresa una fecha válida.';
                        break;
                    case (typeof error.fileName !== 'undefined'):
                        message = 'Algunos caracteres no son validos.';
                        break;
                    default: message = '';
                }
            }
        }
        return message;
    }

}
