import { Component, ViewChild } from '@angular/core';
import { PAYMENT_ROUTES } from '@payment/constants/routes';
import { SendPaymentConfirmationModalComponent } from '../send-payment-confirmation-modal/send-payment-confirmation-modal.component';

declare var ModalPlugin: any;

@Component({
    selector: 'agt-payment-applied-actions-modal',
    templateUrl: './payment-applied-actions-modal.component.html',
    styles: [],
})
export class PaymentAppliedActionsModalComponent {
    @ViewChild(SendPaymentConfirmationModalComponent)
    sendPaymentConfirmationModalComponent!: SendPaymentConfirmationModalComponent;
    alertMessage = 'El pago del recibo se aplicó con éxito.';
    modalId = 'agt-payment-applied-actions-modal';
    policyPaymentsRecord = '';
    policyAppliedPayments = '';
    policyPendingPayments = '';
    private _contactId = '';
    private _policyId = '';
    private _paymentId = '';
    private _receiptPaidId = '';

    openModal(data: {
        contactId: string;
        policyId: string;
        paymentId: string;
        receiptPaidId: string;
    }): void {
        ModalPlugin.show(this.modalId);
        this._contactId = data.contactId;
        this._policyId = data.policyId;
        this._paymentId = data.paymentId;
        this._receiptPaidId = data.receiptPaidId;
        this._generateRoutes();
    }

    onShowPaymentConfirmationAlert(): void {
        this.alertMessage = 'La confirmación de pago se envió con éxito.';
        ModalPlugin.show(this.modalId);
    }

    onSendPaymentConfirmation(): void {
        this.sendPaymentConfirmationModalComponent.openModal(
            this._contactId,
            this._policyId,
            this._receiptPaidId
        );
    }

    private _generateRoutes(): void {
        this.policyPaymentsRecord =
            '/' +
            PAYMENT_ROUTES.policyPaymentsRecord(
                this._contactId,
                this._policyId,
                this._paymentId
            );
        this.policyAppliedPayments =
            '/' +
            PAYMENT_ROUTES.policyAppliedPayments(
                this._contactId,
                this._policyId,
                this._paymentId
            );
        this.policyPendingPayments =
            '/' +
            PAYMENT_ROUTES.policyPendingPayments(
                this._contactId,
                this._policyId,
                this._paymentId
            );
    }
}
