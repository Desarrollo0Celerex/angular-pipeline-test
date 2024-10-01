import {
    Component,
    Input,
    OnInit,
    Output,
    EventEmitter,
    OnChanges,
    SimpleChanges,
} from '@angular/core';

import { ChartPolicyPaymentsService } from './chart-policy-payments.service';

declare var StatsRecordPlugin: any;

@Component({
    selector: 'agt-chart-policy-payments',
    templateUrl: './chart-policy-payments.component.html',
    styles: [],
    providers: [ChartPolicyPaymentsService],
})
export class ChartPolicyPaymentsComponent implements OnInit, OnChanges {
    @Input() contactId: string = '';
    @Input() policyId: string = '';
    @Input() canShowFooter: boolean = false;
    @Input() canReloadContent: boolean = false;
    @Output() confirmedAction: EventEmitter<void> = new EventEmitter<void>();

    constructor(public model: ChartPolicyPaymentsService) {}

    ngOnChanges(changes: SimpleChanges): void {
        if (changes.canReloadContent && changes.canReloadContent.currentValue) {
            this._loadChart();
        }
    }

    get canShowChart(): boolean {
        return this.model.policyPaymentStatistics !== null ? true : false;
    }

    ngOnInit(): void {
        this._loadChart();
    }

    private _loadChart(): void {
        StatsRecordPlugin.removeChartPolicyPayments();
        this._loadPolicyPaymentStatistics();
    }

    confirmAction(): void {
        this.confirmedAction.emit();
    }

    private _loadPolicyPaymentStatistics(): void {
        this.model
            .loadPolicyPaymentStatistics(this.contactId, this.policyId)
            .subscribe(() => {
                StatsRecordPlugin.drawChartPolicyPayments(
                    this.model.policyPaymentStatistics
                );
            });
    }
}
