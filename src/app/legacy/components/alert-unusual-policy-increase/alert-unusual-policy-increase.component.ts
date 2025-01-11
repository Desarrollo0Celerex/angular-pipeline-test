import { Component, Input, OnInit } from '@angular/core';

import { AlertUnusualPolicyIncreaseService } from './alert-unusual-policy-increase.service';

@Component({
    selector: 'agt-alert-unusual-policy-increase',
    templateUrl: './alert-unusual-policy-increase.component.html',
    styles: [],
    providers: [AlertUnusualPolicyIncreaseService],
    standalone: false
})
export class AlertUnusualPolicyIncreaseComponent implements OnInit {
    @Input() contactId: string = '';
    @Input() policyId: string = '';

    constructor(public model: AlertUnusualPolicyIncreaseService) { }

    ngOnInit(): void {
        this.model.loadLastPercentageIncrease(this.contactId, this.policyId);
    }
}
