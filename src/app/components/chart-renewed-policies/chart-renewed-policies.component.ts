import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';

import { RangeData } from '@interfaces/range-data.interface';
import { RangeStat } from '@interfaces/range-stat.interface';

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
    @Input() range: RangeData | null = null;

    constructor(public model: ChartRenewedPoliciesService) { }

    ngOnChanges(changes: SimpleChanges): void {
        StatsPoliciesPlugin.removeChartRenewedPolicies();
        this._loadRenewedPoliciesStats(changes.range.currentValue);
    }

    get canShowRenewedPoliciesStats(): boolean {
        return (this.model.renewedPoliciesStatsData.length > 0) ? true : false;
    }

    private _loadRenewedPoliciesStats(range: RangeData): void {
        this.model.getRenewedPoliciesStats(range).subscribe((renewedPoliciesStats: RangeStat[][]) => {
            this.model.loadRenewedPoliciesStatsData(renewedPoliciesStats);
            StatsPoliciesPlugin.drawChartRenewedPolicies(this.model.renewedPoliciesStatsData);
        });
    }
}
