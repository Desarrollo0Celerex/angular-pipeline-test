import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';

import { CardPartnerRenewalReportsService } from './card-partner-renewal-reports.service';

@Component({
  selector: 'agt-card-partner-renewal-reports',
  templateUrl: './card-partner-renewal-reports.component.html',
  styles: [
  ],
  providers: [CardPartnerRenewalReportsService]
})
export class CardPartnerRenewalReportsComponent implements OnChanges {
    @Input() partnerId: number = 0;
    @Input() rangeStart: string = '';
    @Input() rangeEnd: string = '';

    constructor(public model: CardPartnerRenewalReportsService) { }

    ngOnChanges(changes: SimpleChanges): void {
        if(!!changes.partnerId && changes.partnerId.currentValue) {
            this.model.loadTotalRenewals(changes.partnerId.currentValue, this.rangeStart, this.rangeEnd)
        }
    }

}
