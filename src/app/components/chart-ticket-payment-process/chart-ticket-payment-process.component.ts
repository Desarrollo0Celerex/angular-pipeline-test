import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';

import { RangeData } from '@interfaces/range-data.interface';

import { ChartTicketPaymentProcessService } from './chart-ticket-payment-process.service'

declare var StatsCollectionPlugin: any;

@Component({
  selector: 'agt-chart-ticket-payment-process',
  templateUrl: './chart-ticket-payment-process.component.html',
  styles: [
  ],
  providers: [
      ChartTicketPaymentProcessService
  ]
})
export class ChartTicketPaymentProcessComponent implements OnChanges {
    @Input() range: RangeData | null = null;

    constructor(public model: ChartTicketPaymentProcessService) { }

    ngOnChanges(changes: SimpleChanges): void {
        StatsCollectionPlugin.removeChartPaymentProcess();
        this._loadPaymentProcessStats(changes.range.currentValue);
    }

    get canShowPaymentProcessStats(): boolean {
        return (this.model.paymentProcessStatsData.length > 0) ? true : false;
    }

    private _loadPaymentProcessStats(range: RangeData): void {
        this.model.getPaymentProcessStats(range).subscribe((paymentProcessStats: number[]) => {
            this.model.loadPaymentProcessStatsData(paymentProcessStats);
            StatsCollectionPlugin.drawChartPaymentProcess(this.model.paymentProcessStatsData);
        });
    }
}
