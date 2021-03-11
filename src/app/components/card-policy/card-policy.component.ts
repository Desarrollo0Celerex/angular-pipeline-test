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
    @Output() cancelPolicy: EventEmitter<string>;
    @Output() endorsePolicy: EventEmitter<string>;
    @Output() showPolicy: EventEmitter<string>;
    @Output() showPolicyDetails: EventEmitter<string>;
    @Output() updatePolicy: EventEmitter<string>;

    constructor() {
        this.policy = null;
        this.cancelPolicy = new EventEmitter<string>();
        this.endorsePolicy = new EventEmitter<string>();
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
