import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';

import { ComparisonRangeData } from '@interfaces/comparison-range-data.interface';
import { StatRangeData } from '@interfaces/stat-range-data.interface';

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
    @Input() range: ComparisonRangeData | null = null;

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

    private _loadAppliedPaymentsStats(range: ComparisonRangeData): void {
        this.model.getAppliedPaymentsStats(range).subscribe((appliedPaymentsStats: StatRangeData[][]) => {
            this.model.loadAppliedPaymentsStatsData(appliedPaymentsStats);
            StatsCollectionPlugin.drawChartAppliedPayments(this.model.appliedPaymentsStatsData);
        });
    }

}
