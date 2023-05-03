import { Component, Input } from '@angular/core';
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

    constructor() {
        super();
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
}
