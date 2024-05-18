import { Component, EventEmitter, Output } from '@angular/core';
import {
    AbstractControl,
    FormBuilder,
    FormGroup,
    Validators,
} from '@angular/forms';
import { UtilitiesHelper } from '@core/helpers/utilities.helper';
import { HttpResponse } from '@core/interfaces/http-response.interface';
import { InputValidatorHelper } from '@helpers/input-validator.helper';
import { ReceiptPaid } from '@interfaces/receipt-paid.interface';
import { ReceiptPaidService } from '@services/receipt-paid.service';

declare var ModalPlugin: any;

@Component({
    selector: 'agt-send-payment-confirmation-whatsapp-message-modal',
    templateUrl:
        './send-payment-confirmation-whatsapp-message-modal.component.html',
    styles: [],
})
export class SendPaymentConfirmationWhatsappMessageModalComponent {
    @Output() whatsappNotificationSent = new EventEmitter<void>();
    modalId = 'send-payment-confirmation-whatsapp-message-modal';
    receiptPaid: ReceiptPaid | undefined = undefined;
    form = this._buildForm();
    private _isFormSubmitted = false;
    private _phone = '';

    constructor(
        private _formBuilder: FormBuilder,
        private _receiptPaidService: ReceiptPaidService
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

    notifyReminderSent(): void {
        this.whatsappNotificationSent.emit();
    }

    openModal(phone: string, message: string, paymentId: string): void {
        this._phone = phone;
        this._populateForm(message);
        ModalPlugin.show(this.modalId);
        this._loadReceiptPaid(paymentId);
    }

    validateForm(): void {
        this._isFormSubmitted = true;
        if (this.form.valid) {
            const whatsappLink = UtilitiesHelper.generateWhatsappLink(
                this._phone,
                this.form.value.message
            );
            UtilitiesHelper.executeWhatsappLink(whatsappLink);
            this.notifyReminderSent();
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

    private _loadReceiptPaid(receiptPaidId: string): void {
        const fields =
            'policyNumber,applicationDate,receiptsAmount,paymentReference';

        this._receiptPaidService
            .getReceiptPaid(receiptPaidId, fields)
            .subscribe((res: HttpResponse) => {
                this.receiptPaid = res.data;
            });
    }

    private _populateForm(message: string): void {
        this.form.patchValue({
            message,
        });
    }
}
