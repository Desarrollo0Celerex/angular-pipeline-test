import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';

import { RangeData } from '@interfaces/range-data.interface';
import { RangeStat } from '@interfaces/range-stat.interface';

import { ChartAppliedPaymentsService } from './chart-applied-payments.service';

declare var StatsCollectionPlugin: any;

@Component({
  selector: 'agt-chart-applied-payments',
  templateUrl: './chart-applied-payments.component.html',
  styles: [
  ],
  providers: [ChartAppliedPaymentsService]
})
export class ChartAppliedPaymentsComponent implements OnChanges {
    @Input() range: RangeData | null = null;

    constructor(public model: ChartAppliedPaymentsService) { }

    ngOnChanges(changes: SimpleChanges): void {
        StatsCollectionPlugin.removeChartAppliedPayments();
        this._loadAppliedPaymentsStats(changes.range.currentValue);
    }

    ngOnInit(): void {
        this.model.loadWorkspaceCurrencyName();
    }

    get canShowAppliedPaymentsStats(): boolean {
        return (this.model.appliedPaymentsStatsData.length > 0) ? true : false;
    }

    private _loadAppliedPaymentsStats(range: RangeData): void {
        this.model.getAppliedPaymentsStats(range).subscribe((appliedPaymentsStats: RangeStat[][]) => {
            this.model.loadAppliedPaymentsStatsData(appliedPaymentsStats);
            StatsCollectionPlugin.drawChartAppliedPayments(this.model.appliedPaymentsStatsData);
        });
    }

}
