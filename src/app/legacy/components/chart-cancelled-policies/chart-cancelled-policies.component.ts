import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';

import { ComparisonRangeData } from '@interfaces/comparison-range-data.interface';
import { StatRangeData } from '@interfaces/stat-range-data.interface';

import { ChartCancelledPoliciesService } from './chart-cancelled-policies.service';

declare var StatsPoliciesPlugin: any;

@Component({
  selector: 'agt-chart-cancelled-policies',
  templateUrl: './chart-cancelled-policies.component.html',
  styles: [
  ],
  providers: [
      ChartCancelledPoliciesService
  ]
})
export class ChartCancelledPoliciesComponent implements OnChanges {
    @Input() range: ComparisonRangeData | null = null;

    constructor(private _chartCancelledPoliciesService: ChartCancelledPoliciesService) { }

    ngOnChanges(changes: SimpleChanges): void {
        StatsPoliciesPlugin.removeChartCancelledPolicies();
        this._loadCancelledPoliciesStats(changes.range.currentValue);
    }

    get model(): ChartCancelledPoliciesService {
        return this._chartCancelledPoliciesService;
    }

    get canShowCancelledPoliciesStats(): boolean {
        return (this.model.cancelledPoliciesStatsData.length > 0) ? true : false;
    }

    private _loadCancelledPoliciesStats(range: ComparisonRangeData): void {
        this.model.getCancelledPoliciesStats(range).subscribe((cancelledPoliciesStats: StatRangeData[][]) => {
            this.model.loadCancelledPoliciesStatsData(cancelledPoliciesStats);
            StatsPoliciesPlugin.drawChartCancelledPolicies(this.model.cancelledPoliciesStatsData);
        });
    }

}
