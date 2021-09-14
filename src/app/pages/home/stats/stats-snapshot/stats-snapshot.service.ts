import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { UtilitiesHelper } from '@helpers/utilities.helper';
import { InsurerStat } from '@interfaces/insurer-stat.interface';
import { InsurerService } from '@services/insurer.service';

@Injectable()
export class StatsSnapshotService {
    insurersStatsData: any[] = [['ID', 'Pólizas Activas', 'Clientes', 'Clasificación', 'Prima Total']];

    constructor(private _insurerService: InsurerService) { }

    /**
     * Get the insurers Stats
     * @return The insurers stats
     */
    getInsurersStats(): Observable<InsurerStat[]> {
        return this._insurerService.getInsurersStats();
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
