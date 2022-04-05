import { Component, Input, OnInit } from '@angular/core';

import { ChartPolicyTrackerAmountsService } from './chart-policy-tracker-amounts.service';

declare var StatsTrackerPlugin: any;

@Component({
  selector: 'agt-chart-policy-tracker-amounts',
  templateUrl: './chart-policy-tracker-amounts.component.html',
  styles: [
  ],
  providers: [ChartPolicyTrackerAmountsService]
})
export class ChartPolicyTrackerAmountsComponent implements OnInit {
    @Input() contactId: string = '';
    @Input() policyId: string = '';

    constructor(public model: ChartPolicyTrackerAmountsService) { }

    get canShowChart(): boolean {
        return (this.model.amounts.length > 0) ? true : false;
    }

    ngOnInit(): void {
        StatsTrackerPlugin.removeChartTrackerAmounts();
        this._loadWorkspaceCurrencyName();
    }

    private _loadWorkspaceCurrencyName(): void {
        this.model.loadWorkspaceCurrencyName().subscribe(() => {
            this._loadPolicyTrackerAmounts();
        });
    }

    private _loadPolicyTrackerAmounts(): void {
        this.model.loadPolicyTrackerAmounts(this.contactId, this.policyId).subscribe(() => {
            StatsTrackerPlugin.drawChartTrackerAmounts(this.model.amounts);
        });
    }

}
