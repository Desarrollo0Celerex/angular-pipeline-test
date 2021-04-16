import { Injectable } from '@angular/core';

import { HttpResponse } from '@interfaces/http-response.interface';
import { PolicyService } from '@services/policy.service';

import { Policy } from '@interfaces/policy.interface';
import { PolicyComplete } from '@interfaces/policy-complete.interface';

@Injectable()
export class ContainerPolicyDetailsService {
    policy: Policy | null = null;
    policyComplete: PolicyComplete | null = null;

    constructor(private _policyService: PolicyService) { }

    loadPolicy(contactId: string, policyId: string): void {
        const fields: string = 'policyId,policyStatusId,policyStatusName,policyStatusBackground,policyStatusDescription,insuranceName,insuranceIcon,insuranceBackground,insuranceTypeName,paymentPlanName,policyNumber,policyAmount,currencyName,totalAmount,coveredProperty,lifeTime,totalAmountApplied,bills,emissionDate,validityStartDate,validityEndDate,totalEndorsements';
        this._policyService.getContactPolicy(contactId, policyId, fields).subscribe( (res: HttpResponse) => {
            this.policy = res.data;
            this.policyComplete = res.data;
        });
    }
}
