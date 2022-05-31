import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { POLICY_STATUS } from '@constants/global';
import { HttpResponse } from '@interfaces/http-response.interface';
import { Policy } from '@interfaces/policy.interface';
import { PolicyService } from '@services/policy.service';

@Injectable()
export class ChartGroupActiveCoveragesService {
    chartData: any[] = [];

    constructor(private _policyService: PolicyService) {}

    loadChartData(groupId: string): Observable<void> {
        this.chartData = [];
        return new Observable((observer: any) => {
            const filter: number[] = [POLICY_STATUS.ISSUED, POLICY_STATUS.CURRENT, POLICY_STATUS.SUSPENDED];
            this._policyService.getTotalGroupPolicies(groupId, filter).subscribe((res: HttpResponse) => {
                const page: number = 1;
                const perPage: number = res.data;
                const fields: string = 'insuranceName';
                const filters: number [] = [POLICY_STATUS.ISSUED, POLICY_STATUS.CURRENT, POLICY_STATUS.SUSPENDED];
                this._policyService.getGroupPolicies(groupId, page, fields, filters, '', perPage).subscribe((res: HttpResponse) => {
                    this._populateChartData(res.data.items);
                    observer.next();
                    observer.complete();
                });
            });
        });
    }

    /**
     * Populate the chart data
     * @param policies The policies to evaluate
     */
    private _populateChartData(policies: Policy[]): void {
        let activeCoverage: any = {};
        for(const policy of policies) {
            if(!!activeCoverage[policy.insuranceName]) {
                activeCoverage[policy.insuranceName] += 1;
            } else {
                activeCoverage[policy.insuranceName] = 1;
            }
        }
        for(const index in activeCoverage) {
            this.chartData.push([index, activeCoverage[index]])
        }
    }
}
