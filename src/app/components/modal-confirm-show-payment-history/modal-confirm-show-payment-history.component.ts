import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { Router } from '@angular/router';

import { ROUTES_NAME } from '@constants/routes-name';

import { ModalConfirmShowPaymentHistoryService } from './modal-confirm-show-payment-history.service'

declare var ModalPlugin: any;

@Component({
  selector: 'agt-modal-confirm-show-payment-history',
  templateUrl: './modal-confirm-show-payment-history.component.html',
  styles: [
  ],
  providers: [ModalConfirmShowPaymentHistoryService]
})
export class ModalConfirmShowPaymentHistoryComponent implements OnChanges {
    @Input() contactId: string = '';
    @Input() modalId: string = '';
    @Input() paymentId: string = '';
    @Input() policyId: string = '';

    constructor(
        private _model: ModalConfirmShowPaymentHistoryService,
        private _router: Router
    ) { }

    ngOnChanges(changes: SimpleChanges): void {
        if(!(!!changes.paymentId)) {
            if(!!this.contactId && !!this.policyId) {
                this._loadPolicyPaymentId();
            }
        }
    }

    onClickConfirm(): void {
        ModalPlugin.hide(this.modalId);
        this._router.navigateByUrl(ROUTES_NAME.paymentHistory(this.contactId, this.policyId, this.paymentId));
    }

    private _loadPolicyPaymentId(): void {
        this._model.getPolicyPaymentId(this.contactId, this.policyId).subscribe((paymentId: string) => {
            this.paymentId = paymentId;
        })
    }

}
