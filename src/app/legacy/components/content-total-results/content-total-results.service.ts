import { Injectable } from '@angular/core';

import { HttpResponse } from '@core/interfaces/http-response.interface';
import { PolicyService } from '@services/policy.service';

@Injectable()
export class ContentTotalResultsService {
    policyNumber: string = '';

    constructor(private _policyService: PolicyService) {}

    /**
     * Load the policy number
     * @param contactId The contact ID
     * @param policyId  The policy ID
     */
    loadPolicyNumber(contactId: string, policyId: string): void {
        const fields: string = 'policyNumber';
        this._policyService
            .getContactPolicy(contactId, policyId, fields)
            .subscribe((res: HttpResponse) => {
                this.policyNumber = res.data.policyNumber;
            });
    }
}
