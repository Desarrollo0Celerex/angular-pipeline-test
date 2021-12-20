import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';

import { RangeData } from '@interfaces/range-data.interface';
import { RangeStat } from '@interfaces/range-stat.interface';

import { ChartPendingPaymentsService } from './chart-pending-payments.service';

declare var StatsCollectionPlugin: any;

@Component({
  selector: 'agt-chart-pending-payments',
  templateUrl: './chart-pending-payments.component.html',
  styles: [
  ],
  providers: [ChartPendingPaymentsService]
})
export class ChartPendingPaymentsComponent implements OnChanges {
    @Input() range: RangeData | null = null;

    constructor(private _chartPendingPaymentsService: ChartPendingPaymentsService) { }

    ngOnChanges(changes: SimpleChanges): void {
        StatsCollectionPlugin.removeChartPendingPayments();
        this._loadPendingPaymentsStats(changes.range.currentValue);
    }

    get model(): ChartPendingPaymentsService {
        return this._chartPendingPaymentsService;
    }

    get canShowPendingPaymentsStats(): boolean {
        return (this.model.pendingPaymentsStatsData.length > 0) ? true : false;
    }

    private _loadPendingPaymentsStats(range: RangeData): void {
        this.model.getPendingPaymentsStats(range).subscribe((pendingPaymentsStats: RangeStat[][]) => {
            this.model.loadPendingPaymentsStatsData(pendingPaymentsStats);
            StatsCollectionPlugin.drawChartPendingPayments(this.model.pendingPaymentsStatsData);
        });
    }

}
