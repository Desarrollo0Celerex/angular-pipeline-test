import { Injectable } from '@angular/core';
import { forkJoin, Observable } from 'rxjs';

import { CONTACT_SOURCE_TYPES, PERIOD_STATUS } from '@constants/global';
import { UtilitiesHelper } from '@helpers/utilities.helper';
import { KpiOne } from '@interfaces/kpi-one.interface';
import { ComparisonRangeData } from '@interfaces/comparison-range-data.interface';
import { Stat } from '@interfaces/stat.interface';

import { ContactSourceService } from '@services/contact-source.service';
import { ContactSourceTypeService } from '@services/contact-source-type.service';
import { LeadService } from '@services/lead.service';

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

    getContactSourcesStats(range: ComparisonRangeData): Observable<Stat[][]> {
        const rangeField: string = 'leadConversionDate';
        let requests: Observable<Stat[]>[] = [];
        requests.push(this._contactSourceService.getContactSourcesStats('', rangeField, range.selectedRangeStart, range.selectedRangeEnd));
        requests.push(this._contactSourceService.getContactSourcesStats('', rangeField, range.comparedRangeStart, range.comparedRangeEnd));
        return forkJoin(requests);
    }

    getPartners(range: ComparisonRangeData): Observable<Stat[][]> {
        const contactSourceId: number = CONTACT_SOURCE_TYPES.PARTNERS;
        const rangeField: string = 'leadConversionDate';
        let requests: Observable<Stat[]>[] = [];
        requests.push(this._contactSourceTypeService.getContactSourceTypesStats(contactSourceId, rangeField, range.selectedRangeStart, range.selectedRangeEnd));
        requests.push(this._contactSourceTypeService.getContactSourceTypesStats(contactSourceId, rangeField, range.comparedRangeStart, range.comparedRangeEnd));
        return forkJoin(requests);
    }

    getTotalGeneratedLeads(range: ComparisonRangeData): Observable<number[]> {
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
        let acquisitionChannels: Stat[] = stats[PERIOD_STATUS.SELECTED];
        this.channelKpis[ACTIVE_CHANNELS].totalContents = acquisitionChannels.length;
        for (let acquisitionChannel of acquisitionChannels) {
            if(acquisitionChannel.value > 0) {
                totalActiveChannels++;
            }
        }
        this.channelKpis[ACTIVE_CHANNELS].selectedValue = totalActiveChannels;

        // Compared content
        totalActiveChannels = 0;
        acquisitionChannels = stats[PERIOD_STATUS.COMPARED];
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
        let partnerStats: Stat[] = stats[PERIOD_STATUS.SELECTED];
        this.channelKpis[ACTIVE_PARTNERS].totalContents = partnerStats.length;
        for (let partnerStat of partnerStats) {
            if(partnerStat.value > 0) {
                totalActivePartners++;
            }
        }
        this.channelKpis[ACTIVE_PARTNERS].selectedValue = totalActivePartners;

        // Compared content
        totalActivePartners = 0;
        partnerStats = stats[PERIOD_STATUS.COMPARED];
        for (let partnerStat of partnerStats) {
            if(partnerStat.value > 0) {
                totalActivePartners++;
            }
        }
        this.channelKpis[ACTIVE_PARTNERS].comparedValue = totalActivePartners;
    }

    loadTotalGeneratedLeads(data: number[]): void {
        this.channelKpis[TOTAL_GENERATED_LEADS].selectedValue = data[PERIOD_STATUS.SELECTED];
        this.channelKpis[TOTAL_GENERATED_LEADS].comparedValue = data[PERIOD_STATUS.COMPARED];
    }

    loadDailyAverage(data: number[], range: ComparisonRangeData): void {
        const selectedDays: number = UtilitiesHelper.getRangeDays(range.selectedRangeStart, range.selectedRangeEnd);
        const comparedDays: number = UtilitiesHelper.getRangeDays(range.comparedRangeStart, range.comparedRangeEnd);
        this.channelKpis[DAILY_AVERAGE].selectedValue = data[PERIOD_STATUS.SELECTED] / selectedDays;
        this.channelKpis[DAILY_AVERAGE].comparedValue = data[PERIOD_STATUS.COMPARED] / comparedDays;
    }

    loadAllGeneratedLeads(totalLeads: number): void {
        this.channelKpis[TOTAL_GENERATED_LEADS].totalContents = totalLeads;
        this.channelKpis[DAILY_AVERAGE].totalContents = totalLeads;
    }

    loadRangeDates(range: ComparisonRangeData): void {
        for (let index in this.channelKpis) {
            this.channelKpis[index].selectedRange = range.selectedRangeStart + ' - ' + range.selectedRangeEnd;
            this.channelKpis[index].comparedRange = range.comparedRangeStart + ' - ' + range.comparedRangeEnd;
        }
    }
}
