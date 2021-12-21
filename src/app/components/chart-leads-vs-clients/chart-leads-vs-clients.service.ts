import { Injectable } from '@angular/core';
import { forkJoin, Observable } from 'rxjs';

import { CLIENT_STATUS, LEAD_STATUS } from '@constants/global';
import { UtilitiesHelper } from '@helpers/utilities.helper';
import { ClientService } from '@services/client.service';
import { LeadService } from '@services/lead.service';

@Injectable()
export class ChartLeadsVsClientsService {
    statsData: any[] = [];

    constructor(
        private _clientService: ClientService,
        private _leadService: LeadService
    ) { }

    getStats(): Observable<number[]> {
        this.statsData = [];
        let requests: Observable<number>[] = [];
        requests.push(this._getTotalActiveLeads());
        requests.push(this._getTotalActiveClients());
        return forkJoin(requests);
    }

    loadStatsData(stats: number[]): void {
        const headerData: any[] = ['Estatus', 'Prospectos', 'Clientes', { role: 'annotation'} ];
        this.statsData.push(headerData);
        this.statsData.push(['', stats[0], stats[1], '']);
    }

    private _getTotalActiveClients(): Observable<number> {
        const filters = UtilitiesHelper.generateHttpFilter('clientStatusId',  [CLIENT_STATUS.OCCASIONAL, CLIENT_STATUS.FREQUENT, CLIENT_STATUS.INFLUENTIAL])
        return this._clientService.getTotalClients(filters);
    }

    private _getTotalActiveLeads(): Observable<number> {
        const filters = UtilitiesHelper.generateHttpFilter('leadStatusId', [LEAD_STATUS.NEW, LEAD_STATUS.RECURRENT, LEAD_STATUS.RECOVERED])
        return this._leadService.getTotalLeads(filters);
    }
}
