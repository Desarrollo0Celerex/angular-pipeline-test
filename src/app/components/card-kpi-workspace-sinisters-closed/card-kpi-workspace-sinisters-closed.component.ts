import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';

import { ROUTES_NAME } from '@constants/routes-name';
import { RangeData } from '@interfaces/range-data.interface';

import { CardKpiWorkspaceSinistersClosedService } from './card-kpi-workspace-sinisters-closed.service';

@Component({
  selector: 'agt-card-kpi-workspace-sinisters-closed',
  templateUrl: './card-kpi-workspace-sinisters-closed.component.html',
  styles: [
  ]
})
export class CardKpiWorkspaceSinistersClosedComponent implements OnChanges {
    @Input() rangeData: RangeData | null = null;
    rangeField: string = 'sinisterDate';
    route: string = ROUTES_NAME.workspaceSinistersClosedByRange;

    constructor(public model: CardKpiWorkspaceSinistersClosedService) { }

    ngOnChanges(changes: SimpleChanges): void {
        if(typeof changes.rangeData != 'undefined' && changes.rangeData.currentValue !== null) {
            changes.rangeData.currentValue.rangeField = this.rangeField;
            this.model.loadTotalWorkspaceSinisters(changes.rangeData.currentValue);
            this.model.loadTotalWorkspaceSinistersClosed(changes.rangeData.currentValue);
        }
    }

}
