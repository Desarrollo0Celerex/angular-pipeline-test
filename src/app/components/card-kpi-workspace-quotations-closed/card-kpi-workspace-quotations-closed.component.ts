import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';

import { RangeData } from '@interfaces/range-data.interface';

import { CardKpiWorkspaceQuotationsClosedService } from './card-kpi-workspace-quotations-closed.service';

@Component({
  selector: 'agt-card-kpi-workspace-quotations-closed',
  templateUrl: './card-kpi-workspace-quotations-closed.component.html',
  styles: [
  ],
  providers: [CardKpiWorkspaceQuotationsClosedService]
})
export class CardKpiWorkspaceQuotationsClosedComponent implements OnChanges {
    @Input() range: RangeData | null = null;
    rangeField: string = 'createdAt';

    constructor(public model: CardKpiWorkspaceQuotationsClosedService) { }

    ngOnChanges(changes: SimpleChanges): void {
        if(typeof changes.range != 'undefined' && changes.range.currentValue !== null) {
            changes.range.currentValue.rangeField = this.rangeField;
            this.model.loadTotalWorkspaceQuotations(changes.range.currentValue);
            this.model.loadTotalWorkspaceQuotationsClosed(changes.range.currentValue);
        }
    }

}
