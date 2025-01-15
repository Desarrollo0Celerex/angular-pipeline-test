import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';

import { ROUTES_NAME } from '@constants/routes-name';
import { PolicyDataSend } from '@interfaces/policy-data-send.interface';

declare var ModalPlugin: any;

@Component({
    selector: 'agt-modal-confirm-show-policy-open-sinisters',
    templateUrl: './modal-confirm-show-policy-open-sinisters.component.html',
    styles: [],
    standalone: false
})
export class ModalConfirmShowPolicyOpenSinistersComponent {
    @Input() modalId: string = '';
    @Input() policyData: PolicyDataSend | null = null;

    constructor(private _router: Router) { }

    confirmAction(): void {
        if(!!this.policyData) {
            ModalPlugin.hide(this.modalId);
            this._router.navigateByUrl(ROUTES_NAME.showPolicyOpenSinisters(this.policyData.contactId, this.policyData.policyId));
        }
    }

}
