import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';

import { ComparisonRangeData } from '@interfaces/comparison-range-data.interface';
import { StatRangeData } from '@interfaces/stat-range-data.interface';

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
    @Input() range: ComparisonRangeData | null = null;

    constructor(public model: ChartReceiptsPaidService) { }

    ngOnChanges(changes: SimpleChanges): void {
        StatsCollectionPlugin.removeChartReceiptsPaid();
        this._loadReceiptsPaidStats(changes.range.currentValue);
    }

    get canShowReceiptsPaidStats(): boolean {
        return (this.model.receiptsPaidStatsData.length > 0) ? true : false;
    }

    private _loadReceiptsPaidStats(range: ComparisonRangeData): void {
        this.model.getReceiptsPaidStats(range).subscribe((receiptsPaidStats: StatRangeData[][]) => {
            this.model.loadReceiptsPaidStatsData(receiptsPaidStats);
            StatsCollectionPlugin.drawChartReceiptsPaid(this.model.receiptsPaidStatsData);
        });
    }
}
