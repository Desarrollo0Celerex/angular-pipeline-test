import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';

import { ROUTES_NAME } from '@constants/routes-name';
import { RangeData } from '@interfaces/range-data.interface';

import { CardKpiWorkspacePoliciesRenewedService } from './card-kpi-workspace-policies-renewed.service';

@Component({
  selector: 'agt-card-kpi-workspace-policies-renewed',
  templateUrl: './card-kpi-workspace-policies-renewed.component.html',
  styles: [
  ]
})
export class CardKpiWorkspacePoliciesRenewedComponent implements OnChanges {
    @Input() rangeData: RangeData | null = null;
    route: string = ROUTES_NAME.workspacePoliciesRenewedByRange;

    constructor(public model: CardKpiWorkspacePoliciesRenewedService) { }

    ngOnChanges(changes: SimpleChanges): void {
        if(typeof changes.rangeData != 'undefined' && changes.rangeData.currentValue !== null) {
            this.model.loadTotalWorkspaceRenewals(changes.rangeData.currentValue);
            this.model.loadTotalWorkspacePoliciesRenewed(changes.rangeData.currentValue);
        }
    }
}
