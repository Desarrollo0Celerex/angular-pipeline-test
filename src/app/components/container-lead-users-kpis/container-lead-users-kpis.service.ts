import { Injectable } from '@angular/core';
import { forkJoin, Observable } from 'rxjs';

import { PERIOD_STATUS } from '@constants/global';
import { KpiTwo } from '@interfaces/kpi-two.interface';
import { RangeData } from '@interfaces/range-data.interface';
import { PartnerQuotationStat } from '@interfaces/partner-quotation-stat.interface';

import { QuotationService } from '@services/quotation.service';

@Injectable()
export class ContainerLeadUsersKpisService {
    kpis: KpiTwo[] = [];

    constructor(private _quotationService: QuotationService) { }

    getUsersQuotationsStats(range: RangeData): Observable<PartnerQuotationStat[][]> {
        const rangeField: string = 'createdAt';
        let requests: Observable<PartnerQuotationStat[]>[] = [];
        requests.push(this._quotationService.getUsersQuotationsStats(rangeField, range.selectedRangeStart, range.selectedRangeEnd));
        requests.push(this._quotationService.getUsersQuotationsStats(rangeField, range.comparedRangeStart, range.comparedRangeEnd));
        return forkJoin(requests);
    }

    loadUsersQuotationsStatsData(data: PartnerQuotationStat[][], range: RangeData): void {
        data = this._removeEmptyValues(data);
        for (let key in data[PERIOD_STATUS.SELECTED]) {
            const kpi: KpiTwo = {
                contentName: data[PERIOD_STATUS.SELECTED][key].name,
                selectedTotalGeneratedQuotations: data[PERIOD_STATUS.SELECTED][key].totalGeneratedQuotations,
                selectedTotalAcceptedQuotations: data[PERIOD_STATUS.SELECTED][key].totalAcceptedQuotations,
                selectedRange: range.selectedRangeStart + ' - ' + range.selectedRangeEnd,
                comparedTotalGeneratedQuotations: data[PERIOD_STATUS.COMPARED][key].totalGeneratedQuotations,
                comparedTotalAcceptedQuotations: data[PERIOD_STATUS.COMPARED][key].totalAcceptedQuotations,
                comparedRange: range.comparedRangeStart + ' - ' + range.comparedRangeEnd
            }
            this.kpis.push(kpi);
        }
    }

    private _removeEmptyValues(data: PartnerQuotationStat[][]): PartnerQuotationStat[][] {
        let newData : any[] = [];
        newData.push([]);
        newData.push([]);
        for (let key in data[PERIOD_STATUS.SELECTED]) {
            const stats = data[PERIOD_STATUS.SELECTED][key];
            if(stats.totalGeneratedQuotations > 0) {
                newData[PERIOD_STATUS.SELECTED].push(stats);
                newData[PERIOD_STATUS.COMPARED].push(data[PERIOD_STATUS.COMPARED][key]);
            }
        }
        return newData;
    }
}
