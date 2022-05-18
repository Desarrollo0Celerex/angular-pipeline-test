import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';

import { CONTENT_TYPES, POLICY_STATUS } from '@constants/global';
import { ROUTES_NAME } from '@constants/routes-name';
import { ContactPolicyData } from '@interfaces/contact-policy-data.interface';
import { PaymentDataSend } from '@interfaces/payment-data-send.interface';
import { PolicyDataSend } from '@interfaces/policy-data-send.interface';

import { ContainerPendingPoliciesService } from './container-pending-policies.service';

declare var ModalPlugin: any;

@Component({
  selector: 'agt-container-pending-policies',
  templateUrl: './container-pending-policies.component.html',
  styles: [
  ],
  providers: [ContainerPendingPoliciesService]
})
export class ContainerPendingPoliciesComponent implements OnInit {
    @Input() contentType: number = 0;
    @Input() contentTypeName: string = '';
    @Input() contactId: string = '';
    @Input() groupId: string = '';
    @Input() partnerId: string = '';
    @Output() reissuePolicy: EventEmitter<ContactPolicyData> = new EventEmitter<ContactPolicyData>();
    @Output() renewPolicy: EventEmitter<ContactPolicyData> = new EventEmitter<ContactPolicyData>();
    @Output() showHistoryPolicy: EventEmitter<ContactPolicyData> = new EventEmitter<ContactPolicyData>();
    @Output() showPaymentHistory: EventEmitter<PaymentDataSend> = new EventEmitter<PaymentDataSend>();
    @Output() showPolicy: EventEmitter<PolicyDataSend> = new EventEmitter<PolicyDataSend>();
    @Output() showPolicyDetails: EventEmitter<PolicyDataSend> = new EventEmitter<PolicyDataSend>();
    @Output() showPolicySinisters: EventEmitter<PolicyDataSend> = new EventEmitter<PolicyDataSend>();
    contentSubtype: number = POLICY_STATUS.PENDING;
    modalIdShowPolicy: string = 'cpp-show-policy';
    modalIdShowPolicyDetails: string = 'cpp-show-policy-details';
    selectedPolicyId: string = '';
    selectedPolicyIndex: number = 0;

    constructor(public model: ContainerPendingPoliciesService) { }

    ngOnInit(): void {
        const page: number = 1;
        switch(this.contentType) {
            case CONTENT_TYPES.POLICY.ID:
                this.model.loadContactPendingPolicies(this.contactId, page, this.contentSubtype);
            break;

            case CONTENT_TYPES.GROUP_POLICY.ID:
                this.model.loadGroupPendingPolicies(this.groupId, page, this.contentSubtype);
            break;

            case CONTENT_TYPES.PARTNER_POLICY.ID:
                this.model.loadPartnerPendingPolicies(this.partnerId, page, this.contentSubtype);
            break;
        }
    }

    onReissuePolicy(data: ContactPolicyData): void {
        this.reissuePolicy.emit(data);
    }

    onRenewPolicy(data: ContactPolicyData): void {
        this.renewPolicy.emit(data);
    }

    onShowHistoryPolicy(data: ContactPolicyData): void {
        this.showHistoryPolicy.emit(data);
    }

    onShowPaymentHistory(data: PaymentDataSend): void {
        this.showPaymentHistory.emit(data);
    }

    onShowPolicy(data: PolicyDataSend): void {
        this.showPolicy.emit(data);
    }

    onShowPolicyDetails(data: PolicyDataSend): void {
        this.showPolicyDetails.emit(data);
    }

    onShowPolicySinisters(data: PolicyDataSend): void {
        this.showPolicySinisters.emit(data);
    }

}
