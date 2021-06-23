import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { POLICY_STATUS } from '@constants/global';
import { HttpResponse } from '@interfaces/http-response.interface';
import { Policy } from '@interfaces/policy.interface';
import { PolicyService } from '@services/policy.service';

@Injectable()
export class CardPreferredInsurersService {
    chartData: any[] = [];

    constructor(private _policyService: PolicyService) { }

    /**
     * Load the chart data
     * @param  contactId The contact ID
     * @return           The chart data
     */
    loadChartData(contactId: string): Observable<void> {
        return new Observable((observer: any) => {
            const filter: number[] = [POLICY_STATUS.ISSUED, POLICY_STATUS.CURRENT, POLICY_STATUS.PENDING, POLICY_STATUS.SUSPENDED];
            this._policyService.getTotalContactPolicies(contactId, filter).subscribe((res: HttpResponse) => {
                const page: number = 1;
                const perPage: number = res.data;
                const fields: string = 'insurerShortName';
                const filters: number [] = [POLICY_STATUS.ISSUED, POLICY_STATUS.CURRENT, POLICY_STATUS.PENDING, POLICY_STATUS.SUSPENDED];
                this._policyService.getContactPolicies(contactId, page, fields, filters, '', perPage).subscribe((res: HttpResponse) => {
                    this._populateChartData(res.data.items);
                    observer.next();
                    observer.complete();
                });
            })

        });
    }

    /**
     * Populate the chart data
     * @param policies The policies to evaluate
     */
    private _populateChartData(policies: Policy[]): void {
        let preferredInsurers: any = {};
        for(const policy of policies) {
            if(!!preferredInsurers[policy.insurerShortName]) {
                preferredInsurers[policy.insurerShortName] += 1;
            } else {
                preferredInsurers[policy.insurerShortName] = 1;
            }
        }
        for(const index in preferredInsurers) {
            this.chartData.push([index, preferredInsurers[index]])
        }
    }
}
