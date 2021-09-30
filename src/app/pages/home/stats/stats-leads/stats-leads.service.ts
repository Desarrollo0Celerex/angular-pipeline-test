import { Injectable } from '@angular/core';
import { forkJoin, Observable } from 'rxjs';
import * as moment from 'moment';

import { PERIODS, CONTACT_SOURCE_TYPES } from '@constants/global';
import { ChartHelper } from '@helpers/chart.helper';
import { ContactSourceStat } from '@interfaces/contact-source-stat.interface';
import { KpiOne } from '@interfaces/kpi-one.interface';
import { RangeStat } from '@interfaces/range-stat.interface';
import { Stat } from '@interfaces/stat.interface';
import { StatsPeriodData } from '@interfaces/stats-period-data.interface';
import { ContactSourceService } from '@services/contact-source.service';
import { ContactSourceTypeService } from '@services/contact-source-type.service';
import { LeadService } from '@services/lead.service';
import { QuotationService } from '@services/quotation.service';

const SELECTED_PERIOD: number = 0;
const COMPARED_PERIOD: number = 1;
const ACTIVE_CHANNELS: number = 0;
const ACTIVE_PARTNERS: number = 1;
const TOTAL_GENERATED_LEADS: number = 2;
const DAILY_AVERAGE: number = 3;

@Injectable()
export class StatsLeadsService {
    selectedPeriodRangeStart: string = '';
    selectedPeriodRangeEnd: string = '';
    comparedPeriodRangeStart: string = '';
    comparedPeriodRangeEnd: string = '';
    quotationsStatsData: any[] = [];
    leadsGeneratedStatsData: any[] = [];
    contactSourcesStatsData: any[] = [];
    channelKpis: KpiOne[] = [
        {
            contentName: 'Canales',
            subcontentName: 'Activos',
            description: 'Permite identificar el número de canales activos.',
            totalContents: 0,
            selectedValue: 0,
            selectedRange: '',
            comparedValue: 0,
            comparedRange: ''
        },
        {
            contentName: 'Socios',
            subcontentName: 'Activos',
            description: 'Permite identificar el número de socios comerciales activos.',
            totalContents: 0,
            selectedValue: 0,
            selectedRange: '',
            comparedValue: 0,
            comparedRange: ''
        },
        {
            contentName: 'Prospectos',
            subcontentName: 'Generados',
            description: 'Permite identificar el número de prospectos generados.',
            totalContents: 0,
            selectedValue: 0,
            selectedRange: '',
            comparedValue: 0,
            comparedRange: ''
        },
        {
            contentName: 'Promedio',
            subcontentName: 'Diario',
            description: 'Permite identificar el promedio de prospectos generados al día.',
            totalContents: 0,
            selectedValue: 0,
            selectedRange: '',
            comparedValue: 0,
            comparedRange: ''
        },
    ];

    constructor(
        private _contactSourceService: ContactSourceService,
        private _contactSourceTypeService: ContactSourceTypeService,
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
        this._loadRangeDates();
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
        requests.push(this._contactSourceService.getContactSourcesStats('', rangeField, this.selectedPeriodRangeStart, this.selectedPeriodRangeEnd));
        requests.push(this._contactSourceService.getContactSourcesStats('', rangeField, this.comparedPeriodRangeStart, this.comparedPeriodRangeEnd));
        return forkJoin(requests);
    }

    getPartners(): Observable<Stat[][]> {
        const contactSourceId: number = CONTACT_SOURCE_TYPES.PARTNERS;
        const rangeField: string = 'leadConversionDate';
        let requests: Observable<Stat[]>[] = [];
        requests.push(this._contactSourceTypeService.getContactSourceTypesStats(contactSourceId, rangeField, this.selectedPeriodRangeStart, this.selectedPeriodRangeEnd));
        requests.push(this._contactSourceTypeService.getContactSourceTypesStats(contactSourceId, rangeField, this.comparedPeriodRangeStart, this.comparedPeriodRangeEnd));
        return forkJoin(requests);
    }

