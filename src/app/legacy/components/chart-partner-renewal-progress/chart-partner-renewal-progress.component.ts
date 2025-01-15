import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';

import { ChartPartnerRenewalProgressService } from './chart-partner-renewal-progress.service';

declare var ChartPlugin: any;

@Component({
    selector: 'agt-chart-partner-renewal-progress',
    templateUrl: './chart-partner-renewal-progress.component.html',
    styles: [],
    providers: [ChartPartnerRenewalProgressService],
    standalone: false
})
export class ChartPartnerRenewalProgressComponent implements OnChanges {
    @Input() partnerId: number = 0;
    @Input() rangeStart: string = '';
    @Input() rangeEnd: string = '';

    constructor(public model: ChartPartnerRenewalProgressService) { }

    ngOnChanges(changes: SimpleChanges): void {
        if(!!changes.partnerId && changes.partnerId.currentValue) {
            ChartPlugin.removeChartRenewalProcess();
            this.loadChartData(changes.partnerId.currentValue);
        }
    }

    get canShowChart(): boolean {
        return (this.model.chartData !== null) ? true : false;
    }

    /**
     * Load the chart data
     * @param partnerId The partner ID
     */
    private loadChartData(partnerId: number): void {
        this.model.loadChartData(partnerId, this.rangeStart, this.rangeEnd).subscribe(() => {
            ChartPlugin.drawChartRenewalProcess(this.model.chartData);
        })
    }

}
