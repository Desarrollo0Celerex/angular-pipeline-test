import { Component, OnInit, Input } from '@angular/core';

import { ChartPolicyPaymentsBehaviorService } from './chart-policy-payments-behavior.service';

declare var StatsRecordPlugin: any;

@Component({
  selector: 'agt-chart-policy-payments-behavior',
  templateUrl: './chart-policy-payments-behavior.component.html',
  styles: [
  ],
  providers: [ChartPolicyPaymentsBehaviorService]
})
export class ChartPolicyPaymentsBehaviorComponent implements OnInit {
    @Input() contactId: string = '';
    @Input() policyId: string = '';
    @Input() paymentId: string = '';

    constructor(public model: ChartPolicyPaymentsBehaviorService) { }

    get canShowChart(): boolean {
        return (this.model.policyPaymentBehaviorStatistics !== null) ? true : false;
    }

    ngOnInit(): void {
        StatsRecordPlugin.removeChartPolicyPaymentsBehavior();
        this._loadPolicyPaymentBehaviorStatistics();
    }

    private _loadPolicyPaymentBehaviorStatistics(): void {
        this.model.loadPolicyPaymentBehaviorStatistics(this.contactId, this.policyId, this.paymentId).subscribe(() => {
            StatsRecordPlugin.drawChartPolicyPaymentsBehavior(this.model.policyPaymentBehaviorStatistics);
        });
    }
}
