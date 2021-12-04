import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';

import { RangeData } from '@interfaces/range-data.interface';
import { RangeStat } from '@interfaces/range-stat.interface';

import { ChartPoliciesService } from './chart-policies.service';

declare var StatsPoliciesPlugin: any;

@Component({
  selector: 'agt-chart-policies',
  templateUrl: './chart-policies.component.html',
  styles: [
  ],
  providers: [ChartPoliciesService]
})
export class ChartPoliciesComponent implements OnChanges {
    @Input() range: RangeData | null = null;

    constructor(private _chartPoliciesService: ChartPoliciesService) { }

    ngOnChanges(changes: SimpleChanges): void {
        StatsPoliciesPlugin.removeChartPolicies();
        this._loadPoliciesStats(changes.range.currentValue);
    }

    get model(): ChartPoliciesService {
        return this._chartPoliciesService;
    }

    get canShowPoliciesStats(): boolean {
        return (this.model.policiesStatsData.length > 0) ? true : false;
    }

    private _loadPoliciesStats(range: RangeData): void {
        this.model.getPoliciesStats(range).subscribe((policiesStats: RangeStat[][]) => {
            this.model.loadPoliciesStatsData(policiesStats);
            StatsPoliciesPlugin.drawChartPolicies(this.model.policiesStatsData);
        });
    }

}
