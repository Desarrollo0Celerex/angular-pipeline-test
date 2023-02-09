import { Injectable } from '@angular/core';
import { forkJoin, Observable } from 'rxjs';

import { ChartHelper } from '@helpers/chart.helper';
import { StatRangeData } from '@interfaces/stat-range-data.interface';
import { PolicyService } from '@services/policy.service';
import { QuotationService } from '@services/quotation.service';

import * as moment from 'moment';

@Injectable()
export class ChartQuotesVsEmissionsService {
    rangeStart: string = (moment().subtract(6, 'days')).format('DD/MM/YYYY');
    rangeEnd: string = moment().format('DD/MM/YYYY');
    statsData: any[] = [];

    constructor(
        private _policyService: PolicyService,
        private _quotationService: QuotationService
    ) { }

    getStats(): Observable<StatRangeData[][]> {
        this.statsData = [];
        let requests: Observable<StatRangeData[]>[] = [];
        const rangeFieldEmissions: string = 'emissionDate';
        const rangeFieldQuotes: string = 'createdAt';
        requests.push(this._quotationService.getTotalQuotationsStats(rangeFieldQuotes, this.rangeStart, this.rangeEnd));
        requests.push(this._policyService.getTotalPoliciesStats(rangeFieldEmissions, this.rangeStart, this.rangeEnd));
        return forkJoin(requests);
    }

    loadStatsData(stats: StatRangeData[][]): void {
        const headerData: any[] = [['', 'Cotizaciones', 'Emisiones']];
        this.statsData = ChartHelper.generateChartDataByRanges(stats, headerData, false);
    }
}
