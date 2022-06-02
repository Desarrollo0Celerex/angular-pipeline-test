import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';

import { ChartContactWalletProjectionAuxService } from './chart-contact-wallet-projection-aux.service';

declare var ChartPlugin: any;

@Component({
  selector: 'agt-chart-contact-wallet-projection-aux',
  templateUrl: './chart-contact-wallet-projection-aux.component.html',
  styles: [
  ],
  providers: [ChartContactWalletProjectionAuxService]
})
export class ChartContactWalletProjectionAuxComponent implements OnChanges {
    @Input() contactId: string = '';
    canShowChart: boolean = false;

    constructor(public cardWalletProjectionService: ChartContactWalletProjectionAuxService) { }

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
