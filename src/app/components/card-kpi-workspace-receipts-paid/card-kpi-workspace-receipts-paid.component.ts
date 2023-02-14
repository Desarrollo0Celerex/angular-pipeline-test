import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';

import { ROUTES_NAME } from '@constants/routes-name';
import { RangeData } from '@interfaces/range-data.interface';

import { CardKpiWorkspaceReceiptsPaidService } from './card-kpi-workspace-receipts-paid.service';

@Component({
  selector: 'agt-card-kpi-workspace-receipts-paid',
  templateUrl: './card-kpi-workspace-receipts-paid.component.html',
  styles: [
  ]
})
export class CardKpiWorkspaceReceiptsPaidComponent implements OnChanges {
    @Input() rangeData: RangeData | null = null;
    rangeField: string = 'paymentDate';
    route: string = ROUTES_NAME.workspaceReceiptsPaidByRange;

    constructor(public model: CardKpiWorkspaceReceiptsPaidService) { }

    ngOnChanges(changes: SimpleChanges): void {
        if(typeof changes.rangeData != 'undefined' && changes.rangeData.currentValue !== null) {
            changes.rangeData.currentValue.rangeField = this.rangeField;
            this.model.loadTotalWorkspaceReceipts(changes.rangeData.currentValue);
            this.model.loadTotalWorkspaceReceiptsPaid(changes.rangeData.currentValue);
        }
    }

}
