import { Component, EventEmitter, Output } from '@angular/core';
import {
    AbstractControl,
    FormBuilder,
    FormControl,
    FormGroup,
    Validators,
} from '@angular/forms';
import { SHIPPING_CONTACT_TYPES } from '@core/constants/settings';
import { ValidatorsHelper } from '@core/helpers/validators.helper';
import { InputValidatorHelper } from '@helpers/input-validator.helper';
import { RequestShippingContacts } from '@shared/interfaces/request-shipping-contacts.interface';
import { ShippingContact } from '@shared/interfaces/shipping-contact.interface';

declare var ModalPlugin: any;

@Component({
    selector: 'agt-modal-request-shipping-contacts',
    templateUrl: './modal-request-shipping-contacts.component.html',
    styles: [],
})
export class ModalRequestShippingContactsComponent {
    @Output() contactsRequested = new EventEmitter<ShippingContact>();
    canShowInputEmail = false;
    canShowInputPhone = false;
    data: RequestShippingContacts | undefined = undefined;
    form: FormGroup | undefined = undefined;
    modalId = 'agt-modal-request-shipping-contacts';
    private _isFormSubmitted = false;

    constructor(private _formBuilder: FormBuilder) {}

    getErrorMessage(constrolName: string): string {
        const control: AbstractControl | null = this.form!.get(constrolName);
        return InputValidatorHelper.getErrorMessage(control);
    }

    getValidationClass(constrolName: string): string {
        const control: AbstractControl | null = this.form!.get(constrolName);
        return InputValidatorHelper.getValidationClass(
            control,
            this._isFormSubmitted
        );
    }

    setPhoneCode(phoneCode: string): void {
        this.form?.patchValue({ phoneCode });
    }

    showModal(data: RequestShippingContacts): void {
        this.data = data;
        this._buildForm();
        ModalPlugin.show(this.modalId);
    }

    validateForm(): void {
        this._isFormSubmitted = true;
        if (this.form?.valid) {
            this._closeModal();
            this.contactsRequested.emit(this.form.value);
        }
    }

    private _buildForm(): void {
        this.form = this._formBuilder.group({});

        const hasEmail = this.data!.contactTypes.includes(
            SHIPPING_CONTACT_TYPES.EMAIL
        );
        if (hasEmail) {
            this.form.addControl(
                'email',
                new FormControl('', [
                    Validators.required,
                    Validators.email,
                    Validators.minLength(3),
                    Validators.maxLength(100),
                ])
            );
            this.canShowInputEmail = true;
        }

        const hasPhone = this.data!.contactTypes.includes(
            SHIPPING_CONTACT_TYPES.PHONE
        );
        if (hasPhone) {
            this.form.addControl(
                'phoneCode',
                new FormControl('52', [Validators.required])
            );
            this.form.addControl(
                'phoneNumber',
                new FormControl('', [
                    Validators.required,
                    ValidatorsHelper.phoneNumber,
                ])
            );
            this.canShowInputPhone = true;
        }
    }

    private _closeModal(): void {
        ModalPlugin.hide(this.modalId);
    }
}
