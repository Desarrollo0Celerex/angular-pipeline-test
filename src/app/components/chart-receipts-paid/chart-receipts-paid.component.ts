import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';

import { RangeData } from '@interfaces/range-data.interface';
import { RangeStat } from '@interfaces/range-stat.interface';

import { ChartReceiptsPaidService } from './chart-receipts-paid.service';

declare var StatsCollectionPlugin: any;

@Component({
  selector: 'agt-chart-receipts-paid',
  templateUrl: './chart-receipts-paid.component.html',
  styles: [
  ],
  providers: [ChartReceiptsPaidService]
})
export class ChartReceiptsPaidComponent implements OnChanges {
    @Input() range: RangeData | null = null;

    constructor(public model: ChartReceiptsPaidService) { }

    ngOnChanges(changes: SimpleChanges): void {
        StatsCollectionPlugin.removeChartReceiptsPaid();
        this._loadReceiptsPaidStats(changes.range.currentValue);
    }

    get canShowReceiptsPaidStats(): boolean {
        return (this.model.receiptsPaidStatsData.length > 0) ? true : false;
    }

    private _loadReceiptsPaidStats(range: RangeData): void {
        this.model.getReceiptsPaidStats(range).subscribe((receiptsPaidStats: RangeStat[][]) => {
            this.model.loadReceiptsPaidStatsData(receiptsPaidStats);
            StatsCollectionPlugin.drawChartReceiptsPaid(this.model.receiptsPaidStatsData);
        });
    }
}
