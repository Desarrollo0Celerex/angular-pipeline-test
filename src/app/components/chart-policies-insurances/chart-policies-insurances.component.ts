import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';

import { RangeData } from '@interfaces/range-data.interface';
import { Stat } from '@interfaces/stat.interface';

import { ChartPoliciesInsurancesService } from './chart-policies-insurances.service';

declare var StatsPoliciesPlugin: any;

@Component({
  selector: 'agt-chart-policies-insurances',
  templateUrl: './chart-policies-insurances.component.html',
  styles: [
  ],
  providers: [ChartPoliciesInsurancesService]
})
export class ChartPoliciesInsurancesComponent implements OnChanges {
    @Input() range: RangeData | null = null;

    constructor(private _chartPolicyInsurancesService: ChartPoliciesInsurancesService) { }

    ngOnChanges(changes: SimpleChanges): void {
        StatsPoliciesPlugin.removeChartInsurancesPolicies();
        this._loadInsurancesPoliciesStats(changes.range.currentValue);
    }

    get model(): ChartPoliciesInsurancesService {
        return this._chartPolicyInsurancesService;
    }

    get canShowInsurancesPoliciesStats(): boolean {
        return (this.model.insurancesPoliciesStatsData.length > 0) ? true : false;
    }

    private _loadInsurancesPoliciesStats(range: RangeData): void {
        this.model.getInsurancesPoliciesStats(range).subscribe((res: Stat[][]) => {
            this.model.loadInsurancesPoliciesStatsData(res);
            StatsPoliciesPlugin.drawChartInsurancesPolicies(this.model.insurancesPoliciesStatsData);
        });
    }

}
