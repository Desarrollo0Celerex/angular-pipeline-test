import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';

import { ChartPartnerWalletProjectionService } from './chart-partner-wallet-projection.service';

declare var ChartPlugin: any;
declare var PopoverPlugin: any;

@Component({
    selector: 'agt-chart-partner-wallet-projection',
    templateUrl: './chart-partner-wallet-projection.component.html',
    styles: [],
    providers: [ChartPartnerWalletProjectionService],
    standalone: false
})
export class ChartPartnerWalletProjectionComponent implements OnChanges, OnInit {
    @Input() partnerId: number = 0;

    constructor(public model: ChartPartnerWalletProjectionService) { }

    ngOnChanges(changes: SimpleChanges): void {
        if(!!changes.partnerId && changes.partnerId.currentValue) {
            ChartPlugin.removeWalletProjection();
            this._loadChartData(changes.partnerId.currentValue);
        }
    }

    ngOnInit(): void {
        PopoverPlugin.init();
    }

    get canShowChart(): boolean {
        return (this.model.chartData !== null) ? true : false;
    }

    /**
     * Load the chart data
     * @param partnerId The contact ID
     */
    private _loadChartData(partnerId: number): void {
        this.model.loadChartData(partnerId).subscribe(() => {
            ChartPlugin.drawWalletProjection(this.model.chartData);
        })
    }
}
