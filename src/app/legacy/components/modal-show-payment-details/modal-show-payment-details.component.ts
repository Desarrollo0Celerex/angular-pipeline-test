import {
    Component,
    EventEmitter,
    Input,
    OnChanges,
    Output,
    SimpleChanges,
} from '@angular/core';

import { ModalShowPaymentDetailsService } from './modal-show-payment-details.service';
import * as moment from 'moment';
import { ROUTES_NAME } from '@constants/routes-name';
import { UtilitiesHelper } from '@core/helpers/utilities.helper';
import { CalculatePaymentAmount } from '@core/interfaces/calculate-payment-amount.interface';
declare var ModalPlugin: any;

@Component({
    selector: 'agt-modal-show-payment-details',
    templateUrl: './modal-show-payment-details.component.html',
    styles: [],
    providers: [ModalShowPaymentDetailsService],
})
export class ModalShowPaymentDetailsComponent implements OnChanges {
    @Input() modalId: string = '';
    @Input() contactId: string = '';
    @Input() policyId: string = '';
    @Input() paymentId: string = '';
    @Input() canReloadPaymentDetails = false;
    @Output() resetCanReloadPaymentDetails: EventEmitter<void> =
        new EventEmitter<void>();
    @Output() payReceipt: EventEmitter<string> = new EventEmitter<string>();
    ROUTES_NAME: any = ROUTES_NAME;

    constructor(public model: ModalShowPaymentDetailsService) {}

    ngOnChanges(changes: SimpleChanges): void {
        if (
            (changes.paymentId && changes.paymentId.currentValue) ||
            (!!changes.canReloadPaymentDetails &&
                !!changes.canReloadPaymentDetails &&
                !!this.paymentId)
        ) {
            this.model.loadPayment(this.paymentId);

            setTimeout(() => {
                this.resetCanReloadPaymentDetails.emit();
            }, 500);
        }
    }

    get paymentAmount(): number {
        if (this.model.payment) {
            const data: CalculatePaymentAmount = {
                paymentPlanReceips: this.model.payment.paymentPlanReceips,
                netPay: this.model.payment.netPay,
                feePay: this.model.payment.feePay,
                coverPay: this.model.payment.coverPay,
                noTaxPay: this.model.payment.noTaxPay,
                extraPay: this.model.payment.extraPay,
                taxPay: this.model.payment.taxPay,
                discount: this.model.payment.discount,
                paymentSourceTypeId: this.model.payment.paymentSourceTypeId,
                tickets: this.model.payment.tickets,
                paymentPlanId: this.model.payment.paymentPlanId,
                pendingAmount: this.model.payment.pendingAmount,
                pendingReceipts: this.model.payment.pendingReceipts,
                firstReceiptAmount: this.model.payment.firstReceiptAmount,
                subsequentReceiptsAmount:
                    this.model.payment.subsequentReceiptsAmount,
            };
            return UtilitiesHelper.calculatePaymentAmount(data);
        }
        return 0;
    }

    get totalExpiredDays(): number {
        return this.model.payment
            ? moment().diff(moment(this.model.payment.paymentDate), 'days')
            : 0;
    }

    requestPayReceipt(): void {
        ModalPlugin.hide(this.modalId);
        this.payReceipt.emit(this.paymentId);
    }
}
