import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';

import { ROUTES_NAME } from '@constants/routes-name';
import { RangeData } from '@interfaces/range-data.interface';

import { CardKpiWorkspaceClientsConvertedService } from './card-kpi-workspace-clients-converted.service';

@Component({
  selector: 'agt-card-kpi-workspace-clients-converted',
  templateUrl: './card-kpi-workspace-clients-converted.component.html',
  styles: [
  ],
  providers: [CardKpiWorkspaceClientsConvertedService]
})
export class CardKpiWorkspaceClientsConvertedComponent implements OnChanges {
    @Input() rangeData: RangeData | null = null;
    rangeField: string = 'clientConversionDate';
    route: string = ROUTES_NAME.workspaceClientsConvertedByRange;

    constructor(public model: CardKpiWorkspaceClientsConvertedService) { }

    ngOnChanges(changes: SimpleChanges): void {
        if(typeof changes.rangeData != 'undefined' && changes.rangeData.currentValue !== null) {
            changes.rangeData.currentValue.rangeField = this.rangeField;
            this.model.loadTotalWorkspaceClientsConverted(changes.rangeData.currentValue);
        }
    }
}
