import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';

import { ROUTES_NAME } from '@constants/routes-name';
import { RangeData } from '@interfaces/range-data.interface';

import { CardKpiWorkspacePoliciesIssuedService } from './card-kpi-workspace-policies-issued.service';

@Component({
    selector: 'agt-card-kpi-workspace-policies-issued',
    templateUrl: './card-kpi-workspace-policies-issued.component.html',
    styles: [],
    standalone: false
})
export class CardKpiWorkspacePoliciesIssuedComponent implements OnChanges {
    @Input() rangeData: RangeData | null = null;
    rangeField: string = 'emissionDate';
    route: string = ROUTES_NAME.workspacePoliciesIssuedByRange;

    constructor(public model: CardKpiWorkspacePoliciesIssuedService) { }

    ngOnChanges(changes: SimpleChanges): void {
        if(typeof changes.rangeData != 'undefined' && changes.rangeData.currentValue !== null) {
            changes.rangeData.currentValue.rangeField = this.rangeField;
            this.model.loadTotalWorkspacePoliciesIssued(changes.rangeData.currentValue);
        }
    }
}
