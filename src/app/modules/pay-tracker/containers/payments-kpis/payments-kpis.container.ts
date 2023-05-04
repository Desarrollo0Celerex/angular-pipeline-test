import { Component, Input, OnInit } from '@angular/core';
import { Observable, forkJoin } from 'rxjs';

import { CONTENT_TYPES, PAYMENT_STATUS } from '@configs/constants.config';
import { UtilitiesHelper } from '@core/helpers/utilities.helper';
import { ContentKpi } from '@core/interfaces/content-kpi.interface';
import { PaymentService } from '@core/services/payment/payment.service';

import { PayTrackerService } from '../../services/pay-tracker/pay-tracker.service';
import { SmartComponent } from '@core/classes/smart-component';

declare var CounterPlugin: any;

@Component({
    selector: 'agt-payments-kpis',
    templateUrl: './payments-kpis.container.html',
    styles: [],
})
export class PaymentsKpisContainer extends SmartComponent implements OnInit {
    @Input() selectedPaymentStatusId: number = 0;
    kpis: ContentKpi[] = [
        {
            contentType: CONTENT_TYPES.PAYMENTS,
            contentSubtype: PAYMENT_STATUS.IN_TRANSIT,
            value: 0,
            total: 0,
        },
        {
            contentType: CONTENT_TYPES.PAYMENTS,
            contentSubtype: PAYMENT_STATUS.IN_TIME,
            value: 0,
            total: 0,
        },
        {
            contentType: CONTENT_TYPES.PAYMENTS,
            contentSubtype: PAYMENT_STATUS.LATE,
            value: 0,
            total: 0,
        },
        {
            contentType: CONTENT_TYPES.PAYMENTS,
            contentSubtype: PAYMENT_STATUS.OVERDUE,
            value: 0,
            total: 0,
        },
    ];

    constructor(
        private _paymentService: PaymentService,
        private _payTrackerService: PayTrackerService
    ) {
        super();
    }

    ngOnInit(): void {
        this._loadKpis();
    }

    selectPaymentStatusId(contectSubtype: number): void {
        this._payTrackerService.setPaymentStatusId(contectSubtype);
    }

    private _loadKpis(): void {
        this._paymentService
            .getTotalWorkspacePayments()
            .pipe(this.untilComponentDestroy())
            .subscribe((total: number) => {
                this._generateRequests()
                    .pipe(this.untilComponentDestroy())
                    .subscribe((totalsByStatus: number[]) => {
                        this._loadData(total, totalsByStatus);
                        CounterPlugin.countUp();
                    });
            });
    }

    private _generateRequest(paymentStatusId: number): Observable<number> {
        const filters: string = UtilitiesHelper.generateHttpFilter(
            'paymentStatusId',
            [paymentStatusId]
        );
        return this._paymentService.getTotalWorkspacePayments(filters);
    }

    private _generateRequests(): Observable<number[]> {
        let requests: Observable<number>[] = [];
        for (let kpi of this.kpis) {
            requests.push(this._generateRequest(kpi.contentSubtype));
        }
        return forkJoin(requests);
    }

    private _loadData(total: number, totalsByStatus: number[]): void {
        for (let index in totalsByStatus) {
            this.kpis[index].value = totalsByStatus[index];
            this.kpis[index].total = total;
        }
    }
}
