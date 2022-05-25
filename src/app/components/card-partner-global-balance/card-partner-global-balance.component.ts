import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';

import { CardPartnerGlobalBalanceService } from './card-partner-global-balance.service';

declare var ChartPlugin: any;

@Component({
  selector: 'agt-card-partner-global-balance',
  templateUrl: './card-partner-global-balance.component.html',
  styles: [
  ],
  providers: [CardPartnerGlobalBalanceService]
})
export class CardPartnerGlobalBalanceComponent implements OnChanges {
    @Input() partnerId: number = 0;
    canShowChart: boolean = false;

    constructor(public model: CardPartnerGlobalBalanceService) { }

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
