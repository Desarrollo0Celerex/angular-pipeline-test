import { Injectable } from '@angular/core';
import { forkJoin, Observable } from 'rxjs';

import { PAYMENT_STATUS, PERIOD_STATUS } from '@constants/global';
import { UtilitiesHelper } from '@core/helpers/utilities.helper';
import { KpiOne } from '@interfaces/kpi-one.interface';
import { PaymentService } from '@services/payment.service';
import { ComparisonRangeData } from '@interfaces/comparison-range-data.interface';

const INTIME: number = 0;
const PENDING: number = 1;
const LATE: number = 2;
const OVERDUE: number = 3;

@Injectable()
export class ContainerPaymentsKpisService {
    channelKpis: KpiOne[] = [
        {
            contentName: 'Recibos',
            subcontentName: 'En Tránsito',
            description:
                'Permite identificar el número de recibos próximos a cobrarse.',
            totalContents: 0,
            selectedValue: 0,
            selectedRange: '',
            comparedValue: 0,
            comparedRange: '',
        },
        {
            contentName: 'Recibos',
            subcontentName: 'En Tiempo',
            description:
                'Permite identificar el número de recibos en tiempo de cobrarse.',
            totalContents: 0,
            selectedValue: 0,
            selectedRange: '',
            comparedValue: 0,
            comparedRange: '',
        },
        {
            contentName: 'Recibos',
            subcontentName: 'Atrasados',
            description:
                'Permite identificar el número de recibos con pago atrasado.',
            totalContents: 0,
            selectedValue: 0,
            selectedRange: '',
            comparedValue: 0,
            comparedRange: '',
        },
        {
            contentName: 'Recibos',
            subcontentName: 'Vencidos',
            description:
                'Permite identificar el número de recibos con pago vencido.',
            totalContents: 0,
            selectedValue: 0,
            selectedRange: '',
            comparedValue: 0,
            comparedRange: '',
        },
    ];

    constructor(private _paymentService: PaymentService) {}

    getTotalPendingPayments(): Observable<number> {
        const filters: string = UtilitiesHelper.generateHttpFilter(
            'paymentStatusId',
            [
                PAYMENT_STATUS.INTIME,
                PAYMENT_STATUS.PENDING,
                PAYMENT_STATUS.LATE,
                PAYMENT_STATUS.OVERDUE,
            ]
        );
        return this._paymentService.getTotalPayments(filters);
    }

    getIntimePayments(range: ComparisonRangeData): Observable<number[]> {
        const rangeField: string = 'paymentDate';
        const filters: string = UtilitiesHelper.generateHttpFilter(
            'paymentStatusId',
            [PAYMENT_STATUS.INTIME]
        );
        let requests: Observable<number>[] = [];
        requests.push(
            this._paymentService.getTotalPayments(
                filters,
                rangeField,
                range.selectedRangeStart,
                range.selectedRangeEnd
            )
        );
        requests.push(
            this._paymentService.getTotalPayments(
                filters,
                rangeField,
                range.comparedRangeStart,
                range.comparedRangeEnd
            )
        );
        return forkJoin(requests);
    }

    getPendingPayments(range: ComparisonRangeData): Observable<number[]> {
        const rangeField: string = 'paymentDate';
        const filters: string = UtilitiesHelper.generateHttpFilter(
            'paymentStatusId',
            [PAYMENT_STATUS.PENDING]
        );
        let requests: Observable<number>[] = [];
        requests.push(
            this._paymentService.getTotalPayments(
                filters,
                rangeField,
                range.selectedRangeStart,
                range.selectedRangeEnd
            )
        );
        requests.push(
            this._paymentService.getTotalPayments(
                filters,
                rangeField,
                range.comparedRangeStart,
                range.comparedRangeEnd
            )
        );
        return forkJoin(requests);
    }

    getLatePayments(range: ComparisonRangeData): Observable<number[]> {
        const rangeField: string = 'paymentDate';
        const filters: string = UtilitiesHelper.generateHttpFilter(
            'paymentStatusId',
            [PAYMENT_STATUS.LATE]
        );
        let requests: Observable<number>[] = [];
        requests.push(
            this._paymentService.getTotalPayments(
                filters,
                rangeField,
                range.selectedRangeStart,
                range.selectedRangeEnd
            )
        );
        requests.push(
            this._paymentService.getTotalPayments(
                filters,
                rangeField,
                range.comparedRangeStart,
                range.comparedRangeEnd
            )
        );
        return forkJoin(requests);
    }

    getOverduePayments(range: ComparisonRangeData): Observable<number[]> {
        const rangeField: string = 'paymentDate';
        const filters: string = UtilitiesHelper.generateHttpFilter(
            'paymentStatusId',
            [PAYMENT_STATUS.OVERDUE]
        );
        let requests: Observable<number>[] = [];
        requests.push(
            this._paymentService.getTotalPayments(
                filters,
                rangeField,
                range.selectedRangeStart,
                range.selectedRangeEnd
            )
        );
        requests.push(
            this._paymentService.getTotalPayments(
                filters,
                rangeField,
                range.comparedRangeStart,
                range.comparedRangeEnd
            )
        );
        return forkJoin(requests);
    }

    loadTotalPendingPayments(totalPendingPayments: number): void {
        this.channelKpis[INTIME].totalContents = totalPendingPayments;
        this.channelKpis[PENDING].totalContents = totalPendingPayments;
        this.channelKpis[LATE].totalContents = totalPendingPayments;
        this.channelKpis[OVERDUE].totalContents = totalPendingPayments;
    }

    loadIntimePayments(data: number[]): void {
        this.channelKpis[INTIME].selectedValue = data[PERIOD_STATUS.SELECTED];
        this.channelKpis[INTIME].comparedValue = data[PERIOD_STATUS.COMPARED];
    }

    loadPendingPayments(data: number[]): void {
        this.channelKpis[PENDING].selectedValue = data[PERIOD_STATUS.SELECTED];
        this.channelKpis[PENDING].comparedValue = data[PERIOD_STATUS.COMPARED];
    }

    loadLatePayments(data: number[]): void {
        this.channelKpis[LATE].selectedValue = data[PERIOD_STATUS.SELECTED];
        this.channelKpis[LATE].comparedValue = data[PERIOD_STATUS.COMPARED];
    }

    loadOverduePayments(data: number[]): void {
        this.channelKpis[OVERDUE].selectedValue = data[PERIOD_STATUS.SELECTED];
        this.channelKpis[OVERDUE].comparedValue = data[PERIOD_STATUS.COMPARED];
    }

    loadRangeDates(range: ComparisonRangeData): void {
        for (let index in this.channelKpis) {
            this.channelKpis[index].selectedRange =
                range.selectedRangeStart + ' - ' + range.selectedRangeEnd;
            this.channelKpis[index].comparedRange =
                range.comparedRangeStart + ' - ' + range.comparedRangeEnd;
        }
    }
}
