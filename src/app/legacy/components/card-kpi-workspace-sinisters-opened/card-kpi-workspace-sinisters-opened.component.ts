import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';

import { ROUTES_NAME } from '@constants/routes-name';
import { RangeData } from '@interfaces/range-data.interface';

import { CardKpiWorkspaceSinistersOpenedService } from './card-kpi-workspace-sinisters-opened.service';


@Component({
    selector: 'agt-card-kpi-workspace-sinisters-opened',
    templateUrl: './card-kpi-workspace-sinisters-opened.component.html',
    styles: [],
    standalone: false
})
export class CardKpiWorkspaceSinistersOpenedComponent implements OnChanges {
    @Input() rangeData: RangeData | null = null;
    rangeField: string = 'sinisterDate';
    route: string = ROUTES_NAME.workspaceSinistersOpenedByRange;

    constructor(public model: CardKpiWorkspaceSinistersOpenedService) { }

    ngOnChanges(changes: SimpleChanges): void {
        if(typeof changes.rangeData != 'undefined' && changes.rangeData.currentValue !== null) {
            changes.rangeData.currentValue.rangeField = this.rangeField;
            this.model.loadTotalWorkspaceSinistersOpened(changes.rangeData.currentValue);
        }
    }
}
