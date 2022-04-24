import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';

import { HttpResponse } from '@interfaces/http-response.interface';
import { StatisticService } from '@services/statistic.service';

@Injectable()
export class ChartPolicySinistersBehaviorService {
    policySinisterBehaviorStatistics: any = null;

    constructor(private _statisticService: StatisticService) { }

    loadPolicySinisterBehaviorStatistics(contactId: string, policyId: string): Observable<void> {
        return this._statisticService.getPolicySinisterBehaviorStatistics(contactId, policyId).pipe(
            tap((res: HttpResponse) => {
                const statistics: any[] = [];
                for(let statistic of res.data) {
                    statistics.push([
                        statistic[0],
                        statistic[1],
                        new Date(statistic[2].year, statistic[2].month, statistic[2].day),
                        new Date(statistic[3].year, statistic[3].month, statistic[3].day)
                    ]
                    );
                }
                this.policySinisterBehaviorStatistics = statistics;
            }),
            map(() => { })
        )
    }
}
