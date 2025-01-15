import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';

import { ChartGroupPreferredInsurersService } from './chart-group-preferred-insurers.service';

declare var ChartPlugin: any;

@Component({
    selector: 'agt-chart-group-preferred-insurers',
    templateUrl: './chart-group-preferred-insurers.component.html',
    styles: [],
    providers: [ChartGroupPreferredInsurersService],
    standalone: false
})
export class ChartGroupPreferredInsurersComponent implements OnChanges {
    @Input() groupId: string = '';
    canShowChart: boolean = false;

    constructor(public model: ChartGroupPreferredInsurersService) { }

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
            ChartPlugin.drawPreferredInsurers(this.model.chartData);
        })
    }
}
