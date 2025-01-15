import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';

import { ROUTES_NAME } from '@constants/routes-name';
import { RangeData } from '@interfaces/range-data.interface';

import { CardKpiWorkspacePoliciesCancelledService } from './card-kpi-workspace-policies-cancelled.service';

@Component({
    selector: 'agt-card-kpi-workspace-policies-cancelled',
    templateUrl: './card-kpi-workspace-policies-cancelled.component.html',
    styles: [],
    standalone: false
})
export class CardKpiWorkspacePoliciesCancelledComponent implements OnChanges {
    @Input() rangeData: RangeData | null = null;
    rangeField: string = 'updatedAt';
    route: string = ROUTES_NAME.workspacePoliciesCanceledByRange;

    constructor(public model: CardKpiWorkspacePoliciesCancelledService) { }

    ngOnChanges(changes: SimpleChanges): void {
        if(typeof changes.rangeData != 'undefined' && changes.rangeData.currentValue !== null) {
            changes.rangeData.currentValue.rangeField = this.rangeField;
            this.model.loadTotalWorkspacePoliciesCanceled(changes.rangeData.currentValue);
        }
    }
}
