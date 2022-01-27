import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';

import { ContainerChartsPendingRenewalsService } from './container-charts-pending-renewals.service';

@Component({
  selector: 'agt-container-charts-pending-renewals',
  templateUrl: './container-charts-pending-renewals.component.html',
  styles: [
  ],
  providers: [ContainerChartsPendingRenewalsService]
})
export class ContainerChartsPendingRenewalsComponent implements OnChanges {
    @Input() rangeField: string = '';
    @Input() rangeStart: string = '';
    @Input() rangeEnd: string = '';

    constructor(public model: ContainerChartsPendingRenewalsService) { }

    ngOnChanges(changes: SimpleChanges): void {
        if(
            (!!changes.rangeField && !!changes.rangeField.currentValue) ||
            (!!changes.rangeStart && !!changes.rangeStart.currentValue) ||
            (!!changes.rangeEnd && !!changes.rangeEnd.currentValue)
        ) {
            this.model.loadClientsData(this.rangeField, this.rangeStart, this.rangeEnd);
        }
    }

}
