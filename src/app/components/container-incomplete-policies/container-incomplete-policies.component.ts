import { Component, Input, OnInit } from '@angular/core';
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
    contentSubtype: number;
    modalIdConfirmCancelPolicy: string;
    selectedPolicyId: string;

    constructor(
        public containerListIncompletePoliciesService: ContainerIncompletePoliciesService,
        private _router: Router
    ) {
        this.contactId = '';
        this.contentTypeName = '';
        this.contentSubtype = POLICY_STATUS.INCOMPLETE;
        this.modalIdConfirmCancelPolicy = 'agt-confirm-cancel-policy';
        this.selectedPolicyId = '';
    }

    ngOnInit(): void {
        const page: number = 1;
        this.containerListIncompletePoliciesService.loadIncompletePolicies(this.contactId, page, this.contentSubtype);
    }

    /**
     * Event to cancel policy
     * @param policyId The policy ID to cancel
     */
    onCancelPolicy(policyId: string): void {
        this.selectedPolicyId = policyId;
        ModalPlugin.show(this.modalIdConfirmCancelPolicy);
    }

    /**
     * Event to complete policy data
     * @param policyId The policy ID to complete
     */
    onCompletePolicy(policyId: string): void {
        this._router.navigateByUrl(ROUTES_NAME.uploadPolicy(this.contactId, policyId));
    }

}
