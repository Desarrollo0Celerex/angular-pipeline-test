import { Component, Input, OnChanges } from '@angular/core';

import { ContainerPolicyTrackerManagerService } from './container-policy-tracker-manager.service';

declare var ModalPlugin: any;

@Component({
  selector: 'agt-container-policy-tracker-manager',
  templateUrl: './container-policy-tracker-manager.component.html',
  styles: [
  ],
  providers: [ContainerPolicyTrackerManagerService]
})
export class ContainerPolicyTrackerManagerComponent implements OnChanges {
    @Input() contactId: string = '';
    @Input() policyId: string = '';
    modalIdShowPolicyFile: string = 'modal-show-policy-file';
    modalIdConfirmEndorsePolicy: string = 'modal-confirm-endorse-policy';
    modalIdConfirmLinkPolicy: string = 'modal-confirm-link-policy';
    modalIdConfirmShowPolicyHistory: string = 'modal-confirm-show-policy-history';

    constructor(
        private _containerPolicyTrackerManagerService: ContainerPolicyTrackerManagerService
    ) { }

    ngOnChanges(): void {
        this.model.loadPolicy(this.contactId, this.policyId);
    }

    get model(): ContainerPolicyTrackerManagerService {
        return this._containerPolicyTrackerManagerService;
    }

    showPolicy(): void {
        ModalPlugin.show(this.modalIdShowPolicyFile);
    }

    confirmShowPolicyHistory(): void {
        ModalPlugin.show(this.modalIdConfirmShowPolicyHistory);
    }

    confirmLinkPolicy(): void {
        ModalPlugin.show(this.modalIdConfirmLinkPolicy);
    }

}
