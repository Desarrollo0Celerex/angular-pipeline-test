import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';

import { AlertPartnerUnusualCancelledPoliciesService } from './alert-partner-unusual-cancelled-policies.service';

@Component({
  selector: 'agt-alert-partner-unusual-cancelled-policies',
  templateUrl: './alert-partner-unusual-cancelled-policies.component.html',
  styles: [
  ],
  providers: [AlertPartnerUnusualCancelledPoliciesService]
})
export class AlertPartnerUnusualCancelledPoliciesComponent implements OnChanges {
    @Input() partnerId: number = 0;

    constructor(public model: AlertPartnerUnusualCancelledPoliciesService) { }

    ngOnChanges(changes: SimpleChanges): void {
        if(!!changes.partnerId && !!changes.partnerId.currentValue) {
            this.model.loadCancelledPoliciesRate(changes.partnerId.currentValue);
        }
    }

}
