import { Injectable } from '@angular/core';
import { forkJoin, Observable } from 'rxjs';
import moment from 'moment';

import { ChartHelper } from '@helpers/chart.helper';
import { StatRangeData } from '@interfaces/stat-range-data.interface';
import { ClientService } from '@services/client.service';
import { LeadService } from '@services/lead.service';

@Injectable()
export class ChartWorkspaceLeadsVsClientsService {
    statsData: any[] = [];

    constructor(
        private _clientService: ClientService,
        private _leadService: LeadService
    ) {}

    getStats(
        rangeStart: string,
        rangeEnd: string
    ): Observable<StatRangeData[][]> {
        this.statsData = [];
        let requests: Observable<StatRangeData[]>[] = [];
        requests.push(this._getTotalGeneratedLeads(rangeStart, rangeEnd));
        requests.push(this._getTotalGeneratedClients(rangeStart, rangeEnd));
        return forkJoin(requests);
    }

    loadStatsData(stats: StatRangeData[][]): void {
        const headerData: any[] = [['', 'Prospectos', 'Clientes']];
        this.statsData = ChartHelper.generateChartDataByRanges(
            stats,
            headerData,
            false
        );
    }

    private _getTotalGeneratedClients(
        rangeStart: string,
        rangeEnd: string
    ): Observable<StatRangeData[]> {
        const rangeField: string = 'clientConversionDate';
        return this._clientService.getClientsStats(
            rangeField,
            rangeStart,
            rangeEnd
        );
    }

    private _getTotalGeneratedLeads(
        rangeStart: string,
        rangeEnd: string
    ): Observable<StatRangeData[]> {
        const rangeField: string = 'leadConversionDate';
        return this._leadService.getLeadsGeneratedStats(
            rangeField,
            rangeStart,
            rangeEnd
        );
    }
}
