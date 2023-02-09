import { Injectable } from '@angular/core';
import { forkJoin, Observable } from 'rxjs';
import * as moment from 'moment';

import { ChartHelper } from '@helpers/chart.helper';
import { StatRangeData } from '@interfaces/stat-range-data.interface';
import { ClientService } from '@services/client.service';
import { LeadService } from '@services/lead.service';

@Injectable()
export class ChartLeadsVsClientsService {
    statsData: any[] = [];
    private _rangeStart: string = (moment().subtract(6, 'days')).format('DD/MM/YYYY');
    private _rangeEnd: string = moment().format('DD/MM/YYYY');

    constructor(
        private _clientService: ClientService,
        private _leadService: LeadService
    ) { }

    getStats(): Observable<StatRangeData[][]> {
        this.statsData = [];
        let requests: Observable<StatRangeData[]>[] = [];
        requests.push(this._getTotalGeneratedLeads());
        requests.push(this._getTotalGeneratedClients());
        return forkJoin(requests);
    }

    loadStatsData(stats: StatRangeData[][]): void {
        const headerData: any[] = [['', 'Prospectos', 'Clientes']];
        this.statsData = ChartHelper.generateChartDataByRanges(stats, headerData, false);
    }

    private _getTotalGeneratedClients(): Observable<StatRangeData[]> {
        const rangeField: string = 'clientConversionDate';
        return this._clientService.getClientsStats(rangeField, this._rangeStart, this._rangeEnd);
    }

    private _getTotalGeneratedLeads(): Observable<StatRangeData[]> {
        const rangeField: string = 'leadConversionDate';
        return this._leadService.getLeadsGeneratedStats(rangeField, this._rangeStart, this._rangeEnd);
    }
}
