import { Injectable } from '@angular/core';

import { Policy } from '@interfaces/policy.interface';
import { HttpResponse } from '@interfaces/http-response.interface';
import { PolicyService } from '@services/policy.service';

@Injectable()
export class ContainerPolicyManagerService {
    policy: Policy | null = null;

    constructor(private _policyService: PolicyService) { }

    loadPolicy(contactId: string, policyId: string): void {
        const fields: string = 'policyUrl';
        this._policyService.getContactPolicy(contactId, policyId, fields).subscribe((res: HttpResponse) => {
            this.policy = res.data;
        })
    }
}
