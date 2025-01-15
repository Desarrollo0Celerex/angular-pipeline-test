import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';

import { ROUTES_NAME } from '@constants/routes-name';
import { PolicyDataSend } from '@interfaces/policy-data-send.interface';

declare var ModalPlugin: any;

@Component({
    selector: 'agt-modal-confirm-show-policy-endorsements',
    templateUrl: './modal-confirm-show-policy-endorsements.component.html',
    styles: [],
    standalone: false
})
export class ModalConfirmShowPolicyEndorsementsComponent {
    @Input() modalId: string = '';
    @Input() policyData: PolicyDataSend | null = null;

    constructor(private _router: Router) { }

    confirmAction(): void {
        ModalPlugin.hide(this.modalId);
        if(!!this.policyData) {
            this._router.navigateByUrl(ROUTES_NAME.policyEndorsementsHistory(this.policyData.contactId, this.policyData.policyId));
        }
    }
}
