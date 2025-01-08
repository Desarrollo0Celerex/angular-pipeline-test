import { Component, EventEmitter, Output } from '@angular/core';
import {
    AbstractControl,
    FormBuilder,
    FormGroup,
    Validators,
} from '@angular/forms';
import { UtilitiesHelper } from '@core/helpers/utilities.helper';
import { CalculatePaymentAmount } from '@core/interfaces/calculate-payment-amount.interface';
import { InputValidatorHelper } from '@helpers/input-validator.helper';
import { Payment } from '@payment/interfaces/payment.interface';
import { PaymentService } from '@payment/services/payment.service';

declare var ModalPlugin: any;

@Component({
    selector: 'agt-send-payment-reminder-whatsapp-message-modal',
    templateUrl:
        './send-payment-reminder-whatsapp-message-modal.component.html',
    styles: [],
})
export class SendPaymentReminderWhatsappMessageModalComponent {
    @Output() whatsappNotificationSent = new EventEmitter<{
        notificationWasSent: boolean;
        notificationIsRepeated: boolean;
    }>();
    modalId = 'agt-send-payment-reminder-whatsapp-message-modal';
    payment: Payment | undefined = undefined;
    form = this._buildForm();
    private _isFormSubmitted = false;
    private _phone = '';

    constructor(
        private _formBuilder: FormBuilder,
        private _paymentService: PaymentService
    ) {}

    get paymentAmount(): number {
        if (this.payment) {
            const data: CalculatePaymentAmount = {
                paymentPlanReceips: this.payment.paymentPlanReceips,
                netPay: this.payment.netPay,
                feePay: this.payment.feePay,
                coverPay: this.payment.coverPay,
                noTaxPay: this.payment.noTaxPay,
                extraPay: this.payment.extraPay,
                taxPay: this.payment.taxPay,
                discount: this.payment.discount,
                paymentSourceTypeId: this.payment.paymentSourceTypeId,
                tickets: this.payment.tickets,
                paymentPlanId: this.payment.paymentPlanId,
                pendingAmount: this.payment.pendingAmount,
                pendingReceipts: this.payment.pendingReceipts,
                firstReceiptAmount: this.payment.firstReceiptAmount,
                subsequentReceiptsAmount: this.payment.subsequentReceiptsAmount,
            };
            return UtilitiesHelper.calculatePaymentAmount(data);
        }
        return 0;
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

    notifyReminderSent(): void {
        this.whatsappNotificationSent.emit({
            notificationWasSent: true,
            notificationIsRepeated: false,
        });
    }

    openModal(phone: string, message: string, paymentId: string): void {
        this._phone = phone;
        this._populateForm(message);
        ModalPlugin.show(this.modalId);
        this._loadPayment(paymentId);
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

    private _loadPayment(paymentId: string): void {
        const fields =
            'policyNumber,bills,paymentPlanReceips,netPay,feePay,coverPay,noTaxPay,extraPay,taxPay,discount,paymentSourceTypeId,tickets,paymentPlanId,pendingAmount,pendingReceipts,paymentDate,comment,firstReceiptAmount,subsequentReceiptsAmount';

        this._paymentService
            .getWorkspacePayment(paymentId, fields)
            .subscribe((payment) => {
                this.payment = payment;
            });
    }

    private _populateForm(message: string): void {
        this.form.patchValue({
            message,
        });
    }
}
