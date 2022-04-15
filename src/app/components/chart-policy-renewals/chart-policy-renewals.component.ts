import { Component, Input, OnInit } from '@angular/core';

import { ChartPolicyRenewalsService } from './chart-policy-renewals.service';

declare var StatsRecordPlugin: any;

@Component({
  selector: 'agt-chart-policy-renewals',
  templateUrl: './chart-policy-renewals.component.html',
  styles: [
  ],
  providers: [ChartPolicyRenewalsService]
})
export class ChartPolicyRenewalsComponent implements OnInit {
    @Input() contactId: string = '';
    @Input() policyId: string = '';

    constructor(public model: ChartPolicyRenewalsService) { }

    get canShowChart(): boolean {
        return (this.model.policyRenewalStatistics !== null) ? true : false;
    }

    ngOnInit(): void {
        StatsRecordPlugin.removeChartPolicyRenewals();
        this._loadPolicyRenewalStatistics();
    }

    private _loadPolicyRenewalStatistics(): void {
        this.model.loadPolicyRenewalStatistics(this.contactId, this.policyId).subscribe(() => {
            StatsRecordPlugin.drawChartPolicyRenewals(this.model.policyRenewalStatistics);
        });
    }
}
