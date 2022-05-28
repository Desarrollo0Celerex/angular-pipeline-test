import { Component, Input, OnInit } from '@angular/core';

import { AlertPartnerUnusualCancelledPoliciesService } from './alert-partner-unusual-cancelled-policies.service';

@Component({
  selector: 'agt-alert-partner-unusual-cancelled-policies',
  templateUrl: './alert-partner-unusual-cancelled-policies.component.html',
  styles: [
  ],
  providers: [AlertPartnerUnusualCancelledPoliciesService]
})
export class AlertPartnerUnusualCancelledPoliciesComponent implements OnInit {
    @Input() partnerId: number = 0;

    constructor(public model: AlertPartnerUnusualCancelledPoliciesService) { }

    ngOnInit(): void {
        this.model.loadCancelledPoliciesPercentage(this.partnerId);
    }

}
