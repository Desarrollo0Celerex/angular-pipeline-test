import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { Router } from '@angular/router';

import { CONTENT_TYPES } from '@constants/global';
import { ROUTES_NAME } from '@constants/routes-name';
import { ContactPolicyData } from '@interfaces/contact-policy-data.interface';

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
    @Input() contentType: number = 0;
    @Input() contactId: string = '';
    @Input() groupId: string = '';
    @Input() partnerId: string = '';
    @Input() policyStatusId: number = 0;
    @Input() policyStatusName: string = '';
    modalIdShowPolicyFile: string = 'modal-show-policy-file';
    modalIdConfirmValidateExternalPolicy: string = 'modal-confirm-validate-external-policy';
    modalIdConfirmUpdateExternalPolicy: string = 'modal-confirm-update-external-policy';
    modalIdShowExternalPolicyDetails: string = 'modal-show-external-policy-details';
    selectedContactId: string = '';
    selectedExternalPolicyId: string = '';
    selectedExternalPolicyUrl: string = '';

    constructor(
        public containerExternalPoliciesService: ContainerExternalPoliciesService,
        private _router: Router
    ) { }

    ngOnChanges(changes: SimpleChanges): void {
        /*if(
            (!!changes.contactId && !!changes.contactId.currentValue && !!changes.policyStatusId && !!changes.policyStatusId.currentValue) ||
            (!!changes.contactId && !!changes.contactId.currentValue) ||
            (!!changes.policyStatusId && !!changes.policyStatusId.currentValue)
        ) {
            this._loadExternalPolicies();
        }*/
        if(
            (!!changes.contactId && !!changes.contactId.currentValue) ||
            (!!changes.policyStatusId && !!changes.policyStatusId.currentValue) ||
            (!!changes.groupId && !!changes.groupId.currentValue)
        ) {
            this._loadExternalPolicies();
        }
    }

    ngOnInit(): void {
    }

    _confirmUpdateExternalPolicy(data: ContactPolicyData): void {
        this.selectedContactId = data.contactId;
        this.selectedExternalPolicyId = data.policyId;
        ModalPlugin.show(this.modalIdConfirmUpdateExternalPolicy);
    }

    _confirmValidateExternalPolicy(data: ContactPolicyData): void {
        this.selectedContactId = data.contactId;
        this.selectedExternalPolicyId = data.policyId;
        ModalPlugin.show(this.modalIdConfirmValidateExternalPolicy);
    }

    goToUpdateExternalPolicy(): void {
        this._router.navigateByUrl(ROUTES_NAME.updateExternalPolicy(this.selectedContactId, this.selectedExternalPolicyId));
    }

    _showExternalPolicy(policyUrl: string): void {
        this.selectedExternalPolicyUrl = policyUrl;
        ModalPlugin.show(this.modalIdShowPolicyFile);
    }

    showExternalPolicyDetails(data: ContactPolicyData): void {
        this.selectedContactId = data.contactId;
        this.selectedExternalPolicyId = data.policyId;
        ModalPlugin.show(this.modalIdShowExternalPolicyDetails);
    }

    private _loadExternalPolicies(): void {
        switch(this.contentType) {
            case CONTENT_TYPES.POLICY.ID:
                if(!!this.contactId && !!this.policyStatusId) {
                    this.containerExternalPoliciesService.loadContactExternalPolicies(this.contactId, this.policyStatusId);
                }
            break;

            case CONTENT_TYPES.GROUP_POLICY.ID:
                if(!!this.groupId && !!this.policyStatusId) {
                    this.containerExternalPoliciesService.loadGroupExternalPolicies(this.groupId, this.policyStatusId);
                }
            break;

            case CONTENT_TYPES.PARTNER_POLICY.ID:
                if(!!this.partnerId && !!this.policyStatusId) {
                    this.containerExternalPoliciesService.loadPartnerExternalPolicies(this.partnerId, this.policyStatusId);
                }
            break;
        }
    }

}
