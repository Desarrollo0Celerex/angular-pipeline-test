import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { RangeData } from '@interfaces/range-data.interface';

import { CardKpiWorkspaceSinistersClosedService } from './card-kpi-workspace-sinisters-closed.service';

@Component({
  selector: 'agt-card-kpi-workspace-sinisters-closed',
  templateUrl: './card-kpi-workspace-sinisters-closed.component.html',
  styles: [
  ],
  providers: [CardKpiWorkspaceSinistersClosedService]
})
export class CardKpiWorkspaceSinistersClosedComponent implements OnChanges {
    @Input() range: RangeData | null = null;
    rangeField: string = 'sinisterDate';

    constructor(public model: CardKpiWorkspaceSinistersClosedService) { }

    ngOnChanges(changes: SimpleChanges): void {
        if(typeof changes.range != 'undefined' && changes.range.currentValue !== null) {
            changes.range.currentValue.rangeField = this.rangeField;
            this.model.loadTotalWorkspaceSinisters(changes.range.currentValue);
            this.model.loadTotalWorkspaceSinistersClosed(changes.range.currentValue);
        }
    }

}
