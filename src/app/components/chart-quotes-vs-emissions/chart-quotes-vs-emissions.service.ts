import { Injectable } from '@angular/core';
import { forkJoin, Observable } from 'rxjs';

import { ChartHelper } from '@helpers/chart.helper';
import { RangeStat } from '@interfaces/range-stat.interface';
import { PolicyService } from '@services/policy.service';
import { QuotationService } from '@services/quotation.service';

import * as moment from 'moment';

@Injectable()
export class ChartQuotesVsEmissionsService {
    rangeStart: string = (moment().subtract(1, 'months')).add(1, 'days').format('DD/MM/YYYY');
    rangeEnd: string = moment().format('DD/MM/YYYY');
    statsData: any[] = [];

    constructor(
        private _policyService: PolicyService,
        private _quotationService: QuotationService
    ) { }

    getStats(): Observable<RangeStat[][]> {
        this.statsData = [];
        let requests: Observable<RangeStat[]>[] = [];
        const rangeFieldEmissions: string = 'emissionDate';
        const rangeFieldQuotes: string = 'createdAt';
        requests.push(this._policyService.getTotalPoliciesStats(rangeFieldEmissions, this.rangeStart, this.rangeEnd));
        requests.push(this._quotationService.getTotalQuotationsStats(rangeFieldQuotes, this.rangeStart, this.rangeEnd));
        return forkJoin(requests);
    }

    loadStatsData(stats: RangeStat[][]): void {
        const headerData: any[] = [['', 'Emisiones', 'Cancelaciones']];
        this.statsData = ChartHelper.generateChartDataByRanges(stats, headerData, false);
    }
}
