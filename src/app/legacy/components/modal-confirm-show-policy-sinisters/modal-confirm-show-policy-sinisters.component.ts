import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';

import { ROUTES_NAME } from '@constants/routes-name';
import { PolicyDataSend } from '@interfaces/policy-data-send.interface';

declare var ModalPlugin: any;

@Component({
  selector: 'agt-modal-confirm-show-policy-sinisters',
  templateUrl: './modal-confirm-show-policy-sinisters.component.html',
  styles: [
  ]
})
export class ModalConfirmShowPolicySinistersComponent {
    @Input() modalId: string = '';
    @Input() policyData: PolicyDataSend | null = null;

    constructor(private _router: Router) { }

    /**
     * Click event to confirm show the policy sinisters
     */
    onClickConfirmAction(): void {
        if(!!this.policyData) {
            ModalPlugin.hide(this.modalId);
            this._router.navigateByUrl(ROUTES_NAME.showPolicySinisters(this.policyData.contactId, this.policyData.policyId));
        }
    }
}
