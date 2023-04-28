import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { tap, map } from 'rxjs/operators';

import { PAYMENT_STATUS } from '@constants/global';
import { UtilitiesHelper } from '@helpers/utilities.helper';
import { HttpResponse } from '@interfaces/http-response.interface';
import { StatisticService } from '@services/statistic.service';

@Injectable()
export class ChartContactPaymentProgressService {
    chartData: any = null;

    constructor(private _statisticService: StatisticService) { }

    loadChartData(contactId: string, rangeStart: string, rangeEnd: string): Observable<void> {
        this.chartData = null;
        const rangeField: string = 'paymentDate';
        const filters: string = UtilitiesHelper.generateHttpFilter('paymentStatusId', [PAYMENT_STATUS.INTIME, PAYMENT_STATUS.PENDING, PAYMENT_STATUS.LATE, PAYMENT_STATUS.OVERDUE])
        return this._statisticService.getContactPaymentStatistics(contactId, filters, rangeField, rangeStart, rangeEnd).pipe(
            tap((res: HttpResponse) => {
                this.chartData = res.data;
            }),
            map(() => { })
        );
    }
}
