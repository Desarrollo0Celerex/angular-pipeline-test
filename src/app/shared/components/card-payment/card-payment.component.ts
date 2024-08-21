import { Component, EventEmitter, Input, Output } from '@angular/core';
import { PAYMENT_SOURCE_TYPES } from '@core/constants/settings';
import { DumbComponent } from '@core/classes/dumb-component';
import { UtilitiesHelper } from '@core/helpers/utilities.helper';
import { Payment } from '@core/interfaces/payment.interface';
import * as moment from 'moment';

@Component({
    selector: 'agt-card-payment',
    templateUrl: './card-payment.component.html',
    styles: [],
})
export class CardPaymentComponent extends DumbComponent {
    @Input() payment: Payment | undefined = undefined;
    @Output() goToPaymentReceiptsPaid: EventEmitter<any> =
        new EventEmitter<any>();
    @Output() goToPaymentReceiptsPending: EventEmitter<any> =
        new EventEmitter<any>();
    @Output() showPolicyDetails: EventEmitter<any> = new EventEmitter<any>();
    @Output() downloadPolicy: EventEmitter<any> = new EventEmitter<any>();
    @Output() downloadEndorsement: EventEmitter<any> = new EventEmitter<any>();
    @Output() cancelPolicy: EventEmitter<any> = new EventEmitter<any>();
    @Output() showPaymentDetails: EventEmitter<any> = new EventEmitter<any>();
    @Output() handlePayment: EventEmitter<any> = new EventEmitter<any>();

    constructor() {
        super();
    }

    get downloadLabel(): string {
        if (this.payment) {
            return this.payment.paymentSourceTypeId ===
                PAYMENT_SOURCE_TYPES.POLICY
                ? 'Descargar Póliza'
                : 'Descargar Endoso';
        }
        return '';
    }

    get paymentAmount(): number {
        return this.payment
            ? UtilitiesHelper.calculatePaymentAmount({
                  paymentSourceTypeId: this.payment.paymentSourceTypeId,
                  tickets: this.payment.tickets,
                  paymentPlanId: this.payment.paymentPlanId,
                  pendingAmount: this.payment.pendingAmount,
                  pendingReceipts: this.payment.pendingReceipts,
                  paymentPlanReceips: this.payment.paymentPlanReceips,
                  netPay: this.payment.netPay,
                  feePay: this.payment.feePay,
                  coverPay: this.payment.coverPay,
                  noTaxPay: this.payment.noTaxPay,
                  extraPay: this.payment.extraPay,
                  taxPay: this.payment.taxPay,
                  discount: this.payment.discount,
              })
            : 0;
    }

    get remainingDays(): number {
        const remainingDays: number = moment(this.payment?.paymentDate).diff(
            moment(),
            'days'
        );
        return remainingDays > 0 ? remainingDays : 0;
    }

    requestGoToPaymentReceiptsPaid(): void {
        this.goToPaymentReceiptsPaid.emit({
            contactId: this.payment?.contactId,
            policyId: this.payment?.policyId,
            paymentId: this.payment?.paymentId,
        });
    }

    requestGoToPaymentReceiptsPending(): void {
        this.goToPaymentReceiptsPending.emit({
            contactId: this.payment?.contactId,
            policyId: this.payment?.policyId,
            paymentId: this.payment?.paymentId,
        });
    }

    requestShowPolicyDetails(): void {
        this.showPolicyDetails.emit({
            contactId: this.payment?.contactId,
            policyId: this.payment?.policyId,
        });
    }

    requestDownloadPolicy(): void {
        if (this.payment!.paymentSourceTypeId === PAYMENT_SOURCE_TYPES.POLICY) {
            this.downloadPolicy.emit({
                contactId: this.payment?.contactId,
                policyId: this.payment?.policyId,
            });
        } else {
            this.downloadEndorsement.emit({
                contactId: this.payment?.contactId,
                policyId: this.payment?.policyId,
                endorsementId: this.payment?.paymentSource,
            });
        }
    }

    requestDownloadPolicyDirectly(): void {
        this.downloadPolicy.emit({
            contactId: this.payment?.contactId,
            policyId: this.payment?.policyId,
        });
    }

    requestCancelPolicy(): void {
        this.cancelPolicy.emit({
            contactId: this.payment?.contactId,
            policyId: this.payment?.policyId,
        });
    }

    requestShowPaymentDetails(): void {
        this.showPaymentDetails.emit({
            contactId: this.payment?.contactId,
            policyId: this.payment?.policyId,
            paymentId: this.payment?.paymentId,
        });
    }

    requestHandlePayment(): void {
        this.handlePayment.emit({
            contactId: this.payment?.contactId,
            policyId: this.payment?.policyId,
            paymentId: this.payment?.paymentId,
            lastReminderDate: this.payment?.lastReminderDate,
            lastReminderTypeId: this.payment?.lastReminderTypeId,
            totalReminders: this.payment?.totalReminders,
            licenseId: this.payment?.licenseId,
            receiptNumber: this.payment!.tickets + 1,
            isPreauthorizedPayment: this.payment?.isPreauthorizedPayment,
        });
    }
}
