import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';

import { ChartPartnerPreferredInsurersService } from './chart-partner-preferred-insurers.service';

declare var ChartPlugin: any;

@Component({
  selector: 'agt-chart-partner-preferred-insurers',
  templateUrl: './chart-partner-preferred-insurers.component.html',
  styles: [
  ],
  providers: [ChartPartnerPreferredInsurersService]
})
export class ChartPartnerPreferredInsurersComponent implements OnChanges {
    @Input() partnerId: number = 0;
    canShowChart: boolean = false;

    constructor(public model: ChartPartnerPreferredInsurersService) { }

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
            ChartPlugin.drawPreferredInsurers(this.model.chartData);
        })
    }

}
