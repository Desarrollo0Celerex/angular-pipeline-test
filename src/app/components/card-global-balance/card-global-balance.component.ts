import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';

import { CardGlobalBalanceService } from './card-global-balance.service';

declare var ChartPlugin: any;

@Component({
  selector: 'agt-card-global-balance',
  templateUrl: './card-global-balance.component.html',
  styles: [
  ],
  providers: [CardGlobalBalanceService]
})
export class CardGlobalBalanceComponent implements OnChanges {
    @Input() contactId: string = '';
    canShowChart: boolean = false;

    constructor(public cardGlobalBalanceService: CardGlobalBalanceService) { }

    ngOnInit(): void {
    }

    ngOnChanges(changes: SimpleChanges): void {
        if(!!changes.contactId && changes.contactId.currentValue) {
            this.loadChartData(changes.contactId.currentValue);
        }
    }

    /**
     * Load the chart data
     * @param contactId The contact ID
     */
    private loadChartData(contactId: string): void {
        this.cardGlobalBalanceService.loadChartData(contactId).subscribe(() => {
            this.canShowChart = true;
            ChartPlugin.drawGlobalBalance(this.cardGlobalBalanceService.chartData);
        })
    }

}
