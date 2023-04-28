import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';

import { ChartGroupPaymentProgressService } from './chart-group-payment-progress.service';

declare var ChartPlugin: any;

@Component({
  selector: 'agt-chart-group-payment-progress',
  templateUrl: './chart-group-payment-progress.component.html',
  styles: [
  ],
  providers: [ChartGroupPaymentProgressService]
})
export class ChartGroupPaymentProgressComponent implements OnChanges {
    @Input() groupId: string = '';
    @Input() rangeStart: string = '';
    @Input() rangeEnd: string = '';

    constructor(public model: ChartGroupPaymentProgressService) { }

    ngOnChanges(changes: SimpleChanges): void {
        if(!!changes.groupId && changes.groupId.currentValue) {
            ChartPlugin.removeChartPaymentProcess();
            this.loadChartData(changes.groupId.currentValue);
        }
    }

    get canShowChart(): boolean {
        return (this.model.chartData !== null) ? true : false;
    }

    /**
     * Load the chart data
     * @param groupId The group ID
     */
    private loadChartData(groupId: string): void {
        this.model.loadChartData(groupId, this.rangeStart, this.rangeEnd).subscribe(() => {
            ChartPlugin.drawChartPaymentProcess(this.model.chartData);
        })
    }
}
