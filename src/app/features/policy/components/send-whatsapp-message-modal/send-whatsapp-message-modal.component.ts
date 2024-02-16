import { Component, EventEmitter, Output } from '@angular/core';
import {
    AbstractControl,
    FormBuilder,
    FormGroup,
    Validators,
} from '@angular/forms';
import { UtilitiesHelper } from '@core/helpers/utilities.helper';
import { InputValidatorHelper } from '@helpers/input-validator.helper';
import { Policy } from '@policy/interfaces/policy.interface';
import { PolicyService } from '@policy/services/policy.service';

declare var ModalPlugin: any;

@Component({
    selector: 'agt-send-whatsapp-message-modal',
    templateUrl: './send-whatsapp-message-modal.component.html',
    styles: [],
})
export class SendWhatsappMessageModalComponent {
    @Output() whatsappNotificationSent = new EventEmitter<void>();
    modalId = 'agt-send-whatsapp-message-modal';
    policy: Policy | undefined = undefined;
    form = this._buildForm();
    private _isFormSubmitted = false;
    private _phone = '';

    constructor(
        private _formBuilder: FormBuilder,
        private _policyService: PolicyService
    ) {}

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

    notifyPolicySent(): void {
        this.whatsappNotificationSent.emit();
    }

    openModal(
        phone: string,
        message: string,
        contactId: string,
        policyId: string
    ): void {
        this._phone = phone;
        this._populateForm(message);
        ModalPlugin.show(this.modalId);
        this._loadPolicy(contactId, policyId);
    }

    validateForm(): void {
        this._isFormSubmitted = true;
        if (this.form.valid) {
            const whatsappLink = UtilitiesHelper.generateWhatsappLink(
                this._phone,
                this.form.value.message
            );
            UtilitiesHelper.executeWhatsappLink(whatsappLink);
            this.notifyPolicySent();
            ModalPlugin.hide(this.modalId);
        }
    }

    private _buildForm(): FormGroup {
        return this._formBuilder.group({
            message: [
                '',
                [
                    Validators.required,
                    Validators.minLength(3),
                    Validators.maxLength(1000),
                ],
            ],
        });
    }

    private _loadPolicy(contactId: string, policyId: string): void {
        const fields = 'policyNumber,insurerName,insuranceName,policyAmount';
        this._policyService
            .getContactPolicy(contactId, policyId, fields)
            .subscribe((policy) => {
                this.policy = policy;
            });
    }

    private _populateForm(message: string): void {
        this.form.patchValue({
            message,
        });
    }
}
