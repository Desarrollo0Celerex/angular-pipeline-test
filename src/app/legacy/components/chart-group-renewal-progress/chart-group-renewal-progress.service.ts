import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { tap, map } from 'rxjs/operators';

import { POLICY_STATUS } from '@constants/global';
import { UtilitiesHelper } from '@helpers/utilities.helper';
import { HttpResponse } from '@core/interfaces/http-response.interface';
import { StatisticService } from '@services/statistic.service';

@Injectable()
export class ChartGroupRenewalProgressService {
    chartData: any = null;

    constructor(private _statisticService: StatisticService) {}

    /**
     * Load the chart data
     * @param  groupId The group ID
     * @return           The chart data
     */
    loadChartData(
        groupId: string,
        rangeStart: string,
        rangeEnd: string
    ): Observable<void> {
        this.chartData = null;
        const filters: string = UtilitiesHelper.generateHttpFilter(
            'policyStatusId',
            [
                POLICY_STATUS.ISSUED,
                POLICY_STATUS.CURRENT,
                POLICY_STATUS.PENDING,
                POLICY_STATUS.SUSPENDED,
                POLICY_STATUS.FINISHED,
            ]
        );
        const rangeField: string = 'validityEndDate';
        return this._statisticService
            .getGroupRenewalStatistics(
                groupId,
                filters,
                rangeField,
                rangeStart,
                rangeEnd
            )
            .pipe(
                tap((res: HttpResponse) => {
                    this.chartData = res.data;
                }),
                map(() => {})
            );
    }
}
