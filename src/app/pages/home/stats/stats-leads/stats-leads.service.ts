import { Injectable } from '@angular/core';
import { forkJoin, Observable } from 'rxjs';
import * as moment from 'moment';

import { PERIODS } from '@constants/global';
import { QuotationStat } from '@interfaces/quotation-stat.interfaces';
import { StatsPeriodData } from '@interfaces/stats-period-data.interface';
import { QuotationService } from '@services/quotation.service';

@Injectable()
export class StatsLeadsService {
    quotationsStatsData: any[] = [];

    constructor(private _quotationService: QuotationService) { }

    getQuotationsStats(statsPeriodData: StatsPeriodData): Observable<QuotationStat[][]> {
        this.quotationsStatsData = [['Cotizaciones', 'Periodo Seleccionado', 'Periodo Comparación']];
        const rangeField: string = 'createdAt';
        const periodSelectedRangeStart: string = statsPeriodData.startDate;
        const periodSelectedRangeEnd: string = statsPeriodData.endDate;
        const startDateAux: any = moment(statsPeriodData.startDate, 'DD/MM/YYYY');
        const endDateAux: any = moment(statsPeriodData.endDate, 'DD/MM/YYYY');
        const periodComparisonRangeStart: string = ((statsPeriodData.periodId == PERIODS.LAST_YEAR) ? startDateAux.subtract(1, 'years') : startDateAux.subtract(1, 'months')).format('DD/MM/YYYY');
        const periodComparisonRangeEnd: string = ((statsPeriodData.periodId == PERIODS.LAST_YEAR) ?  endDateAux.subtract(1, 'years') : endDateAux.subtract(1, 'months')).format('DD/MM/YYYY');
        let requests: Observable<QuotationStat[]>[] = [];
        requests.push(this._quotationService.getQuotationsStats(rangeField, periodSelectedRangeStart, periodSelectedRangeEnd));
        requests.push(this._quotationService.getQuotationsStats(rangeField, periodComparisonRangeStart, periodComparisonRangeEnd));
        return forkJoin(requests);
    }

    loadQuotationsStatsData(quotationsStats: QuotationStat[][]): void {
        for (let index in quotationsStats[0]) {
            this.quotationsStatsData.push([]);
        }
        const totalResponses: number = quotationsStats.length;
        for (let index in quotationsStats[0]) {
            let title: string = '';
            for(let i=0; i<totalResponses; i++) {
                if(typeof quotationsStats[i][index] != 'undefined') {
                    title += quotationsStats[i][index].date + ' vs ';
                }
            }
            title = title.substring(0, title.length - 4);
            this.quotationsStatsData[parseInt(index) + 1].push(title);
            for(let i=0; i<totalResponses; i++) {
                if(typeof quotationsStats[i][index] != 'undefined') {
                    this.quotationsStatsData[parseInt(index) + 1].push(quotationsStats[i][index].totalQuotations);
                } else {
                    this.quotationsStatsData[parseInt(index) + 1].push(0);
                }
            }
        }
    }
}
