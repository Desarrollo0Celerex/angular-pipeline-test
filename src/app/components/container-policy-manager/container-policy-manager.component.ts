import { Component, Input, OnChanges } from '@angular/core';
import { Router } from '@angular/router';

import { ROUTES_NAME } from '@constants/routes-name';
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
    modalIdShowPolicyFile: string = 'modal-show-policy-file';
    modalIdConfirmShowPolicyEndorsements: string = 'modal-confirm-show-policy-endorsements';

    constructor(
        private _router: Router,
        private _containerPolicyManagerService: ContainerPolicyManagerService
    ) { }

    ngOnChanges(): void {
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

    goToPolicyEndorsements(): void {
        this._router.navigateByUrl(ROUTES_NAME.policyEndorsementsHistory(this.contactId, this.policyId))
    }

}
