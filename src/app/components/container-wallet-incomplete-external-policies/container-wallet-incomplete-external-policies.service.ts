import { Injectable } from '@angular/core';

import { EXTERNAL_POLICY_STATUS } from '@constants/global';
import { UtilitiesHelper } from '@helpers/utilities.helper';
import { ExternalPolicy } from '@interfaces/external-policy.interface';
import { HttpResponse } from '@interfaces/http-response.interface';
import { ExternalPolicyService } from '@services/external-policy.service';

@Injectable()
export class ContainerWalletIncompleteExternalPoliciesService {
    externalPolicies: ExternalPolicy[] = [];
    totalExternalPolicies: number = 0;

    constructor(private _externalPolicyService: ExternalPolicyService) { }

    loadWorkspaceIncompletePolicies(): void {
        const page: number = 1;
        const perPage: number = 4;
        const fields: string = 'externalPolicyId,isChecked,policyUrl,coveredProperty,validityStartDate,validityEndDate,policyAmount,policyNumber,insurerImageUrl,insuranceName,insuranceIcon,insuranceBackground,paymentMethodName,insuranceTypeName,currencyName,externalPolicyStatusId,externalPolicyStatusName,externalPolicyStatusDescription,lifeTime,contactId,contactName,externalPolicyStatusBackground';
        const filters: string = UtilitiesHelper.generateHttpFilter('externalPolicyStatusId', [EXTERNAL_POLICY_STATUS.INCOMPLETE, EXTERNAL_POLICY_STATUS.CURRENT]);
        const sortBy: string = '-createdAt';
        this._externalPolicyService.getWorkspaceExternalPolicies(fields, filters, page, perPage, sortBy).subscribe((res: HttpResponse) => {
            this.externalPolicies = res.data.items;
            this.totalExternalPolicies = res.data.totalItems;
        })
    }

}
