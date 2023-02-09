import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';

import { ComparisonRangeData } from '@interfaces/comparison-range-data.interface';

import { ChartPolicyRenewalProcessService } from './chart-policy-renewal-process.service'

declare var StatsPoliciesPlugin: any;

@Component({
  selector: 'agt-chart-policy-renewal-process',
  templateUrl: './chart-policy-renewal-process.component.html',
  styles: [
  ],
  providers: [ChartPolicyRenewalProcessService]
})
export class ChartPolicyRenewalProcessComponent implements OnChanges {
    @Input() range: ComparisonRangeData | null = null;

    constructor(public model: ChartPolicyRenewalProcessService) { }

    ngOnChanges(changes: SimpleChanges): void {
        StatsPoliciesPlugin.removeChartRenewalProcess();
        this._loadRenewalProcessStats(changes.range.currentValue);
    }

    get canShowRenewalProcessStats(): boolean {
        return (this.model.renewalProcessStatsData.length > 0) ? true : false;
    }

    private _loadRenewalProcessStats(range: ComparisonRangeData): void {
        this.model.getRenewalProcessStats(range).subscribe((renewalProcessStats: number[]) => {
            this.model.loadRenewalProcessStatsData(renewalProcessStats);
            StatsPoliciesPlugin.drawChartRenewalProcess(this.model.renewalProcessStatsData);
        });
    }

}
