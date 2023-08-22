import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';

import {
    POLICY_STATUS,
    CANCELLATION_REASONS,
    INSURANCE_TYPES,
    CONTENT_TYPES,
} from '@constants/global';

import { ROUTES_NAME } from '@constants/routes-name';
import { PolicyInsuredHelper } from '@helpers/policy-insured-helper';
import { Policy } from '@core/interfaces/policy.interface';
import { ContactPolicyData } from '@interfaces/contact-policy-data.interface';
import { PaymentDataSend } from '@interfaces/payment-data-send.interface';
import { PolicyDataSend } from '@interfaces/policy-data-send.interface';
import { AuthService } from '@features/auth/services/auth.service';

declare var PopoverPlugin: any;

@Component({
    selector: 'agt-card-policy',
    templateUrl: './card-policy.component.html',
    styles: [],
})
export class CardPolicyComponent implements OnInit {
    @Input() policy: Policy | null;
    @Input() contentType: number = 0;
    @Input() canShowFooter: boolean;
    @Input() isHistoryContent: boolean;
    @Input() selectedPolicyPos: number = 0;
    @Input() policyPos: number = 0;
    @Output() cancelPolicy: EventEmitter<ContactPolicyData> =
        new EventEmitter<ContactPolicyData>();
    @Output() completePolicy: EventEmitter<ContactPolicyData> =
        new EventEmitter<ContactPolicyData>();
    @Output() deletePolicy: EventEmitter<ContactPolicyData> =
        new EventEmitter<ContactPolicyData>();
    @Output() endorsePolicy: EventEmitter<ContactPolicyData> =
        new EventEmitter<ContactPolicyData>();
    @Output() reissuePolicy: EventEmitter<ContactPolicyData> =
        new EventEmitter<ContactPolicyData>();
    @Output() renewPolicy: EventEmitter<ContactPolicyData> =
        new EventEmitter<ContactPolicyData>();
    @Output() showContactProfile: EventEmitter<string> =
        new EventEmitter<string>();
    @Output() showHistoryPolicy: EventEmitter<ContactPolicyData> =
        new EventEmitter<ContactPolicyData>();
    @Output() showPaymentHistory: EventEmitter<PaymentDataSend> =
        new EventEmitter<PaymentDataSend>();
    @Output() showPolicy: EventEmitter<ContactPolicyData> =
        new EventEmitter<ContactPolicyData>();
    @Output() showPolicyDetails: EventEmitter<ContactPolicyData> =
        new EventEmitter<ContactPolicyData>();
    @Output() showPolicySinisters: EventEmitter<PolicyDataSend> =
        new EventEmitter<PolicyDataSend>();
    @Output() updatePolicy: EventEmitter<ContactPolicyData> =
        new EventEmitter<ContactPolicyData>();
    @Output() showPolicyActionsRequested = new EventEmitter<Policy>();
    CANCELLATION_REASONS: any = CANCELLATION_REASONS;
    POLICY_STATUS: any = POLICY_STATUS;
    CONTENT_TYPES: any = CONTENT_TYPES;
    INSURANCE_TYPES: any = INSURANCE_TYPES;
    //isInTime: boolean = false;

    constructor(private _authService: AuthService, private _router: Router) {
        this.policy = null;
        this.canShowFooter = true;
        this.isHistoryContent = false;
    }

    ngOnInit(): void {
        PopoverPlugin.init();
        //this._checkIsInTime();
    }

    get areSeveralInsured(): boolean {
        if (this.policy !== null && this.policy.insuranceTypeId) {
            return PolicyInsuredHelper.checkAreSeveralInsured(
                this.policy.insuranceTypeId
            );
        }
        return false;
    }

    goToListPolicyInsureds(): void {
        if (this.areSeveralInsured) {
            this._router.navigateByUrl(
                ROUTES_NAME.listPolicyInsureds(
                    this.policy!.contactId,
                    this.policy!.policyId
                )
            );
        }
    }

    /**
     * Click event to cancel the policy
     */
    onClickCancelPolicy(): void {
        if (!!this.policy)
            this.cancelPolicy.emit({
                contactId: this.policy.contactId,
                policyId: this.policy.policyId,
            });
    }

