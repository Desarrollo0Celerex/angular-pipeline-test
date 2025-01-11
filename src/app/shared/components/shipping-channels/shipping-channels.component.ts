import { Component, EventEmitter, Input, Output } from '@angular/core';
import {
    AbstractControl,
    FormBuilder,
    FormGroup,
    Validators,
} from '@angular/forms';
import { EMAIL_LENGTH } from '@constants/global';
import { ValidatorsHelper } from '@core/helpers/validators.helper';
import { InputValidatorHelper } from '@helpers/input-validator.helper';

@Component({
    selector: 'agt-shipping-channels',
    templateUrl: './shipping-channels.component.html',
    styles: [],
    standalone: false
})
export class ShippingChannelsComponent {
    @Input() description? = '';
    @Input() buttonLabel? = '';
    @Output()
    selectedShippingChannels = new EventEmitter<{
        hasPhone: boolean;
        phoneCode: string;
        phoneNumber: string;
        hasEmail: boolean;
        email: string;
        bcc?: string;
    }>();
    form = this._buildForm();
    hasEmailCopies = false;
    private _isFormSubmitted = false;

    constructor(private _formBuilder: FormBuilder) {}

    addEmailCopies(): void {
        this.hasEmailCopies = true;
    }

    fillForm(formData: {
        phoneCode: string;
        phoneNumber: string;
        email: string;
    }): void {
        this.form.patchValue({
            hasPhone: formData.phoneCode && formData.phoneNumber,
            phoneCode: formData.phoneCode ? formData.phoneCode : '',
            phoneNumber: formData.phoneNumber ? formData.phoneNumber : '',
            hasEmail: formData.email,
            email: formData.email ? formData.email : '',
        });
    }

    getErrorMessage(constrolName: string): string {
        const control: AbstractControl | null = this.form.get(constrolName);
        return InputValidatorHelper.getErrorMessage(control);
    }

    getValidationClass(constrolName: string): string {
        const control: AbstractControl | null = this.form.get(constrolName);
        return InputValidatorHelper.getValidationClass(
            control,
            this._isFormSubmitted
        );
    }

    checkIsValidForm(): boolean {
        if (!this.form.value.hasPhone && !this.form.value.hasEmail) {
            return false;
        }
        if (this.form.value.hasPhone && !this.form.value.phoneNumber) {
            return false;
        }
        if (this.form.value.hasEmail && !this.form.value.email) {
            return false;
        }
        return true;
    }

    showModalAndUpdatePhoneCode(phoneCode: string): void {
        this.form.patchValue({ phoneCode });
    }

    validateForm(): void {
        this._isFormSubmitted = true;
        if (this.form.valid) {
            this.selectedShippingChannels.emit(this.form.value);
        }
    }

    private _buildForm(): FormGroup {
        return this._formBuilder.group({
            hasPhone: [false],
            hasEmail: [false],
            phoneCode: ['', [ValidatorsHelper.number]],
            phoneNumber: ['', [ValidatorsHelper.phoneNumber]],
            email: [
                '',
                [
                    Validators.email,
                    Validators.minLength(EMAIL_LENGTH.MIN),
                    Validators.maxLength(EMAIL_LENGTH.MAX),
                ],
            ],
            bcc: [''],
        });
    }
}
