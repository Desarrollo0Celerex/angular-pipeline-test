import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';

import { ROUTES_NAME } from '@constants/routes-name';

declare var ModalPlugin: any;

@Component({
    selector: 'agt-modal-confirm-show-policy-renewals-applied',
    templateUrl: './modal-confirm-show-policy-renewals-applied.component.html',
    styles: [],
    standalone: false
})
export class ModalConfirmShowPolicyRenewalsAppliedComponent {
    @Input() modalId: string = '';
    @Input() contactId: string = '';
    @Input() policyId: string = '';

    constructor(private _router: Router) { }

    goToPolicyRenewals(): void {
        ModalPlugin.hide(this.modalId);
        this._router.navigateByUrl(ROUTES_NAME.policyRenewalsApplied(this.contactId, this.policyId));
    }
}
