import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';

import { ROUTES_NAME } from '@constants/routes-name';

declare var ModalPlugin: any;

@Component({
  selector: 'agt-modal-confirm-show-history-policy',
  templateUrl: './modal-confirm-show-history-policy.component.html',
  styles: [
  ]
})
export class ModalConfirmShowHistoryPolicyComponent {
    @Input() contactId: string;
    @Input() modalId: string;
    @Input() policyId: string;

    constructor(private _router: Router) {
        this.contactId = '';
        this.modalId = '';
        this.policyId = '';
    }

    /**
     * click event to confirm show the history policy
     */
    onClickConfirmShowHistoryPolicy(): void {
        ModalPlugin.hide(this.modalId);
        this._router.navigateByUrl(ROUTES_NAME.showHistoryPolicy(this.contactId, this.policyId));
    }

}
