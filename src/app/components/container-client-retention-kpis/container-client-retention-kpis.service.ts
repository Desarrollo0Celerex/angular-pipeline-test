import { Injectable } from '@angular/core';
import { forkJoin, Observable } from 'rxjs';

import { CLIENT_STATUS, PERIOD_STATUS } from '@constants/global';
import { UtilitiesHelper } from '@helpers/utilities.helper';
import { KpiOne } from '@interfaces/kpi-one.interface';
import { RangeData } from '@interfaces/range-data.interface';
import { ClientService } from '@services/client.service';
import { WorkspaceService } from '@services/workspace.service';

const RENTION_RATE: number = 0;
const HIGHER_RATE: number = 1;
const LOWER_RATE: number = 2;
const LOSS_RATE: number = 3;

@Injectable()
export class ContainerClientRetentionKpisService {
    kpis: KpiOne[] = [
        {
            contentName: 'Rate de',
            subcontentName: 'Retención',
            description: 'Permite identificar la efectividad en la retención de clientes.',
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
            description: 'Permite identificar el porcentaje de retención más alto.',
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
            description: 'Permite identificar el porcentaje de retención más bajo.',
            totalContents: 0,
            selectedValue: 0,
            selectedRange: '',
            comparedValue: 0,
            comparedRange: '',
            isPercentage: true
        },
        {
            contentName: 'Rate de',
            subcontentName: 'Pérdida',
            description: 'Permite identificar la debilidad en la retención de clientes.',
            totalContents: 0,
            selectedValue: 0,
            selectedRange: '',
            comparedValue: 0,
            comparedRange: '',
            isPercentage: true
        },
    ];

    constructor(
        private _clientService: ClientService,
        private _workspaceService: WorkspaceService
    ) { }

    getWorkspaceRetentionRate(range: RangeData): Observable<number[]> {
        const rangeField: string = 'createdAt';
        let requests: Observable<number>[] = [];
        requests.push(this._workspaceService.getWorkspaceRetentionRate(rangeField, range.selectedRangeStart, range.selectedRangeEnd));
        requests.push(this._workspaceService.getWorkspaceRetentionRate(rangeField, range.comparedRangeStart, range.comparedRangeEnd));
        return forkJoin(requests);
    }

    getWorkspaceHigherRetentionRate(range: RangeData): Observable<number[]> {
        const rangeField: string = 'createdAt';
        let requests: Observable<number>[] = [];
        requests.push(this._workspaceService.getWorkspaceHigherRetentionRate(rangeField, range.selectedRangeStart, range.selectedRangeEnd));
        requests.push(this._workspaceService.getWorkspaceHigherRetentionRate(rangeField, range.comparedRangeStart, range.comparedRangeEnd));
        return forkJoin(requests);
    }

    getWorkspaceLowerRetentionRate(range: RangeData): Observable<number[]> {
        const rangeField: string = 'createdAt';
        let requests: Observable<number>[] = [];
        requests.push(this._workspaceService.getWorkspaceLowerRetentionRate(rangeField, range.selectedRangeStart, range.selectedRangeEnd));
        requests.push(this._workspaceService.getWorkspaceLowerRetentionRate(rangeField, range.comparedRangeStart, range.comparedRangeEnd));
        return forkJoin(requests);
    }

    getTotalClients(): Observable<number> {
        const filters: string = UtilitiesHelper.generateHttpFilter('clientStatusId', [CLIENT_STATUS.OCCASIONAL, CLIENT_STATUS.FREQUENT, CLIENT_STATUS.INFLUENTIAL, CLIENT_STATUS.LOST])
        return this._clientService.getTotalClients(filters);
    }

    getTotalLossClients(range: RangeData): Observable<number[]> {
        const rangeField: string = 'clientLossDate';
        let requests: Observable<number>[] = [];
        requests.push(this._clientService.getTotalClients('', rangeField, range.selectedRangeStart, range.selectedRangeEnd));
        requests.push(this._clientService.getTotalClients('', rangeField, range.comparedRangeStart, range.comparedRangeEnd));
        return forkJoin(requests);
    }

    loadWorkspaceRetentionRate(data: number[]) {
        this.kpis[RENTION_RATE].selectedValue = data[PERIOD_STATUS.SELECTED];
        this.kpis[RENTION_RATE].comparedValue = data[PERIOD_STATUS.COMPARED];
        this.kpis[RENTION_RATE].totalContents = 100;
    }

    loadWorkspaceHigherRetentionRate(data: number[]) {
        this.kpis[HIGHER_RATE].selectedValue = data[PERIOD_STATUS.SELECTED];
        this.kpis[HIGHER_RATE].comparedValue = data[PERIOD_STATUS.COMPARED];
        this.kpis[HIGHER_RATE].totalContents = 100;
    }

    loadWorkspaceLowerRetentionRate(data: number[]) {
        this.kpis[LOWER_RATE].selectedValue = data[PERIOD_STATUS.SELECTED];
        this.kpis[LOWER_RATE].comparedValue = data[PERIOD_STATUS.COMPARED];
        this.kpis[LOWER_RATE].totalContents = 100;
    }

    loadTotalLossClients(totalClients: number, data: number[]) {
        this.kpis[LOSS_RATE].selectedValue = data[PERIOD_STATUS.SELECTED] * 100 / totalClients;
        this.kpis[LOSS_RATE].comparedValue = data[PERIOD_STATUS.COMPARED] * 100 / totalClients;
        this.kpis[LOSS_RATE].totalContents = 100;
    }

    loadRangeDates(range: RangeData): void {
        for (let index in this.kpis) {
            this.kpis[index].selectedRange = range.selectedRangeStart + ' - ' + range.selectedRangeEnd;
            this.kpis[index].comparedRange = range.comparedRangeStart + ' - ' + range.comparedRangeEnd;
        }
    }
}
