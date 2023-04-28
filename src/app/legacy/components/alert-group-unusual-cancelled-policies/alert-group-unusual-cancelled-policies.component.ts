import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';

import { AlertGroupUnusualCancelledPoliciesService } from './alert-group-unusual-cancelled-policies.service';

@Component({
  selector: 'agt-alert-group-unusual-cancelled-policies',
  templateUrl: './alert-group-unusual-cancelled-policies.component.html',
  styles: [
  ],
  providers: [AlertGroupUnusualCancelledPoliciesService]
})
export class AlertGroupUnusualCancelledPoliciesComponent implements OnChanges {
    @Input() groupId: string = '';

    constructor(public model: AlertGroupUnusualCancelledPoliciesService) { }

    ngOnChanges(changes: SimpleChanges): void {
        if(!!changes.groupId && !!changes.groupId.currentValue) {
            this.model.loadCancelledPoliciesRate(changes.groupId.currentValue);
        }
    }
}
