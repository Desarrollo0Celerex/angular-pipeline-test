import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { Router } from '@angular/router';

import { ROUTES_NAME } from '@constants/routes-name';
import { AlertHelper } from '@helpers/alert.helper';
import { SelectActionTypeData } from '@interfaces/select-action-type-data.interface';

import { ContainerPolicyDetailsService } from './container-policy-details.service';

declare var ModalPlugin: any;

@Component({
  selector: 'agt-container-policy-details',
  templateUrl: './container-policy-details.component.html',
  styles: [
  ]
})
export class ContainerPolicyDetailsComponent implements OnChanges {
    @Input() contactId: string = '';
    @Input() policyId: string = '';
    modalIdConfirmCancelPolicy: string = 'agt-confirm-cancel-policy';
    modalIdConfirmDeletePolicy: string = 'agt-confirm-delete-policy';
    modalIdConfirmEndorsePolicy: string = 'agt-confirm-endorse-policy';
    modalIdConfirmReissuePolicy: string = 'agt-confirm-reissue-policy';
    modalIdConfirmRenewPolicy: string = 'agt-confirm-renew-policy';
    modalIdConfirmShowHistoryPolicy: string = 'agt-confitm-show-history-policy';
    modalIdConfirmUpdatePolicy: string = 'agt-confirm-update-policy';
    modalIdSelectContactType: string = 'agt-select-contact-type';
    selectedActionType: number = 0;
    selectedPolicyId: string = '';

    constructor(
        public containerPolicyDetailsService: ContainerPolicyDetailsService,
        private _router: Router
    ) { }

    ngOnChanges(changes: SimpleChanges): void {
        if(!!changes.contactId.currentValue && !!changes.policyId.currentValue) {
            this.containerPolicyDetailsService.loadPolicy(this.contactId, this.policyId);
        }
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
     * Event to notify that the policy has been deleted
     * @param policyId The deleted policy ID
     */
    onPolicyDeleted(): void {
        this._router.navigateByUrl(ROUTES_NAME.listContactPolicies(this.contactId));
        AlertHelper.policyDeleted();
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
     * Event to show modal to confirm update policy
     */
    onUpdatePolicy(policyId: string): void {
        this.selectedPolicyId = policyId;
        ModalPlugin.show(this.modalIdConfirmUpdatePolicy);
    }

}
