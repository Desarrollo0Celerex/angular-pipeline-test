import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { Router } from '@angular/router';

import { ROUTES_NAME } from '@constants/routes-name';

import { ContainerExternalPoliciesService } from './container-external-policies.service';

declare var ModalPlugin: any;

@Component({
  selector: 'agt-container-external-policies',
  templateUrl: './container-external-policies.component.html',
  styles: [
  ],
  providers: [ContainerExternalPoliciesService]
})
export class ContainerExternalPoliciesComponent implements OnChanges, OnInit {
    @Input() contactId: string = '';
    @Input() policyStatusId: number = 0;
    @Input() policyStatusName: string = '';
    modalIdShowPolicyFile: string = 'modal-show-policy-file';
    modalIdConfirmValidateExternalPolicy: string = 'modal-confirm-validate-external-policy';
    modalIdConfirmUpdateExternalPolicy: string = 'modal-confirm-update-external-policy';
    selectedExternalPolicyId: string = '';
    selectedExternalPolicyUrl: string = '';

    constructor(
        public containerExternalPoliciesService: ContainerExternalPoliciesService,
        private _router: Router
    ) { }

    ngOnChanges(changes: SimpleChanges): void {
        if(
            (!!changes.contactId && !!changes.contactId.currentValue && !!changes.policyStatusId && !!changes.policyStatusId.currentValue) ||
            (!!changes.contactId && !!changes.contactId.currentValue) ||
            (!!changes.policyStatusId && !!changes.policyStatusId.currentValue)
        ) {
            this._loadExternalPolicies();
        }
    }

    ngOnInit(): void {
    }

    _confirmUpdateExternalPolicy(externalPolicyId: string): void {
        this.selectedExternalPolicyId = externalPolicyId;
        ModalPlugin.show(this.modalIdConfirmUpdateExternalPolicy);
    }

    _confirmValidateExternalPolicy(externalPolicyId: string): void {
        this.selectedExternalPolicyId = externalPolicyId;
        ModalPlugin.show(this.modalIdConfirmValidateExternalPolicy);
    }

    goToUpdateExternalPolicy(): void {
        this._router.navigateByUrl(ROUTES_NAME.updateExternalPolicy(this.contactId, this.selectedExternalPolicyId));
    }

    _showExternalPolicy(policyUrl: string): void {
        this.selectedExternalPolicyUrl = policyUrl;
        ModalPlugin.show(this.modalIdShowPolicyFile);
    }

    private _loadExternalPolicies(): void {
        if(!!this.contactId && !!this.policyStatusId) {
            this.containerExternalPoliciesService.loadExternalPolicies(this.contactId, this.policyStatusId);
        }
    }

}
