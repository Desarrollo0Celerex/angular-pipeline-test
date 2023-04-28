import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';

import { HttpResponse } from '@core/interfaces/http-response.interface';
import { StatisticService } from '@services/statistic.service';

@Injectable()
export class ChartPolicyEndorsementsBehaviorService {
    policyEndorsementBehaviorStatistics: any = null;

    constructor(private _statisticService: StatisticService) {}

    loadPolicyEndorsementBehaviorStatistics(
        contactId: string,
        policyId: string
    ): Observable<void> {
        return this._statisticService
            .getPolicyEndorsementBehaviorStatistics(contactId, policyId)
            .pipe(
                tap((res: HttpResponse) => {
                    this.policyEndorsementBehaviorStatistics = res.data;
                }),
                map(() => {})
            );
    }
}
