import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';

import { ChartPartnerGlobalBalanceService } from './chart-partner-global-balance.service';

declare var ChartPlugin: any;

@Component({
    selector: 'agt-chart-partner-global-balance',
    templateUrl: './chart-partner-global-balance.component.html',
    styles: [],
    providers: [ChartPartnerGlobalBalanceService],
    standalone: false
})
export class ChartPartnerGlobalBalanceComponent implements OnChanges {
    @Input() partnerId: number = 0;
    canShowChart: boolean = false;

    constructor(public model: ChartPartnerGlobalBalanceService) { }

    ngOnInit(): void {
    }

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
            ChartPlugin.drawGlobalBalance(this.model.chartData);
        })
    }

}
