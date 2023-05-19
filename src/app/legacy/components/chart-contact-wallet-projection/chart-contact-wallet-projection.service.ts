import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { tap, map } from 'rxjs/operators';

import { HttpResponse } from '@core/interfaces/http-response.interface';
import { StatisticService } from '@services/statistic.service';

@Injectable()
export class ChartContactWalletProjectionService {
    chartData: any = null;

    constructor(private _statisticService: StatisticService) {}

    /**
     * Load the chart data
     * @param  contactId The contact ID
     * @return           The chart data
     */
    loadChartData(contactId: string): Observable<void> {
        this.chartData = null;
        return this._statisticService
            .getContactWalletProjectionStatistics(contactId)
            .pipe(
                tap((res: HttpResponse) => {
                    this.chartData = res.data;
                }),
                map(() => {})
            );
    }
}
