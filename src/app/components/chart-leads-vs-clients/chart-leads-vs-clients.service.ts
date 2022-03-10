import { Injectable } from '@angular/core';
import { forkJoin, Observable } from 'rxjs';
import * as moment from 'moment';

import { ChartHelper } from '@helpers/chart.helper';
import { RangeStat } from '@interfaces/range-stat.interface';
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

    getStats(): Observable<RangeStat[][]> {
        this.statsData = [];
        let requests: Observable<RangeStat[]>[] = [];
        requests.push(this._getTotalGeneratedLeads());
        requests.push(this._getTotalGeneratedClients());
        return forkJoin(requests);
    }

    loadStatsData(stats: RangeStat[][]): void {
        const headerData: any[] = [['', 'Prospectos', 'Clientes']];
        this.statsData = ChartHelper.generateChartDataByRanges(stats, headerData, false);
    }

    private _getTotalGeneratedClients(): Observable<RangeStat[]> {
        const rangeField: string = 'clientConversionDate';
        return this._clientService.getClientsStats(rangeField, this._rangeStart, this._rangeEnd);
    }

    private _getTotalGeneratedLeads(): Observable<RangeStat[]> {
        const rangeField: string = 'leadConversionDate';
        return this._leadService.getLeadsGeneratedStats(rangeField, this._rangeStart, this._rangeEnd);
    }
}