    /**
     * Click event to complete the policy
     */
    onClickCompletePolicy(): void {
        if (!!this.policy)
            this.completePolicy.emit({
                contactId: this.policy.contactId,
                policyId: this.policy.policyId,
            });
    }

    /**
     * Click event to delete the policy
     */
    onClickDeletePolicy(): void {
        if (!!this.policy)
            this.deletePolicy.emit({
                contactId: this.policy.contactId,
                policyId: this.policy.policyId,
            });
    }

    /**
     * Click event to endorse the policy
     */
    onClickEndorsePolicy(): void {
        if (!!this.policy)
            this.endorsePolicy.emit({
                contactId: this.policy.contactId,
                policyId: this.policy.policyId,
            });
    }

    /**
     * Click event to reissue the policy
     */
    onClickReissuePolicy(): void {
        if (!!this.policy)
            this.reissuePolicy.emit({
                contactId: this.policy.contactId,
                policyId: this.policy.policyId,
            });
    }

    /**
     * Click event to endorse the policy
     */
    onClickRenewPolicy(): void {
        if (!!this.policy)
            this.renewPolicy.emit({
                contactId: this.policy.contactId,
                policyId: this.policy.policyId,
            });
    }

    onClickShowContactProfile(): void {
        if (!!this.policy) this.showContactProfile.emit(this.policy.contactId);
    }

    /**
     * Click event to show the history policcy
     */
    onClickShowHistoryPolicy(): void {
        if (!!this.policy)
            this.showHistoryPolicy.emit({
                contactId: this.policy.contactId,
                policyId: this.policy.policyId,
            });
    }

    /**
     * Click event to show the policy
     */
    onClickShowPolicy(): void {
        if (!!this.policy)
            this.showPolicy.emit({
                contactId: this.policy.contactId,
                policyId: this.policy.policyId,
            });
    }

    requestShowPolicyActions(): void {
        if (!!this.policy) this.showPolicyActionsRequested.emit(this.policy);
    }

    /**
     * Click event to show the payment history
     */
    onClickShowPaymentHistory(): void {
        if (!!this.policy) {
            const paymentData: PaymentDataSend = {
                contactId: this.policy.contactId,
                policyId: this.policy.policyId,
                paymentId: this.policy.paymentId,
            };
            this.showPaymentHistory.emit(paymentData);
        }
    }

    /**
     * Click event to show the policy details
     */
    onClickShowPolicyDetails(): void {
        if (!!this.policy) {
            this.showPolicyDetails.emit({
                contactId: this.policy.contactId,
                policyId: this.policy.policyId,
            });
        }
    }

    /**
     * Click event to show the policy sinisters
     */
    onClickShowPolicySinisters(): void {
        if (!!this.policy) {
            const policyData: PolicyDataSend = {
                contactId: this.policy.contactId,
                policyId: this.policy.policyId,
            };
            this.showPolicySinisters.emit(policyData);
        }
    }

    /**
     * Click event to update the policy
     */
    onClickUpdatePolicy(): void {
        if (!!this.policy)
            this.updatePolicy.emit({
                contactId: this.policy.contactId,
                policyId: this.policy.policyId,
            });
    }

    /**
     * Check if the policy is in time
     */
    /*private _checkIsInTime(): void {
        if(!!this.policy && (this.policy.policyStatusId === POLICY_STATUS.FINISHED || this.policy.policyStatusId === POLICY_STATUS.PENDING)) {
            const roleId: number = this._authService.roleId;
            let slackDays: number = 0;
            switch(roleId) {
                case ROLES.GLOBAL_ADMIN:
                    slackDays = SLACK_DAYS_TO_RENEW_OR_REISSUE_A_POLICY.GLOBAL_ADMIN;
                break;
                case ROLES.WALLET_MANAGER:
                case ROLES.INSURANCE_ADVISOR:
                    slackDays = SLACK_DAYS_TO_RENEW_OR_REISSUE_A_POLICY.OTHERS;
                break;
            }
            const validityEndDate: any = moment(this.policy.validityEndDate).add(slackDays, 'd');
            this.isInTime = (moment().isSameOrBefore(validityEndDate, 'day')) ? true : false;
        }
    }*/
}
