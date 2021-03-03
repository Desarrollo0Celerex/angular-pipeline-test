import { Injectable } from '@angular/core';

import { HttpResponse } from '@interfaces/http-response.interface';
import { PolicyService } from '@services/policy.service';

@Injectable()
export class ModalShowPolicyService {
    policyUrl: string;

    constructor(private _policyService: PolicyService) {
        this.policyUrl = '';
    }

    /**
     * Load the policy Url
     * @param contactId The contact ID
     * @param policyId  The policy ID
     */
    loadPolicyUrl(contactId: string, policyId: string): void {
        const fields: string = 'policyUrl';
        this._policyService.getContactPolicy(contactId, policyId, fields).subscribe( (res: HttpResponse) => {
            this.policyUrl = res.data.policyUrl;
        })
    }

    /**
     * Reset the policy url
     */
    resetPolicyUrl(): void {
        this.policyUrl = '';
    }
}
