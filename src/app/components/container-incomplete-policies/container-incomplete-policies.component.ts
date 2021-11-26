import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';

import { CONTENT_TYPES, POLICY_STATUS } from '@constants/global';
import { ROUTES_NAME } from '@constants/routes-name';
import { ContactPolicyData } from '@interfaces/contact-policy-data.interface';

import { ContainerIncompletePoliciesService } from './container-incomplete-policies.service';

declare var ModalPlugin: any;

@Component({
  selector: 'agt-container-incomplete-policies',
  templateUrl: './container-incomplete-policies.component.html',
  styles: [
  ]
})
export class ContainerIncompletePoliciesComponent implements OnInit {
    @Input() contentType: number = 0;
    @Input() contentTypeName: string;
    @Input() contactId: string;
    @Input() groupId: string = '';
    @Input() partnerId: string = '';
    @Output() policyDeleted: EventEmitter<void>;
    @Output() showHistoryPolicy: EventEmitter<ContactPolicyData> = new EventEmitter<ContactPolicyData>();;
    contentSubtype: number;
    modalIdConfirmDeletePolicy: string;
    selectedPolicyId: string;
    selectedPolicyIndex: number;

    constructor(
        public containerListIncompletePoliciesService: ContainerIncompletePoliciesService,
        private _router: Router
    ) {
        this.contactId = '';
        this.contentTypeName = '';
        this.policyDeleted = new EventEmitter<void>();
        this.contentSubtype = POLICY_STATUS.INCOMPLETE;
        this.modalIdConfirmDeletePolicy = 'agt-confirm-delete-policy';
        this.selectedPolicyId = '';
        this.selectedPolicyIndex = 0;
    }

    ngOnInit(): void {
        const page: number = 1;
        switch(this.contentType) {
            case CONTENT_TYPES.POLICY.ID:
                this.containerListIncompletePoliciesService.loadContactIncompletePolicies(this.contactId, page, this.contentSubtype);
            break;

            case CONTENT_TYPES.GROUP_POLICY.ID:
                this.containerListIncompletePoliciesService.loadGroupIncompletePolicies(this.groupId, page, this.contentSubtype);
            break;

            case CONTENT_TYPES.PARTNER_POLICY.ID:
                this.containerListIncompletePoliciesService.loadPartnerIncompletePolicies(this.partnerId, page, this.contentSubtype);
            break;
        }

    }

    deletePolicyCard(policyId: string): void {
        this.containerListIncompletePoliciesService.deletePolicyCard(policyId);
    }

    /**
     * Event to complete the policy data
     * @param policyId The policy ID to complete
     */
    onCompletePolicy(data: ContactPolicyData): void {
        this._router.navigateByUrl(ROUTES_NAME.uploadPolicy(data.contactId, data.policyId));
    }

    /**
     * Event to show modal to confirm delete the policy
     * @param policyId The policy ID to delete
     */
    onDeletePolicy(data: ContactPolicyData): void {
        this.contactId = data.contactId;
        this.selectedPolicyId = data.policyId;
        ModalPlugin.show(this.modalIdConfirmDeletePolicy);
    }

    /**
     * Event to notify that the policy has been deleted
     * @param policyId The deleted policy ID
     */
    onPolicyDeleted(policyId: string): void {
        this.containerListIncompletePoliciesService.deletePolicyCard(policyId);
        this.policyDeleted.emit();
    }

    /**
     * event to show the history policy
     * @param policyId The policy ID
     */
    onShowHistoryPolicy(data: ContactPolicyData): void {
        this.showHistoryPolicy.emit(data);
    }

}
