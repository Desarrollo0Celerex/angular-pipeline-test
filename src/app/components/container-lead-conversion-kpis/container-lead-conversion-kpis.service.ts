import { Injectable } from '@angular/core';
import { forkJoin, Observable } from 'rxjs';

import { QUOTATION_STATUS, PERIOD_STATUS } from '@constants/global';
import { UtilitiesHelper } from '@helpers/utilities.helper';
import { KpiOne } from '@interfaces/kpi-one.interface';
import { RangeData } from '@interfaces/range-data.interface';
import { Stat } from '@interfaces/stat.interface';
import { QuotationService } from '@services/quotation.service';

const CONVERSION_RATE: number = 0;
const HEIGEST_RATE: number = 1;
const LOWEST_RATE: number = 2;
const REJECTION_RATE: number = 3;

@Injectable()
export class ContainerLeadConversionKpisService {
    kpis: KpiOne[] = [
        {
            contentName: 'Rate de',
            subcontentName: 'Conversión',
            description: 'Permite identificar la efectividad en los cierres de venta.',
            totalContents: 0,
            selectedValue: 0,
            selectedRange: '',
            comparedValue: 0,
            comparedRange: '',
            isPercentage: true
        },
        {
            contentName: 'Rate más',
            subcontentName: 'Alto',
            description: 'Permite identificar el porcentaje de conversión más alto.',
            totalContents: 0,
            selectedValue: 0,
            selectedRange: '',
            comparedValue: 0,
            comparedRange: '',
            isPercentage: true
        },
        {
            contentName: 'Rate más',
            subcontentName: 'Bajo',
            description: 'Permite identificar el porcentaje de conversión más bajo.',
            totalContents: 0,
            selectedValue: 0,
            selectedRange: '',
            comparedValue: 0,
            comparedRange: '',
            isPercentage: true
        },
        {
            contentName: 'Rate de',
            subcontentName: 'Rechazo',
            description: 'Permite identificar la debilidad en los cierres de venta.',
            totalContents: 0,
            selectedValue: 0,
            selectedRange: '',
            comparedValue: 0,
            comparedRange: '',
            isPercentage: true
        },
    ];

    constructor(private _quotationService: QuotationService) { }

    resetKpis(range: RangeData): void {
        for (let index in this.kpis) {
            this.kpis[index].selectedValue = 0;
            this.kpis[index].selectedRange = range.selectedRangeStart + ' - ' + range.selectedRangeEnd;
            this.kpis[index].comparedValue = 0;
            this.kpis[index].comparedRange = range.comparedRangeStart + ' - ' + range.comparedRangeEnd;
        }
    }

    getTotalWorkspaceGeneratedQuotes(range: RangeData): Observable<number[]> {
        return this._getWorkspaceQuotes(range, '');
    }

    getTotalWorkspaceAcceptedQuotes(range: RangeData): Observable<number[]> {
        const filters: string = UtilitiesHelper.generateHttpFilter('quotationStatusId', [QUOTATION_STATUS.ACCEPTED])
        return this._getWorkspaceQuotes(range, filters);
    }

    getTotalChannelAcceptedQuotes(range: RangeData): Observable<Stat[][]> {
        const filters: string = UtilitiesHelper.generateHttpFilter('quotationStatusId', [QUOTATION_STATUS.ACCEPTED]);
        const rangeField: string = 'createdAt';
        let requests: Observable<Stat[]>[] = [];
        requests.push(this._quotationService.getContactSourcesQuotationsStats(filters, rangeField, range.selectedRangeStart, range.selectedRangeEnd));
        requests.push(this._quotationService.getContactSourcesQuotationsStats(filters, rangeField, range.comparedRangeStart, range.comparedRangeEnd));
        return forkJoin(requests);
    }

    getTotalWorkspaceRejectedQuotes(range: RangeData): Observable<number[]> {
        const filters: string = UtilitiesHelper.generateHttpFilter('quotationStatusId', [QUOTATION_STATUS.REJECTED])
        return this._getWorkspaceQuotes(range, filters);
    }

    loadConversionRate(totalQuotations: number[], acceptedQuotations: number[]): void {
        this.kpis[CONVERSION_RATE].selectedValue = (totalQuotations[PERIOD_STATUS.SELECTED] > 0) ? Math.round(acceptedQuotations[PERIOD_STATUS.SELECTED] * 100 / totalQuotations[PERIOD_STATUS.SELECTED]) : 0;
        this.kpis[CONVERSION_RATE].comparedValue = (totalQuotations[PERIOD_STATUS.COMPARED] > 0) ? Math.round(acceptedQuotations[PERIOD_STATUS.COMPARED] * 100 / totalQuotations[PERIOD_STATUS.COMPARED]) : 0;
    }

