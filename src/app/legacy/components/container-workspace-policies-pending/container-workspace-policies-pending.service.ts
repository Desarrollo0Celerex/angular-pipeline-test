import { Injectable } from '@angular/core';

import { POLICY_STATUS } from '@constants/global';
import { UtilitiesHelper } from '@core/helpers/utilities.helper';
import { HttpResponse } from '@core/interfaces/http-response.interface';
import { Policy } from '@core/interfaces/policy.interface';
import { PolicyService } from '@services/policy.service';

@Injectable()
export class ContainerWorkspacePoliciesPendingService {
    policies: Policy[] = [];
    totalPolicies: number = 0;

    constructor(private _policyService: PolicyService) {}

    loadWorkspacePolicies(): void {
        const page: number = 1;
        const perPage: number = 4;
        const fields: string =
            'policyId,insuranceId,insuranceName,insuranceIcon,insuranceBackground,insuranceTypeName,policyStatusName,policyStatusDescription,policyStatusBackground,insurerImageUrl,policyAmount,currencyName,paymentPlanName,policyNumber,policyUrl,coveredProperty,validityStartDate,validityEndDate,policyStatusId,lifeTime,insuranceTypeId,contactId,paymentId,policyCancellationReasonId';
        const filters: string = UtilitiesHelper.generateHttpFilter(
            'policyStatusId',
            [POLICY_STATUS.PENDING]
        );
        const sortBy: string = '-createdAt';
        this._policyService
            .getPolicies(page, fields, filters, '', sortBy, '', '', '', perPage)
            .subscribe((res: HttpResponse) => {
                this.policies = res.data.items;
                this.totalPolicies = res.data.totalItems;
            });
    }
}
