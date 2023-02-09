import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';

import { ComparisonRangeData } from '@interfaces/comparison-range-data.interface';
import { StatRangeData } from '@interfaces/stat-range-data.interface';

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
    @Input() range: ComparisonRangeData | null = null;

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

    private _loadPoliciesStats(range: ComparisonRangeData): void {
        this.model.getPoliciesStats(range).subscribe((policiesStats: StatRangeData[][]) => {
            this.model.loadPoliciesStatsData(policiesStats);
            StatsPoliciesPlugin.drawChartPolicies(this.model.policiesStatsData);
        });
    }

}
