import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

import { Policy } from '@interfaces/policy.interface';

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
    @Output() cancelPolicy: EventEmitter<string>;
    @Output() endorsePolicy: EventEmitter<string>;
    @Output() reissuePolicy: EventEmitter<string>;
    @Output() renewPolicy: EventEmitter<string>;
    @Output() showHistoryPolicy: EventEmitter<string>;
    @Output() showPolicy: EventEmitter<string>;
    @Output() showPolicyDetails: EventEmitter<string>;
    @Output() updatePolicy: EventEmitter<string>;

    constructor() {
        this.policy = null;
        this.canShowFooter = true;
        this.cancelPolicy = new EventEmitter<string>();
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
    }

    /**
     * Click event to cancel the policy
     */
    onClickCancelPolicy(): void {
        if(!!this.policy) this.cancelPolicy.emit(this.policy.policyId);
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
     * Click event to show the policy details
     */
    onClickShowPolicyDetails(): void {
        if(!!this.policy) this.showPolicyDetails.emit(this.policy.policyId);
    }

    /**
     * Click event to update the policy
     */
    onClickUpdatePolicy(): void {
        if(!!this.policy) this.updatePolicy.emit(this.policy.policyId);
    }
}
