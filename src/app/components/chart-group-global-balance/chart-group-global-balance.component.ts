import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';

import { ChartGroupGlobalBalanceService } from './chart-group-global-balance.service';

declare var ChartPlugin: any;

@Component({
  selector: 'agt-chart-group-global-balance',
  templateUrl: './chart-group-global-balance.component.html',
  styles: [
  ],
  providers: [ChartGroupGlobalBalanceService]
})
export class ChartGroupGlobalBalanceComponent implements OnChanges {
    @Input() groupId: string = '';
    canShowChart: boolean = false;

    constructor(public model: ChartGroupGlobalBalanceService) { }

    ngOnInit(): void {
    }

    ngOnChanges(changes: SimpleChanges): void {
        if(!!changes.groupId && changes.groupId.currentValue) {
            this.loadChartData(changes.groupId.currentValue);
        }
    }

    /**
     * Load the chart data
     * @param groupId The group ID
     */
    private loadChartData(groupId: string): void {
        this.model.loadChartData(groupId).subscribe(() => {
            this.canShowChart = true;
            ChartPlugin.drawGlobalBalance(this.model.chartData);
        })
    }

}
