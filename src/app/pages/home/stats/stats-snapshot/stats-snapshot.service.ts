import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { LEAD_STATUS } from '@constants/global';
import { UtilitiesHelper } from '@helpers/utilities.helper';

import { ContactSourceStat } from '@interfaces/contact-source-stat.interface';
import { InsurerStat } from '@interfaces/insurer-stat.interface';

import { InsurerService } from '@services/insurer.service';
import { ContactSourceService } from '@services/contact-source.service';

@Injectable()
export class StatsSnapshotService {
    insurersStatsData: any[] = [['ID', 'Pólizas Activas', 'Clientes', 'Clasificación', 'Prima Total']];
    contactSourcesStatsData: any[] = [['Canal', 'Prospectos', { role: 'style' }]];

    constructor(
        private _contactSourceService: ContactSourceService,
        private _insurerService: InsurerService
    ) { }

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
     * Load the contact source stats data
     * @param contactSourcesStats The contact sources stats
     */
    loadContactsSourceStatsData(contactSourcesStats: ContactSourceStat[]): void {
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
}
