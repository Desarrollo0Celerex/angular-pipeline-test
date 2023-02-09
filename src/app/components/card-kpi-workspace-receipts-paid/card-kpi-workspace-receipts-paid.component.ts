import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';

import { RangeData } from '@interfaces/range-data.interface';

import { CardKpiWorkspaceReceiptsPaidService } from './card-kpi-workspace-receipts-paid.service';

@Component({
  selector: 'agt-card-kpi-workspace-receipts-paid',
  templateUrl: './card-kpi-workspace-receipts-paid.component.html',
  styles: [
  ],
  providers: [CardKpiWorkspaceReceiptsPaidService]
})
export class CardKpiWorkspaceReceiptsPaidComponent implements OnChanges {
    @Input() range: RangeData | null = null;
    rangeField: string = 'paymentDate';

    constructor(public model: CardKpiWorkspaceReceiptsPaidService) { }

    ngOnChanges(changes: SimpleChanges): void {
        if(typeof changes.range != 'undefined' && changes.range.currentValue !== null) {
            changes.range.currentValue.rangeField = this.rangeField;
            this.model.loadTotalWorkspaceReceipts(changes.range.currentValue);
            this.model.loadTotalWorkspaceReceiptsPaid(changes.range.currentValue);
        }
    }

}
