import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import * as moment from 'moment';

import { POLICY_STATUS, CANCELLATION_REASONS, ROLES } from '@constants/global';

import { Policy } from '@interfaces/policy.interface';
import { PaymentDataSend } from '@interfaces/payment-data-send.interface';
import { PolicyDataSend } from '@interfaces/policy-data-send.interface';
import { AuthService } from '@services/auth.service';

declare var PopoverPlugin: any;

@Component({
  selector: 'agt-card-policy',
  templateUrl: './card-policy.component.html',
  styles: [
  ]
})
export class CardPolicyComponent implements OnInit {
    @Input() policy: Policy | null;
    @Input() canShowFooter: boolean;
    @Input() isHistoryContent: boolean;
    @Output() cancelPolicy: EventEmitter<string>;
    @Output() completePolicy: EventEmitter<string>;
    @Output() deletePolicy: EventEmitter<string>;
    @Output() endorsePolicy: EventEmitter<string>;
    @Output() reissuePolicy: EventEmitter<string>;
    @Output() renewPolicy: EventEmitter<string>;
    @Output() showHistoryPolicy: EventEmitter<string>;
    @Output() showPaymentHistory: EventEmitter<PaymentDataSend> = new EventEmitter<PaymentDataSend>();
    @Output() showPolicy: EventEmitter<string>;
    @Output() showPolicyDetails: EventEmitter<string>;
    @Output() showPolicySinisters: EventEmitter<PolicyDataSend> = new EventEmitter<PolicyDataSend>();
    @Output() updatePolicy: EventEmitter<string>;
    CANCELLATION_REASONS: any = CANCELLATION_REASONS;
    POLICY_STATUS: any = POLICY_STATUS;
    isInTime: boolean = false;

    constructor(private _authService: AuthService) {
        this.policy = null;
        this.canShowFooter = true;
        this.isHistoryContent = false;
        this.cancelPolicy = new EventEmitter<string>();
        this.completePolicy = new EventEmitter<string>();
        this.deletePolicy = new EventEmitter<string>();
        this.endorsePolicy = new EventEmitter<string>();
        this.reissuePolicy = new EventEmitter<string>();
        this.renewPolicy = new EventEmitter<string>();
        this.showHistoryPolicy = new EventEmitter<string>();
        this.showPolicy = new EventEmitter<string>();
        this.showPolicyDetails = new EventEmitter<string>();
        this.updatePolicy = new EventEmitter<string>();
    }

    ngOnInit(): void {
        PopoverPlugin.init();
        this._checkIsInTime();
    }

    /**
     * Click event to cancel the policy
     */
    onClickCancelPolicy(): void {
        if(!!this.policy) this.cancelPolicy.emit(this.policy.policyId);
    }

    /**
     * Click event to complete the policy
     */
    onClickCompletePolicy(): void {
        if(!!this.policy) this.completePolicy.emit(this.policy.policyId);
    }

    /**
     * Click event to delete the policy
     */
    onClickDeletePolicy(): void {
        if(!!this.policy) this.deletePolicy.emit(this.policy.policyId);
    }

    /**
     * Click event to endorse the policy
     */
    onClickEndorsePolicy(): void {
        if(!!this.policy) this.endorsePolicy.emit(this.policy.policyId);
    }

    /**
     * Click event to reissue the policy
     */
    onClickReissuePolicy(): void {
        if(!!this.policy) this.reissuePolicy.emit(this.policy.policyId);
    }

    /**
     * Click event to endorse the policy
     */
    onClickRenewPolicy(): void {
        if(!!this.policy) this.renewPolicy.emit(this.policy.policyId);
    }

    /**
     * Click event to show the history policcy
     */
    onClickShowHistoryPolicy(): void {
        if(!!this.policy) this.showHistoryPolicy.emit(this.policy.policyId);
    }

    /**
     * Click event to show the policy
     */
    onClickShowPolicy(): void {
        if(!!this.policy) this.showPolicy.emit(this.policy.policyId);
    }

    /**
     * Click event to show the payment history
     */
    onClickShowPaymentHistory(): void {
        if(!!this.policy) {
            const paymentData: PaymentDataSend = {
                contactId: this.policy.contactId,
                policyId: this.policy.policyId,
                paymentId: this.policy.paymentId
            }
            this.showPaymentHistory.emit(paymentData);
        }
    }

    /**
     * Click event to show the policy details
     */
    onClickShowPolicyDetails(): void {
        if(!!this.policy) this.showPolicyDetails.emit(this.policy.policyId);
    }

    /**
     * Click event to show the policy sinisters
     */
    onClickShowPolicySinisters(): void {
        if(!!this.policy) {
            const policyData: PolicyDataSend = {
                contactId: this.policy.contactId,
                policyId: this.policy.policyId
            }
            this.showPolicySinisters.emit(policyData);
        }
    }

    /**
     * Click event to update the policy
     */
    onClickUpdatePolicy(): void {
        if(!!this.policy) this.updatePolicy.emit(this.policy.policyId);
    }

    /**
     * Check if the policy is in time
     */
    private _checkIsInTime(): void {
        if(!!this.policy && this.policy.policyStatusId === POLICY_STATUS.FINISHED) {
            const roleId: number = this._authService.roleId;
            let slackDays: number = 0;
            switch(roleId) {
                case ROLES.GLOBAL_ADMIN:
                    slackDays = 180;
                break;
                case ROLES.WALLET_MANAGER:
                case ROLES.INSURANCE_ADVISOR:
                    slackDays = 40;
                break;
            }
            const validityEndDate: any = moment(this.policy.validityEndDate).add(slackDays, 'd');
            this.isInTime = (moment().isSameOrBefore(validityEndDate, 'day')) ? true : false;
        }
    }
}
