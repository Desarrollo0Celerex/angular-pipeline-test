import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';

import { ChartGroupRenewalProgressService } from './chart-group-renewal-progress.service';

declare var ChartPlugin: any;

@Component({
    selector: 'agt-chart-group-renewal-progress',
    templateUrl: './chart-group-renewal-progress.component.html',
    styles: [],
    providers: [ChartGroupRenewalProgressService],
    standalone: false
})
export class ChartGroupRenewalProgressComponent implements OnChanges {
    @Input() groupId: string = '';
    @Input() rangeStart: string = '';
    @Input() rangeEnd: string = '';

    constructor(public model: ChartGroupRenewalProgressService) { }

    ngOnChanges(changes: SimpleChanges): void {
        if(!!changes.groupId && changes.groupId.currentValue) {
            ChartPlugin.removeChartRenewalProcess();
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
            ChartPlugin.drawChartRenewalProcess(this.model.chartData);
        })
    }
}
