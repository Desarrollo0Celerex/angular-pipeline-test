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
    @Output() showPolicy: EventEmitter<string>;
    @Output() showPolicyDetails: EventEmitter<string>;

    constructor() {
        this.policy = null;
        this.showPolicy = new EventEmitter<string>();
        this.showPolicyDetails = new EventEmitter<string>();
    }

    ngOnInit(): void {
        PopoverPlugin.init();
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
}
