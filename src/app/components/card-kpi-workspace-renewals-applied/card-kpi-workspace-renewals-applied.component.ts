import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';

import { RangeData } from '@interfaces/range-data.interface';

import { CardKpiWorkspaceRenewalsAppliedService } from './card-kpi-workspace-renewals-applied.service';

@Component({
  selector: 'agt-card-kpi-workspace-renewals-applied',
  templateUrl: './card-kpi-workspace-renewals-applied.component.html',
  styles: [
  ],
  providers: [CardKpiWorkspaceRenewalsAppliedService]
})
export class CardKpiWorkspaceRenewalsAppliedComponent implements OnChanges {
    @Input() range: RangeData | null = null;
    rangeField: string = 'validityEndDate';

    constructor(public model: CardKpiWorkspaceRenewalsAppliedService) { }

    ngOnChanges(changes: SimpleChanges): void {
        if(typeof changes.range != 'undefined' && changes.range.currentValue !== null) {
            changes.range.currentValue.rangeField = this.rangeField;
            this.model.loadTotalWorkspaceRenewals(changes.range.currentValue);
            this.model.loadTotalWorkspaceRenewalsApplied(changes.range.currentValue);
        }
    }
}
