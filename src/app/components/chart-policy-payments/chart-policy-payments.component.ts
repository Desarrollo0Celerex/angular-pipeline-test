import { Component, Input, OnInit } from '@angular/core';

import { ChartPolicyPaymentsService } from './chart-policy-payments.service';

declare var StatsRecordPlugin: any;

@Component({
  selector: 'agt-chart-policy-payments',
  templateUrl: './chart-policy-payments.component.html',
  styles: [
  ],
  providers: [ChartPolicyPaymentsService]
})
export class ChartPolicyPaymentsComponent implements OnInit {
    @Input() contactId: string = '';
    @Input() policyId: string = '';

    constructor(public model: ChartPolicyPaymentsService) { }

    get canShowChart(): boolean {
        return (this.model.policyPaymentStatistics !== null) ? true : false;
    }

    ngOnInit(): void {
        StatsRecordPlugin.removeChartPolicyPayments();
        this._loadPolicyPaymentStatistics();
    }

    private _loadPolicyPaymentStatistics(): void {
        this.model.loadPolicyPaymentStatistics(this.contactId, this.policyId).subscribe(() => {
            StatsRecordPlugin.drawChartPolicyPayments(this.model.policyPaymentStatistics);
        });
    }
}
