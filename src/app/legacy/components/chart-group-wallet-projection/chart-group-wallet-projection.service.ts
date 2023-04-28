import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { tap, map } from 'rxjs/operators';

import { HttpResponse } from '@core/interfaces/http-response.interface';
import { StatisticService } from '@services/statistic.service';

@Injectable()
export class ChartGroupWalletProjectionService {
    chartData: any = null;

    constructor(private _statisticService: StatisticService) {}

    /**
     * Load the chart data
     * @param  groupId The group ID
     * @return           The chart data
     */
    loadChartData(groupId: string): Observable<void> {
        this.chartData = null;
        return this._statisticService
            .getGroupWalletProjectionStatistics(groupId)
            .pipe(
                tap((res: HttpResponse) => {
                    this.chartData = res.data;
                }),
                map(() => {})
            );
    }
}
