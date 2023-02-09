import { Component, Input, OnInit, OnChanges, SimpleChanges } from '@angular/core';

import { ComparisonRangeData } from '@interfaces/comparison-range-data.interface';

import { ContainerPaymentsKpisService } from './container-payments-kpis.service'

@Component({
  selector: 'agt-container-payments-kpis',
  templateUrl: './container-payments-kpis.component.html',
  styles: [
  ],
  providers: [ContainerPaymentsKpisService]
})
export class ContainerPaymentsKpisComponent implements OnInit, OnChanges {
    @Input() range: ComparisonRangeData | null = null;

    constructor(private _containerPaymentsKpisService: ContainerPaymentsKpisService) { }

    ngOnChanges(changes: SimpleChanges): void {
        this.model.loadRangeDates(changes.range.currentValue)
        this._loadIntimePayments(changes.range.currentValue);
        this._loadPendingPayments(changes.range.currentValue);
        this._loadLatePayments(changes.range.currentValue);
        this._loadOverduePayments(changes.range.currentValue);
    }

    ngOnInit(): void {
        this._loadTotalPendingPayments();
    }

    get model(): ContainerPaymentsKpisService {
        return this._containerPaymentsKpisService;
    }

    private _loadIntimePayments(range: ComparisonRangeData): void {
        this.model.getIntimePayments(range).subscribe((intimePayments: number[]) => {
            this.model.loadIntimePayments(intimePayments);
        });
    }

    private _loadPendingPayments(range: ComparisonRangeData): void {
        this.model.getPendingPayments(range).subscribe((pendingPayments: number[]) => {
            this.model.loadPendingPayments(pendingPayments);
        });
    }

    private _loadLatePayments(range: ComparisonRangeData): void {
        this.model.getLatePayments(range).subscribe((latePayments: number[]) => {
            this.model.loadLatePayments(latePayments);
        });
    }

    private _loadOverduePayments(range: ComparisonRangeData): void {
        this.model.getOverduePayments(range).subscribe((overduePayments: number[]) => {
            this.model.loadOverduePayments(overduePayments);
        });
    }

    private _loadTotalPendingPayments(): void {
        this.model.getTotalPendingPayments().subscribe((res: number) => {
            this.model.loadTotalPendingPayments(res);
        })
    }

}
