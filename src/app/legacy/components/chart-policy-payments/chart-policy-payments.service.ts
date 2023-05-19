import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';

import { HttpResponse } from '@core/interfaces/http-response.interface';
import { StatisticService } from '@services/statistic.service';

@Injectable()
export class ChartPolicyPaymentsService {
    policyPaymentStatistics: any = null;

    constructor(private _statisticService: StatisticService) {}

    loadPolicyPaymentStatistics(
        contactId: string,
        policyId: string
    ): Observable<void> {
        return this._statisticService
            .getPolicyPaymentStatistics(contactId, policyId)
            .pipe(
                tap((res: HttpResponse) => {
                    this.policyPaymentStatistics = res.data;
                }),
                map(() => {})
            );
    }
}
