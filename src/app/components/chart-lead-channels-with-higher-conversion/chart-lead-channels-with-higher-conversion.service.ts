import { Injectable } from '@angular/core';
import { forkJoin, Observable } from 'rxjs';

import { QUOTATION_STATUS } from '@constants/global';
import { UtilitiesHelper } from '@helpers/utilities.helper';
import { RangeData } from '@interfaces/range-data.interface';
import { Stat } from '@interfaces/stat.interface';
import { QuotationService } from '@services/quotation.service';

@Injectable()
export class ChartLeadChannelsWithHigherConversionService {
    contactSourcesQuotationsStatsData: any[] = [];

    constructor(private _quotationService: QuotationService) { }

    getContactSourcesQuotationsStats(range: RangeData): Observable<Stat[][]> {
        this.contactSourcesQuotationsStatsData = [];
        const filters: string = UtilitiesHelper.generateHttpFilter('quotationStatusId', [QUOTATION_STATUS.ACCEPTED]);
        const rangeField: string = 'closedAt';
        let requests: Observable<Stat[]>[] = [];
        requests.push(this._quotationService.getContactSourcesQuotationsStats(filters, rangeField, range.selectedRangeStart, range.selectedRangeEnd));
        requests.push(this._quotationService.getContactSourcesQuotationsStats(filters, rangeField, range.comparedRangeStart, range.comparedRangeEnd));
        return forkJoin(requests);
    }

    loadContactSourcesQuotationsStatsData(contactSourcesQuotationsStats: Stat[][]): void {
        let data: any[] = [];
        for (let contactSourceStats of contactSourcesQuotationsStats[0]) {
                data.push([contactSourceStats.name]);
        }
        for (let index in contactSourcesQuotationsStats[0]) {
            for (let contactSourceStats of contactSourcesQuotationsStats) {
                data[parseInt(index)].push(contactSourceStats[index].value);
            }
        }
        this.contactSourcesQuotationsStatsData = this._calculateTop3(data);
        this.contactSourcesQuotationsStatsData.unshift(['Canales', 'Periodo Seleccionado', 'Periodo Comparación']);
    }

    private _calculateTop3(data: any[]): any[] {
        data.sort((a, b) => {
            return b[1] - a[1];
        });
        return data.slice(0, 3);
    }
}