    sortAcceptedQuotesByChannel(channelAcceptedQuotes: Stat[][]): any[] {
        let data: any[] = [];
        for (let contactSourceStats of channelAcceptedQuotes[0]) {
                data.push([contactSourceStats.name]);
        }
        for (let index in channelAcceptedQuotes[0]) {
            for (let contactSourceStats of channelAcceptedQuotes) {
                data[parseInt(index)].push(contactSourceStats[index].value);
            }
        }
        data = this._removeEmptyValues(data);
        return this._sortDesending(data);
    }

    loadHighestRate(totalQuotations: number[], sortedAcceptedQuotesByChannel: any[]) {
        if(totalQuotations[PERIOD_STATUS.SELECTED] > 0 && sortedAcceptedQuotesByChannel.length > 0) {
            this.kpis[HEIGEST_RATE].selectedValue = Math.round(sortedAcceptedQuotesByChannel[0][PERIOD_STATUS.SELECTED + 1] * 100 / totalQuotations[PERIOD_STATUS.SELECTED]);
        } else {
            this.kpis[HEIGEST_RATE].selectedValue = 0;
        }
        if(totalQuotations[PERIOD_STATUS.COMPARED] > 0 && sortedAcceptedQuotesByChannel.length > 0) {
            this.kpis[HEIGEST_RATE].comparedValue = Math.round(sortedAcceptedQuotesByChannel[0][PERIOD_STATUS.COMPARED + 1] * 100 / totalQuotations[PERIOD_STATUS.COMPARED]);
        } else {
            this.kpis[HEIGEST_RATE].comparedValue = 0;
        }
    }

    loadLowestRate(totalQuotations: number[], sortedAcceptedQuotesByChannel: any[]) {
        if(totalQuotations[PERIOD_STATUS.SELECTED] > 0 && sortedAcceptedQuotesByChannel.length > 1) {
            this.kpis[LOWEST_RATE].selectedValue = Math.round(sortedAcceptedQuotesByChannel[sortedAcceptedQuotesByChannel.length - 1][PERIOD_STATUS.SELECTED + 1] * 100 / totalQuotations[PERIOD_STATUS.SELECTED]);
        } else {
            this.kpis[LOWEST_RATE].selectedValue = 0;
        }
        if(totalQuotations[PERIOD_STATUS.COMPARED] > 0 && sortedAcceptedQuotesByChannel.length > 1) {
            this.kpis[LOWEST_RATE].comparedValue = Math.round(sortedAcceptedQuotesByChannel[sortedAcceptedQuotesByChannel.length - 1][PERIOD_STATUS.COMPARED + 1] * 100 / totalQuotations[PERIOD_STATUS.COMPARED]);
        } else {
            this.kpis[LOWEST_RATE].comparedValue = 0;
        }
    }

    loadRejectionRate(totalQuotations: number[], rejectedQuotations: number[]): void {
        this.kpis[REJECTION_RATE].selectedValue = (totalQuotations[PERIOD_STATUS.SELECTED] > 0) ? Math.round(rejectedQuotations[PERIOD_STATUS.SELECTED] * 100 / totalQuotations[PERIOD_STATUS.SELECTED]) : 0;
        this.kpis[REJECTION_RATE].comparedValue = (totalQuotations[PERIOD_STATUS.COMPARED] > 0) ? Math.round(rejectedQuotations[PERIOD_STATUS.COMPARED] * 100 / totalQuotations[PERIOD_STATUS.COMPARED]) : 0;
    }

    private _getWorkspaceQuotes(range: RangeData, filters: string = ''): Observable<number[]> {
        const rangeField: string = 'createdAt';
        let requests: Observable<number>[] = [];
        requests.push(this._quotationService.getTotalWorkspaceQuotations(filters, rangeField, range.selectedRangeStart, range.selectedRangeEnd));
        requests.push(this._quotationService.getTotalWorkspaceQuotations(filters, rangeField, range.comparedRangeStart, range.comparedRangeEnd));
        return forkJoin(requests);
    }

    private _removeEmptyValues(data: any[]): any[] {
        let newData: any[] = [];
        for (let stat of data) {
            if(stat[1] > 0) {
                newData.push(stat);
            }
        }
        return newData;
    }

    private _sortDesending(data: any[]): any[] {
        data.sort((a, b) => {
            return b[1] - a[1];
        });
        return data;
    }
}
