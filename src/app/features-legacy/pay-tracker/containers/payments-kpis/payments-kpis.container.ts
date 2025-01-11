import { Component, OnInit } from '@angular/core';
import { Observable, forkJoin } from 'rxjs';

import { PAYMENT_STATUS } from '@core/constants/settings';
import { UtilitiesHelper } from '@core/helpers/utilities.helper';
import { Kpi } from '@core/interfaces/kpi.interface';
import { PaymentService } from '@core/services/payment/payment.service';
import { PaymentStatusBackgroundPipe } from '@shared/pipes/payment-status-background/payment-status-background.pipe';
import { PaymentStatusIconPipe } from '@shared/pipes/payment-status-icon/payment-status-icon.pipe';
import { PaymentStatusNamePipe } from '@shared/pipes/payment-status-name/payment-status-name.pipe';

import { PayTrackerService } from '../../services/pay-tracker/pay-tracker.service';
import { SmartComponent } from '@core/classes/smart-component';
import { PAY_TRACKER_ROUTES } from '@core/constants/routes';

declare var CounterPlugin: any;

@Component({
    selector: 'agt-payments-kpis',
    templateUrl: './payments-kpis.container.html',
    styles: [],
    standalone: false
})
export class PaymentsKpisContainer extends SmartComponent implements OnInit {
    kpis: Kpi[] = this._initKpis();
    selectedPaymentStatusId: number = 0;

    constructor(
        private _paymentService: PaymentService,
        private _paymentStatusBackgroundPipe: PaymentStatusBackgroundPipe,
        private _paymentStatusIconPipe: PaymentStatusIconPipe,
        private _paymentStatusNamePipe: PaymentStatusNamePipe,
        private _payTrackerService: PayTrackerService
    ) {
        super();
    }

    ngOnInit(): void {
        this._loadKpis();
        this._payTrackerService.paymentStatusId
            .pipe(this.untilComponentDestroy())
            .subscribe((paymentStatusId) => {
                this.selectedPaymentStatusId = paymentStatusId;
            });
        this._payTrackerService.canReloadContent
            .pipe(this.untilComponentDestroy())
            .subscribe((canReloadContent: boolean) => {
                if (canReloadContent) {
                    this.kpis = this._initKpis();
                    this._loadKpis();
                }
            });
    }

    selectPaymentStatusId(contectSubtype: number): void {
        this._payTrackerService.setPaymentStatusId(contectSubtype);
    }

    private _initKpis(): Kpi[] {
        return [
            {
                contentTypeName: 'Recibos',
                contentSubtype: PAYMENT_STATUS.IN_TRANSIT,
                contentSubtypeName: this._paymentStatusNamePipe.transform(
                    PAYMENT_STATUS.IN_TRANSIT
                ),
                contentSubtypeBackground:
                    this._paymentStatusBackgroundPipe.transform(
                        PAYMENT_STATUS.IN_TRANSIT
                    ),
                contentSubtypeIcon: this._paymentStatusIconPipe.transform(
                    PAYMENT_STATUS.IN_TRANSIT
                ),
                route: `/${PAY_TRACKER_ROUTES.MODULE}/${PAY_TRACKER_ROUTES.PAYMENTS}`,
                value: 0,
                total: 0,
            },
            {
                contentTypeName: 'Recibos',
                contentSubtype: PAYMENT_STATUS.IN_TIME,
                contentSubtypeName: this._paymentStatusNamePipe.transform(
                    PAYMENT_STATUS.IN_TIME
                ),
                contentSubtypeBackground:
                    this._paymentStatusBackgroundPipe.transform(
                        PAYMENT_STATUS.IN_TIME
                    ),
                contentSubtypeIcon: this._paymentStatusIconPipe.transform(
                    PAYMENT_STATUS.IN_TIME
                ),
                route: `/${PAY_TRACKER_ROUTES.MODULE}/${PAY_TRACKER_ROUTES.PAYMENTS}`,
                value: 0,
                total: 0,
            },
            {
                contentTypeName: 'Recibos',
                contentSubtype: PAYMENT_STATUS.LATE,
                contentSubtypeName: this._paymentStatusNamePipe.transform(
                    PAYMENT_STATUS.LATE
                ),
                contentSubtypeBackground:
                    this._paymentStatusBackgroundPipe.transform(
                        PAYMENT_STATUS.LATE
                    ),
                contentSubtypeIcon: this._paymentStatusIconPipe.transform(
                    PAYMENT_STATUS.LATE
                ),
                route: `/${PAY_TRACKER_ROUTES.MODULE}/${PAY_TRACKER_ROUTES.PAYMENTS}`,
                value: 0,
                total: 0,
            },
            {
                contentTypeName: 'Recibos',
                contentSubtype: PAYMENT_STATUS.OVERDUE,
                contentSubtypeName: this._paymentStatusNamePipe.transform(
                    PAYMENT_STATUS.OVERDUE
                ),
                contentSubtypeBackground:
                    this._paymentStatusBackgroundPipe.transform(
                        PAYMENT_STATUS.OVERDUE
                    ),
                contentSubtypeIcon: this._paymentStatusIconPipe.transform(
                    PAYMENT_STATUS.OVERDUE
                ),
                route: `/${PAY_TRACKER_ROUTES.MODULE}/${PAY_TRACKER_ROUTES.PAYMENTS}`,
                value: 0,
                total: 0,
            },
        ];
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
