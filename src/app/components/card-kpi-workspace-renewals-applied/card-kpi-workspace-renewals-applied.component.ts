import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';

import { RangeData } from '@interfaces/range-data.interface';

import { CardKpiWorkspaceRenewalsAppliedService } from './card-kpi-workspace-renewals-applied.service';

@Component({
  selector: 'agt-card-kpi-workspace-renewals-applied',
  templateUrl: './card-kpi-workspace-renewals-applied.component.html',
  styles: [
  ]
})
export class CardKpiWorkspaceRenewalsAppliedComponent implements OnChanges {
    @Input() rangeData: RangeData | null = null;
    rangeField: string = 'validityEndDate';

    constructor(public model: CardKpiWorkspaceRenewalsAppliedService) { }

    ngOnChanges(changes: SimpleChanges): void {
        if(typeof changes.rangeData != 'undefined' && changes.rangeData.currentValue !== null) {
            changes.rangeData.currentValue.rangeField = this.rangeField;
            this.model.loadTotalWorkspaceRenewals(changes.rangeData.currentValue);
            this.model.loadTotalWorkspaceRenewalsApplied(changes.rangeData.currentValue);
        }
    }
}
