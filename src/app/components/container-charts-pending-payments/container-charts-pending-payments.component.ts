import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';

import { ContainerChartsPendingPaymentsService } from './container-charts-pending-payments.service';

@Component({
  selector: 'agt-container-charts-pending-payments',
  templateUrl: './container-charts-pending-payments.component.html',
  styles: [
  ],
  providers: [ContainerChartsPendingPaymentsService]
})
export class ContainerChartsPendingPaymentsComponent implements OnChanges {
    @Input() rangeField: string = '';
    @Input() rangeStart: string = '';
    @Input() rangeEnd: string = '';

    constructor(public model: ContainerChartsPendingPaymentsService) { }

    ngOnChanges(changes: SimpleChanges): void {
        if(
            (!!changes.rangeField && !!changes.rangeField.currentValue) ||
            (!!changes.rangeStart && !!changes.rangeStart.currentValue) ||
            (!!changes.rangeEnd && !!changes.rangeEnd.currentValue)
        ) {
            this.model.loadData(this.rangeField, this.rangeStart, this.rangeEnd);
        }
    }

  ngOnInit(): void {
  }

}
