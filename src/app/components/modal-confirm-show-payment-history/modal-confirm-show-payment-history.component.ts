import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';

import { ROUTES_NAME } from '@constants/routes-name';

declare var ModalPlugin: any;

@Component({
  selector: 'agt-modal-confirm-show-payment-history',
  templateUrl: './modal-confirm-show-payment-history.component.html',
  styles: [
  ]
})
export class ModalConfirmShowPaymentHistoryComponent {
    @Input() contactId: string = '';
    @Input() modalId: string = '';
    @Input() paymentId: string = '';
    @Input() policyId: string = '';

    constructor(private _router: Router) { }

    /**
     * Click event to confirm show the payment history
     */
    onClickConfirm(): void {
        ModalPlugin.hide(this.modalId);
        this._router.navigateByUrl(ROUTES_NAME.paymentHistory(this.contactId, this.policyId, this.paymentId));
    }

}
