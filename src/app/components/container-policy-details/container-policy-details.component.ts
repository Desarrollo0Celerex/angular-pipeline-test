import { Component, Input, OnInit } from '@angular/core';

import { SelectActionTypeData } from '@interfaces/select-action-type-data.interface';

import { ContainerPolicyDetailsService } from './container-policy-details.service';

declare var ModalPlugin: any;

@Component({
  selector: 'agt-container-policy-details',
  templateUrl: './container-policy-details.component.html',
  styles: [
  ]
})
export class ContainerPolicyDetailsComponent implements OnInit {
    @Input() contactId: string = '';
    @Input() policyId: string = '';
    modalIdConfirmCancelPolicy: string = 'agt-confirm-cancel-policy';
    modalIdConfirmEndorsePolicy: string = 'agt-confirm-endorse-policy';
    modalIdConfirmReissuePolicy: string = 'agt-confirm-reissue-policy';
    modalIdConfirmRenewPolicy: string = 'agt-confirm-renew-policy';
    modalIdConfirmShowHistoryPolicy: string = 'agt-confitm-show-history-policy';
    modalIdConfirmUpdatePolicy: string = 'agt-confirm-update-policy';
    modalIdSelectContactType: string = 'agt-select-contact-type';
    modalIdShowPolicy: string = 'agt-show-policy';
    modalIdShowPolicyDetails: string = 'agt-show-policy-details';
    selectedActionType: number = 0;
    selectedPolicyId: string = '';

    constructor(public containerPolicyDetailsService: ContainerPolicyDetailsService) { }

    ngOnInit(): void {
        this.containerPolicyDetailsService.loadPolicy(this.contactId, this.policyId);
    }

    /**
     * Event to catch the selected event type
     * @param  data The data of the selected action type
     */
    onActionTypeSelected(data: SelectActionTypeData): void {
        this.selectedActionType = data.actionType;
        this.selectedPolicyId = data.policyId;
        ModalPlugin.show(this.modalIdSelectContactType);
    }

    /**
     * Event to cancel a policy
     * @param policyId The policy ID
     */
    onCancelPolicy(policyId: string): void {
        this.selectedPolicyId = policyId;
        ModalPlugin.show(this.modalIdConfirmCancelPolicy);
    }

    /**
     * Event to endorse a policy
     * @param policyId The policy ID
     */
    onEndorsePolicy(policyId: string): void {
        this.selectedPolicyId = policyId;
        ModalPlugin.show(this.modalIdConfirmEndorsePolicy);
    }

    /**
     * Event to reissue the policy
     * @param policyId [description]
     */
    onReissuePolicy(policyId: string): void {
        this.selectedPolicyId = policyId;
        ModalPlugin.show(this.modalIdConfirmReissuePolicy);
    }

    /**
     * Event to renew a policy
     * @param policyId The policy ID
     */
    onRenewPolicy(policyId: string): void {
        this.selectedPolicyId = policyId;
        ModalPlugin.show(this.modalIdConfirmRenewPolicy);
    }

    /**
     * Event to show the history policy
     * @param policyId The selected policy ID
     */
    onShowHistoryPolicy(policyId: string): void {
        this.selectedPolicyId = policyId;
        ModalPlugin.show(this.modalIdConfirmShowHistoryPolicy);
    }

    /**
     * Event to show policy
     * @param policyId The policy ID
     */
    onShowPolicy(policyId: string): void {
        this.selectedPolicyId = policyId;
        ModalPlugin.show(this.modalIdShowPolicy);
    }

    /**
     * Event to show the policy details modal
     * @param policyId The selected policy ID
     */
    onShowPolicyDetails(policyId: string): void {
        this.selectedPolicyId = policyId;
        ModalPlugin.show(this.modalIdShowPolicyDetails);
    }

    /**
     * Event to show modal to confirm update policy
     */
    onUpdatePolicy(policyId: string): void {
        this.selectedPolicyId = policyId;
        ModalPlugin.show(this.modalIdConfirmUpdatePolicy);
    }

}
