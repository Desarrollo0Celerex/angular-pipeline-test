import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';

import { POLICY_STATUS } from '@constants/global';
import { ROUTES_NAME } from '@constants/routes-name';

import { ContainerIncompletePoliciesService } from './container-incomplete-policies.service';

declare var ModalPlugin: any;

@Component({
  selector: 'agt-container-incomplete-policies',
  templateUrl: './container-incomplete-policies.component.html',
  styles: [
  ]
})
export class ContainerIncompletePoliciesComponent implements OnInit {
    @Input() contactId: string;
    @Input() contentTypeName: string;
    @Output() policyDeleted: EventEmitter<void>;
    @Output() showHistoryPolicy: EventEmitter<string>;
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
        this.showHistoryPolicy = new EventEmitter<string>();
        this.contentSubtype = POLICY_STATUS.INCOMPLETE;
        this.modalIdConfirmDeletePolicy = 'agt-confirm-delete-policy';
        this.selectedPolicyId = '';
        this.selectedPolicyIndex = 0;
    }

    ngOnInit(): void {
        const page: number = 1;
        this.containerListIncompletePoliciesService.loadIncompletePolicies(this.contactId, page, this.contentSubtype);
    }

    /**
     * Event to complete the policy data
     * @param policyId The policy ID to complete
     */
    onCompletePolicy(policyId: string): void {
        this._router.navigateByUrl(ROUTES_NAME.uploadPolicy(this.contactId, policyId));
    }

    /**
     * Event to show modal to confirm delete the policy
     * @param policyId The policy ID to delete
     */
    onDeletePolicy(policyId: string): void {
        this.selectedPolicyId = policyId;
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
    onShowHistoryPolicy(policyId: string): void {
        this.showHistoryPolicy.emit(policyId);
    }

}
