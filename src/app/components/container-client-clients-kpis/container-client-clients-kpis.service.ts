import { Injectable } from '@angular/core';
import { forkJoin, Observable } from 'rxjs';
import * as moment from 'moment';

import { CONTACT_SOURCE_TYPES, PERIOD_STATUS } from '@constants/global';
import { KpiOne } from '@interfaces/kpi-one.interface';
import { RangeData } from '@interfaces/range-data.interface';
import { Stat } from '@interfaces/stat.interface';

import { ContactSourceService } from '@services/contact-source.service';
import { ContactSourceTypeService } from '@services/contact-source-type.service';
import { InsuranceService } from '@services/insurance.service';

const ACTIVE_ISURANCES: number = 0;
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

    constructor(private _insuranceService: InsuranceService) { }

    getTotalWorkspaceActiveInsurances(): Observable<number> {
        return this._insuranceService.getTotalActiveInsurances();
    }

    getTotalActiveInsurances(range: RangeData): Observable<number[]> {
        const rangeField: string = 'validityStartDate';
        let requests: Observable<number>[] = [];
        requests.push(this._insuranceService.getTotalActiveInsurances(rangeField, range.selectedRangeStart, range.selectedRangeEnd));
        requests.push(this._insuranceService.getTotalActiveInsurances(rangeField, range.comparedRangeStart, range.comparedRangeEnd));
        return forkJoin(requests);
    }

    loadActiveInsurances(totalActiveInsurances: number[]) {
        this.kpis[ACTIVE_ISURANCES].selectedValue = totalActiveInsurances[PERIOD_STATUS.SELECTED];
        this.kpis[ACTIVE_ISURANCES].comparedValue = totalActiveInsurances[PERIOD_STATUS.COMPARED];
    }

    loadTotalActiveInsurances(totalWorkspaceActiveInsurances: number): void {
        this.kpis[ACTIVE_ISURANCES].totalContents = totalWorkspaceActiveInsurances;
    }

    loadRangeDates(range: RangeData): void {
        for (let index in this.kpis) {
            this.kpis[index].selectedRange = range.selectedRangeStart + ' - ' + range.selectedRangeEnd;
            this.kpis[index].comparedRange = range.comparedRangeStart + ' - ' + range.comparedRangeEnd;
        }
    }
}
