import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';

import { ROUTES_NAME } from '@constants/routes-name';

declare var ModalPlugin: any;

@Component({
  selector: 'agt-modal-confirm-show-policy-renewal-history',
  templateUrl: './modal-confirm-show-policy-renewal-history.component.html',
  styles: [
  ]
})
export class ModalConfirmShowPolicyRenewalHistoryComponent {
    @Input() modalId: string = '';
    @Input() contactId: string = '';
    @Input() policyId: string = '';

    constructor(private _router: Router) { }

    goToPolicyRenewalHistory(): void {
        ModalPlugin.hide(this.modalId);
        this._router.navigateByUrl(ROUTES_NAME.policyRenewalHistory(this.contactId, this.policyId));
    }
}
