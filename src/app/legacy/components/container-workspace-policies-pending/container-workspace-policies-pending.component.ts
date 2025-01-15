import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { ROUTES_NAME } from '@constants/routes-name';
import { ContactPolicyData } from '@interfaces/contact-policy-data.interface';
import { PolicyDataSend } from '@interfaces/policy-data-send.interface';
import { SelectActionTypeData } from '@interfaces/select-action-type-data.interface';
import { ShowPaymentHistoryData } from '@interfaces/show-payment-history-data.interface';

import { ContainerWorkspacePoliciesPendingService } from './container-workspace-policies-pending.service';

declare var ModalPlugin: any;

@Component({
    selector: 'agt-container-workspace-policies-pending',
    templateUrl: './container-workspace-policies-pending.component.html',
    styles: [],
    providers: [ContainerWorkspacePoliciesPendingService],
    standalone: false
})
export class ContainerWorkspacePoliciesPendingComponent implements OnInit {
    modalIdConfirmDeletePolicy: string = 'cwpp-confirm-delete-policy';
    modalIdConfirmReissuePolicy: string = 'cwpp-confirm-reissue-policy';
    modalIdConfirmRenewPolicy: string = 'cwpp-confirm-renew-policy';
    modalIdConfirmShowPolicyHistory: string = 'cwpp-confirm-show-history-policy';
    modalIdConfirmShowPolicyPaymentHistory: string = 'cwpp-confirm-show-policy-payment-history';
    modalIdConfirmShowPolicySinisterHistory: string = 'cwpp-confirm-show-policy-sinister-history';
    modalIdConfirmUpdatePolicy: string = 'cwpp-confirm-update-policy';
    modalIdSelectContactType: string = 'cwpp-select-contact-type';
    modalIdShowPolicy: string = 'cwpp-show-policy';
    modalIdShowPolicyDetails: string = 'cwpp-show-policy-details';
    selectedActionType: number = 0;
    selectedContactId: string = '';
    selectedPaymentId: string = '';
    selectedPolicyId: string = '';
    selectedPolicyData: PolicyDataSend | null = null;

    constructor(
        public model: ContainerWorkspacePoliciesPendingService,
        private _router: Router
    ) { }

    ngOnInit(): void {
        this.model.loadWorkspacePolicies();
    }

    goToWorkspacePoliciesPending(): void {
        this._router.navigateByUrl(ROUTES_NAME.workspacePoliciesPending);
    }

    showModalToConfirmReissuePolicy(data: ContactPolicyData): void {
        this.selectedContactId = data.contactId;
        this.selectedPolicyId = data.policyId;
        ModalPlugin.show(this.modalIdConfirmReissuePolicy);
    }

    showModalToConfirmRenewPolicy(data: ContactPolicyData): void {
        this.selectedContactId = data.contactId;
        this.selectedPolicyId = data.policyId;
        ModalPlugin.show(this.modalIdConfirmRenewPolicy);
    }

    showModalToConfirmShowPolicy(data: string | ContactPolicyData): void {
        if(typeof data === 'string') {
            this.selectedPolicyId = data;
        } else {
            this.selectedContactId = data.contactId;
            this.selectedPolicyId = data.policyId;
        }
        ModalPlugin.show(this.modalIdShowPolicy);
    }

    showModalToConfirmShowPolicyDetails(data: ContactPolicyData): void {
        this.selectedContactId = data.contactId;
        this.selectedPolicyId = data.policyId;
        ModalPlugin.show(this.modalIdShowPolicyDetails);
    }

    showModalToConfirmShowPolicyHistory(data: ContactPolicyData): void {
        this.selectedPolicyId = data.policyId;
        this.selectedContactId = data.contactId;
        ModalPlugin.show(this.modalIdConfirmShowPolicyHistory);
    }

    showModalToConfirmShowPolicyPaymentHistory(data : ShowPaymentHistoryData): void {
        this.selectedContactId = data.contactId;
        this.selectedPolicyId = data.policyId;
        this.selectedPaymentId = data.paymentId;
        ModalPlugin.show(this.modalIdConfirmShowPolicyPaymentHistory);
    }

    showModalToConfirmShowPolicySinisterHistory(policyData: PolicyDataSend): void {
        this.selectedPolicyData = policyData;
        ModalPlugin.show(this.modalIdConfirmShowPolicySinisterHistory);
    }

    showModalToConfirmUpdatePolicy(data: ContactPolicyData): void {
        this.selectedContactId = data.contactId;
        this.selectedPolicyId = data.policyId;
        ModalPlugin.show(this.modalIdConfirmUpdatePolicy);
    }

    showModalToSelectContactType(data: SelectActionTypeData): void {
        this.selectedActionType = data.actionType;
        this.selectedPolicyId = data.policyId;
        ModalPlugin.show(this.modalIdSelectContactType);
    }
}
