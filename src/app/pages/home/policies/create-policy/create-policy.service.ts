import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { CreatePolicyData } from '@interfaces/create-policy-data.interface';
import { HttpResponse } from '@interfaces/http-response.interface';
import { PolicyService } from '@services/policy.service';

@Injectable()
export class CreatePolicyService {

    constructor(private _policyService: PolicyService) { }

    /**
     * Create a policy
     * @param  contactId       The contact ID
     * @param  insuranceId     The insurance ID
     * @param  insuranceTypeId The insurance type ID
     * @return                 The created policy ID
     */
    createPolicy(contactId: string, insuranceId: number, insuranceTypeId: number): Observable<HttpResponse> {
        const requestBody: CreatePolicyData = { insuranceId, insuranceTypeId }
        return this._policyService.createPolicy(contactId, requestBody);
    }

}
