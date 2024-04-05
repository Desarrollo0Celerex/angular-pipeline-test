import { Component } from '@angular/core';
import { PAYMENT_ROUTES } from '@payment/constants/routes';

declare var ModalPlugin: any;

@Component({
    selector: 'agt-payment-applied-actions-modal',
    templateUrl: './payment-applied-actions-modal.component.html',
    styles: [],
})
export class PaymentAppliedActionsModalComponent {
    alertMessage = 'El pago del recibo se aplicó con éxito.';
    modalId = 'agt-payment-applied-actions-modal';
    policyPaymentsRecord = '';
    policyAppliedPayments = '';
    policyPendingPayments = '';

    openModal(data: {
        contactId: string;
        policyId: string;
        paymentId: string;
    }): void {
        ModalPlugin.show(this.modalId);
        this._generateRoutes(data);
    }

    private _generateRoutes(data: {
        contactId: string;
        policyId: string;
        paymentId: string;
    }): void {
        this.policyPaymentsRecord =
            '/' +
            PAYMENT_ROUTES.policyPaymentsRecord(
                data.contactId,
                data.policyId,
                data.paymentId
            );
        this.policyAppliedPayments =
            '/' +
            PAYMENT_ROUTES.policyAppliedPayments(
                data.contactId,
                data.policyId,
                data.paymentId
            );
        this.policyPendingPayments =
            '/' +
            PAYMENT_ROUTES.policyPendingPayments(
                data.contactId,
                data.policyId,
                data.paymentId
            );
    }
}
