import { Component, Input, OnChanges } from '@angular/core';
import { Router } from '@angular/router';

import { ROUTES_NAME } from '@constants/routes-name';

import { ContainerPolicyRenewalManagerService } from './container-policy-renewal-manager.service';

declare var ModalPlugin: any;

const RENEWAL_ACTIONS: any = {
    RENEWAL_HISTORY: 1,
    RENEWALS: 2,
}

@Component({
  selector: 'agt-container-policy-renewal-manager',
  templateUrl: './container-policy-renewal-manager.component.html',
  styles: [
  ],
  providers: [ContainerPolicyRenewalManagerService]
})
export class ContainerPolicyRenewalManagerComponent implements OnChanges {
    @Input() contactId: string = '';
    @Input() policyId: string = '';
    RENEWAL_ACTIONS: any = RENEWAL_ACTIONS;
    modalIdConfirmLinkPolicy: string = 'modal-confirm-link-policy';
    modalIdConfirmShowPolicyRenewalHistory: string = 'modal-confirm-show-renewal-history';
    modalIdConfirmShowPolicyRenewals: string = 'modal-confirm-show-renewals';
    selectedRenewalAction: number = 0;

    constructor(
        public model: ContainerPolicyRenewalManagerService,
        private _router: Router
    ) { }

    ngOnChanges(): void {
        this.model.loadPolicy(this.contactId, this.policyId);
        this._selectRenewalAction();
    }

    goToPolicyHistory(): void {
        this._router.navigateByUrl(ROUTES_NAME.showHistoryPolicy(this.contactId, this.policyId))
    }

    showModalToConfirmLinkPolicy(): void {
        ModalPlugin.show(this.modalIdConfirmLinkPolicy);
    }

    showModalToConfirmShowPolicyRenewalHistory(): void {
        if(this.selectedRenewalAction !== RENEWAL_ACTIONS.RENEWAL_HISTORY) {
            ModalPlugin.show(this.modalIdConfirmShowPolicyRenewalHistory);
        }
    }

    showModalToConfirmShowPolicyRenewals(): void {
        if(this.selectedRenewalAction !== RENEWAL_ACTIONS.RENEWALS) {
            ModalPlugin.show(this.modalIdConfirmShowPolicyRenewals);
        }
    }

    private _selectRenewalAction(): void {
        const currentUrl: string = this._router.url;
        if(currentUrl.includes('renewal-history')) {
            this.selectedRenewalAction = RENEWAL_ACTIONS.RENEWAL_HISTORY;
        } else if(currentUrl.includes('renewals')) {
            this.selectedRenewalAction = RENEWAL_ACTIONS.RENEWALS;
        }
    }

}
