import { Component, EventEmitter, Input, Output } from '@angular/core';

import { Policy } from '@core/interfaces/policy.interface';

@Component({
    selector: 'agt-card-policy-tracker',
    templateUrl: './card-policy-tracker.component.html',
    styles: [],
    standalone: false
})
export class CardPolicyTrackerComponent {
    @Input() policy: Policy | null = null;
    @Input() selectedPolicyPos: number = 0;
    @Input() policyPos: number = 0;
    @Output() showPolicy: EventEmitter<string> = new EventEmitter<string>();
    @Output() showPolicyDetails: EventEmitter<string> =
        new EventEmitter<string>();

    constructor() {}

    /**
     * Click event to show the policy file
     */
    onClickShowPolicy(): void {
        if (!!this.policy) this.showPolicy.emit(this.policy.policyId);
    }

    /**
     * Click event to show the policy details
     */
    onClickShowPolicyDetails(): void {
        if (!!this.policy) this.showPolicyDetails.emit(this.policy.policyId);
    }
}
