import { Component, OnChanges, SimpleChanges, Input } from '@angular/core';

import { ROUTES_NAME } from '@constants/routes-name';
import { RangeData } from '@interfaces/range-data.interface';

import { CardKpiWorkspaceRenewalsPendingService } from './card-kpi-workspace-renewals-pending.service';

@Component({
    selector: 'agt-card-kpi-workspace-renewals-pending',
    templateUrl: './card-kpi-workspace-renewals-pending.component.html',
    styles: [],
    standalone: false
})
export class CardKpiWorkspaceRenewalsPendingComponent implements OnChanges {
    @Input() rangeData: RangeData | null = null;
    rangeField: string = 'validityEndDate';
    route: string = ROUTES_NAME.workspaceRenewalsPendingByRange;

    constructor(public model: CardKpiWorkspaceRenewalsPendingService) { }

    ngOnChanges(changes: SimpleChanges): void {
        if(typeof changes.rangeData != 'undefined' && changes.rangeData.currentValue !== null) {
            changes.rangeData.currentValue.rangeField = this.rangeField;
            this.model.loadTotalWorkspaceRenewalsPending(changes.rangeData.currentValue);
        }
    }
}
