import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { LEAD_STATUS } from '@constants/global';
import { ROUTES_NAME } from '@constants/routes-name';
import { UtilitiesHelper } from '@helpers/utilities.helper';
import { ContentKpi } from '@interfaces/content-kpi.interface';
import { LeadService } from '@services/lead.service';

@Injectable()
export class LeadsService {
    leadKpis: ContentKpi[] = [
        {
            contentName: 'Prospectos',
            subcontentName: 'Nuevos',
            link: ROUTES_NAME.listLeads,
            value: '0',
            subValue: '0',
            subValueLabel: 'Sobre el Total',
            icon: 'mdi mdi-account-plus',
            iconBackgound: 'bg-success-gradient'
        },
        {
            contentName: 'Prospectos',
            subcontentName: 'Recurrentes',
            link: ROUTES_NAME.listLeads,
            value: '0',
            subValue: '0',
            subValueLabel: 'Sobre el Total',
            icon: 'mdi mdi-account-check',
            iconBackgound: 'bg-info-gradient'
        },
        {
            contentName: 'Prospectos',
            subcontentName: 'Recuperados',
            link: ROUTES_NAME.listLeads,
            value: '0',
            subValue: '0',
            subValueLabel: 'Sobre el Total',
            icon: 'mdi mdi-account-convert',
            iconBackgound: 'bg-warning-gradient'
        },
        {
            contentName: 'Prospectos',
            subcontentName: 'Descartados',
            link: ROUTES_NAME.listLeads,
            value: '0',
            subValue: '0',
            subValueLabel: 'Sobre el Total',
            icon: 'mdi mdi-account-remove',
            iconBackgound: 'bg-danger-gradient'
        }
    ];

    constructor(private _leadService: LeadService) { }

    getTotalLeads(): Observable<number> {
        const filters: string = UtilitiesHelper.generateHttpFilter('leadStatusId', [LEAD_STATUS.NEW, LEAD_STATUS.RECURRENT, LEAD_STATUS.RECOVERED, LEAD_STATUS.DISCARDED])
        return this._leadService.getTotalLeads(filters);
    }
}