    getTotalGeneratedLeads(): Observable<number[]> {
        const rangeField: string = 'leadConversionDate';
        let requests: Observable<number>[] = [];
        requests.push(this._leadService.getTotalLeads('', rangeField, this.selectedPeriodRangeStart, this.selectedPeriodRangeEnd));
        requests.push(this._leadService.getTotalLeads('', rangeField, this.comparedPeriodRangeStart, this.comparedPeriodRangeEnd));
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

    loadActiveChannelsData(stats: ContactSourceStat[][]): void {
        // Selected content
        let totalActiveChannels: number = 0;
        let acquisitionChannels: ContactSourceStat[] = stats[SELECTED_PERIOD];
        this.channelKpis[ACTIVE_CHANNELS].totalContents = acquisitionChannels.length;
        for (let acquisitionChannel of acquisitionChannels) {
            if(acquisitionChannel.totalContacts > 0) {
                totalActiveChannels++;
            }
        }
        this.channelKpis[ACTIVE_CHANNELS].selectedValue = totalActiveChannels;

        // Compared content
        totalActiveChannels = 0;
        acquisitionChannels = stats[COMPARED_PERIOD];
        for (let acquisitionChannel of acquisitionChannels) {
            if(acquisitionChannel.totalContacts > 0) {
                totalActiveChannels++;
            }
        }
        this.channelKpis[ACTIVE_CHANNELS].comparedValue = totalActiveChannels;
    }

    loadActivePartnersData(stats: Stat[][]): void {
        // Selected content
        let totalActivePartners: number = 0;
        let partnerStats: Stat[] = stats[SELECTED_PERIOD];
        this.channelKpis[ACTIVE_PARTNERS].totalContents = partnerStats.length;
        for (let partnerStat of partnerStats) {
            if(partnerStat.value > 0) {
                totalActivePartners++;
            }
        }
        this.channelKpis[ACTIVE_PARTNERS].selectedValue = totalActivePartners;

        // Compared content
        totalActivePartners = 0;
        partnerStats = stats[COMPARED_PERIOD];
        for (let partnerStat of partnerStats) {
            if(partnerStat.value > 0) {
                totalActivePartners++;
            }
        }
        this.channelKpis[ACTIVE_PARTNERS].comparedValue = totalActivePartners;
    }

    loadTotalGeneratedLeads(data: number[]): void {
        this.channelKpis[TOTAL_GENERATED_LEADS].selectedValue = data[SELECTED_PERIOD];
        this.channelKpis[TOTAL_GENERATED_LEADS].comparedValue = data[COMPARED_PERIOD];
    }

    loadDailyAverage(data: number[]): void {
        const selectedStartDate: any = moment(this.selectedPeriodRangeStart, 'DD/MM/YYYY');
        const selectedEndDate: any = moment(this.selectedPeriodRangeEnd, 'DD/MM/YYYY');
        const selectedDays: number = selectedEndDate.diff(selectedStartDate, 'days') + 1;
        const comparedStartDate: any = moment(this.comparedPeriodRangeStart, 'DD/MM/YYYY');
        const comparedEndDate: any = moment(this.comparedPeriodRangeEnd, 'DD/MM/YYYY');
        const comparedDays: number = comparedEndDate.diff(comparedStartDate, 'days') + 1;
        this.channelKpis[DAILY_AVERAGE].selectedValue = data[SELECTED_PERIOD] / selectedDays;
        this.channelKpis[DAILY_AVERAGE].comparedValue = data[COMPARED_PERIOD] / comparedDays;
    }

    loadQuotationsStatsData(quotationsStats: RangeStat[][]): void {
        const headerData: any[] = [['Cotizaciones', 'Periodo Seleccionado', 'Periodo Comparación']];
        this.quotationsStatsData = ChartHelper.generateChartDataByRanges(quotationsStats, headerData);
    }

    private _loadRangeDates(): void {
        for (let index in this.channelKpis) {
            this.channelKpis[index].selectedRange = this.selectedPeriodRangeStart + ' - ' + this.selectedPeriodRangeEnd;
            this.channelKpis[index].comparedRange = this.comparedPeriodRangeStart + ' - ' + this.comparedPeriodRangeEnd;
        }
    }

}
