import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';

import { ContainerChartsActivePoliciesService } from './container-charts-active-policies.service';

@Component({
  selector: 'agt-container-charts-active-policies',
  templateUrl: './container-charts-active-policies.component.html',
  styles: [
  ],
  providers: [ContainerChartsActivePoliciesService]
})
export class ContainerChartsActivePoliciesComponent implements OnChanges {
    @Input() rangeStart: string = '';
    @Input() rangeEnd: string = '';

    constructor(public model: ContainerChartsActivePoliciesService) { }

    ngOnChanges(changes: SimpleChanges): void {
        if(
            (!!changes.rangeStart && !!changes.rangeStart.currentValue) ||
            (!!changes.rangeEnd && !!changes.rangeEnd.currentValue)
        ) {
            this.model.loadData(this.rangeStart, this.rangeEnd);
        }
    }

}
