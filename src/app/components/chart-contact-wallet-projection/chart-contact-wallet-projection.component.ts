import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';

import { ChartContactWalletProjectionService } from './chart-contact-wallet-projection.service';

declare var ChartPlugin: any;

@Component({
  selector: 'agt-chart-contact-wallet-projection',
  templateUrl: './chart-contact-wallet-projection.component.html',
  styles: [
  ],
  providers: [ChartContactWalletProjectionService]
})
export class ChartContactWalletProjectionComponent implements OnChanges {
    @Input() contactId: string = '';
    canShowChart: boolean = false;

    constructor(public cardWalletProjectionService: ChartContactWalletProjectionService) { }

    ngOnChanges(changes: SimpleChanges): void {
        if(!!changes.contactId && changes.contactId.currentValue) {
            this._loadChartData(changes.contactId.currentValue);
        }
    }

    /**
     * Load the chart data
     * @param contactId The contact ID
     */
    private _loadChartData(contactId: string): void {
        this.cardWalletProjectionService.loadChartData(contactId).subscribe(() => {
            this.canShowChart = true;
            ChartPlugin.drawWalletProjection(this.cardWalletProjectionService.chartData);
        })
    }
}
