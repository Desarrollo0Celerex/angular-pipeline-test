import { Injectable } from '@angular/core';
import { forkJoin, Observable } from 'rxjs';
import * as moment from 'moment';

import { CONTACT_SOURCE_TYPES } from '@constants/global';
import { KpiOne } from '@interfaces/kpi-one.interface';
import { RangeData } from '@interfaces/range-data.interface';
import { Stat } from '@interfaces/stat.interface';

import { ContactSourceService } from '@services/contact-source.service';
import { ContactSourceTypeService } from '@services/contact-source-type.service';
import { LeadService } from '@services/lead.service';

const SELECTED_PERIOD: number = 0;
const COMPARED_PERIOD: number = 1;
const ACTIVE_CHANNELS: number = 0;
const ACTIVE_PARTNERS: number = 1;
const TOTAL_GENERATED_LEADS: number = 2;
const DAILY_AVERAGE: number = 3;

@Injectable()
export class ContainerLeadChannelsKpisService {
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
        private _leadService: LeadService
    ) { }

    getContactSourcesStats(range: RangeData): Observable<Stat[][]> {
        const rangeField: string = 'leadConversionDate';
        let requests: Observable<Stat[]>[] = [];
        requests.push(this._contactSourceService.getContactSourcesStats('', rangeField, range.selectedRangeStart, range.selectedRangeEnd));
        requests.push(this._contactSourceService.getContactSourcesStats('', rangeField, range.comparedRangeStart, range.comparedRangeEnd));
        return forkJoin(requests);
    }

    getPartners(range: RangeData): Observable<Stat[][]> {
        const contactSourceId: number = CONTACT_SOURCE_TYPES.PARTNERS;
        const rangeField: string = 'leadConversionDate';
        let requests: Observable<Stat[]>[] = [];
        requests.push(this._contactSourceTypeService.getContactSourceTypesStats(contactSourceId, rangeField, range.selectedRangeStart, range.selectedRangeEnd));
        requests.push(this._contactSourceTypeService.getContactSourceTypesStats(contactSourceId, rangeField, range.comparedRangeStart, range.comparedRangeEnd));
        return forkJoin(requests);
    }

    getTotalGeneratedLeads(range: RangeData): Observable<number[]> {
        const rangeField: string = 'leadConversionDate';
        let requests: Observable<number>[] = [];
        requests.push(this._leadService.getTotalLeads('', rangeField, range.selectedRangeStart, range.selectedRangeEnd));
        requests.push(this._leadService.getTotalLeads('', rangeField, range.comparedRangeStart, range.comparedRangeEnd));
        return forkJoin(requests);
    }


    getAllGeneratedLeads(): Observable<number> {
        const filters: string = 'leadConversionDate[!=]null';
        return this._leadService.getTotalLeads(filters);
    }

    loadActiveChannelsData(stats: Stat[][]): void {
        // Selected content
        let totalActiveChannels: number = 0;
        let acquisitionChannels: Stat[] = stats[SELECTED_PERIOD];
        this.channelKpis[ACTIVE_CHANNELS].totalContents = acquisitionChannels.length;
        for (let acquisitionChannel of acquisitionChannels) {
            if(acquisitionChannel.value > 0) {
                totalActiveChannels++;
            }
        }
        this.channelKpis[ACTIVE_CHANNELS].selectedValue = totalActiveChannels;

        // Compared content
        totalActiveChannels = 0;
        acquisitionChannels = stats[COMPARED_PERIOD];
        for (let acquisitionChannel of acquisitionChannels) {
            if(acquisitionChannel.value > 0) {
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

    loadDailyAverage(data: number[], range: RangeData): void {
        const selectedStartDate: any = moment(range.selectedRangeStart, 'DD/MM/YYYY');
        const selectedEndDate: any = moment(range.selectedRangeEnd, 'DD/MM/YYYY');
        const selectedDays: number = selectedEndDate.diff(selectedStartDate, 'days') + 1;
        const comparedStartDate: any = moment(range.comparedRangeStart, 'DD/MM/YYYY');
        const comparedEndDate: any = moment(range.comparedRangeEnd, 'DD/MM/YYYY');
        const comparedDays: number = comparedEndDate.diff(comparedStartDate, 'days') + 1;
        this.channelKpis[DAILY_AVERAGE].selectedValue = data[SELECTED_PERIOD] / selectedDays;
        this.channelKpis[DAILY_AVERAGE].comparedValue = data[COMPARED_PERIOD] / comparedDays;
    }

    loadAllGeneratedLeads(totalLeads: number): void {
        this.channelKpis[TOTAL_GENERATED_LEADS].totalContents = totalLeads;
        this.channelKpis[DAILY_AVERAGE].totalContents = totalLeads;
    }

    loadRangeDates(range: RangeData): void {
        for (let index in this.channelKpis) {
            this.channelKpis[index].selectedRange = range.selectedRangeStart + ' - ' + range.selectedRangeEnd;
            this.channelKpis[index].comparedRange = range.comparedRangeStart + ' - ' + range.comparedRangeEnd;
        }
    }
}
