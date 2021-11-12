import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { Router } from '@angular/router';

import { ROUTES_NAME } from '@constants/routes-name';
import { AlertHelper } from '@helpers/alert.helper';
import { ContactPolicyData } from '@interfaces/contact-policy-data.interface';
import { PolicyDataSend } from '@interfaces/policy-data-send.interface';
import { PolicyLog } from '@interfaces/policy-log.interface';
import { SelectActionTypeData } from '@interfaces/select-action-type-data.interface';
import { ShowPaymentHistoryData } from '@interfaces/show-payment-history-data.interface';
import { LoadingService } from '@services/loading.service';

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
    modalIdConfirmDeleteRenewedPolicy: string = 'agt-confirm-delete-renewed-policy';
    modalIdConfirmEndorsePolicy: string = 'agt-confirm-endorse-policy';
    modalIdConfirmReissuePolicy: string = 'agt-confirm-reissue-policy';
    modalIdConfirmRenewPolicy: string = 'agt-confirm-renew-policy';
    modalIdConfirmShowHistoryPolicy: string = 'agt-confitm-show-history-policy';
    modalIdConfirmShowPaymentHistory: string = 'agt-confirm-show-payment-history';
    modalIdConfirmShowPolicySinisters: string = 'agt-confirm-show-policy-sinisters';
    modalIdConfirmUpdatePolicy: string = 'agt-confirm-update-policy';
    modalIdSelectContactType: string = 'agt-select-contact-type';
    selectedActionType: number = 0;
    selectedPolicyId: string = '';
    selectedContactId: string = '';
    selectedPaymentId: string = '';
    selectedPolicyIdToDelete: string = '';
    selectedPolicyData: PolicyDataSend | null = null;

    constructor(
        public containerPolicyDetailsService: ContainerPolicyDetailsService,
        private _loadingService: LoadingService,
        private _router: Router
    ) { }

    ngOnChanges(changes: SimpleChanges): void {
        if((!!changes.contactId && !!changes.contactId.currentValue) || (!!changes.policyId && !!changes.policyId.currentValue)) {
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
     * Event to cancel a policy
     * @param policyId The policy ID
     */
    onCancelPolicy(data: ContactPolicyData): void {
        this.contactId = data.contactId;
        this.selectedPolicyId = data.policyId;
        ModalPlugin.show(this.modalIdConfirmCancelPolicy);
    }

    /**
     * Event to endorse a policy
     * @param policyId The policy ID
     */
    onEndorsePolicy(data: ContactPolicyData): void {
        this.contactId = data.contactId;
        this.selectedPolicyId = data.policyId;
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
    onReissuePolicy(data: ContactPolicyData): void {
        this.contactId = data.contactId;
        this.selectedPolicyId = data.policyId;
        ModalPlugin.show(this.modalIdConfirmReissuePolicy);
    }

    /**
     * Event to renew a policy
     * @param policyId The policy ID
     */
    onRenewPolicy(data: ContactPolicyData): void {
        this.contactId = data.contactId;
        this.selectedPolicyId = data.policyId;
        this._loadingService.show();
        this.containerPolicyDetailsService.getPolicyLogs(this.contactId, this.selectedPolicyId).subscribe((policyLogs: PolicyLog[]) => {
            this._loadingService.hide();
            // Check if the policy has already been renewed
            if(policyLogs.length > 0) {
                this.selectedPolicyIdToDelete = policyLogs[0].sourceId;
                ModalPlugin.show(this.modalIdConfirmDeleteRenewedPolicy);
            } else {
                ModalPlugin.show(this.modalIdConfirmRenewPolicy);
            }
        })
    }

    /**
     * Event to show the modal to confirm show the payment history
     * @param data The data to show the payment history
     */
    onShowPaymentHistory(data : ShowPaymentHistoryData): void {
        this.selectedContactId = data.contactId;
        this.selectedPolicyId = data.policyId;
        this.selectedPaymentId = data.paymentId;
        ModalPlugin.show(this.modalIdConfirmShowPaymentHistory);
    }

    /**
     * Event to show the policy sinisters
     * @param policyData The policy data
     */
    onShowPolicySinisters(policyData: PolicyDataSend): void {
        this.selectedPolicyData = policyData;
        ModalPlugin.show(this.modalIdConfirmShowPolicySinisters);
    }

    /**
     * Event to show the history policy
     * @param policyId The selected policy ID
     */
    onShowHistoryPolicy(data: ContactPolicyData): void {
        this.contactId = data.contactId;
        this.selectedPolicyId = data.policyId;
        ModalPlugin.show(this.modalIdConfirmShowHistoryPolicy);
    }

    /**
     * Event to show modal to confirm update policy
     */
    onUpdatePolicy(data: ContactPolicyData): void {
        this.contactId = data.contactId;
        this.selectedPolicyId = data.policyId;
        ModalPlugin.show(this.modalIdConfirmUpdatePolicy);
    }

    deleteRenewedPolicy(): void {
        this._loadingService.show();
        this.containerPolicyDetailsService.deleteRenewedPolicy(this.contactId, this.selectedPolicyIdToDelete).subscribe(() => {
            this._loadingService.hide();
            ModalPlugin.show(this.modalIdConfirmRenewPolicy);
        });
    }

}
