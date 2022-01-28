import { Injectable } from '@angular/core';

import { PAYMENT_STATUS } from '@constants/global';
import { UtilitiesHelper } from '@helpers/utilities.helper';
import { ContainerCharts } from '@interfaces/container-charts.interface';
import { PaymentService } from '@services/payment.service';

@Injectable()
export class ContainerChartsPendingPaymentsService {
    chartsData: ContainerCharts = this._getDefaultData();

    constructor(private _paymentService: PaymentService) { }

    loadData(rangeField: string, rangeStart: string, rangeEnd: string): void {
        this.chartsData = this._getDefaultData();
        const filters: string = UtilitiesHelper.generateHttpFilter('paymentStatusId', [PAYMENT_STATUS.INTIME, PAYMENT_STATUS.PENDING, PAYMENT_STATUS.LATE, PAYMENT_STATUS.OVERDUE]);
        const sortBy: string = 'paymentDate';
        this._paymentService.getPendingPaymentStats(filters, rangeField, rangeStart, rangeEnd, sortBy).subscribe((res: ContainerCharts) => {
            this.chartsData = res;
        });
    }

    private _getDefaultData(): ContainerCharts {
        return {
            insurers: [],
            insurances: [],
            contactTypes: []
        };
    }
}
