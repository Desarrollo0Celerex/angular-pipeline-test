import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';

import { ComparisonRangeData } from '@interfaces/comparison-range-data.interface';
import { StatRangeData } from '@interfaces/stat-range-data.interface';

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
    @Input() range: ComparisonRangeData | null = null;

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

    private _loadPendingPaymentsStats(range: ComparisonRangeData): void {
        this.model.getPendingPaymentsStats(range).subscribe((pendingPaymentsStats: StatRangeData[][]) => {
            this.model.loadPendingPaymentsStatsData(pendingPaymentsStats);
            StatsCollectionPlugin.drawChartPendingPayments(this.model.pendingPaymentsStatsData);
        });
    }

}
