import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router'

import { ROUTES_NAME } from '@constants/routes-name';
import { ContactPolicyData } from '@interfaces/contact-policy-data.interface';

import { ContainerWorkspaceExternalPoliciesService } from './container-workspace-external-policies.service';

declare var ModalPlugin: any;

@Component({
    selector: 'agt-container-workspace-external-policies',
    templateUrl: './container-workspace-external-policies.component.html',
    styles: [],
    providers: [ContainerWorkspaceExternalPoliciesService],
    standalone: false
})
export class ContainerWorkspaceExternalPoliciesComponent implements OnInit {
    modalIdShowPolicyFile: string = 'modal-show-policy-file';
    modalIdConfirmValidateExternalPolicy: string = 'modal-confirm-validate-external-policy';
    modalIdConfirmUpdateExternalPolicy: string = 'modal-confirm-update-external-policy';
    modalIdShowExternalPolicyDetails: string = 'modal-show-external-policy-details';
    selectedContactId: string = '';
    selectedExternalPolicyId: string = '';
    selectedExternalPolicyUrl: string = '';

    constructor(
        public model: ContainerWorkspaceExternalPoliciesService,
        private _router: Router
    ) { }

    ngOnInit(): void {
        this.model.loadWorkspaceIncompletePolicies();
    }

    confirmUpdateExternalPolicy(data: ContactPolicyData): void {
        this.selectedContactId = data.contactId;
        this.selectedExternalPolicyId = data.policyId;
        ModalPlugin.show(this.modalIdConfirmUpdateExternalPolicy);
    }

    confirmValidateExternalPolicy(data: ContactPolicyData): void {
        this.selectedContactId = data.contactId;
        this.selectedExternalPolicyId = data.policyId;
        ModalPlugin.show(this.modalIdConfirmValidateExternalPolicy);
    }

    goToListExternalPolicies(): void {
        this._router.navigateByUrl(ROUTES_NAME.listExternalPolicies);
    }

    goToUpdateExternalPolicy(): void {
        this._router.navigateByUrl(ROUTES_NAME.updateExternalPolicy(this.selectedContactId, this.selectedExternalPolicyId));
    }

    showExternalPolicy(policyUrl: string): void {
        this.selectedExternalPolicyUrl = policyUrl;
        ModalPlugin.show(this.modalIdShowPolicyFile);
    }

    showExternalPolicyDetails(data: ContactPolicyData): void {
        this.selectedContactId = data.contactId;
        this.selectedExternalPolicyId = data.policyId;
        ModalPlugin.show(this.modalIdShowExternalPolicyDetails);
    }

}
