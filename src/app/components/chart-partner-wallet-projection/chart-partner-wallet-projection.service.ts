import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { tap, map } from 'rxjs/operators';

import { HttpResponse } from '@interfaces/http-response.interface';
import { StatisticService } from '@services/statistic.service';

@Injectable()
export class ChartPartnerWalletProjectionService {
    chartData: any = null;

    constructor(private _statisticService: StatisticService) { }

    /**
     * Load the chart data
     * @param  partnerId The partner ID
     * @return           The chart data
     */
    loadChartData(partnerId: number): Observable<void> {
        this.chartData = null;
        return this._statisticService.getPartnerWalletProjectionStatistics(partnerId).pipe(
            tap((res: HttpResponse) => {
                this.chartData = res.data;
            }),
            map(() => { })
        );
    }
}
