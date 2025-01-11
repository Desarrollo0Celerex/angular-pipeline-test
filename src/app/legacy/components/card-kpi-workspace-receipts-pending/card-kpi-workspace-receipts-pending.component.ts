import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';

import { ROUTES_NAME } from '@constants/routes-name';
import { RangeData } from '@interfaces/range-data.interface';

import { CardKpiWorkspaceReceiptsPendingService } from './card-kpi-workspace-receipts-pending.service';

@Component({
    selector: 'agt-card-kpi-workspace-receipts-pending',
    templateUrl: './card-kpi-workspace-receipts-pending.component.html',
    styles: [],
    standalone: false
})
export class CardKpiWorkspaceReceiptsPendingComponent implements OnChanges {
    @Input() rangeData: RangeData | null = null;
    rangeField: string = 'paymentDate';
    route: string = ROUTES_NAME.workspaceReceiptsPendingByRange;

    constructor(public model: CardKpiWorkspaceReceiptsPendingService) { }

    ngOnChanges(changes: SimpleChanges): void {
        if(typeof changes.rangeData != 'undefined' && changes.rangeData.currentValue !== null) {
            changes.rangeData.currentValue.rangeField = this.rangeField;
            this.model.loadTotalWorkspaceReceiptsPending(changes.rangeData.currentValue);
        }
    }

}
