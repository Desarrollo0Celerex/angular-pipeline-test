import { Injectable } from '@angular/core';

import { ROUTES_NAME } from '@constants/routes-name';
import { LEAD_STATUS, CLIENT_STATUS, SINISTER_STATUS } from '@constants/global';
import { UtilitiesHelper } from '@helpers/utilities.helper';
import { ContentKpi } from '@interfaces/content-kpi.interface';
import { LeadService } from '@services/lead.service';
import { ClientService } from '@services/client.service';
import { SinisterService } from '@services/sinister.service';

import * as moment from 'moment';

@Injectable()
export class StatsService {
    contentKpis: ContentKpi[] = [
        {
            contentName: 'Prospectos',
            subcontentName: 'Activos',
            link: ROUTES_NAME.listLeads,
            value: '0',
            subValue: '0',
            subValueLabel: 'Este Mes',
            icon: 'mdi mdi-account-convert',
            iconBackgound: 'bg-success-gradient'
        },
        {
            contentName: 'Clientes',
            subcontentName: 'Activos',
            link: ROUTES_NAME.listClients,
            value: '0',
            subValue: '0',
            subValueLabel: 'Este Mes',
            icon: 'mdi mdi-account-switch',
            iconBackgound: 'bg-info-gradient'
        },
        {
            contentName: 'Recibos',
            subcontentName: 'Activos',
            link: ROUTES_NAME.listLeads,
            value: '0',
            subValue: '0',
            subValueLabel: 'Este Mes',
            icon: 'zmdi zmdi-collection-text mt-3',
            iconBackgound: 'bg-warning-gradient'
        },
        {
            contentName: 'Siniestros',
            subcontentName: 'Activos',
            link: ROUTES_NAME.listLeads,
            value: '0',
            subValue: '0',
            subValueLabel: 'Este Mes',
            icon: 'zmdi zmdi-assignment-alert mt-3',
            iconBackgound: 'bg-danger-gradient'
        }
    ]

    constructor(
        private _leadService: LeadService,
        private _clientService: ClientService,
        private _sinisterService: SinisterService,
    ) { }

    loadTotalActiveLeads(): void {
        const filters: string = UtilitiesHelper.generateHttpFilter('leadStatusId', [LEAD_STATUS.NEW, LEAD_STATUS.RECURRENT, LEAD_STATUS.RECOVERED])
        this._leadService.getTotalLeadsAux(filters).subscribe((totalLeads: number) => {
            this.contentKpis[0].value = totalLeads.toString();
        })
    }

    loadTotalActiveClients(): void {
        const filters: string = UtilitiesHelper.generateHttpFilter('clientStatusId', [CLIENT_STATUS.OCCASIONAL, CLIENT_STATUS.FREQUENT, CLIENT_STATUS.INFLUENTIAL])
        this._clientService.getTotalClientsAux(filters).subscribe((totalClients: number) => {
            this.contentKpis[1].value = totalClients.toString();
        })
    }

    loadTotalActiveSinisters(): void {
        const filters: string = UtilitiesHelper.generateHttpFilter('sinisterStatusId', [SINISTER_STATUS.RECENT, SINISTER_STATUS.PENDING, SINISTER_STATUS.UNFINISHED, SINISTER_STATUS.CONFLICTIVE])
        this._sinisterService.getTotalWorkspaceSinisters(filters).subscribe((totalSinisters: number) => {
            this.contentKpis[3].value = totalSinisters.toString();
        })
    }

    loadLatestTotalActiveSinisters(): void {
        const filters: string = UtilitiesHelper.generateHttpFilter('sinisterStatusId', [SINISTER_STATUS.RECENT, SINISTER_STATUS.PENDING, SINISTER_STATUS.UNFINISHED, SINISTER_STATUS.CONFLICTIVE])
        const rangeField: string = 'sinisterDate';
        const rangeStart: string = moment().subtract(1, 'months').format('DD/MM/YYYY');
        const rangeEnd: string = moment().format('DD/MM/YYYY');
        this._sinisterService.getTotalWorkspaceSinisters(filters, rangeField, rangeStart, rangeEnd).subscribe((totalSinisters: number) => {
            this.contentKpis[3].subValue = totalSinisters.toString();
        })
    }
}
