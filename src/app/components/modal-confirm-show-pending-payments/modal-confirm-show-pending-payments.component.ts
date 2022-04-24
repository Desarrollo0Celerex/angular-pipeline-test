import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';

import { ROUTES_NAME } from '@constants/routes-name';

declare var ModalPlugin: any;

@Component({
  selector: 'agt-modal-confirm-show-pending-payments',
  templateUrl: './modal-confirm-show-pending-payments.component.html',
  styles: [
  ]
})
export class ModalConfirmShowPendingPaymentsComponent {
    @Input() contactId: string = '';
    @Input() modalId: string = '';
    @Input() paymentId: string = '';
    @Input() policyId: string = '';

    constructor(private _router: Router) { }

    confirmAction(): void {
        ModalPlugin.hide(this.modalId);
        this._router.navigateByUrl(ROUTES_NAME.pendingReceipts(this.contactId, this.policyId, this.paymentId));
    }

}
