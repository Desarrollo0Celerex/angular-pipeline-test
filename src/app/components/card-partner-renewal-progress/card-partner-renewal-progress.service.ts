import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { tap, map } from 'rxjs/operators';

import { POLICY_STATUS } from '@constants/global';
import { UtilitiesHelper } from '@helpers/utilities.helper';
import { HttpResponse } from '@interfaces/http-response.interface';
import { StatisticService } from '@services/statistic.service';

@Injectable()
export class CardPartnerRenewalProgressService {
    chartData: any = null;

    constructor(private _statisticService: StatisticService) { }

    /**
     * Load the chart data
     * @param  partnerId The partner ID
     * @return           The chart data
     */
    loadChartData(partnerId: number, rangeField: string, rangeStart: string, rangeEnd: string): Observable<void> {
        this.chartData = null;
        const filters: string = UtilitiesHelper.generateHttpFilter('policyStatusId', [POLICY_STATUS.ISSUED, POLICY_STATUS.CURRENT, POLICY_STATUS.PENDING, POLICY_STATUS.SUSPENDED, POLICY_STATUS.FINISHED])
        return this._statisticService.getPartnerRenewalStatistics(partnerId, filters, rangeField, rangeStart, rangeEnd).pipe(
            tap((res: HttpResponse) => {
                this.chartData = res.data;
            }),
            map(() => { })
        );
    }
}
