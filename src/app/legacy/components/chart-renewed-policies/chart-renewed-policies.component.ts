import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';

import { ComparisonRangeData } from '@interfaces/comparison-range-data.interface';
import { StatRangeData } from '@interfaces/stat-range-data.interface';

import { ChartRenewedPoliciesService } from './chart-renewed-policies.service';

declare var StatsPoliciesPlugin: any;

@Component({
  selector: 'agt-chart-renewed-policies',
  templateUrl: './chart-renewed-policies.component.html',
  styles: [
  ],
  providers: [ChartRenewedPoliciesService]
})
export class ChartRenewedPoliciesComponent implements OnChanges {
    @Input() range: ComparisonRangeData | null = null;

    constructor(public model: ChartRenewedPoliciesService) { }

    ngOnChanges(changes: SimpleChanges): void {
        StatsPoliciesPlugin.removeChartRenewedPolicies();
        this._loadRenewedPoliciesStats(changes.range.currentValue);
    }

    get canShowRenewedPoliciesStats(): boolean {
        return (this.model.renewedPoliciesStatsData.length > 0) ? true : false;
    }

    private _loadRenewedPoliciesStats(range: ComparisonRangeData): void {
        this.model.getRenewedPoliciesStats(range).subscribe((renewedPoliciesStats: StatRangeData[][]) => {
            this.model.loadRenewedPoliciesStatsData(renewedPoliciesStats);
            StatsPoliciesPlugin.drawChartRenewedPolicies(this.model.renewedPoliciesStatsData);
        });
    }
}
