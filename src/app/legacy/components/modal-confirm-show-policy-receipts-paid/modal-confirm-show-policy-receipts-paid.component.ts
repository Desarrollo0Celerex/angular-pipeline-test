import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';

import { ROUTES_NAME } from '@constants/routes-name';

declare var ModalPlugin: any;
@Component({
  selector: 'agt-modal-confirm-show-policy-receipts-paid',
  templateUrl: './modal-confirm-show-policy-receipts-paid.component.html',
  styles: [
  ]
})
export class ModalConfirmShowPolicyReceiptsPaidComponent {
    @Input() modalId: string = '';
    @Input() contactId: string = '';
    @Input() policyId: string = '';
    @Input() paymentId: string = '';

    constructor(private _router: Router) { }

    confirmAction(): void {
        ModalPlugin.hide(this.modalId);
        this._router.navigateByUrl(ROUTES_NAME.policyReceiptsPaid(this.contactId, this.policyId, this.paymentId));
    }

}
