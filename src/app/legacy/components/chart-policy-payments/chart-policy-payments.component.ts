import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';

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
    @Input() canShowFooter: boolean = false;
    @Output() confirmedAction: EventEmitter<void> = new EventEmitter<void>();

    constructor(public model: ChartPolicyPaymentsService) { }

    get canShowChart(): boolean {
        return (this.model.policyPaymentStatistics !== null) ? true : false;
    }

    ngOnInit(): void {
        StatsRecordPlugin.removeChartPolicyPayments();
        this._loadPolicyPaymentStatistics();
    }

    confirmAction(): void {
        this.confirmedAction.emit();
    }

    private _loadPolicyPaymentStatistics(): void {
        this.model.loadPolicyPaymentStatistics(this.contactId, this.policyId).subscribe(() => {
            StatsRecordPlugin.drawChartPolicyPayments(this.model.policyPaymentStatistics);
        });
    }
}
