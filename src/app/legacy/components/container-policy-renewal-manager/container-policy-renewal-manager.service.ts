import { Injectable } from '@angular/core';

import { Policy } from '@core/interfaces/policy.interface';
import { HttpResponse } from '@core/interfaces/http-response.interface';
import { PolicyService } from '@services/policy.service';

@Injectable()
export class ContainerPolicyRenewalManagerService {
    policy: Policy | null = null;

    constructor(private _policyService: PolicyService) {}

    loadPolicy(contactId: string, policyId: string): void {
        const fields: string = 'policyUrl,insuranceId,insuranceTypeId,tracker';
        this._policyService
            .getContactPolicy(contactId, policyId, fields)
            .subscribe((res: HttpResponse) => {
                this.policy = res.data;
            });
    }
}
