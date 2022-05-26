import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';

import { CardPartnerPaymentReportsService } from './card-partner-payment-reports.service';

@Component({
  selector: 'agt-card-partner-payment-reports',
  templateUrl: './card-partner-payment-reports.component.html',
  styles: [
  ],
  providers: [CardPartnerPaymentReportsService]
})
export class CardPartnerPaymentReportsComponent implements OnChanges {
    @Input() partnerId: number = 0;
    @Input() rangeStart: string = '';
    @Input() rangeEnd: string = '';

    constructor(public model: CardPartnerPaymentReportsService) { }

    ngOnChanges(changes: SimpleChanges): void {
        if(!!changes.partnerId && changes.partnerId.currentValue) {
            this.model.loadTotalPayments(changes.partnerId.currentValue, this.rangeStart, this.rangeEnd)
        }
    }
}
