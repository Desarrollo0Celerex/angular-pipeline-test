import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';

import { ChartPartnerActiveCoveragesService } from './chart-partner-active-coverages.service';

declare var ChartPlugin: any;

@Component({
  selector: 'agt-chart-partner-active-coverages',
  templateUrl: './chart-partner-active-coverages.component.html',
  styles: [
  ],
  providers: [ChartPartnerActiveCoveragesService]
})
export class ChartPartnerActiveCoveragesComponent implements OnChanges {
    @Input() partnerId: number = 0;
    canShowChart: boolean = false;

    constructor(public model: ChartPartnerActiveCoveragesService) { }

    ngOnChanges(changes: SimpleChanges): void {
        if(!!changes.partnerId && changes.partnerId.currentValue) {
            this.loadChartData(changes.partnerId.currentValue);
        }
    }

    /**
     * Load the chart data
     * @param partnerId The partner ID
     */
    private loadChartData(partnerId: number): void {
        this.model.loadChartData(partnerId).subscribe(() => {
            this.canShowChart = true;
            ChartPlugin.drawActiveCoverages(this.model.chartData);
        })
    }
}
