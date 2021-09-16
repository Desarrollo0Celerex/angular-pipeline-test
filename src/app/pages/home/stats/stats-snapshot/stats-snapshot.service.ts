import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { LEAD_STATUS, CLIENT_STATUS } from '@constants/global';
import { UtilitiesHelper } from '@helpers/utilities.helper';

import { ContactSourceStat } from '@interfaces/contact-source-stat.interface';
import { ContactTypeStat } from '@interfaces/contact-type-stat.interface';
import { InsurerStat } from '@interfaces/insurer-stat.interface';
import { LeadStatusStat } from '@interfaces/lead-status-stat.interface';
import { HttpResponse } from '@interfaces/http-response.interface';

import { InsurerService } from '@services/insurer.service';
import { ContactSourceService } from '@services/contact-source.service';
import { LeadStatusService } from '@services/lead-status.service';
import { ContactTypeService } from '@services/contact-type.service';
import { ClientStatusService } from '@services/client-status.service';

@Injectable()
export class StatsSnapshotService {
    insurersStatsData: any[] = [['ID', 'Pólizas Activas', 'Clientes', 'Clasificación', 'Prima Total']];
    contactSourcesStatsData: any[] = [['Canal', 'Prospectos', { role: 'style' }]];
    leadStatusStatsData: any[] = [['Ramos', 'Pólizas']];
    activeClientsStatsData: any[] = [['Tipo', 'Total']];
    clientStatusStatsData: any[] = [['Estatus', 'Ocasionales', 'Frecuentes', 'Influyentes']];

    constructor(
        private _contactSourceService: ContactSourceService,
        private _insurerService: InsurerService,
        private _leadStatusService: LeadStatusService,
        private _contactTypeService: ContactTypeService,
        private _clientStatusService: ClientStatusService,
    ) { }

    /**
     * Get the active clients stats
     * @return The active clients
     */
    getActiveClientsStats(): Observable<ContactTypeStat[]> {
        const filters: string = UtilitiesHelper.generateHttpFilter('clientStatusId', [CLIENT_STATUS.OCCASIONAL, CLIENT_STATUS.FREQUENT, CLIENT_STATUS.INFLUENTIAL]);
        return this._contactTypeService.getContactTypesStats(filters);
    }

    /**
     * Get the contact sources stats
     * @return The contact sources
     */
    getContactSourcesStats(): Observable<ContactSourceStat[]> {
        const filters: string = UtilitiesHelper.generateHttpFilter('leadStatusId', [LEAD_STATUS.NEW, LEAD_STATUS.RECURRENT, LEAD_STATUS.RECOVERED]);
        return this._contactSourceService.getContactSourcesStats(filters);
    }

    /**
     * Get the insurers Stats
     * @return The insurers stats
     */
    getInsurersStats(): Observable<InsurerStat[]> {
        return this._insurerService.getInsurersStats();
    }

    /**
     * Get the lead status stats
     * @return The lead status stats
     */
    getLeadStatusStats(): Observable<LeadStatusStat[]> {
        const filters: string = UtilitiesHelper.generateHttpFilter('leadStatusId', [LEAD_STATUS.NEW, LEAD_STATUS.RECURRENT, LEAD_STATUS.RECOVERED]);
        return this._leadStatusService.getLeadStatusStats(filters);
    }

    /**
     * Get the lead status stats
     * @return The lead status stats
     */
    getClientStatusStats(): Observable<HttpResponse> {
        const filters: string = UtilitiesHelper.generateHttpFilter('clientStatusId', [CLIENT_STATUS.OCCASIONAL, CLIENT_STATUS.FREQUENT, CLIENT_STATUS.INFLUENTIAL]);
        return this._clientStatusService.getClientStatusStats(filters);
    }

    /**
     * Load the active clients stats data
     * @param ContactTypeStat The active clients stats
     */
    loadActiveClientsStatsData(activeClientsStats: ContactTypeStat[]): void {
        for (let contactSourceStats of activeClientsStats) {
            let data: any[] = [
                contactSourceStats.name,
                contactSourceStats.totalContacts,
            ];
            this.activeClientsStatsData.push(data);
        }
    }

    /**
     * Load the contact source stats data
     * @param contactSourcesStats The contact sources stats
     */
    loadContactSourcesStatsData(contactSourcesStats: ContactSourceStat[]): void {
        for (let contactSourceStats of contactSourcesStats) {
            let data: any[] = [
                contactSourceStats.name,
                contactSourceStats.totalContacts,
                'fill-color: #262258; opacity: 0.8'
            ];
            this.contactSourcesStatsData.push(data);
        }
    }

    /**
     * Load the insurers stats data
     * @param insurersStats The insurers stats
     */
    loadInsurersStatsData(insurersStats: InsurerStat[]): void {
        for (let insurerStats of insurersStats) {
            let insurerData: any[] = [
                insurerStats.shorName,
                insurerStats.totalPolicies,
                insurerStats.totalClients,
                insurerStats.category,
                UtilitiesHelper.getQuantityWithOnlyTwoDecimals(insurerStats.totalAmount)
            ];
            this.insurersStatsData.push(insurerData);
        }
    }

    /**
     * Load the lead status stats data
     * @param insurersStats The lead status stats
     */
    loadLeadStatusStatsData(leadStatusStats: LeadStatusStat[]): void {
        for (let insurerStats of leadStatusStats) {
            let data: any[] = [
                insurerStats.name + 's',
                insurerStats.totalLeads
            ];
            this.leadStatusStatsData.push(data);
        }
    }

    /**
     * Load the lead status stats data
     * @param insurersStats The lead status stats
     */
    loadClientStatusStatsData(data: any): void {
        this.clientStatusStatsData.push(data[0]);
        this.clientStatusStatsData.push(data[1]);
    }
}
