import { Injectable } from '@angular/core';

import { POLICY_STATUS } from '@constants/global';
import { UtilitiesHelper } from '@helpers/utilities.helper';
import { HttpResponse } from '@interfaces/http-response.interface';
import { Policy } from '@interfaces/policy.interface';
import { PolicyService } from '@services/policy.service';

@Injectable()
export class ContainerWorkspaceIncompletePoliciesService {
    policies: Policy[] = [];
    totalPolicies: number = 0;

    constructor(private _policyService: PolicyService) { }

    loadWorkspaceIncompletePolicies(): void {
        const page: number = 1;
        const perPage: number = 4;
        const fields: string = 'policyId,insuranceName,insuranceIcon,insuranceBackground,insuranceTypeName,policyStatusId,policyStatusName,policyStatusDescription,policyStatusBackground,policyAmount,policyNumber,paymentPlanName,contactId,contactName,insurerImageUrl';
        const filters: string = UtilitiesHelper.generateHttpFilter('policyStatusId', [POLICY_STATUS.INCOMPLETE]);
        const sortBy: string = '-createdAt';
        this._policyService.getPolicies(page, fields, filters, '', sortBy, '', '', '', perPage).subscribe((res: HttpResponse) => {
            this.policies = res.data.items;
            this.totalPolicies = res.data.totalItems;
        })
    }
}
