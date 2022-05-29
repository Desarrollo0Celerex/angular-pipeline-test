import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';

import { AlertPartnerUnusualAppliedPaymentsService } from './alert-partner-unusual-applied-payments.service';

@Component({
  selector: 'agt-alert-partner-unusual-applied-payments',
  templateUrl: './alert-partner-unusual-applied-payments.component.html',
  styles: [
  ],
  providers: [AlertPartnerUnusualAppliedPaymentsService]
})
export class AlertPartnerUnusualAppliedPaymentsComponent implements OnChanges {
    @Input() partnerId: number = 0;
    @Input() rangeStart: string = '';
    @Input() rangeEnd: string = '';

    constructor(public model: AlertPartnerUnusualAppliedPaymentsService) { }

    ngOnChanges(changes: SimpleChanges): void {
        if(!!changes.partnerId && !!changes.partnerId.currentValue) {
            this.model.loadAppliedPaymentsRate(changes.partnerId.currentValue, this.rangeStart, this.rangeEnd);
        }
    }
}
