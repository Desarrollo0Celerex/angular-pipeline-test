import { Component, Input, OnChanges } from '@angular/core';

import { ContainerPolicyEndorsementsManagerService } from './container-policy-endorsements-manager.service';

declare var ModalPlugin: any;

@Component({
  selector: 'agt-container-policy-endorsements-manager',
  templateUrl: './container-policy-endorsements-manager.component.html',
  styles: [
  ],
  providers: [ContainerPolicyEndorsementsManagerService]
})
export class ContainerPolicyEndorsementsManagerComponent implements OnChanges {
    @Input() contactId: string = '';
    @Input() policyId: string = '';
    modalIdShowPolicyFile: string = 'modal-show-policy-file';
    modalIdConfirmEndorsePolicy: string = 'modal-confirm-endorse-policy';

    constructor(
        private _containerPolicyEndorsementsManagerService: ContainerPolicyEndorsementsManagerService
    ) { }

    ngOnChanges(): void {
        this.model.loadPolicy(this.contactId, this.policyId);
    }

    get model(): ContainerPolicyEndorsementsManagerService {
        return this._containerPolicyEndorsementsManagerService;
    }

    showPolicy(): void {
        ModalPlugin.show(this.modalIdShowPolicyFile);
    }

    confirmEndorsePolicy(): void {
        ModalPlugin.show(this.modalIdConfirmEndorsePolicy);
    }

}
