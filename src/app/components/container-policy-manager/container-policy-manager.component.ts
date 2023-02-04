import { Component, Input, OnChanges } from '@angular/core';
import { Router } from '@angular/router';

import { ROUTES_NAME } from '@constants/routes-name';
import { PolicyDataSend } from '@interfaces/policy-data-send.interface';

import { ContainerPolicyManagerService } from './container-policy-manager.service';

declare var ModalPlugin: any;

@Component({
  selector: 'agt-container-policy-manager',
  templateUrl: './container-policy-manager.component.html',
  styles: [
  ],
  providers: [ContainerPolicyManagerService]
})
export class ContainerPolicyManagerComponent implements OnChanges {
    @Input() contactId: string = '';
    @Input() policyId: string = '';
    policyData: PolicyDataSend | null = null;
    modalIdShowPolicyFile: string = 'modal-show-policy-file';
    modalIdConfirmShowPolicyEndorsements: string = 'modal-confirm-show-policy-endorsements';
    modalIdConfirmShowPolicyPayments: string = 'modal-confirm-show-policy-payments';
    modalIdConfirmShowPolicySinisters: string = 'modal-confirm-show-policy-sinisters';
    modalIdConfirmShowPolicyTracker: string = 'modal-confirm-show-policy-renewal-history';

    constructor(
        private _router: Router,
        private _containerPolicyManagerService: ContainerPolicyManagerService
    ) { }

    ngOnChanges(): void {
        this.policyData = {
            contactId: this.contactId,
            policyId: this.policyId
        }
        this.model.loadPolicy(this.contactId, this.policyId);
    }

    get model(): ContainerPolicyManagerService {
        return this._containerPolicyManagerService;
    }

    showPolicy(): void {
        ModalPlugin.show(this.modalIdShowPolicyFile);
    }

    requestShowPolicyEndorsements(): void {
        ModalPlugin.show(this.modalIdConfirmShowPolicyEndorsements);
    }

    requestShowPolicyPayments(): void {
        ModalPlugin.show(this.modalIdConfirmShowPolicyPayments);
    }

    requestShowPolicySinisters(): void {
        ModalPlugin.show(this.modalIdConfirmShowPolicySinisters);
    }
    requestShowPolicyTracker(): void {
        ModalPlugin.show(this.modalIdConfirmShowPolicyTracker);
    }

}
