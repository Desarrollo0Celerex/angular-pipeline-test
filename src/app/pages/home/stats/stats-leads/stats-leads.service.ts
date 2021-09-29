import { Injectable } from '@angular/core';
import { forkJoin, Observable } from 'rxjs';
import * as moment from 'moment';

import { PERIODS, LEAD_STATUS } from '@constants/global';
import { UtilitiesHelper } from '@helpers/utilities.helper';
import { ContactSourceStat } from '@interfaces/contact-source-stat.interface';
import { LeadGeneratedStat } from '@interfaces/lead-generated-stat.interface';
import { QuotationStat } from '@interfaces/quotation-stat.interfaces';
import { StatsPeriodData } from '@interfaces/stats-period-data.interface';
import { ContactSourceService } from '@services/contact-source.service';
import { LeadService } from '@services/lead.service';
import { QuotationService } from '@services/quotation.service';

@Injectable()
export class StatsLeadsService {
    quotationsStatsData: any[] = [];
    leadsGeneratedStatsData: any[] = [];
    contactSourcesStatsData: any[] = [];

    constructor(
        private _contactSourceService: ContactSourceService,
        private _leadService: LeadService,
        private _quotationService: QuotationService
    ) { }

    getLeadsGeneratedStats(statsPeriodData: StatsPeriodData): Observable<LeadGeneratedStat[][]> {
        this.leadsGeneratedStatsData = [['Prospectos', 'Periodo Seleccionado', 'Periodo Comparación']];
        const rangeField: string = 'leadConversionDate';
        const periodSelectedRangeStart: string = statsPeriodData.startDate;
        const periodSelectedRangeEnd: string = statsPeriodData.endDate;
        const startDateAux: any = moment(statsPeriodData.startDate, 'DD/MM/YYYY');
        const endDateAux: any = moment(statsPeriodData.endDate, 'DD/MM/YYYY');
        const periodComparisonRangeStart: string = ((statsPeriodData.periodId == PERIODS.LAST_YEAR) ? startDateAux.subtract(1, 'years') : startDateAux.subtract(1, 'months')).format('DD/MM/YYYY');
        const periodComparisonRangeEnd: string = ((statsPeriodData.periodId == PERIODS.LAST_YEAR) ?  endDateAux.subtract(1, 'years') : endDateAux.subtract(1, 'months')).format('DD/MM/YYYY');
        let requests: Observable<LeadGeneratedStat[]>[] = [];
        requests.push(this._leadService.getLeadsGeneratedStats(rangeField, periodSelectedRangeStart, periodSelectedRangeEnd));
        requests.push(this._leadService.getLeadsGeneratedStats(rangeField, periodComparisonRangeStart, periodComparisonRangeEnd));
        return forkJoin(requests);
    }

    getContactSourcesStats(statsPeriodData: StatsPeriodData): Observable<ContactSourceStat[][]> {
        this.contactSourcesStatsData = [['Canal', 'Periodo Seleccionado', 'Periodo Comparación']];
        const rangeField: string = 'leadConversionDate';
        const periodSelectedRangeStart: string = statsPeriodData.startDate;
        const periodSelectedRangeEnd: string = statsPeriodData.endDate;
        const startDateAux: any = moment(statsPeriodData.startDate, 'DD/MM/YYYY');
        const endDateAux: any = moment(statsPeriodData.endDate, 'DD/MM/YYYY');
        const periodComparisonRangeStart: string = ((statsPeriodData.periodId == PERIODS.LAST_YEAR) ? startDateAux.subtract(1, 'years') : startDateAux.subtract(1, 'months')).format('DD/MM/YYYY');
        const periodComparisonRangeEnd: string = ((statsPeriodData.periodId == PERIODS.LAST_YEAR) ?  endDateAux.subtract(1, 'years') : endDateAux.subtract(1, 'months')).format('DD/MM/YYYY');
        let requests: Observable<ContactSourceStat[]>[] = [];
        requests.push(this._contactSourceService.getContactSourcesStatsLeads(rangeField, periodSelectedRangeStart, periodSelectedRangeEnd));
        requests.push(this._contactSourceService.getContactSourcesStatsLeads(rangeField, periodComparisonRangeStart, periodComparisonRangeEnd));
        return forkJoin(requests);
    }

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

    loadLeadsGeneratedStatsData(leadsGeneratedStats: LeadGeneratedStat[][]): void {
        for (let index in leadsGeneratedStats[0]) {
            this.leadsGeneratedStatsData.push([]);
        }
        const totalResponses: number = leadsGeneratedStats.length;
        for (let index in leadsGeneratedStats[0]) {
            let title: string = '';
            for(let i=0; i<totalResponses; i++) {
                if(typeof leadsGeneratedStats[i][index] != 'undefined') {
                    title += `(${leadsGeneratedStats[i][index].rangeStart} - ${leadsGeneratedStats[i][index].rangeEnd}) vs `;
                }
            }
            title = title.substring(0, title.length - 4);
            this.leadsGeneratedStatsData[parseInt(index) + 1].push(title);
            for(let i=0; i<totalResponses; i++) {
                if(typeof leadsGeneratedStats[i][index] != 'undefined') {
                    this.leadsGeneratedStatsData[parseInt(index) + 1].push(leadsGeneratedStats[i][index].totalLeads);
                } else {
                    this.leadsGeneratedStatsData[parseInt(index) + 1].push(0);
                }
            }
        }
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
                    title += `(${quotationsStats[i][index].rangeStart} - ${quotationsStats[i][index].rangeEnd}) vs `;
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
}
