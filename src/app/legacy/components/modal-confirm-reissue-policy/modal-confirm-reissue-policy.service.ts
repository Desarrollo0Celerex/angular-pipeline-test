import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { HttpResponse } from '@core/interfaces/http-response.interface';
import { RenewContactPolicyDataSend } from '@interfaces/renew-contact-policy-data-send.interface';
import { PolicyService } from '@services/policy.service';

@Injectable()
export class ModalConfirmReissuePolicyService {
    constructor(private _policyService: PolicyService) {}

    /**
     * Reissue the policy
     * @param  contactId The contact ID
     * @param  policyId  The policy ID
     * @return           The reissued policy ID
     */
    rissuePolicy(
        contactId: string,
        policyId: string
    ): Observable<HttpResponse> {
        const requestBody: RenewContactPolicyDataSend = { contactId };
        return this._policyService.reissueContactPolicy(
            contactId,
            policyId,
            requestBody
        );
    }
}
