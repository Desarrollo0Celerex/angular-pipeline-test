import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { Router } from '@angular/router';

import { ModalShowPaymentAppliedDetailsService } from './modal-show-payment-applied-details.service';
import moment from 'moment';
import { ROUTES_NAME } from '@constants/routes-name';
declare var ModalPlugin: any;

@Component({
    selector: 'agt-modal-show-payment-applied-details',
    templateUrl: './modal-show-payment-applied-details.component.html',
    styles: [],
    providers: [ModalShowPaymentAppliedDetailsService],
})
export class ModalShowPaymentAppliedDetailsComponent implements OnChanges {
    @Input() modalId: string = '';
    @Input() contactId: string = '';
    @Input() policyId: string = '';
    @Input() receiptPaidId: string = '';
    ROUTES_NAME: any = ROUTES_NAME;

    constructor(
        public model: ModalShowPaymentAppliedDetailsService,
        private _router: Router
    ) {}

    ngOnChanges(changes: SimpleChanges): void {
        if (changes.receiptPaidId && changes.receiptPaidId.currentValue) {
            this.model.loadPayment(changes.receiptPaidId.currentValue);
        }
    }

    get totalDays(): number {
        return this.model.payment
            ? moment().diff(moment(this.model.payment.applicationDate), 'days')
            : 0;
    }

    goToPolicyRecord(): void {
        ModalPlugin.hide(this.modalId);
        this._router.navigateByUrl(
            ROUTES_NAME.showHistoryPolicy(this.contactId, this.policyId)
        );
    }
}
