import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';

import { HttpResponse } from '@interfaces/http-response.interface';
import { StatisticService } from '@services/statistic.service';

@Injectable()
export class ChartPolicyPaymentsBehaviorService {
    policyPaymentBehaviorStatistics: any = null;

    constructor(private _statisticService: StatisticService) { }

    loadPolicyPaymentBehaviorStatistics(contactId: string, policyId: string, paymentId: string): Observable<void> {
        return this._statisticService.getPolicyPaymentBehaviorStatistics(contactId, policyId, paymentId).pipe(
            tap((res: HttpResponse) => {
                this.policyPaymentBehaviorStatistics = res.data;
            }),
            map(() => { })
        )
    }
}
