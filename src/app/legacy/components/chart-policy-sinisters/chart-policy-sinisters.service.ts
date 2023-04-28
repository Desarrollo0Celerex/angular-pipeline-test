import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';

import { HttpResponse } from '@core/interfaces/http-response.interface';
import { StatisticService } from '@services/statistic.service';

@Injectable()
export class ChartPolicySinistersService {
    policySinisterStatistics: any = null;

    constructor(private _statisticService: StatisticService) {}

    loadPolicySinisterStatistics(
        contactId: string,
        policyId: string
    ): Observable<void> {
        return this._statisticService
            .getPolicySinisterStatistics(contactId, policyId)
            .pipe(
                tap((res: HttpResponse) => {
                    const statistics: any = res.data;
                    statistics[0].push({ role: 'style' });
                    statistics[1].push('color: #ec4178; opacity: 0.8');
                    statistics[2].push('color: #6c5ce8; opacity: 0.8');
                    this.policySinisterStatistics = statistics;
                }),
                map(() => {})
            );
    }
}
