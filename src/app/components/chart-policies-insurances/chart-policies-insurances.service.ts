import { Injectable } from '@angular/core';
import { forkJoin, Observable } from 'rxjs';

import { ComparisonRangeData } from '@interfaces/comparison-range-data.interface';
import { Stat } from '@interfaces/stat.interface';
import { PolicyService } from '@services/policy.service';

@Injectable()
export class ChartPoliciesInsurancesService {
    insurancesPoliciesStatsData: any[] = [];

    constructor(private _policyService: PolicyService) { }

    getInsurancesPoliciesStats(range: ComparisonRangeData): Observable<Stat[][]> {
        this.insurancesPoliciesStatsData = [];
        const rangeField: string = 'validityStartDate';
        let requests: Observable<Stat[]>[] = [];
        requests.push(this._policyService.getInsurancesPoliciesStats('', rangeField, range.selectedRangeStart, range.selectedRangeEnd));
        requests.push(this._policyService.getInsurancesPoliciesStats('', rangeField, range.comparedRangeStart, range.comparedRangeEnd));
        return forkJoin(requests);
    }

    loadInsurancesPoliciesStatsData(insurancesPoliciesStats: Stat[][]): void {
        let data: any[] = [];
        for (let contactSourceStats of insurancesPoliciesStats[0]) {
                data.push([contactSourceStats.name]);
        }
        for (let index in insurancesPoliciesStats[0]) {
            for (let contactSourceStats of insurancesPoliciesStats) {
                data[parseInt(index)].push(contactSourceStats[index].value);
            }
        }
        this.insurancesPoliciesStatsData = this._calculateTop3(data);
        this.insurancesPoliciesStatsData.unshift(['Canales', 'Periodo Seleccionado', 'Periodo Comparación']);
    }

    private _calculateTop3(data: any[]): any[] {
        data.sort((a, b) => {
            return b[1] - a[1];
        });
        return data.slice(0, 3);
    }
}
