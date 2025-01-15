import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';

import { ROUTES_NAME } from '@constants/routes-name';
import { RangeData } from '@interfaces/range-data.interface';

import { CardKpiWorkspaceLeadsConvertedService } from './card-kpi-workspace-leads-converted.service';

@Component({
    selector: 'agt-card-kpi-workspace-leads-converted',
    templateUrl: './card-kpi-workspace-leads-converted.component.html',
    styles: [],
    standalone: false
})
export class CardKpiWorkspaceLeadsConvertedComponent implements OnChanges {
    @Input() rangeData: RangeData | null = null;
    rangeField: string = 'leadConversionDate';
    route: string = ROUTES_NAME.workspaceLeadsConvertedByRange;

    constructor(public model: CardKpiWorkspaceLeadsConvertedService) { }

    ngOnChanges(changes: SimpleChanges): void {
        if(typeof changes.rangeData != 'undefined' && changes.rangeData.currentValue !== null) {
            changes.rangeData.currentValue.rangeField = this.rangeField;
            this.model.loadTotalWorkspaceLeadsConverted(changes.rangeData.currentValue);
        }
    }
}
