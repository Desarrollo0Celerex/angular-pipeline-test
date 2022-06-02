import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';

import { AlertContactUnusualCancelledPoliciesService } from './alert-contact-unusual-cancelled-policies.service';

@Component({
  selector: 'agt-alert-contact-unusual-cancelled-policies',
  templateUrl: './alert-contact-unusual-cancelled-policies.component.html',
  styles: [
  ],
  providers: [AlertContactUnusualCancelledPoliciesService]
})
export class AlertContactUnusualCancelledPoliciesComponent implements OnChanges {
    @Input() contactId: string = '';

    constructor(public model: AlertContactUnusualCancelledPoliciesService) { }

    ngOnChanges(changes: SimpleChanges): void {
        if(!!changes.contactId && !!changes.contactId.currentValue) {
            this.model.loadCancelledPoliciesRate(changes.contactId.currentValue);
        }
    }

}
