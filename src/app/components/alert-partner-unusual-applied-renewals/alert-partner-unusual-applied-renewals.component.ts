import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';

import { AlertPartnerUnusualAppliedRenewalsService } from './alert-partner-unusual-applied-renewals.service';

@Component({
  selector: 'agt-alert-partner-unusual-applied-renewals',
  templateUrl: './alert-partner-unusual-applied-renewals.component.html',
  styles: [
  ],
  providers: [AlertPartnerUnusualAppliedRenewalsService]
})
export class AlertPartnerUnusualAppliedRenewalsComponent implements OnChanges {
    @Input() partnerId: number = 0;
    @Input() rangeStart: string = '';
    @Input() rangeEnd: string = '';

    constructor(public model: AlertPartnerUnusualAppliedRenewalsService) { }

    ngOnChanges(changes: SimpleChanges): void {
        if(!!changes.partnerId && !!changes.partnerId.currentValue) {
            this.model.loadAppliedRenewalsRate(changes.partnerId.currentValue, this.rangeStart, this.rangeEnd);
        }
    }

}
