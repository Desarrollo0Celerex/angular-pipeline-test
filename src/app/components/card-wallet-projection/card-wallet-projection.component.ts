import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';

import { CardWalletProjectionService } from './card-wallet-projection.service';

declare var ChartPlugin: any;

@Component({
  selector: 'agt-card-wallet-projection',
  templateUrl: './card-wallet-projection.component.html',
  styles: [
  ],
  providers: [CardWalletProjectionService]
})
export class CardWalletProjectionComponent implements OnChanges {
    @Input() contactId: string = '';
    canShowChart: boolean = false;

    constructor(public cardWalletProjectionService: CardWalletProjectionService) { }

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
