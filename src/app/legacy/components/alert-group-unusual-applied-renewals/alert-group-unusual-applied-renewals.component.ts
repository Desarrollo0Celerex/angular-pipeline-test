import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';

import { AlertGroupUnusualAppliedRenewalsService } from './alert-group-unusual-applied-renewals.service';

@Component({
  selector: 'agt-alert-group-unusual-applied-renewals',
  templateUrl: './alert-group-unusual-applied-renewals.component.html',
  styles: [
  ],
  providers: [AlertGroupUnusualAppliedRenewalsService]
})
export class AlertGroupUnusualAppliedRenewalsComponent implements OnChanges {
    @Input() groupId: string = '';
    @Input() rangeStart: string = '';
    @Input() rangeEnd: string = '';

    constructor(public model: AlertGroupUnusualAppliedRenewalsService) { }

    ngOnChanges(changes: SimpleChanges): void {
        if(!!changes.groupId && !!changes.groupId.currentValue) {
            this.model.loadAppliedRenewalsRate(changes.groupId.currentValue, this.rangeStart, this.rangeEnd);
        }
    }
}
