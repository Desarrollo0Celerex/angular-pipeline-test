import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';

import { HttpResponse } from '@interfaces/http-response.interface';
import { StatisticService } from '@services/statistic.service';

@Injectable()
export class ChartPolicyRenewalsService {
    policyRenewalStatistics: any = null;

    constructor(private _statisticService: StatisticService) { }

    loadPolicyRenewalStatistics(contactId: string, policyId: string): Observable<void> {
        return this._statisticService.getPolicyRenewalStatistics(contactId, policyId).pipe(
            tap((res: HttpResponse) => {
                this.policyRenewalStatistics = res.data;
            }),
            map(() => { })
        )
    }
}
