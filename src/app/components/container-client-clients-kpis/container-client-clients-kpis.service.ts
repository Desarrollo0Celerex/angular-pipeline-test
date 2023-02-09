import { Injectable } from '@angular/core';
import { forkJoin, Observable } from 'rxjs';

import { PERIOD_STATUS } from '@constants/global';
import { UtilitiesHelper } from '@helpers/utilities.helper';
import { KpiOne } from '@interfaces/kpi-one.interface';
import { ComparisonRangeData } from '@interfaces/comparison-range-data.interface';

import { ClientService } from '@services/client.service';
import { InsuranceService } from '@services/insurance.service';
import { InsurerService } from '@services/insurer.service';

const ACTIVE_INSURANCES: number = 0;
const ACTIVE_INSURERS: number = 1;
const TOTAL_GENERATED_CLIENTS: number = 2;
const DAILY_AVERAGE: number = 3;

@Injectable()
export class ContainerClientClientsKpisService {
    kpis: KpiOne[] = [
        {
            contentName: 'Coberturas',
            subcontentName: 'Activas',
            description: 'Permite identificar el número de ramos o tipo de seguros activos.',
            totalContents: 0,
            selectedValue: 0,
            selectedRange: '',
            comparedValue: 0,
            comparedRange: ''
        },
        {
            contentName: 'Aseguradoras',
            subcontentName: 'Activas',
            description: 'Permite identificar el número de aseguradoras activas.',
            totalContents: 0,
            selectedValue: 0,
            selectedRange: '',
            comparedValue: 0,
            comparedRange: ''
        },
        {
            contentName: 'Clientes',
            subcontentName: 'Generados',
            description: 'Permite identificar el número de clientes generados.',
            totalContents: 0,
            selectedValue: 0,
            selectedRange: '',
            comparedValue: 0,
            comparedRange: ''
        },
        {
            contentName: 'Promedio',
            subcontentName: 'Diario',
            description: 'Permite identificar el promedio de clientes generados al día.',
            totalContents: 0,
            selectedValue: 0,
            selectedRange: '',
            comparedValue: 0,
            comparedRange: ''
        },
    ];

    constructor(
        private _clientService: ClientService,
        private _insuranceService: InsuranceService,
        private _insurerService: InsurerService
    ) { }

    getTotalWorkspaceActiveInsurances(): Observable<number> {
        return this._insuranceService.getTotalActiveInsurances();
    }

    getTotalActiveInsurances(range: ComparisonRangeData): Observable<number[]> {
        const rangeField: string = 'validityStartDate';
        let requests: Observable<number>[] = [];
        requests.push(this._insuranceService.getTotalActiveInsurances(rangeField, range.selectedRangeStart, range.selectedRangeEnd));
        requests.push(this._insuranceService.getTotalActiveInsurances(rangeField, range.comparedRangeStart, range.comparedRangeEnd));
        return forkJoin(requests);
    }

    getTotalWorkspaceActiveInsurers(): Observable<number> {
        return this._insurerService.getTotalActiveInsurers();
    }

    getTotalActiveInsurers(range: ComparisonRangeData): Observable<number[]> {
        const rangeField: string = 'validityStartDate';
        let requests: Observable<number>[] = [];
        requests.push(this._insurerService.getTotalActiveInsurers(rangeField, range.selectedRangeStart, range.selectedRangeEnd));
        requests.push(this._insurerService.getTotalActiveInsurers(rangeField, range.comparedRangeStart, range.comparedRangeEnd));
        return forkJoin(requests);
    }

    getTotalWorkspaceGeneratedClients(): Observable<number> {
        const filters: string = 'clientConversionDate[!=]null';
        return this._clientService.getTotalClients(filters);
    }

    getTotalGeneratedClients(range: ComparisonRangeData): Observable<number[]> {
        const rangeField: string = 'clientConversionDate';
        let requests: Observable<number>[] = [];
        requests.push(this._clientService.getTotalClients('', rangeField, range.selectedRangeStart, range.selectedRangeEnd));
        requests.push(this._clientService.getTotalClients('', rangeField, range.comparedRangeStart, range.comparedRangeEnd));
        return forkJoin(requests);
    }

    loadTotalActiveInsurances(totals: number[]) {
        this.kpis[ACTIVE_INSURANCES].selectedValue = totals[PERIOD_STATUS.SELECTED];
        this.kpis[ACTIVE_INSURANCES].comparedValue = totals[PERIOD_STATUS.COMPARED];
    }

    loadTotalWorkspaceActiveInsurances(total: number): void {
        this.kpis[ACTIVE_INSURANCES].totalContents = total;
    }

    loadTotalActiveInsurers(totals: number[]) {
        this.kpis[ACTIVE_INSURERS].selectedValue = totals[PERIOD_STATUS.SELECTED];
        this.kpis[ACTIVE_INSURERS].comparedValue = totals[PERIOD_STATUS.COMPARED];
    }

    loadTotalWorkspaceActiveInsurers(total: number): void {
        this.kpis[ACTIVE_INSURERS].totalContents = total;
    }

    loadTotalGeneratedClients(totals: number[]): void {
        this.kpis[TOTAL_GENERATED_CLIENTS].selectedValue = totals[PERIOD_STATUS.SELECTED];
        this.kpis[TOTAL_GENERATED_CLIENTS].comparedValue = totals[PERIOD_STATUS.COMPARED];
    }

    loadTotalWorkspaceGeneratedClients(total: number): void {
        this.kpis[TOTAL_GENERATED_CLIENTS].totalContents = total;
        this.kpis[DAILY_AVERAGE].totalContents = total;
    }

    loadDailyAverage(data: number[], range: ComparisonRangeData): void {
        const selectedDays: number = UtilitiesHelper.getRangeDays(range.selectedRangeStart, range.selectedRangeEnd);
        const comparedDays: number = UtilitiesHelper.getRangeDays(range.comparedRangeStart, range.comparedRangeEnd);
        this.kpis[DAILY_AVERAGE].selectedValue = data[PERIOD_STATUS.SELECTED] / selectedDays;
        this.kpis[DAILY_AVERAGE].comparedValue = data[PERIOD_STATUS.COMPARED] / comparedDays;
    }

    loadRangeDates(range: ComparisonRangeData): void {
        for (let index in this.kpis) {
            this.kpis[index].selectedRange = range.selectedRangeStart + ' - ' + range.selectedRangeEnd;
            this.kpis[index].comparedRange = range.comparedRangeStart + ' - ' + range.comparedRangeEnd;
        }
    }
}
