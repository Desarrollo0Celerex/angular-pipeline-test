import { Injectable } from '@angular/core';
import { forkJoin, Observable } from 'rxjs';
import * as moment from 'moment';

import { PERIODS } from '@constants/global';
import { ChartHelper } from '@helpers/chart.helper';
import { ContactSourceStat } from '@interfaces/contact-source-stat.interface';
import { RangeStat } from '@interfaces/range-stat.interface';
import { StatsPeriodData } from '@interfaces/stats-period-data.interface';
import { ContactSourceService } from '@services/contact-source.service';
import { LeadService } from '@services/lead.service';
import { QuotationService } from '@services/quotation.service';

@Injectable()
export class StatsLeadsService {
    selectedPeriodRangeStart: string = '';
    selectedPeriodRangeEnd: string = '';
    comparedPeriodRangeStart: string = '';
    comparedPeriodRangeEnd: string = '';
    quotationsStatsData: any[] = [];
    leadsGeneratedStatsData: any[] = [];
    contactSourcesStatsData: any[] = [];

    constructor(
        private _contactSourceService: ContactSourceService,
        private _leadService: LeadService,
        private _quotationService: QuotationService
    ) { }

    generatePeriods(statsPeriodData: StatsPeriodData): void {
        this.selectedPeriodRangeStart = statsPeriodData.startDate;
        this.selectedPeriodRangeEnd = statsPeriodData.endDate;
        const startDateAux: any = moment(statsPeriodData.startDate, 'DD/MM/YYYY');
        const endDateAux: any = moment(statsPeriodData.endDate, 'DD/MM/YYYY');
        this.comparedPeriodRangeStart = ((statsPeriodData.periodId == PERIODS.LAST_YEAR) ? startDateAux.subtract(1, 'years') : startDateAux.subtract(1, 'months')).format('DD/MM/YYYY');
        this.comparedPeriodRangeEnd = ((statsPeriodData.periodId == PERIODS.LAST_YEAR) ?  endDateAux.subtract(1, 'years') : endDateAux.subtract(1, 'months')).format('DD/MM/YYYY');
    }

    getLeadsGeneratedStats(): Observable<RangeStat[][]> {
        this.leadsGeneratedStatsData = [];
        const rangeField: string = 'leadConversionDate';
        let requests: Observable<RangeStat[]>[] = [];
        requests.push(this._leadService.getLeadsGeneratedStats(rangeField, this.selectedPeriodRangeStart, this.selectedPeriodRangeEnd));
        requests.push(this._leadService.getLeadsGeneratedStats(rangeField, this.comparedPeriodRangeStart, this.comparedPeriodRangeEnd));
        return forkJoin(requests);
    }

    getContactSourcesStats(): Observable<ContactSourceStat[][]> {
        this.contactSourcesStatsData = [['Canal', 'Periodo Seleccionado', 'Periodo Comparación']];
        const rangeField: string = 'leadConversionDate';
        let requests: Observable<ContactSourceStat[]>[] = [];
        requests.push(this._contactSourceService.getContactSourcesStatsLeads(rangeField, this.selectedPeriodRangeStart, this.selectedPeriodRangeEnd));
        requests.push(this._contactSourceService.getContactSourcesStatsLeads(rangeField, this.comparedPeriodRangeStart, this.comparedPeriodRangeEnd));
        return forkJoin(requests);
    }

    getQuotationsStats(): Observable<RangeStat[][]> {
        this.quotationsStatsData = [];
        const rangeField: string = 'createdAt';
        let requests: Observable<RangeStat[]>[] = [];
        requests.push(this._quotationService.getQuotationsStats(rangeField, this.selectedPeriodRangeStart, this.selectedPeriodRangeEnd));
        requests.push(this._quotationService.getQuotationsStats(rangeField, this.comparedPeriodRangeStart, this.comparedPeriodRangeEnd));
        return forkJoin(requests);
    }

    loadLeadsGeneratedStatsData(leadsGeneratedStats: RangeStat[][]): void {
        const headerData: any[] = [['Prospectos', 'Periodo Seleccionado', 'Periodo Comparación']];
        this.leadsGeneratedStatsData = ChartHelper.generateChartDataByRanges(leadsGeneratedStats, headerData);
    }

    loadContactSourcesStatsData(contactSourcesStats: ContactSourceStat[][]): void {
        for (let contactSourceStats of contactSourcesStats[0]) {
                this.contactSourcesStatsData.push([contactSourceStats.name]);
        }
        for (let index in contactSourcesStats[0]) {
            for (let contactSourceStats of contactSourcesStats) {
                this.contactSourcesStatsData[parseInt(index) + 1].push(contactSourceStats[index].totalContacts);
            }
        }
    }

    loadQuotationsStatsData(quotationsStats: RangeStat[][]): void {
        const headerData: any[] = [['Cotizaciones', 'Periodo Seleccionado', 'Periodo Comparación']];
        this.quotationsStatsData = ChartHelper.generateChartDataByRanges(quotationsStats, headerData);
    }


}
