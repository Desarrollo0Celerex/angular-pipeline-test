import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';

import { ChartGroupActiveCoveragesService } from './chart-group-active-coverages.service';

declare var ChartPlugin: any;

@Component({
    selector: 'agt-chart-group-active-coverages',
    templateUrl: './chart-group-active-coverages.component.html',
    styles: [],
    providers: [ChartGroupActiveCoveragesService],
    standalone: false
})
export class ChartGroupActiveCoveragesComponent implements OnChanges {
    @Input() groupId: string = '';
    canShowChart: boolean = false;

    constructor(public model: ChartGroupActiveCoveragesService) { }

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
            ChartPlugin.drawActiveCoverages(this.model.chartData);
        })
    }
}
