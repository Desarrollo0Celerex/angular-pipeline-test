import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { HttpResponse } from '@core/interfaces/http-response.interface';
import { RenewContactPolicyDataSend } from '@interfaces/renew-contact-policy-data-send.interface';
import { PolicyService } from '@services/policy.service';

@Injectable()
export class ChangeContactService {
    constructor(private _policyService: PolicyService) {}

    /**
     * Reissue the policy
     * @param  contactId        The contact ID
     * @param  policyId         The policy ID
     * @param  createdContactId The created contact ID
     * @return                  The reissued policy ID
     */
    reissuePolicy(
        contactId: string,
        policyId: string,
        createdContactId: string
    ): Observable<HttpResponse> {
        const requestBody: RenewContactPolicyDataSend = {
            contactId: createdContactId,
        };
        return this._policyService.reissueContactPolicy(
            contactId,
            policyId,
            requestBody
        );
    }

    /**
     * Renew the policy
     * @param  contactId        The contact ID
     * @param  policyId         The policy ID
     * @param  createdContactId The created contact ID
     * @return                  The renewed policy ID
     */
    renewPolicy(
        contactId: string,
        policyId: string,
        createdContactId: string
    ): Observable<HttpResponse> {
        const requestBody: RenewContactPolicyDataSend = {
            contactId: createdContactId,
        };
        return this._policyService.renewContactPolicy(
            contactId,
            policyId,
            requestBody
        );
    }
}
