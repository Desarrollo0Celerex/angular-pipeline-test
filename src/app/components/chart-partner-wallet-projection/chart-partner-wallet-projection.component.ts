import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';

import { ChartPartnerWalletProjectionService } from './chart-partner-wallet-projection.service';

declare var ChartPlugin: any;
declare var PopoverPlugin: any;
declare var TooltipPlugin: any;

@Component({
  selector: 'agt-chart-partner-wallet-projection',
  templateUrl: './chart-partner-wallet-projection.component.html',
  styles: [
  ],
  providers: [ChartPartnerWalletProjectionService]
})
export class ChartPartnerWalletProjectionComponent implements OnChanges, OnInit {
    @Input() partnerId: number = 0;
    canShowChart: boolean = false;

    constructor(public model: ChartPartnerWalletProjectionService) { }

    ngOnChanges(changes: SimpleChanges): void {
        if(!!changes.partnerId && changes.partnerId.currentValue) {
            this._loadChartData(changes.partnerId.currentValue);
        }
    }

    ngOnInit(): void {
        PopoverPlugin.init();
    }

    /**
     * Load the chart data
     * @param partnerId The contact ID
     */
    private _loadChartData(partnerId: number): void {
        this.model.loadChartData(partnerId).subscribe(() => {
            this.canShowChart = true;
            ChartPlugin.drawWalletProjection(this.model.chartData);
            TooltipPlugin.init();
        })
    }
}
