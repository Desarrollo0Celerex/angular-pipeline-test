import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';

import { HttpResponse } from '@core/interfaces/http-response.interface';
import { StatisticService } from '@services/statistic.service';

@Injectable()
export class ChartPolicyEndorsementsService {
    policyEndorsementStatistics: any = null;

    constructor(private _statisticService: StatisticService) {}

    loadPolicyEndorsementStatistics(
        contactId: string,
        policyId: string
    ): Observable<void> {
        return this._statisticService
            .getPolicyEndorsementStatistics(contactId, policyId)
            .pipe(
                tap((res: HttpResponse) => {
                    this.policyEndorsementStatistics = res.data;
                }),
                map(() => {})
            );
    }
}
