import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';

import { ROUTES_NAME } from '@constants/routes-name';
import { RangeData } from '@interfaces/range-data.interface';

import { CardKpiWorkspaceQuotationsClosedService } from './card-kpi-workspace-quotations-closed.service';

@Component({
    selector: 'agt-card-kpi-workspace-quotations-closed',
    templateUrl: './card-kpi-workspace-quotations-closed.component.html',
    styles: [],
    standalone: false
})
export class CardKpiWorkspaceQuotationsClosedComponent implements OnChanges {
    @Input() rangeData: RangeData | null = null;
    rangeField: string = 'createdAt';
    route: string = ROUTES_NAME.workspaceQuotationsClosedByRange;

    constructor(public model: CardKpiWorkspaceQuotationsClosedService) { }

    ngOnChanges(changes: SimpleChanges): void {
        if(typeof changes.rangeData != 'undefined' && changes.rangeData.currentValue !== null) {
            changes.rangeData.currentValue.rangeField = this.rangeField;
            this.model.loadTotalWorkspaceQuotations(changes.rangeData.currentValue);
            this.model.loadTotalWorkspaceQuotationsClosed(changes.rangeData.currentValue);
        }
    }

}
