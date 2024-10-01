import {
    Component,
    OnInit,
    Input,
    SimpleChanges,
    OnChanges,
} from '@angular/core';

import { ChartPolicyPaymentsBehaviorService } from './chart-policy-payments-behavior.service';

declare var StatsRecordPlugin: any;

@Component({
    selector: 'agt-chart-policy-payments-behavior',
    templateUrl: './chart-policy-payments-behavior.component.html',
    styles: [],
    providers: [ChartPolicyPaymentsBehaviorService],
})
export class ChartPolicyPaymentsBehaviorComponent implements OnInit, OnChanges {
    @Input() contactId: string = '';
    @Input() policyId: string = '';
    @Input() paymentId: string = '';
    @Input() canReloadContent: boolean = false;

    constructor(public model: ChartPolicyPaymentsBehaviorService) {}

    get canShowChart(): boolean {
        return this.model.policyPaymentBehaviorStatistics !== null
            ? true
            : false;
    }

    ngOnChanges(changes: SimpleChanges): void {
        if (changes.canReloadContent && changes.canReloadContent.currentValue) {
            this._loadChart();
        }
    }

    ngOnInit(): void {
        this._loadChart();
    }

    private _loadChart(): void {
        StatsRecordPlugin.removeChartPolicyPaymentsBehavior();
        this._loadPolicyPaymentBehaviorStatistics();
    }

    private _loadPolicyPaymentBehaviorStatistics(): void {
        this.model
            .loadPolicyPaymentBehaviorStatistics(
                this.contactId,
                this.policyId,
                this.paymentId
            )
            .subscribe(() => {
                StatsRecordPlugin.drawChartPolicyPaymentsBehavior(
                    this.model.policyPaymentBehaviorStatistics
                );
            });
    }
}
