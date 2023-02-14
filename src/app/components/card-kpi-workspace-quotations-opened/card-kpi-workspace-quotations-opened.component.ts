import { Component, OnChanges, SimpleChanges, Input } from '@angular/core';

import { ROUTES_NAME } from '@constants/routes-name';
import { RangeData } from '@interfaces/range-data.interface';

import { CardKpiWorkspaceQuotationsOpenedService } from './card-kpi-workspace-quotations-opened.service';

@Component({
  selector: 'agt-card-kpi-workspace-quotations-opened',
  templateUrl: './card-kpi-workspace-quotations-opened.component.html',
  styles: [
  ]
})
export class CardKpiWorkspaceQuotationsOpenedComponent implements OnChanges {
    @Input() rangeData: RangeData | null = null;
    rangeField: string = 'createdAt';
    route: string = ROUTES_NAME.workspaceQuotationsOpenedByRange;

    constructor(public model: CardKpiWorkspaceQuotationsOpenedService) { }

    ngOnChanges(changes: SimpleChanges): void {
        if(typeof changes.rangeData != 'undefined' && changes.rangeData.currentValue !== null) {
            changes.rangeData.currentValue.rangeField = this.rangeField;
            this.model.loadTotalWorkspaceQuotationsOpened(changes.rangeData.currentValue);
        }
    }
}
